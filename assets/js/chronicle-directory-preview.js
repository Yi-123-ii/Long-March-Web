(() => {
  function setupDirectory() {
    const aside = document.querySelector('.lm-history-aside');
    const list = document.querySelector('#event-list');
    if (!aside || !list || !window.LM_EVENTS) return;
    document.documentElement.classList.add('has-chronicle-directory');
    const date = aside.querySelector('.lm-aside-date');
    date.textContent = '1934 — 1936';
    const nav = document.createElement('nav');
    nav.className = 'lm-event-directory';
    nav.setAttribute('aria-label', '纪事目录');
    const title = document.createElement('h3');
    title.textContent = '纪事目录';
    const entries = document.createElement('ol');
    nav.append(title, entries);
    date.after(nav);
    let links = [], frame = 0;
    function highlight() {
      frame = 0;
      if (!links.length) return;
      const anchor = Math.min(180, innerHeight * 0.25);
      const visible = links.find(({ article }) => article.getBoundingClientRect().bottom > anchor) || links.at(-1);
      links.forEach(({ link }) => {
        if (link === visible.link) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    function render() {
      links = [];
      entries.replaceChildren();
      list.querySelectorAll('.lm-event').forEach(article => {
        const event = window.LM_EVENTS.find(event => article.id === 'event-' + event.id);
        if (!event) return;
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + article.id;
        const date = document.createElement('small');
        date.textContent = event.date;
        const name = document.createElement('span');
        name.textContent = event.title;
        link.append(date, name);
        link.addEventListener('click', e => {
          if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          article.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
          article.querySelector('h3 button')?.focus({ preventScroll: true });
        });
        item.append(link);
        entries.append(item);
        links.push({ link, article });
      });
      nav.hidden = links.length === 0;
      highlight();
    }
    new MutationObserver(render).observe(list, { childList: true });
    window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(highlight); }, { passive: true });
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupDirectory, { once: true });
  else setupDirectory();
})();
