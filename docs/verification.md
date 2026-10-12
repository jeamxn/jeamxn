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
