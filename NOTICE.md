# Attribution

This repository is an independent implementation of Jeamin Choi's personal portfolio.
It follows the folder/stack conventions of ara, not the private product implementation.
No proprietary source or the references' licensed typefaces are redistributed.

- Wanted Sans, by Wanted Lab: SIL Open Font License 1.1; the `wanted-sans` package.
- Geist, by Vercel: SIL Open Font License 1.1; the `@fontsource/geist` package.
- Pretendard static Regular/Bold, by orioncactus: SIL Open Font License 1.1.
  Complete PDF font faces and license are in `packages/resume-pdf/assets/fonts/`.
- The portrait was supplied and selected by its subject. Optimized copies omit
  metadata, not a third-party stock photo. The resume-only ID photo was supplied
  and selected on 2026-10-19; it replaces the prior PDF portrait without changing
  the homepage photo. No facial edit is performed by the site build.
- Product media: original authorized UI rendered with synthetic content in isolated
  fixtures. See `docs/media.md` for precise source, license and limitations. The
  screenshots do not depict private user records or production AI executions.

Third-party runtime/build libraries retain their respective licenses in installed
packages and are managed with a frozen pnpm lockfile.

## React Bits components

`apps/web/app/shared/reactbits/` holds all 219 components copied from [React Bits](https://reactbits.dev) (DavidHDev/react-bits @ 701a8ac, TS + Tailwind variants). Copyright (c) 2026 David Haz, MIT + Commons Clause: used here as part of this website, not redistributed as a component pack. The files are kept as upstream wrote them and are excluded from Biome; site-specific styling lives in `app.css` and `shared/bits/desk.css`, and the props each one is given live in `shared/bits/`. Each component is its own lazily loaded chunk (`shared/lib/bits.ts`), so a page only downloads the ones it shows.

This site makes no third-party requests and ships a strict Content-Security-Policy, so 23 files differ from upstream:

- Remote default images replaced with an inline 1px placeholder (real images are always passed as props): AccordionGallery, CardSwap, ChromaGrid, CircularCarousel, CircularGallery, DecayCard, DepthCarousel, DitherVeil, DomeGallery, DriftWall, FlexCarousel, HalftoneReveal, MorphSlider, RippleDistortion, Stack.
- Remote fonts and scripts removed: VariableProximity and TextPressure no longer import Roboto Flex from Google Fonts, CircularGallery has no default font URL, GridScan has no face-api.js CDN URLs (its face tracking is therefore off).
- Noise paints its grain tile as a `data:` URL instead of a `blob:` URL (`img-src 'self' data:`).
- TextPressure renders a `div` instead of a second `h1`, and takes a `fit` prop for typefaces wider than the compressed one it was written for.
- Type-only imports and a timer type, for this repository's TypeScript settings: AccordionGallery, DepthCarousel, DriftWall, PixelSwap, SplitFlapText, StrokeText, TextLoop.
