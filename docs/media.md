# Portfolio media

Prepared on 2026-10-12. All public files below are under
`apps/web/public/images/` and are available as `/images/<filename>`.
No product source, fixture source, font binaries, personal sessions, real
student records, company screens, credentials, or audio were added to this
public repository.

## Assets — revised full application captures

| Asset | Pixels | Bytes | Use |
| --- | --- | ---: | --- |
| `portrait.webp` | 1800 × 1200 | 93,228 | Selected personal portrait; unchanged |
| `portrait-small.webp` | 720 × 480 | 27,618 | Smaller portrait srcset; unchanged |
| `ara-preview.webp` | 1440 × 900 | 48,876 | Original full ara shell, conversation and document pane |
| `ara-editor.webp` | 1440 × 900 | 51,160 | Original full ara shell and canvas editor route |
| `dipull-preview.webp` | 1440 × 900 | 49,452 | Original Dipull desktop laundry route, root layout and providers |
| `dipull-home.webp` | 390 × 844 | 25,206 | Original responsive home route |
| `dipull-laundry.webp` | 390 × 844 | 34,640 | Original responsive laundry route |
| `dipull-wakeup.webp` | 390 × 844 | 14,548 | Original responsive wake-up song route |

The six product captures total 223,882 bytes. Each file is one browser
viewport from one original application route: no collage, decorative
frame, invented shell, added test heading, CSS geometry override, crop,
or resampling of the previous screenshots. Explicitly reserve the native
aspect ratios in the website. Mobile screenshots retain the original
scrollable viewport and bottom navigation, not the whole offscreen page.

Suggested accessible descriptions:

- ara cover: `가상 대화와 문서로 실행한 ara의 원본 전체 앱 화면`
- ara editor: `가상 슬라이드를 편집하는 ara의 원본 캔버스 화면`
- Dipull cover: `가상 학생과 예약으로 실행한 Dipull의 원본 세탁 신청 화면`
- Dipull details: `가상 데이터로 실행한 Dipull의 원본 홈/세탁 신청/기상송 화면`

**Keep the synthetic-data disclosure visible**, not only in alt text:
`원본 앱을 가상 데이터로 실행한 화면입니다. 실제 사용자 기록이나 운영 현황은 아닙니다.`

The previous `ara-demo.mp4` was retired: it recorded the old partial
component/fixture shell, not the complete app. Do not link or present it
as the revised product UI. No replacement video is claimed.

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

- Authorized read-only original: `ara-ax/ara`, latest main source commit
  `a05141f6a1036d8a020a85c1f3587622eade361d`.
- The complete `apps/web/app` and local shared packages were copied into
  a **private temporary directory**, not the public portfolio repository.
  The original root, React Router route table, shell, navigation, account
  button, ChatSurface/ChatTranscript, right DrivePanelHost, DriveView,
  full CanvasEditor, filmstrip, toolbar, stage and properties are rendered.
  The fixture does not substitute hand-built chrome or transcript UI.
- The original main checkout had incomplete generated package dependencies.
  Existing isolated dependency caches supply external packages; private
  Vite aliases load the latest copied source packages. The kit's Tailwind
  scan points at copied source instead of its absent generated bundle.
  No product layout CSS is restyled for the screenshot.
- Fresh synthetic account, three chats, four static conversation messages,
  five document nodes and a three-slide deck are local fixtures. The deck
  passes the original `deckSchema`; account/chat/message/model/drive-node
  objects are checked against the original contracts. Fixture transcript
  text is **not evidence of an actual model run**. No tools are represented
  as having been executed, no fake live generation, impact or real usage
  metric is shown.
- The canvas uses the original `openCollabSession` and `useEditorSession`.
  A loopback-only in-memory WebSocket server actually exchanges standard
  y-protocols sync frames and a Y.Doc over the original `/api/drive/collab`
  path. It accepts only the fixture token and has no database or persistence.
  The original `실시간` indicator refers to this real **local fixture
  socket**, not production, multiple people, or externally launched status.
- The canvas capture is `/drive/<synthetic canvas id>` in the actual shell.
  The native pane-close and timeline-close buttons were clicked, so the
  slide has room to read. The real filmstrip was switched 1 → 2 → 1;
  no original source, shell or layout was altered to achieve that state.
- Source is private / UNLICENSED. Only user-authorized raster output is
  delivered. No grant to redistribute source is implied.

## Dipull provenance and limits

- Public original: <https://github.com/dipull-intra/dipull>, commit
  `2168d55f852c18023948ae7604cab1fd262d358d`.
- License: DON'T BE A DICK PUBLIC LICENSE v1.2; copyright
  `2023~ Jeamin Choi`, see the original `LICENSE.md`.
- A separate private temporary copy runs the **complete original Next.js
  14.2.5 application**, including its root layout, native Promotion block,
  RecoilProvider, modal/providers, UserProvider, React Query, Navigation,
  route layouts and actual Home/Machine/Wakeup pages. The left desktop
  brand/promotion is part of the original root, not an added frame.
- The only server identity substitution is private `getServerUser`, returning
  a synthetic student. Read APIs are intercepted at the browser transport;
  original hooks, query functions, links and controls run unmodified.
  The development-only React Query Devtools import/render is removed in the
  private copy; no devtool launch button is painted in the final assets.
  Any unrecognized non-GET request is denied; reservation/vote writes are
  never forwarded. MongoDB, real tokens, OAuth, student records and live
  APIs are not accessed. Next telemetry is disabled.
- Student names, numbers, teachers, subjects, meals, all ten reservation
  rows, song titles and vote counts are synthetic. The current fixture
  student's reservation matches their profile number. Songs are invented,
  not real licensed recordings. An abstract local profile silhouette is
  used. YouTube thumbnail requests receive local original abstract SVGs;
  no YouTube image, audio or video is downloaded or delivered.
- The original obsolete SUIT CDN font is replaced only by local official
  SUIT files in the temporary copy. Tailwind uses the original config,
  including `tailwindcss-safe-area`; no `!important` mobile/nav overrides.
- The desktop cover is one actual `/machine/washer` route at 1440 × 900.
  Each 390 × 844 detail is a separate original responsive route, not a
  three-phone montage. The original bottom-nav link was followed from
  laundry to `/wakeup/list`, and the song list arrived without page errors.
- The capture does not establish that the historical product operates today.
  Analytics/ads/external scripts are blocked before leaving the browser.

## Typeface and publication boundary

ara's native Wanted Sans (OFL-1.1) is loaded locally. Its canvas fixture uses
locally loaded Wanted Sans regular/bold both for browser glyphs and the
renderer registry. Dipull's native SUIT comes from the official public
`sun-typeface/SUIT` distribution (SIL OFL-1.1). No font binaries, raw
product SVG/logo, application source, fixture code, audio, personal sessions,
server environment or student records were copied into this repository.
Only glyphs/UI and authored synthetic contents are rasterized.

The selected portrait and all of its files/provenance above are unchanged
by this revision. No company screen is included.

## Verification and reproduction

Private temporary implementation, PNG masters, fixtures and proof are at
`/tmp/jeamxn-media-v2/` on the company Mac. Node 24.16.0, Playwright 1.63,
Chromium, Sharp and local Apple Vision text recognition were used.

- Full ara dev application: `127.0.0.1:5430`
- Full original Dipull Next application: `127.0.0.1:5431`
- Synthetic in-memory canvas WebSocket: `127.0.0.1:5432`
- Owned process records: `ara.pid`, `dipull.pid`, `collab.pid`
- Capture/interaction script: `capture.mjs`
- Technical geometry/request/error proof: `qa.json`
- Image metadata, byte counts and SHA-256: `manifest.json`
- Local image OCR evidence: `ocr.txt`

Fresh browser contexts and synthetic tokens are used. Every ara `/api`
request is mocked; Dipull read APIs are mocked and writes denied. The only
application server-side identity read is the local fixture. External browser
requests are intercepted before network access; original ara ports 3000/
5273, personal sessions, and company/parent APIs are not touched.

All six captures passed: page/console errors 0, HTTP failures 0, broken
images 0, body horizontal overflow 0, nonempty SVG/text, native fonts loaded,
WebP decoding successful, no EXIF, nonblank pixel entropy. Actual canvas
filmstrip and Dipull navigation interactions passed. The canvas right pane
was measured at its native collapsed 52px strip after the real close button,
not the previous 424.8px greeting panel. Development tool buttons count 0.
Dipull keeps mounted modal DOM text in `innerText`; every modal control
has measured effective ancestor opacity 0 (or display:none), so those
confirm/cancel labels are not painted in the screenshot. Detailed ancestor
opacity/transform evidence is in `qa.json`. Synthetic teachers use ordinary
names (김도현/이수진/박민서/정하윤/최지훈), not 김선생-style placeholders;
the original source-appended □ suffix is retained. Local OCR read the
main slide text, complete reservation rows and original controls from the
raster; original page scroll remains native where content exceeds the
viewport. No image was sent to an external vision service.

**These are technical and structural checks, not human visual approval.**
The agent cannot directly view these images with the currently available
tools. The integrating parent/user still reviews spacing, art direction,
composition and readability in the final website. Original complete app
routes are nevertheless used instead of a lookalike or partial-shell
fallback. No fake new video or actual AI execution is claimed.

Owned temporary dev/Next/WebSocket processes are stopped after handoff;
private files remain for review/reproduction. No git commit, push, branch
switch, merge, real DB change or deployment was made.
