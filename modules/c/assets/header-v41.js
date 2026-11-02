(() => {
  'use strict';
  const header = document.querySelector('.c-header-v41');
  if (!header) return;
  const toggle = header.querySelector('.site-menu-toggle');
  const nav = header.querySelector('.site-nav');
  const extra = header.querySelector('.c-header-menu-extra');
  const mobile = window.matchMedia('(max-width: 760px)');
  let open = false;

  const render = () => {
    header.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-controls', mobile.matches ? nav.id : extra.id);
    toggle.setAttribute('aria-label', `${open ? '收起' : '展开'}${mobile.matches ? '主导航' : '更多菜单'}`);
    nav.classList.toggle('is-open', open && mobile.matches);
    nav.inert = mobile.matches && !open;
    extra.hidden = !open;
  };
  const close = (restoreFocus = false) => {
    const wasOpen = open;
    open = false;
    render();
    if (restoreFocus && wasOpen) toggle.focus();
  };

  toggle.addEventListener('click', () => { open = !open; render(); });
  nav.addEventListener('click', event => {
    if (event.target.closest('a, button')) close();
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (open && event.key === 'Escape') {
      event.preventDefault();
      close(true);
    }
  });
  header.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (open && !header.contains(document.activeElement)) close();
    });
  });
  mobile.addEventListener('change', () => {
    const focusWouldHide = nav.contains(document.activeElement) && mobile.matches;
    close(focusWouldHide);
  });
  const aboutDialog = document.getElementById('about-dialog');
  aboutDialog?.addEventListener('close', () => {
    if (!document.getElementById('map-screen').hidden) toggle.focus();
  });
  render();
})();
