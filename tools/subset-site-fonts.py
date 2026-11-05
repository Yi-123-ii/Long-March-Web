"""Build small web-font shards for current site text, retaining full input coverage.

Requires fonttools[woff]==4.60.1. Existing font files remain the source of truth.
Run with --dependencies output/font-build-deps for a workspace-local installation.
"""
import argparse
import hashlib
import json
import logging
from pathlib import Path
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
        '  font-display: swap;\n'
        f'  src: url("../fonts/{filename}") format("woff2");\n'
        f'  unicode-range: {ranges(codepoints)};\n'
        '}\n'
    )

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
       "   Sources and OFL licenses: assets/fonts/manifest.json. */\n"]
new_entries = []
report = []
for entry in originals:
    if not entry["file"].startswith("shanhe-"):
        continue
    font = TTFont(font_dir / entry["file"], recalcTimestamp=False)
    available = set(font.getBestCmap())
    used = available & characters
    if not used or used == available:
        css.append(font_face(entry, entry["file"], available))
        font.close()
        continue
    signature = hashlib.sha256((entry["sha256"] + ranges(used)).encode("utf-8")).hexdigest()[:10]
    stem = entry["file"].replace("-extended-", "-site-").replace("-common.", "-site-common.")
    filename = stem.replace(".woff2", f"-{signature}.woff2")
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=used)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(font_dir / filename)
    font.close()
    data = (font_dir / filename).read_bytes()
    css.append(font_face(entry, filename, used))
    remaining = available - used
    if remaining:
        css.append(font_face(entry, entry["file"], remaining))
    new_entries.append({
        **entry, "file": filename, "bytes": len(data),
        "characters": len(used), "unicodeRange": ranges(used),
        "sha256": hashlib.sha256(data).hexdigest(),
        "status": "current-site-subset", "parentFile": entry["file"],
        "note": "从项目已有字库裁剪当前网页、剧情和案例使用的字形；其余输入字符仍由原始分片提供。"
    })
    report.append({"file": filename, "bytes": len(data), "characters": len(used)})

(root / "assets/css/fonts.css").write_text("".join(css), encoding="utf-8")
manifest_path.write_text(json.dumps(originals + new_entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"shards": len(report), "bytes": sum(item["bytes"] for item in report),
                  "characters": len(characters)}, ensure_ascii=False))
