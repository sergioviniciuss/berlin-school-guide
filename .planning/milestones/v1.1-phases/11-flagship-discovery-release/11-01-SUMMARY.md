---
phase: 11-flagship-discovery-release
plan: 01
subsystem: ui
tags: [react, testing-library, jest, homepage]

# Dependency graph
requires:
  - phase: 11-flagship-discovery-release (Plan 00)
    provides: RED smoke coverage for homepage → onboarding CTA journey, awaiting this plan's UI
provides:
  - Two-card HomeJourneyCards with onboarding guide as the primary "Comece por aqui" entry point
  - Greened homepage → onboarding smoke test precondition (production CTA now exists)
affects: [11-02-plan, 11-03-plan]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "HomeJourneyCards primary/secondary card chrome reassigned in place (same two class strings, swapped card)"

key-files:
  created: []
  modified:
    - src/features/home/HomeJourneyCards/index.tsx
    - src/features/home/HomeJourneyCards/index.test.tsx
    - src/app/page.test.tsx

key-decisions:
  - "Removed the guides-hub and methodology homepage cards entirely (not hidden) per D-03; they remain discoverable via SiteHeader nav"
  - "Kept the exact UI-SPEC copy and Tailwind classes verbatim rather than introducing any new variant"

patterns-established: []

requirements-completed: [DISC-01]

# Metrics
duration: 6min
completed: 2026-07-25
---

# Phase 11 Plan 01: Two-Card Start Here Hierarchy Summary

**Restructured `HomeJourneyCards` from three cards to exactly two — "Comece por aqui" (primary, linking to the onboarding guide) and "Explorar escolas" (secondary, linking to the school directory) — making the onboarding guide the homepage's default entry point for new families.**

## Performance

- **Duration:** 6 min
- **Tasks:** 2 completed
- **Files modified:** 3

## Accomplishments
- Homepage now leads with "Comece por aqui" → `/guides/german-education-system` as the primary, visually accented CTA (DISC-01)
- School directory demoted to secondary "Explorar escolas" CTA, still highly visible with outline chrome
- Guides hub and methodology homepage cards removed entirely (still reachable via nav)
- Unit and page-level tests rewritten to lock in the two-card contract and the absence of retired CTAs
- Full unit suite (290 tests across 62 suites) passes with no regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite HomeJourneyCards unit tests for two-card Start here hierarchy** - `c75099a` (test)
2. **Task 2: Implement two-card HomeJourneyCards per UI-SPEC** - `74c72a5` (feat)

## Files Created/Modified
- `src/features/home/HomeJourneyCards/index.tsx` - Replaced three-card journey with two cards; primary chrome moved to the new onboarding "Comece por aqui" card, secondary chrome kept on "Explorar escolas"
- `src/features/home/HomeJourneyCards/index.test.tsx` - Rewritten to assert exactly 2 `<article>`s, the new headings/links, accent-class placement, and absence of the retired guides/methodology CTAs
- `src/app/page.test.tsx` - Updated journey-CTA assertion to expect `Começar pelo guia do sistema` → `/guides/german-education-system` and `Ver escolas em Lichtenberg` → `/schools`; removed guides/methodology expectations

## Decisions Made
- Followed the UI-SPEC markup verbatim (D-01–D-04): DOM order is onboarding card first, schools card second; no icons, badges, or third card added
- Did not touch `src/app/page.tsx` composition (already renders `<HomeJourneyCards />` as-is) or `SiteHeader`/`SiteFooter`, per the plan's explicit interface boundary

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

Initial local test invocations using `pnpm test -- --testPathPattern=...` were misinterpreted by this Jest version (v30, which renamed the CLI flag to `--testPathPatterns` and does not accept `--no-coverage` as a boolean negation) — resolved by running `npx jest --testPathPatterns=... ` directly for verification. No production code was affected; this was purely a local verification tooling quirk, documented here for future executor runs in this repo.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The `e2e/smoke.spec.ts` test "navigates from homepage to onboarding guide via start-here CTA" (added in Plan 00) now has its required production CTA (`Começar pelo guia do sistema` → `/guides/german-education-system`) and should green when the e2e suite is next run.
- Plan 02/03 can proceed with `GuidesHub` flagship reordering and Berlin retitle; homepage journey is now stable at exactly two cards per D-03.

## Self-Check: PASSED

- FOUND: `src/features/home/HomeJourneyCards/index.tsx` contains exactly one `border-l-primary` article (the "Comece por aqui" card) and no `/guides` or `/methodology` hrefs
- FOUND: commit `c75099a` (test(11-01): rewrite HomeJourneyCards and page tests for two-card Start here contract)
- FOUND: commit `74c72a5` (feat(11-01): restructure HomeJourneyCards to two-card Start here hierarchy)
- FOUND: full unit suite green — 62 test suites / 290 tests passed after both commits

---
*Phase: 11-flagship-discovery-release*
*Completed: 2026-07-25*
