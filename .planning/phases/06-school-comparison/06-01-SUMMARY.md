---
phase: 06-school-comparison
plan: 01
subsystem: schools
tags: [comparison, url-state, field-formatting, jest]

requires:
  - phase: 04-school-detail-profiles
    provides: ProfileFieldRow formatting patterns and getSchoolBySlug static lookup
  - phase: 05-directory-ux-discovery
    provides: URL query param sync conventions for directory state
provides:
  - parseCompareSlugs with dedupe, trim, and max-4 cap
  - resolveCompareSchools with skipped-slug reporting
  - buildComparePageHref with min-2 schools rule
  - Shared formatProfileFieldValue for profile and comparison cells
affects:
  - 06-02-PLAN (directory selection + CompareBar wiring)
  - 06-03-PLAN (SchoolComparison table cells)

tech-stack:
  added: []
  patterns:
    - "URL slug list parser with English param constants (compare, schools)"
    - "Static slug allowlist lookup via getSchoolBySlug"
    - "Extracted evidence-aware field formatter shared across profile and comparison"

key-files:
  created:
    - src/features/schools/parseCompareSlugs/index.ts
    - src/features/schools/parseCompareSlugs/index.test.ts
    - src/features/schools/resolveCompareSchools/index.ts
    - src/features/schools/resolveCompareSchools/index.test.ts
    - src/features/schools/formatProfileFieldValue/index.ts
    - src/features/schools/formatProfileFieldValue/index.test.ts
  modified:
    - src/features/schools/ProfileFieldRow/index.tsx

key-decisions:
  - "URL is sole selection source of truth — no sessionStorage mirror (A3)"
  - "buildComparePageHref returns bare /compare when fewer than 2 slugs (D-02)"
  - "formatProfileFieldValue extracted verbatim from ProfileFieldRow to preserve profile behavior"

patterns-established:
  - "Compare param constants: COMPARE_PARAM=compare (directory), COMPARE_PAGE_PARAM=schools (/compare)"
  - "resolveCompareSchools preserves input slug order and never throws on unknown slugs"

requirements-completed: [COMP-03]

duration: 1min
completed: 2026-07-11
---

# Phase 6 Plan 01: Comparison Utilities and Shared Field Formatting Summary

**Pure compare URL/slug utilities with max-4 dedupe and shared evidence-aware field formatting extracted from ProfileFieldRow**

## Performance

- **Duration:** 1 min
- **Started:** 2026-07-11T18:42:43Z
- **Completed:** 2026-07-11T18:43:43Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- `parseCompareSlugs` deduplicates, trims, and caps slug lists at 4 with exported `COMPARE_PARAM` and `COMPARE_PAGE_PARAM` constants
- `resolveCompareSchools` resolves valid schools via `getSchoolBySlug` and reports skipped slugs without throwing
- `buildComparePageHref` enforces the min-2 rule for comparison page links
- `formatProfileFieldValue` extracted as shared module; `ProfileFieldRow` behavior unchanged

## Task Commits

Each task was committed atomically (TDD RED → GREEN):

1. **Task 1: parseCompareSlugs and resolveCompareSchools**
   - `6e17ea3` (test) — failing tests for slug parse, resolve, and href builder
   - `9ebe420` (feat) — implementation
2. **Task 2: Extract formatProfileFieldValue for profile + comparison reuse**
   - `f9fa366` (test) — failing tests for status gating and field paths
   - `4431c96` (feat) — extraction and ProfileFieldRow import update

**Plan metadata:** pending (docs commit)

## Files Created/Modified

- `src/features/schools/parseCompareSlugs/index.ts` — Slug parser, param constants, compare page href builder
- `src/features/schools/parseCompareSlugs/index.test.ts` — Parser and href tests
- `src/features/schools/resolveCompareSchools/index.ts` — Static slug lookup with skipped reporting
- `src/features/schools/resolveCompareSchools/index.test.ts` — Resolver tests with real Lichtenberg slugs
- `src/features/schools/formatProfileFieldValue/index.ts` — Shared evidence-aware field value formatter
- `src/features/schools/formatProfileFieldValue/index.test.ts` — Formatter tests for status gating and inspection
- `src/features/schools/ProfileFieldRow/index.tsx` — Imports shared formatter; citations remain local

## Decisions Made

- Kept formatter logic identical to prior ProfileFieldRow private functions — no behavior change on profile pages
- Used Jest 30 `--testPathPatterns` (plural) for verification; plan's `--testPathPattern` flag is deprecated in Jest 30

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Jest 30 CLI flag name**
- **Found during:** Task 1 verification
- **Issue:** Plan specifies `--testPathPattern` but Jest 30.4.2 rejects it in favor of `--testPathPatterns`
- **Fix:** Ran verification with `--testPathPatterns`; documented for downstream plans
- **Files modified:** none (verification command only)
- **Verification:** 25 tests pass across 4 suites
- **Committed in:** N/A (verification-only)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Verification command updated at runtime; no code changes required.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Pure utilities ready for 06-02 directory selection wiring (`COMPARE_PARAM`, `parseCompareSlugs`, `buildComparePageHref`)
- Shared formatter ready for 06-03 comparison table cells
- All 25 unit tests pass

## Self-Check: PASSED

- FOUND: src/features/schools/parseCompareSlugs/index.ts
- FOUND: src/features/schools/resolveCompareSchools/index.ts
- FOUND: src/features/schools/formatProfileFieldValue/index.ts
- FOUND: commit 6e17ea3
- FOUND: commit 9ebe420
- FOUND: commit f9fa366
- FOUND: commit 4431c96
- Verification: `pnpm exec jest --testPathPatterns="parseCompareSlugs|resolveCompareSchools|formatProfileFieldValue|ProfileFieldRow" --no-coverage` — 25 passed

---
*Phase: 06-school-comparison*
*Completed: 2026-07-11*
