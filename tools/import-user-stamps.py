"""Prepare the supplied stamp-card artwork without redrawing its contents.

Run with the directory containing the original clipboard PNG files. The public
manifest records source filenames and inner-art corners for reproducibility.
"""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
DESIGNS = [
    ("snow-echo", "雪岭回声", "翻越千峰，信念始终向前", "history", "f440ced7-d7dc-4dfe-a7cd-95a5750611c0", [(288, 193), (771, 163), (804, 775), (325, 801)]),
    ("grass-glow", "草地微光", "穿过泥泞，把希望带向远方", "history", "080d9294-e33e-418f-9be7-ce3b63c0d730", [(287, 220), (770, 192), (805, 769), (322, 796)]),
    ("bridge-onward", "渡桥向前", "一桥飞架，踏出新的方向", "history", "8acd8bfa-f925-4f5b-a2e3-efbe92f07233", [(290, 220), (762, 186), (800, 775), (317, 806)]),
    ("city-dawn", "晨光满城", "千窗映暖，照亮寻常日子", "today", "bdb8405d-eb3e-4e53-8fb1-5b391d7f6798", [(257, 237), (766, 197), (808, 793), (303, 823)]),
    ("field-song", "田野新歌", "稻谷盈野，风里都是丰收", "today", "258ff5f5-00ee-498b-b596-22dbc5fd228c", [(270, 226), (758, 188), (803, 768), (309, 794)]),
    ("cloud-bridge", "云桥远行", "山河相连，脚步通向未来", "today", "b2dbc545-bf44-40bb-9d7d-ca37fd6ed56e", [(297, 230), (754, 197), (791, 753), (336, 783)]),
    ("wujiang-dawn", "乌江晨渡", "一篙破浪，驶向新的转机", "history", "c009be73-cffe-4a34-92fd-9e2a579cdd76", [(225, 305), (669, 269), (715, 836), (265, 870)]),
    ("jinsha-crossing", "金沙飞渡", "大河无声，转战更见从容", "history", "d54658f5-ff85-4429-8892-9fb4b235414a", [(212, 298), (693, 265), (724, 842), (245, 875)]),
    ("iron-chain", "铁索天险", "惊涛之上，踏出必胜之路", "history", "2090d4d7-6b30-43de-bb13-81776bb63bc5", [(231, 322), (694, 296), (730, 856), (264, 883)]),
    ("shaanbei-reunion", "陕北会师", "历尽千程，希望终有归处", "history", "f5cbf361-b56e-4089-bdbb-71741b0d45d5", [(235, 298), (693, 260), (727, 804), (270, 833)]),
    ("school-mountains", "书声越岭", "琅琅书声，翻过山峦抵达远方", "today", "35dd94da-bba8-4404-85e6-b9418ee8e1dc", [(248, 266), (692, 238), (721, 825), (278, 847)]),
    ("white-coats", "白衣同行", "守护万家，把温暖送到身边", "today", "a7b4e8e0-3615-4aea-b013-e47f8697140e", [(251, 265), (691, 240), (722, 799), (279, 821)]),
    ("smart-dawn", "智造晨光", "创新如潮，点亮奋进的明天", "today", "cee1a031-7c3f-4c54-9cb4-594f4aa3409d", [(221, 288), (678, 255), (716, 806), (257, 839)]),
    ("new-village", "青山新居", "村落焕新，日子向着光亮生长", "today", "ecbc0a5c-a2a2-4d7f-ae72-dfa1060c0a75", [(251, 285), (685, 262), (717, 798), (281, 820)]),
]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    args = parser.parse_args()
    output = ROOT / "assets/images/stamps"
    output.mkdir(parents=True, exist_ok=True)
    manifest = {"suppliedBy": "website owner", "date": "2026-11-07", "method": "Extract and straighten the inner illustration; reuse the website's existing perforated stamp frame", "outputSize": [400, 500], "designs": []}
    sheet = Image.new("RGB", (1400, 1160), "#eff1ea")
    for index, (ident, name, caption, group, source_id, corners) in enumerate(DESIGNS):
        source = args.source / f"codex-clipboard-{source_id}.png"
        with Image.open(source) as image:
            tl, tr, br, bl = corners
            quad = tuple(value for point in (tl, bl, br, tr) for value in point)
            art = image.convert("RGB").transform((400, 500), Image.Transform.QUAD, quad, Image.Resampling.BICUBIC)
        destination = output / f"{ident}-v1.webp"
        art.save(destination, "WEBP", quality=86, method=6)
        manifest["designs"].append({"id": ident, "name": name, "caption": caption, "group": group, "source": source.name, "sourceSHA256": hashlib.sha256(source.read_bytes()).hexdigest(), "cornersTLTRBRBL": corners, "output": destination.relative_to(ROOT).as_posix(), "bytes": destination.stat().st_size})
        tile = art.resize((196, 245), Image.Resampling.LANCZOS)
        # Four columns keeps all supplied illustrations visible in a QA contact sheet.
        x, y = (index % 4) * 350 + 70, (index // 4) * 290 + 28
        sheet.paste(tile, (x, y))
        ImageDraw.Draw(sheet).text((x, y + 250), f"{index + 1}. {ident}", fill="#263d33")
    target = ROOT / "docs/assets/stamps-20261107.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    preview = ROOT.parent / "playwright/stamps-20261107-contact.jpg"
    preview.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(preview, quality=92)
    print(json.dumps({"count": len(DESIGNS), "totalBytes": sum(item["bytes"] for item in manifest["designs"]), "preview": str(preview)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
