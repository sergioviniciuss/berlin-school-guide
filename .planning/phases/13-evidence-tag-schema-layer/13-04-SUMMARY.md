---
phase: 13-evidence-tag-schema-layer
plan: 04
subsystem: evidence
tags: [zod, schoolSchema, tags, qualitativeLastReviewed, validateTagEvidence, validate:data, tdd]

requires:
  - phase: 13-02
    provides: schoolTagSchema + TagConfidence + tagCitation with independenceLog
  - phase: 13-03
    provides: validateTagEvidence pure function
provides:
  - optional tags + qualitativeLastReviewed on schoolSchema
  - superRefine gates for tag evidence and conditional review date
  - synthetic tagged/invalid school fixtures
affects:
  - Phase 14 (pilot tag authoring on real schools)
  - Phase 15 (profile UI chips consume School.tags)

tech-stack:
  added: []
  patterns:
    - "Optional tags/qualitativeLastReviewed at object level; required via superRefine when tags.length > 0"
    - "validateTagEvidence loop in schoolSchema.superRefine after field citation gates"

key-files:
  created: []
  modified:
    - src/features/schools/school/index.ts
    - src/features/schools/school/fixtures.ts
    - src/features/schools/school/index.test.ts

key-decisions:
  - "qualitativeLastReviewed required iff (tags?.length ?? 0) > 0 — empty tags[] does not require it"
  - "Real Lichtenberg schools left untagged; validate:data green without placeholder dates"

patterns-established:
  - "Tag evidence failures surface as custom Zod issues at path tags[index]"
  - "Verified-field allowlist message mentions primary/secondary + allowlisted source type"

requirements-completed: [TAG-01, TAG-03]

duration: 2min
completed: 2026-07-29
---

# Phase 13 Plan 04: schoolSchema Tags Wiring Summary

**Optional `tags` + conditional `qualitativeLastReviewed` (YYYY-MM-DD) on `schoolSchema`, with `validateTagEvidence` in `superRefine`, keeping all 10 real Lichtenberg schools valid untagged.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-07-29T17:52:43Z
- **Completed:** 2026-07-29T17:54:08Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Wired optional `tags` (`schoolTagSchema[]`) and `qualitativeLastReviewed` (`z.string().date()`) onto `schoolSchema`
- Connected `validateTagEvidence` in `superRefine`; reject non-empty tags without review date
- Synthetic fixtures prove accept (tagged + empty tags) and reject (missing date, community-only, bad date format)
- `pnpm validate:data` green for 2 fixtures + 10 real untagged schools; evidence/schools Jest 278 tests green

## Task Commits

Each task was committed atomically (TDD RED → GREEN; Task 2 verification-only):

1. **Task 1 RED: failing tests for optional tags on schoolSchema** - `161d578` (test)
2. **Task 1 GREEN: wire optional tags and qualitativeLastReviewed** - `4ca58d0` (feat)
3. **Task 2: Prove validate:data green** - no code commit (gate already green; no real-school edits)

**Plan metadata:** `2b78a28` (docs: complete plan)

## TDD Gate Compliance

- RED gate: `161d578` — 5 new cases failed (unknown keys stripped / no gates)
- GREEN gate: `4ca58d0` — all school suite tests pass
- REFACTOR: not needed

## Files Created/Modified

- `src/features/schools/school/index.ts` — optional tags + qualitativeLastReviewed; tag superRefine gates; allowlist error message
- `src/features/schools/school/fixtures.ts` — `validTaggedSchool`, `invalidTaggedWithoutReviewDate`, `invalidCommunityOnlyTag`
- `src/features/schools/school/index.test.ts` — TAG-01 accept/reject integration cases

## Decisions Made

- Conditional review-date trigger is `(school.tags?.length ?? 0) > 0` so omitted tags and `tags: []` stay valid without a date (D-14/D-15)
- No tags or placeholder `qualitativeLastReviewed` authored on real Lichtenberg records (VAL-01)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None (sandbox blocked `tsx` IPC for `validate:data` once; re-ran with unrestricted permissions)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 13 schema layer complete: optional tags parse-ready for Phase 14 pilot authoring
- Non-pilot schools remain untagged and pass `validate:data`
- No stubs blocking TAG-01/TAG-03 goals

## Self-Check: PASSED

- FOUND: `src/features/schools/school/index.ts`
- FOUND: `src/features/schools/school/fixtures.ts`
- FOUND: `src/features/schools/school/index.test.ts`
- FOUND: commit `161d578`
- FOUND: commit `4ca58d0`
