(() => {
  "use strict";
  const page = document.querySelector("body.legacy-v41");
  if (!page) return;

  // Shared site-nav.js owns the global menu. This class keeps the V4.1
  // mobile fallback rules from interfering when scripts are available.
  page.classList.add("legacy-nav-ready");
  const start = page.querySelector("[data-doc-start]");
  const bridge = document.getElementById("legacy-bridge");
  if (start && bridge) {
    start.addEventListener("click", (event) => {
      event.preventDefault();
      const heading = document.getElementById("legacy-bridge-title");
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      bridge.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }

  function watchImages(root) {
    root.querySelectorAll(".doc-media img").forEach(image => {
      const showFallback = () => {
        image.hidden = true;
        image.nextElementSibling.hidden = false;
      };
      if (image.complete && !image.naturalWidth) showFallback();
      else image.addEventListener("error", showFallback, { once: true });
    });
  }

  watchImages(page);
  const dialog = page.querySelector(".doc-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const body = dialog.querySelector(".doc-dialog__body");
  const scroll = dialog.querySelector(".doc-dialog__scroll");
  const status = page.querySelector(".doc-status");
  const stories = new Map([...page.querySelectorAll("[data-story]")].map(story => [story.dataset.story, story]));
  const closeButton = dialog.querySelector("[data-doc-close]");
  if (stories.size !== 6) {
    status.textContent = "部分资料暂未载入，可先阅读已显示的故事";
    status.hidden = false;
  }
  let returnFocus;
  let activeId;
  let closing = false;

  function showStory(id, trigger) {
    const story = stories.get(id);
    if (!story) return false;
    const source = story.querySelector(".doc-article");
    if (!source?.querySelector(".doc-article__title")) {
      status.textContent = "故事暂未载入，请重新打开页面";
      status.hidden = false;
      return false;
    }

    const article = source.cloneNode(true);
    const heading = article.querySelector(".doc-article__title");
    heading.id = "doc-dialog-title";
    heading.tabIndex = -1;
    body.replaceChildren(article);
    watchImages(article);
    returnFocus = trigger || story.querySelector("summary");
    activeId = id;
    if (!dialog.open) dialog.showModal();
    page.classList.add("doc-modal-open");
    heading.focus({ preventScroll: true });
    scroll.scrollTop = 0;
    return true;
  }

  function closeStory() {
    if (dialog.open) dialog.close();
    page.classList.remove("doc-modal-open");
    body.replaceChildren();
    if (activeId) returnFocus?.focus({ preventScroll: true });
    returnFocus = undefined;
    activeId = undefined;
    closing = false;
  }

  function requestClose() {
    if (!dialog.open || closing) return;
    if (history.state?.v43Story === activeId) {
      closing = true;
      history.back();
    } else {
      closeStory();
    }
  }

  stories.forEach((story, id) => {
    const trigger = story.querySelector("summary");
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.addEventListener("click", event => {
      event.preventDefault();
      if (!showStory(id, trigger)) return;
      try {
        history.pushState({ ...history.state, v43Story: id }, "");
      } catch {
        // The dialog is still usable on origins without History API access.
      }
    });
  });

  closeButton.addEventListener("click", requestClose);
  dialog.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const controls = [closeButton, ...body.querySelectorAll("a[href]"), scroll];
    const active = controls.indexOf(document.activeElement);
    const target = event.shiftKey
      ? controls[active > 0 ? active - 1 : controls.length - 1]
      : controls[(active + 1) % controls.length];
    target.focus({ preventScroll: target === closeButton || target === scroll });
  });
  dialog.addEventListener("cancel", event => {
    event.preventDefault();
    requestClose();
  });
  window.addEventListener("popstate", () => {
    const id = history.state?.v43Story;
    if (!id || !showStory(id)) closeStory();
    closing = false;
  });
  if (history.state?.v43Story) showStory(history.state.v43Story);
})();
