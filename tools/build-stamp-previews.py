"""Bundle sharp chooser-size stamp images into a single request."""
import base64
import io
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
bundle = {}
total = 0
for source in sorted((ROOT / "assets/images/stamps").glob("*-v1.webp")):
    output = io.BytesIO()
    with Image.open(source) as image:
        image.convert("RGB").resize((180, 225), Image.Resampling.LANCZOS).save(output, "WEBP", quality=87, method=6)
    data = output.getvalue()
    bundle[source.stem.removesuffix("-v1")] = "data:image/webp;base64," + base64.b64encode(data).decode("ascii")
    total += len(data)
(ROOT / "data/stamp-previews.json").write_text(json.dumps(bundle, separators=(",", ":")) + "\n", encoding="utf-8")
print(f"Bundled {len(bundle)} stamp designs, {total} image bytes")
