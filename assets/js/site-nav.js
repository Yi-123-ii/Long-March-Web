(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const toggle = header.querySelector('.site-menu-toggle');
  const nav = header.querySelector('.site-nav');
  if (!toggle || !nav) return;
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '展开主导航');
    nav.classList.remove('is-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '收起主导航' : '展开主导航');
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  document.addEventListener('click', (e) => { if (!header.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); });
})();
