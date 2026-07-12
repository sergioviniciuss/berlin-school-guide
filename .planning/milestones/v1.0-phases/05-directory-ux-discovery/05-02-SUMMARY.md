---
phase: 05-directory-ux-discovery
plan: 02
subsystem: ui
tags: [react, sheet, filters, sort, mobile, jest, nextjs]

requires:
  - phase: 05-directory-ux-discovery
    plan: 01
    provides: Debounced search, sortSchools pipeline, URL sort param parsing
provides:
  - Tiered SchoolFilters (Essenciais/Avançados) with methodology help links
  - countActiveFilters utility for sticky mobile bar
  - MobileFilterSheet right-side drawer with hybrid draft apply
  - SchoolDirectorySort native select above results
  - Sticky mobile filter bar and desktop sidebar unchanged at lg+
affects:
  - 05-03 (empty states, SchoolCard tier help)

tech-stack:
  added: []
  patterns:
    - Hybrid apply — instant search/chips; batched drawer toggles until Apply or close
    - Draft filter state separate from URL-applied filters on mobile
    - countActiveFilters counts query + array selections for sticky bar label

key-files:
  created:
    - src/features/schools/countActiveFilters/index.ts
    - src/features/schools/MobileFilterSheet/index.tsx
    - src/features/schools/SchoolDirectorySort/index.tsx
  modified:
    - src/features/schools/SchoolFilters/index.tsx
    - src/features/schools/SchoolFilters/index.test.tsx
    - src/features/schools/SchoolDirectory/index.tsx
    - src/features/schools/SchoolDirectory/index.test.tsx

key-decisions:
  - "Ganztag placed in Essenciais tier per RESEARCH A1 parent priority"
  - "Mobile clear uses onClearAndApply single callback for reset + URL commit"
  - "Apply-on-close commits draftFilters when Sheet closes (D-10)"

patterns-established:
  - "MobileFilterSheet: fixed header/footer with scrollable SchoolFilters body"
  - "SchoolDirectorySort: native select with immediate URL sort updates (no debounce)"

requirements-completed: [DISC-02, DISC-04, DISC-06]

duration: 22min
completed: 2026-07-11
---

# Phase 05 Plan 02: Filter Tiers, Mobile Sheet, and Sort Control Summary

**Tiered Essenciais/Avançados filters with methodology help links, right-side mobile Sheet with hybrid draft apply, sticky filter bar, and native sort select wired to immediate URL updates**

## Performance

- **Duration:** 22 min
- **Started:** 2026-07-11T18:11:00Z
- **Completed:** 2026-07-11T18:33:00Z
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments

- Restructured `SchoolFilters` into Essenciais (always visible) and Avançados (`<details>` collapsed by default) with `/methodology` help links for Ganztag and Willkommensklasse
- Added `countActiveFilters` utility and `MobileFilterSheet` drawer matching SiteHeader right-side Sheet pattern with fixed header/footer
- Replaced inline mobile filter expand with sticky bar, hybrid draft apply, apply-on-close, and `SchoolDirectorySort` beside result count

## Task Commits

Each task was committed atomically (TDD: test → feat):

1. **Task 1: Tiered SchoolFilters with methodology help links** - `ca4ba9c` (test), `97b795e` (feat)
2. **Task 2: countActiveFilters utility and MobileFilterSheet drawer** - `190b00a` (test), `03ee7a9` (feat)
3. **Task 3: SchoolDirectorySort, sticky bar, hybrid apply wiring** - `815baa1` (test), `f77b899` (feat)

## Files Created/Modified

- `src/features/schools/SchoolFilters/index.tsx` - Essenciais/Avançados tiers with optional helpLink on FilterGroup
- `src/features/schools/SchoolFilters/index.test.tsx` - Seven tier and help-link behavior tests
- `src/features/schools/countActiveFilters/index.ts` - Active filter count for sticky bar label
- `src/features/schools/countActiveFilters/index.test.ts` - Query and array sum unit tests
- `src/features/schools/MobileFilterSheet/index.tsx` - Right-side Sheet with scrollable filters and apply/clear footer
- `src/features/schools/MobileFilterSheet/index.test.tsx` - Drawer apply, draft toggle, and clear tests
- `src/features/schools/SchoolDirectorySort/index.tsx` - Native select with Portuguese sort labels
- `src/features/schools/SchoolDirectory/index.tsx` - Sticky bar, sheet wiring, sort control, removed inline expand
- `src/features/schools/SchoolDirectory/index.test.tsx` - Sort URL, sticky bar, hybrid apply, sidebar tests

## Decisions Made

- Ganztag in Essenciais tier per RESEARCH A1 (parent priority over CONTEXT shorthand)
- `onClearAndApply` single callback resets draft and commits defaults in one action per UI-SPEC
- Apply-on-close: closing Sheet commits `draftFilters` to URL without requiring explicit Apply tap

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - API simplification] Combined clear handler as onClearAndApply**
- **Found during:** Task 2 (MobileFilterSheet)
- **Issue:** Plan listed separate `onClearDraft` + `onApply`; React state batching makes sequential calls unreliable for clear+apply
- **Fix:** Single `onClearAndApply` prop called by footer "Limpar filtros" button
- **Files modified:** `src/features/schools/MobileFilterSheet/index.tsx`, `src/features/schools/SchoolDirectory/index.tsx`
- **Committed in:** `03ee7a9`, `f77b899`

---

**Total deviations:** 1 auto-fixed (1 missing critical API pattern)
**Impact on plan:** Simplifies parent wiring; behavior matches UI-SPEC clear+apply single action.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 05-03 can focus on empty/low-result states and SchoolCard tier help without reworking filter/sort/mobile foundation
- Sort UI and URL pipeline fully wired; mobile Sheet pattern established

## Self-Check: PASSED

- FOUND: src/features/schools/MobileFilterSheet/index.tsx
- FOUND: src/features/schools/SchoolDirectorySort/index.tsx
- FOUND: src/features/schools/countActiveFilters/index.ts
- FOUND: src/features/schools/SchoolFilters/index.tsx
- FOUND: ca4ba9c, 97b795e, 190b00a, 03ee7a9, 815baa1, f77b899

---
*Phase: 05-directory-ux-discovery*
*Completed: 2026-07-11*
