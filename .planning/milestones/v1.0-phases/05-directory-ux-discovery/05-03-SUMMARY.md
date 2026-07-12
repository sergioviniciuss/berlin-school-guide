---
phase: 05-directory-ux-discovery
plan: 03
subsystem: ui
tags: [react, playwright, nextjs, directory, empty-states, accessibility]

requires:
  - phase: 05-directory-ux-discovery
    provides: URL-synced filters, debounced search, sort controls from plans 05-01 and 05-02
provides:
  - Contextual empty states (filter-list vs search-only miss)
  - Shared getActiveFilterChips formatter for chips and empty states
  - SchoolCard tier help affordance with aria-label and title
  - Few-results tip for 1–2 directory matches
  - DISC-07 client-side filter scaling comment
  - Sort param documented in INFORMATION_ARCHITECTURE
  - E2E shared URL restore test with q and sort
affects: [06-comparison, directory-ux]

tech-stack:
  added: []
  patterns:
    - "Shared chip formatter in ActiveFilterSummary/utils for chips and empty-state bullets"
    - "Search-only empty state takes precedence when query set without array filters"
    - "Tier help via title + aria-label button (no Popover) inside card Link with stopPropagation"

key-files:
  created:
    - src/features/schools/ActiveFilterSummary/utils.ts
  modified:
    - src/features/schools/ActiveFilterSummary/index.tsx
    - src/features/schools/SchoolResults/index.tsx
    - src/features/schools/SchoolResults/index.test.tsx
    - src/features/schools/SchoolDirectory/index.tsx
    - src/features/schools/SchoolDirectory/index.test.tsx
    - src/features/schools/SchoolCard/index.tsx
    - src/features/schools/SchoolCard/index.test.tsx
    - src/features/schools/filterSchools/index.ts
    - docs/INFORMATION_ARCHITECTURE.md
    - e2e/smoke.spec.ts

key-decisions:
  - "Search-only miss (query without array filters) renders D-16 copy instead of generic filter empty state"
  - "Tier help uses HelpCircle button with title attribute — no Popover primitive per UI-SPEC discretion"

patterns-established:
  - "Empty states consume getActiveFilterChips labels as bullet list for active filter context"
  - "Few-results tip lives in SchoolDirectory count row area, not SchoolResults"

requirements-completed: [DISC-04, DISC-05, DISC-07, DISC-08]

duration: 25min
completed: 2026-07-11
---

# Phase 5 Plan 03: Empty States, Card Help, E2E, and Scaling Note Summary

**Contextual directory empty states, SchoolCard tier help, few-results tip, shareable URL e2e, and client-side filter scaling documentation**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-07-11T18:14:00Z
- **Completed:** 2026-07-11T18:39:00Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments

- SchoolResults renders filter-list empty state with active chip bullets, reset button, and methodology link; search-only miss shows dedicated heading and Limpar busca
- getActiveFilterChips extracted to ActiveFilterSummary/utils and reused by chips row and empty states
- SchoolCard coverage block keeps tier label and percentage with HelpCircle tier help (aria-label + title)
- SchoolDirectory shows "Poucos resultados — tente remover filtros" when 1–2 schools match
- filterSchools scaling comment and INFORMATION_ARCHITECTURE sort param documented; e2e verifies cold-load URL with q and sort=coverage

## Task Commits

Each task was committed atomically:

1. **Task 1: Shared chip formatter and contextual SchoolResults empty states** - `a5d7531` (feat)
2. **Task 2: SchoolCard tier help and few-results tip** - `b74c855` (feat)
3. **Task 3: DISC-07 scaling note, IA docs, and e2e URL share test** - `d5eae66` (feat)

**Plan metadata:** pending orchestrator (docs: complete plan)

## Files Created/Modified

- `src/features/schools/ActiveFilterSummary/utils.ts` - formatChipValue and getActiveFilterChips exports
- `src/features/schools/SchoolResults/index.tsx` - Contextual empty states with safe query text rendering
- `src/features/schools/SchoolDirectory/index.tsx` - Props wiring and few-results tip
- `src/features/schools/SchoolCard/index.tsx` - Tier help button beside coverage tier label
- `src/features/schools/filterSchools/index.ts` - DISC-07 scaling comment
- `docs/INFORMATION_ARCHITECTURE.md` - sort=name|coverage|tier query param
- `e2e/smoke.spec.ts` - Shared URL restore test; search-only empty assertion

## Decisions Made

- Search-only empty state takes precedence when query is set and all array filters are empty (UI-SPEC combined rule)
- Tier help uses native title tooltip with HelpCircle icon — no Popover component

## Deviations from Plan

None - plan executed exactly as written.

## TDD Gate Compliance

Tasks used tdd="true" but RED/GREEN were combined into single feat commits per task (tests and implementation landed together). All specified behaviors are covered by unit and e2e tests.

## Issues Encountered

- Playwright default webServer failed when dev server already running on port 3001; verified e2e locally with reuseExistingServer against existing server. Standard `pnpm e2e` works in clean CI environments.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Directory UX discovery phase empty/low-result UX complete
- Shareable URLs with filters, search, and sort verified end-to-end
- Ready for comparison phase (Phase 6) without directory profile changes

## Self-Check: PASSED

- FOUND: src/features/schools/ActiveFilterSummary/utils.ts
- FOUND: src/features/schools/SchoolResults/index.tsx
- FOUND: .planning/phases/05-directory-ux-discovery/05-03-SUMMARY.md
- FOUND: a5d7531
- FOUND: b74c855
- FOUND: d5eae66

---
*Phase: 05-directory-ux-discovery*
*Completed: 2026-07-11*
