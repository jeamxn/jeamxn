# Verification record

2026-10-12, macbook-pfct, isolated `feat/portfolio-renewal` worktree.
Implementation is an independent rebuild, not the legacy framework migration.

## Verified locally

- Node24.16.0 / pnpm10.33.0; frozen lockfile install.
- `pnpm build`: 8 tasks pass; 9 prerendered URLs and SPA fallback.
- `pnpm typecheck`: 14 tasks pass.
- `pnpm lint`: strict Biome + one-way feature/domain boundary checks.
- Core public-content schema, source-sharing, and attribution checks.
- Web input/history cap/link safety regression tests.
- Server actual HTTP + explicitly fake upstream tests, not paid vendor requests.
- Dedicated empty Valkey container: two Nest replicas, quota/concurrency reservations,
  spoofed forwarding headers rejected, store failure503, cleanup only owned store.
- Korean PDF: 3 A4 pages, 69,638B, embedded OFL font, text extraction,
  link annotations, safe filename, page range and line-overlap checks.
- Chromium at390/768/1440: 9 routes × 3 widths (27 route checks), h1,
  loaded/dimensioned images, no horizontal overflow, no page errors,
  explicit localFAQ, dialog question/answer/Escape, actual PDF download.
- Mobile menu keyboard focus trapped/restored, usable dialog within390×844.
- Production Node/nginx/Valkey images built and actual same-origin runtime checked.
- Existing ara/Lily ports3000/5273 unchanged; original repository sources not edited.

## Public media

Original UI components are rendered with synthetic content; outside frames and
query/auth/collaboration boundaries are local fixtures. `docs/media.md` records the
precise sources and what each capture proves. Photos/videos are not evidence of
commercial launch, real AI execution, current student usage or live collaboration.
Portrait source was selected by user; EXIF/GPS stripped. No private product source,
real company/customer/student data, live accounts or licensed music copied.

## Limits

These tests do not claim actual paid AI-provider integration or production deployment.
AI requires explicit server-only key/model/origin and budget opt-in; no key means
truthful local public-content FAQ. Mock vendor tests establish protocol/error paths,
not the configured vendor's model availability. Runtime behind an ingress currently
shares conservative peer quota; global/day limits apply separately.

Screenshots and DOM/pixel/face geometry are recorded, but direct image-view tools were
unavailable and drive preview transfer hit a device-server URL validation error.
The user should visually review the local preview before approving deployment.
GitHub remote CI status and real Dokploy domain/TLS/network transformation are
separate checks, not inferred from local build success.

Test logs/captures live outside tracked content in `/tmp/jeamxn-renewal` and ignored
`test-results/`. No API keys, raw interview or undecided private career information
are used in either public content or the assistant knowledge.

## Remote CI correction

The first GitHub verification run built and typechecked successfully but linted
Turbo's generated `.turbo/cache/*-meta.json` files. In a worktree Turbo used its
shared cache outside this root, so the local lint did not see that generated data.
Explicit `!**/.turbo` exclusion now prevents linting generated cache in either
checkout topology. Reproduced locally with deliberately unformatted cache JSON;
source lint remains strict. Remote run is rechecked after the corrective commit.

## Content and capture revision after user review

User rejected thin PFCT/ara/Dipull stories and unnatural assembled captures.
This revision does not treat technical browser success as editorial or visual approval.

- Re-read the90-answer interview and original company/ara/Dipull work evidence.
- PFCT8, ara7 and Dipull5 long-form case sections, with real context, contribution,
  design decisions and collaboration boundaries, rather than credential-sized descriptions.
- Actual KT SAT presentation PDF text read locally (130 and175-page exports).
  New6-section talk story covers the speaker's judgment/leadership view, instruction,
  Skill/Tool workflow and verification/security; original private slides not published.
- Shared core schemas retain each complete paragraph for web and grounded FAQ.
  The PDF stays a concise3-page projection with PFCT work and a real talk summary.
- Replace fabricated outer ara chrome/partial-component arrangement and Dipull three-phone
  montage with the complete original applications in isolated synthetic-data environments.
- New captures1440×900 for full app views,390×844 for natural mobile routes.
  Cover/gallery use actual dimensions and no forced crop; old video is removed.
- Direct paid vendor calls, main merge and Dokploy production deployment remain out of scope.

Private provenance and claim maps are kept in `/tmp/jeamxn-content-revision/`;
product capture setup stays outside the repository in `/tmp/jeamxn-media-v2/`.

Final revision2 local checks: build8/8, typecheck14/14, strict lint84files,
51boundary sources. Core4 and web6 tests pass. Dedicated empty Valkey run
passes server16/16 including the new thought/topic FAQ paths and two-replica
quota. Actual rebuilt Compose preview passes30route checks and12deep-story
checks at390/768/1440. Three-page Korean PDF is70,391B and includes PFCT
contribution and talk content/links. Mounted hidden Dipull modal controls
have effective opacity0; development controls are removed in the isolated
capture copy. The canvas's actual pane-close button leaves its native52px
strip and no empty greeting panel. No forced image crop.

## Revision3: visible broken montage and screenshot navigation

The user supplied a visibly broken old Dipull1440×1000 montage. Reproduced the
original temporary capture environment independently: its `.phone-content > div`
height100% rule unintentionally sized the navigation fragment's absolutely
positioned menu to790px. The selected96px-wide white marker became774px tall,
covering the screen at x142/616/1090; the menu also centered halfway up the frame.
This is a real rendering defect, not subjective taste or a browser-console error.
The complete original application layout does not apply that override.

Separately, reused `/images/dipull-preview.webp` was served max-age3600. Actual
Chromium reproduces the old1000px image remaining cached after the server changes
to900px while HTML reloads. A changed filename selects the new image correctly.
New media is addressed by SHA-256 content-hash filenames; legacy URLs revalidate.
`verify-media.mjs` verifies image bytes, hash URLs and actual WebP dimensions.
`verify-media-cache.mjs` prevents a same-URL replacement regression. These establish
reproducible mechanisms, not direct access to the user's personal browser cache.

The product gallery selects individual original app screens; screenshots are not
collaged, stretched or embedded as live product CSS. Thumbnails, large viewing,
previous/next and keyboard/Escape navigation are tested in actual browsers.

## Revision4: all reviewed work records and punctuation

The personal107-source catalog is accounted for exactly once:79 source entries
become new records,6 map to existing projects,1 merges into a new record,21 are
excluded with explicit private reasons. One historical avatar prototype is added
separately after reading its original HTML/document. This yields80 additional
records,86 total—not86 launched products. Company/ara85canonical work groups and
120original source refs are also accounted for exactly once;80 groups are mapped
into existing/new/experimental prose and5 withheld for uncertain purpose, private
security detail or another developer's implementation. Private audit files are
not included in the public repo or AI data.

Public strings use ASCII apostrophes and spaced slashes instead of smart single
quotes/middle dots. `verify-copy.mjs` checks the resulting shared data. All86records
have unique slugs, truthful role/status metadata and actual detailed pages. The
archive supports URL-preserving search, independent collection/type filters,
sorting, empty states and clear actions. Static prerender and sitemap routes use
the same shared portfolio. PDF remains3pages with a full archive link; only the
selected resume records appear as short summaries.

Actual rebuilt local production Compose passed91routes ×390/768/1440 =273route
checks;86archive detail checks with static-title/metadata/anchors;12primary long
story checks;6gallery scenarios covering all15image selections and expanded
views;byte/SHA/native-WebP geometry and cached-old→newURL regression. Image
captions, type/status disclaimers and role boundaries remain public. Synthetic
capture UI, source provenance, visual-check limitations are documented in media.
No console/no-overflow check is substituted for direct human aesthetic approval.

The frozen non-paid server run passed23cases and skipped1actual-Valkey case
without dedicated configuration; a final dedicated empty Valkey run passed24/24,
including the new actual Nest-topic case and atomic quota across two Nest replicas.
Core6 and web13 tests passed at that revision, with build8/typecheck14/strictlint102
files and59boundary sources. Representative/rotation revision5 adds further tests;
final CI and frozen-byte checks are parent steps.

## Revision5: four representatives and five-second other-work rotation

The home has four adjacent first-class representative entries, in order:
ara / Dipull / PFCT / KT SAT. KT SAT remains an Activity with its actual lecture
route, not an invented app. PFCT and the lecture use original case excerpts,
not fake screenshots. Shared representative flags also reach the PDF and public
FAQ; PDF avoids duplicating PFCT and keeps its3-page summary.

All83nonrepresentative records rotate in28batches of3records (last batch2), with
one five-second timer and400ms opacity/16px vertical animation. A single inert
measuring row reserves the maximum height across real names and summaries;
records are not clipped or rendered as83hidden links. Visible pause/start and
previous/next controls work; pointer hover, keyboard focus, offscreen section
and hidden document stop timing. Manual navigation stays paused. Motion-reduced
visitors use manual navigation without animation or autoplay. Touch input does
not leave a simulated hover pause. Unmount clears timer/listeners/observers.

Actual Chrome verified4900ms unchanged /5000ms advanced, CSS animation frames,
hover/focus pause, native Enter links, manual sticky pause, offscreen pause,
and every83record across28batches at390/768/1440px without overflow or clipping.
A separate real wall-clock run advanced at5003ms. Document visibility was tested
with an explicit visibilityState mock exercising the real event handler; this
is not claimed as an actual background-tab measurement. Final Compose/CI uses
the standard QA_BASE_URL and installed Playwright Chromium, not a local Chrome
channel. Screenshot evidence is technical; final human visual review remains.

Frozen revision5 integration results on2026-10-12:
- build8 / typecheck14 / strict lint106files and61boundary sources passed
- core7 / web16 / actual isolated-Valkey server25tests passed
- rebuilt production Compose: all3containers healthy on localhost5412
-91public routes at390/768/1440px:273browser route checks passed
-86detail static/metadata/anchor/archive checks and15screen/6gallery scenarios passed
- home four-entry order /83records in28batches / real5000ms advance /400ms frame /
  stable heights / pause / keyboard / reduced-motion manual sweep passed
- shared API data matches frozen core exactly; PDF3pages and representative labels passed
- byte-versioned media URLs and old-cache/newURL transition passed

CI executes these regressions with no real paid AI key. Local native-browser
screenshots and technical timings do not constitute the user's final visual
approval or deployment approval. Main and the live website were not changed.
