import { readFile, readdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let count = 0;
async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (
      entry.name.startsWith(".") ||
      ["output", "node_modules"].includes(entry.name)
    )
      continue;
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scan(target);
      continue;
    }
    if (entry.name.endsWith(".js")) {
      new vm.Script(await readFile(target, "utf8"), { filename: target });
      count++;
    }
    if (entry.name.endsWith(".css")) {
      const css = await readFile(target, "utf8");
      for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
        const ref = match[1].split(/[?#]/)[0];
        if (!ref || /^[a-z]+:/i.test(ref)) continue;
        await access(path.resolve(path.dirname(target), ref));
      }
    }
    if (entry.name.endsWith(".html")) {
      const source = await readFile(target, "utf8");
      for (const match of source.matchAll(/(?:src|href)="([^"]+)"/g)) {
        const ref = match[1].split(/[?#]/)[0];
        if (!ref || /^[a-z]+:/i.test(ref)) continue;
        await access(path.resolve(path.dirname(target), ref));
      }
    }
  }
}
await scan(root);
const context = { window: {} };
vm.createContext(context);
vm.runInContext(
  await readFile(path.join(root, "data/events.js"), "utf8"),
  context,
);
const events = context.window.LM_EVENTS;
const wuqi = events.find(event => event.id === "wuqi");
const huishi = events.find(event => event.id === "huishi");
if (wuqi?.date !== "1935.10.19" || huishi?.date !== "1936.10" ||
    !huishi.timeline.some(item => item.date === "1936年10月9日" && item.text.includes("会宁")) ||
    !huishi.timeline.some(item => item.date === "1936年10月22日" && item.text.includes("将台堡"))) {
  throw Error("吴起抵达与三大主力会师的时间或地点不正确");
}
vm.runInContext(await readFile(path.join(root, "data/stage-title-art.js"), "utf8"), context);
if (
  events.length !== 9 ||
  new Set(events.map((e) => e.id)).size !== 9 ||
  events.some(
    (e) =>
      !e.title ||
      !e.lead ||
      e.sections?.length !== 3 ||
      e.sections.some((s) => !s.heading || s.text.length < 50) ||
      e.timeline?.length < 3 ||
      !e.image?.src ||
      !e.image?.caption ||
      !e.image?.credit ||
      !e.sources.every((s) => s.url.startsWith("https://")),
  )
)
  throw Error("事件资料不完整");
for (const event of events) {
  await access(path.join(root, event.image.src));
  if (event.image.preview) await access(path.join(root, event.image.preview));
  await access(path.join(root, "assets/images/illustrations", event.id + "-v1.webp"));
  const titleArt = context.window.LM_STAGE_TITLE_ART[event.id];
  if (!titleArt?.src || !titleArt.width || !titleArt.height) throw Error("阶段题字缺失：" + event.id);
  await access(path.join(root, titleArt.src));
}
const fonts = JSON.parse(
  await readFile(path.join(root, "assets/fonts/manifest.json"), "utf8"),
);
vm.runInContext(await readFile(path.join(root, "data/postal-designs.js"), "utf8"), context);
for (const stamp of context.window.LM_POSTAL.stamps)
  await access(path.join(root, "assets/images/stamps", stamp.id + "-v1.webp"));
for (const paper of context.window.LM_POSTAL.papers)
  await access(path.join(root, "assets/images/stationery", paper.id + "-v1.webp"));
for (const font of fonts) {
  await access(path.join(root, "assets/fonts", font.file));
  await access(path.join(root, "assets/fonts", font.licenseFile));
}
console.log(
  `检查通过：${count} 份浏览器脚本语法正确，本地资源引用有效，9 篇图文纪事的正文、时间线与本地配图完整。`,
);
