import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";

const script = await readFile(new URL("../assets/js/legacy-chronicle.js", import.meta.url), "utf8");
function visit(url) {
  const target = new URL(url);
  const redirected = [];
  const events = new Map();
  const location = { href: target.href, hash: target.hash, search: target.search, replace: value => redirected.push(value) };
  vm.runInNewContext(script, { URL, window: { location, addEventListener: (type, fn) => events.set(type, fn) } });
  return { redirected, events, location };
}

test("old chronicle bookmarks keep the GitHub Pages project path, query and anchor", () => {
  const page = visit("https://yi-123-ii.github.io/Long-March-Web/?v=old#chronicle");
  assert.deepEqual(page.redirected, ["https://yi-123-ii.github.io/Long-March-Web/chronicle.html?v=old#chronicle"]);
});

test("old event links continue to open the selected event", () => {
  const page = visit("https://yi-123-ii.github.io/Long-March-Web/index.html#event=zunyi");
  assert.deepEqual(page.redirected, ["https://yi-123-ii.github.io/Long-March-Web/chronicle.html#event=zunyi"]);
});

test("new homepage anchors stay on the homepage", () => {
  for (const hash of ["", "#prologue", "#chapters", "#main", "#unknown", "#event=../../outside"]) {
    assert.deepEqual(visit("https://yi-123-ii.github.io/Long-March-Web/" + hash).redirected, []);
  }
});

test("changing to an old bookmark after loading also works", () => {
  const page = visit("http://127.0.0.1:5190/index.html");
  page.location.hash = "#post-office-invite";
  page.events.get("hashchange")();
  assert.deepEqual(page.redirected, ["http://127.0.0.1:5190/chronicle.html#post-office-invite"]);
});
