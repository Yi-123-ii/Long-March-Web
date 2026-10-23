import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "assets/fonts");
await mkdir(dir, { recursive: true });
const context = { window: {} };
vm.createContext(context);
vm.runInContext(
  await readFile(path.join(root, "data/events.js"), "utf8"),
  context,
);
const titles = context.window.LM_EVENTS.flatMap((event) => [
  event.title,
  ...event.sections.map((s) => s.heading),
  event.focus.title,
]).join("");
const brush = "山河印记循着来路，读懂远方山河为卷，脚步为证。那些走过的路隔着岁月，说给你们听。" + context.window.LM_EVENTS.map((event) => event.title).join("");
const uiHeadings = (
  await Promise.all(
    ["index.html", "post-office.html"].map((file) =>
      readFile(path.join(root, file), "utf8"),
    ),
  )
)
  .flatMap((html) =>
    [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)].map((match) =>
      match[1].replace(/<[^>]*>/g, "").trim(),
    ),
  )
  .join("");
const hand =
  titles +
  uiHeadings +
  "这份心意，已在此留下。" +
  "一九三四五六至已投递留言投递如果能寄去一句话你想对他们说什么致长征路上的你们山河邮局不知道从哪里落笔留下的每一句都在这里回望这一程沿时间走近历史历史有来处每一步都值得回望";
const reading = [...new Set((
  await Promise.all([
    "index.html", "post-office.html", "data/events.js",
    "assets/js/chronicle.js", "assets/js/post-office.js", "assets/js/site.js",
  ].map(file => readFile(path.join(root, file), "utf8")))
).join("").match(/[\p{Script=Han}\p{Punctuation}\p{Number}\p{Letter}]/gu))];
const sets = [
  {
    name: "Zhi Mang Xing",
    file: "zhi-mang-xing",
    folder: "zhimangxing",
    text: brush,
  },
  {
    name: "Noto Serif SC",
    weight: "600",
    file: "noto-serif-sc-semibold",
    folder: "notoserifsc",
    text: hand + reading.join(""),
  },
  {
    name: "ZCOOL XiaoWei",
    file: "zcool-xiaowei",
    folder: "zcoolxiaowei",
    text: brush + "全部纪事长征走进山河邮局启程抉择转折机动突破雪山同行抵达",
  },
  { name: "Oswald", file: "oswald", folder: "oswald", text: "0123456789.—/ :" },
];
// 文楷覆盖正文与小字；分组本地托管，避免超长字体请求和单个巨大文件。
for (let i = 0; i < reading.length; i += 350) {
  const chars = reading.slice(i, i + 350);
  sets.push({
    name: "LXGW WenKai TC", file: "wenkai-reading-" + (i / 350 + 1),
    folder: "lxgwwenkaitc", text: chars.join(""),
    unicodeRange: chars.map(char => "U+" + char.codePointAt(0).toString(16)).join(","),
  });
}
const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const manifest = [];
const downloads = sets.flatMap(font => {
  const chars = [...new Set(font.text)];
  if (chars.length <= 350) return [font];
  const parts = [];
  for (let i = 0; i < chars.length; i += 350) {
    const group = chars.slice(i, i + 350);
    parts.push({ ...font, file: font.file + "-" + (i / 350 + 1), text: group.join(""),
      unicodeRange: group.map(char => "U+" + char.codePointAt(0).toString(16)).join(",") });
  }
  return parts;
});
for (const font of downloads) {
  const subset = [...new Set(font.text)].join("");
  const url =
    "https://fonts.googleapis.com/css2?" +
    new URLSearchParams({ family: font.name + (font.weight ? ":wght@" + font.weight : ""), display: "swap", text: subset });
  const response = await fetch(url, { headers: { "User-Agent": ua } });
  if (!response.ok) throw Error(font.name + ": " + response.status);
  const css = await response.text();
  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw Error("字体文件地址缺失：" + font.name);
  const download = await fetch(match[1]);
  if (!download.ok) throw Error("字体下载失败：" + font.name);
  const bytes = Buffer.from(await download.arrayBuffer());
  await writeFile(path.join(dir, font.file + ".woff2"), bytes);
  const licenseUrl =
    "https://raw.githubusercontent.com/google/fonts/main/ofl/" +
    font.folder +
    "/OFL.txt";
  const license = await fetch(licenseUrl);
  if (!license.ok) throw Error("字体许可缺失：" + font.name);
  await writeFile(path.join(dir, font.file + "-OFL.txt"), await license.text());
  manifest.push({
    name: font.name,
    weight: font.weight || "400",
    ...(font.unicodeRange ? { unicodeRange: font.unicodeRange } : {}),
    file: font.file + ".woff2",
    bytes: bytes.length,
    characters: [...subset].length,
    source: "https://github.com/google/fonts/tree/main/ofl/" + font.folder,
    license: "SIL Open Font License 1.1",
    licenseFile: font.file + "-OFL.txt",
    note: "通过 Google Fonts CSS API 获取固定文字字形子集；本地托管。",
  });
  console.log(
    font.name +
      ": " +
      bytes.length +
      " bytes / " +
      [...subset].length +
      " characters",
  );
}
await writeFile(
  path.join(dir, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
await writeFile(path.join(root, "assets/css/fonts.css"),
  "/* 字体本地托管，授权原文与来源见 assets/fonts/。文楷按字形分组按需加载。 */\n" +
  manifest.map(font => `@font-face {\n  font-family: "${font.name}";\n  font-style: normal;\n  font-weight: ${font.weight};\n  font-display: swap;\n  src: url("../fonts/${font.file}?v=20261023-postal-lettering") format("woff2");\n${font.unicodeRange ? "  unicode-range: " + font.unicodeRange + ";\n" : ""}}\n`).join(""));
