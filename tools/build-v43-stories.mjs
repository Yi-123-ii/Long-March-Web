import { access, readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const page = new URL("inheritance.html", root);
const data = JSON.parse(await readFile(new URL("data/v43-stories.json", root), "utf8"));

function escape(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function validText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function photo(image) {
  return `<span class="doc-media" style="--doc-photo-width: ${image.width}px; --doc-photo-ratio: ${image.width} / ${image.height}">
        <span class="doc-media__frame">
          <img src="${escape(image.file)}" width="${image.width}" height="${image.height}" alt="${escape(image.alt)}" loading="lazy" decoding="async">
          <span class="doc-media__unavailable" hidden>图像暂未载入</span>
        </span>
        <span class="doc-media__credit">${escape(image.caption)}</span>
      </span>`;
}

function renderStory(story, index) {
  const number = String(index + 1).padStart(2, "0");
  const sections = story.sections.map(section => `
          <section class="doc-article__section">
            <h3>${escape(section.title)}</h3>
            <p>${escape(section.text)}</p>
          </section>`).join("");
  const sources = [story.source, ...(story.additionalSources ?? [])].map(source => `
          <li>${escape(source.publisher)} · 《${escape(source.title)}》 · <time datetime="${source.date}">${source.date}</time></li>`).join("");
  return `
      <details class="doc-story" data-story="${story.id}">
        <summary class="doc-story__cover">
          ${photo(story.image)}
          <span class="doc-story__copy">
            <span class="doc-story__index"><span>${number}</span> ${escape(story.theme)}</span>
            <span class="doc-story__name">${escape(story.name)}</span>
            <span class="doc-story__teaser">${escape(story.teaser)}</span>
            <span class="doc-story__read">阅读故事 <span aria-hidden="true">＋</span></span>
          </span>
        </summary>
        <article class="doc-article">
          <header class="doc-article__header">
            <p class="doc-kicker"><span>${number}</span> ${escape(story.theme)}</p>
            <h2 class="doc-article__title">${escape(story.title)}</h2>
            <p class="doc-article__identity">${escape(story.name)} · ${escape(story.identity)}</p>
            <p class="doc-article__location">${escape(story.location)}</p>
          </header>
          ${photo(story.image)}
          <div class="doc-article__reading">${sections}
            <div class="doc-sources">
              <h3>报道来源</h3>
              <ul>${sources}
              </ul>
            </div>
          </div>
        </article>
      </details>`;
}

const ids = new Set();
let html = await readFile(page, "utf8");
for (const [key, marker] of [["people", "PEOPLE"], ["practices", "PRACTICES"]]) {
  const stories = data[key];
  if (!Array.isArray(stories) || stories.length !== 3) throw new Error(`案例组缺失：${key}`);
  for (const story of stories) {
    if (!/^[a-z][a-z0-9-]*$/.test(story.id) || ids.has(story.id)) throw new Error("案例编号错误");
    ids.add(story.id);
    for (const field of ["name", "identity", "theme", "teaser", "title", "location"]) {
      if (!validText(story[field])) throw new Error(`${story.id} 缺少 ${field}`);
    }
    if (!Array.isArray(story.sections) || story.sections.length < 3 ||
        story.sections.some(section => !validText(section.title) || !validText(section.text))) {
      throw new Error(`${story.id} 缺少完整故事`);
    }
    for (const source of [story.source, ...(story.additionalSources ?? [])]) {
      if (!source || !validText(source.publisher) || !validText(source.title) ||
          !/^\d{4}-\d{2}-\d{2}$/.test(source.date) || new URL(source.url).protocol !== "https:") {
        throw new Error(`${story.id} 缺少可追溯的报道`);
      }
    }
    const image = story.image;
    if (!image || !/^assets\/images\/v4[34]\/[a-z0-9-]+\.(?:webp|jpeg)$/.test(image.file) ||
        !validText(image.caption) || !validText(image.alt) ||
        !Number.isSafeInteger(image.width) || image.width < 1 ||
        !Number.isSafeInteger(image.height) || image.height < 1) {
      throw new Error(`${story.id} 缺少有效图像信息`);
    }
    await access(new URL(image.file, root));
  }

  const pattern = new RegExp(`(<!-- V43:${marker}:BEGIN -->)[\\s\\S]*?(<!-- V43:${marker}:END -->)`);
  if (!pattern.test(html)) throw new Error(`案例生成区缺失：${marker}`);
  html = html.replace(pattern, (_, begin, end) => `${begin}${stories.map(renderStory).join("")}\n          ${end}`);
}

if (process.argv.includes("--check")) {
  if (html !== await readFile(page, "utf8")) throw new Error("案例数据已更新，请先生成页面");
} else {
  await writeFile(page, html);
}
console.log(`六组案例资料与本地图片已核对（${process.argv.includes("--check") ? "同步" : "已生成"}）`);
