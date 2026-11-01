(() => {
  const container = document.querySelector('#contemporary-cases');
  if (!container) return;
  const cases = window.LM_CONTEMPORARY_CASES;
  if (!Array.isArray(cases) || cases.length === 0) {
    container.textContent = '案例资料暂未加载。请检查 data/contemporary-cases.js。';
    return;
  }
  container.replaceChildren();
  cases.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'a-inheritance__case';
    const number = document.createElement('div');
    number.className = 'a-inheritance__case-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const content = document.createElement('div');
    content.className = 'a-inheritance__case-content';
    const meta = document.createElement('p'); meta.className = 'a-inheritance__case-meta';
    meta.textContent = [item.category, item.location, item.publishedAt].filter(Boolean).join(' / ');
    const title = document.createElement('h3'); title.textContent = item.title || '未命名案例';
    const action = document.createElement('p');action.textContent = item.action || '';
    const connection = document.createElement('blockquote');connection.textContent = item.connection || '';
    content.append(meta,title,action,connection);
    if (item.source && typeof item.source.url === 'string' && /^https:\/\//i.test(item.source.url)) {
      const link = document.createElement('a'); link.href = item.source.url; link.target = '_blank';link.rel = 'noopener noreferrer';
      link.textContent = `来源：${item.source.name || '查看原始资料'} ↗`;
      content.append(link);
    }
    const illustration = document.createElement('figure'); illustration.className = 'v2-case-illustration';
    const image = document.createElement('img');
    image.src = ['assets/images/editorial/case-learning.svg','assets/images/editorial/case-volunteer.svg','assets/images/editorial/case-archive.svg'][index] || 'assets/images/editorial/case-learning.svg';
    image.alt = ''; image.loading = 'lazy'; illustration.append(image);
    const figcaption = document.createElement('figcaption');figcaption.textContent = '主题概念插画 · 非事件实拍'; illustration.append(figcaption);
    article.append(number,content,illustration);
    container.append(article);
  });
})();
