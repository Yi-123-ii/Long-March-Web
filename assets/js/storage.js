window.LM_STORE = (() => {
  const prefix = "longmarch-b:";
  let damaged = false;
  function read(key, fallback, validate) {
    try {
      const raw = localStorage.getItem(prefix + key + ":v1");
      if (raw === null) return fallback;
      const value = JSON.parse(raw);
      if (!validate(value)) throw new Error("invalid");
      return value;
    } catch {
      damaged = true;
      return fallback;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(prefix + key + ":v1", JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
  const draftValid = (v) =>
    v &&
    typeof v.body === "string" &&
    v.body.length <= 2000 &&
    typeof v.nickname === "string" &&
    v.nickname.length <= 20;
  const messageValid = (v) =>
    v &&
    typeof v.id === "string" &&
    v.id.length <= 128 &&
    typeof v.body === "string" &&
    v.body.trim().length > 0 &&
    v.body.length <= 2000 &&
    typeof v.nickname === "string" &&
    v.nickname.length <= 20 &&
    Number.isSafeInteger(v.createdAt) &&
    v.createdAt >= 0 &&
    v.createdAt <= 8640000000000000 &&
    (v.eventId === null || typeof v.eventId === "string");
  return {
    read,
    write,
    draftValid,
    messageValid,
    get damaged() {
      return damaged;
    },
  };
})();
