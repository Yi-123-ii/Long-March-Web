(() => {
  'use strict';
  const opening = document.querySelector('.section-opening[data-title-motion]');
  if (!opening || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const heading = opening.querySelector('h1');
  const image = heading.querySelector('img');
  // Animate on arrival while the opening is still on screen.
  if (!heading.animate || image.complete) return;
  image.addEventListener('load', () => {
    if (document.hidden || window.scrollY > 24) return;
    const frames = opening.dataset.titleMotion === 'ink'
      ? [{ clipPath: 'inset(-12% 100% -12% -12%)' }, { clipPath: 'inset(-12%)' }]
      : [{ opacity: .8, transform: 'scale(.985)' }, { opacity: 1, transform: 'scale(1)' }];
    heading.animate(frames, { duration: 420, easing: 'ease-out' });
  }, { once: true });
})();
