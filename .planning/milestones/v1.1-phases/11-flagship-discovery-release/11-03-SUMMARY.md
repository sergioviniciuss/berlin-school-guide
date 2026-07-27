---
phase: 11-flagship-discovery-release
plan: 03
subsystem: ui
tags: [react, next-link, testing-library, jest, guide-intro]

# Dependency graph
requires:
  - phase: 11-flagship-discovery-release (Plan 00)
    provides: RED smoke assertion expecting the D-08 Berlin H1 retitle, greened by this plan
provides:
  - GuideIntro.description widened to ReactNode so guide intros can embed next/link cross-links
  - Onboarding ↔ Berlin guide intros cross-linked with the recommended reading path (DISC-03/DISC-04)
  - Berlin guide retitled to "Como funciona o sistema escolar público de Berlim" (D-08) with polished Portuguese metadata (REL-01)
affects: [11-04-plan]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "GuideIntro.description widened from string to ReactNode — callers pass JSX fragments with next/link instead of the component using dangerouslySetInnerHTML"

key-files:
  created: []
  modified:
    - src/features/guides/GuideIntro/index.tsx
    - src/features/guides/GuideIntro/index.test.tsx
    - src/app/guides/german-education-system/page.tsx
    - src/app/guides/berlin-school-system/page.tsx
    - src/app/guides/berlin-school-system/page.test.tsx

key-decisions:
  - "Widened the existing description prop to ReactNode rather than adding a second paragraph/prop, matching D-09's 'no separate relationship section' intent"
  - "Kept the Berlin GuideIntro's reciprocal link conditional ('Se você ainda não conhece...') per the D-10 example framing, rather than an unconditional cross-link"

patterns-established: []

requirements-completed: [DISC-03, DISC-04, REL-01]

# Metrics
duration: 8min
completed: 2026-07-25
---

# Phase 11 Plan 03: GuideIntro Cross-Links & Berlin Retitle Summary

**Widened `GuideIntro.description` to `ReactNode` and used it to wire a complementary, cross-linked reading path between the onboarding and Berlin guide intros, while retitling the Berlin guide to "Como funciona o sistema escolar público de Berlim" with matching Portuguese metadata polish.**

## Performance

- **Duration:** 8 min
- **Tasks:** 2 completed
- **Files modified:** 5

## Accomplishments
- `GuideIntro.description` now accepts `ReactNode`, letting callers embed a `next/link` inline without any markup helper or `dangerouslySetInnerHTML` (DISC-04)
- Onboarding guide intro links forward to the Berlin public-school guide with its full retitled name as the accessible link text (DISC-03)
- Berlin guide intro links back to the onboarding guide with a soft, conditional recommendation ("Se você ainda não conhece...") — not a blocking requirement (DISC-03/DISC-04)
- Berlin guide H1 retitled to "Como funciona o sistema escolar público de Berlim" (D-08), greening the Wave 0 smoke assertion added in Plan 00
- Berlin page metadata title/description polished to the public-school framing (REL-01)

## Task Commits

Each task was committed atomically:

1. **Task 1: Widen GuideIntro to ReactNode and add linked-description test** - `cf23f0b` (feat)
2. **Task 2: Wire complementary intros, Berlin retitle, and metadata polish** - `b2ed21a` (feat)

## Files Created/Modified
- `src/features/guides/GuideIntro/index.tsx` - Changed `description: string` to `description: ReactNode`; JSX markup (`{description}` inside the existing `<p>`) unchanged
- `src/features/guides/GuideIntro/index.test.tsx` - Kept the existing string-description test; added a test rendering a linked description and asserting the link's accessible name and `href`
- `src/app/guides/german-education-system/page.tsx` - Imported `next/link`; widened the `GuideIntro` description to a fragment ending with an inline link to `/guides/berlin-school-system` (`text-blue-700 underline`); metadata unchanged
- `src/app/guides/berlin-school-system/page.tsx` - Imported `next/link`; retitled H1 to "Como funciona o sistema escolar público de Berlim"; widened description to a fragment with a conditional reciprocal link to `/guides/german-education-system`; updated `buildPageMetadata` title to "Sistema escolar público em Berlim" with a matching description
- `src/app/guides/berlin-school-system/page.test.tsx` - Updated the H1 assertion regex from "escola primária" to "sistema escolar público de berlim"

## Decisions Made
- Followed the UI-SPEC and RESEARCH.md Pattern 1 verbatim: widened the existing `description` prop rather than introducing a new prop or a second paragraph, per D-09's "no separate relationship section" intent
- Left `first-steps/page.tsx`'s `GuideIntro` call and the `/schools` directory intro untouched, per the plan's explicit interface boundary (D-11 tip is MDX in Plan 04; D-12 locks directory copy)
- Left the onboarding metadata title ("Sistema educacional alemão") unchanged per UI-SPEC, only polishing the Berlin metadata

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Confirmed via `pnpm test` (full suite: 62 suites / 293 tests), `pnpm lint` (0 errors, only pre-existing unrelated warnings), and `pnpm typecheck` (clean) that no regressions were introduced.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The Wave 0 smoke assertion (`e2e/smoke.spec.ts`, from Plan 00) expecting the Berlin H1 "Como funciona o sistema escolar público de Berlim" should now green against this plan's production code.
- Plan 04 can proceed with the "Próximos passos" MDX section and the first-steps top conditional tip — this plan did not touch any `.mdx` content files.

## Self-Check: PASSED

- FOUND: `src/features/guides/GuideIntro/index.tsx` contains `ReactNode` (lines 1, 6) and no `description: string`
- FOUND: `src/features/guides/GuideIntro/index.test.tsx` contains `berlin-school-system` (lines 31, 44)
- FOUND: `src/app/guides/german-education-system/page.tsx` contains `href="/guides/berlin-school-system"` (line 26)
- FOUND: `src/app/guides/berlin-school-system/page.tsx` contains `href="/guides/german-education-system"` (line 27), `title="Como funciona o sistema escolar público de Berlim"` (line 19), and `title: "Sistema escolar público em Berlim"` (line 8)
- FOUND: `src/app/guides/berlin-school-system/page.test.tsx` contains `/como funciona o sistema escolar público de berlim/i` (line 21)
- FOUND: no `dangerouslySetInnerHTML` in any of the touched files
- FOUND: commit `cf23f0b` (feat(11-03): widen GuideIntro description to ReactNode)
- FOUND: commit `b2ed21a` (feat(11-03): cross-link guide intros and retitle Berlin guide)
- FOUND: full unit suite green — 62 test suites / 293 tests passed after both commits; `pnpm lint` (0 errors, pre-existing warnings only) and `pnpm typecheck` clean

---
*Phase: 11-flagship-discovery-release*
*Completed: 2026-07-25*
