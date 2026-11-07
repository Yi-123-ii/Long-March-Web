"""Build lightweight thumbnails for the stationery chooser, without redrawing."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
directory = ROOT / "assets/images/stationery"
count = total = 0
for source in sorted(directory.glob("*-v1.webp")):
    if any(part in source.stem for part in ("-top-", "-bottom-", "-preview-")):
        continue
    target = source.with_name(source.stem.removesuffix("-v1") + "-preview-v1.webp")
    with Image.open(source) as image:
        image.convert("RGB").resize((240, 336), Image.Resampling.LANCZOS).save(target, "WEBP", quality=84, method=6)
    count += 1
    total += target.stat().st_size
print(f"Prepared {count} stationery previews, {total} bytes total")
