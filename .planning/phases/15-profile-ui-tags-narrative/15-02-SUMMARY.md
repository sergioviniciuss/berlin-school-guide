---
phase: 15-profile-ui-tags-narrative
plan: 02
subsystem: ui
tags: [fontes, citations, citedBy, tags, collectCitedSources, SourcesSection, tdd]

requires:
  - phase: 15-profile-ui-tags-narrative
    provides: Wave 0 RED collectCitedSources + SourcesSection cite-back tests
  - phase: 13-evidence-tag-schema-layer
    provides: formatTagId and school.tags citation shape
provides:
  - CitedSourceEntry.citedBy unique PT-BR labels
  - Field ∪ tag Fontes merge deduped by source id
  - SourcesSection "Citado em:" line when citedBy non-empty
affects:
  - 15-03+ (SchoolProfile qualitative chrome consuming Fontes)
  - NARR-05 Fontes merge visibility

tech-stack:
  added: []
  patterns:
    - citedByBySourceId Map<string, Set<string>> for label uniqueness
    - React text-node cite-back (no dangerouslySetInnerHTML)

key-files:
  created: []
  modified:
    - src/features/schools/collectCitedSources/types.ts
    - src/features/schools/collectCitedSources/index.ts
    - src/features/schools/SourcesSection/index.tsx

key-decisions:
  - "No perfilDaEscola invented cite-back — only field paths and tag ids contribute to citedBy"
  - "citedBy sorted with localeCompare pt-BR for stable Fontes output"

patterns-established:
  - "Fontes aggregation: fields first, then school.tags loop; skip unknown sourceIds via sourceById.has"
  - "Citado em: omitted when citedBy.length === 0"

requirements-completed: [NARR-05]

duration: 1min
completed: 2026-07-30
---

# Phase 15 Plan 02: Fontes Tag Merge & Cite-Back Summary

**Field+tag Fontes merge with unique PT-BR citedBy labels and conditional “Citado em:” in SourcesSection**

## Performance

- **Duration:** 1 min
- **Started:** 2026-07-30T05:46:59Z
- **Completed:** 2026-07-30T05:48:18Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Extended `CitedSourceEntry` with `citedBy: string[]` and merged tag citations into `collectCitedSources` (dedupe by source id)
- Field labels from `profileFieldLabels`, tag labels from `formatTagId`; no invented `perfilDaEscola` cite associations
- SourcesSection renders “Citado em:” after publisher/date metadata only when `citedBy` is non-empty

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend collectCitedSources for tags + citedBy** - `fd0dd52` (feat)
2. **Task 2: Render Citado em: in SourcesSection** - `f236cad` (feat)

**Plan metadata:** `77a67d6` (docs: complete plan)

_Note: RED tests shipped in Plan 00; this plan greens Wave 0 Fontes cite-back scaffolds._

## Files Created/Modified
- `src/features/schools/collectCitedSources/types.ts` - `citedBy` on `CitedSourceEntry`
- `src/features/schools/collectCitedSources/index.ts` - field ∪ tag aggregation with label sets
- `src/features/schools/SourcesSection/index.tsx` - conditional “Citado em:” line; unused imports removed

## Decisions Made
- No `perfilDaEscola` invented cite-back — only field paths and tag ids contribute to `citedBy` (RESEARCH A2 / plan interfaces)
- `citedBy` sorted with `localeCompare(..., "pt-BR")` for stable Fontes output

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed unused `Link` import alongside planned dead imports**
- **Found during:** Task 2 (SourcesSection cite-back)
- **Issue:** `next/link` `Link` was unused (same dead-import class as the three named in the plan)
- **Fix:** Removed `Link` import with `calculateEvidenceCoverage`, `formatFieldStatus`, `getCoverageTierLabel`
- **Files modified:** `src/features/schools/SourcesSection/index.tsx`
- **Verification:** `pnpm test -- SourcesSection collectCitedSources` green
- **Committed in:** `f236cad` (Task 2)

---

**Total deviations:** 1 auto-fixed (1 blocking cleanup)
**Impact on plan:** No scope creep; keeps SourcesSection free of unused imports.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- NARR-05 Fontes UI complete at component level
- Ready for Plan 03 (TagsSection grouping by category) and later SchoolProfile wiring of qualitative chrome into the live Fontes pipeline

## Self-Check: PASSED

- FOUND: `src/features/schools/collectCitedSources/types.ts`
- FOUND: `src/features/schools/collectCitedSources/index.ts`
- FOUND: `src/features/schools/SourcesSection/index.tsx`
- FOUND: `fd0dd52`
- FOUND: `f236cad`

---
*Phase: 15-profile-ui-tags-narrative*
*Completed: 2026-07-30*
