(() => {
  const $ = (selector) => document.querySelector(selector);
  const mailbox = $(".lm-mailbox-scene");
  document.querySelectorAll("[data-postbox]").forEach((model) => {
    model.append($("#postbox-template").content.cloneNode(true));
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
  const getMessages = () => LM_STORE.readMessages();
  const knownEvent = (id) => window.LM_EVENTS.find((e) => e.id === id);
  let messages = getMessages(),
    eventId = null,
    selectedId = null,
    draftTimer,
    deliveryTimer,
    sending = false;
  const stamps = [
    { id: "yudu", name: "于都启程", caption: "从渡口出发，走向远方" },
    { id: "luding", name: "铁索长桥", caption: "江流奔涌，脚步不息" },
    { id: "snow", name: "雪山草地", caption: "翻过雪山，彼此同行" },
    { id: "city", name: "今日山河", caption: "万家灯火，岁月安宁" },
  ];
  const stampById = id => stamps.find(stamp => stamp.id === id);
  const stampImage = id => "assets/images/stamps/" + id + "-v1.webp";
  let stampId = null, pendingLetter = null;
  const packingTimers = [];
  stamps.forEach(stamp => {
    const label = text("label", "lm-stamp-option", "");
    const radio = document.createElement("input");
    radio.type = "radio"; radio.name = "illustrated-stamp"; radio.value = stamp.id;
    const art = text("span", "lm-stamp", "");
    art.setAttribute("aria-hidden", "true");
    const image = document.createElement("img");
    image.src = stampImage(stamp.id); image.alt = ""; image.width = 240; image.height = 300;
    art.append(image, text("span", "", stamp.name));
    label.append(radio, art, text("strong", "", stamp.name), text("small", "", stamp.caption));
    radio.addEventListener("change", () => {
      stampId = stamp.id;
      $("#writing-stamp").src = image.src;
      $("#preview-letter").disabled = false;
      saveDraft();
    });
    $("#stamp-options").append(label);
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
    $("#writing-stamp").src = stampImage(stampId);
    $("#preview-letter").disabled = false;
  }
  const queryEvent = new URLSearchParams(location.search).get("event");
  eventId = knownEvent(queryEvent)?.id || knownEvent(draft.eventId)?.id || null;
  function renderContext() {
    const event = knownEvent(eventId);
    $("#event-context").hidden = !event;
    if (event)
      $("#event-context").textContent =
        "读过「" + event.title + "」之后，想留下一句话。";
  }
  renderContext();
  $("#character-count").textContent = body.value.length;
  if (draft.body || draft.nickname)
    $("#draft-status").textContent = "已恢复上次草稿";
  if (LM_STORE.recovered)
    $("#form-error").textContent = "已从备用记录恢复留言，建议在「我的留言」中备份。";
  else if (LM_STORE.damaged)
    $("#form-error").textContent =
      "有部分记录暂时无法读取，能恢复的留言已保留。请先备份，不要清除网站数据。";
  function saveDraft() {
    clearTimeout(draftTimer);
    const success = LM_STORE.write("draft", {
      body: body.value,
      nickname: nickname.value,
      eventId,
      stampId,
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
  $("#start-writing").addEventListener("click", () => {
    switchTab(0);
    body.focus();
  });
  const prompts = {
    today:
      "今天有哪些寻常的生活，是你想让他们知道的？一顿饭、一间教室，或一次平安的团聚。",
    thanks: "读过哪一段经历，让你想停下来道一声感谢？用自己的话写下来就好。",
    question: "隔着岁月，你最想问他们什么？也可以想一想，今天的你会如何回答。",
  };
  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      document
        .querySelectorAll("[data-prompt]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      $("#prompt-hint").textContent = prompts[button.dataset.prompt];
    });
  });
  function renderMessages() {
    messages = getMessages().sort((a, b) => b.createdAt - a.createdAt);
    $("#saved-count").textContent = messages.length;
    $("#empty-letters").hidden = messages.length > 0;
    $("#export-all").hidden = messages.length === 0;
    const list = $("#saved-list");
    list.replaceChildren();
    messages.forEach((message) => {
      const button = text("button", "lm-letter-preview", "");
      button.type = "button";
      button.setAttribute(
        "aria-label",
        "查看" +
          dateFormat.format(message.createdAt) +
          "的留言，署名" +
          (message.nickname || "无名来信人"),
      );
      const time = text("time", "", dateFormat.format(message.createdAt));
      time.dateTime = new Date(message.createdAt).toISOString();
      const excerpt = text("p", "lm-preview-body", message.body);
      const bottom = text("span", "lm-preview-bottom", "");
      bottom.append(
        text("span", "", message.nickname || "一位无名来信人"),
        text("span", "", "展开留言 ↗"),
      );
      button.append(time, excerpt, bottom);
      button.addEventListener("click", () => openLetter(message.id));
      list.append(button);
    });
  }
  function finishDelivery() {
    clearTimeout(deliveryTimer);
    packingTimers.splice(0).forEach(clearTimeout);
    delivery.classList.remove("is-packing");
    delivery.dataset.phase = "delivered";
    delivery.classList.remove("is-delivering");
    delivery.classList.add("is-delivered");
    mailbox.classList.remove("is-delivering");
    mailbox.classList.add("is-delivered");
    $("#delivery-title").textContent = "这份心意，已在此留下。";
    $("#delivery-description").textContent =
      "留言已保存，可在「我的留言」中查看。";
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
      $("#form-error").textContent = "先写下想对他们说的话，再封好投递。";
      body.focus();
      return null;
    }
    if (content.length > 2000 || signer.length > 20) {
      $("#form-error").textContent =
        "留言请控制在2000字以内，署名请控制在20字以内。";
      return null;
    }
    return { body: content, nickname: signer, eventId };
  }
  function chooseStamp() {
    $("#stamp-choice").hidden = false;
    $("#letter-review").hidden = true;
    $("#prepare-step").textContent = "为这封信，选一枚邮票";
    $("#prepare-title").textContent = "带着心意，出发吧。";
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (sending) return;
    pendingLetter = validateLetter();
    if (!pendingLetter) return;
    chooseStamp();
    $("#prepare-error").textContent = "";
    prepare.showModal();
  });
  $("#change-stamp").addEventListener("click", () => {
    chooseStamp();
    $("#stamp-options input:checked")?.focus();
  });
  $("#preview-letter").addEventListener("click", () => {
    const stamp = stampById(stampId);
    if (!pendingLetter || !stamp) return;
    $("#stamp-choice").hidden = true;
    $("#letter-review").hidden = false;
    $("#prepare-step").textContent = "贴好邮票，再读一遍";
    $("#prepare-title").textContent = "这就是你写下的信。";
    $("#review-stamp").src = stampImage(stamp.id);
    $("#review-stamp-name").textContent = stamp.name;
    $("#review-content").textContent = pendingLetter.body;
    $("#review-signer").textContent = "署名：" + (pendingLetter.nickname || "一位无名来信人");
    $("#review-date").textContent = dateFormat.format(Date.now());
    const event = knownEvent(pendingLetter.eventId);
    $("#review-context").hidden = !event;
    if (event) $("#review-context").textContent = "读过「" + event.title + "」之后";
    $(".lm-review-paper").scrollTop = 0;
    $(".lm-review-paper").focus();
  });
  prepare.addEventListener("close", () => { if (!sending) $("#send-letter").focus(); });
  function beginPosting() {
    delivery.classList.remove("is-packing");
    delivery.dataset.phase = "posting";
    delivery.classList.add("is-delivering");
    mailbox.classList.add("is-delivering");
    $("#delivery-title").textContent = "把这份心意，轻轻放进信箱";
    deliveryTimer = setTimeout(finishDelivery, 3100);
  }
  $("#confirm-dispatch").addEventListener("click", () => {
    if (sending || !pendingLetter || !stampById(stampId)) return;
    const latest = getMessages();
    if (latest.length >= 200) {
      $("#prepare-error").textContent =
        "已保存200封留言，请先备份并整理已有留言。";
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
    };
    if (!LM_STORE.write("messages", [message, ...latest])) {
      $("#prepare-error").textContent =
        "当前浏览器暂时无法保存，留言仍保留在输入框中。请先复制文字，再检查浏览器存储设置。";
      return;
    }
    sending = true;
    const parts = Array.from("致长征路上的你们：\n" + message.body + "\n署名：" + (message.nickname || "一位无名来信人"));
    const size = Math.ceil(parts.length / 3);
    ["top", "center", "bottom"].forEach((part, i) => {
      $(".lm-fold-" + part + " span").textContent = parts.slice(i * size, (i + 1) * size).join("");
    });
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
    mailbox.classList.remove("is-delivered", "is-delivering");
    delivery.dataset.locked = "true";
    $("#delivery-title").textContent = "把写下的话，仔细折好";
    $("#delivery-description").textContent =
      "留言已保存，正在完成投递。";
    $("#skip-delivery").hidden = false;
    $("#delivery-actions").hidden = true;
    delivery.showModal();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      finishDelivery();
    else {
      delivery.classList.add("is-packing");
      packingTimers.push(setTimeout(() => $("#delivery-title").textContent = "装进信封，留下今天的邮票", 2100));
      packingTimers.push(setTimeout(() => $("#delivery-title").textContent = "封好心意，交给邮差", 3700));
      packingTimers.push(setTimeout(beginPosting, 4900));
    }
  });
  $("#skip-delivery").addEventListener("click", finishDelivery);
  delivery.addEventListener("cancel", (event) => {
    if (sending) {
      event.preventDefault();
      finishDelivery();
    }
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
  function openLetter(id) {
    const message = messages.find((m) => m.id === id);
    if (!message) return;
    selectedId = id;
    $("#letter-date").textContent = dateFormat.format(message.createdAt);
    $("#letter-content").textContent = message.body;
    $("#letter-signer").textContent = message.nickname || "一位无名来信人";
    const event = knownEvent(message.eventId);
    const stamp = stampById(message.stampId);
    $("#letter-stamp").hidden = !stamp;
    if (stamp) { $("#letter-stamp img").src = stampImage(stamp.id); $("#letter-stamp img").alt = stamp.name + "插画邮票"; $("#letter-stamp span").textContent = stamp.name; }
    $("#letter-context").hidden = !event;
    if (event)
      $("#letter-context").textContent =
        "读过「" + event.title + "」之后的留言";
    letterDialog.showModal();
  }
  $("#delete-letter").addEventListener("click", () => {
    $("#delete-error").textContent = "";
    deleteDialog.showModal();
  });
  $("#confirm-delete").addEventListener("click", () => {
    const next = getMessages().filter((m) => m.id !== selectedId);
    if (!LM_STORE.write("messages", next)) {
      $("#delete-error").textContent = "删除未能保存，请稍后重试。";
      return;
    }
    deleteDialog.close();
    letterDialog.close();
    selectedId = null;
    renderMessages();
    $("#saved-warning").textContent = "这封留言已删除。";
    tabs[1].focus();
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
      if (file.size > 3000000) throw Error("备份文件过大，未导入任何留言。");
      const parsed = LM_LETTERS.parse(await file.text(), window.LM_EVENTS);
      const merged = LM_LETTERS.merge(getMessages(), parsed);
      if (merged.added && !LM_STORE.write("messages", merged.messages))
        throw Error("浏览器暂时无法保存，现有留言没有改变。请保留备份文件后重试。");
      renderMessages();
      $("#saved-warning").textContent = merged.added
        ? "已导入" + merged.added + "封留言。" + (merged.skipped ? "已跳过" + merged.skipped + "封重复留言。" : "")
        : "这些留言已经在这里，无需重复导入。";
    } catch (error) {
      $("#saved-warning").textContent = error.message || "导入失败，现有留言没有改变。";
    } finally {
      $("#import-letters").disabled = false;
      event.target.value = "";
    }
  });
  window.addEventListener("storage", (event) => {
    if (event.key === LM_STORE.messageKey || event.key === null) {
      renderMessages();
      $("#saved-warning").textContent = "留言列表已更新。";
    }
  });
  window.addEventListener("pageshow", renderMessages);
  window.addEventListener("focus", renderMessages);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") renderMessages();
  });
  renderMessages();
})();
