"""Prepare supplied stationery cards for use behind editable letter text.

Extract the paper, straighten its edges, retain the original artwork and
frame, and replace the sample salutation/rules with the paper's own blank
texture. The website supplies the actual letter text and writing rules.
"""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DESIGNS = [
    ("pine-message", "松风寄远", "松风翻岭，把思念送往远方", "017743eb-9df0-4e71-a90c-a2d7c2f58a50", [(201, 153), (845, 122), (883, 958), (234, 989)], (36, 188, 605, 660)),
    ("cloud-water", "云水来笺", "一湾云水，载来山河回信", "40bbb533-8ba6-4f11-8a5a-9aec8eaee725", [(209, 156), (862, 123), (884, 980), (220, 1013)], (36, 150, 605, 625)),
    ("frost-echo", "霜岭回音", "素雪千重，回响仍在山间", "3f34b3a9-61c4-4a3b-bbbb-a794283975e1", [(208, 149), (861, 119), (892, 958), (236, 982)], (36, 185, 605, 660)),
    ("mountain-lamp", "山灯未熄", "一盏微光，仍照归途与初心", "9b737e9e-f341-4df6-be8b-60dafad3ab30", [(196, 171), (845, 145), (875, 972), (226, 999)], (36, 175, 605, 640)),
    ("plank-song", "栈道闻歌", "沿山而行，把回响写进云间", "67887195-0695-4192-a0a7-895a13a5eaea", [(197, 170), (840, 137), (882, 990), (231, 1023)], (36, 180, 605, 615)),
    ("dawn-letter", "晓岚有信", "晨光穿雾，把心意寄向山河", "99bc27ae-3fd2-43da-88e4-42ab1f4782d5", [(203, 177), (850, 147), (882, 981), (237, 1010)], (36, 180, 605, 650)),
    ("willow-thought", "柳岸寄思", "柳影轻摇，把思念写进水波", "323fce62-1ad6-4401-ac43-a909aac05b7c", [(217, 141), (868, 118), (901, 970), (247, 995)], (36, 180, 605, 625)),
    ("clear-stream", "清溪望远", "一溪澄明，映照远行心绪", "a4fa2703-444c-43f5-ac29-e710eff6d3d8", [(242, 134), (850, 110), (880, 954), (269, 978)], (36, 175, 605, 650)),
    ("distant-mountain", "远山知音", "层峦静立，听一纸真情回响", "3525b052-bb18-4977-8f14-6e9555b4de31", [(225, 161), (849, 135), (881, 942), (256, 965)], (36, 175, 605, 650)),
    ("moon-home", "月照归程", "一轮清辉，照见未改初心", "69755983-447a-4373-a414-1bbd05e483fc", [(246, 164), (828, 135), (867, 924), (278, 952)], (36, 175, 605, 635)),
]


def blank_body(paper, box, ident):
    # A blank patch between the sample salutation and its first writing rule
    # supplies the original paper texture. Mirror tiling avoids hard seams.
    strip = paper.crop((555, 275, 580, 300))
    texture = Image.new("RGB", (660, 920))
    for x in range(0, 660, 25):
        for y in range(0, 920, 25):
            tile = ImageOps.mirror(strip) if (x // 25) % 2 else strip
            if (y // 25) % 2:
                tile = ImageOps.flip(tile)
            texture.paste(tile, (x, y))
    mask = Image.new("L", paper.size, 0)
    ImageDraw.Draw(mask).rectangle(box, fill=255)
    if ident == "cloud-water":
        # Keep willow foliage that rises alongside the lowest writing rule.
        ImageDraw.Draw(mask).rectangle((485, 575, 640, 896), fill=0)
    mask = mask.filter(ImageFilter.GaussianBlur(3))
    paper.paste(texture.crop((0, 0, 640, 896)), (0, 0), mask)
    return paper


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    args = parser.parse_args()
    target = ROOT / "assets/images/stationery"
    target.mkdir(parents=True, exist_ok=True)
    manifest = {"suppliedBy": "website owner", "date": "2026-11-07", "method": "Straighten the supplied paper and retain its artwork; replace sample text and rules with blank paper texture for real letter content", "size": [640, 896], "designs": []}
    sheet = Image.new("RGB", (1500, 1000), "#eff1ea")
    for index, (ident, name, caption, source_id, corners, body) in enumerate(DESIGNS):
        source = args.source / f"codex-clipboard-{source_id}.png"
        with Image.open(source) as image:
            tl, tr, br, bl = corners
            quad = tuple(v for p in (tl, bl, br, tr) for v in p)
            paper = image.convert("RGB").transform((640, 896), Image.Transform.QUAD, quad, Image.Resampling.BICUBIC)
        blank_body(paper, body, ident)
        path = target / f"{ident}-v1.webp"
        paper.save(path, "WEBP", quality=87, method=6)
        header = paper.crop((0, 0, 640, 180)).convert("RGBA")
        alpha = Image.new("L", header.size, 255)
        for y in range(145, 180):
            ImageDraw.Draw(alpha).line((0, y, 639, y), fill=round(255 * (179-y) / 34))
        header.putalpha(alpha)
        header_path = target / f"{ident}-top-v1.webp"
        header.save(header_path, "WEBP", quality=87, method=6)
        footer = paper.crop((0, body[3] - 20, 640, 896)).convert("RGBA")
        footer_alpha = Image.new("L", footer.size, 255)
        for y in range(32):
            ImageDraw.Draw(footer_alpha).line((0, y, 639, y), fill=round(255 * y / 31))
        footer.putalpha(footer_alpha)
        footer_path = target / f"{ident}-bottom-v1.webp"
        footer.save(footer_path, "WEBP", quality=87, method=6)
        manifest["designs"].append({"id": ident, "name": name, "caption": caption, "source": source.name, "sourceSHA256": hashlib.sha256(source.read_bytes()).hexdigest(), "cornersTLTRBRBL": corners, "blankBodyBox": body, "output": path.relative_to(ROOT).as_posix(), "header": header_path.relative_to(ROOT).as_posix(), "footer": footer_path.relative_to(ROOT).as_posix(), "bytes": path.stat().st_size + header_path.stat().st_size + footer_path.stat().st_size})
        x, y = index % 5 * 300 + 12, index // 5 * 500 + 12
        sheet.paste(paper.resize((270, 378), Image.Resampling.LANCZOS), (x, y))
        ImageDraw.Draw(sheet).text((x, y + 389), f"{index+1}. {ident}", fill="#263d33")
    output = ROOT / "docs/assets/papers-20261107.json"
    output.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    preview = ROOT.parent / "playwright/papers-20261107-contact.jpg"
    sheet.save(preview, quality=93)
    print(json.dumps({"count": len(DESIGNS), "bytes": sum(d["bytes"] for d in manifest["designs"])}, ensure_ascii=False))


if __name__ == "__main__":
    main()
