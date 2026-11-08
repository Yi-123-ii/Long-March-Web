(() => {
  const waiting = new WeakSet();
  function load(image) {
    observer?.unobserve(image);
    if (!image.dataset.deferSrc) return;
    // A scene or selected stamp may already have replaced the initial artwork.
    if (image.hasAttribute('src')) {
      delete image.dataset.deferSrc;
      return;
    }
    image.loading = 'eager';
    if (image.dataset.deferSizes) image.sizes = image.dataset.deferSizes;
    if (image.dataset.deferSrcset) image.srcset = image.dataset.deferSrcset;
    image.src = image.dataset.deferSrc;
    delete image.dataset.deferSrc;
    delete image.dataset.deferSrcset;
    delete image.dataset.deferSizes;
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting && entry.intersectionRatio > 0) load(entry.target); });
  }, { rootMargin: '0px 0px -1px 0px' }) : null;
  function observe(image) {
    if (!image.dataset.deferSrc || waiting.has(image)) return;
    waiting.add(image);
    if (observer) observer.observe(image);
    else load(image);
  }
  function scan(root) {
    if (root.matches?.('img[data-defer-src]')) observe(root);
    root.querySelectorAll?.('img[data-defer-src]').forEach(observe);
  }
  function forget(root) {
    const images = [...(root.querySelectorAll?.('img[data-defer-src]') || [])];
    if (root.matches?.('img[data-defer-src]')) images.push(root);
    images.forEach(image => { observer?.unobserve(image); waiting.delete(image); });
  }
  window.LM_IMAGES = { observe, load };
  function start() {
    let inputFonts;
    const loadInputFonts = () => {
      if (inputFonts) return;
      inputFonts = document.createElement('link');
      inputFonts.rel = 'stylesheet';
      inputFonts.href = new URL('fonts-input.css?v=20261108-cold-entry',
        document.querySelector('link[href*="css/fonts.css"]').href).href;
      document.head.append(inputFonts);
    };
    document.addEventListener('focusin', event => {
      if (event.target.matches('input,textarea,[contenteditable]')) loadInputFonts();
    });
    if (document.body.classList.contains('lm-post-page')) {
      if (document.readyState === 'complete') loadInputFonts();
      else window.addEventListener('load', loadInputFonts, { once: true });
    }
    scan(document);
    new MutationObserver(records => {
      records.forEach(record => record.removedNodes.forEach(node => {
        if (node.nodeType === 1) forget(node);
      }));
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === 1) scan(node);
      }));
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
