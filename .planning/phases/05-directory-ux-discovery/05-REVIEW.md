---
phase: 05-directory-ux-discovery
reviewed: 2026-07-11T16:18:00Z
depth: standard
files_reviewed: 23
files_reviewed_list:
  - src/features/schools/useDebouncedValue/index.ts
  - src/features/schools/useDebouncedValue/index.test.ts
  - src/features/schools/sortSchools/index.ts
  - src/features/schools/sortSchools/types.ts
  - src/features/schools/sortSchools/index.test.ts
  - src/features/schools/SchoolDirectory/index.tsx
  - src/features/schools/SchoolDirectory/index.test.tsx
  - src/features/schools/countActiveFilters/index.ts
  - src/features/schools/countActiveFilters/index.test.ts
  - src/features/schools/MobileFilterSheet/index.tsx
  - src/features/schools/MobileFilterSheet/index.test.tsx
  - src/features/schools/SchoolDirectorySort/index.tsx
  - src/features/schools/SchoolFilters/index.tsx
  - src/features/schools/SchoolFilters/index.test.tsx
  - src/features/schools/ActiveFilterSummary/utils.ts
  - src/features/schools/ActiveFilterSummary/index.tsx
  - src/features/schools/SchoolResults/index.tsx
  - src/features/schools/SchoolResults/index.test.tsx
  - src/features/schools/SchoolCard/index.tsx
  - src/features/schools/SchoolCard/index.test.tsx
  - src/features/schools/filterSchools/index.ts
  - docs/INFORMATION_ARCHITECTURE.md
  - e2e/smoke.spec.ts
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 5: Code Review Report

**Reviewed:** 2026-07-11T16:18:00Z
**Depth:** standard
**Files Reviewed:** 23
**Status:** issues_found

## Summary

Phase 05 delivers debounced URL-synced search, sort pipeline, tiered filters, mobile Sheet with hybrid apply, contextual empty states, and SchoolCard tier help. Implementation is generally solid: pure sort/filter utilities, whitelist URL parsing, safe React text rendering for search queries, and sensible Sheet/Link interaction handling on tier help.

Two related debounce/URL-sync edge cases in `SchoolDirectory` can cause incorrect search state after clearing a query chip or during continued typing after a debounced commit. No security vulnerabilities or crash-level defects were found. Remaining items are maintainability and label-consistency suggestions.

## Warnings

### WR-01: Cleared search can re-apply via pending debounce

**File:** `src/features/schools/SchoolDirectory/index.tsx:102-108`
**Issue:** The debounce commit effect writes `debouncedQuery` to the URL whenever it differs from `filters.query`, without checking whether the debounce has settled against the live input. When a user removes the search chip (`removeFilter("query")`), `filters.query` clears immediately and the sync effect sets `searchInput` to `""`, but `debouncedQuery` still holds the old value for up to 300ms. The commit effect then sees `debouncedQuery !== filters.query` and calls `updateFilters({ ...filters, query: debouncedQuery })`, re-inserting the search the user just cleared.

**Fix:** Only commit to the URL when debounce has settled (debounced value matches current input):

```tsx
useEffect(() => {
  if (debouncedQuery !== searchInput) {
    return;
  }
  if (debouncedQuery === filters.query) {
    return;
  }
  updateFilters({ ...filters, query: debouncedQuery });
}, [debouncedQuery, searchInput, filters, sortKey, pathname, router]);
```

Add a test: load with `?q=test`, remove the "Busca: test" chip, advance timers 300ms, assert `replace` was not called to restore `q=test`.

### WR-02: URL sync can overwrite in-progress typing

**File:** `src/features/schools/SchoolDirectory/index.tsx:110-112`
**Issue:** The effect that syncs `filters.query` back into `searchInput` runs unconditionally whenever the URL query changes. If a debounced commit lands while the user is still typing (e.g., pause after "ab" triggers URL `q=ab`, then user adds "c" before the sync effect runs), `setSearchInput(filters.query)` resets the input to the stale committed value and drops characters still being composed.

**Fix:** Skip external sync while debounce is pending:

```tsx
useEffect(() => {
  if (searchInput !== debouncedQuery) {
    return;
  }
  if (searchInput !== filters.query) {
    setSearchInput(filters.query);
  }
}, [filters.query, searchInput, debouncedQuery]);
```

## Info

### IN-01: Duplicated filter-array key lists

**File:** `src/features/schools/SchoolResults/index.tsx:16-28`, `src/features/schools/countActiveFilters/index.ts:3-17`
**Issue:** `arrayFilterKeys` and `FILTER_ARRAY_KEYS` enumerate the same filter keys independently. Adding a new array filter requires updating both lists plus `SchoolFilters`, increasing drift risk for empty-state detection and active-count labeling.

**Fix:** Export `FILTER_ARRAY_KEYS` from `countActiveFilters` (or a shared constants module) and reuse it in `SchoolResults` for `hasActiveArrayFilters`.

### IN-02: Chip labels diverge from filter panel labels

**File:** `src/features/schools/ActiveFilterSummary/utils.ts:9-22`
**Issue:** `formatChipValue` maps `verified` to `"Verificada"` and omits coverage-range formatting, while `SchoolFilters` shows `"Com informação verificada"` for Ganztag/contraturno and `"0–49%"` for coverage buckets. Active chips and empty-state bullet lists therefore show different Portuguese labels than the controls parents used to select them.

**Fix:** Share label maps with `SchoolFilters` (or a colocated `filterLabels.ts`) so chips, empty states, and checkboxes stay consistent.

---

_Reviewed: 2026-07-11T16:18:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
