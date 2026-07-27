---
phase: 09-onboarding-guide-visual-foundation
plan: 01
subsystem: ui
tags: [react, tailwind, next-link, tdd, guides]

# Dependency graph
requires: []
provides:
  - "BerlinCallout component (inline badge + summary box variants) exported from src/features/guides/BerlinCallout"
  - "BerlinCalloutProps discriminated union in src/features/guides/BerlinCallout/types.ts"
  - "GlossaryTerm component (dl/dt/dd shell) exported from src/features/guides/GlossaryTerm"
affects: [09-02 (EducationTimeline's TimelineNode imports BerlinCallout for inline badge), 09-03 (route/MDX wiring consumes both components)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Discriminated union props (variant: 'inline' | 'summary') for a component with two visually distinct render paths"
    - "Blue accent tokens (bg-blue-50/text-blue-800/border-l-primary) reserved exclusively for Berlin-difference callouts; amber/red reserved for evidence-status warnings"
    - "next/link (not <a>) for same-site guide cross-links"

key-files:
  created:
    - src/features/guides/BerlinCallout/types.ts
    - src/features/guides/BerlinCallout/index.tsx
    - src/features/guides/BerlinCallout/index.test.tsx
    - src/features/guides/GlossaryTerm/index.tsx
    - src/features/guides/GlossaryTerm/index.test.tsx
  modified: []

key-decisions:
  - "GlossaryTerm has no separate types.ts file — the two-field prop type stays local to index.tsx, following StatusBadge's precedent for small leaf components"
  - "BerlinCallout summary variant is a plain block-level <aside>, not self-margined, so it composes freely inside MDX/prose without imposing spacing assumptions on callers"

patterns-established:
  - "TDD RED/GREEN per task: test commit first (must fail), then implementation commit (must pass)"

requirements-completed: [VIS-01, VIS-03]

# Metrics
duration: 25min
completed: 2026-07-12
---

# Phase 9 Plan 1: BerlinCallout and GlossaryTerm Summary

**Two leaf React components — `BerlinCallout` (inline "Em Berlim" badge + "Berlin em destaque" summary box linking to the Berlin guide) and `GlossaryTerm` (dl/dt/dd term-definition shell) — both server components, no external dependencies, fully unit-tested.**

## Performance

- **Duration:** ~25 min
- **Tasks:** 2
- **Files modified:** 5 (all created)

## Accomplishments
- `BerlinCallout` renders both the compact inline badge (for timeline nodes) and the standalone summary box (linking to `/guides/berlin-school-system`), with a hard guard against amber/red evidence-warning tokens (D-10 tone requirement)
- `GlossaryTerm` replaces plain-paragraph term definitions with a structured `<dl>/<dt>/<dd>` block (D-12), verified to render independently across multiple instances
- Both components ship with full TDD-style test coverage (RED commit before GREEN commit) and zero new lint/typecheck issues

## Task Commits

Each task was committed as a RED/GREEN pair:

1. **Task 1: Build BerlinCallout (types + both variants + tests)**
   - `300af6f` test(09-01): add failing tests for BerlinCallout
   - `7a1a8b9` feat(09-01): implement BerlinCallout inline badge and summary box
2. **Task 2: Build GlossaryTerm shell + tests**
   - `f34eefb` test(09-01): add failing tests for GlossaryTerm
   - `d2e4ce5` feat(09-01): implement GlossaryTerm dl/dt/dd shell

_Both TDD tasks: test commit confirmed failing (module not found) before implementation commit made it pass._

## Files Created/Modified
- `src/features/guides/BerlinCallout/types.ts` — `BerlinCalloutProps` discriminated union (`inline` | `summary`)
- `src/features/guides/BerlinCallout/index.tsx` — both variants; blue accent tokens only, no amber/red
- `src/features/guides/BerlinCallout/index.test.tsx` — 3 tests: inline badge text, summary box content + link, tone guard
- `src/features/guides/GlossaryTerm/index.tsx` — `<dl>/<dt>/<dd>` shell, local prop type
- `src/features/guides/GlossaryTerm/index.test.tsx` — 3 tests: visible text, dl/dt/dd structure, multi-instance independence

## Decisions Made
- Followed the plan's exact code for both components verbatim — no implementation deviation from the specified markup/classes
- Confirmed `GlossaryTerm` intentionally omits a `types.ts` (per plan, matching `StatusBadge` convention for small two-field prop types)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `BerlinCallout` is ready for `EducationTimeline`'s `TimelineNode` (Plan 02) to import for the inline Berlin badge (D-09)
- Both components are ready for MDX wiring in Plan 03's `/guides/german-education-system` route
- No blockers identified

---
*Phase: 09-onboarding-guide-visual-foundation*
*Completed: 2026-07-12*

## Self-Check: PASSED

All 6 created files verified present on disk; all 4 task commits (300af6f, 7a1a8b9, f34eefb, d2e4ce5) verified present in git log.
