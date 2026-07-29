---
phase: 13-evidence-tag-schema-layer
plan: 01
subsystem: evidence
tags: [zod, source-types, factual-allowlist, formatSourceType, validateFieldCitations]

requires:
  - phase: 12-editorial-research-framework
    provides: Canonical source hierarchy + reliability/source-type editorial rules
provides:
  - journalism and triangulated_community sourceTypeSchema values
  - isAcceptableFactualEvidence allowlist for verified factual fields
  - PT-BR formatSourceType labels for new displayable types
  - SOURCE_TYPE_ORDER extension for Fontes grouping
  - D-06 Reliability Levels doc correction (four reliability values only)
affects:
  - 13-02 (tag schema / validateTagEvidence)
  - 13-04 (school superRefine / validate:data)
  - 15 (profile Fontes / tag UI)

tech-stack:
  added: []
  patterns:
    - "Factual verification = acceptable reliability AND sourceType allowlist (not exclusion-only)"
    - "triangulated_community is sourceType only; reliability stays primary|secondary|anecdotal|unknown"

key-files:
  created: []
  modified:
    - src/features/evidence/sourceTypes/index.ts
    - src/features/evidence/sourceTypes/index.test.ts
    - src/features/evidence/source/fixtures.ts
    - src/features/evidence/validateFieldCitations/index.ts
    - src/features/evidence/validateFieldCitations/index.test.ts
    - src/features/evidence/formatSourceType/index.ts
    - src/features/evidence/formatSourceType/index.test.ts
    - src/features/schools/collectCitedSources/index.ts
    - docs/RESEARCH.md

key-decisions:
  - "Factual allowlist includes official_* + school_website + public_dataset + journalism; excludes triangulated_community and anecdotal_reserved"
  - "Reliability Levels in RESEARCH.md point community evidence to Canonical Source Types + Community Source Independence"

patterns-established:
  - "isAcceptableFactualEvidence(source) for verified-field gates (T-13-01)"
  - "formatSourceType returns null for anecdotal_reserved; displayable community/journalism get locked PT-BR strings"

requirements-completed: [TAG-02]

duration: 1min
completed: 2026-07-29
---

# Phase 13 Plan 01: Evidence Source-Type Axis Summary

**Extended sourceTypeSchema with journalism + triangulated_community, hardened verified-field citations via isAcceptableFactualEvidence allowlist, and corrected Reliability Levels so community is source-type-only.**

## Performance

- **Duration:** 1 min
- **Started:** 2026-07-29T17:44:15Z
- **Completed:** 2026-07-29T17:45:32Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments

- Added `journalism` and `triangulated_community` to `sourceTypeSchema` before `anecdotal_reserved`; reliability enum unchanged at four values
- Shipped `acceptableFactualSourceTypes` + `isAcceptableFactualEvidence` and wired it into `validateFieldCitations` so community cannot verify factual fields even with secondary reliability
- Locked PT-BR labels (`Jornalismo independente`, `Fontes comunitárias trianguladas`), extended `SOURCE_TYPE_ORDER`, and fixed D-06 drift in `docs/RESEARCH.md`

## Task Commits

Each task was committed atomically (TDD RED → GREEN):

1. **Task 1 RED:** `35721aa` — test(13-01): add failing test for source types and factual allowlist
2. **Task 1 GREEN:** `4588a30` — feat(13-01): extend source types with factual allowlist and D-06 fix
3. **Task 2 RED:** `26beed5` — test(13-01): add failing tests for citation allowlist and format labels
4. **Task 2 GREEN:** `a9d9b0d` — feat(13-01): wire factual allowlist into citations and format labels

**Plan metadata:** (pending final docs commit)

## Files Created/Modified

- `src/features/evidence/sourceTypes/index.ts` — new source types + factual allowlist helper
- `src/features/evidence/sourceTypes/index.test.ts` — enum/allowlist coverage
- `src/features/evidence/source/fixtures.ts` — journalismSource, communitySourceA/B
- `src/features/evidence/validateFieldCitations/index.ts` — uses `isAcceptableFactualEvidence`
- `src/features/evidence/validateFieldCitations/index.test.ts` — journalism pass / community fail
- `src/features/evidence/formatSourceType/index.ts` — PT-BR labels for new types
- `src/features/evidence/formatSourceType/index.test.ts` — label + null anecdotal cases
- `src/features/schools/collectCitedSources/index.ts` — SOURCE_TYPE_ORDER includes new displayable types
- `docs/RESEARCH.md` — Reliability Levels corrected (D-06)

## Decisions Made

- Factual allowlist membership matches plan D-05 required inclusions/exclusions exactly
- RESEARCH Reliability Levels prose cross-links Canonical Source Types / Community Source Independence instead of listing `triangulated_community` as a reliability bullet

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- TAG-02 foundation ready for Plan 02 (tag schema / `validateTagEvidence`) and later school `superRefine` error-string updates in Plan 04
- Real school fixtures remain untagged; `validate:data` path not changed in this plan

## TDD Gate Compliance

- RED commits present: `35721aa`, `26beed5`
- GREEN commits present after RED: `4588a30`, `a9d9b0d`
- No REFACTOR commits needed

## Self-Check: PASSED

- All key artifacts present (sourceTypes, validateFieldCitations, formatSourceType, collectCitedSources, RESEARCH.md, SUMMARY)
- All task commits found: `35721aa`, `4588a30`, `26beed5`, `a9d9b0d`

---
*Phase: 13-evidence-tag-schema-layer*
*Completed: 2026-07-29*
