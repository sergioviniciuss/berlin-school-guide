---
phase: 10-education-pathway-editorial
plan: 01
subsystem: ui
tags: [GlossaryTerm, EducationTimeline, slugifyHeading, deep-links, TDD]

# Dependency graph
requires:
  - phase: 10-education-pathway-editorial
    provides: Wave 0 RED GlossaryTerm + EducationTimeline constants contract tests
  - phase: 09-onboarding-guide-visual-foundation
    provides: GlossaryTerm chrome and EducationTimeline DEMO_* structure
provides:
  - GlossaryTerm id={slugifyHeading(term)} + scroll-mt-20 for narrative deep links
  - EducationTimeline DEMO_* locked H2 anchors and production PT-BR summaries
  - Grundschule berlinNote for 6-year Berlin difference
affects:
  - 10-02 (MDX H2s must slugify to locked hashes)
  - 10-03 (editorial chapters consume timeline Ver seção completa links)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - GlossaryTerm deep-link ids reuse mdxUtils slugifyHeading (same as MDX h2/h3)
    - Secondary Berlin tracks share #os-caminhos-possiveis; no H3 timeline anchors

key-files:
  created: []
  modified:
    - src/features/guides/GlossaryTerm/index.tsx
    - src/features/guides/EducationTimeline/constants.ts
    - src/features/guides/EducationTimeline/fixtures.ts

key-decisions:
  - "Shared secondary hash #os-caminhos-possiveis for Gymnasium/ISS/Gemeinschaftsschule (no mdx h3 remapping)"
  - "Grundschule berlinNote is concept-level only; no Einzugsgebiet/Anmeldung procedure copy"

patterns-established:
  - "GlossaryTerm root dl carries slugifyHeading(term) id + scroll-mt-20"
  - "Timeline anchorHref values are relative #hashes matching journey H2 slugs"

requirements-completed: [ONBD-05, ONBD-01]

# Metrics
duration: 1min
completed: 2026-07-24
---

# Phase 10 Plan 01: GlossaryTerm Deep Links + Timeline Anchors Summary

**GlossaryTerm deep-link ids via slugifyHeading and EducationTimeline DEMO_* synced to locked H2 hashes with production PT-BR summaries**

## Performance

- **Duration:** 1 min
- **Started:** 2026-07-24T21:01:39Z
- **Completed:** 2026-07-24T21:02:54Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Added `id={slugifyHeading(term)}` and `scroll-mt-20` to GlossaryTerm root `dl` (Wave 0 tests GREEN)
- Mapped all locked timeline `anchorHref` values; set Grundschule `berlinNote`; removed Fase 10 stubs
- Updated `grundschuleFixture.anchorHref` to `#ensino-primario`

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement GlossaryTerm id + scroll-mt-20** - `e811b4e` (feat)
2. **Task 2: Sync timeline constants and fixtures to locked anchors** - `38bacc6` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/features/guides/GlossaryTerm/index.tsx` - Deep-link id + scroll margin on root dl
- `src/features/guides/EducationTimeline/constants.ts` - Locked anchors, berlinNote, production summaries
- `src/features/guides/EducationTimeline/fixtures.ts` - Fixture hash `#ensino-primario`

## Decisions Made
- Shared secondary hash `#os-caminhos-possiveis` for Gymnasium / ISS / Gemeinschaftsschule — did not modify `mdx-components.tsx` h3 mapping
- Grundschule `berlinNote` and summary stay concept-level (6-year difference); enrollment procedures left to berlin-school-system (D-11)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Wave 0 GlossaryTerm + constants suites are GREEN
- Plan 02/03 MDX must emit H2s that slugify to `#antes-da-escola`, `#ensino-primario`, `#os-caminhos-possiveis`, `#formacao-profissional`, `#ensino-superior`
- Timeline “Ver seção completa” will resolve once those chapter H2s ship

## TDD Gate Compliance
- RED gate: prior Wave 0 `test(10-00)` commits `f781a66` and `772e449`
- GREEN gate: `feat(10-01)` commits `e811b4e` and `38bacc6`

## Self-Check: PASSED
- FOUND: `src/features/guides/GlossaryTerm/index.tsx`
- FOUND: `src/features/guides/EducationTimeline/constants.ts`
- FOUND: `src/features/guides/EducationTimeline/fixtures.ts`
- FOUND: `e811b4e`
- FOUND: `38bacc6`

---
*Phase: 10-education-pathway-editorial*
*Completed: 2026-07-24*
