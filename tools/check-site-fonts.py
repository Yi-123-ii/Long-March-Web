"""Validate the actual CSS font routing and the outlines in generated subsets."""
import argparse
import json
from pathlib import Path
import re
import sys

parser = argparse.ArgumentParser()
parser.add_argument("--dependencies", type=Path)
args = parser.parse_args()
if args.dependencies:
    sys.path.insert(0, str(args.dependencies.resolve()))

from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen

root = Path(__file__).resolve().parent.parent
font_dir = root / "assets/fonts"
manifest = json.loads((font_dir / "manifest.json").read_text(encoding="utf-8"))
css = (root / "assets/css/fonts.css").read_text(encoding="utf-8")
coverage = {}
for block in re.findall(r"@font-face\s*{([^}]+)}", css):
    family = re.search(r'font-family:\s*"([^"]+)"', block)[1]
    filename = re.search(r'url\("../fonts/([^"]+)"\)', block)[1]
    declared = set()
    for start, end in re.findall(r"U\+([0-9A-F]+)(?:-([0-9A-F]+))?", block):
        declared.update(range(int(start, 16), int(end or start, 16) + 1))
    with TTFont(font_dir / filename) as font:
        assert declared <= set(font.getBestCmap()), filename + " declares missing glyphs"
    already = coverage.setdefault(family, set())
    assert not already & declared, family + " contains overlapping font ranges"
    already.update(declared)

expected = {}
checked = 0
for entry in manifest:
    if not entry["file"].startswith("shanhe-"):
        continue
    with TTFont(font_dir / entry["file"]) as font:
        cmap = font.getBestCmap()
        if entry.get("status") != "current-site-subset":
            expected.setdefault(entry["name"], set()).update(cmap)
            continue
        with TTFont(font_dir / entry["parentFile"]) as source:
            original_map = source.getBestCmap()
            original_glyphs = source.getGlyphSet()
            subset_glyphs = font.getGlyphSet()
            for point, name in cmap.items():
                original_name = original_map[point]
                before = DecomposingRecordingPen(original_glyphs)
                after = DecomposingRecordingPen(subset_glyphs)
                original_glyphs[original_name].draw(before)
                subset_glyphs[name].draw(after)
                assert before.value == after.value, f"{entry['file']} altered U+{point:X}"
                assert source["hmtx"][original_name] == font["hmtx"][name], "Glyph advance changed"
                checked += 1
assert coverage == expected, "Font routing removed previously supported input characters"
print(f"Validated {checked} subset glyphs, unchanged outlines and full input coverage.")
