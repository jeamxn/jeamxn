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
| `ara-preview.844644383862.webp` | 1440 × 900 | 48,876 | 대화와 문서함 |
| `ara-documents.bcd796303d6c.webp` | 1440 × 900 | 19,064 | 문서함 |
| `ara-page.b0348ac625fc.webp` | 1440 × 900 | 32,218 | 문서 편집 |
| `ara-editor.a63855ae9467.webp` | 1440 × 900 | 51,160 | 캔버스 편집 |
| `ara-canvas-properties.6c0bb34ef737.webp` | 1440 × 900 | 49,166 | 요소 속성 |
| `ara-canvas-timeline.e85de6798ac6.webp` | 1440 × 900 | 55,590 | 타임라인과 키프레임 |
| `dipull-home.65921cd1a596.webp` | 390 × 844 | 25,206 | 홈 · 식단과 시간표 |
| `dipull-preview.caa2f749a413.webp` | 1440 × 900 | 49,452 | 세탁 신청 현황 |
| `dipull-reservation.d99ba6fd0256.webp` | 390 × 844 | 26,936 | 세탁기와 시간 선택 |
| `dipull-dryer.29250f0f609a.webp` | 390 × 844 | 31,314 | 건조기 신청 |
| `dipull-wakeup.6bbb76c98f8b.webp` | 390 × 844 | 14,548 | 기상송 목록 |
| `dipull-wakeup-search.51c90c07851f.webp` | 390 × 844 | 11,902 | 기상송 검색 |
| `dipull-wakeup-my.edf565b709d7.webp` | 390 × 844 | 7,894 | 내 기상송 신청 |
| `dipull-stay.df6bc6946014.webp` | 390 × 844 | 17,060 | 잔류 신청 |
| `dipull-stay-seats.387f07070516.webp` | 1440 × 900 | 41,484 | 잔류 좌석 선택 |

Revision 3 has **six ara screens and nine Dipull screens**, 481,870 bytes in total. Canonical public filenames above are content-addressed; the integration step copies each frozen working raster to its SHA-256-suffixed name. The private manifest gives the corresponding unversioned working filenames and full hashes. The earlier mobile `dipull-laundry.webp` remains an unused historical working capture, not another gallery entry.

Each file is one browser viewport from one original application route: no collage, decorative frame, invented shell, CSS geometry override, crop, or resampling of the prior screenshots. Native 1440 × 900 desktop and 390 × 844 mobile proportions are retained. Mobile captures retain original scroll and navigation; they do not claim to show all offscreen contents.

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


### Revision 3: actual distinct workflows

- **ara document listing:** the original `/drive/personal` listing, root shell, folder tree and five schema-valid document nodes. The real chat-panel close button is used.
- **ara page editor:** `/drive/<synthetic page id>` uses original TipTap `PageEditor`, heading and list input rules. Text is typed into the real contenteditable, not an injected HTML mock. The loopback WebSocket server exchanges y-protocols frames for an initially empty page Y.Doc. The `실시간` label means this local fixture connection, not persisted production editing or multi-person collaboration.
- **ara element properties:** the original canvas layer row selects a text element; the real timeline-close and chat-panel-close controls are used. Native size/position/typography controls remain visible.
- **ara timeline:** the original `넣기` control applies a fade-in, producing a genuine local opacity track; the `키프레임 있는 것만` filter is enabled, and the real sidebar is collapsed to give the timeline room. This is local editor interaction, not an AI tool run, exported animation or shipped customer result. No audio is present.
- **Dipull reservation:** the original modal chooses 세탁기 1호 and 오후 8시 00분. The final `신청하기` button is enabled, but never pressed. Other synthetic reservations leave this slot free; no write is forwarded.
- **Dipull dryer:** proper dryer machine codes/names and typed reservation rows are returned; it is not a washer page with its heading renamed.
- **Dipull song search/my-list:** the original search input and Enter action call local fixture responses for `산책`; original cards display three invented results. The user's one synthetic request is shown in the actual `/wakeup/my` route. Read-only POST endpoints are explicitly mocked; no real YouTube search/audio/image, song registration or vote occurs.
- **Dipull stay:** the real `교실잔류` control sets the reason in the native form, without submitting. The original `/stay/apply` seat-modal is opened, its actual 14 × 18 Studyroom component receives normal synthetic allowed/occupied seats, and A2 is selected without confirming/submitting a reservation. The native chart is larger than the original 512px content column and scrolls in both directions; the screenshot truthfully shows its currently visible section, not a resized fake full chart.
- All account/owner identities are synthetic and internally consistent. Occupied seats use ordinary invented names, not live school records. The existing portrait/cover bytes are unchanged by this child task.

The request that prompted revision 3 attached an old three-phone montage with opaque white vertical strips and a misplaced floating menu. That montage and its CSS harness are **not** reused. The revised gallery contains independent original-app viewports. The portfolio integration separately versions image URLs to avoid reusing the old cache key; this media task does not claim the user's cache was conclusively diagnosed.

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

The earlier six captures passed: page/console errors 0, HTTP failures 0, broken
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


### Revision 3 technical evidence and limits

Private proof is under `/tmp/jeamxn-gallery-v3/` on the company Mac:

- `screens-manifest.json`: by-slug `ProjectScreen[]`, unversioned working sources, exact native dimensions, feature descriptions, alt/captions and device type
- `assets-qa.json`: all 15 gallery WebP bytes, full SHA-256, dimensions, successful decode, EXIF absence and pixel entropy
- `qa-final.json`: exact final successful captures' DOM/font/image/error/request data; earlier successful original captures are carried forward with their original v2 evidence
- `composed-hit-qa.json`: five representative live routes, point sampling via `elementFromPoint`, effective modal visibility and actual loaded font faces; unexpected high-z-index tall overlay count 0 and hidden-modal painted-control count 0
- `ocr-all.txt`: Apple Vision locally recognizes slide title/text, document headings, laundry form selections, song/search headings and actual seat labels from the raster
- `harness.mjs`, `capture-new.mjs`, `capture-more.mjs`, `capture-last.mjs`: private transport fixture and real interaction steps; exploratory failures are retained in logs, not represented as successful delivery

All final new captures have page/console errors 0, HTTP failures 0, broken images 0, body horizontal overflow 0, and native fonts loaded. The real reservation button is enabled after a free slot is selected. The local page is genuinely editable. The canvas opacity track is genuinely created through the original editor. Original hidden modal controls remain unpainted through ancestor opacity/display; the one seat-selection modal is intentionally open and interactive.

All **15 exact public rasters**, including unchanged v2 covers, were decoded and inspected column-by-column: no contiguous span ≥25px has >90% near-pure-white pixels (RGB >250) down the full-height column. This specifically checks the old opaque-white vertical-bar symptom; it is not a general computer-vision declaration of beauty. All rasters have positive image entropy and no EXIF. OCR is supplemental and misses some small glyphs. Native scrolling/truncated offscreen content is not claimed to be fully visible.

These are technical/structural checks, **not direct human visual approval**. No image was sent to an external vision service, and this agent cannot directly view the generated raster through the available tools. The parent/user still reviews composition and readability. Frozen sources were handed to the parent for content-hash copies; no further media regeneration is intended after that handoff.
