window.LM_STORE = (() => {
  const prefix = "longmarch-b:";
  let damaged = false;
  let recovered = false;
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
      if (key === "messages") {
        if (!Array.isArray(value) || !value.every(messageValid)) return false;
        const original = localStorage.getItem(prefix + "messages:v1");
        if (original) {
          let valid = false;
          try { const parsed = JSON.parse(original); valid = Array.isArray(parsed) && parsed.every(messageValid); } catch {}
          if (!valid && localStorage.getItem(prefix + "messages-recovery:v1") === null)
            localStorage.setItem(prefix + "messages-recovery:v1", original);
        }
      }
      localStorage.setItem(prefix + key + ":v1", JSON.stringify(value));
      if (key === "messages") {
        try { localStorage.setItem(prefix + "messages-backup:v1", JSON.stringify(value)); } catch {}
      }
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
    (v.eventId === null || typeof v.eventId === "string") &&
    (v.stampId === undefined || ["yudu", "luding", "snow", "city", "xiangjiang", "zunyi", "chishui", "reunion", "rail", "harvest", "stars", "energy"].includes(v.stampId)) &&
    (v.paperId === undefined || ["mountain", "river", "snow", "spark"].includes(v.paperId));
  function readMessages() {
    try {
      const raw = localStorage.getItem(prefix + "messages:v1");
      if (raw !== null) {
        const value = JSON.parse(raw);
        if (!Array.isArray(value)) throw new Error("invalid");
        const valid = value.filter(messageValid);
        if (valid.length === value.length) {
          try {
            if (localStorage.getItem(prefix + "messages-backup:v1") === null)
              localStorage.setItem(prefix + "messages-backup:v1", raw);
          } catch {}
          return valid;
        }
        damaged = true;
        if (valid.length) return valid;
      }
    } catch { damaged = true; }
    try {
      const raw = localStorage.getItem(prefix + "messages-backup:v1");
      if (raw !== null) {
        const backup = JSON.parse(raw);
        if (!Array.isArray(backup) || !backup.every(messageValid)) throw new Error("invalid");
        recovered = true;
        return backup;
      }
    } catch { damaged = true; }
    return [];
  }
  return {
    read,
    write,
    draftValid,
    messageValid,
    readMessages,
    messageKey: prefix + "messages:v1",
    get recovered() { return recovered; },
    get damaged() {
      return damaged;
    },
  };
})();
