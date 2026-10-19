# Resume PDF

`packages/resume-pdf` generates `resume.pdf` at build time from reviewed public
core data using pdf-lib and fontkit. GitHub Pages serves the generated file;
there is no HTTP renderer, Nest dependency or backend. It is generated from the
same source as `/resume`, not an uploaded private resume or a second database.

## Confirmed reference

The owner supplied `이력서_최재민_261018.pdf` on 2026-10-18 at 19:21 as the
exact design and voice reference. Its ten pages are 810 × 1163.04 pt, **not A4**.
The previous 4-page, different person's Surfit file was the wrong reference.
Passing the old layout tests did not establish visual similarity.

Measured design:
- White paper; ink #18191b and dark-gray #323235 text, no colored headings
- Section rail x74.4375, body x235.6875, right/date edge x735.75
- Header name 32.25 pt, tagline/intro 19.35 pt, full-width biography 12.9 pt
- Section headings 16.125 pt, record titles 14.5125 pt, metadata 12.9 pt,
  body 12.09375 pt with 19.5 pt leading, right dates 11.2875 pt
- The owner's round portrait at x622.5 / top64.5, 113.25 pt square
- Flowing paragraphs with bracketed topic headings; no added `(계속)` captions
  or name/site/page-number footers
- Skills as outlined tags, education, awards/activities, a separate professional
  certification group, then public URLs

The reference uses outlined Type3 Korean glyphs whose nominal reported sizes
and names are misleading (e.g. visible 32.25 pt name reports 3.225 pt). The actual
font family cannot be recovered reliably. Bundled unmodified **Pretendard static
TTF Regular/Bold**, under `Pretendard-LICENSE.txt` (SIL OFL), is a redistributable
optical approximation, not a claim of font identity. Source:
`https://github.com/orioncactus/pretendard/tree/main/packages/pretendard/dist/public/static/alternative`.
Do not bundle proprietary Apple SD Gothic Neo / Circular fonts extracted from a
PDF. The upstream OTF variant did not work with pdf-lib's subset path; the
static alternative TTF is bundled. Both complete faces must be embedded with
`subset: false`. The current fontkit subset path produced a valid ToUnicode map
but missing painted outlines for 1,956 of 2,856 non-space characters. The PDF
was broken despite extraction/bounds tests passing. Complete embedding preserves
selectable vector text, not raster pages, at about 2.6 MB. Both FontFile2 and
ToUnicode remain embedded.

The portrait was replaced on2026-10-19 at10:15 with the owner's newly supplied
ID photo. The complete rectangular source is proportionally fitted into the
existing header photo slot; no face edits, circle crop or stretching. The same
photo appears left of the name on the web resume; the homepage photo is unchanged. The previous unrelated person's portrait, contact
information, text, logos and metadata are not copied. The canonical public
contact is still the website's existing `me@jeamxn.dev`; a design request does
not silently publish different phone/email details from a private reference.

## Projection and voice

`resumeProjects()` selects ara / PFCT / Dipull, descending by the first year:
2026 / 2024 / 2022. It neither changes homepage flags nor deletes archive records.
Project role/status, shared authorship, purpose proposal vs implementation,
AI assistance, experimental state and handoff limits survive the projection.
Longer project details stay on the website. A10-page reference does not mean
padding three selected works to10 pages or restoring all the reference's older
project list. Full career/education/activity/award/certification data stays.

The owner now wants the reference's plain first-person 해요체: a concrete
inconvenience, what was implemented, and what changed. Avoid forced excitement,
exclamation marks and repetitive abstract reflection. The same voice applies to
public core prose and fixed UI captions. The AI response/FAQ feature was
removed at the owner's request on 2026-10-19. New numerical claims in the uploaded document are not
silently relabelled as independently measured outcomes in a style-only change.

## Verification

Run `pnpm build`, PDF design/CLI tests and the full workspace suite.
The font-scoped ToUnicode decoder must track each page's Font resource and
current Tf; a global CMap corrupts Regular/Bold glyph IDs. Build/CLI renderer failure rejects and prevents a partial PDF from being
published. There is no runtime HTTP503 or render cache.

Click the real browser download link at all supported widths. Render **that
fresh file**, not a stale standalone export, and compare all its pages against
the reference's corresponding layout treatments: header, project body,
skills/education, activities/awards, professional certificates and URLs. The
reference and generated file use different folders to avoid overwriting images.
Use the exact Regular/Bold faces for width/advance-box checks and separately
check rendered span bounds. Numerical checks and saved comparison images are
not a user's visual approval or proof of pixel identity; report any inability
to directly view the images rather than claiming one occurred.


### Required rendered-glyph regression (2026-10-18 19:42 defect)

Never hand off this PDF based only on text extraction, CMaps or coordinates.
`resume-design.test.mjs` now asserts that each embedded FontFile2 equals a
complete licensed source face and that all non-space glyphs have actual paths.
Also run both independent pixel checks on the **actual browser download**:

```sh
python3 -m venv /tmp/resume-qa-venv
/tmp/resume-qa-venv/bin/pip install PyMuPDF Pillow
/tmp/resume-qa-venv/bin/python scripts/check-resume-pdf-ink.py downloaded.pdf /tmp/resume-mupdf
# macOS: PDFKit renders the page, then Vision OCR reads the image, not PDF text
swift scripts/check-resume-pdf-ocr.swift downloaded.pdf /tmp/resume-pdfkit
/tmp/resume-qa-venv/bin/python scripts/check-resume-pdf-ink.py downloaded.pdf /tmp/resume-apple-ink /tmp/resume-pdfkit
```

Both reports must show zero blank character boxes on every page. Read the OCR
text for intact Korean names, headline, body and final-page qualifications.
Pixel coverage is a targeted missing-glyph guard, not proof of correct spelling
or design approval; OCR and the actual rendered page still matter. Compare with
a broken fixture once to prove that the guard detects this specific regression.

Full embedding also needs an accurate ToUnicode CMap for **shaped** glyphs.
Pretendard's Korean shaping substitutes punctuation (`~`, `-`, em dash) into
localized glyph IDs not represented by pdf-lib's generic characterSet CMap.
`resume-font.ts` captures actual glyph.codePoints from the fontkit layout used
by pdf-lib and writes a used-glyph CMap in blocks of at most100 pairs after
embedding. The complete TTF streams stay byte-identical to the OFL source files.
The PDF dates use the reference's ASCII ` ~ ` separator. Verify copying dates
and `KU-3DS` as well as painted glyphs; do not ship a rendered-looking PDF whose
copied text contains unrelated compatibility symbols.
