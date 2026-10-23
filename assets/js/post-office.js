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
    letterDialog = $("#letter-dialog"),
    deleteDialog = $("#delete-dialog");
  const tabs = [$("#write-tab"), $("#saved-tab")];
  const panels = [$("#write-panel"), $("#saved-panel")];
  const getMessages = () =>
    LM_STORE.read(
      "messages",
      [],
      (v) =>
        Array.isArray(v) && v.length <= 200 && v.every(LM_STORE.messageValid),
    );
  const knownEvent = (id) => window.LM_EVENTS.find((e) => e.id === id);
  let messages = getMessages(),
    eventId = null,
    selectedId = null,
    draftTimer,
    deliveryTimer,
    sending = false;
  const dateFormat = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const text = (tag, cls, value) => {
    const node = document.createElement(tag);
    node.className = cls;
    node.textContent = value;
    return node;
  };
  const draft = LM_STORE.read(
    "draft",
    { body: "", nickname: "", eventId: null },
    LM_STORE.draftValid,
  );
  body.value = draft.body;
  nickname.value = draft.nickname;
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
    $("#draft-status").textContent = "已恢复本机草稿";
  if (LM_STORE.damaged)
    $("#form-error").textContent =
      "部分本机数据暂时无法读取。你仍可写留言；若原有留言未显示，请先不要清除浏览器数据。";
  function saveDraft() {
    clearTimeout(draftTimer);
    const success = LM_STORE.write("draft", {
      body: body.value,
      nickname: nickname.value,
      eventId,
    });
    $("#draft-status").textContent = success
      ? "草稿已保存于本机"
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
    delivery.classList.remove("is-delivering");
    delivery.classList.add("is-delivered");
    mailbox.classList.remove("is-delivering");
    mailbox.classList.add("is-delivered");
    $("#delivery-title").textContent = "这份心意，已在此留下。";
    $("#delivery-description").textContent =
      "留言已保存于当前浏览器，可以随时回来看。";
    $("#skip-delivery").hidden = true;
    $("#delivery-actions").hidden = false;
    delivery.dataset.locked = "false";
    sending = false;
    $("#send-letter").disabled = false;
    $("#view-sent").focus();
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (sending) return;
    const content = body.value.trim(),
      signer = nickname.value.trim();
    if (!content) {
      $("#form-error").textContent = "先写下想对他们说的话，再封好投递。";
      body.focus();
      return;
    }
    if (content.length > 2000 || signer.length > 20) {
      $("#form-error").textContent =
        "留言请控制在2000字以内，署名请控制在20字以内。";
      return;
    }
    const latest = getMessages();
    if (latest.length >= 200) {
      $("#form-error").textContent =
        "本机已保存200段留言。请先导出留存，再删除部分留言。";
      return;
    }
    const message = {
      id:
        globalThis.crypto?.randomUUID?.() ||
        Date.now().toString(36) + "-" + Math.random().toString(36).slice(2),
      body: content,
      nickname: signer,
      createdAt: Date.now(),
      eventId,
    };
    if (!LM_STORE.write("messages", [message, ...latest])) {
      $("#form-error").textContent =
        "本机存储不可用或空间不足，留言尚未保存。请先复制文字留存，或换用正常浏览窗口。";
      return;
    }
    sending = true;
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
    delivery.classList.remove("is-delivered");
    delivery.classList.add("is-delivering");
    mailbox.classList.remove("is-delivered");
    mailbox.classList.add("is-delivering");
    delivery.dataset.locked = "true";
    $("#delivery-title").textContent = "把这份心意，轻轻放进信箱";
    $("#delivery-description").textContent =
      "留言已保存在本机，正在完成投递动画。";
    $("#skip-delivery").hidden = false;
    $("#delivery-actions").hidden = true;
    delivery.showModal();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      finishDelivery();
    else deliveryTimer = setTimeout(finishDelivery, 3100);
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
    $("#saved-warning").textContent = "这段留言已从本机删除。";
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
      "",
      "（本机留言留存）",
    ].join("\n");
  }
  function download(content, filename) {
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + content], { type: "text/plain;charset=utf-8" }),
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
        all.map(asText).join("\n\n────────────────\n\n"),
        "山河邮局-全部留言.txt",
      );
  });
  window.addEventListener("storage", (event) => {
    if (event.key === "longmarch-b:messages:v1") {
      renderMessages();
      $("#saved-warning").textContent = "本机留言已与另一个标签页同步。";
    }
  });
  renderMessages();
})();
