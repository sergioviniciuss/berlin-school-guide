---
phase: 12-editorial-research-framework
plan: 03
subsystem: ui
tags: [mdx, nextjs, rtl, jest, methodology, editorial]

# Dependency graph
requires:
  - phase: 12-01
    provides: extended docs/RESEARCH.md source hierarchy (journalism + triangulated community tiers) and docs/DATA_MODEL.md tag taxonomy v1
  - phase: 12-02
    provides: docs/EDITORIAL_GUIDE.md tag voice rules and docs/DECISIONS.md dated ADR entries for taxonomy/source-hierarchy
provides:
  - Public /methodology page explaining source-tier hierarchy and the two-independent-source rule to families
  - Public /methodology page explaining the facts-vs-tags distinction and confidence-label semantics (evidence strength, not school quality)
  - Family-facing statement that absence of a tag is not a negative signal
  - Methodology version marker ("Versão da metodologia") for future auditability
affects: [15-profile-ui]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Reused existing plain-MDX bullet-definition pattern ("- **Termo** — explicação.") for all new family-facing definitions, no new components/tokens

key-files:
  created: []
  modified:
    - src/content/guides/methodology.mdx
    - src/app/methodology/page.tsx
    - src/app/methodology/page.test.tsx

key-decisions:
  - "Placed the two new sections between Cobertura da pesquisa and Termos em alemão per the UI-SPEC Content Extension Contract, keeping the German-terms glossary last"
  - "Version marker uses v1, dated 2026-07-26, matching this milestone's first methodology update; recorded as the public mirror of the docs/DECISIONS.md ADR trail from Plans 12-01/12-02"

patterns-established: []

requirements-completed: [FRAME-02]

# Metrics
duration: 6min
completed: 2026-07-26
---

# Phase 12 Plan 03: Public Methodology Page Extension Summary

**Extended `/methodology` with two new MDX sections (source-tier hierarchy, facts-vs-tags/confidence labels) and a version marker, reusing the existing bullet-definition style byte-for-byte with no new components.**

## Performance

- **Duration:** 6 min
- **Tasks:** 2 completed
- **Files modified:** 3

## Accomplishments
- Families visiting `/methodology` can now read a plain-PT-BR explanation of the source hierarchy (official → school website → independent journalism → triangulated community) and the two-independent-source rule for community evidence
- Families can read the facts-vs-tags distinction ("o que a escola tem?" vs. "que tipo de escola é essa?") and the three confidence labels, with an explicit statement that confidence reflects evidence strength, not school quality, and that a missing tag is not a negative signal
- Added a "Versão da metodologia" marker at the end of the page so future methodology changes are auditable
- Updated the RTL test to assert both new headings render

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend methodology.mdx with source-tier and tag explanations, and update page.tsx metadata** - `3b17267` (feat)
2. **Task 2: Extend page.test.tsx with assertions for the new methodology sections** - `0408a90` (test)

_Note: Plan metadata commit follows this summary._

## Files Created/Modified
- `src/content/guides/methodology.mdx` - Added `## Hierarquia das fontes` and `## Características da escola (tags)` sections between "Cobertura da pesquisa" and "Termos em alemão", plus a closing "Versão da metodologia" marker
- `src/app/methodology/page.tsx` - Updated `metadata.description` to mention "características" alongside existing wording; no structural change
- `src/app/methodology/page.test.tsx` - Extended the MDX mock with the two new headings and added matching `getByRole("heading", ...)` assertions

## Decisions Made
- Followed the plan's prescriptive copy verbatim (source-tier bullets, tag confidence labels, version marker text) since it was already validated against `docs/EDITORIAL_GUIDE.md` voice rules and the UI-SPEC Content Extension Contract during planning
- Kept the existing MDX-mock test pattern in `page.test.tsx` rather than switching to rendering real MDX, per the UI-SPEC's explicit test-coverage guidance

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- FRAME-02 is complete; Phase 12's only frontend-facing surface is now shipped
- Phase 13 can proceed to encode the tag taxonomy schema, `qualitativeLastReviewed` field, and independence-log shape referenced by this page's new copy
- No blockers or concerns

## Self-Check: PASSED

All created/modified files and both task commits verified present on disk and in git history.

---
*Phase: 12-editorial-research-framework*
*Completed: 2026-07-26*
