---
phase: 05-directory-ux-discovery
verified: 2026-07-11T20:22:00Z
status: human_needed
score: 8/8
overrides_applied: 0
human_verification:
  - test: "Open /schools at 375×812 viewport; tap Filtros, toggle checkboxes, apply, and scroll results"
    expected: "Right-side Sheet opens without horizontal page scroll; sticky Filtros and footer buttons are easy to tap (≥44px); filter apply updates URL and results"
    why_human: "Mobile layout, tap-target comfort, and Sheet interaction cannot be fully validated by static code checks"
  - test: "Type quickly in Buscar escola pelo nome on mobile and desktop"
    expected: "Input updates immediately; count row shows subtle · Atualizando… during debounce; settled count announced via aria-live without perceptible lag on 10 schools"
    why_human: "Perceived responsiveness and aria-live announcement timing require real browser interaction"
  - test: "Cold-load /schools?q=Lew-Tolstoi&sort=coverage in a fresh browser session"
    expected: "1 de 10 escolas encontradas, Lew-Tolstoi-Schule card visible, sort select shows Cobertura da pesquisa"
    why_human: "E2E blocked in verifier environment (dev server port conflict); test exists but needs clean CI or manual confirmation"
---

# Phase 5: Directory UX & Discovery Verification Report

**Phase Goal:** The school directory is an excellent discovery experience — easy to search, filter, sort, and understand on any device.
**Verified:** 2026-07-11T20:22:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

Roadmap success criteria (primary contract) verified goal-backward against codebase:

| #   | Truth | Status | Evidence |
| --- | ----- | ------ | -------- |
| 1   | Search shows result counts, clear Portuguese labeling, and feels responsive while typing | ✓ VERIFIED | `SchoolSearch` label "Buscar escola pelo nome"; count row `{n} de {total} escolas encontradas`; `useDebouncedValue(searchInput, 300)` + `isSearchPending` "Atualizando…" in `SchoolDirectory`; 74 unit tests pass |
| 2   | Active filters summarized visibly and clearable in one action | ✓ VERIFIED | `ActiveFilterSummary` chips with per-chip remove + "Limpar filtros"; empty states add "Limpar todos os filtros"; `countActiveFilters` drives sticky bar label |
| 3   | User can sort by at least name and evidence coverage | ✓ VERIFIED | `SchoolDirectorySort` native select with "Nome (A–Z)" and "Cobertura da pesquisa"; `sortSchools` orders by `evidenceCoverage.percentage` desc; bonus tier sort also implemented |
| 4   | Sharing URL with filter/search params restores directory view | ✓ VERIFIED | `filtersFromSearchParams` + `toQueryString` serialize `q`, filter arrays, and `sort`; e2e test `restores directory view from shared URL with search and sort`; unit tests for debounced URL sync and sort persistence |
| 5   | Empty states explain why and suggest broadening search | ✓ VERIFIED | `SchoolResults` renders filter-list bullets via `getActiveFilterChips`, search-only "Nenhuma escola com esse nome", methodology link, few-results tip "Poucos resultados — tente remover filtros" |
| 6   | Directory layout and controls work on mobile viewport | ✓ VERIFIED | `lg:hidden` sticky bar, `MobileFilterSheet` `side="right"`, `min-h-11` touch targets on bar and footer buttons; hybrid draft apply wired; **human confirmation needed** for scroll/tap feel |
| 7   | Filtering 10 schools shows no perceptible lag; scaling documented | ✓ VERIFIED | `useMemo` filter→sort pipeline keyed on `schools`, `filters`, `sortKey`; debounce prevents per-keystroke URL churn; `filterSchools` DISC-07 scaling comment documents Berlin-wide path |
| 8   | Cards surface research depth (directory vs detailed, coverage %) | ✓ VERIFIED | Header dynamic counts; `SchoolCard` profile badge, coverage block with tier label + percentage; `TierHelpButton` with aria-label/title per tier |

**Score:** 8/8 truths verified (automated evidence); 3 items need human confirmation before closing phase

### Plan-Level Must-Haves (supplementary)

All 27 plan-frontmatter truths across 05-01/02/03 verified in code and tests. Highlights:

- Debounce commits URL `q` after 300ms; single-char queries supported (test at `SchoolDirectory/index.test.tsx:53`)
- `sort=name` omitted from URL; `sort=coverage|tier` persisted
- Essenciais/Avançados filter tiers with `/methodology` help links for Ganztag and Willkommensklasse
- Mobile hybrid apply: search/chips instant; drawer toggles batch until Apply or close
- `mobileFiltersOpen` and inline "Abrir filtros" removed
- No dedicated tier filter checkbox (D-20 deferred by design — sort-only discoverability)

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | ----------- | ------ | ------- |
| `src/features/schools/useDebouncedValue/index.ts` | Generic debounce hook | ✓ VERIFIED | 12 lines; setTimeout + clearTimeout cleanup; exported and used |
| `src/features/schools/sortSchools/index.ts` | Pure sort + URL parser | ✓ VERIFIED | name/coverage/tier with pt-BR tie-breakers; whitelist parser |
| `src/features/schools/SchoolDirectory/index.tsx` | Orchestrator | ✓ VERIFIED | 353 lines; debounce, pipeline, mobile sheet, sort, header counts |
| `src/features/schools/MobileFilterSheet/index.tsx` | Mobile drawer | ✓ VERIFIED | Right Sheet, scrollable body, apply/clear footer |
| `src/features/schools/SchoolDirectorySort/index.tsx` | Sort select | ✓ VERIFIED | Portuguese labels; immediate URL update |
| `src/features/schools/SchoolFilters/index.tsx` | Tiered filters | ✓ VERIFIED | Essenciais + `<details>` Avançados |
| `src/features/schools/countActiveFilters/index.ts` | Active count utility | ✓ VERIFIED | Query + array sum |
| `src/features/schools/SchoolResults/index.tsx` | Contextual empty states | ✓ VERIFIED | Search-only and filter-list variants |
| `src/features/schools/SchoolCard/index.tsx` | Tier help on cards | ✓ VERIFIED | Coverage % visible; HelpCircle button |
| `src/features/schools/ActiveFilterSummary/utils.ts` | Shared chip formatter | ✓ VERIFIED | `getActiveFilterChips` reused by chips and empty states |
| `src/features/schools/filterSchools/index.ts` | Scaling comment | ✓ VERIFIED | Berlin-wide import note at function top |
| `e2e/smoke.spec.ts` | URL share restore test | ✓ VERIFIED | `sort=coverage` cold-load test present |

gsd-sdk `verify.artifacts`: **12/12 passed** across three plans.

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | --- | --- | ------ | ------- |
| `SchoolDirectory/index.tsx` | `useDebouncedValue` | `useDebouncedValue(searchInput, 300)` | ✓ WIRED | Line 66; debouncedQuery drives filter commit effect |
| `SchoolDirectory/index.tsx` | `sortSchools` | `useMemo(() => sortSchools(filteredSchools, sortKey))` | ✓ WIRED | Lines 74–80 |
| `SchoolDirectory/index.tsx` | URL via `router.replace` | `toQueryString(filters, sortKey)` | ✓ WIRED | Lines 91–99, 321–351 |
| `SchoolDirectory/index.tsx` | `MobileFilterSheet` | controlled `sheetOpen` + `draftFilters` | ✓ WIRED | Lines 240–248; apply-on-close at 144–152 |
| `MobileFilterSheet/index.tsx` | `@/components/ui/Sheet` | `side="right" SheetContent` | ✓ WIRED | Import + render; gsd-sdk regex miss (false negative) |
| `SchoolDirectory/index.tsx` | `SchoolDirectorySort` | `value={sortKey} onChange={setSortKey}` | ✓ WIRED | Line 263; immediate `router.replace` |
| `SchoolResults/index.tsx` | `ActiveFilterSummary/utils` | `getActiveFilterChips` | ✓ WIRED | Empty-state bullet list |
| `SchoolDirectory/index.tsx` | `SchoolResults` | `onClearSearch`, `onResetFilters` props | ✓ WIRED | Lines 272–281 |
| `e2e/smoke.spec.ts` | `/schools` | `goto` with `q` and `sort` | ✓ WIRED | Test at line 65 |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| `SchoolDirectory` | `sortedSchools` | `schools` prop from static page + `filterSchools` + `sortSchools` | Yes — 10 Lichtenberg schools | ✓ FLOWING |
| `SchoolDirectory` | `detailedCount` / `directoryCount` | `schools.filter(coverageLevel)` | Yes — computed from dataset | ✓ FLOWING |
| `SchoolResults` | `filters.query` in empty state | URL-parsed `DirectoryFilterState` | Yes — React text node, no HTML injection | ✓ FLOWING |
| `SchoolCard` | `evidenceCoverage.percentage` | `SchoolDirectoryItem` from static data | Yes — real per-school values | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| Phase unit tests (74) | `pnpm test -- --testPathPattern="useDebouncedValue\|sortSchools\|SchoolDirectory\|..."` | 10 suites, 74 passed | ✓ PASS |
| useDebouncedValue export | `export function useDebouncedValue` in source | Present | ✓ PASS |
| sortSchools export | `export function sortSchools` in source | Present | ✓ PASS |
| E2E shared URL restore | `pnpm e2e -- e2e/smoke.spec.ts` | Blocked — existing dev server on :3001 prevents Playwright webServer start | ? SKIP |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ---------- | ----------- | ------ | -------- |
| DISC-01 | 05-01 | Search usable with labeling, counts, responsive feedback | ✓ SATISFIED | `SchoolSearch` label; count row; debounce + pending indicator |
| DISC-02 | 05-02 | Intuitive filters, active summary, reset | ✓ SATISFIED | Tiered `SchoolFilters`; `ActiveFilterSummary`; reset in summary, empty states, sheet footer |
| DISC-03 | 05-01 | Sort directory results | ✓ SATISFIED | `SchoolDirectorySort` + `sortSchools` (name, coverage, tier); roadmap requires name+coverage minimum |
| DISC-04 | 05-01, 05-02, 05-03 | Shareable URL restores view | ✓ SATISFIED | Full param serialization; e2e cold-load test (pending env run) |
| DISC-05 | 05-03 | Empty states explain and suggest broadening | ✓ SATISFIED | Contextual empty states with chip bullets, clear-search, methodology link, few-results tip |
| DISC-06 | 05-02 | Mobile layout and controls | ✓ SATISFIED | Mobile Sheet, sticky bar, 44px targets; human UX confirmation recommended |
| DISC-07 | 05-01, 05-03 | Responsive filtering at current scale | ✓ SATISFIED | Memoized pipeline; debounce; scaling comment in `filterSchools` |
| DISC-08 | 05-01, 05-03 | Research depth and discoverability cues | ✓ SATISFIED | Header counts; card badges; coverage %; tier help affordance |

**Orphaned requirements:** None — all 8 DISC IDs mapped to Phase 5 in REQUIREMENTS.md and claimed in plan frontmatter.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| — | — | No TODO/FIXME/placeholder stubs in phase artifacts | — | — |
| `ActiveFilterSummary/index.tsx` | 21 | `return null` when no chips | ℹ️ Info | Intentional — hides empty summary, not a stub |
| `SchoolSearch/index.tsx` | 22 | `placeholder="Digite o nome da escola"` | ℹ️ Info | Legitimate input placeholder, not stub data |

No blocker anti-patterns found in phase deliverables.

### Human Verification Required

### 1. Mobile directory Sheet UX

**Test:** Resize to 375×812, open `/schools`, tap "Filtros", toggle district checkboxes, tap "Aplicar filtros", scroll results.
**Expected:** Sheet slides from right; no horizontal page scroll; buttons feel tappable; URL and results update.
**Why human:** Tap comfort and overflow behavior need real viewport testing.

### 2. Search responsiveness feel

**Test:** Type several characters quickly in the search field.
**Expected:** Immediate input update; "· Atualizando…" appears briefly; settled count updates without lag on 10 schools.
**Why human:** Perceived responsiveness and aria-live behavior need browser interaction.

### 3. E2E shared URL restore

**Test:** Run `pnpm e2e -- e2e/smoke.spec.ts` in clean environment (no conflicting dev server).
**Expected:** `restores directory view from shared URL with search and sort` passes.
**Why human:** Verifier could not execute e2e due to port 3001 conflict; test code is present and structurally correct.

### Gaps Summary

No implementation gaps found. All roadmap success criteria, plan must-haves, requirement IDs, and artifacts are substantively implemented and wired. Automated unit tests (74/74) pass.

Phase status is **human_needed** — not because of missing code, but because mobile UX feel, search responsiveness perception, and e2e execution require human or CI confirmation before marking the phase fully closed.

---

_Verified: 2026-07-11T20:22:00Z_
_Verifier: Claude (gsd-verifier)_
