"""Build small web-font shards for current site text, retaining full input coverage.

Requires fonttools[woff]==4.60.1. Existing font files remain the source of truth.
Run with --dependencies output/font-build-deps for a workspace-local installation.
"""
import argparse
import hashlib
import json
import logging
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

parser = argparse.ArgumentParser()
parser.add_argument("--dependencies", type=Path)
args = parser.parse_args()
if args.dependencies:
    sys.path.insert(0, str(args.dependencies.resolve()))

from fontTools import subset
from fontTools.ttLib import TTFont

logging.getLogger("fontTools.subset").setLevel(logging.ERROR)
root = Path(__file__).resolve().parent.parent
font_dir = root / "assets/fonts"
manifest_path = font_dir / "manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
originals = [entry for entry in manifest if entry.get("status") != "current-site-subset"]

def ranges(codepoints):
    ordered = sorted(codepoints)
    result = []
    for point in ordered:
        if result and point == result[-1][1] + 1:
            result[-1][1] = point
        else:
            result.append([point, point])
    return ",".join(
        f"U+{start:X}" if start == end else f"U+{start:X}-{end:X}"
        for start, end in result
    )

def font_face(entry, filename, codepoints):
    return (
        '@font-face {\n'
        f'  font-family: "{entry["name"]}";\n'
        '  font-style: normal;\n'
        f'  font-weight: {entry["weight"]};\n'
        '  font-display: optional;\n'
        f'  src: url("../fonts/{filename}") format("woff2");\n'
        f'  unicode-range: {ranges(codepoints)};\n'
        '}\n'
    )

pages = ["index.html", "chronicle.html", "inheritance.html", "post-office.html", "modules/c/journey.html"]

class OpeningText(HTMLParser):
    """Collect the shared navigation and first cover, without below-fold prose."""
    def __init__(self):
        super().__init__()
        self.stack = []
        self.opening_depth = 0
        self.seen_opening = False
        self.characters = {name: set(range(0x20, 0x7F)) for name in ["Shanhe UI", "Shanhe Reading"]}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "section":
            if not self.seen_opening:
                self.seen_opening = True
                self.opening_depth = 1
            elif self.opening_depth:
                self.opening_depth += 1
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append((tag, attrs))

    def handle_endtag(self, tag):
        if tag == "section" and self.opening_depth:
            self.opening_depth -= 1
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                self.stack = self.stack[:index]
                break

    def handle_data(self, text):
        if any(tag in {"script", "style", "noscript"} for tag, _ in self.stack):
            return
        if any(attrs.get("aria-hidden") == "true" or "hidden" in attrs or
               set(attrs.get("class", "").split()) & {"a-sr-only", "lm-sr-only", "sr-only"}
               for _, attrs in self.stack):
            return
        header = any(tag == "header" and attrs.get("id") == "site-header" for tag, attrs in self.stack)
        if not (header or self.opening_depth):
            return
        family = "Shanhe UI" if header or any(tag in {"a", "button", "h1"} for tag, _ in self.stack) else "Shanhe Reading"
        self.characters[family].update(map(ord, text.strip()))

critical_characters = {name: set(range(0x20, 0x7F)) for name in ["Shanhe UI", "Shanhe Reading"]}
page_characters = {}
for page in pages:
    opening = OpeningText()
    opening.feed((root / page).read_text(encoding="utf-8"))
    page_characters[page] = opening.characters
    for family, points in opening.characters.items():
        critical_characters[family].update(points)

source_files = list(root.glob("*.html"))
for folder in ["assets/js", "assets/css", "data", "modules"]:
    source_files.extend(
        file for file in (root / folder).rglob("*")
        if file.suffix in {".html", ".js", ".css", ".json"}
        and file.name != "fonts.css"
    )
characters = set(range(0x20, 0x7F))
for file in source_files:
    characters.update(map(ord, file.read_text(encoding="utf-8")))

css = ["/* Built by tools/subset-site-fonts.py. Small shards cover current site text.\n"
       "   Original shards retain every other supported character for user input.\n"
       "   First-paint shards are preloaded; late fonts never replace visible text.\n"
       "   Sources and OFL licenses: assets/fonts/manifest.json. */\n"]
new_entries = []
report = []
critical_files = []

def save_subset(entry, codepoints, purpose):
    signature = hashlib.sha256((entry["sha256"] + ranges(codepoints)).encode("utf-8")).hexdigest()[:10]
    stem = entry["file"].replace("-extended-", "-site-").replace("-common.", "-site-common.")
    if purpose == "first-paint":
        stem = stem.replace("-site-", "-critical-")
    filename = stem.replace(".woff2", f"-{signature}.woff2")
    font = TTFont(font_dir / entry["file"], recalcTimestamp=False)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(font_dir / filename)
    font.close()
    data = (font_dir / filename).read_bytes()
    css.append(font_face(entry, filename, codepoints))
    new_entries.append({
        **entry, "file": filename, "bytes": len(data),
        "characters": len(codepoints), "unicodeRange": ranges(codepoints),
        "sha256": hashlib.sha256(data).hexdigest(),
        "status": "current-site-subset", "parentFile": entry["file"], "purpose": purpose,
        "note": "保留原字体的字形和宽度；首屏字形优先加载，其余字形按需提供。"
    })
    report.append({"file": filename, "bytes": len(data), "characters": len(codepoints), "purpose": purpose})
    if purpose == "first-paint":
        critical_files.append({"file": filename, "family": entry["name"], "characters": codepoints})

for entry in originals:
    if not entry["file"].startswith("shanhe-"):
        continue
    font = TTFont(font_dir / entry["file"], recalcTimestamp=False)
    available = set(font.getBestCmap())
    font.close()
    critical = available & critical_characters[entry["name"]]
    if critical:
        save_subset(entry, critical, "first-paint")
    available -= critical
    used = available & characters
    if not used or used == available:
        if available:
            css.append(font_face(entry, entry["file"], available))
        continue
    save_subset(entry, used, "site-text")
    remaining = available - used
    if remaining:
        css.append(font_face(entry, entry["file"], remaining))

(root / "assets/css/fonts.css").write_text("".join(css), encoding="utf-8")
manifest_path.write_text(json.dumps(originals + new_entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

for page in pages:
    target = root / page
    html = target.read_text(encoding="utf-8")
    prefix = "../../" if page.startswith("modules/") else ""
    html = re.sub(r'\s*<!-- first-paint-fonts -->[\s\S]*?<!-- /first-paint-fonts -->', '', html)
    html = re.sub(r'\s*<noscript><link[^>]*fonts\.css[^>]*></noscript>', '', html)
    html = re.sub(r'<link[^>]*(?:data-site-fonts|href)="[^\"]*fonts\.css[^\"]*"[^>]*>',
                  f'<link rel="stylesheet" href="{prefix}assets/css/fonts.css?v=20261108-stable-fonts" />', html)
    needed = [item for item in critical_files if item["characters"] & page_characters[page][item["family"]]]
    needed.sort(key=lambda item: item["family"] != "Shanhe UI")
    preload = '\n<!-- first-paint-fonts -->\n' + '\n'.join(
        f'<link rel="preload" href="{prefix}assets/fonts/{item["file"]}" as="font" type="font/woff2" crossorigin />'
        for item in needed
    ) + '\n<!-- /first-paint-fonts -->'
    html = html.replace(f'<link rel="stylesheet" href="{prefix}assets/css/fonts.css?v=20261108-stable-fonts" />',
                        preload + f'\n<link rel="stylesheet" href="{prefix}assets/css/fonts.css?v=20261108-stable-fonts" />')
    html = re.sub(r'site-nav\.js\?v=[^\"\s>]+', 'site-nav.js?v=20261108-stable-fonts', html)
    target.write_text(html, encoding="utf-8")
print(json.dumps({"shards": len(report), "bytes": sum(item["bytes"] for item in report),
                  "firstPaintBytes": sum(item["bytes"] for item in report if item["purpose"] == "first-paint"),
                  "firstPaintFiles": [item["file"] for item in critical_files],
                  "characters": len(characters)}, ensure_ascii=False))
