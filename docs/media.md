# Portfolio media

Prepared on 2026-10-12. All public files below are under
`apps/web/public/images/` and are available as `/images/<filename>`.
No product source, fixture source, font binaries, personal sessions, real
student records, company screens, credentials, or audio were added to this
public repository.

## Assets

| Asset | Pixels | Bytes | Use |
| --- | --- | ---: | --- |
| `portrait.webp` | 1800 × 1200 | 93,228 | Selected personal portrait; full image, no crop |
| `portrait-small.webp` | 720 × 480 | 27,618 | Smaller portrait srcset |
| `ara-preview.webp` | 1920 × 1200 | 75,344 | ara original canvas and chat UI in a local fixture shell |
| `ara-editor.webp` | 1308 × 1086 | 57,440 | Canvas editor detail |
| `dipull-preview.webp` | 1440 × 1000 | 48,616 | Three original Dipull client screens composed in a demo montage |
| `dipull-home.webp` | 390 × 790 | 16,126 | School-life information fixture |
| `dipull-laundry.webp` | 390 × 790 | 16,256 | Laundry reservation fixture |
| `dipull-wakeup.webp` | 390 × 790 | 13,434 | Wake-up song fixture; original cards, synthetic thumbnails |
| `ara-demo.mp4` | 1440 × 900 | 186,096 | 7.4-second muted browser capture of original canvas interaction |

Total: 534,158 bytes (about 522 KiB), including the optional video.

Use explicit `width` and `height` or an equivalent aspect ratio to reserve
layout space. The portrait asset itself is the full image, not cropped or
retouched. Natural aspect-ratio display is the conservative default; the
current website's portrait cover frames were separately checked below.
Do not stretch the captures to a different aspect ratio.

Suggested accessible descriptions:

- Portrait: `최재민의 사진`
- ara: `가상 데이터로 구성한 ara의 도화지 편집기와 대화 화면`
- Dipull: `가상 데이터로 구성한 Dipull의 생활 정보, 세탁 예약, 기상송 화면`

Keep the synthetic-data disclosure visible in the surrounding case-study
copy, not only in alt text or this document. Suggested caption:
`원본 UI를 가상 데이터로 실행한 데모 화면입니다.`

For the video, use `controls muted playsInline preload="none"` with
`poster="/images/ara-preview.webp"`, or start only after a visitor asks to
play. The recording has no audio. It does not show an actual AI run.

## Portrait provenance

The user-selected iCloud source is the exact NFC filename
`사진 2026. 8. 6. 15.39.jpg`, **not** the similarly named `#2` photograph.
It was found by Unicode normalization. The original is 2974 × 1982 pixels
and 562,488 bytes. The full image was auto-oriented, resized without
upscaling, encoded as WebP (quality 88), and stripped of EXIF/GPS and other
metadata. No new person, generative fill, background change, or crop was
made. Original/private source remains outside this repository.
Original SHA-256:
`7de197dcab8854e2e1b8d7e09d5643deab7b48bbf9b519e7d3ca0c5ffa897ea0`.

### Portrait display geometry (not human visual approval)

A local Apple Vision face-landmark request on the exact original returned
one face at confidence 1. The same local detector on the optimized WebP
returned one face at confidence 1. No image was sent to an external service.
Detailed detections stay private under `/tmp/jeamxn-media/`.

The current frontend was inspected read-only at port 5410 on `/` and
`/about`, widths 360, 390, 600, 768, 1024, 1440, and 1920 (14 frames).
The portrait currently uses `object-fit: cover; object-position: 50% 38%`.
Projecting the original detected face rectangle into every rendered frame
showed zero detected-face crop loss (floating-point tolerance 1e-12).
Smallest measured face-to-frame margins: left 49.08px, right 62.46px,
top 99.26px, bottom 91.53px. The hero-name bounding box did not overlap
the projected face in any measured frame. **Keep `50% 38%`** for these
frames; no CSS change was made by the media task.

This establishes detected face/landmark containment, not a human judgment
about hair, shoulders, visual composition, or a future CSS frame. Re-run
the projection if the frame ratio or object-position changes.
Proof: `/tmp/jeamxn-media/portrait-layout-qa.json`; source-detection and
optimized-detection files are `portrait-face.json` and
`portrait-webp-face.json` in the same private temporary directory.

## ara provenance and limits

- Authorized read-only source: `ara-ax/ara`, commit
  `33bccdcf` (existing isolated source worktree).
- Direct source imports: `CanvasEditor`, `Timeline`, the canvas renderer,
  element factory, original toolbar, filmstrip, stage, properties, and
  timeline UI. Source worktree stayed clean.
- The fixture deck passes the original contract's `deckSchema`. It contains
  four original synthetic slides and sample opacity keyframes.
- A local in-memory Y.Doc replaces collaboration/authentication. Synthetic
  messages are passed directly to the original Timeline. Resource loading
  is stubbed; no original document, private blob, server environment, live
  API, database, or real AI account is used.
- Outer sidebar/chat heading/input shell is fixture composition, not a
  screenshot of the complete authenticated application shell.
- The original UI's connection indicator says `실시간`; in this fixture it
  reflects the local in-memory session stub, **not a real collaborative
  connection**. Do not use this image as evidence of live collaboration,
  model execution, production availability, or externally launched status.
- `ara-demo.mp4` is a real Playwright browser recording: collapse timeline,
  play the synthetic opacity animation, select original filmstrip entries,
  and return to the first slide. No fabricated AI response animation.
- Source is private / UNLICENSED. Only authorized portfolio raster/video
  output is delivered. This is not a grant to redistribute product source.

## Dipull provenance and limits

- Public source: <https://github.com/dipull-intra/dipull>, commit
  `2168d55f852c18023948ae7604cab1fd262d358d`.
- Repository license: DON'T BE A DICK PUBLIC LICENSE v1.2; copyright
  `2023~ Jeamin Choi`, see that repository's `LICENSE.md`.
- Original components directly imported: Home, Meal, Timetable, Machine,
  MyApply, MachineInfo, WakeupList, Card, Navigation, navigation buttons,
  menus, and Select controls. Their UI structure and Tailwind source are
  rendered in a browser rather than redrawn as a static illustration.
- Authentication, query data, routing, action/dispatch boundaries are local
  fixture stubs. Production Next server layouts, providers, MongoDB,
  analytics, ads, OAuth, student directory, and live APIs are not run.
- Student names/IDs, subjects, teachers, meals, machines, reservation slots,
  song titles, and votes are wholly synthetic. Song names do not represent
  real licensed recordings or real requests. Profile is an original abstract
  SVG silhouette; no real student photograph.
- The original Card requests YouTube thumbnail URLs; Playwright intercepts
  them with locally generated SVGs. No YouTube thumbnail is downloaded and
  no music or YouTube asset is included. Vote totals are fixture state, not
  impact or usage metrics.
- Three 390px panels are intentionally composed on one capture canvas.
  Frame, panel headings, mobile-width overrides, and montage are fixture
  presentation. It is not a screenshot of one actual product route at once.
- Source UI typo / labels / locale are not editorially rewritten. The
  capture does not establish that this historic product is operating today.

## Typeface and rights boundary

- ara renders its original Wanted Sans package (OFL-1.1), only locally.
- Dipull's original SUIT family is loaded locally from the public
  `sun-typeface/SUIT` font distribution (SIL OFL-1.1). The obsolete original
  WebFontWorld import was replaced in the temporary harness only.
- No font, original product SVG/logo, uploaded sound, or source code is
  copied into this repository; glyphs and UI are rasterized in the captures.
- Original slide content, dummy thumbnails, fixture student data, and frame
  composition were made for this portfolio. User selected their own photo
  and authorized original-source demo captures.

## Verification and reproduction

Temporary implementation and PNG masters are kept outside the repository
at `/tmp/jeamxn-media/`. Source reads are through the existing ara dependency
cache and a separate public Dipull clone. No dependency install happened in
this portfolio worktree. Node 24 and Playwright 1.63 were used.

- ara fixture: local-only `127.0.0.1:5430` (stopped after capture)
- Dipull fixture: local-only `127.0.0.1:5431` (stopped after capture)
- Owned Vite process IDs: `/tmp/jeamxn-media/ara.pid` and `dipull.pid`
- Generate captures: `node /tmp/jeamxn-media/capture.mjs`
- Generate browser recording: `node /tmp/jeamxn-media/video.mjs`
- QA details: `/tmp/jeamxn-media/qa.json`

Capture pages use a fresh isolated browser context. All external requests
and `/api` traffic are blocked/intercepted; the final captures made zero
live/external requests. Original ara ports `3000` and `5273` were not
accessed or altered; parent APIs on `5411` were not called or altered.
Parent web preview `5410` was subsequently read-only inspected solely for
portrait-frame CSS geometry. No real sessions or company data were read.

Final Chromium validation: page errors 0, HTTP failures 0, broken images 0,
body horizontal overflow 0, ara SVGs 63 / Dipull SVGs 22, nonempty text in
both screens. Original ara filmstrip interactions and animation play were
executed without page errors. Image metadata confirms no EXIF. Video has
H.264 1440 × 900, yuv420p, no audio, fast-start, and 7.4-second duration.
Pixel variance/entropy confirm nonblank images. These are technical checks,
not a human visual approval; final layout/art-direction review belongs to
the integrating parent session.

A chat-drive preview upload was attempted but the device rejected the
server URL (`url must point at this device's own server`); no assets were
uploaded. Files on disk and PNG masters are intact for local inspection. Only the
two media-owned Vite processes were stopped after the work; original and
parent servers were not touched.
No git commit, push, branch change, merge, source mutation, DB reset, or
production change was performed.
