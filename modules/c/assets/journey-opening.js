(function () {
  'use strict';
  const entry = document.querySelector('.journey-opening__entry');
  const map = document.getElementById('journey-map');
  const directory = document.querySelector('.atlas-directory');
  document.addEventListener('click', function (event) {
    if (directory.open && (!directory.contains(event.target) || event.target.closest('#chapter-buttons button'))) {
      directory.open = false;
    }
  });
  directory.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && directory.open) {
      directory.open = false;
      directory.querySelector('summary').focus();
    }
  });
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
