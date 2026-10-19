# Homepage (2026-10-19 redesign)

The owner asked for a homepage designed to the agent's own taste, free of the
previous look. The scroll-linked 3D story was not deleted: it moved intact to
`/story` (prerendered, linked from the homepage invitation). Its tests now load
`/story`; its skip link lands on that page's own `#work` exit section.

## Direction

Ballpoint ink on cool notebook paper. The subject is someone who keeps turning
people's inconveniences into products, starting in school, so the page is built
around that ledger instead of a hero stat block or a card grid.

| Token | Hex | Use |
| --- | --- | --- |
| paper | `#f3f5fa` | page background (cool, not cream) |
| ink | `#141a33` | text, pill, home footer |
| pen | `#2f49e0` | the strike line and product names only |
| muted | `#5b6282` | secondary copy |
| line | `#d6dbe9` | row rules |
| wash | `#e6eaf6` | image wells |

Noto Serif KR 500/600 for display and the ledger; Interlude/system sans for body.
Everything is left aligned; header and footer follow the same edge padding on `/`.

## Sections

1. Hero: the owner's own motto, `기술보다 아이디어를`, very large; one load-in rise
2. Ledger (`trouble-ledger.tsx`): six chronological rows, where / what was
   inconvenient / what was made, each linking to a real section. Scroll draws a
   ballpoint line through every line of the inconvenience (background-size with
   `box-decoration-break: clone`), then the product fades in. Pure function of
   position; reverse scroll undoes it. No JS or reduced motion: shown complete
3. Invitation to `/story` (the owner's own line `저의 이야기를 한 번 들어볼래요?`)
4. Selected work: ara, Dipull, PFCT, KT SAT with the existing test hooks
   (`.selected-work > .featured`, `featured--pfct home-company`, `#work`), then the
   existing rotating other-work list
5. Closing note, then the shared footer

Ledger facts come from HOME_STORY and the public PFCT/ara/Dipull sections.
`apps/web/test/home-ledger.test.mjs` checks every link target exists and every row
is complete in static HTML.
