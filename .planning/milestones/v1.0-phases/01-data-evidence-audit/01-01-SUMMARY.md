---
phase: 01-data-evidence-audit
plan: 01-01
subsystem: data
tags: [zod, field-evidence, school-data, inference, lichtenberg]

requires: []
provides:
  - inferredFrom() helper for cross-field evidence with mandatory Portuguese notes
  - primarySchool() explicit inference rules replacing silent verified fallbacks
  - All 10 Lichtenberg schools audited with honest directory_only metadata
affects:
  - 01-02 (coverage v2 numerator/denominator rules)
  - 01-03 (UI distinction for not_confirmed inferred fields)

tech-stack:
  added: []
  patterns:
    - "inferredFrom() centralizes cross-field inference as not_confirmed with citations preserved"
    - "Directory-only schools default inspectionAvailability to missing, not portrait not_confirmed"

key-files:
  created:
    - src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.ts
    - src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.test.ts
    - src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/types.ts
  modified:
    - src/content/schools/real/lichtenbergPrimarySchools/index.ts
    - src/features/evidence/fieldEvidence/index.ts
    - src/features/schools/formatSchoolField/index.ts

key-decisions:
  - "Added not_confirmed to FieldEvidence schema so inferred fields validate and display distinctly"
  - "Downgraded Adam-Ries, Lew-Tolstoi, and Richard-Wagner to directory_only after audit (<8 independently verified detailed fields)"
  - "Kept Lew-Tolstoi and Richard-Wagner afterSchoolCare verified via independent Ganztag page citations"

patterns-established:
  - "Cross-field inference: inferredFrom({ sourceField, sourceEvidence, note }) → not_confirmed"
  - "Unchecked bilingual/international programs default to missing, not not_applicable"

requirements-completed: [DATA-01, DATA-02]

duration: 18min
completed: 2026-07-11
---

# Phase 01 Plan 01: Evidence Data Integrity Summary

**Explicit `inferredFrom()` helper and `primarySchool()` refactor stop cross-field verified inflation across all 10 Lichtenberg school records**

## Performance

- **Duration:** 18 min
- **Started:** 2026-07-11T10:57:00Z
- **Completed:** 2026-07-11T11:15:00Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- Created `inferredFrom()` returning `not_confirmed` evidence with mandatory Portuguese notes and preserved citations
- Refactored `primarySchool()` to route ganztag→afterSchoolCare and offers→schoolProfile/pedagogyFocus through explicit inference
- Audited all 10 schools: explicit `directory_only`/`directory` metadata; downgraded three formerly-detailed schools per D-19 threshold
- `pnpm validate:data`, `pnpm typecheck`, and inferredFrom unit tests all pass

## Task Commits

Each task was committed atomically:

1. **Task 1: Create inferredFrom helper with tests** - `95d9b2f` (feat)
2. **Task 2: Refactor primarySchool() to use explicit inference rules** - `3691f17` (refactor)
3. **Task 3: Audit all 10 Lichtenberg school records field-by-field** - `8e12ba8` (fix)

## Files Created/Modified

- `src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.ts` - inferredFrom() implementation
- `src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/types.ts` - InferredFromInput type
- `src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.test.ts` - 4 unit tests
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` - primarySchool() inference rules + school audit
- `src/features/evidence/fieldEvidence/index.ts` - added `not_confirmed` to fieldStatusSchema
- `src/features/schools/formatSchoolField/index.ts` - Portuguese label for not_confirmed status

## Decisions Made

- Added `not_confirmed` to the Zod evidence schema (required for validate:data to accept inferred fields)
- Applied D-19 downgrade to all three spike-detailed schools after counting independently verified detailed fields (5, 6, and 7 respectively — all below the ≥8 bar)
- Preserved portrait-verified explicit overrides on Adam-Ries where the official portrait directly states the offer (not cross-field inference)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added `not_confirmed` to FieldEvidence schema**
- **Found during:** Task 1 (Create inferredFrom helper)
- **Issue:** Plan specifies `status: "not_confirmed"` but `fieldStatusSchema` only had `unverified`; validate:data would reject inferred fields
- **Fix:** Added `not_confirmed` to schema and `formatFieldStatus` labels
- **Files modified:** `src/features/evidence/fieldEvidence/index.ts`, `src/features/schools/formatSchoolField/index.ts`
- **Verification:** `pnpm validate:data` passes with inferred school fields
- **Committed in:** `95d9b2f` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Schema extension required for correctness; no scope creep.

## Issues Encountered

- `pnpm validate:data` failed in sandbox (tsx IPC EPERM); succeeded with full permissions
- Jest 30 uses `--testPathPatterns` not `--testPathPattern`; tests pass with updated flag

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 01-02 can implement coverage v2 counting rules knowing upstream data no longer inflates verified via fallbacks
- Plan 01-03 can style `not_confirmed` inferred fields in SchoolCard UI
- Dead `notApplicable()` helper remains in `lichtenbergPrimarySchools/index.ts` (unused after refactor) — safe to remove in a cleanup pass

## Self-Check: PASSED

- FOUND: src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.ts
- FOUND: src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/index.test.ts
- FOUND: src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/types.ts
- FOUND: src/content/schools/real/lichtenbergPrimarySchools/index.ts
- FOUND: 95d9b2f
- FOUND: 3691f17
- FOUND: 8e12ba8

---
*Phase: 01-data-evidence-audit*
*Completed: 2026-07-11*
