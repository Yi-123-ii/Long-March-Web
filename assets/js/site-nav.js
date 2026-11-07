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

  const homeReturn = document.querySelector('[data-home-return]');
  if (homeReturn && new URLSearchParams(location.search).get('from') === 'home') {
    const homeUrl = new URL(homeReturn.querySelector('a').href);
    const referrer = document.referrer ? new URL(document.referrer) : null;
    const fromHome = referrer?.origin === homeUrl.origin &&
      [homeUrl.pathname, new URL('.', homeUrl).pathname].includes(referrer.pathname);
    const sameVisit = history.state?.shanheHomeReturn === location.pathname;
    if (fromHome || sameVisit) {
      homeReturn.hidden = false;
      try {
        history.replaceState({ ...history.state, shanheHomeReturn: location.pathname }, '');
      } catch { /* The return link also works when history state cannot be saved. */ }
      homeReturn.querySelector('button').addEventListener('click', () => {
        homeReturn.hidden = true;
      });
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
