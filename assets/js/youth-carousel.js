(() => {
  "use strict";

  const galleries = document.querySelectorAll("[data-youth-carousel]");
  if (!galleries.length) return;

  const interval = 2000;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const lifecycle = new AbortController();
  const { signal } = lifecycle;
  const listen = (target, type, listener) => target.addEventListener(type, listener, { signal });
  let suspended = false;

  function connect(gallery) {
    const frame = gallery.querySelector("[data-youth-frame]");
    const controls = gallery.querySelector("[data-youth-controls]");
    const play = gallery.querySelector("[data-youth-play]");
    const fallback = gallery.querySelector("[data-youth-fallback]");
    const details = gallery.parentElement.querySelector(".v44-youth__path");
    const slides = [...frame.querySelectorAll("[data-youth-image]")].map(image => ({
      image, failed: false, decoded: null,
    }));
    const buttons = [...controls.querySelectorAll("[data-youth-slide]")];
    const fills = buttons.map(button => button.querySelector("[data-youth-fill]"));
    gallery.classList.add("is-enhanced");
    let current = -1;
    let requested = 0;
    let requestId = 0;
    let loading = false;
    let started = false;
    let inView = false;
    let hovered = false;
    let manualPause = false;
    let progress;
    let touch;
    let suppressClickUntil = 0;

    const wrap = index => (index + slides.length) % slides.length;
    const canRotate = () => slides.filter(slide => !slide.failed).length > 1;

    function decode(index) {
      const slide = slides[index];
      if (!slide.decoded) {
        const { image } = slide;
        image.loading = "eager";
        if (image.dataset.src) image.src = image.dataset.src;
        slide.decoded = image.decode().then(() => true, () => {
          slide.failed = true;
          if (!signal.aborted) {
            buttons[index].disabled = true;
            sync();
          }
          return false;
        });
      }
      return slide.decoded;
    }

    function resetProgress() {
      progress?.cancel();
      progress = undefined;
    }

    function sync() {
      if (signal.aborted) return;
      play.hidden = motion.matches;
      play.disabled = !canRotate();
      const playing = current >= 0 && !loading && canRotate() && !manualPause
        && !hovered && !gallery.contains(document.activeElement) && !touch
        && inView && !document.hidden && !suspended && !motion.matches;
      if (!playing) {
        progress?.pause();
        return;
      }
      if (!progress) {
        // The progress bar is also the clock, so both pause and resume together.
        const clock = fills[current].animate(
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          { duration: interval, fill: "both" }
        );
        progress = clock;
        clock.finished.then(() => {
          if (progress === clock && !signal.aborted) select(current + 1);
        }, () => {});
      } else {
        progress.play();
      }
    }

    function preloadNext() {
      if (!inView || document.hidden || suspended || current < 0) return;
      for (let offset = 1; offset < slides.length; offset++) {
        const index = wrap(current + offset);
        if (slides[index].failed) continue;
        void decode(index);
        return;
      }
    }

    async function select(index, direction = 1) {
      const id = ++requestId;
      requested = wrap(index);
      const start = requested;
      loading = true;
      resetProgress();
      for (let offset = 0; offset < slides.length; offset++) {
        const next = wrap(start + offset * direction);
        const ready = await decode(next);
        if (id !== requestId || signal.aborted) return;
        if (!ready) continue;

        if (next !== current) {
          slides.forEach(({ image }, position) => {
            image.classList.toggle("is-previous", position === current);
            image.classList.toggle("is-current", position === next);
            image.setAttribute("aria-hidden", String(position !== next));
          });
          buttons.forEach((button, position) => {
            if (position === next) button.setAttribute("aria-current", "true");
            else button.removeAttribute("aria-current");
          });
        }
        current = requested = next;
        loading = false;
        controls.hidden = false;
        preloadNext();
        sync();
        return;
      }

      slides.forEach(({ image }) => {
        image.classList.remove("is-current", "is-previous");
        image.setAttribute("aria-hidden", "true");
      });
      current = -1;
      loading = false;
      fallback.hidden = false;
      controls.hidden = true;
    }

    buttons.forEach((button, index) => listen(button, "click", () => select(index)));
    listen(play, "click", () => {
      manualPause = !manualPause;
      play.textContent = manualPause ? "播放" : "暂停";
      play.setAttribute("aria-label", manualPause ? "播放自动轮播" : "暂停自动轮播");
      sync();
    });
    listen(gallery, "keydown", event => {
      if (current < 0 || !canRotate() || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      void select(requested + direction, direction);
    });
    listen(gallery, "pointerenter", event => {
      if (event.pointerType !== "mouse") return;
      hovered = true;
      sync();
    });
    listen(gallery, "pointerleave", event => {
      if (event.pointerType !== "mouse") return;
      hovered = false;
      sync();
    });
    listen(gallery, "focusin", sync);
    listen(gallery, "focusout", () => queueMicrotask(sync));

    listen(frame, "pointerdown", event => {
      if (event.pointerType !== "touch" || !event.isPrimary) return;
      touch = { id: event.pointerId, x: event.clientX, y: event.clientY };
      frame.setPointerCapture(event.pointerId);
      sync();
    });
    listen(frame, "pointerup", event => {
      if (touch?.id !== event.pointerId) return;
      const dx = event.clientX - touch.x;
      const dy = event.clientY - touch.y;
      touch = undefined;
      if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        suppressClickUntil = performance.now() + 450;
        if (current >= 0 && canRotate()) {
          const direction = dx < 0 ? 1 : -1;
          void select(requested + direction, direction);
        }
      }
      sync();
    });
    listen(frame, "pointercancel", event => {
      if (touch?.id !== event.pointerId) return;
      touch = undefined;
      sync();
    });
    listen(frame, "lostpointercapture", event => {
      if (touch?.id !== event.pointerId) return;
      touch = undefined;
      sync();
    });
    listen(frame, "click", () => {
      if (performance.now() >= suppressClickUntil) details.open = !details.open;
    });

    function updateVisibility(visible) {
      inView = visible;
      if (inView && !started && !document.hidden && !suspended) {
        started = true;
        void select(0);
      }
      preloadNext();
      sync();
    }

    const observer = new IntersectionObserver(([entry]) => {
      updateVisibility(entry.isIntersecting && entry.intersectionRatio >= .25);
    }, { threshold: .25 });
    observer.observe(frame);
    signal.addEventListener("abort", () => {
      observer.disconnect();
      resetProgress();
    }, { once: true });
    return () => updateVisibility(inView);
  }

  const refresh = [...galleries].map(connect);
  const syncAll = () => refresh.forEach(sync => sync());
  listen(document, "visibilitychange", syncAll);
  listen(motion, "change", syncAll);
  listen(window, "pagehide", event => {
    suspended = true;
    if (event.persisted) syncAll();
    else lifecycle.abort();
  });
  listen(window, "pageshow", () => {
    suspended = false;
    syncAll();
  });
})();
