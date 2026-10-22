(() => {
  const events = window.LM_EVENTS;
  const list = document.querySelector("#event-list");
  const dialog = document.querySelector("#event-dialog");
  const search = document.querySelector("#event-search");
  const filters = [...document.querySelectorAll("[data-filter]")];
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
      const date = el("div", "lm-event-date", event.date);
      date.append(
        el(
          "span",
          "lm-event-year",
          read.has(event.id) ? "已阅 · " + event.theme : event.theme,
        ),
      );
      const content = el("div", "lm-event-content");
      content.append(el("p", "lm-event-place", event.location));
      const heading = el("h3", "");
      const button = el("button", "", event.title);
      button.addEventListener("click", () => openEvent(event.id));
      heading.append(button);
      const more = el("button", "lm-event-read", "展开史实 ↗");
      more.setAttribute("aria-label", "展开史实：" + event.title);
      more.addEventListener("click", () => openEvent(event.id));
      const theme = el("span", "lm-event-theme", event.theme);
      theme.setAttribute("aria-hidden", "true");
      content.append(
        heading,
        el("p", "lm-event-summary", event.summary),
        more,
        theme,
      );
      article.append(date, content);
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
    document.querySelector("#event-dialog-title").textContent = event.title;
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
    image.src = event.image.src;
    document.querySelector("#detail-caption").textContent = event.image.caption;
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
    document.querySelector("#detail-notes").open = false;
    const sources = document.querySelector("#detail-sources");
    sources.replaceChildren();
    event.sources.forEach((source) => {
      const li = el("li", "");
      li.textContent = source.name;
      sources.append(li);
    });
    document.querySelector("#detail-image-credit").textContent =
      "配图：" +
      event.image.credit +
      "。" +
      (event.image.licenseUrl ? "等比例缩小并转换为 WebP，未重新着色。" : "");
    const license = document.querySelector("#detail-license");
    license.textContent = event.image.licenseUrl
      ? "图片许可：" + event.image.licenseUrl
      : "";
    license.hidden = !event.image.licenseUrl;
    document.querySelector("#detail-mail").href =
      "post-office.html?event=" + encodeURIComponent(event.id);
    document.querySelector("#detail-position").textContent =
      `${index + 1} / ${events.length}`;
    document.querySelector("#previous-event").disabled = index === 0;
    document.querySelector("#next-event").disabled =
      index === events.length - 1;
    read.add(event.id);
    LM_STORE.write("read", [...read]);
    history.replaceState(null, "", "#event=" + event.id);
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
  render();
  const deepLink = location.hash.match(/^#event=([a-z]+)$/);
  if (deepLink) openEvent(deepLink[1]);
  window.addEventListener("hashchange", () => {
    const match = location.hash.match(/^#event=([a-z]+)$/);
    if (match) openEvent(match[1]);
  });
})();
