---
phase: 09-onboarding-guide-visual-foundation
plan: 02
subsystem: ui
tags: [react, radix-collapsible, tailwind, tdd, guides, responsive]

# Dependency graph
requires:
  - phase: 09-01
    provides: "BerlinCallout component (inline variant) for the node's always-visible Berlin badge"
provides:
  - "EducationTimeline component (default-exported via named export) rendering desktop branching infographic and mobile stacked stepper from the same TimelineStage data"
  - "TimelineStage/EducationTimelineProps contract in src/features/guides/EducationTimeline/types.ts"
  - "DEMO_TRUNK/DEMO_CONVERGENCE placeholder demo data covering all 5 secondary/vocational tracks"
  - "guide-print-expand print CSS rule forcing node summaries visible when printing"
affects: [09-03 (route/MDX wiring consumes EducationTimeline directly, uses the #o-caminho-da-kita-a-universidade anchor already baked into demo data)]

# Tech tracking
tech-stack:
  added: ["@radix-ui/react-collapsible@1.1.16"]
  patterns:
    - "Responsive dual-render: both EducationTimelineDesktop and EducationTimelineMobile render into the DOM simultaneously, toggled by hidden lg:block / lg:hidden — no matchMedia, testable without viewport mocking"
    - "TimelineNode kept as an internal, non-exported implementation detail (no premature reusable primitive) per AGENTS.md"
    - "Radix Collapsible data-state attribute selectors (data-[state=open]:rotate-180) reused from the Sheet/Dialog precedent, applied to a second primitive family"
    - "Print CSS override (guide-print-expand) forces normally-collapsed Collapsible.Content visible only in @media print, without changing on-screen default state"

key-files:
  created:
    - src/features/guides/EducationTimeline/types.ts
    - src/features/guides/EducationTimeline/constants.ts
    - src/features/guides/EducationTimeline/fixtures.ts
    - src/features/guides/EducationTimeline/TimelineNode.tsx
    - src/features/guides/EducationTimeline/EducationTimelineDesktop.tsx
    - src/features/guides/EducationTimeline/EducationTimelineMobile.tsx
    - src/features/guides/EducationTimeline/index.tsx
    - src/features/guides/EducationTimeline/index.test.tsx
  modified:
    - src/app/globals.css
    - package.json
    - pnpm-lock.yaml

key-decisions:
  - "Test 3 (mobile 'Outras vias' collapsed-by-default) scoped queries to the mobile region specifically via within(), since both desktop and mobile trees render simultaneously in jsdom and the desktop tree always shows all branch names unconditionally"
  - "TimelineNode.tsx stays outside index.ts's public exports — imported directly by the two layout components, never re-exported, matching the plan's explicit 'no premature reusable primitive' instruction"

patterns-established:
  - "TDD RED/GREEN for a multi-file task: one failing test commit for the whole EducationTimeline surface (desktop+mobile+index+CSS), followed by one implementation commit making all 5 behaviors pass"

requirements-completed: [VIS-01, VIS-02]

# Metrics
duration: 20min
completed: 2026-07-12
---

# Phase 9 Plan 2: EducationTimeline Summary

**Responsive branching infographic (`EducationTimeline`) built with `@radix-ui/react-collapsible` — desktop fan-out diagram and mobile stacked stepper sharing one `TimelineNode` card, covering all 5 secondary/vocational tracks and forcing expanded summaries on print.**

## Performance

- **Duration:** ~20 min
- **Tasks:** 3
- **Files modified:** 11 (8 created, 3 modified)

## Accomplishments
- `EducationTimeline` renders both a desktop branching infographic (trunk → 5-track fan-out → convergence, all visible without interaction, D-02) and a mobile stacked stepper with a single collapsible "Outras vias" disclosure giving every track equal one-tap weight (D-07/D-08)
- `TimelineNode` internal card shows stage name/grades/ages together (D-03), expands via Radix Collapsible to reveal a short summary + optional anchor link (D-05), and surfaces the "Em Berlim" badge on its always-visible face when `berlinNote` is set (D-09)
- Print CSS (`guide-print-expand`) forces every node's summary visible when printing, without disturbing the collapsed-by-default on-screen behavior (Pitfall 4)
- Full TDD cycle: one failing-test commit covering all 5 behaviors, one implementation commit making them pass; `pnpm test -- EducationTimeline`, `pnpm typecheck`, `pnpm lint`, and `pnpm build` all green

## Task Commits

1. **Task 1: Define TimelineStage contract, demo data, and test fixtures** - `5460d8a` (feat)
2. **Task 2: Install @radix-ui/react-collapsible and build TimelineNode** - `b1d84c0` (feat)
3. **Task 3: Build desktop/mobile layouts, assemble EducationTimeline, add print CSS, write tests** (TDD):
   - `bac2fc8` (test) — RED: 5 failing tests, confirmed failing on "Cannot find module '.'" (index.tsx didn't exist yet)
   - `4da41d3` (feat) — GREEN: EducationTimelineDesktop/Mobile/index.tsx + print CSS, all 5 tests pass

## TDD Gate Compliance

RED gate (`bac2fc8`) confirmed before GREEN gate (`4da41d3`) in git log — sequence intact. No REFACTOR commit was needed; the GREEN implementation matched the plan's specified code closely enough that no follow-up cleanup was required.

## Files Created/Modified
- `src/features/guides/EducationTimeline/types.ts` — `TimelineStage`/`EducationTimelineProps` contract, both trunk/convergence optional
- `src/features/guides/EducationTimeline/constants.ts` — `DEMO_TRUNK`/`DEMO_CONVERGENCE` placeholder data, all 5 secondary tracks, one Berlin-badged node
- `src/features/guides/EducationTimeline/fixtures.ts` — test-only fixtures independent of demo copy
- `src/features/guides/EducationTimeline/TimelineNode.tsx` — internal Radix Collapsible card, imports `BerlinCallout`
- `src/features/guides/EducationTimeline/EducationTimelineDesktop.tsx` — branching fan-out layout, server component
- `src/features/guides/EducationTimeline/EducationTimelineMobile.tsx` — stacked stepper + "Outras vias" disclosure, client component
- `src/features/guides/EducationTimeline/index.tsx` — public `EducationTimeline`, dual-renders both variants with `DEMO_TRUNK`/`DEMO_CONVERGENCE` defaults
- `src/features/guides/EducationTimeline/index.test.tsx` — 5 tests covering region landmarks, all 5 tracks, mobile disclosure state, Berlin badge, node expand/collapse
- `src/app/globals.css` — added `.guide-print-expand` rule inside the existing `@media print` block
- `package.json` / `pnpm-lock.yaml` — added `@radix-ui/react-collapsible@1.1.16`

## Decisions Made
- Followed the plan's specified code essentially verbatim for all components and demo data
- Adjusted the mobile-disclosure test (Test 3) to scope its `queryByText`/`getAllByText` assertions to the mobile region via RTL's `within()`, since the plan's Pattern 2 (both responsive variants render into the DOM simultaneously) means an unscoped `queryByText("Gymnasium")` would incorrectly find the desktop tree's always-visible branch name — this is a test-implementation detail, not a deviation from the plan's intended behavior (the plan's own behavior spec for Test 3 anticipated this by saying the query should be "scoped to the mobile-only trigger's sibling content")

## Deviations from Plan

None — plan executed as written; the only adjustment was the test-scoping detail above, which the plan's own behavior spec already anticipated rather than left unspecified.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `EducationTimeline` is ready for Plan 03 to import directly into `german-education-system.mdx` with zero props (uses `DEMO_TRUNK`/`DEMO_CONVERGENCE` defaults)
- The `anchorHref` values baked into `DEMO_TRUNK`/`DEMO_CONVERGENCE` (`#o-caminho-da-kita-a-universidade`) require Plan 03 to add a matching `## O caminho da Kita à universidade` heading to the MDX so `Ver seção completa` links resolve correctly
- No blockers identified

---
*Phase: 09-onboarding-guide-visual-foundation*
*Completed: 2026-07-12*

## Self-Check: PASSED

All 8 created files verified present on disk; all 4 task commits (5460d8a, b1d84c0, bac2fc8, 4da41d3) verified present in git log; `pnpm test -- EducationTimeline` (5/5 passing), `pnpm typecheck`, `pnpm lint` (0 errors), and `pnpm build` all confirmed green during execution.
