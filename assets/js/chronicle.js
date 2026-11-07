(() => {
  const events = window.LM_EVENTS;
  document.querySelector("#event-count").textContent = events.length;
  const list = document.querySelector("#event-list");
  const dialog = document.querySelector("#event-dialog");
  const search = document.querySelector("#event-search");
  const filters = [...document.querySelectorAll("[data-filter]")];
  const readingReturnKey = "longmarch-b:chronicle-return:v1";
  let year = "all",
    current = 0,
    focusId = null,
    focusWasReadButton = false;
  const read = new Set(
    LM_STORE.read(
      "read",
      [],
      (v) => Array.isArray(v) && v.every((id) => typeof id === "string"),
    ).filter((id) => events.some((e) => e.id === id)),
  );
  const el = (tag, cls, value) => {
    const node = document.createElement(tag);
    node.className = cls;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  function setStageTitle(node, event) {
    const art = window.LM_STAGE_TITLE_ART?.[event.id];
    if (!art) { node.textContent = event.title; return; }
    const label = el("span", "lm-sr-only", event.title);
    const image = el("img", "");
    image.width = art.width;
    image.height = art.height;
    image.alt = "";
    image.decoding = "async";
    image.loading = "lazy";
    if (!node.closest("dialog")) image.fetchPriority = "low";
    image.src = art.src;
    image.onerror = () => { label.classList.remove("lm-sr-only"); image.remove(); };
    node.classList.add("lm-stage-title");
    node.replaceChildren(label, image);
  }
  function render() {
    list.replaceChildren();
    const query = search.value.trim().toLocaleLowerCase();
    const shown = events.filter(
      (e) =>
        (year === "all" || e.year === year) &&
        [e.title, e.location, e.date, e.summary, e.theme]
          .join(" ")
          .toLocaleLowerCase()
          .includes(query),
    );
    shown.forEach((event) => {
      const article = el(
        "article",
        "lm-event" + (read.has(event.id) ? " is-read" : ""),
      );
      article.id = "event-" + event.id;
      const date = el("div", "lm-event-date");
      const [month, day] = event.date.slice(5).split(".");
      const monthLabel = month.replace(/(^|—)0/g, "$1");
      const dateLabel =
        monthLabel + "月" + (day ? day.replace(/^0/, "") + "日" : "");
      date.append(
        el("span", "lm-event-date-year", event.year),
        el("span", "lm-event-date-rest", dateLabel),
      );
      date.append(
        el(
          "span",
          "lm-event-year",
          read.has(event.id) ? "已阅 · " + event.theme : event.theme,
        ),
      );
      const content = el("div", "lm-event-content");
      content.append(date);
      content.append(el("p", "lm-event-place", event.location));
      const heading = el("h3", "");
      const button = el("button", "", event.title);
      setStageTitle(button, event);
      button.addEventListener("click", () => openEvent(event.id));
      heading.append(button);
      const more = el("button", "lm-event-read", "展开这段纪事");
      more.setAttribute("aria-label", "展开史实：" + event.title);
      more.addEventListener("click", () => openEvent(event.id));
      content.append(
        heading,
        el("p", "lm-event-summary", event.summary),
        more,
      );
      const art = el("figure", "lm-stage-art");
      const illustration = el("img", "");
      illustration.alt = "";
      illustration.width = 720;
      illustration.height = 480;
      illustration.loading = "lazy";
      illustration.decoding = "async";
      illustration.fetchPriority = "low";
      illustration.setAttribute("aria-hidden", "true");
      illustration.src = "assets/images/illustrations/" + event.id + "-v1.webp";
      art.append(illustration);
      article.append(content, art);
      list.append(article);
    });
    document.querySelector("#empty-events").hidden = shown.length > 0;
    document.querySelector("#search-status").textContent =
      `找到 ${shown.length} 段纪事`;
    document.querySelector("#read-count").textContent = read.size;
  }
  function showDetail(index) {
    current = index;
    const event = events[index];
    document.querySelector("#detail-date").textContent =
      event.date + " · " + event.theme;
    setStageTitle(document.querySelector("#event-dialog-title"), event);
    document.querySelector("#detail-place").textContent = event.location;
    document.querySelector("#article-bar-title").textContent = event.title;
    document.querySelector("#detail-lead").textContent = event.lead;
    const image = document.querySelector("#detail-image");
    const imageError = document.querySelector("#detail-image-error");
    image.hidden = false;
    imageError.hidden = true;
    image.onload = () => {
      image.hidden = false;
      imageError.hidden = true;
    };
    image.onerror = () => {
      image.hidden = true;
      imageError.hidden = false;
    };
    image.alt = event.image.alt;
    image.width = event.image.width || 1200;
    image.height = event.image.height || 800;
    image.classList.toggle("is-route-map", event.image.type === "map");
    image.src = event.image.src;
    document.querySelector("#detail-caption").textContent = event.image.caption;
    const fullImage = document.querySelector("#detail-image-full");
    fullImage.hidden = !event.image.full;
    fullImage.href = event.image.full || "#";
    fullImage.setAttribute("aria-label", "查看" + event.title + "配图大图（在新页面打开）");
    const sections = document.querySelector("#detail-sections");
    sections.replaceChildren(
      ...event.sections.map((section) => {
        const block = el("section", "lm-article-section");
        block.append(el("h3", "", section.heading), el("p", "", section.text));
        return block;
      }),
    );
    document.querySelector("#detail-timeline").replaceChildren(
      ...event.timeline.map((step) => {
        const li = el("li", "");
        li.append(
          el("span", "lm-article-step-date", step.date),
          el("p", "", step.text),
        );
        return li;
      }),
    );
    document.querySelector("#detail-focus-title").textContent =
      event.focus.title;
    document.querySelector("#detail-focus-text").textContent = event.focus.text;
    document.querySelector("#detail-mail").href =
      "post-office.html?event=" + encodeURIComponent(event.id) + "&readFrom=chronicle";
    document.querySelector("#detail-position").textContent =
      `${index + 1} / ${events.length}`;
    document.querySelector("#previous-event").disabled = index === 0;
    document.querySelector("#next-event").textContent =
      index === events.length - 1 ? "结束阅读" : "下一段 →";
    read.add(event.id);
    LM_STORE.write("read", [...read]);
    history.replaceState(history.state, "", "#event=" + event.id);
    dialog.scrollTop = 0;
  }
  function openEvent(id) {
    const index = events.findIndex((e) => e.id === id);
    if (index < 0) return;
    if (!dialog.open) {
      focusId = id;
      focusWasReadButton =
        document.activeElement?.classList.contains("lm-event-read");
    }
    showDetail(index);
    if (!dialog.open) {
      dialog.showModal();
      // 浏览器可能恢复已关闭弹窗的滚动位置，展开后再回到文章开头。
      dialog.scrollTop = 0;
    }
  }
  dialog.addEventListener("close", () => {
    history.replaceState(
      null,
      "",
      location.pathname + location.search + "#chronicle",
    );
    render();
    document
      .querySelector(
        "#event-" +
          focusId +
          " " +
          (focusWasReadButton ? ".lm-event-read" : "h3 button"),
      )
      ?.focus({ preventScroll: true });
  });
  document.querySelector("#previous-event").addEventListener("click", () => {
    if (current > 0) showDetail(current - 1);
  });
  document.querySelector("#next-event").addEventListener("click", () => {
    if (current < events.length - 1) showDetail(current + 1);
    else {
      dialog.close();
      document.querySelector("#chronicle").scrollIntoView({ block: "start" });
    }
  });
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      year = button.dataset.filter;
      filters.forEach((b) => {
        b.classList.toggle("is-active", b === button);
        b.setAttribute("aria-pressed", String(b === button));
      });
      render();
    }),
  );
  search.addEventListener("input", render);
  document.querySelector("#reset-search").addEventListener("click", () => {
    search.value = "";
    filters[0].click();
    search.focus();
  });
  function rememberReading() {
    const snapshot = {
      eventId: events[current].id,
      articleScroll: dialog.scrollTop,
      pageScroll: window.scrollY,
      year,
      query: search.value,
    };
    try {
      sessionStorage.setItem(readingReturnKey, JSON.stringify(snapshot));
      history.replaceState({ ...history.state, shanheChronicleReading: snapshot }, "");
    } catch {
      // The return URL still opens the same article when storage is unavailable.
    }
  }
  document.querySelector("#detail-mail").addEventListener("click", rememberReading);
  document.querySelector("#detail-mail").addEventListener("auxclick", rememberReading);
  const resumeId = new URLSearchParams(location.search).get("resumeReading");
  let resumeReading = null;
  const fromHistory = performance.getEntriesByType("navigation")[0]?.type === "back_forward"
    ? history.state?.shanheChronicleReading : null;
  if (resumeId || fromHistory) {
    try {
      const saved = resumeId ? JSON.parse(sessionStorage.getItem(readingReturnKey)) : fromHistory;
      const expectedId = resumeId || location.hash.slice("#event=".length);
      if (saved?.eventId === expectedId && events.some(event => event.id === expectedId)
        && Number.isFinite(saved.articleScroll) && saved.articleScroll >= 0
        && Number.isFinite(saved.pageScroll) && saved.pageScroll >= 0) {
        resumeReading = saved;
        year = ["all", "1934", "1935", "1936"].includes(saved.year) ? saved.year : "all";
        search.value = typeof saved.query === "string" ? saved.query : "";
        filters.forEach(button => {
          const active = button.dataset.filter === year;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", String(active));
        });
      }
    } catch {
      // A missing or damaged snapshot falls back to the article's beginning.
    }
    if (resumeId) {
      const url = new URL(location.href);
      url.searchParams.delete("resumeReading");
      history.replaceState(history.state, "", url);
    }
  }
  render();
  const deepLink = location.hash.match(/^#event=([a-z]+)$/);
  if (deepLink) {
    openEvent(deepLink[1]);
    if (resumeReading && deepLink[1] === resumeReading.eventId) {
      let interrupted = false;
      const stopRestoring = () => { interrupted = true; };
      for (const type of ["wheel", "touchstart", "keydown", "pointerdown"])
        dialog.addEventListener(type, stopRestoring, { once: true, passive: true });
      const restore = () => {
        if (interrupted || !dialog.open || events[current].id !== resumeReading.eventId) return;
        window.scrollTo({ top: resumeReading.pageScroll, behavior: "instant" });
        dialog.scrollTop = resumeReading.articleScroll;
      };
      requestAnimationFrame(restore);
      Promise.all([
        document.fonts.ready,
        document.querySelector("#detail-image").decode().catch(() => {}),
      ]).then(() => requestAnimationFrame(restore));
    }
  }
  window.addEventListener("hashchange", () => {
    const match = location.hash.match(/^#event=([a-z]+)$/);
    if (match) openEvent(match[1]);
  });
})();
