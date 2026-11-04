(() => {
  'use strict';
  const opening = document.querySelector('.section-opening[data-title-motion]');
  if (!opening || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const heading = opening.querySelector('h1');
  const image = heading.querySelector('img');
  const action = opening.querySelector('.section-opening__action');
  let started = false;
  opening.classList.add('is-awaiting-motion');

  async function reveal() {
    if (started) return;
    started = true;
    try {
      await image.decode();
      const frames = opening.dataset.titleMotion === 'ink'
        ? [{ clipPath: 'inset(-12% 112% -12% -12%)', opacity: 0.35 },
           { clipPath: 'inset(-12% -12% -12% -12%)', opacity: 1 }]
        : [{ transform: 'scale(.94)', opacity: 0 },
           { transform: 'scale(1)', opacity: 1 }];
      heading.animate(frames, {
        duration: 1400,
        easing: 'cubic-bezier(.2,.7,.3,1)'
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
      opening.classList.remove('is-awaiting-motion');
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
