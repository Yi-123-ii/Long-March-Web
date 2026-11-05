(() => {
  const fontSheet = document.querySelector('[data-site-fonts]');
  if (fontSheet) {
    const useSiteFonts = () => {
      fontSheet.href = fontSheet.dataset.siteFonts;
      window.removeEventListener('load', useSiteFonts);
      window.removeEventListener('scroll', useSiteFonts);
    };
    if (document.readyState === 'complete') useSiteFonts();
    else {
      window.addEventListener('load', useSiteFonts, { once: true });
      window.addEventListener('scroll', useSiteFonts, { once: true, passive: true });
    }
  }

  const header = document.querySelector('.site-header');
  if (!header) return;
  const toggle = header.querySelector('.site-menu-toggle');
  const nav = header.querySelector('.site-nav');
  if (!toggle || !nav) return;
  const close = (restoreFocus = false) => {
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '展开主导航');
    nav.classList.remove('is-open');
    if (restoreFocus && wasOpen) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '收起主导航' : '展开主导航');
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  document.addEventListener('click', (e) => { if (!header.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); });
})();
