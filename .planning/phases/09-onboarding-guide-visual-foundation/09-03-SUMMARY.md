---
phase: 09-onboarding-guide-visual-foundation
plan: 03
subsystem: ui
tags: [mdx, next-app-router, playwright, guides]

# Dependency graph
requires:
  - phase: 09-01
    provides: "BerlinCallout (summary variant) and GlossaryTerm components"
  - phase: 09-02
    provides: "EducationTimeline component with DEMO_TRUNK/DEMO_CONVERGENCE placeholder data"
provides:
  - "Public route /guides/german-education-system wiring GuideIntro + live component demos"
  - "Global MDX registration of EducationTimeline, BerlinCallout, GlossaryTerm in src/mdx-components.tsx"
  - "e2e/onboarding.spec.ts Playwright coverage for the new route"
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Route shell mirrors berlin-school-system/page.tsx exactly (max-w-3xl, GuideIntro + compiled MDX import + buildPageMetadata) — no new page-shell pattern introduced (D-11)"
    - "MDX section heading text is chosen to auto-slugify (via existing mdx-components.tsx h2 override) to match the anchorHref already baked into EducationTimeline's demo data"

key-files:
  created:
    - src/app/guides/german-education-system/page.tsx
    - src/content/guides/german-education-system.mdx
    - e2e/onboarding.spec.ts
  modified:
    - src/mdx-components.tsx

key-decisions:
  - "Followed the plan's exact code for the route shell, MDX placeholder content, and Playwright tests verbatim — no implementation deviation"

requirements-completed: [VIS-01, VIS-02, VIS-03]

# Metrics
duration: 20min
completed: 2026-07-12
---

# Phase 9 Plan 3: German Education System Route Wiring Summary

**Wires the `EducationTimeline`, `BerlinCallout`, and `GlossaryTerm` components (built in Plans 01-02) into a live, public route — `/guides/german-education-system` — via global MDX registration, a route shell mirroring `berlin-school-system/page.tsx`, placeholder editorial content with Phase 10 heading stubs, and Playwright coverage confirming no mobile overflow.**

## Performance

- **Duration:** ~20 min
- **Tasks:** 3
- **Files modified:** 4 (3 created, 1 modified)

## Accomplishments

- `EducationTimeline`, `BerlinCallout`, `GlossaryTerm` are now globally available as MDX tags via `src/mdx-components.tsx`, without touching any existing heading/prose overrides
- `/guides/german-education-system` is a real, statically-exported route: `GuideIntro` followed immediately by the live `EducationTimeline` demo (D-11/D-02), then a Phase-10 heading stub, a `BerlinCallout` summary box, and two `GlossaryTerm` demos — matching the exact section order specified in the UI spec
- The `## O caminho da Kita à universidade` heading slugifies to `o-caminho-da-kita-a-universidade`, matching the `anchorHref` already baked into `EducationTimeline`'s demo data from Plan 02, so "Ver seção completa" links resolve correctly
- `e2e/onboarding.spec.ts` confirms the route renders its `h1` and the visible timeline region, and that there is no horizontal overflow at a 390px mobile viewport
- `pnpm typecheck`, `pnpm build`, `pnpm lint`, `pnpm test` (280/280), and the new Playwright spec (2/2) all pass

## Task Commits

1. **Task 1: Register components in mdx-components.tsx and create the route shell** — `d53e968` (feat)
2. **Task 2: Author placeholder MDX content with live component demos and Phase 10 heading stubs** — `0e664a4` (feat)
3. **Task 3: Add Playwright coverage for the new route and mobile overflow** — `e3ecf11` (test)

## Files Created/Modified

- `src/mdx-components.tsx` — added `EducationTimeline`, `BerlinCallout`, `GlossaryTerm` as global MDX component registrations, placed before `...components`; no existing overrides touched
- `src/app/guides/german-education-system/page.tsx` — route shell, exact structural mirror of `berlin-school-system/page.tsx` with swapped copy and metadata
- `src/content/guides/german-education-system.mdx` — placeholder content: `<EducationTimeline />` first, Phase 10 heading stub prose, `<BerlinCallout variant="summary">`, `## Glossário` heading, two `<GlossaryTerm>` demos (Ganztag, Ausbildung)
- `e2e/onboarding.spec.ts` — two Playwright tests: route renders h1 + visible timeline region; no horizontal overflow at 390px width

## Decisions Made

- Followed the plan's exact code for the route shell, MDX content, and Playwright tests verbatim — no implementation deviation
- Confirmed via `pnpm build` that the MDX component tags compile correctly against the newly registered `mdx-components.tsx` entries before writing the e2e spec

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None affecting the delivered code. The local sandboxed test environment initially lacked the Playwright Chromium browser binary (`pnpm exec playwright install chromium` resolved this) and intermittently hit `EMFILE`/browser-cache-path inconsistencies tied to how this sandbox isolates cache directories per permission profile — an environment artifact, not a code defect. The onboarding spec was confirmed passing (2/2) in a clean, repeatable run once the browser was available.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 9 (Onboarding Guide Visual Foundation) is now complete: all three plans (BerlinCallout/GlossaryTerm, EducationTimeline, route wiring) are shipped and verified
- `/guides/german-education-system` is live with a scaffold parents can already orient from — full Kita→Uni editorial content is deferred to Phase 10 (ONBD-01–05), and homepage/Guides hub promotion is deferred to Phase 11 (DISC-01–04)
- No blockers identified

---
*Phase: 09-onboarding-guide-visual-foundation*
*Completed: 2026-07-12*

## Self-Check: PASSED

All 3 created files (`src/app/guides/german-education-system/page.tsx`, `src/content/guides/german-education-system.mdx`, `e2e/onboarding.spec.ts`) verified present on disk; all 3 task commits (d53e968, 0e664a4, e3ecf11) verified present in git log; `pnpm typecheck`, `pnpm build`, `pnpm lint`, `pnpm test` (280/280 passing), and `pnpm exec playwright test e2e/onboarding.spec.ts` (2/2 passing) all confirmed green during execution.
