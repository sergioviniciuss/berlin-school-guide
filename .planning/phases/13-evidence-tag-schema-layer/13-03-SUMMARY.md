---
phase: 13-evidence-tag-schema-layer
plan: 03
subsystem: evidence
tags: [zod, validateTagEvidence, triangulation, confidence, never-sole-basis, tdd]

requires:
  - phase: 13-01
    provides: acceptableFactualSourceTypes + journalism/community source fixtures
  - phase: 13-02
    provides: schoolTagSchema, tagCitation with independenceLog, TagConfidence enum
provides:
  - validateTagEvidence pure function enforcing TAG-03/TAG-04
  - Fixture matrix for community triangulation and confidence consistency
affects:
  - 13-04 (schoolSchema superRefine / validate:data)
  - Phase 14 (pilot tag authoring must satisfy validator)

tech-stack:
  added: []
  patterns:
    - "Pure validateTagEvidence(tag, sources) → {ok} | {ok:false, messages}"
    - "Bidirectional derived confidence vs declared (multi-source > official > partial)"
    - "Community never-sole-basis independent of confidence"

key-files:
  created:
    - src/features/evidence/validateTagEvidence/index.ts
    - src/features/evidence/validateTagEvidence/index.test.ts
    - src/features/evidence/validateTagEvidence/fixtures.ts
  modified: []

key-decisions:
  - "Multi-source predicate includes triangulated_community sourceIds only for active-school-community"
  - "Distinct independenceLog.venue enforced across community citations on the same tag (A6)"

patterns-established:
  - "Resolve citations via Map(sources by id); English technical messages only"
  - "Never-sole-basis checked before confidence so community-only cannot pass as partial"

requirements-completed: [TAG-03, TAG-04]

duration: 1min
completed: 2026-07-29
---

# Phase 13 Plan 03: validateTagEvidence Summary

**Pure `validateTagEvidence` enforcing triangulation (≥2 community + ≥1 non-community), independence logs with distinct venues, D-09 non-community restrictions, and bidirectional confidence↔citation consistency.**

## Performance

- **Duration:** 1 min
- **Started:** 2026-07-29T17:49:49Z
- **Completed:** 2026-07-29T17:50:55Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- RED matrix: 11 cases covering unknown sourceId, never-sole-basis, <2 community, missing log, valid triangulated accept, D-09 rejects, and confidence under/over-claim
- GREEN implementation: Map-by-sourceId resolution, community path (D-07/D-08/D-10), non-community bans, Pattern 5 confidence derivation with multi-source precedence
- Stub returned `{ ok: false, messages: ["not implemented"] }` so accept cases failed RED; all 11 green after implementation

## Task Commits

Each task was committed atomically (TDD RED → GREEN):

1. **Task 1 RED: failing validateTagEvidence test matrix** - `2c58b41` (test)
2. **Task 2 GREEN: implement validateTagEvidence rules** - `522b70b` (feat)

**Plan metadata:** _(pending final docs commit)_

## TDD Gate Compliance

- RED gate: `2c58b41` — accept cases failed with "not implemented"; reject cases passed via stub
- GREEN gate: `522b70b` — all 11 matrix tests pass
- REFACTOR: not needed

## Files Created/Modified

- `src/features/evidence/validateTagEvidence/index.ts` — `validateTagEvidence` rules engine
- `src/features/evidence/validateTagEvidence/index.test.ts` — TAG-03/TAG-04 accept/reject matrix
- `src/features/evidence/validateTagEvidence/fixtures.ts` — composed Plan 01 sources + independence logs + tag fixtures

## Decisions Made

- Multi-source qualifying set includes `triangulated_community` only when `tag.id === "active-school-community"` (Pattern 5)
- Distinct `independenceLog.venue` required across community citations (RESEARCH A6)
- Precedence: multi-source → `confirmed_multi_source`; else official-class → `confirmed_official`; else `partial`

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `validateTagEvidence` ready to wire into `schoolSchema.superRefine` in Plan 13-04
- No stubs that block TAG-03/TAG-04 goals

## Self-Check: PASSED

- FOUND: `src/features/evidence/validateTagEvidence/index.ts`
- FOUND: `src/features/evidence/validateTagEvidence/index.test.ts`
- FOUND: `src/features/evidence/validateTagEvidence/fixtures.ts`
- FOUND: commit `2c58b41`
- FOUND: commit `522b70b`

---
*Phase: 13-evidence-tag-schema-layer*
*Completed: 2026-07-29*
