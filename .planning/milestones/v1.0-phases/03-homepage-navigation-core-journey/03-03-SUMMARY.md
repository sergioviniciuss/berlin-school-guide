---
phase: 03-homepage-navigation-core-journey
plan: 03
subsystem: testing
tags: [playwright, e2e, nextjs, navigation, cleanup]

requires:
  - phase: 03-homepage-navigation-core-journey
    provides: SiteHeader/SiteFooter layout chrome and HomeJourneyCards homepage CTAs
provides:
  - m2-smoke legacy route fully removed from src/
  - E2E coverage for home → /schools via journey CTA and header nav
  - Verified directory methodology link preservation (D-15)
affects: [phase-04, e2e, navigation]

tech-stack:
  added: []
  patterns:
    - "E2E smoke tests assert homepage hero h1 and in-page navigation to /schools"
    - "Legacy M2 scaffolding removed; static build exports only /, /methodology, /schools"

key-files:
  created: []
  modified:
    - e2e/smoke.spec.ts

key-decisions:
  - "Removed m2-smoke route and MDX entirely per D-13 — no references remain under src/"
  - "E2E first test uses journey CTA; second test covers header Escolas nav per NAV-03"

patterns-established:
  - "Smoke e2e validates core navigation journey before directory filter assertions"

requirements-completed: [NAV-03]

duration: 4min
completed: 2026-07-11
---

# Phase 03 Plan 03: Legacy Cleanup & E2E Navigation Summary

**Removed stale m2-smoke scaffolding and rewrote Playwright smoke tests to cover homepage → /schools via journey CTA and header nav**

## Performance

- **Duration:** 4 min
- **Started:** 2026-07-11T16:38:00Z
- **Completed:** 2026-07-11T16:40:26Z
- **Tasks:** 3/3 completed
- **Files modified:** 3 (2 deleted, 1 rewritten)

## Accomplishments

- Deleted `/guides/m2-smoke` route and `m2-smoke.mdx` content with zero remaining `m2-smoke` references under `src/`
- Rewrote e2e smoke spec with journey CTA and header nav tests; preserved directory search/filter test
- Confirmed directory methodology link "Como funciona nossa pesquisa?" unchanged; unit test and static build pass

## Task Commits

Each task was committed atomically:

1. **Task 1: Delete m2-smoke route and MDX content** - `681c8ff` (feat)
2. **Task 2: Rewrite e2e smoke test for home → schools journey** - `5e38f0c` (feat)
3. **Task 3: Verify directory methodology link preserved and build clean** - verification only (no file changes)

## Files Created/Modified

- `src/app/guides/m2-smoke/page.tsx` - Deleted (legacy M2 scaffolding)
- `src/content/guides/m2-smoke.mdx` - Deleted (legacy MDX content)
- `e2e/smoke.spec.ts` - Home → schools navigation tests via CTA and header nav

## Decisions Made

None beyond plan — followed D-13, D-14, D-15 as specified.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- **`pnpm e2e` webServer conflict:** Default Playwright config could not start dev server on port 4310 because another Next.js dev server was already running (PID 77707 on port 3001). Workaround: ran tests with `reuseExistingServer: true` against port 3001; all 3 smoke tests passed.
- **Playwright browsers missing in sandbox:** Installed chromium via `pnpm exec playwright install chromium` before e2e could run.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Core navigation journey is e2e-covered and legacy m2-smoke route is gone
- Static build exports `/`, `/methodology`, `/schools` only — ready for further homepage/navigation work

## Self-Check: PASSED

- `test ! -f src/app/guides/m2-smoke/page.tsx` — FOUND (deleted)
- `test ! -f src/content/guides/m2-smoke.mdx` — FOUND (deleted)
- `rg "m2-smoke" src/` — 0 matches
- Commit `681c8ff` — FOUND
- Commit `5e38f0c` — FOUND
- `pnpm test -- src/features/schools/SchoolDirectory/index.test.tsx` — 4 passed
- `pnpm build` — succeeded, no m2-smoke route
- E2E smoke (3 tests) — passed via reuseExistingServer workaround

---
*Phase: 03-homepage-navigation-core-journey*
*Completed: 2026-07-11*
