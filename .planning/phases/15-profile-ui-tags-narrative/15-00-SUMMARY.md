---
phase: 15-profile-ui-tags-narrative
plan: 00
subsystem: testing
tags: [jest, rtl, tdd, wave-0, tags, narrative, fontes, report-correction]

requires:
  - phase: 14-pilot-profile-content
    provides: Pilot fixtures with tags, perfilDaEscola, qualitativeLastReviewed
  - phase: 13-evidence-tag-schema-layer
    provides: formatTagId, formatTagConfidence, formatSourceType, schoolTagSchema
provides:
  - Failing Wave 0 Jest scaffolds for TagsSection, EditorialNarrative, tag categories, Fontes cite-back, SchoolProfile qualitative chrome, ReportCorrection
  - Null stubs for brand-new modules so imports resolve while assertions stay RED
  - 15-VALIDATION.md Wave 0 file-creation checklist mapped to plan 00
affects:
  - 15-01 (tag category helpers + TagsSection green)
  - 15-02 (collectCitedSources / SourcesSection cite-back green)
  - 15-03+ (SchoolProfile wiring + ReportCorrection green)

tech-stack:
  added: []
  patterns:
    - Wave 0 null stubs for new feature directories so RED tests import cleanly
    - SchoolComparison-style mutable URLSearchParams + next/navigation mock for query-driven pages

key-files:
  created:
    - src/features/schools/TagsSection/index.tsx
    - src/features/schools/TagsSection/index.test.tsx
    - src/features/schools/EditorialNarrative/index.tsx
    - src/features/schools/EditorialNarrative/index.test.tsx
    - src/features/schools/ReportCorrection/index.tsx
    - src/features/schools/ReportCorrection/index.test.tsx
  modified:
    - src/features/schools/tagTaxonomy/index.test.ts
    - src/features/schools/collectCitedSources/index.test.ts
    - src/features/schools/SourcesSection/index.test.tsx
    - src/features/schools/SchoolProfile/index.test.tsx
    - .planning/phases/15-profile-ui-tags-narrative/15-VALIDATION.md

key-decisions:
  - "Wave 0 ships RED tests + null stubs only — no production qualitative UI"
  - "TagsSection/EditorialNarrative/ReportCorrection stubs return null so imports resolve and assertions stay RED until later plans"

patterns-established:
  - "Null stub index.tsx for brand-new client/server components during Wave 0"
  - "ReportCorrection tests mirror SchoolComparison useSearchParams mock pattern"

requirements-completed: []  # Wave 0 RED scaffolds only — NARR-* greens deferred to Plans 01–05

duration: 3min
completed: 2026-07-30
---

# Phase 15 Plan 00: Wave 0 RED Test Scaffolds Summary

**Failing Jest scaffolds for TagsSection, EditorialNarrative, tag categories, Fontes cite-back, SchoolProfile qualitative chrome, and ReportCorrection — with null stubs so imports resolve**

## Performance

- **Duration:** 3 min
- **Started:** 2026-07-30T05:38:06Z
- **Completed:** 2026-07-30T05:41:06Z
- **Tasks:** 3
- **Files modified:** 11

## Accomplishments
- Category helper RED tests cover all 10 taxonomy IDs → four PT-BR categories + TAG_CATEGORY_ORDER
- TagsSection / EditorialNarrative / ReportCorrection null stubs + failing RTL suites locked to UI-SPEC copy
- Fontes merge tests assert tag-only sources, field+tag dedupe, and “Citado em:” cite-back present/absent
- 15-VALIDATION.md Wave 0 file checklist checked off; Task IDs 15-W0-01…05 mapped to plan 00; `nyquist_compliant` / `wave_0_complete` remain false until greens

## Task Commits

Each task was committed atomically:

1. **Task 1: RED stubs for tag taxonomy categories, TagsSection, EditorialNarrative** - `3c9490d` (test)
2. **Task 2: RED extensions for collectCitedSources and SourcesSection cite-back** - `5151a20` (test)
3. **Task 3: RED extensions for SchoolProfile qualitative chrome and ReportCorrection** - `224848d` (test)

## Files Created/Modified
- `src/features/schools/TagsSection/index.tsx` — null stub
- `src/features/schools/TagsSection/index.test.tsx` — NARR-01/03/04 RED coverage
- `src/features/schools/EditorialNarrative/index.tsx` — null stub
- `src/features/schools/EditorialNarrative/index.test.tsx` — Perfil da escola RED coverage
- `src/features/schools/ReportCorrection/index.tsx` — null stub
- `src/features/schools/ReportCorrection/index.test.tsx` — NARR-06 prefill/missing copy RED coverage
- `src/features/schools/tagTaxonomy/index.test.ts` — getTagCategory / formatTagCategory / TAG_CATEGORY_ORDER
- `src/features/schools/collectCitedSources/index.test.ts` — tag merge + citedBy
- `src/features/schools/SourcesSection/index.test.tsx` — Citado em: present/absent
- `src/features/schools/SchoolProfile/index.test.tsx` — editorial order, Perfil oficial, correction link
- `.planning/phases/15-profile-ui-tags-narrative/15-VALIDATION.md` — Wave 0 tracking

## Decisions Made
- Wave 0 ships RED tests + null stubs only — no production qualitative UI (plan intent)
- TagsSection / EditorialNarrative / ReportCorrection stubs return null so imports resolve and assertions stay RED until Plans 01–05

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Plan 01 can green tag category helpers + TagsSection against these RED suites
- Plans 02–05 have automated verify targets for Fontes cite-back, profile wiring, and ReportCorrection
- Full suite intentionally RED for new qualitative paths until implementation plans land

## TDD Gate Compliance
Wave 0 plan is RED-only by design (no GREEN commits). RED gates present for all three tasks; GREEN deferred to Plans 01–05.

## Known Stubs
- `src/features/schools/TagsSection/index.tsx` — returns null (intentional Wave 0; Plan 01 greens)
- `src/features/schools/EditorialNarrative/index.tsx` — returns null (intentional Wave 0; Plan 01/03 greens)
- `src/features/schools/ReportCorrection/index.tsx` — returns null (intentional Wave 0; Plan 05 greens)

## Self-Check: PASSED

- Created files: TagsSection, EditorialNarrative, ReportCorrection stubs + tests, 15-00-SUMMARY.md, 15-VALIDATION.md — all found
- Commits: `3c9490d`, `5151a20`, `224848d` — all found
- Note: NARR-* left Pending in REQUIREMENTS.md (Wave 0 RED only; greens in later plans)

---
*Phase: 15-profile-ui-tags-narrative*
*Completed: 2026-07-30*
