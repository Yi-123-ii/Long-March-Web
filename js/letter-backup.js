window.LM_LETTERS = (() => {
  const limit = 200;
  const clean = (m) => ({ id: m.id, body: m.body, nickname: m.nickname, createdAt: m.createdAt, eventId: m.eventId, ...(m.stampId ? { stampId: m.stampId } : {}), ...(m.paperId ? { paperId: m.paperId } : {}) });
  function hash(value) {
    let result = 2166136261;
    for (const char of value) result = Math.imul(result ^ char.codePointAt(0), 16777619);
    return (result >>> 0).toString(36);
  }
  function parseLegacy(source, events) {
    const chunks = source.split(/\n\n─{10,}\n\n(?=山河邮局 · 来自今天的留言\n)/);
    return chunks.map((chunk, index) => {
      const lines = chunk.split("\n");
      if (lines[0] !== "山河邮局 · 来自今天的留言") throw Error("请选择山河邮局导出的留言文件。");
      const date = lines[1]?.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日\s+(\d{1,2}):(\d{2})$/);
      const start = chunk.indexOf("致长征路上的你们：\n\n");
      const end = chunk.lastIndexOf("\n\n署名：");
      if (!date || start < 0 || end < start) throw Error("文本备份格式不完整，请重新导出后再试。");
      const [, y, mo, d, h, mi] = date.map(Number);
      const time = new Date(y, mo - 1, d, h, mi);
      if (time.getFullYear() !== y || time.getMonth() !== mo - 1 || time.getDate() !== d || time.getHours() !== h || time.getMinutes() !== mi)
        throw Error("备份中的留言日期无效。");
      const body = chunk.slice(start + "致长征路上的你们：\n\n".length, end);
      const rawName = chunk.slice(end + "\n\n署名：".length).split("\n")[0];
      const nickname = rawName === "一位无名来信人" ? "" : rawName;
      const title = lines[2]?.match(/^读过「(.+)」之后$/)?.[1];
      return { id: "text-" + hash(chunk) + "-" + index, body, nickname, createdAt: time.getTime(), eventId: events.find(e => e.title === title)?.id || null };
    });
  }
  function parse(source, events = []) {
    if (typeof source !== "string" || source.length > 2000000) throw Error("备份文件过大，未导入任何留言。");
    const text = source.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").trim();
    let messages, legacy = false;
    if (/^[\[{]/.test(text)) {
      let value;
      try { value = JSON.parse(text); } catch { throw Error("备份文件无法读取，未更改现有留言。"); }
      if (Array.isArray(value)) messages = value;
      else if (value?.format === "longmarch-letters" && value.version === 1) messages = value.messages;
      else throw Error("不是支持的山河邮局备份文件。");
    } else { messages = parseLegacy(text, events); legacy = true; }
    if (!Array.isArray(messages) || !messages.length || messages.length > limit || !messages.every(LM_STORE.messageValid))
      throw Error("备份内容不完整或超出200封，未更改现有留言。");
    return { messages: messages.map(clean), legacy };
  }
  const legacyKey = m => JSON.stringify([m.body, m.nickname, Math.floor(m.createdAt / 60000)]);
  function merge(existing, incoming) {
    const result = existing.map(clean), byId = new Map(result.map(m => [m.id, m]));
    const counts = new Map();
    existing.forEach(m => counts.set(legacyKey(m), (counts.get(legacyKey(m)) || 0) + 1));
    let added = 0, skipped = 0;
    incoming.messages.forEach(message => {
      const key = legacyKey(message);
      if (incoming.legacy && counts.get(key) > 0) { counts.set(key, counts.get(key) - 1); skipped++; return; }
      const found = byId.get(message.id);
      if (found) {
        if (JSON.stringify(clean(found)) !== JSON.stringify(clean(message))) throw Error("备份与现有留言存在编号冲突，未执行导入。");
        skipped++; return;
      }
      result.push(clean(message)); byId.set(message.id, message); added++;
    });
    if (result.length > limit) throw Error("合并后将超过200封，请先备份并整理已有留言。");
    return { messages: result, added, skipped };
  }
  function serialize(messages) {
    return JSON.stringify({ format: "longmarch-letters", version: 1, exportedAt: new Date().toISOString(), messages: messages.map(clean) }, null, 2);
  }
  return { parse, merge, serialize };
})();
