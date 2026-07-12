---
phase: 06-school-comparison
plan: 02
subsystem: schools
tags: [comparison, url-state, directory, react, jest]

requires:
  - phase: 06-school-comparison
    provides: parseCompareSlugs, COMPARE_PARAM, buildComparePageHref from plan 06-01
  - phase: 05-directory-ux-discovery
    provides: SchoolDirectory URL sync patterns for filters and sort
provides:
  - SchoolCard compare checkbox sibling to profile Link with 44px tap target
  - CompareBar sticky bottom selection bar with min-2 CTA gating
  - Directory ?compare= URL sync preserving filter and sort params
affects:
  - 06-03-PLAN (SchoolComparison table page)

tech-stack:
  added: []
  patterns:
    - "Compare checkbox outside profile Link — no nested interactive controls"
    - "Directory compare state in ?compare= comma-separated slugs (URL-encoded)"
    - "CompareBar fixed bottom with pb-24 spacer when selection active"

key-files:
  created:
    - src/features/schools/CompareBar/index.tsx
    - src/features/schools/CompareBar/index.test.tsx
  modified:
    - src/features/schools/SchoolCard/index.tsx
    - src/features/schools/SchoolCard/index.test.tsx
    - src/features/schools/SchoolDirectory/index.tsx
    - src/features/schools/SchoolDirectory/index.test.tsx
    - src/features/schools/SchoolResults/index.tsx

key-decisions:
  - "Compare checkbox only renders when onToggleCompare is provided — wired from SchoolResults in directory"
  - "URLSearchParams encodes compare slug list commas as %2C in router.replace hrefs"
  - "Disabled CompareBar CTA uses Button; enabled CTA uses Button asChild + Link via buildComparePageHref"

patterns-established:
  - "SchoolCard flex layout: CompareCheckbox shrink-0 sibling + Link-wrapped card content"
  - "toQueryString(filters, sortKey, compareSlugs?) merges compare param without dropping filter keys"

requirements-completed: [COMP-01]

duration: 3min
completed: 2026-07-11
---

# Phase 6 Plan 02: Directory Compare Selection and Sticky Bar Summary

**Directory compare selection with URL-synced ?compare= slugs, sibling checkbox on SchoolCard, and sticky CompareBar gating navigation until two schools are selected**

## Performance

- **Duration:** 3 min
- **Started:** 2026-07-11T18:43:00Z
- **Completed:** 2026-07-11T18:46:15Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments

- Refactored `SchoolCard` so compare checkbox sits outside the profile `Link` with `min-h-11` tap target and max-4 disabled state
- Added `CompareBar` with Portuguese count copy, disabled button below two schools, and `buildComparePageHref` link when ready
- Wired `SchoolDirectory` to read/write `?compare=` via `parseCompareSlugs` and `router.replace` while preserving filters, search, and sort
- Passed compare props through `SchoolResults` to every directory card with selection-full gating

## Task Commits

Each task was committed atomically (TDD RED → GREEN):

1. **Task 1: SchoolCard compare checkbox outside profile link**
   - `1bfdf29` (test) — failing checkbox aria-label, tap target, toggle, and disabled tests
   - `21fad05` (feat) — flex layout refactor with CompareCheckbox sibling to Link
2. **Task 2: CompareBar sticky bar with min-2 CTA gating**
   - `11fccd8` (test) — failing count copy, CTA gating, and layout tests
   - `f990783` (feat) — CompareBar implementation
3. **Task 3: SchoolDirectory compare URL sync and wiring**
   - `1da2f0f` (test) — failing compare param round-trip and CompareBar wiring tests
   - `133b6f9` (feat) — URL sync, SchoolResults wiring, CompareBar render

**Plan metadata:** pending (docs commit)

## Files Created/Modified

- `src/features/schools/SchoolCard/index.tsx` — Compare checkbox sibling layout; optional compare props
- `src/features/schools/SchoolCard/index.test.tsx` — Compare selection behavior tests
- `src/features/schools/CompareBar/index.tsx` — Sticky bottom bar with count and gated CTA
- `src/features/schools/CompareBar/index.test.tsx` — Bar visibility, copy, and href tests
- `src/features/schools/SchoolDirectory/index.tsx` — `toggleCompareSlug`, extended `toQueryString`, CompareBar + spacer
- `src/features/schools/SchoolDirectory/index.test.tsx` — Compare URL round-trip and filter preservation tests
- `src/features/schools/SchoolResults/index.tsx` — Passes compare props to each SchoolCard

## Decisions Made

- Kept compare checkbox conditional on `onToggleCompare` prop so cards without wiring retain prior behavior in isolation tests
- Used `URLSearchParams.set(COMPARE_PARAM, slugs.join(","))` — browser encodes commas as `%2C` in serialized query strings
- Added `pb-24` spacer div when selection is non-empty so last card is not obscured by fixed bar

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Compare URL test expected unencoded comma separator**
- **Found during:** Task 3 verification
- **Issue:** Test expected `compare=slug1,slug2` but `URLSearchParams.toString()` produces `compare=slug1%2Cslug2`
- **Fix:** Updated test expectation to encoded form; split filter-preservation into deselect (preserves `q`+`district`) and add-school (preserves `district`) cases
- **Files modified:** `src/features/schools/SchoolDirectory/index.test.tsx`
- **Verification:** 52 tests pass across SchoolCard, CompareBar, SchoolDirectory suites
- **Committed in:** `133b6f9`

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Test-only fix; runtime behavior matches Phase 5 URL encoding conventions.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Directory selection UX complete for COMP-01; families can share `/schools?compare=slug1,slug2` URLs
- CompareBar CTA links to `/compare?schools=...` — ready for 06-03 comparison table page
- All 52 unit tests pass: `pnpm exec jest --testPathPatterns="SchoolCard|CompareBar|SchoolDirectory" --no-coverage`

## Self-Check: PASSED

- FOUND: src/features/schools/CompareBar/index.tsx
- FOUND: src/features/schools/SchoolCard/index.tsx (contains min-h-11)
- FOUND: src/features/schools/SchoolDirectory/index.tsx (contains COMPARE_PARAM)
- FOUND: commit 1bfdf29
- FOUND: commit 21fad05
- FOUND: commit 11fccd8
- FOUND: commit f990783
- FOUND: commit 1da2f0f
- FOUND: commit 133b6f9
- Verification: 52 passed across SchoolCard, CompareBar, SchoolDirectory

---
*Phase: 06-school-comparison*
*Completed: 2026-07-11*
