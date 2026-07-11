---
phase: 06-school-comparison
plan: 04
subsystem: schools
tags: [comparison, selection, sessionStorage, react, jest]

requires:
  - phase: 06-school-comparison
    provides: directory compare selection and CompareBar from plan 06-02
provides:
  - MAX_COMPARE_SCHOOLS = 3 with parseCompareSlugs cap alignment
  - compareSelection sessionStorage read/write + toggleCompareSlug helpers
  - CompareToggleButton shared control with PT labels and min-h-11 tap target
  - SchoolCard footer toggle outside profile Link (no nested interactive controls)
  - SchoolProfileCompareAction in profile header with same max-3 rules
  - SchoolDirectory URL compare param ↔ sessionStorage sync
affects:
  - 06-03-PLAN (comparison page uses toggle selection and max-3 empty-state copy)

tech-stack:
  added: []
  patterns:
    - "Compare toggle button: Adicionar à comparação / Na comparação with aria-pressed"
    - "sessionStorage key bsg-compare-slugs mirrors ordered slug list for profile ↔ directory continuity"
    - "toggleCompareSlug preserves order; no add when length >= MAX_COMPARE_SCHOOLS"

key-files:
  created:
    - src/features/schools/compareSelection/constants.ts
    - src/features/schools/compareSelection/index.ts
    - src/features/schools/compareSelection/index.test.ts
    - src/features/schools/CompareToggleButton/index.tsx
    - src/features/schools/CompareToggleButton/index.test.tsx
    - src/features/schools/SchoolProfileCompareAction/index.tsx
  modified:
    - src/features/schools/parseCompareSlugs/index.ts
    - src/features/schools/parseCompareSlugs/index.test.ts
    - src/features/schools/SchoolCard/index.tsx
    - src/features/schools/SchoolCard/index.test.tsx
    - src/features/schools/SchoolDirectory/index.tsx
    - src/features/schools/SchoolDirectory/index.test.tsx
    - src/features/schools/SchoolProfile/index.tsx
    - src/features/schools/SchoolResults/index.tsx
    - src/features/schools/SchoolComparison/index.tsx

key-decisions:
  - "Replaced checkbox compare control from 06-02 with explicit toggle button per revised CONTEXT D-01"
  - "Max selection reduced from 4 to 3 schools (D-03, D-28)"
  - "Profile compare action reads/writes sessionStorage; directory syncs URL ?compare= on change (D-09)"

patterns-established:
  - "CompareToggleButton stops propagation so card Link navigation stays separate (D-02)"
  - "Disabled toggle when selection full shows title Máximo de 3 escolas"

requirements-completed: [COMP-01]

duration: 15min
completed: 2026-07-11
---

# Phase 6 Plan 04: Gap Closure — Selection UX, Max 3, Profile Compare Summary

**Align directory and profile compare selection with revised CONTEXT: toggle buttons, max 3 schools, shared sessionStorage state**

## Performance

- **Duration:** 15 min
- **Started:** 2026-07-11T19:02:00Z
- **Completed:** 2026-07-11T19:02:52Z
- **Tasks:** 3
- **Files modified:** 15

## Accomplishments

- Added `compareSelection` module with `MAX_COMPARE_SCHOOLS = 3`, sessionStorage helpers, and ordered `toggleCompareSlug`
- Created `CompareToggleButton` with Portuguese labels and 44px min-height tap target
- Refactored `SchoolCard` to use footer toggle outside profile Link
- Wired `SchoolDirectory` to sync URL `?compare=` with sessionStorage and enforce max-3 gating
- Added `SchoolProfileCompareAction` client wrapper in profile header for same selection rules

## Task Commits

Implementation shipped in:

- `e27bdf0` — fix(06-04): align selection UX with revised Phase 6 context

## Verification

```bash
pnpm test -- --testPathPattern="compareSelection|CompareToggleButton|parseCompareSlugs|SchoolCard|SchoolDirectory|SchoolProfile" --no-coverage
```

61 tests passed across 6 suites.

## Deviations from Plan

None — all three tasks completed as specified.

## Notes

- Plan 06-03 depends on this gap closure; comparison page E2E targets `CompareToggleButton` per revised UX.
- `SchoolComparison` writes sessionStorage when URL slugs change so profile selections stay in sync after visiting `/compare`.
