"""Raster visibility QA for a freshly downloaded resume. Requires PyMuPDF/Pillow.

Usage: python check-resume-pdf-ink.py resume.pdf output-dir [pdfkit-render-dir]
The optional third path contains page-N.png from check-resume-pdf-ocr.swift.
Text extraction alone cannot detect missing painted glyphs; this checks actual
rendered pixels inside every non-whitespace character's expected rectangle.
"""
import json
import sys
from pathlib import Path

import pymupdf
from PIL import Image

pdf = pymupdf.open(sys.argv[1])
output = Path(sys.argv[2])
output.mkdir(parents=True, exist_ok=True)
report = []
for index, page in enumerate(pdf):
    if len(sys.argv) > 3:
        image = Image.open(Path(sys.argv[3]) / f"page-{index + 1}.png").convert("L")
        engine = "Apple PDFKit"
    else:
        pixels = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), colorspace=pymupdf.csGRAY, alpha=False)
        image = Image.frombytes("L", (pixels.width, pixels.height), pixels.samples)
        engine = "MuPDF"
    image.save(output / f"page-{index + 1}.png")
    sx, sy = image.width / page.rect.width, image.height / page.rect.height
    total, missing = 0, []
    for block in page.get_text("rawdict")["blocks"]:
        if block["type"] != 0:
            continue
        for line in block["lines"]:
            for span in line["spans"]:
                for char in span["chars"]:
                    if not char["c"].strip():
                        continue
                    total += 1
                    x0, y0, x1, y1 = char["bbox"]
                    crop = image.crop((max(0, int(x0 * sx)), max(0, int(y0 * sy)), min(image.width, int(x1 * sx) + 1), min(image.height, int(y1 * sy) + 1)))
                    if sum(crop.histogram()[:180]) < 2:
                        missing.append({"character": char["c"], "bbox": char["bbox"]})
    report.append({"engine": engine, "page": index + 1, "nonSpaceCharacters": total, "blankCharacterBoxes": len(missing), "missing": missing})
    print(json.dumps(report[-1], ensure_ascii=False))
(output / "ink-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2))
if any(page["blankCharacterBoxes"] for page in report):
    raise SystemExit("FAILED: extracted text exists where the rendered PDF paints no ink")
