(() => {
  'use strict';
  const root = document.documentElement;
  const opening = document.querySelector('.section-opening[data-title-motion]');
  if (!opening || !root.classList.contains('has-opening-motion') ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const heading = opening.querySelector('h1');
  const image = heading.querySelector('img');
  const action = opening.querySelector('.section-opening__action');
  let started = false;

  async function reveal() {
    if (started) return;
    started = true;
    try {
      await image.decode();
      // A slow or failed script must never hide the title indefinitely.
      if (!root.classList.contains('has-opening-motion')) return;
      const frames = opening.dataset.titleMotion === 'ink'
        ? [{ clipPath: 'inset(-12% 112% -12% -12%)', opacity: 0.35 },
           { clipPath: 'inset(-12% -12% -12% -12%)', opacity: 1 }]
        : [{ transform: 'scale(.94)', opacity: 0 },
           { transform: 'scale(1)', opacity: 1 }];
      heading.animate(frames, {
        duration: 1400,
        easing: 'cubic-bezier(.2,.7,.3,1)',
        fill: 'backwards'
      });
      action.animate([
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 650,
        delay: 800,
        easing: 'ease-out',
        fill: 'backwards'
      });
    } finally {
      opening.classList.add('is-motion-revealed');
      clearTimeout(window.openingMotionFallback);
    }
  }
  if (!('IntersectionObserver' in window)) {
    reveal().catch(() => {});
    return;
  }
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    reveal().catch(() => {});
  }, { threshold: 0.15 });
  observer.observe(opening);
})();
