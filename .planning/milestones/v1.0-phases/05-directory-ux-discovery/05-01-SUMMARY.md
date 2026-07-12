---
phase: 05-directory-ux-discovery
plan: 01
subsystem: ui
tags: [react, debounce, url-sync, sort, jest, nextjs]

requires:
  - phase: 04-school-profiles
    provides: SchoolDirectory with URL-synced filters and SchoolCard rendering
provides:
  - useDebouncedValue generic hook (~300ms)
  - sortSchools pure utility with URL parser (name/coverage/tier)
  - SchoolDirectory debounced search, sort pipeline, pending indicator, dynamic header counts
affects:
  - 05-02 (sort UI control above results)
  - 05-03 (mobile Sheet, empty states, filter tiers)

tech-stack:
  added: []
  patterns:
    - Dual search state (immediate input + debounced URL commit)
    - Filter → sort useMemo pipeline keyed on applied filters
    - Sort key kept separate from DirectoryFilterState

key-files:
  created:
    - src/features/schools/useDebouncedValue/index.ts
    - src/features/schools/useDebouncedValue/index.test.ts
    - src/features/schools/sortSchools/index.ts
    - src/features/schools/sortSchools/types.ts
    - src/features/schools/sortSchools/index.test.ts
  modified:
    - src/features/schools/SchoolDirectory/index.tsx
    - src/features/schools/SchoolDirectory/index.test.tsx

key-decisions:
  - "Sort key lives outside DirectoryFilterState with separate URL param parsing"
  - "Default sort=name omits sort param from shareable URLs"
  - "Filter pipeline uses applied filters.query from URL, never raw searchInput"

patterns-established:
  - "useDebouncedValue: colocated hook with setTimeout cleanup for client debounce"
  - "sortSchools: copy-then-sort pure utility with pt-BR localeCompare tie-breakers"

requirements-completed: [DISC-01, DISC-03, DISC-04, DISC-07, DISC-08]

duration: 18min
completed: 2026-07-11
---

# Phase 05 Plan 01: Debounce, Sort Pipeline, and Header Counts Summary

**300ms debounced search with URL `q` sync, pure sortSchools utility (name/coverage/tier), and memoized filter→sort pipeline with dynamic research-depth header counts**

## Performance

- **Duration:** 18 min
- **Started:** 2026-07-11T18:08:00Z
- **Completed:** 2026-07-11T18:26:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments

- Extracted `useDebouncedValue` hook with fake-timer tests covering delay, rapid input, and unmount cleanup
- Implemented `sortSchools` and `sortFromSearchParams` with whitelist parsing and pt-BR name ordering
- Wired SchoolDirectory dual search state, debounced URL commit, sort URL persistence, pending "Atualizando…" indicator, and dynamic header counts

## Task Commits

Each task was committed atomically (TDD: test → feat):

1. **Task 1: useDebouncedValue hook** - `12092b6` (test), `a84860d` (feat)
2. **Task 2: sortSchools utility** - `c7b3f8c` (test), `841fd3e` (feat)
3. **Task 3: SchoolDirectory integration** - `c7a8e9d` (test), `8acaa99` (feat)

## Files Created/Modified

- `src/features/schools/useDebouncedValue/index.ts` - Generic debounce hook with setTimeout cleanup
- `src/features/schools/useDebouncedValue/index.test.ts` - Fake-timer tests for 300ms delay behavior
- `src/features/schools/sortSchools/index.ts` - Pure sort + URL param parser with whitelist
- `src/features/schools/sortSchools/types.ts` - DirectorySortKey type separate from filter state
- `src/features/schools/sortSchools/index.test.ts` - Sort ordering and parser unit tests
- `src/features/schools/SchoolDirectory/index.tsx` - Debounced search, sort pipeline, header counts
- `src/features/schools/SchoolDirectory/index.test.tsx` - Debounce, sort URL, pending UI, nav sync tests

## Decisions Made

- Sort key kept outside `DirectoryFilterState` per research anti-pattern guidance
- `sort=name` omitted from generated URLs; only `coverage` and `tier` serialized
- Filter pipeline uses applied `filters.query` from URL, not raw `searchInput`

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Coverage sort test initially queried h3 headings; SchoolCard uses h2 — fixed by scoping to the results section aria-label

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 05-02 can add sort `<select>` UI above results (D-07) — URL parsing and pipeline already wired
- Plan 05-03 can focus on mobile Sheet, filter tiers, and empty states without reworking search/sort foundation

## Self-Check: PASSED

- FOUND: src/features/schools/useDebouncedValue/index.ts
- FOUND: src/features/schools/sortSchools/index.ts
- FOUND: src/features/schools/SchoolDirectory/index.tsx
- FOUND: 12092b6, a84860d, c7b3f8c, 841fd3e, c7a8e9d, 8acaa99

---
*Phase: 05-directory-ux-discovery*
*Completed: 2026-07-11*
