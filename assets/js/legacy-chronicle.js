// Keep bookmarks from the former chronicle-only home page working.
(() => {
  const anchors = new Set(["chronicle", "chronicle-title", "hero-title", "post-office-invite", "mail-invite-title"]);
  function redirectLegacyChronicle() {
    const hash = window.location.hash;
    if (!anchors.has(hash.slice(1)) && !/^#event=[a-z0-9-]+$/i.test(hash)) return;
    const target = new URL("chronicle.html", window.location.href);
    target.search = window.location.search;
    target.hash = hash;
    window.location.replace(target.href);
  }
  redirectLegacyChronicle();
  window.addEventListener("hashchange", redirectLegacyChronicle);
})();
