---
phase: 06-school-comparison
plan: 03
subsystem: schools
tags: [comparison, react, nextjs, playwright, jest]

requires:
  - phase: 06-school-comparison
    provides: parseCompareSlugs, resolveCompareSchools, formatProfileFieldValue from plan 06-01
  - phase: 06-school-comparison
    provides: directory compare selection and CompareBar from plan 06-02
provides:
  - /compare route with SchoolComparison shell, empty states, and skipped-slug notice
  - ComparisonLimitations always-visible PT copy with methodology link
  - ComparisonTable criteria matrix from PROFILE_SECTIONS with coverage headers and StatusBadge cells
  - Comparar nav in SiteHeader and SiteFooter
  - E2E compare journey in smoke.spec.ts
affects: []

tech-stack:
  added: []
  patterns:
    - "Compare page reads COMPARE_PAGE_PARAM (?schools=) via useSearchParams inside Suspense"
    - "Table cells reuse formatProfileFieldValue + StatusBadge; undefined fields show em dash + missing badge"
    - "Sticky criteria column with overflow-x-auto below lg — no card-per-school mobile layout"
    - "Per-column remove links rebuild /compare?schools= remaining slugs; Editar seleção links to /schools?compare="

key-files:
  created:
    - src/features/schools/ComparisonLimitations/index.tsx
    - src/features/schools/ComparisonLimitations/index.test.tsx
    - src/features/schools/ComparisonTable/index.tsx
    - src/features/schools/ComparisonTable/index.test.tsx
    - src/features/schools/SchoolComparison/index.tsx
    - src/features/schools/SchoolComparison/index.test.tsx
    - src/app/compare/page.tsx
  modified:
    - src/features/navigation/SiteHeader/constants.ts
    - src/features/navigation/SiteHeader/index.test.tsx
    - src/features/navigation/SiteFooter/index.tsx
    - e2e/smoke.spec.ts
    - src/content/schools/real/lichtenbergPrimarySchools/index.ts

key-decisions:
  - "Per-column X remove control updates /compare?schools= with remaining slugs; Editar seleção returns to directory with ?compare= (discretion A2 minimum)"
  - "E2E directory selection targets CompareToggleButton per-card articles — branch UX from 06-04 uses buttons not checkboxes"
  - "Stripped sessionStorage write from SchoolComparison to keep URL as sole source of truth (A3)"

patterns-established:
  - "Comparison page branches: skipped notice → empty state (<2 schools) → limitations + table"
  - "Column headers show school.name.value with getCoverageTierLabel · calculateEvidenceCoverage percentage"

requirements-completed: [COMP-01, COMP-02, COMP-03, COMP-04]

duration: 52min
completed: 2026-07-11
---

# Phase 6 Plan 03: Comparison Page, Navigation, and E2E Summary

**Trust-first `/compare` criteria table with shareable URLs, limitations copy, Comparar nav, and Playwright journey coverage**

## Performance

- **Duration:** 52 min
- **Started:** 2026-07-11T18:46:51Z
- **Completed:** 2026-07-11T19:38:32Z
- **Tasks:** 3
- **Files modified:** 13

## Accomplishments

- Shipped `/compare` with `SchoolComparison` parsing `?schools=`, skipped-slug notice, and empty state linking to `/schools`
- Built `ComparisonLimitations` (always visible, links `/methodology`) and `ComparisonTable` mirroring `PROFILE_SECTIONS` with value + `StatusBadge` cells and sticky criteria column
- Added **Comparar** to header nav (between Escolas and Metodologia) and footer
- Extended smoke E2E with directory → compare, URL restore, and invalid slug paths

## Task Commits

Each task was committed atomically (TDD RED → GREEN):

1. **Task 1: ComparisonLimitations and ComparisonTable**
   - `29e81b6` (test) — failing limitations and table tests
   - `cb7aa0e` (feat) — components with sticky column, edit/remove links
2. **Task 2: SchoolComparison shell, route, and empty states**
   - `6289fa7` (test) — shell, empty state, skipped slug tests
   - `5ebdc5a` (feat) — client shell + `/compare` page with Suspense
3. **Task 3: Comparar navigation and compare E2E journey**
   - `de58840` (feat) — nav links, E2E specs, build type fix, sessionStorage removal

**Plan metadata:** pending (docs commit)

## Files Created/Modified

- `src/features/schools/ComparisonLimitations/index.tsx` — Always-visible PT limitations block
- `src/features/schools/ComparisonTable/index.tsx` — PROFILE_SECTIONS semantic table with coverage headers
- `src/features/schools/SchoolComparison/index.tsx` — URL-driven shell with empty/skip/table branches
- `src/app/compare/page.tsx` — Static route with metadata and Suspense fallback
- `src/features/navigation/SiteHeader/constants.ts` — Comparar nav item
- `src/features/navigation/SiteFooter/index.tsx` — Comparar footer link
- `e2e/smoke.spec.ts` — Compare journey describe block (3 tests)

## Decisions Made

- Used `school.name.value` in column headers because `School.name` is a `FieldValue<string>`
- E2E selects schools via per-article `Adicionar à comparação` buttons to match current directory UX on branch
- Removed `writeStoredCompareSlugs` hook from shell to honor URL-only compare state

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] inspectionData null generic typing broke production build**
- **Found during:** Task 3 verification gate
- **Issue:** `field(null, missing(...))` for `inspectionData` inferred `FieldValue<null>` incompatible with `FieldValue<string>`
- **Fix:** Annotated as `field<string>(null, missing(...))` in two detailed-school records
- **Files modified:** `src/content/schools/real/lichtenbergPrimarySchools/index.ts`
- **Verification:** `pnpm build` succeeds
- **Committed in:** `de58840`

**2. [Rule 1 - Bug] Polluted commit from parallel working-tree changes**
- **Found during:** Task 3 commit
- **Issue:** Initial task-3 commit accidentally included unrelated parallel-work files (ComparisonMobile, filterComparisonRows, planning edits)
- **Fix:** Reset bad commit; restored plan-06-03 feature files from prior task commits; recommitted task 3 with scoped files only
- **Files modified:** git history cleanup only
- **Verification:** Compare unit tests (17) and scoped E2E (3) pass
- **Committed in:** `de58840` (replacement task-3 commit)

**3. [Rule 2 - Missing Critical] E2E selectors updated for branch directory UX**
- **Found during:** Task 3 E2E run against dev server
- **Issue:** Plan referenced checkbox aria-labels; branch uses `CompareToggleButton` with `Adicionar à comparação` label
- **Fix:** E2E helper scopes button clicks to school article by heading name
- **Files modified:** `e2e/smoke.spec.ts`
- **Verification:** 3 compare E2E tests pass
- **Committed in:** `de58840`

---

**Total deviations:** 3 auto-fixed (1 blocking, 1 bug, 1 missing critical alignment)
**Impact on plan:** All fixes required for verification gate and branch compatibility. No ranking/scoring features added.

## Issues Encountered

- Playwright webServer could not start while another `next dev` instance held the project lock; E2E verified against existing dev server on port 3001 with a temporary no-webServer config (not committed).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `/compare` is statically generated and linked from site chrome
- Families can share `/compare?schools=slug1,slug2` URLs
- All compare unit tests pass: `pnpm exec jest --testPathPatterns="SchoolComparison|ComparisonTable|ComparisonLimitations" --no-coverage`
- Full suite: 237 tests; build succeeds

## Self-Check: PASSED

- FOUND: src/app/compare/page.tsx
- FOUND: src/features/schools/ComparisonLimitations/index.tsx
- FOUND: src/features/schools/ComparisonTable/index.tsx
- FOUND: src/features/schools/SchoolComparison/index.tsx
- FOUND: commit 29e81b6
- FOUND: commit cb7aa0e
- FOUND: commit 6289fa7
- FOUND: commit 5ebdc5a
- FOUND: commit de58840
- Verification: 17 compare unit tests pass; 3 compare E2E tests pass; `pnpm build` succeeds

---
*Phase: 06-school-comparison*
*Completed: 2026-07-11*
