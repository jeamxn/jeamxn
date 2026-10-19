# Public content boundary

`packages/core/src/portfolio.ts` is the curated public source of truth.
The web and build-time resume PDF consume this object. The response assistant
and FAQ runtime were removed at the owner's request on 2026-10-19.

Source: user-approved Surfit/current portfolio and the 2026-10-12 interview.
Raw interview answers, private comments, internal knowledge-base URLs,
customer identifiers, credentials and undecided career plans are NOT copied.

- Identity: a person who makes products, not a claim of mastering every stack.
- Featured: ara (lowercase) and Dipull.
- ara: two collaborators both contribute ideas, implementation and testing.
  Purpose idea by Jeamin; ara implementation by Park Sungmin.
  A two-person experiment, not a shipped B2B/security-certified product.
- Dipull: began as LeagueOfDimi, initially developed by Jeamin; later community
  contributions and junior handoff. Approximate daily 200 visitors is a
  historical Google Analytics self-report, not current usage.
- PFCT: internship/return chronology verified by user's interview. Shared
  work is not sole platform ownership. Real financial/security data excluded.
- YUN: family website, not paid consulting. Business registration not sales.
- Awards and participation are separate kinds; no invented outcomes.
- Email/GitHub are default public contact; phone omitted from anonymous site.
- Demo previews use synthetic data and explicitly state reconstructed fixtures.

The independent repository does not redistribute proprietary ara code.
Demo asset provenance is documented in media.md. Any unpublished information
must not be copied into the public website, PDF or build artifact.

## Owner's voice and resume projection (2026-10-18)

The owner now wants first-person conversational Korean 해요체, such as
"제가 쓰면서도 불편해서 직접 고쳐보려고 했어요!", rather than a report
ending every sentence in 했습니다. This supersedes the earlier 합니다체
preference. Read each sentence, retain its claims and uncertainty, use warm
exclamations sparingly, and avoid adding feelings, achievements or outcomes.
Source text is rewritten; no runtime suffix-conversion engine is used.

The same curated object still feeds the website and PDF. Metadata,
periods, project identity, collaborators, role/status boundaries and media
captions are not voice-conversion targets. Existing fabricated-data captions
remain neutral disclosures. Home still has four representatives and the full
archive still has 86 records. The resume's separate three-work projection is
`resumeProjects`: ara / PFCT / Dipull, descending by the first year in `period`.
It does not change homepage flags or delete any archive record. KT SAT remains
an activity, not an app. Unknown dates are never inferred from the end year.

### Confirmed voice reference (2026-10-18 19:21)

The owner supplied `이력서_최재민_261018.pdf` as the exact design and voice
reference. Prefer its restrained first-person 해요체: concrete inconvenience,
what was implemented, and what changed. Avoid adding excitement, motivation,
forced exclamation marks or formulaic reflection to every project. The public
heading is now the owner's supplied "행복한 개발자 | 기술보다 아이디어를";
the intro is "서비스로 더 많은 사람을 행복하게 만들고 싶은 개발자예요."
The canonical existing public email remains unchanged: a style request does not
silently publish the reference PDF's different personal contact details.
New quantitative claims in the attachment are not independent measurements and
are not automatically copied to every case study in a writing/style change.

### Whole-site UX writing, 2026-10-18 21:05

The owner explicitly extended the supplied resume's voice to the PDF prose and
all interface writing. Narrative now begins with a specific inconvenience,
then the owner's actual work and the resulting use flow. Buttons retain clear
action names; empty/error messages explain the current state and a next step.
Shared authorship, AI assistance, experimental/unadopted work and historical
measurement limits remain factual qualifiers, not repetitive self-defense.
Screenshot descriptions and synthetic-data captions follow the same 해요체;
`packages/core/asset/screens.json` is their editable source and
`scripts/version-media.mjs` regenerates `screens.ts` without changing image bytes.
PDF case blocks select the same reviewed public sentences; typography changes
to the web must not replace the corrected PDF full-font/shaped-CMap path.

### Commit-based review drafts, 2026-10-18 21:57

The owner corrected DPD attribution to Internal Squad. Keep that product/team
classification separate from the date of the first observed Git adoption; do
not move employment dates to manufacture a matching chronology. Internal work
is admin consolidation, permissions/security and DPD. AX work is Lily, MCP
connections to development/work tools and AI-use presentations. ara is an
integrated agent; Dipull is a school intranet, not only two individual features.

The owner explicitly requested inferred motivations as editable drafts.
`StorySection.draftThought` is optional and is rendered separately with
“생각 초안 · 커밋에서 추정” and a not-a-confirmed-statement explanation. It is
not a quotation or verified historical recollection. It must not enter the
factual PDF projection; the resume uses
confirmed work paragraphs rather than these hypotheses. The private commit
matrix stays outside public source; no internal URLs or implementation dumps.


### Personal/company narrative separation, 2026-10-18 23:15

Keep PFCT work and company-product references in the PFCT project and its
explicit career/biography paragraphs. Do not use Lily or other company work as
the background, comparison or claimed implementation of a personal project or
external activity. The ara origin examples requested by the owner are Hermes
Agent, Claude Code and Codex. Removing a cross-reference does not transfer work
from PFCT to ara: retain the actual implementation scope and shared authorship.
Confidentiality disclaimers remain, phrased without implying company use.


### Owner punctuation correction, 2026-10-19 01:09

Use exactly one ordinary space on both sides of a middle dot in public prose:
`기상송 · 세탁`. Do not change it to slash or leave it attached to adjacent words.
This applies to narration, detailed copy, captions and PDF. The shared
normalizer retains the middle dot and fixes its spacing; source literals follow
the same rule. Keep URLs, identifiers and code syntax unchanged.
