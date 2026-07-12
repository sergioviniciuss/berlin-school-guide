---
phase: 03-homepage-navigation-core-journey
plan: 02
subsystem: ui
tags: [nextjs, react, tailwind, jest, rtl, homepage, journey-cards]

requires:
  - phase: 02-research-process-attribution
    provides: GuideIntro pattern and /methodology route
provides:
  - HomeJourneyCards component with primary/secondary journey CTAs
  - Expanded homepage landing with parent-facing hero and Lichtenberg scope note
affects:
  - 03-03-PLAN (e2e smoke update references new homepage journey)
  - Phase 8 release readiness

tech-stack:
  added: []
  patterns:
    - "Server component journey cards with Button asChild + Link CTAs"
    - "Thin page.tsx composition: GuideIntro + feature component + inline scope note"

key-files:
  created:
    - src/features/home/HomeJourneyCards/index.tsx
    - src/features/home/HomeJourneyCards/index.test.tsx
    - src/app/page.test.tsx
  modified:
    - src/app/page.tsx

key-decisions:
  - "Stacked vertical journey cards (primary full-width dominant, secondary lighter) per UI-SPEC D-03"
  - "Scope note as paragraph with font-medium label, not heading, per UI-SPEC a11y checklist"

patterns-established:
  - "HomeJourneyCards: card shell pattern from SchoolCard with left accent on primary card"
  - "Homepage main: mx-auto max-w-3xl space-y-12 px-6 py-12 (top-aligned, no min-h-screen centering)"

requirements-completed: [NAV-01, NAV-03]

duration: 12min
completed: 2026-07-11
---

# Phase 3 Plan 2: Homepage Landing — Journey Cards & Scope Note Summary

**Portuguese homepage landing with parent-facing hero, dominant directory journey card, secondary methodology card, and honest Lichtenberg scope note per UI-SPEC copy contract**

## Performance

- **Duration:** 12 min
- **Started:** 2026-07-11T16:35:00Z
- **Completed:** 2026-07-11T16:47:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- `HomeJourneyCards` server component with primary `/schools` and secondary `/methodology` CTAs using exact UI-SPEC copy
- Primary card visually dominant via `border-l-4 border-l-primary` left accent and larger padding
- Homepage expanded from minimal centered hero to top-aligned landing with distinct eyebrow/title (D-04)
- Lichtenberg scope note with "Cobertura inicial" label in neutral paragraph styling (D-02)
- No guides card or `/guides` links on homepage (D-06)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build HomeJourneyCards component with tests**
   - `b9d68c1` (test) — failing HomeJourneyCards tests
   - `de241d3` (feat) — HomeJourneyCards implementation
2. **Task 2: Expand homepage page.tsx with hero, cards, and scope note**
   - `b4c695c` (test) — homepage integration tests
   - `148b547` (feat) — expanded page.tsx composition

## Files Created/Modified

- `src/features/home/HomeJourneyCards/index.tsx` — Primary and secondary journey cards with hardcoded Link CTAs
- `src/features/home/HomeJourneyCards/index.test.tsx` — Unit tests for headings, hrefs, accent class, no guides
- `src/app/page.tsx` — Fuller landing page with metadata, GuideIntro hero, HomeJourneyCards, scope note
- `src/app/page.test.tsx` — Integration tests for hero, scope note, and journey CTAs

## Decisions Made

None — followed plan and UI-SPEC copy exactly as written.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

- `pnpm typecheck` fails due to pre-existing `SiteHeader/index.test.tsx` from parallel 03-01 work (missing implementation). Out of scope for 03-02; logged in `deferred-items.md`.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Homepage journey path to `/schools` and `/methodology` is wired for NAV-01/NAV-03
- Ready for 03-03 (shared header/footer, m2-smoke removal, e2e smoke update)
- E2e smoke can assert new hero h1 and "Ver escolas em Lichtenberg" CTA

## Self-Check: PASSED

- FOUND: src/features/home/HomeJourneyCards/index.tsx
- FOUND: src/features/home/HomeJourneyCards/index.test.tsx
- FOUND: src/app/page.test.tsx
- FOUND: src/app/page.tsx (modified)
- FOUND: b9d68c1
- FOUND: de241d3
- FOUND: b4c695c
- FOUND: 148b547

---
*Phase: 03-homepage-navigation-core-journey*
*Completed: 2026-07-11*
