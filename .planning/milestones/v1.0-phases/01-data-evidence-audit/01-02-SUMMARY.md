---
phase: 01-data-evidence-audit
plan: 01-02
subsystem: data
tags: [evidence-coverage, v2, directory, scoring, zod]

requires:
  - phase: 01-01
    provides: Honest field evidence statuses including not_confirmed for inferred fields
provides:
  - evidenceCoverageVersion v2 with level-aware field path sets
  - getImportantFieldPathsForCoverage helper selecting directory (11) vs detailed (23) denominators
  - calculateEvidenceCoverage counting only verified fields in numerator
  - getCoverageTierLabel Portuguese tier labels
  - SchoolDirectoryItem extended with coverageLevel, researchStatus, coverageTierLabel
affects:
  - 01-03 (SchoolCard UI badges and tier display)
  - filterSchools (coverage percentage ranges reflect v2 scoring)

tech-stack:
  added: []
  patterns:
    - "Coverage denominator selected by school.research.coverageLevel via getImportantFieldPathsForCoverage"
    - "Only verified fields count toward coverage numerator; not_confirmed excluded"

key-files:
  created:
    - src/features/schools/getCoverageTierLabel/index.ts
    - src/features/schools/getCoverageTierLabel/index.test.ts
  modified:
    - src/features/schools/school/constants.ts
    - src/features/evidence/calculateEvidenceCoverage/index.ts
    - src/features/evidence/calculateEvidenceCoverage/index.test.ts
    - src/features/schools/filterSchools/types.ts
    - src/features/schools/schoolDirectoryData/index.ts
    - src/features/schools/schoolDirectoryData/index.test.ts
    - src/features/schools/filterSchools/index.test.ts

key-decisions:
  - "Kept importantSchoolFieldPathsV1 as deprecated alias pointing to detailed v2 paths for backward compatibility"
  - "Used ResearchStatus schema type for SchoolDirectoryItem.researchStatus instead of plan's unpublished 'published' literal"
  - "Directory schools measured against 11 portrait-appropriate fields; detailed schools against full 23-field set"

patterns-established:
  - "getCoverageTierLabel: directory → Pesquisa básica, detailed → Pesquisa detalhada"
  - "toSchoolDirectoryItem maps research metadata and tier label alongside evidenceCoverage"

requirements-completed: [DATA-03]

duration: 16min
completed: 2026-07-11
---

# Phase 01 Plan 02: Evidence Coverage v2 Summary

**Level-aware coverage v2 scores directory schools on 11 portrait fields and detailed schools on 23, counting only verified evidence in the numerator**

## Performance

- **Duration:** 16 min
- **Started:** 2026-07-11T11:00:00Z
- **Completed:** 2026-07-11T11:16:00Z
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments

- Bumped `evidenceCoverageVersion` to v2 with separate directory (11) and detailed (23) field path arrays
- Updated `calculateEvidenceCoverage` to select paths from `school.research.coverageLevel` and count only `verified` fields
- Added `getCoverageTierLabel` and extended `SchoolDirectoryItem` with coverage tier metadata for UI consumption in plan 01-03

## Task Commits

Each task was committed atomically:

1. **Task 1: Define v2 field paths and bump coverage version** - `d8c2403` (feat)
2. **Task 2: Update calculateEvidenceCoverage for level-aware v2** - `9724673` (feat)
3. **Task 3: Add coverage tier label and extend SchoolDirectoryItem** - `b67817d` (feat)

## Files Created/Modified

- `src/features/schools/school/constants.ts` - v2 version, directory/detailed path sets, `getImportantFieldPathsForCoverage`
- `src/features/evidence/calculateEvidenceCoverage/index.ts` - level-aware path selection and verified-only numerator
- `src/features/evidence/calculateEvidenceCoverage/index.test.ts` - v2 expectations, not_confirmed exclusion, denominator comparison
- `src/features/schools/getCoverageTierLabel/index.ts` - Portuguese tier label helper
- `src/features/schools/getCoverageTierLabel/index.test.ts` - 2 unit tests
- `src/features/schools/filterSchools/types.ts` - extended `SchoolDirectoryItem` type
- `src/features/schools/schoolDirectoryData/index.ts` - maps coverage tier fields in `toSchoolDirectoryItem`
- `src/features/schools/schoolDirectoryData/index.test.ts` - expects v2 and new metadata fields
- `src/features/schools/filterSchools/index.test.ts` - synthetic fixtures for all three coverage filter ranges under v2

## Decisions Made

- Kept `importantSchoolFieldPathsV1` as a deprecated alias to avoid breaking any downstream references before cleanup
- Used `ResearchStatus` from the Zod schema for `SchoolDirectoryItem.researchStatus` (schema uses `profile_ready`, not `published`)
- Real Lichtenberg directory schools now score 91–100% against the 11-field directory set instead of 52–86% against the old 23-field denominator

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated filterSchools coverage range test for v2 percentages**
- **Found during:** Task 3 (Add coverage tier label)
- **Issue:** Real schools no longer fall in 50–79% or 0–49% buckets after v2 level-aware scoring (all directory schools ≥91%)
- **Fix:** Added synthetic directory items with controlled verified counts (55% and 0%) alongside real schools for 80–100% range
- **Files modified:** `src/features/schools/filterSchools/index.test.ts`
- **Verification:** `pnpm test --testPathPatterns=filterSchools` passes
- **Committed in:** `b67817d` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 bug/test breakage from v2 scoring)
**Impact on plan:** Test fix required for correctness; no scope creep.

## Issues Encountered

- Jest 30 requires `--testPathPatterns` (plural) instead of plan's `--testPathPattern` flag

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 01-03 can read `coverageLevel`, `coverageTierLabel`, and v2 `evidenceCoverage` from `SchoolDirectoryItem` for card badges and tier display
- Coverage percentages now honestly reflect declared research scope; directory schools no longer penalized for missing detailed fields

## Self-Check: PASSED

- FOUND: src/features/schools/school/constants.ts
- FOUND: src/features/evidence/calculateEvidenceCoverage/index.ts
- FOUND: src/features/schools/getCoverageTierLabel/index.ts
- FOUND: src/features/schools/getCoverageTierLabel/index.test.ts
- FOUND: d8c2403
- FOUND: 9724673
- FOUND: b67817d

---
*Phase: 01-data-evidence-audit*
*Completed: 2026-07-11*
