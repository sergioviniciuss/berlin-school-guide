---
phase: 10-education-pathway-editorial
plan: 00
subsystem: testing
tags: [jest, GlossaryTerm, EducationTimeline, TDD, Nyquist, deep-links]

# Dependency graph
requires:
  - phase: 09-onboarding-guide-visual-foundation
    provides: GlossaryTerm component and EducationTimeline DEMO_* constants stubs
provides:
  - Failing GlossaryTerm deep-link id / scroll-mt-20 unit tests
  - Failing EducationTimeline DEMO constants anchor contract tests
affects:
  - 10-01 (greens GlossaryTerm + constants)
  - 10-02 (editorial MDX anchors must match contract)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Wave 0 Nyquist RED scaffolds before production green (Plan 01)
    - Timeline anchor contract looked up by stage id, not Portuguese summary text

key-files:
  created:
    - src/features/guides/EducationTimeline/constants.test.ts
  modified:
    - src/features/guides/GlossaryTerm/index.test.tsx

key-decisions:
  - "Wave 0 ships tests only — no GlossaryTerm or constants.ts production changes"
  - "Anchor contract uses stage ids (kita, grundschule, …) for lookups"

patterns-established:
  - "GlossaryTerm deep-link tests: Duales Studium → #duales-studium + scroll-mt-20"
  - "DEMO constants ban Fase 10 / o-caminho-da-kita-a-universidade placeholders"

requirements-completed: [ONBD-05]

# Metrics
duration: 1min
completed: 2026-07-24
---

# Phase 10 Plan 00: Nyquist Wave 0 Test Scaffolds Summary

**RED GlossaryTerm deep-link tests and EducationTimeline locked H2 anchor contract so Plan 01 cannot ship broken glossary hashes or stub timeline links**

## Performance

- **Duration:** 1 min
- **Started:** 2026-07-24T20:59:29Z
- **Completed:** 2026-07-24T21:00:26Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Extended `GlossaryTerm` unit tests for `id={slugifyHeading(term)}` and `scroll-mt-20` (2 failing assertions)
- Added `EducationTimeline/constants.test.ts` encoding the locked H2 → `anchorHref` map, Berlin Grundschule note, and placeholder bans
- Confirmed both suites exit non-zero against current Phase 9 stubs (no production code touched)

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend GlossaryTerm deep-link tests** - `f781a66` (test)
2. **Task 2: Add EducationTimeline constants anchor contract test** - `772e449` (test)

**Plan metadata:** (docs commit follows)

_Note: TDD Wave 0 — RED only; GREEN is Plan 01_

## Files Created/Modified
- `src/features/guides/GlossaryTerm/index.test.tsx` - Deep-link id + scroll-mt-20 assertions
- `src/features/guides/EducationTimeline/constants.test.ts` - Locked anchor map + ban rules

## Decisions Made
- Wave 0 ships tests only — GlossaryTerm `id` / `scroll-mt-20` and `constants.ts` updates deferred to Plan 01
- Anchor contract looks up stages by `id` fields, not Portuguese summary text

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Plan 01 must green both suites by implementing GlossaryTerm ids and updating DEMO_* anchors/summaries
- Editorial MDX (later plans) must emit H2s that slugify to the locked hashes

## TDD Gate Compliance
- RED gate: `test(10-00)` commits `f781a66` and `772e449` present
- GREEN gate: deferred to Plan 01 (intentional for this Wave 0 plan)

## Self-Check: PASSED
- FOUND: `src/features/guides/GlossaryTerm/index.test.tsx`
- FOUND: `src/features/guides/EducationTimeline/constants.test.ts`
- FOUND: `f781a66`
- FOUND: `772e449`

---
*Phase: 10-education-pathway-editorial*
*Completed: 2026-07-24*
