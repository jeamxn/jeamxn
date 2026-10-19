# Resume PDF build package

Build-only generator over reviewed `@jeamxn/core` data. No HTTP server,
NestJS dependency, environment config, AI or cached runtime is required.

```sh
# From the repository root, after workspace dependencies/core are built:
pnpm --filter @jeamxn/resume-pdf build
node packages/resume-pdf/dist/cli.js --output apps/web/public/resume.pdf
pnpm --filter @jeamxn/resume-pdf test
```

`generateResumePdf(data = portfolio, { fontPath? } = {})` returns a fresh
`Uint8Array`. The optional font override is intended for font failure regression
fixtures, not a requirement to install a system font. Failures reject the build.
The CLI defaults to the repository's `apps/web/public/resume.pdf`; an explicit
`--output` is resolved against the current working directory, independently of
the module's location. `--font-path` optionally overrides the Regular TTF.

The existing verified layout and complete licensed Pretendard Regular/Bold
faces are preserved. `subset: false`, actual shaped `glyph.codePoints`, and
font-specific ToUnicode maps must remain: text extraction alone did not catch
an earlier missing-outline regression. Keep the licensed source font streams
byte-identical. The portrait is the owner's approved public resume image.

Design tests retain four-page geometry, public project selection, attribution,
certification issuers, external links, actual glyph outlines and FontFile2 byte
identity. Runtime HTTP retry/cache behavior intentionally is not part of a static
build. Run the repository's independent MuPDF/PDFKit pixel and OCR scripts on
the generated file and on the browser's downloaded `/resume.pdf` before handoff.
