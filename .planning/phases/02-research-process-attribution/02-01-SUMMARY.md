---
phase: 02-research-process-attribution
plan: 01
subsystem: docs
tags: [research-workflow, evidence, citations, validate:data, inferredFrom]

# Dependency graph
requires:
  - phase: 01-data-evidence-audit
    provides: inferredFrom helper, coverage v2 denominators, honest field statuses
provides:
  - Executable school research checklist for humans and AI sessions
  - Per-field decision trees mirroring Phase 1 code semantics
  - Completion gate and re-research date update procedure
affects:
  - 02-research-process-attribution (plans 02-02, 02-03)
  - citation audit and date validation work

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Policy in docs/RESEARCH.md; procedural checklist in docs/research/SCHOOL_RESEARCH_WORKFLOW.md"
    - "inferredFrom always yields not_confirmed; validate:data as completion gate"

key-files:
  created:
    - docs/research/SCHOOL_RESEARCH_WORKFLOW.md
  modified: []

key-decisions:
  - "Cross-link RESEARCH.md as policy authority instead of duplicating source hierarchy (D-03)"
  - "Document per-source dateAccessed individually, not shared constants (D-14, D-15)"
  - "Directory-only inspectionAvailability defaults to missing, not not_confirmed (D-04)"

patterns-established:
  - "Workflow doc structure: prerequisites → source discovery → record setup → decision trees → completion gate → re-research"
  - "Decision trees use numbered steps with explicit status outcomes per field type"

requirements-completed: [RSCH-01]

# Metrics
duration: 1min
completed: 2026-07-11
---

# Phase 2 Plan 01: School Research Workflow Document Summary

**Executable research checklist with per-field decision trees, coverage v2 tiers, and validate:data completion gate — cross-linked to RESEARCH.md policy without duplication**

## Performance

- **Duration:** 1 min
- **Started:** 2026-07-11T12:02:10Z
- **Completed:** 2026-07-11T12:02:48Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Created `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` as a step-by-step checklist for human researchers and AI sessions
- Documented source discovery order, record setup in `lichtenbergPrimarySchools`, and per-field decision trees for ganztag, afterSchoolCare, profile fields, bilingual/international programs, and inspection availability
- Referenced Phase 1 artifacts: `inferredFrom()`, coverage v2 (11/23 fields, Pesquisa básica/detailed), citation rules, date update rules, and `pnpm validate:data` completion gate
- Added explicit re-research procedure requiring both `lastResearched` and `lastSourceChecked` updates (D-18)

## Task Commits

Each task was committed atomically:

1. **Task 1: Write workflow structure and source discovery checklist** - `d8ddb78` (docs)
2. **Task 2: Add per-field decision trees, completion gate, and re-research procedure** - `c7c3ac8` (docs)

## Files Created/Modified

- `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` - Executable research checklist with prerequisites, source discovery, record setup, per-field decision trees, inference/citation/coverage rules, date updates, completion gate, and re-research procedure

## Decisions Made

- Cross-linked `docs/RESEARCH.md` as policy authority per D-03; workflow describes procedure only
- Documented `inferredFrom()` as always producing `not_confirmed`, never `verified`, matching Phase 1 code
- Directory-tier `inspectionAvailability` defaults to `missing` rather than portrait-derived `not_confirmed`

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Workflow doc ready for researchers auditing the 10 Lichtenberg schools (Plan 02-02)
- Citation completeness audit and per-school date fixes can follow workflow date rules
- Methodology page (Plan 02-03) can reference coverage tier labels documented here

## Self-Check: PASSED

- FOUND: docs/research/SCHOOL_RESEARCH_WORKFLOW.md
- FOUND: .planning/phases/02-research-process-attribution/02-01-SUMMARY.md
- FOUND: d8ddb78
- FOUND: c7c3ac8

---
*Phase: 02-research-process-attribution*
*Completed: 2026-07-11*
