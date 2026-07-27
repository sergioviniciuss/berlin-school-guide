---
phase: 12-editorial-research-framework
plan: 04
subsystem: docs
tags: [pilot-selection, markdown, editorial, research]

# Dependency graph
requires:
  - phase: 12-01
    provides: docs/RESEARCH.md Community Source Independence rules to cross-link from the community-evidence candidate note
  - phase: 12-02
    provides: docs/DECISIONS.md dated ADR entries for the pilot-selection/taxonomy decisions this rationale operationalizes
provides:
  - Written pilot-selection rationale in docs/research/PILOT_SELECTION.md naming 5 real Lichtenberg schools against the D-16 diversity dimensions
  - A provisional community-evidence candidate (Lew-Tolstoi-Schule) for the active-school-community triangulation workflow, with fail-closed explicitly framed as a valid success
affects: [14-pilot-profile]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Reused the docs/research/ standalone-file pattern (like SCHOOL_RESEARCH_WORKFLOW.md/REAL_SCHOOL_RESEARCH_SPIKE.md) with a Purpose section, policy-authority note, and relative Markdown cross-links back to docs/RESEARCH.md

key-files:
  created:
    - docs/research/PILOT_SELECTION.md
  modified: []

key-decisions:
  - "Named exactly the 5 schools from 12-RESEARCH.md's Pilot Candidate Analysis verbatim (Richard-Wagner-Schule, Lew-Tolstoi-Schule, Bernhard-Grzimek-Schule, Friedrichsfelder Schule, Seepark-Grundschule), including two distinct low-documentation reference points (one with a specialization claim, one with none)"
  - "Named Lew-Tolstoi-Schule as the provisional D-19 community-evidence candidate, explicitly stating a fail-closed outcome during Phase 14 research is a successful validation, not a phase failure"

patterns-established: []

requirements-completed: [FRAME-03]

# Metrics
duration: 8min
completed: 2026-07-26
---

# Phase 12 Plan 04: Pilot Selection Rationale Summary

**New `docs/research/PILOT_SELECTION.md` naming a 5-school pilot set (Richard-Wagner-Schule, Lew-Tolstoi-Schule, Bernhard-Grzimek-Schule, Friedrichsfelder Schule, Seepark-Grundschule) with per-school rationale against D-16's diversity dimensions, drawn from and verified against the real Lichtenberg dataset.**

## Performance

- **Duration:** 8 min
- **Tasks:** 1 completed
- **Files modified:** 1

## Accomplishments
- Recorded the D-16 pilot-selection criteria (5 diversity dimensions as coverage targets, not 1:1 seats) in `docs/research/PILOT_SELECTION.md`
- Named 5 real schools with per-school rationale, verified against `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (`researchStatus`, `offers`, slugs all match)
- Included two deliberately low-documentation schools (Bernhard-Grzimek-Schule with a specialization claim, Seepark-Grundschule with none) to pressure-test the taxonomy under thin evidence, per D-18 and Pitfall 3
- Named Lew-Tolstoi-Schule as the provisional community-evidence candidate for `active-school-community`, explicitly documenting that a fail-closed outcome is a valid, successful result per D-19
- Cross-linked the document back to `docs/RESEARCH.md`'s Community Source Independence rules using the existing relative-Markdown-link convention

## Task Commits

Each task was committed atomically:

1. **Task 1: Write docs/research/PILOT_SELECTION.md with criteria and the named pilot set** - `06c18a7` (docs)

_Note: Plan metadata commit follows this summary._

## Files Created/Modified
- `docs/research/PILOT_SELECTION.md` - New standalone document: Purpose, Criteria (D-16 dimensions), Selected Schools table (5 named schools with dimension + rationale), Community-Evidence Candidate note, and Data Source provenance line

## Decisions Made
- Used the plan's prescriptive content verbatim, since the school names, dimensions, and rationale were already cross-referenced against the real dataset and D-16/D-18/D-19 during Phase 12 research/planning
- Independently re-verified all 5 school slugs and `researchStatus` values against `src/content/schools/real/lichtenbergPrimarySchools/index.ts` before committing (per the plan's own `<verification>` requirement) — all matched exactly, including Seepark-Grundschule's absence of `offers`/`ganztag` fields

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- FRAME-03 is complete; Phase 12's full documentation scope (framework docs + methodology page + pilot rationale) is now shipped
- Phase 14 can author tags/narrative content against this exact named pilot set, including exercising the community-evidence triangulation workflow on Lew-Tolstoi-Schule
- No blockers or concerns

## Self-Check: PASSED

`docs/research/PILOT_SELECTION.md` confirmed present on disk; commit `06c18a7` confirmed present in git history.

---
*Phase: 12-editorial-research-framework*
*Completed: 2026-07-26*
