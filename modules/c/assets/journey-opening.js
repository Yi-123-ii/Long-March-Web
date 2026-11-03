(function () {
  'use strict';
  const entry = document.querySelector('.journey-opening__entry');
  const map = document.getElementById('journey-map');
  if (!entry || !map) return;
  entry.addEventListener('click', function (event) {
    event.preventDefault();
    map.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start'
    });
    map.tabIndex = -1;
    map.focus({ preventScroll: true });
  });
})();
