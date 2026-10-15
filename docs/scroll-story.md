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
