---
phase: 12-editorial-research-framework
plan: 01
subsystem: docs
tags: [research-framework, tag-taxonomy, community-evidence, qualitative-review]

# Dependency graph
requires: []
provides:
  - Extended source hierarchy (journalism + triangulated-community tiers) with auditable independence definition
  - Community Source Independence rules (independence definition, echo exclusion, fail-closed conflict handling, minimum source quality, independence log, recency)
  - Closed Tag Taxonomy v1 shape (10 tag IDs across 4 categories) documented for schema implementation
  - Qualitative Review Cadence policy distinct from factual research_status recheck
  - qualitativeLastReviewed field semantics documented for Phase 13 schema work
affects:
  - 13-* (schema implementation of tag taxonomy, independence log shape, qualitativeLastReviewed field)
  - 14-* (pilot content authoring against the community-independence and cadence rules)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Additive ## section extension in existing docs/*.md files; never rewrite existing prose"
    - "Policy/cadence documented in docs/RESEARCH.md; field shape/semantics documented in docs/DATA_MODEL.md, cross-referenced by field name"

key-files:
  created: []
  modified:
    - docs/RESEARCH.md
    - docs/DATA_MODEL.md

key-decisions:
  - "Source Hierarchy extended to 7 tiers: journalism inserted as tier 5, triangulated community as new tier 6, anecdotal reserved demoted to tier 7 (unchanged content)"
  - "triangulated_community given its own reliability level (not folded into secondary or anecdotal) since it sits between them under strict conditions"
  - "Tag Taxonomy v1 and Qualitative Review Tracking placed in DATA_MODEL.md immediately after Anecdotal Signals and before Open Day Questions, per plan's exact placement instruction"

requirements-completed: [FRAME-01, FRAME-04]

# Metrics
duration: 12min
completed: 2026-07-26
---

# Phase 12 Plan 01: Evidence Model Extension (RESEARCH.md + DATA_MODEL.md) Summary

**Extended the source hierarchy with journalism and triangulated-community tiers plus a concrete, auditable Community Source Independence definition; documented the closed 10-tag v1 taxonomy shape and the qualitativeLastReviewed field semantics for the distinct qualitative review cadence — all additive, no existing prose reworded.**

## Performance

- **Duration:** ~12 min
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Extended `docs/RESEARCH.md`'s Source Hierarchy from 5 to 7 tiers (journalism tier 5, triangulated community tier 6, anecdotal/social tier 7), added matching `journalism`/`triangulated_community` canonical source types, and a `triangulated_community` reliability level
- Added a new `## Community Source Independence` section to `docs/RESEARCH.md` covering the independence definition, echo exclusion, acceptable-independence examples, fail-closed conflict handling, minimum source quality, the required independence log fields, and the ~24-month recency guideline
- Added a new `## Qualitative Review Cadence` section to `docs/RESEARCH.md` documenting the hybrid periodic (annual, ~12-month community revalidation) + event-driven cadence, distinct from the factual `research_status` recheck cycle, and the full-pilot re-review trigger on methodology version change
- Added `## Tag Taxonomy` to `docs/DATA_MODEL.md` documenting the closed v1 shape (10 tag IDs across 4 categories: Academic focus, Learning model, Student support, School environment), the fact-vs-tag distinction, the community-evidence-only-for-`active-school-community` rule, and the explicit exclusion of a "High demand" tag
- Added `## Qualitative Review Tracking` to `docs/DATA_MODEL.md` documenting the `qualitativeLastReviewed` field's intended semantics (ISO date, separate from `lastResearched`/`lastSourceChecked`, updated per the RESEARCH.md cadence), explicitly deferring schema implementation to Phase 13

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend docs/RESEARCH.md with journalism/triangulated-community tiers, independence rules, and qualitative review cadence** - `620e099` (docs)
2. **Task 2: Extend docs/DATA_MODEL.md with Tag Taxonomy v1 and Qualitative Review Tracking** - `c7df799` (docs)

## Files Created/Modified

- `docs/RESEARCH.md` - Added journalism + triangulated-community source hierarchy tiers, matching canonical source types and reliability level, a new Community Source Independence section, and a new Qualitative Review Cadence section (heading count 10 → 12, purely additive)
- `docs/DATA_MODEL.md` - Added a Tag Taxonomy section (all 10 v1 tag IDs across 4 categories) and a Qualitative Review Tracking section documenting `qualitativeLastReviewed` semantics (heading count 9 → 11, purely additive)

## Decisions Made

- Kept tiers 1-4 of the Source Hierarchy and all of `## Research Standard`, `## Citation Requirements`, `## Conflicting Information`, `## Inspection Availability`, `## Missing Information`, and `## Correction Workflow` untouched, exactly as the plan required
- Inserted `## Community Source Independence` between `## Reliability Levels` and `## Citation Requirements`, and `## Qualitative Review Cadence` between `## Research Status` and `## Correction Workflow`, matching the plan's exact placement instructions
- Cross-referenced `qualitativeLastReviewed` by name between `docs/RESEARCH.md`'s Qualitative Review Cadence section and `docs/DATA_MODEL.md`'s Qualitative Review Tracking section so the two docs stay in sync without duplicating the field's semantics

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `docs/RESEARCH.md` and `docs/DATA_MODEL.md` now carry the full evidence-model half of the Phase 12 framework, ready for Phase 12 Plan 02+ (editorial voice, methodology page, pilot selection) to cross-reference
- Phase 13 has a documented, unambiguous target for schema work: the 10 tag IDs, the independence log field shape, and the `qualitativeLastReviewed` field semantics
- Phase 14 pilot content authoring has a concrete, auditable Community Source Independence test to apply when researching the `active-school-community` tag

## Self-Check: PASSED

- FOUND: docs/RESEARCH.md
- FOUND: docs/DATA_MODEL.md
- FOUND: .planning/phases/12-editorial-research-framework/12-01-SUMMARY.md
- FOUND: 620e099
- FOUND: c7df799

---
*Phase: 12-editorial-research-framework*
*Completed: 2026-07-26*
