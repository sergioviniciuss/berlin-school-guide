---
phase: 12-editorial-research-framework
plan: 02
subsystem: docs
tags: [editorial, decisions, tag-taxonomy, voice, adr]

# Dependency graph
requires:
  - phase: 12-editorial-research-framework (plan 01)
    provides: source hierarchy extension (journalism/triangulated community) and tag taxonomy shape in docs/RESEARCH.md and docs/DATA_MODEL.md
provides:
  - docs/EDITORIAL_GUIDE.md rules for tag voice, banned/attributed-reputation language, facts-vs-tags philosophy, and Perfil da escola narrative voice
  - docs/DECISIONS.md dated ADR entries for tag taxonomy v1, source-hierarchy extension, qualitative-richness-is-not-quality, and qualitative review cadence
affects: [13-schema-and-validation, 14-pilot-content]

# Tech tracking
tech-stack:
  added: []
  patterns: [additive-only doc editing, fixed-template ADR entries]

key-files:
  created: []
  modified:
    - docs/EDITORIAL_GUIDE.md
    - docs/DECISIONS.md

key-decisions:
  - "Banned/attributed-reputation phrase list (procurada, concorrida, renomada, reputação, bem vista, recomendada) requires named, dated attribution or deletion"
  - "Perfil da escola voice must synthesize only already-cited evidence and treat sparse-but-honest profiles as complete, not incomplete"
  - "Four new 2026-07-26 ADR entries lock in tag taxonomy v1, source hierarchy extension, qualitative-richness-is-not-quality, and the qualitative review cadence"

patterns-established:
  - "Additive-only doc editing: new content is always new `##` sections inserted near related existing sections, never a reword of existing sentences"
  - "Fixed-template ADR entries: every DECISIONS.md entry follows Context/Decision/Alternatives Considered/Consequences dated YYYY-MM-DD"

requirements-completed: [FRAME-01]

# Metrics
duration: 8min
completed: 2026-07-26
---

# Phase 12 Plan 02: Editorial Voice And Decision Records Summary

**Banned/attributed-reputation language rules, facts-vs-tags and Perfil da escola voice sections added to docs/EDITORIAL_GUIDE.md; four dated ADR entries locking tag taxonomy v1, source hierarchy extension, qualitative-richness-is-not-quality, and qualitative review cadence appended to docs/DECISIONS.md**

## Performance

- **Duration:** 8 min
- **Started:** 2026-07-26T20:34:00Z
- **Completed:** 2026-07-26T20:42:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- `docs/EDITORIAL_GUIDE.md` now defines the banned/attributed-reputation phrase list, the facts-vs-tags philosophy, the non-superlative "Perfil da escola" voice, a citation-density preference, and a hedge-preservation rule for translation
- `docs/DECISIONS.md` now records four dated 2026-07-26 ADR entries tracing directly to the CONTEXT.md decisions (D-01–D-07, D-08–D-14, the 2026-07-10 coverage decision + qualitative richness, D-20–D-23)
- Both files were edited additive-only — no existing sentence was reworded or removed

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend docs/EDITORIAL_GUIDE.md with tag voice, banned language, facts-vs-tags, and Perfil da escola voice** - `56946b3` (feat)
2. **Task 2: Append four dated decision entries to docs/DECISIONS.md** - `6b5acee` (feat)

_Note: This is a documentation-only plan; no TDD tasks._

## Files Created/Modified
- `docs/EDITORIAL_GUIDE.md` - Added `## Tag Taxonomy Voice`, `## Facts Versus Tags`, `## Perfil da Escola Voice`, and `## Hedge Preservation In Translation` sections; extended `## Citations In Prose` with a citation-density preference sentence
- `docs/DECISIONS.md` - Appended four new dated ADR entries after the last existing 2026-07-10 entry: Introduce Tag Taxonomy V1, Extend Source Hierarchy With Journalism And Triangulated Community, Qualitative Richness Is Not A Quality Signal, Introduce Qualitative Review Cadence Distinct From Research Status

## Decisions Made
None - followed plan as specified. Section wording and placement, and the four ADR entries, were copied verbatim from the plan's `<action>` blocks, which had already resolved the "Claude's Discretion" wording deferred in `12-CONTEXT.md`.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- FRAME-01's voice/decision-record half is complete; combined with Plan 01's schema-shape half, `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, and `docs/DECISIONS.md` now cover the full tag taxonomy, source hierarchy, and voice framework.
- No blockers for Plan 03/04 of Phase 12 (pilot-selection criteria and methodology page update remain to be executed).

## Self-Check: PASSED

All created/modified files exist on disk and both task commits (`56946b3`, `6b5acee`) are present in git history.

---
*Phase: 12-editorial-research-framework*
*Completed: 2026-07-26*
