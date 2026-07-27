---
phase: 11-flagship-discovery-release
plan: 02
subsystem: ui
tags: [react, testing-library, jest, guides-hub]

# Dependency graph
requires:
  - phase: 11-flagship-discovery-release (Plan 00)
    provides: /guides/german-education-system route with production title/H1 copy for the flagship hub CTA to link to
  - phase: 11-flagship-discovery-release (Plan 01)
    provides: Established primary/secondary card-chrome swap pattern reused here for the hub cards
provides:
  - GuidesHub "Entenda o sistema" section stacks the onboarding flagship card (primary chrome) above the retitled Berlin card (secondary chrome)
  - Retitled Berlin hub card heading (Como funciona o sistema escolar público de Berlim, D-08) with unchanged CTA label
  - D-06 first-steps checklist body copy ("Quando estiver pronto para agir...")
affects: [11-03-plan]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "GuidesHub reuses the same primary/secondary article chrome pair already established in HomeJourneyCards (border-l-primary + filled Button vs bg-neutral-50 + outline Button), just stacked twice within one section"

key-files:
  created: []
  modified:
    - src/features/guides/GuidesHub/index.tsx
    - src/features/guides/GuidesHub/index.test.tsx
    - src/app/guides/page.test.tsx

key-decisions:
  - "Kept the Berlin CTA accessible name exactly 'Ler guia do sistema escolar' (unchanged) while giving the new flagship CTA the distinct name 'Ler guia do sistema educacional' to avoid getByRole name collisions in existing/new tests"
  - "Did not touch src/app/guides/page.tsx shell — only GuidesHub and its two test files, per the plan's interface boundary"

patterns-established: []

requirements-completed: [DISC-02]

# Metrics
duration: 5min
completed: 2026-07-25
---

# Phase 11 Plan 02: Guides Hub Flagship Stack Summary

**GuidesHub's "Entenda o sistema" section now stacks the onboarding flagship card (primary chrome, links to `/guides/german-education-system`) above the retitled Berlin public-school card (secondary chrome, D-08 heading), with D-06 role copy on all three hub cards.**

## Performance

- **Duration:** 5 min
- **Tasks:** 2 completed
- **Files modified:** 3

## Accomplishments
- `/guides` hub now presents the onboarding guide as the flagship entry point under "Entenda o sistema," reading Germany-first → Berlin-in-practice (DISC-02)
- Berlin hub card retitled to `Como funciona o sistema escolar público de Berlim` (D-08) and demoted to secondary chrome, with its CTA label (`Ler guia do sistema escolar`) left untouched to protect existing test/smoke assertions
- First-steps checklist card body updated to the D-06 "when-ready" role copy
- Unit and page-level tests extended to lock in flagship-above-Berlin stacking, distinct CTA accessible names, and the new body copy

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend GuidesHub and guides page tests for flagship card** - `8d205ff` (test)
2. **Task 2: Implement GuidesHub flagship stack and D-06/D-08 hub copy** - `c0f38aa` (feat)

## Files Created/Modified
- `src/features/guides/GuidesHub/index.tsx` - Added the onboarding flagship `<article>` (primary chrome, `Ler guia do sistema educacional` → `/guides/german-education-system`) above the Berlin `<article>`; demoted Berlin to secondary chrome and retitled its heading; updated first-steps body text
- `src/features/guides/GuidesHub/index.test.tsx` - Added assertions for the flagship link/href, the flagship-above-Berlin chrome stacking, and the D-06 first-steps body copy; kept the existing Berlin/first-steps link assertions
- `src/app/guides/page.test.tsx` - Added a page-level assertion for the flagship link while keeping the existing Berlin CTA assertion

## Decisions Made
- Followed the UI-SPEC Component Contract for `GuidesHub` verbatim: same `<section>` wrappers, same class strings reused from `HomeJourneyCards`' primary/secondary chrome pair, no new section-level structure or third card
- Verified the `border-l-primary` class appears exactly once in the file (on the flagship article only) via `rg -c`, matching the plan's acceptance criteria

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. `pnpm test -- --testPathPattern=...` remains incompatible with this repo's Jest v30 CLI (documented in the 11-01 summary); used `npx jest --testPathPatterns=...` for verification instead, with no production impact.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The `e2e/smoke.spec.ts` "navigates to guides hub and system guide via header nav" test still passes conceptually — the Berlin CTA label and Berlin H1 text it asserts are unchanged/already-retitled, and adding a second hub link doesn't create a name collision.
- Plan 03 can proceed with the Berlin guide page's own H1/metadata retitle and `GuideIntro` complementary copy — this plan already retitled the *hub card* heading only, not the Berlin guide page itself.
- Full unit suite (292 tests / 62 suites) green after this plan; `pnpm lint` and `pnpm typecheck` clean (no new warnings/errors introduced).

## Self-Check: PASSED

- FOUND: `src/features/guides/GuidesHub/index.tsx` contains `Ler guia do sistema educacional` (line 25), `Ler guia do sistema escolar` (line 40), `Como funciona o sistema escolar público de Berlim` (line 32), `Comece aqui. Entenda como funciona` (line 20), `Quando estiver pronto para agir, siga o checklist prático.` (line 56), and exactly one `border-l-primary` occurrence
- FOUND: commit `8d205ff` (test(11-02): extend GuidesHub and guides page tests for flagship card)
- FOUND: commit `c0f38aa` (feat(11-02): stack onboarding flagship card above retitled Berlin card)
- FOUND: full unit suite green — 62 test suites / 292 tests passed after both commits; `pnpm lint` (0 errors, pre-existing warnings only) and `pnpm typecheck` clean

---
*Phase: 11-flagship-discovery-release*
*Completed: 2026-07-25*
