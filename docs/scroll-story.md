# Scroll-linked opening story

## Source and visual decision

The 2026-10-15 opening follows the *mechanism* of Apple's actual AirPods Pro page, not its assets or copy. Reviewed downloaded HTML and prettified CSS/JS: `.section-audio-performance .sticky-container` supplies native document runway; `.sticky-element` pins; `VideoScrub` creates a scroll group and maps anchor keyframes into progress. Apple's enhanced/no-enhanced distinction keeps a readable fallback. No Apple source, image, font or video is shipped here.

Keep the existing fog `#f7f8fa`, paper `#ffffff`, ink `#20262b`, slate `#627079`, cobalt `#2459d3`, mist `#dfe6eb`, Wanted Sans and Geist. Spend the visual emphasis on a real person becoming real products: uncropped portrait with name below, original Dipull mobile capture, public PFCT typography and three concrete work areas, original ara canvas capture. These are asymmetric two-column compositions, not a stack of generic feature cards. Mobile composes copy above the image. PFCT deliberately has no fabricated company screenshot. All prose draws from already curated core profile/project/activity content; captures preserve their original virtual-data captions. Existing four representatives, 83-item/3-second rotation, 86 archive records, 15-screen gallery, PDF and FAQ remain unchanged.

## Geometry and direct manipulation

Initial markup is always four normal-flow sections. After hydration only an eligible viewport with no motion-reduction preference opts into `data-enhanced=true`. Desktop runway is 440svh; mobile is 320svh. Sticky frame is `100svh - headerHeight` (108px desktop, 90px tablet, 84px mobile, matching the normal-flow global header), so critical content and controls fit on the initial viewport. Once the ordinary header scrolls away, the shorter frame leaves deliberate breathing room rather than becoming another fixed global header.

`progress = clamp(-sectionRect.top / (sectionRect.height - frameHeight))`. The exact pin-range denominator is shared by chapter navigation, including the final anchor. At release the last scene remains visible and the document naturally continues into `#work`. No wheel interception, scroll snapping, smooth-scroll engine, new dependency or animation clock is used. Each scene's pose is a pure function of progress; opacity crossfades have complementary weights and dwell around their anchors. Reversing the scroll immediately retraces the same transform. Scale varies only 2.5%, translation at most 28px.

One passive document scroll listener schedules at most one rAF. A paint reads section geometry once then writes poses. Frame height is cached and refreshed on viewport/frame resize. React state changes only when the active scene boundary changes. No idle rAF loop, timer or entry-trigger animation is involved. Listeners, resize observer and pending frame are removed on mode change/unmount.

## Escape, readability and focus

Chapter buttons, `움직임 없이 보기` and `대표 작업 바로 보기` live outside moving panels and remain keyboard focusable throughout. Scene panels contain no interactive descendants, so toggling `inert`/`aria-hidden` cannot strand focused controls. Only the current scene is exposed in enhanced mode; the explicit static-reading control exposes all narrative at once. There is no live-announcement spam during scroll. The skip link preserves a normal hash-link fallback; enhanced clicks update the hash and scroll instantly despite the existing global smooth-scroll rule, then place keyboard focus on the representative section. Modified clicks retain native link behavior.

No JavaScript, reduced motion, desktop heights below 620px, mobile heights below 740px, and short landscape layouts receive complete normal-flow content. Media-query changes update enhancement without a page reload. No absolutely positioned narrative is emitted from SSR; the first client render is identical. CSS also removes pinning and transforms immediately for reduced motion while the preference listener catches up.

## Verification boundary

`apps/web/test/scroll-story.test.mjs`: twelve pure mapping/boundary/reverse/complementary-opacity tests plus five SSR/content/control tests. Parent session owns full browser motion/keyboard/no-JS/Chrome/WebKit/mobile/production-build verification and preview. Unit or type success is not visual approval. No merge or deploy is included in this change.

## Sentence-level story (owner correction 2026-10-18 23:16)

The homepage is not five summary cards anymore. `packages/core/src/home-story.ts`
is the short factual narrative:20beats, grouped intro1 / Dipull5 / Internal5 /
AX4 / ara5. Each non-intro beat is one complete sentence, revealed directly by
native document scroll. Situation → inconvenience → concrete work → resulting
flow is the order within chapters. Do not insert inferred motives from the
separately labelled case-study drafts into these factual beats.

`STORY_BEATS`, chapter anchors, active chapter, exact sentence, chapter-local
progress and model reveal lists are all derived from this source. Navigation
jumps to a chapter's first sentence; reading-mode toggling preserves the exact
sentence and restores focus. Static/reduced/no-JS exposes every sentence in
normal flow. No wheel interception, scroll lock or autoplay clock. The runway
is100svh +19×62svh, not20screens that each summarize an entire project.

Model visibility follows each sentence's explicit model IDs. The campus begins
alone; music/laundry appear when their inconvenience is mentioned; the agent
hub appears when ara's integration is introduced. Reversal must reproduce exact
same transforms and visible IDs. Same-model nearby-scroll rotation/Z and the
cost of all sentence/chapter crossfades are separate assertions from set swaps.

## Guided greeting, product screens and conclusions (2026-10-19 01:01)

The owner's greeting follows the original headline as separate beats:
“안녕하세요? 최재민입니다!” → “저는 서비스로 더 많은 사람들을 행복하게
만들어주고 싶어요.” → “저의 이야기를 한 번 들어볼래요?”
The factual school background now includes the owner's DB-ransomware account;
no attack date, culprit, vulnerability or security outcome was inferred.

There are36beats: intro4 / Dipull9 / Internal7 / AX7 / ara9. Stable beat IDs
are distinct from display text. Optional `note`, `hero`, `screen`, and `link`
fields share the narration data. Dipull shows wakeup/laundry/stay-seats/home;
ara shows chat/documents/canvas/canvas-timeline. These are existing complete
original-app viewports with synthetic data, NOT archival real student/company
records. Keep visible captions/alt/versioned image paths and full image ratio.
Actual private company screenshots are not available for publication, so both
PFCT chapters retain meaningful 3D rather than fabricated company UI.

Each non-intro conclusion has its own real detail anchor. Only the active beat's
link is interactive/focusable; inactive beat wrappers are inert, including links
within an otherwise active chapter. Mouse/keyboard reachability and exact
route+hash must be checked, not merely href strings or visual opacity.
3D disappears on product-screen beats so it does not cover the screenshot.
Static mode must put the screenshot after the sentence it explains. Errors that
happen before hydration need the completed-image/naturalWidth check too.

`story-narrative-browser.mjs` checks all8viewports and4real clicks in Chromium
andWebKit at390/768/1440, visible synthetic captions, uncropped native ratio,
text/media separation, static ordering and forced image-failure fallback.
The pointer and standard scroll-story/3D suites remain separate regressions.

## Reading pace, breathing lines and decorative motion (2026-10-19 01:22 / 01:28)

This supersedes the original62svh/idle0 opening contract. The owner explicitly
requested more reading time and gentle icon motion while text stays put.
Each beat now occupies115svh and remains fully opaque/still for80% of that
interval (~92svh, about3.4× the old fully readable distance). At most one text
beat paints at any scroll position; the old overlapping crossfade is no longer
allowed. Artwork blend weights are independent from the sequential text fade.

`lines` carries explicit editorial breathing points, with `lines.join(' ')`
equal to the factual sentence. Rendering uses real newlines with pre-line;
the greeting and invitation must remain exactly two intended lines where they
fit. Normal line wrapping remains available to prevent narrow-screen clipping.

Native scroll is not intercepted or locked. A90ms exponential visual-progress
catch-up smooths small real wheel/touch/keyboard gestures and settles exactly;
large direct chapter jumps and anchors stay exact. Catch-up finishing is not
automatic story playback: the target never moves without scroll. QA waits for
that finite catch-up before asserting stable idle text/scroll/beat.

Decorative3D has bounded8–14second loops, Y±.12/X±.04 world units, rx±.03/ry±.09/rz±.025,
at most60fps (raised from20fps on 2026-10-19 so the float never strobes). It does not alter base scroll poses or story progress. Both base
and actual animated poses are observable separately. Render loops stop on
hidden/offscreen/reduced-motion/context loss/no-model screenshot beats/dispose.
Static reading also disposes3D. This is the owner's explicit change from idle0,
not permission to auto-advance text or animate screenshots.

### Scroll-driven line reveals (2026-10-19 01:33)

Each editorial line has its own `storyLinePose(progress,beat,line,count)`.
Lines enter in order during the beginning of a beat, with fade and14px upward
settling (2026-10-19: decelerating 22px rise plus a blur-to-focus of at most
7px while faint; fully read lines carry no blur). No per-line playback timer or CSS stagger clock. At the beat anchor
all lines are fully present, and they remain so for reading. Reverse scroll
restores exact line transforms. The complete paragraph still exists in static,
no-JS and reduced-motion modes; the actual line breaks are editorial data.

Public prose preserves a single space on both sides of middle dots. The shared
normalizer no longer converts them to slashes. Snapshot ingestion keeps earlier
sources intact while adding this owner correction and the latest HOME_STORY.

## AI WAF observation case (2026-10-19 02:50)

The owner identified the Monitoring product as the AI WAF observation system.
It is an independent PFCT case at `/work/pfct#ai-waf-monitoring`, also linked
from the homepage's PFCT case list. The AX chapter adds6beats (42overall,
5chapters/5conclusion links); it does not invent a new company/job period.
Existing115svh reading pace, editorial line reveals, finite90ms catch-up,
no-overlap text and decorative20fps motion remain unchanged.

WAF narration uses fresh `waf-radar` / `waf-shield` / `waf-events` models appended
to AX. Only those3are visible at its conclusion, while Lily's5models are hidden.
These are original procedural explanatory objects, NOT screenshots of actual
company systems. Do not put internal endpoints, IPs, thresholds, accounts,
tokens or raw operational logs in public content or images.

The existing collection/rule detection/platform and initial UI are colleagues'
foundations. The owner's evidenced extensions include app-log evidence and
operational signals, read-only tool investigation, alert detail and sound/UI,
large-log aggregation and shared tool access. IP blocking is a colleague's
implementation; the owner's contribution there is safety review. Do not claim
single-person authorship, measured accuracy/MTTR, fully autonomous mitigation,
or the old tool-call/time limits as current behavior.

## Natural motion and 3D polish (2026-10-19 13:00)

The owner asked for the homepage animation and 3D models to feel more natural
and polished. Measured before the change: every model appeared by scaling from
nothing (smallest visible scale .016) with no positional travel, idle motion ran
at19fps, and model pixels averaged luminance225/σ20 (washed-out pastel).

- Arrivals/departures: `chapterObjectPose` now returns `opacity`; `modelSide`
  says whether the reader is before (-1) or after (+1) the nearest beat showing a
  model. Arrivals rise from below and turn into place, departures drift up and
  back (ease-out cubic). Scale only settles from80%. Everything stays a pure
  function of progress, so reverse scroll is exact
- Renderer: each model owns cloned materials for an independent fade (originals
  are disposed); connection lines fade with the weaker end
- Look: long-lens perspective camera (layout plane still exactly12 units high),
  RoomEnvironment PMREM reflections, lower ambient, cool rim light, AgX tone
  mapping, satin roughness ≤.58, stronger contact shadow, 2048 shadow map
- Pointer parallax (mouse + fine pointer only, not reduced motion): the shared
  rig tilts at most ~4° with a critically damped follow; base model poses and
  `threePose` observations are untouched
- Smoother curved surfaces (more rounded-box/cylinder/sphere/torus/tube/bevel
  segments). Browser peak stays ~109 draws / ~77k triangles including shadows
- Sentences blur ≤5px while fading; the 80% dwell and no-overlap contract are unchanged
