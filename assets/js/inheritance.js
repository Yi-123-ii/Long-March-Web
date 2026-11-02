/* V4.1 progressive enhancement. The authored HTML is a complete reading fallback. */
(() => {
  'use strict';
  const page = document.body;
  if (!page || !page.classList.contains('legacy-v41')) return;

  const showDataNotice = () => {
    const notice = document.getElementById('legacy-data-status');
    if (notice) notice.hidden = false;
  };
  const nonEmptyText = (value) => typeof value === 'string' && value.trim().length > 0;
  const sourceUrl = (value) => {
    if (!nonEmptyText(value)) return null;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' ? url.href : null;
    } catch (_) {
      return null;
    }
  };

  function hydrateCases() {
    const records = window.LM_CONTEMPORARY_CASES;
    if (!Array.isArray(records) || records.length === 0) {
      showDataNotice();
      return;
    }
    const fields = [
      ['title', '[data-case-title]'],
      ['action', '[data-case-action]'],
      ['connection', '[data-case-connection]'],
      ['location', '[data-case-location]'],
      ['category', '[data-case-category]'],
    ];
    let incomplete = false;
    document.querySelectorAll('[data-case]').forEach((section) => {
      const item = records.find((record) => record && record.id === section.dataset.case);
      if (!item) {
        incomplete = true;
        return;
      }
      fields.forEach(([key, selector]) => {
        if (!nonEmptyText(item[key])) {
          incomplete = true;
          return;
        }
        section.querySelectorAll(selector).forEach((element) => {
          element.textContent = item[key];
        });
      });
      if (nonEmptyText(item.publishedAt) && /^\d{4}-\d{2}-\d{2}$/.test(item.publishedAt)) {
        section.querySelectorAll('[data-case-date]').forEach((element) => {
          element.textContent = item.publishedAt;
          element.setAttribute('datetime', item.publishedAt);
        });
      } else {
        incomplete = true;
      }
      const url = item.source && sourceUrl(item.source.url);
      if (url) {
        section.querySelectorAll('[data-case-source]').forEach((anchor) => {
          anchor.href = url;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          if (nonEmptyText(item.source.name)) {
            const label = anchor.querySelector('[data-source-name]');
            if (label) label.textContent = item.source.name;
          }
        });
      } else {
        incomplete = true;
      }
    });
    if (incomplete) showDataNotice();
  }

  function enableArchiveTabs() {
    const tablist = document.querySelector('.legacy-folder-tabs');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[data-archive-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-archive-panel]'));
    if (tabs.length !== 3 || panels.length !== 3) return;
    if (tabs.some((tab) => !panels.some((panel) => panel.dataset.archivePanel === tab.dataset.archiveTab))) return;
    function activateTab(selected, focus) {
      tabs.forEach((tab) => {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.archivePanel !== selected.dataset.archiveTab;
      });
      if (focus) selected.focus();
    }
    tabs.forEach((tab) => {
      const panel = panels.find((item) => item.dataset.archivePanel === tab.dataset.archiveTab);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
      tab.addEventListener('click', () => activateTab(tab, false));
      tab.addEventListener('keydown', (event) => {
        const index = tabs.indexOf(tab);
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activateTab(tabs[next], true);
      });
    });
    activateTab(tabs[0], false);
    tablist.hidden = false;
    page.classList.add('legacy-tabs-ready');
  }

  function enableMobileNavigation() {
    const header = page.querySelector('.site-header');
    if (!header) return;
    // The merged site owns menu behavior through the shared navigation script.
    if (header.classList.contains('lm-unified-header')) {
      page.classList.add('legacy-nav-ready');
      return;
    }
    const toggle = header.querySelector('.site-menu-toggle');
    const nav = header.querySelector('.site-nav');
    if (!toggle || !nav) return;
    const close = (restoreFocus) => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '展开主导航');
      nav.classList.remove('is-open');
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '收起主导航' : '展开主导航');
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) close(false);
    });
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) close(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) close(true);
    });
    header.addEventListener('focusout', (event) => {
      if (event.relatedTarget && !header.contains(event.relatedTarget)) close(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) close(false);
    });
    page.classList.add('legacy-nav-ready');
  }

  function enableReadingProgress() {
    const progress = document.querySelector('.legacy-progress');
    if (!progress) return;
    const links = Array.from(progress.querySelectorAll('ol a[href^="#"]'));
    const sections = Array.from(document.querySelectorAll('[data-legacy-scene]'));
    const setCurrent = (id) => {
      links.forEach((link) => {
        if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    links.forEach((link) => {
      link.addEventListener('click', () => setCurrent(link.getAttribute('href').slice(1)));
    });
    if (!('IntersectionObserver' in window)) return;
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      const candidates = Array.from(visible).sort((a, b) => {
        const line = window.innerHeight * .25;
        return Math.abs(a.getBoundingClientRect().top - line) - Math.abs(b.getBoundingClientRect().top - line);
      });
      if (candidates.length) setCurrent(candidates[0].id);
      else if (sections[0] && sections[0].getBoundingClientRect().top > window.innerHeight * .25) setCurrent(sections[0].id);
    }, { rootMargin: '-12% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  function enableImageFallbacks() {
    const titleImage = document.querySelector('.legacy-title__art');
    if (titleImage) {
      const title = titleImage.closest('.legacy-title');
      const useArt = () => {
        if (titleImage.naturalWidth > 0) title.classList.add('has-art');
      };
      titleImage.addEventListener('load', useArt);
      titleImage.addEventListener('error', () => title.classList.remove('has-art'));
      if (titleImage.complete) useArt();
    }
    document.querySelectorAll('.legacy-visual img').forEach((image) => {
      const onFailure = () => {
        const figure = image.closest('.legacy-visual');
        if (!figure) return;
        figure.classList.add('legacy-visual--unavailable');
        const caption = figure.querySelector('figcaption');
        if (caption) caption.textContent = '主题插画暂未载入 · 案例文字与原始来源仍可阅读';
      };
      image.addEventListener('error', onFailure);
      if (image.complete && image.naturalWidth === 0) onFailure();
    });
  }

  // Independent enhancements do not remove the authored reading content on failure.
  [hydrateCases, enableArchiveTabs, enableMobileNavigation, enableReadingProgress, enableImageFallbacks].forEach((enhance) => {
    try {
      enhance();
    } catch (error) {
      if (enhance === hydrateCases) showDataNotice();
      console.warn('精神传承页的部分增强未能启用，基础阅读仍然可用。', error);
    }
  });
})();
