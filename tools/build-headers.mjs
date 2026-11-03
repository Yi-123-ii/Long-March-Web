import { access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sections = [
  { id: 'home', file: 'index.html', art: 'headers/home-v1.webp', tagline: '以山河为卷，以青春为答', lettering: 'titles/header-home-tagline-v1.webp' },
  { id: 'chronicle', file: 'chronicle.html', art: 'brand-landscape-v2.webp', tagline: '循着来路，读懂远方', lettering: 'titles/brand-tagline-v2.webp' },
  { id: 'journey', file: 'modules/c/journey.html', art: 'headers/journey-v1.webp', tagline: '重走征途，感知不易', lettering: 'titles/header-journey-tagline-v1.webp' },
  { id: 'inheritance', file: 'inheritance.html', art: 'headers/inheritance-v1.webp', tagline: '接过薪火，续写山河', lettering: 'titles/header-inheritance-tagline-v1.webp' },
  { id: 'post', file: 'post-office.html', art: 'headers/post-v1.webp', tagline: '寄一纸心语，念万里征途', lettering: 'titles/postal-tagline-brush-v2.webp' },
];
const links = [ ['index.html', '首页', 'home'], ['chronicle.html', '长征纪事', 'chronicle'], ['journey.html', '重走长征', 'journey'], ['inheritance.html', '精神传承', 'inheritance'], ['post-office.html', '山河邮局', 'post'] ];

for (const section of sections) {
  await access(path.join(root, 'assets/images', section.art));
  await access(path.join(root, 'assets/images', section.lettering));
  const prefix = section.id === 'journey' ? '../../' : '';
  const header = `<header class="site-header site-header--paper lm-header lm-unified-header${section.id === 'journey' ? ' atlas-header' : ''}" id="site-header" data-section="${section.id}">
      <a class="lm-brand" href="${prefix}index.html"><img class="lm-brand-landscape" src="${prefix}assets/images/${section.art}" width="320" height="259" alt="" /><span><img class="lm-brand-name-art" src="${prefix}assets/images/titles/brand-name-v3.webp" width="900" height="229" alt="山河印记" /><small><span class="a-sr-only">${section.tagline}</span><span class="lm-brand-tagline-art" aria-hidden="true"></span></small></span></a>
      ${section.id === 'journey' ? '<p id="atlas-progress" class="a-sr-only">从于都河岸，走向更远的山河</p>' : ''}
      <button class="site-menu-toggle" type="button" aria-label="展开主导航" aria-expanded="false" aria-controls="site-navigation"><span></span><span></span><span></span></button>
      <nav class="site-nav" id="site-navigation" aria-label="主导航">
        ${links.map(([url, label, id]) => `<a href="${prefix}${url}"${id === section.id ? ' aria-current="page"' : ''}${section.id === 'journey' && id === 'chronicle' ? ' data-c-history' : ''}>${label}</a>`).join('\n        ')}
      </nav>
    </header>`.replace(/[ \t]+$/gm, '');
  const target = path.join(root, section.file);
  let html = await readFile(target, 'utf8');
  const pattern = /<header\b[^>]*class="[^"]*(?:site-header|atlas-header)[^"]*"[^>]*>[\s\S]*?<\/header>/;
  if (!pattern.test(html)) throw Error('Header missing: ' + section.file);
  html = html.replace(pattern, () => header);
  if (!html.includes('assets/js/site-nav.js')) html = html.replace('</head>', `<script defer src="${prefix}assets/js/site-nav.js?v=20261102-unified"></script>\n</head>`);
  else html = html.replace(/src="(?:\.\.\/\.\.\/)?assets\/js\/site-nav\.js(?:\?[^\"]*)?"/, `src="${prefix}assets/js/site-nav.js?v=20261102-unified"`);
  if (section.id === 'journey') {
    if (!html.includes('../../assets/css/site-shell.css')) html = html.replace('</head>', '<link rel="stylesheet" href="../../assets/css/site-shell.css?v=20261102-unified" />\n</head>');
    // Keep the game's original About dialog and button ID outside the shared nav.
    if (!html.includes('id="about-open"')) html = html.replace('<footer class="atlas-footer">', '<footer class="atlas-footer"><button class="quiet" id="about-open" type="button">关于这一程</button>');
  }
  // The shared stylesheet must win over page-specific styles and the older shell.
  const style = `<link rel="stylesheet" href="${prefix}assets/css/header-unified.css?v=20261103-brand-left" />`;
  html = html.replace(/<link\b[^>]*href="(?:\.\.\/\.\.\/)?assets\/css\/header-unified\.css(?:\?[^"]*)?"[^>]*>\s*/g, '').replace('</head>', style + '\n</head>');
  await writeFile(target, html);
}
console.log('Built five consistent headers.');
