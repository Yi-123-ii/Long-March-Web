(() => {
  const postVisitParam = 'postVisit';
  const pendingPostVisit = 'shanhe:pending-post-visit';
  const sourceLabels = { chronicle: '长征纪事', inheritance: '精神传承' };
  const isSameTabClick = event => event.button === 0 &&
    !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
    !event.defaultPrevented;

  function registerPostEntries() {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[data-post-entry]');
      if (!link || !isSameTabClick(event)) return;
      const token = crypto.getRandomValues(new Uint32Array(3)).join('-');
      const target = new URL(link.href);
      try {
        sessionStorage.setItem(pendingPostVisit, JSON.stringify({
          token,
          source: link.dataset.postEntry,
          href: location.href,
        }));
      } catch {
        return;
      }
      target.searchParams.set(postVisitParam, token);
      event.preventDefault();
      location.assign(target);
    });
  }

  function setupPostReturn(prompt) {
    const url = new URL(location.href);
    const token = url.searchParams.get(postVisitParam);
    let visit = history.state?.shanhePostReturn;
    if (token) {
      url.searchParams.delete(postVisitParam);
      try {
        const pending = JSON.parse(sessionStorage.getItem(pendingPostVisit));
        if (pending?.token === token && Object.hasOwn(sourceLabels, pending.source)) {
          const sourceUrl = new URL(pending.href);
          if (sourceUrl.origin === url.origin &&
              sourceUrl.pathname === new URL(pending.source + '.html', url).pathname) {
            visit = { ...pending, distance: 1 };
            sessionStorage.removeItem(pendingPostVisit);
          }
        }
      } catch { /* The ordinary post office remains available. */ }
      history.replaceState({ ...history.state, shanhePostReturn: visit }, '', url);
    }
    if (!visit) return false;

    const link = prompt.querySelector('a');
    const closeButton = prompt.querySelector('button');
    const label = '返回' + sourceLabels[visit.source];
    let dismissed = false;
    let returning = false;
    prompt.dataset.postSource = visit.source;
    prompt.setAttribute('aria-label', label + '提示');
    closeButton.setAttribute('aria-label', '关闭返回提示');
    link.href = visit.href;
    link.firstChild.textContent = label + ' ';
    const saveEntry = () => {
      history.replaceState({ ...history.state, shanhePostReturn: visit }, '');
    };
    const show = () => {
      try {
        dismissed ||= sessionStorage.getItem('shanhe:dismissed-post-visit:' + visit.token) === '1';
      } catch { /* Dismissal is also saved in the current history entry. */ }
      prompt.hidden = dismissed || !!visit.dismissed;
    };
    const returnToSource = event => {
      if (!isSameTabClick(event)) return;
      event.preventDefault();
      if (returning) return;
      returning = true;
      history.go(-(history.state?.shanhePostReturn || visit).distance);
    };
    const dismiss = () => {
      const hadFocus = prompt.contains(document.activeElement);
      dismissed = true;
      visit = { ...visit, dismissed: true };
      saveEntry();
      try {
        sessionStorage.setItem('shanhe:dismissed-post-visit:' + visit.token, '1');
      } catch { /* The current entry still remembers the dismissal. */ }
      show();
      if (hadFocus) document.querySelector('.lm-post-tabs [aria-selected="true"]')
        ?.focus({ preventScroll: true });
    };
    link.addEventListener('click', returnToSource);
    document.querySelectorAll('[data-reading-return]').forEach(readingLink => {
      readingLink.addEventListener('click', returnToSource);
    });
    closeButton.addEventListener('click', dismiss);
    prompt.addEventListener('keydown', event => {
      if (event.key === 'Escape') dismiss();
    });
    const syncEntry = () => {
      visit = history.state?.shanhePostReturn || visit;
      show();
    };
    window.addEventListener('popstate', syncEntry);
    window.addEventListener('hashchange', () => {
      const entry = history.state?.shanhePostReturn;
      // Native fragment links create entries within the same visit.
      visit = entry || { ...visit, distance: visit.distance + 1 };
      if (!entry) saveEntry();
      show();
    });
    window.addEventListener('pageshow', () => {
      returning = false;
      syncEntry();
    });
    show();
    return true;
  }

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
  const postReturn = document.querySelector('[data-post-return]');
  if (document.querySelector('[data-post-entry]')) registerPostEntries();
  const hasPostSource = postReturn && setupPostReturn(postReturn);
  if (!hasPostSource && homeReturn && new URLSearchParams(location.search).get('from') === 'home') {
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
