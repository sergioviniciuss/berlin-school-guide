---
phase: 11-flagship-discovery-release
plan: 00
subsystem: testing
tags: [playwright, e2e, a11y, seo-metadata, tdd]

# Dependency graph
requires:
  - phase: 10-education-pathway-editorial
    provides: /guides/german-education-system onboarding page with production title/H1 copy
provides:
  - Onboarding route locked into CORE_ROUTES (metadata.spec.ts) and CORE_A11Y_ROUTES (a11y.spec.ts)
  - RED smoke coverage for homepage → onboarding CTA journey, awaiting Plan 01 UI
  - RED smoke coverage for D-08 Berlin H1 retitle, awaiting Plan 03 UI
affects: [11-01-plan, 11-03-plan]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Wave 0 Nyquist scaffolds: e2e route arrays and smoke assertions written ahead of production UI changes, intentionally RED until the plans that ship the UI land"

key-files:
  created: []
  modified:
    - e2e/metadata.spec.ts
    - e2e/a11y.spec.ts
    - e2e/smoke.spec.ts

key-decisions:
  - "Homepage-to-guides-hub smoke test fully replaced (not kept alongside) by homepage-to-onboarding smoke test per D-03"
  - "Berlin header-nav smoke test keeps the Ler guia do sistema escolar click and /guides/berlin-school-system URL assertion; only the H1 string changes to the D-08 retitle"

patterns-established: []

requirements-completed: [REL-01, REL-02, REL-03]

# Metrics
duration: 4min
completed: 2026-07-25
---

# Phase 11 Plan 00: Wave 0 E2E Scaffolds Summary

**Extended Playwright metadata/a11y route arrays for the onboarding guide and rewrote the homepage smoke journey to target onboarding, with two assertions intentionally RED until Plans 01 and 03 ship the corresponding UI.**

## Performance

- **Duration:** 4 min
- **Tasks:** 2 completed
- **Files modified:** 3

## Accomplishments
- `/guides/german-education-system` now covered by the metadata SEO suite (title/canonical/OG/Twitter tags) — REL-01
- `/guides/german-education-system` now covered by the axe accessibility suite — REL-02
- New smoke test encodes the primary homepage journey as homepage → onboarding guide via the `Começar pelo guia do sistema` CTA — REL-03
- Obsolete `Ver guias para famílias` smoke assertion removed (route/CTA is being retired per D-03)
- Berlin header-nav smoke test updated to expect the D-08 retitled H1 (`Como funciona o sistema escolar público de Berlim`)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add onboarding to metadata and a11y CORE route arrays** - `a37eb79` (test)
2. **Task 2: Rewrite smoke for homepage → onboarding and D-08 Berlin H1** - `102e7f7` (test)

_Note: Task 2 is a TDD scaffold-only task by design — the RED test is committed without a corresponding GREEN implementation commit, since the plan explicitly defers the homepage CTA (Plan 01) and Berlin retitle (Plan 03) to later plans in this phase._

## Files Created/Modified
- `e2e/metadata.spec.ts` - Added `/guides/german-education-system` to `CORE_ROUTES` with a title regex matching both the metadata title and the page H1
- `e2e/a11y.spec.ts` - Added `/guides/german-education-system` to `CORE_A11Y_ROUTES` after the Berlin route
- `e2e/smoke.spec.ts` - Replaced the homepage→guides-hub test with a homepage→onboarding-guide test; updated the Berlin header-nav H1 assertion to the D-08 string

## Decisions Made
- Kept the metadata title regex as specified in the plan (`/Sistema educacional alemão|Como funciona o sistema educacional/i`) — verified it matches both the current page's `<title>` metadata (`Sistema educacional alemão`) and its H1 (`Como funciona o sistema educacional na Alemanha`), so this assertion is GREEN today, unlike the two smoke assertions.
- No production code touched in this plan, per the plan's explicit scope boundary ("Do not implement production UI in this plan").

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Confirmed via source inspection that:
- `src/app/page.tsx` does not yet render a `Começar pelo guia do sistema` link (homepage CTA lands in Plan 01), so the new onboarding smoke test is RED as expected.
- `src/app/guides/berlin-school-system/page.tsx` still renders the old H1 `Como funciona a escola primária em Berlim` (D-08 retitle lands in Plan 03), so the updated Berlin H1 assertion is RED as expected.

This matches the plan's stated expectation: "some smoke assertions stay RED until Plans 01 and 03 green them."

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Plan 01 must add the `Começar pelo guia do sistema` CTA on the homepage linking to `/guides/german-education-system` to green the new smoke test.
- Plan 03 must retitle the Berlin guide H1 to `Como funciona o sistema escolar público de Berlim` to green the updated header-nav smoke assertion.
- Metadata and a11y suites are GREEN today against current production code — no follow-up needed for REL-01/REL-02.

## Self-Check: PASSED

- FOUND: e2e/metadata.spec.ts contains `/guides/german-education-system` (line 21) and the title regex (line 22)
- FOUND: e2e/a11y.spec.ts contains `/guides/german-education-system` (line 12) and retains `/guides/berlin-school-system` (line 11)
- FOUND: e2e/smoke.spec.ts contains `navigates from homepage to onboarding guide via start-here CTA` and no longer contains `Ver guias para famílias`
- FOUND: commit a37eb79 (test(11-00): add onboarding route to metadata and a11y suites)
- FOUND: commit 102e7f7 (test(11-00): rewrite smoke for homepage onboarding CTA and D-08 Berlin H1)

---
*Phase: 11-flagship-discovery-release*
*Completed: 2026-07-25*
