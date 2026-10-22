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
const brush = "山河印记山河为卷，脚步为证。那些走过的路隔着岁月，说给你们听。";
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
  "一九三四五至如果能寄去一句话你想对他们说什么致长征路上的你们山河邮局不知道从哪里落笔留下的每一句都在这里回望这一程沿时间走近历史历史有来处每一步都值得回望";
const sets = [
  {
    name: "Ma Shan Zheng",
    file: "ma-shan-zheng",
    folder: "mashanzheng",
    text: brush,
  },
  {
    name: "LXGW WenKai TC",
    file: "lxgw-wenkai",
    folder: "lxgwwenkaitc",
    text: hand,
  },
  { name: "Oswald", file: "oswald", folder: "oswald", text: "0123456789.—/ :" },
];
const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const manifest = [];
for (const font of sets) {
  const subset = [...new Set(font.text)].join("");
  const url =
    "https://fonts.googleapis.com/css2?" +
    new URLSearchParams({ family: font.name, display: "swap", text: subset });
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
