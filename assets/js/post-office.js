(() => {
  const $ = (selector) => document.querySelector(selector);
  document.querySelectorAll("[data-postbox]").forEach((model) => {
    model.append($("#postbox-template").content.cloneNode(true));
    if (model.closest(".lm-mailbox-scene")) model.querySelector(".lm-postbox-receipt")?.remove();
  });
  const form = $("#letter-form"),
    body = $("#letter-body"),
    nickname = $("#nickname");
  const delivery = $("#delivery-dialog"),
    prepare = $("#prepare-dialog"),
    letterDialog = $("#letter-dialog"),
    deleteDialog = $("#delete-dialog");
  const tabs = [$("#write-tab"), $("#saved-tab")];
  const panels = [$("#write-panel"), $("#saved-panel")];
  const deliveryCopy = [
    "字落信笺，心意渐成",
    "信笺入封，邮票寄情",
    "一纸封缄，将心意妥帖珍藏",
    "信件启程，穿越山河与岁月",
    "来信已妥善收录于山河邮局，感谢你留下这份心意",
  ];
  const getMessages = () => LM_STORE.readMessages();
  let bulkMode = false, pendingDelete = null;
  const bulkSelected = new Set();
  const knownEvent = (id) => window.LM_EVENTS.find((e) => e.id === id);
  let messages = getMessages(),
    eventId = null,
    selectedId = null,
    draftTimer,
    deliveryTimer,
    sending = false;
  const { stamps, papers } = window.LM_POSTAL;
  const stampById = id => stamps.find(stamp => stamp.id === id);
  const paperById = id => papers.find(paper => paper.id === id);
  const stampTextures = new Map();
  const stampImage = id => stampTextures.get(id) || "assets/images/stamps/" + id + "-v1.webp";
  const paperPreviewImage = id => "assets/images/stationery/" + id + "-preview-v1.webp";
  const fullPaperTextures = new Map();
  const readyPaperTextures = new Map();
  function fullPaperTexture(id) {
    if (fullPaperTextures.has(id)) return fullPaperTextures.get(id);
    const loaded = (async () => {
      let source;
      try {
        const response = await fetch("assets/images/stationery/" + id + "-v1.webp", { priority: "high" });
        if (!response.ok) throw Error("paper-image");
        source = URL.createObjectURL(await response.blob());
        const image = new Image();
        image.decoding = "async";
        image.src = source;
        await image.decode();
        readyPaperTextures.set(id, source);
        return source;
      } catch {
        if (source) URL.revokeObjectURL(source);
        fullPaperTextures.delete(id);
        return null;
      }
    })();
    fullPaperTextures.set(id, loaded);
    return loaded;
  }
  let stampId = null, paperId = null, pendingLetter = null;
  let stampPreviewsReady, preparingStamps = false, letterOpenSequence = 0;
  function preloadStampPreviews() {
    if (stampPreviewsReady) return stampPreviewsReady;
    stampPreviewsReady = (async () => {
      let bundled = {};
      try {
        const response = await fetch("data/stamp-previews.json?v=20261107-ready-art");
        if (response.ok) bundled = await response.json();
      } catch { /* Use original image files if the bundle cannot be fetched. */ }
      const images = Array.from(document.querySelectorAll("#stamp-options img"));
      await Promise.all(images.map(async image => {
        const id = image.closest("label").querySelector("input").value;
        const embedded = bundled?.[id];
        image.src = typeof embedded === "string" && embedded.startsWith("data:image/webp;base64,") ? embedded : "assets/images/stamps/" + id + "-v1.webp";
        await image.decode();
        stampTextures.set(id, image.currentSrc);
      }));
    })().catch(() => { stampPreviewsReady = null; });
    return stampPreviewsReady;
  }
  let paperPreviewsReady;
  function preloadPaperPreviews() {
    if (paperPreviewsReady) return paperPreviewsReady;
    paperPreviewsReady = (async () => {
      let bundled = {};
      try {
        const response = await fetch("data/paper-previews.json?v=20261107-preload");
        if (response.ok) {
          const value = await response.json();
          if (value && typeof value === "object" && !Array.isArray(value)) bundled = value;
        }
      } catch { /* Individual preview files remain a fallback. */ }
      const images = Array.from(document.querySelectorAll("#paper-options img"));
      images.forEach(image => {
        const art = image.closest(".lm-paper-sample");
        const id = image.closest("label").querySelector("input").value;
        art.dataset.state = "loading";
        const embedded = bundled[id];
        image.src = typeof embedded === "string" && embedded.startsWith("data:image/webp;base64,") ? embedded : image.dataset.src;
      });
      await Promise.all(images.map(async image => {
        try {
          await image.decode();
          image.closest(".lm-paper-sample").dataset.state = "ready";
        } catch { /* The image error handler exposes a retry only on failure. */ }
      }));
    })();
    return paperPreviewsReady;
  }
  let packingFrame = 0, packingResizeObserver;
  function stopPacking() {
    cancelAnimationFrame(packingFrame);
    packingResizeObserver?.disconnect();
  }
  function applyPaper(node, id, source) {
    const paper = paperById(id);
    if (paper && !source) return;
    node.querySelector(":scope > .lm-paper-art")?.remove();
    node.classList.add("lm-stationery");
    if (paper) node.dataset.paper = id;
    else delete node.dataset.paper;
    node.toggleAttribute("data-paper-illustrated", Boolean(paper?.ornament));
    if (!paper) return;
    const art = text("div", "lm-paper-art", "");
    art.setAttribute("aria-hidden", "true");
    function slice(name, start, height) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add("lm-paper-art-" + name);
      svg.setAttribute("viewBox", "0 " + start + " 640 " + height);
      svg.setAttribute("preserveAspectRatio", "none");
      const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
      image.setAttribute("width", "640"); image.setAttribute("height", "896");
      image.setAttribute("href", source);
      svg.append(image); art.append(svg);
    }
    if (paper.ornament) slice("header", 0, 180);
    const footerStart = paper.footerStart ?? 640;
    slice("footer", footerStart, 896 - footerStart);
    node.prepend(art);
  }
  stamps.forEach(stamp => {
    const label = text("label", "lm-stamp-option", "");
    const radio = document.createElement("input");
    radio.type = "radio"; radio.name = "illustrated-stamp"; radio.value = stamp.id;
    const art = text("span", "lm-stamp", "");
    art.setAttribute("aria-hidden", "true");
    const image = document.createElement("img");
    image.loading = "eager"; image.decoding = "async";
    image.alt = ""; image.width = 180; image.height = 225;
    art.append(image, text("span", "", stamp.name));
    label.append(radio, art, text("strong", "", stamp.name), text("small", "", stamp.caption));
    label.dataset.group = stamp.group;
    label.hidden = stamp.group !== "history";
    radio.addEventListener("change", () => {
      stampId = stamp.id;
      $("#choose-paper").disabled = false;
      $("#stamp-selection").textContent = "已选：" + stamp.name;
      saveDraft();
    });
    $("#stamp-options").append(label);
  });
  papers.forEach(paper => {
    const label = text("label", "lm-paper-option", "");
    const radio = document.createElement("input");
    radio.type = "radio"; radio.name = "letter-paper"; radio.value = paper.id;
    const art = text("span", "lm-paper-sample", "");
    art.setAttribute("aria-hidden", "true");
    art.dataset.state = "idle";
    const image = document.createElement("img");
    image.loading = "eager"; image.decoding = "async"; image.fetchPriority = "high";
    image.dataset.src = paperPreviewImage(paper.id); image.alt = ""; image.width = 240; image.height = 336;
    const status = text("span", "lm-paper-sample-status", "");
    image.addEventListener("load", () => {
      if (image.naturalWidth) {
        art.dataset.state = "ready";
        if (paperId === paper.id) $("#preview-letter").disabled = false;
      }
    });
    image.addEventListener("error", () => {
      art.dataset.state = "error";
      status.textContent = "图案未载入，点此重试";
      if (paperId === paper.id) $("#preview-letter").disabled = true;
    });
    label.addEventListener("click", () => {
      if (art.dataset.state !== "error") return;
      art.dataset.state = "loading";
      status.textContent = "";
      image.src = image.dataset.src + "?retry=" + Date.now();
    });
    art.append(image, text("span", "lm-paper-sample-salutation", "致长征路上的你们："), status);
    label.append(radio, art, text("strong", "", paper.name), text("small", "", paper.caption));
    radio.addEventListener("change", () => {
      paperId = paper.id;
      $("#paper-selection").textContent = "已选：" + paper.name;
      $("#preview-letter").disabled = art.dataset.state !== "ready";
      fullPaperTexture(paper.id);
      // 书写区固定使用默认纸面，款式只应用于正式信件。
      saveDraft();
    });
    $("#paper-options").append(label);
  });
  form.addEventListener("focusin", () => { preloadStampPreviews(); preloadPaperPreviews(); }, { once: true });
  function filterStamps(group) {
    document.querySelectorAll("[data-stamp-group]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.stampGroup === group)));
    document.querySelectorAll(".lm-stamp-option").forEach(label => label.hidden = label.dataset.group !== group);
    $("#stamp-options").scrollTop = 0;
  }
  document.querySelectorAll("[data-stamp-group]").forEach(button => {
    button.querySelector("span").textContent = stamps.filter(stamp => stamp.group === button.dataset.stampGroup).length;
    button.addEventListener("click", () => filterStamps(button.dataset.stampGroup));
  });
  const dateFormat = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  function text(tag, cls, value) {
    const node = document.createElement(tag);
    node.className = cls;
    node.textContent = value;
    return node;
  }
  const draft = LM_STORE.read(
    "draft",
    { body: "", nickname: "", eventId: null },
    LM_STORE.draftValid,
  );
  body.value = draft.body;
  nickname.value = draft.nickname;
  if (stampById(draft.stampId)) {
    stampId = draft.stampId;
    $("#stamp-options input[value='" + stampId + "']").checked = true;
    $("#choose-paper").disabled = false;
    $("#stamp-selection").textContent = "已选：" + stampById(stampId).name;
    filterStamps(stampById(stampId).group);
  }
  if (paperById(draft.paperId)) {
    paperId = draft.paperId;
    $("#paper-options input[value='" + paperId + "']").checked = true;
    $("#paper-selection").textContent = "已选：" + paperById(paperId).name;
    $("#preview-letter").disabled = false;
  }
  const query = new URLSearchParams(location.search);
  const queryEvent = query.get("event");
  const referrer = document.referrer && new URL(document.referrer);
  const chronicleUrl = new URL("chronicle.html", location.href);
  const fromChronicle = referrer?.origin === chronicleUrl.origin &&
    referrer.pathname === chronicleUrl.pathname;
  const readingEvent = fromChronicle && query.get("readFrom") === "chronicle" && knownEvent(queryEvent);
  if (readingEvent) {
    const back = chronicleUrl;
    back.searchParams.set("resumeReading", readingEvent.id);
    back.hash = "event=" + readingEvent.id;
    const link = $("[data-reading-return]");
    link.href = back.href;
    link.hidden = false;
  }
  eventId = knownEvent(queryEvent)?.id || knownEvent(draft.eventId)?.id || null;
  function renderContext() {
    const event = knownEvent(eventId);
    $("#event-context").hidden = !event;
    if (event)
      $("#event-context").textContent =
        "读过「" + event.title + "」之后，想写下此刻的感受";
  }
  renderContext();
  $("#character-count").textContent = body.value.length;
  if (draft.body || draft.nickname)
    $("#draft-status").textContent = "已恢复上次草稿";
  if (LM_STORE.recovered)
    $("#form-error").textContent = "已从备用记录恢复留言，可在「我的留言」中导出备份";
  else if (LM_STORE.damaged)
    $("#form-error").textContent =
      "已保留可以恢复的留言，部分记录仍无法读取；请先备份现有留言，保留网站数据";
  function saveDraft() {
    clearTimeout(draftTimer);
    const success = LM_STORE.write("draft", {
      body: body.value,
      nickname: nickname.value,
      eventId,
      stampId,
      paperId,
    });
    $("#draft-status").textContent = success
      ? "草稿已保存"
      : "草稿未能保存，请先复制留存";
    return success;
  }
  function onInput() {
    $("#character-count").textContent = body.value.length;
    $("#draft-status").textContent = "正在保存草稿…";
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 400);
    $("#form-error").textContent = "";
  }
  body.addEventListener("input", onInput);
  nickname.addEventListener("input", onInput);
  window.addEventListener("pagehide", () => {
    if (draftTimer) saveDraft();
  });
  function switchTab(index) {
    if (index === 0 && bulkMode) {
      bulkMode = false;
      bulkSelected.clear();
    }
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (index === 1) renderMessages();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => switchTab(index));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
      switchTab(next);
      tabs[next].focus();
    });
  });
  $("#post-entry").addEventListener("click", () => switchTab(0));
  $("#start-writing").addEventListener("click", () => {
    switchTab(0);
    body.focus();
  });
  const promptButtons = document.querySelectorAll("[data-prompt]");
  const promptPanels = $("#prompt-hint").querySelectorAll("[data-prompt-panel]");
  promptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") return;
      promptButtons.forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
      promptPanels.forEach((panel) => {
        if (panel.dataset.promptPanel === button.dataset.prompt) panel.removeAttribute("aria-hidden");
        else panel.setAttribute("aria-hidden", "true");
      });
    });
  });
  function renderMessages() {
    messages = getMessages().sort((a, b) => b.createdAt - a.createdAt);
    const available = new Set(messages.map(message => message.id));
    for (const id of bulkSelected) if (!available.has(id)) bulkSelected.delete(id);
    if (!messages.length) bulkMode = false;
    $("#saved-count").textContent = messages.length;
    $("#empty-letters").hidden = messages.length > 0;
    $("#export-all").hidden = messages.length === 0;
    syncBulkControls();
    const list = $("#saved-list");
    list.replaceChildren();
    messages.forEach((message) => {
      const button = text(bulkMode ? "label" : "button", "lm-letter-preview" + (bulkMode ? " lm-letter-preview--select" : ""), "");
      if (!bulkMode) button.type = "button";
      button.setAttribute(
        "aria-label",
        "查看" +
          dateFormat.format(message.createdAt) +
          "的留言，署名" +
          (message.nickname || "无名来信人"),
      );
      const time = text("time", "", dateFormat.format(message.createdAt));
      time.dateTime = new Date(message.createdAt).toISOString();
      const top = text("span", "lm-preview-top", "");
      top.append(time);
      const stamp = stampById(message.stampId);
      if (stamp) {
        const mark = text("span", "lm-stamp lm-preview-stamp", "");
        const image = document.createElement("img");
        image.src = stampImage(stamp.id);
        image.alt = "";
        image.width = 240;
        image.height = 300;
        image.loading = "lazy";
        image.decoding = "async";
        mark.append(image, text("span", "", stamp.name));
        top.append(mark);
        button.setAttribute("aria-label", button.getAttribute("aria-label") + "，邮票" + stamp.name);
      }
      const excerpt = text("p", "lm-preview-body", message.body);
      const bottom = text("span", "lm-preview-bottom", "");
      const action = text("span", "", bulkMode ? (bulkSelected.has(message.id) ? "已选择" : "选择留言") : "展开留言 ↗");
      bottom.append(
        text("span", "", message.nickname || "一位无名来信人"),
        action,
      );
      button.append(top, excerpt, bottom);
      if (bulkMode) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "lm-letter-select";
        checkbox.value = message.id;
        checkbox.checked = bulkSelected.has(message.id);
        checkbox.setAttribute("aria-label", "选择" + button.getAttribute("aria-label").slice(2));
        button.removeAttribute("aria-label");
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) bulkSelected.add(message.id);
          else bulkSelected.delete(message.id);
          action.textContent = checkbox.checked ? "已选择" : "选择留言";
          syncBulkControls();
        });
        button.prepend(checkbox);
      } else button.addEventListener("click", () => openLetter(message.id));
      list.append(button);
    });
  }
  function syncBulkControls() {
    $("#manage-letters").hidden = bulkMode || messages.length === 0;
    $("#bulk-letter-tools").hidden = !bulkMode;
    $("#bulk-selection-count").textContent = "已选择 " + bulkSelected.size + " 封留言";
    $("#select-all-letters").checked = messages.length > 0 && bulkSelected.size === messages.length;
    $("#select-all-letters").indeterminate = bulkSelected.size > 0 && bulkSelected.size < messages.length;
    $("#delete-selected-letters").disabled = bulkSelected.size === 0;
  }
  $("#manage-letters").addEventListener("click", () => {
    bulkMode = true;
    bulkSelected.clear();
    ++letterOpenSequence;
    $("#saved-warning").textContent = "";
    renderMessages();
    $("#select-all-letters").focus({ preventScroll: true });
  });
  $("#cancel-letter-selection").addEventListener("click", () => {
    bulkMode = false;
    bulkSelected.clear();
    renderMessages();
    $("#manage-letters").focus({ preventScroll: true });
  });
  $("#select-all-letters").addEventListener("change", event => {
    bulkSelected.clear();
    if (event.target.checked) messages.forEach(message => bulkSelected.add(message.id));
    renderMessages();
  });
  $("#delete-selected-letters").addEventListener("click", () => {
    if (bulkMode && bulkSelected.size) confirmDeletion([...bulkSelected], true);
  });
  function finishDelivery() {
    clearTimeout(deliveryTimer);
    stopPacking();
    delivery.classList.remove("is-packing");
    delivery.dataset.phase = "delivered";
    delivery.classList.remove("is-delivering");
    delivery.classList.add("is-delivered");
    $("#delivery-title").textContent = deliveryCopy[4];
    $("#delivery-description").textContent =
      "留言已保存，可到「我的留言」中查看或备份";
    $("#skip-delivery").hidden = true;
    $("#delivery-actions").hidden = false;
    delivery.dataset.locked = "false";
    sending = false;
    $("#send-letter").disabled = false;
    $("#view-sent").focus();
  }
  function validateLetter() {
    const content = body.value.trim(),
      signer = nickname.value.trim();
    if (!content) {
      $("#form-error").textContent = "请先写下留言内容，再选择邮票和信纸";
      body.focus();
      return null;
    }
    if (content.length > 2000 || signer.length > 20) {
      $("#form-error").textContent =
        "留言最多2000字，署名最多20字";
      return null;
    }
    return { body: content, nickname: signer, eventId };
  }
  function chooseStamp() {
    preloadStampPreviews();
    preloadPaperPreviews();
    $("#stamp-choice").hidden = false;
    $("#paper-choice").hidden = true;
    $("#letter-review").hidden = true;
    $("#prepare-step").hidden = true;
    $("#prepare-title").textContent = "为这封信挑一枚邮票，寄出这份心意";
  }
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (sending || preparingStamps || !validateLetter()) return;
    preparingStamps = true;
    $("#send-letter").disabled = true;
    $("#send-letter").setAttribute("aria-busy", "true");
    try { await preloadStampPreviews(); }
    finally {
      preparingStamps = false;
      $("#send-letter").disabled = false;
      $("#send-letter").removeAttribute("aria-busy");
    }
    if (stampTextures.size !== stamps.length) {
      $("#form-error").textContent = "邮票图案暂未载入，请再试一次";
      return;
    }
    if (panels[0].hidden) return;
    pendingLetter = validateLetter();
    if (!pendingLetter) return;
    chooseStamp();
    $("#prepare-error").textContent = "";
    prepare.showModal();
  });
  $("#back-to-stamps").addEventListener("click", () => {
    chooseStamp();
    $("#stamp-options input:checked")?.focus();
  });
  async function choosePaper() {
    if (!stampById(stampId)) return;
    const button = $("#choose-paper");
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    try { await preloadPaperPreviews(); }
    finally {
      button.disabled = !stampById(stampId);
      button.removeAttribute("aria-busy");
    }
    if (!prepare.open) return;
    const selectedArt = $("#paper-options input:checked")?.closest("label").querySelector(".lm-paper-sample");
    $("#preview-letter").disabled = selectedArt?.dataset.state !== "ready";
    if (paperById(paperId)) fullPaperTexture(paperId);
    $("#stamp-choice").hidden = true;
    $("#paper-choice").hidden = false;
    $("#letter-review").hidden = true;
    $("#prepare-step").hidden = true;
    $("#prepare-title").textContent = "为这封信挑一张合适的信纸";
    ($("#paper-options input:checked") || $("#paper-options input"))?.focus();
  }
  $("#choose-paper").addEventListener("click", choosePaper);
  $("#change-paper").addEventListener("click", choosePaper);
  $("#preview-letter").addEventListener("click", async () => {
    const stamp = stampById(stampId);
    if (!pendingLetter || !stamp || !paperById(paperId)) return;
    const requestedPaper = paperId, button = $("#preview-letter");
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    let source;
    try { source = await fullPaperTexture(requestedPaper); }
    finally { button.disabled = false; button.removeAttribute("aria-busy"); }
    if (!prepare.open || paperId !== requestedPaper) return;
    if (!source) {
      $("#prepare-error").textContent = "清晰信纸暂未载入，请再试一次";
      return;
    }
    $("#prepare-error").textContent = "";
    $("#stamp-choice").hidden = true;
    $("#paper-choice").hidden = true;
    $("#letter-review").hidden = false;
    $("#prepare-step").hidden = false;
    $("#prepare-step").textContent = paperById(paperId).name + " · " + stamp.name;
    $("#prepare-title").textContent = "看看写好的信";
    $("#review-stamp").src = stampImage(stamp.id);
    $("#review-stamp-name").textContent = stamp.name;
    $("#review-content").textContent = pendingLetter.body;
    $("#review-signer").textContent = "署名：" + (pendingLetter.nickname || "一位无名来信人");
    $("#review-date").textContent = dateFormat.format(Date.now());
    const event = knownEvent(pendingLetter.eventId);
    $("#review-context").hidden = !event;
    if (event) $("#review-context").textContent = "读过「" + event.title + "」之后";
    applyPaper($("#review-sheet"), requestedPaper, source);
    $(".lm-review-window").scrollTop = 0;
    $(".lm-review-window").focus();
  });
  prepare.addEventListener("close", () => { if (!sending) $("#send-letter").focus(); });
  function beginPosting() {
    stopPacking();
    delivery.classList.remove("is-packing");
    delivery.dataset.phase = "handoff";
    $("#delivery-title").textContent = deliveryCopy[3];
    // Keep both scenes mounted in one fixed frame while the mailbox fades in.
    deliveryTimer = setTimeout(() => {
      delivery.dataset.phase = "posting";
      delivery.classList.add("is-delivering");
      // Allow the five-second posting motion to finish, then hold its result.
      deliveryTimer = setTimeout(finishDelivery, 5800);
    }, 1000);
  }
  function startPacking() {
    stopPacking();
    const art = $(".lm-packing-art"), world = $(".lm-packing-world");
    const top = $(".lm-packing-top"), bottom = $(".lm-packing-bottom");
    const paper = $(".lm-packing-paper"), envelope = $(".lm-packing-envelope");
    const pocket = $(".lm-packing-pocket"), flap = $(".lm-packing-flap");
    const seal = $(".lm-packing-seal"), stamp = $("#packed-stamp");
    const duration = 8.4; // 贴票封缄后停留，再平滑切换到信箱。
    let time = 0, previous = 0;
    const ease = (start, end) => {
      const value = Math.max(0, Math.min(1, (time - start) / (end - start)));
      return value * value * (3 - 2 * value);
    };
    const resize = () => {
      const scale = Math.min(art.clientWidth / 580, art.clientHeight / 440, 1);
      world.style.transform = "translateX(-50%) scale(" + scale + ")";
    };
    const draw = () => {
      const upper = ease(.55, 1.85), lower = ease(2.05, 3.35);
      const arrival = ease(3.45, 4.05), insert = ease(4.2, 5.7), close = ease(5.9, 6.9);
      top.style.transform = "translateZ(" + .6 * upper + "px) rotateX(" + -180 * upper + "deg)";
      bottom.style.transform = "translateZ(" + 1.2 * lower + "px) rotateX(" + 180 * lower + "deg)";
      paper.style.transform = "translateY(" + 158 * insert + "px)";
      top.style.boxShadow = "0 0 " + 4 * Math.sin(Math.PI * upper) + "px #52432e12";
      bottom.style.boxShadow = "0 0 " + 4 * Math.sin(Math.PI * lower) + "px #52432e12";
      for (const layer of [envelope, pocket, flap]) layer.style.opacity = arrival;
      envelope.style.transform = "translateY(" + 14 * (1 - arrival) + "px)";
      pocket.style.transform = envelope.style.transform;
      flap.style.transform = envelope.style.transform + " rotateX(" + 180 * close + "deg)";
      flap.style.zIndex = close > .5 ? "4" : "0";
      seal.style.opacity = stamp.style.opacity = ease(6.9, 7.2);
      seal.style.transform = "scale(" + (.86 + .14 * ease(6.9, 7.2)) + ")";
      const title = deliveryCopy[time < 3.45 ? 0 : time < 5.9 ? 1 : 2];
      if ($("#delivery-title").textContent !== title) $("#delivery-title").textContent = title;
    };
    const tick = now => {
      if (previous) time = Math.min(duration, time + Math.min((now - previous) / 1000, .08));
      previous = now;
      draw();
      if (time >= duration) beginPosting();
      else packingFrame = requestAnimationFrame(tick);
    };
    resize();
    packingResizeObserver = new ResizeObserver(resize);
    packingResizeObserver.observe(art);
    draw();
    packingFrame = requestAnimationFrame(tick);
  }
  $("#confirm-dispatch").addEventListener("click", () => {
    if (sending || !pendingLetter || !stampById(stampId) || !paperById(paperId) || !readyPaperTextures.has(paperId)) return;
    const latest = getMessages();
    if (latest.length >= 200) {
      $("#prepare-error").textContent =
        "已保存200封留言，请先备份并整理已有留言";
      return;
    }
    const message = {
      id:
        globalThis.crypto?.randomUUID?.() ||
        Date.now().toString(36) + "-" + Math.random().toString(36).slice(2),
      body: pendingLetter.body,
      nickname: pendingLetter.nickname,
      createdAt: Date.now(),
      eventId: pendingLetter.eventId,
      stampId,
      paperId,
    };
    if (!LM_STORE.write("messages", [message, ...latest])) {
      $("#prepare-error").textContent =
        "暂时无法保存留言，输入框中的文字仍在；请先复制留存，再检查浏览器的存储设置";
      return;
    }
    sending = true;
    const miniature = text("div", "lm-mini-letter", "");
    miniature.dataset.paper = paperId;
    miniature.style.backgroundImage = 'url("' + readyPaperTextures.get(paperId) + '")';
    const miniStamp = document.createElement("img");
    miniStamp.src = stampImage(stampId); miniStamp.alt = "";
    miniature.append(text("span", "lm-mini-heading", "山河邮局"), miniStamp,
      text("p", "lm-mini-salutation", "致长征路上的你们："),
      text("div", "lm-mini-body", message.body),
      text("p", "lm-mini-signer", message.nickname || "一位无名来信人"));
    ["top", "center", "bottom"].forEach(part => {
      const face = text("div", "lm-packing-face", "");
      face.append(miniature.cloneNode(true));
      $('[data-fold-panel="' + part + '"]').replaceChildren(face, text("i", "lm-packing-reverse", ""));
    });
    $(".lm-packing-paper").dataset.paper = paperId;
    $(".lm-packing-paper").toggleAttribute("data-paper-illustrated", Boolean(paperById(paperId)?.ornament));
    $("#packed-stamp").src = stampImage(stampId);
    document.querySelectorAll(".lm-postbox-stamp").forEach(image => image.src = stampImage(stampId));
    prepare.close();
    $("#send-letter").disabled = true;
    clearTimeout(draftTimer);
    draftTimer = null;
    body.value = "";
    nickname.value = "";
    eventId = null;
    renderContext();
    $("#character-count").textContent = "0";
    const cleared = LM_STORE.write("draft", {
      body: "",
      nickname: "",
      eventId: null,
    });
    $("#draft-status").textContent = cleared
      ? "落笔之后，草稿会自动保存"
      : "留言已保存，但旧草稿未清空";
    $("#form-error").textContent = "";
    renderMessages();
    delivery.classList.remove("is-delivered", "is-delivering", "is-packing");
    delivery.dataset.phase = "packing";
    delivery.dataset.locked = "true";
    $("#delivery-title").textContent = deliveryCopy[0];
    $("#delivery-description").textContent =
      "留言已保存，正在完成投递";
    $("#skip-delivery").hidden = false;
    $("#delivery-actions").hidden = true;
    delivery.showModal();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      finishDelivery();
    else {
      startPacking();
    }
  });
  $("#skip-delivery").addEventListener("click", finishDelivery);
  function closeDelivery() {
    if (sending) finishDelivery();
    delivery.close();
    $("#send-letter").focus();
  }
  $("#close-delivery").addEventListener("click", closeDelivery);
  delivery.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDelivery();
  });
  $("#view-sent").addEventListener("click", () => {
    delivery.close();
    switchTab(1);
    tabs[1].focus();
  });
  $("#write-another").addEventListener("click", () => {
    delivery.close();
    switchTab(0);
    body.focus();
  });
  async function openLetter(id) {
    const message = messages.find((m) => m.id === id);
    if (!message) return;
    const sequence = ++letterOpenSequence;
    const paper = paperById(message.paperId);
    const source = paper ? await fullPaperTexture(paper.id) : null;
    if (sequence !== letterOpenSequence || panels[1].hidden || bulkMode) return;
    if (paper && !source) {
      $("#saved-warning").textContent = "清晰信纸暂未载入，请再试一次";
      return;
    }
    $("#saved-warning").textContent = "";
    selectedId = id;
    $("#letter-date").textContent = dateFormat.format(message.createdAt);
    $("#letter-content").textContent = message.body;
    $("#letter-signer").textContent = message.nickname || "一位无名来信人";
    const event = knownEvent(message.eventId);
    const stamp = stampById(message.stampId);
    applyPaper($("#letter-dialog .lm-dialog-body"), message.paperId, source);
    $("#letter-stamp").hidden = !stamp;
    if (stamp) { $("#letter-stamp img").src = stampImage(stamp.id); $("#letter-stamp img").alt = stamp.name + "插画邮票"; $("#letter-stamp span").textContent = stamp.name; }
    $("#letter-context").hidden = !event;
    if (event)
      $("#letter-context").textContent =
        "读过「" + event.title + "」之后的留言";
    letterDialog.showModal();
  }
  function confirmDeletion(ids, bulk) {
    pendingDelete = { ids: new Set(ids), bulk };
    $("#delete-title").textContent = bulk ? "确定删除所选的 " + ids.length + " 封留言？" : "确定删除这段留言？";
    $("#delete-description").textContent = bulk
      ? "删除后无法从本页恢复，如需留存请先取消并备份留言"
      : "删除后无法从本页恢复，如需留存请先保存为文本";
    $("#delete-error").textContent = "";
    deleteDialog.showModal();
  }
  deleteDialog.addEventListener("close", () => { pendingDelete = null; });
  $("#delete-letter").addEventListener("click", () => {
    if (selectedId) confirmDeletion([selectedId], false);
  });
  $("#confirm-delete").addEventListener("click", () => {
    if (!pendingDelete) return;
    const deletion = pendingDelete;
    // Filter the latest records so other tabs' newly saved letters are retained.
    const latest = getMessages();
    const next = latest.filter(message => !deletion.ids.has(message.id));
    if (!LM_STORE.write("messages", next)) {
      $("#delete-error").textContent = "删除操作未能保存，请稍后重试";
      return;
    }
    deleteDialog.close();
    if (letterDialog.open) letterDialog.close();
    selectedId = null;
    bulkMode = false;
    bulkSelected.clear();
    renderMessages();
    $("#saved-warning").textContent = deletion.bulk ? "已删除 " + (latest.length - next.length) + " 封留言" : "这封留言已删除";
    (deletion.bulk && messages.length ? $("#manage-letters") : tabs[1]).focus({ preventScroll: true });
  });
  function asText(message) {
    const event = knownEvent(message.eventId);
    return [
      "山河邮局 · 来自今天的留言",
      dateFormat.format(message.createdAt),
      event ? "读过「" + event.title + "」之后" : "",
      "",
      "致长征路上的你们：",
      "",
      message.body,
      "",
      "署名：" + (message.nickname || "一位无名来信人"),
    ].join("\n");
  }
  function download(content, filename, mime = "text/plain") {
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + content], { type: mime + ";charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  $("#download-letter").addEventListener("click", () => {
    const message = messages.find((m) => m.id === selectedId);
    if (message) download(asText(message), "山河邮局-留言.txt");
  });
  $("#export-all").addEventListener("click", () => {
    const all = getMessages().sort((a, b) => b.createdAt - a.createdAt);
    if (all.length)
      download(
        LM_LETTERS.serialize(all),
        "山河邮局-留言备份.json",
        "application/json",
      );
  });
  $("#import-letters").addEventListener("click", () => $("#import-file").click());
  $("#import-file").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    $("#import-letters").disabled = true;
    try {
      if (file.size > 3000000) throw Error("备份文件过大，尚未导入留言");
      const parsed = LM_LETTERS.parse(await file.text(), window.LM_EVENTS);
      const merged = LM_LETTERS.merge(getMessages(), parsed);
      if (merged.added && !LM_STORE.write("messages", merged.messages))
        throw Error("浏览器暂时无法保存，请保留备份文件后重试；现有留言未作更改");
      renderMessages();
      $("#saved-warning").textContent = merged.added
        ? "已导入" + merged.added + "封留言" + (merged.skipped ? "，已跳过" + merged.skipped + "封重复留言" : "")
        : "这些留言已存在，无需重复导入";
    } catch (error) {
      $("#saved-warning").textContent = error.message || "导入未完成，现有留言未作更改";
    } finally {
      $("#import-letters").disabled = false;
      event.target.value = "";
    }
  });
  window.addEventListener("storage", (event) => {
    if (event.key === LM_STORE.messageKey || event.key === null) {
      renderMessages();
      $("#saved-warning").textContent = "留言列表已更新";
    }
  });
  window.addEventListener("pageshow", renderMessages);
  window.addEventListener("focus", renderMessages);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") renderMessages();
  });
  renderMessages();
})();
