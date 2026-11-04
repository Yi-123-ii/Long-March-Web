// Keep the small wordmark available in the first HTML response on every page.
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const image = await readFile(new URL('assets/images/titles/brand-name-compact.webp', root));
const source = 'data:image/webp;base64,' + image.toString('base64');
for (const file of ['index.html', 'chronicle.html', 'inheritance.html', 'post-office.html', 'modules/c/journey.html']) {
  const target = new URL(file, root);
  let html = await readFile(target, 'utf8');
  html = html.replace(/<img\b(?=[^>]*class="lm-brand-name-art")[^>]*>/g,
    `<img class="lm-brand-name-art" src="${source}" width="360" height="92" alt="山河印记" />`);
  await writeFile(target, html);
}
