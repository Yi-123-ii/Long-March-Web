import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";
const storage = await readFile(new URL("../assets/js/storage.js", import.meta.url), "utf8");
const backup = await readFile(new URL("../assets/js/letter-backup.js", import.meta.url), "utf8");
const key = "longmarch-b:messages:v1";
const record = (id, body = "今天的山河，想讲给你们听。", createdAt = 1760000000000) => ({ id, body, nickname: "来信人", createdAt, eventId: null });
function app(values = new Map(), fail = () => false) {
  const context = vm.createContext({ localStorage: {
    getItem: k => values.get(k) ?? null,
    setItem: (k, v) => { if (fail(k)) throw Error("quota"); values.set(k, v); },
  }});
  context.window = context;
  vm.runInContext(storage, context); vm.runInContext(backup, context);
  return { store: context.LM_STORE, letters: context.LM_LETTERS, values };
}
const plain = value => JSON.parse(JSON.stringify(value));
test("旧版v1留言和草稿在重新打开后保持可读，不随页面版本变化", () => {
  const values = new Map([[key, JSON.stringify([record("old")])]]);
  const first = app(values);
  assert.equal(first.store.readMessages()[0].id, "old");
  first.store.write("messages", [record("new"), ...first.store.readMessages()]);
  first.store.write("draft", { body: "没写完的草稿", nickname: "", eventId: null });
  const reopened = app(values);
  assert.deepEqual(plain(reopened.store.readMessages()).map(m => m.id), ["new", "old"]);
  assert.equal(reopened.store.read("draft", null, reopened.store.draftValid).body, "没写完的草稿");
});
test("一条损坏记录不会导致其余留言消失，原始记录会保留", () => {
  const raw = JSON.stringify([record("valid"), { body: "损坏条目" }]);
  const { store, values } = app(new Map([[key, raw]]));
  assert.equal(store.readMessages().length, 1);
  assert.equal(values.get(key), raw);
  assert.equal(store.write("messages", [record("new"), ...store.readMessages()]), true);
  assert.equal(values.get("longmarch-b:messages-recovery:v1"), raw);
});
test("主记录损坏时恢复备用记录；删除至空不会复活旧留言", () => {
  const { store, values } = app(); store.write("messages", [record("saved")]);
  values.set(key, "{broken");
  assert.equal(store.readMessages()[0].id, "saved"); assert.equal(store.recovered, true);
  store.write("messages", []);
  assert.equal(app(values).store.readMessages().length, 0);
});
test("保存失败不改变已有留言；备用记录写失败不误报主记录失败", () => {
  const values = new Map([[key, JSON.stringify([record("old")])]]);
  assert.equal(app(values, k => k === key).store.write("messages", [record("new")]), false);
  assert.equal(JSON.parse(values.get(key))[0].id, "old");
  assert.equal(app(values, k => k.includes("messages-backup")).store.write("messages", [record("new")]), true);
  assert.equal(app(values).store.readMessages()[0].id, "new");
});
test("JSON备份可跨存储空间迁移，重复导入不增加留言", () => {
  const from = app(), to = app(); const originals = [record("a"), record("b", "另一个正文")];
  const parsed = to.letters.parse("\uFEFF" + from.letters.serialize(originals));
  const merged = to.letters.merge([], parsed); assert.equal(merged.added, 2);
  to.store.write("messages", merged.messages);
  assert.deepEqual(plain(app(to.values).store.readMessages()), originals);
  assert.equal(to.letters.merge(to.store.readMessages(), parsed).added, 0);
});

test("插画邮票随留言保留，兼容没有邮票的旧留言", () => {
  const { store, letters } = app();
  const withStamp = { ...record("stamped"), stampId: "luding" };
  assert.equal(store.write("messages", [withStamp, record("legacy")]), true);
  const imported = letters.parse(letters.serialize(store.readMessages()));
  assert.equal(imported.messages[0].stampId, "luding");
  assert.equal(imported.messages[1].stampId, undefined);
  assert.equal(letters.merge(store.readMessages(), imported).added, 0);
  assert.equal(store.messageValid({ ...withStamp, stampId: "invalid" }), false);
});
test("旧版文本备份保留多行正文和署名，支持批量导入与重复检测", () => {
  const { letters } = app();
  const body = "第一行\n\n署名：这是正文中的句子\n第二行";
  const chunk = name => ["山河邮局 · 来自今天的留言", "2026年10月23日 20:56", "读过「三军会师」之后", "", "致长征路上的你们：", "", body, "", "署名：" + name, "", "（本机留言留存）"].join("\r\n");
  const parsed = letters.parse(chunk("小林") + "\r\n\r\n────────────────\r\n\r\n" + chunk("小林"), [{ id: "huishi", title: "三军会师" }]);
  assert.equal(parsed.messages.length, 2); assert.equal(parsed.messages[0].body, body);
  assert.equal(parsed.messages[0].nickname, "小林"); assert.equal(parsed.messages[0].eventId, "huishi");
  const merged = letters.merge([], parsed); assert.equal(merged.added, 2);
  assert.equal(letters.merge(merged.messages, parsed).added, 0);
});
test("错误文件、冲突编号和超限导入不会修改现有留言", () => {
  const { letters } = app(); const originals = [record("a")]; const snapshot = JSON.stringify(originals);
  assert.throws(() => letters.parse("{broken")); assert.throws(() => letters.parse("not a backup"));
  assert.throws(() => letters.merge(originals, { messages: [record("a", "冲突内容")] }));
  const full = Array.from({ length: 200 }, (_, i) => record(String(i)));
  assert.throws(() => letters.merge(full, { messages: [record("extra")] }));
  assert.equal(JSON.stringify(originals), snapshot);
});
