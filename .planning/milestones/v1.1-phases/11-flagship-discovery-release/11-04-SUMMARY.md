---
phase: 11-flagship-discovery-release
plan: 04
subsystem: content
tags: [mdx, playwright, e2e, onboarding]

# Dependency graph
requires:
  - phase: 11-flagship-discovery-release (Plan 00)
    provides: Onboarding route locked into e2e route arrays; existing e2e/onboarding.spec.ts coverage to extend
  - phase: 11-flagship-discovery-release (Plan 03)
    provides: Berlin guide retitled to "Como funciona o sistema escolar público de Berlim" — the exact link text used in the new Próximos passos item 1
provides:
  - "Próximos passos" closing narrative section in german-education-system.mdx, immediately before Glossário, with three ordered exits (Berlin guide, /schools, first-steps) and no /compare
  - Soft conditional top tip in first-steps.mdx linking back to the onboarding guide
  - e2e assertion locking in the Próximos passos heading, its three link hrefs, and the absence of a /compare exit
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Plain MDX ordered list with bold micro-label + blurb + inline link per item — no new React component, matches the existing 'O que verificar' bullet-list convention already in the file"
    - "Soft recommendation tips are italic MDX paragraphs (no BerlinCallout/border/background) to keep them non-blocking asides"
    - "MDX body has no <section> wrappers around headings, so Playwright scopes closing-section link assertions via the CSS sibling selector `h2:has-text(\"...\") ~ ol` rather than a section locator"

key-files:
  created: []
  modified:
    - src/content/guides/german-education-system.mdx
    - src/content/guides/first-steps.mdx
    - e2e/onboarding.spec.ts

key-decisions:
  - "Scoped the e2e Próximos passos assertions to the ordered list via the `h2:has-text(...) ~ ol` sibling selector instead of a <section> locator, since mdx-components.tsx renders headings as flat siblings with no sectioning wrapper"

patterns-established: []

requirements-completed: [ONBD-06, DISC-03]

# Metrics
duration: 12min
completed: 2026-07-25
---

# Phase 11 Plan 04: Onboarding Closing Narrative & First-Steps Tip Summary

**Added a "Próximos passos" MDX ordered list (Berlin guide → /schools → first-steps, no /compare) immediately before Glossário in the onboarding guide, plus a soft italic top tip in first-steps.mdx linking back to onboarding, completing the linear Germany → Berlin → schools → act discovery path.**

## Performance

- **Duration:** 12 min
- **Tasks:** 2 completed
- **Files modified:** 3

## Accomplishments
- Onboarding guide now closes with a narrative "Próximos passos" section before the reference-only Glossário, giving readers exactly three ordered next actions (ONBD-06)
- Closing exits deliberately exclude `/compare` per D-14 — comparison is discovered inside directory exploration, not offered as a direct onboarding exit
- `first-steps.mdx` opens with a soft, non-blocking conditional tip ("Novo em Berlim?") linking to the onboarding guide, completing the first-steps ↔ onboarding cross-link pair from Plan 03 (DISC-03)
- New Playwright test locks in the Próximos passos heading, all three link hrefs, and the absence of a `/compare` link in that closing region
- Full onboarding e2e suite (4 tests), full unit suite (293 tests / 62 suites), lint, and typecheck all pass with no regressions

## Task Commits

Each task was committed atomically:

1. **Task 1: Insert Próximos passos before Glossário in onboarding MDX** - `e22c81d` (feat)
2. **Task 2: Add first-steps soft top tip linking to onboarding** - `80f9e4d` (feat)

## Files Created/Modified
- `src/content/guides/german-education-system.mdx` - Inserted `## Próximos passos` heading, lead sentence, and a three-item ordered list (Berlin guide, `/schools`, first-steps) immediately before the existing `## Glossário` heading
- `src/content/guides/first-steps.mdx` - Prepended an italic conditional tip paragraph above the existing "Use esta checklist como roteiro..." lead paragraph, linking to `/guides/german-education-system`
- `e2e/onboarding.spec.ts` - Added a test asserting the "Próximos passos" H2 is visible, the ordered list's three links resolve to the correct hrefs, and no link in that list points to `/compare`

## Decisions Made
- Used the CSS sibling selector `h2:has-text("Próximos passos") ~ ol` to scope the e2e link assertions to the new closing section, since `mdx-components.tsx` renders MDX headings and body content as flat siblings (no `<section>` wrapper) — confirmed this is the only `<ol>` in the document, so the selector is unambiguous
- Kept both insertions as plain MDX (heading + ordered list; italic paragraph) with zero new React components or props, per the plan's explicit "no BerlinCallout, no mini cards" constraint

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

Running the e2e suite locally required two one-off environment fixes unrelated to the plan's code changes: Playwright's Chromium browser binary was not yet installed in this sandbox (`npx playwright install chromium`), and a stray `next dev` process from an earlier attempt was left holding port 4310 (killed manually). Neither affected production code. `next-env.d.ts` was transiently modified by running `next dev`/`typecheck` locally and reverted before committing, since it is a generated file unrelated to this plan.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 11's core discovery-path requirements (ONBD-06, DISC-01–04) are now fully implemented across Plans 01–04; REL-01–03 metadata/a11y/smoke coverage was scaffolded in Plan 00 and greened progressively by Plans 01 and 03
- Remaining Phase 11 work (per STATE.md: Plan 4 of 6) should proceed with whatever plans 05/06 cover — this plan did not touch `/schools` directory copy (D-12) or `berlin-school-system.mdx` cross-links, both explicitly out of scope here

## Self-Check: PASSED

- FOUND: `src/content/guides/german-education-system.mdx` contains `## Próximos passos` (line 239) immediately before `## Glossário` (line 251), with the three required links (`/guides/berlin-school-system`, `[Ver escolas](/schools)`, `[Primeiros passos](/guides/first-steps)`) and no `/compare` in between
- FOUND: `src/content/guides/first-steps.mdx` opens with `Novo em Berlim?` (line 1) linking to `/guides/german-education-system` (line 3), with `Use esta checklist como roteiro` still present as the next paragraph
- FOUND: `e2e/onboarding.spec.ts` contains the `Próximos passos` test (line 57) with three href assertions and a `/compare` exclusion check
- FOUND: commit `e22c81d` (feat(11-04): add Próximos passos closing section to onboarding guide)
- FOUND: commit `80f9e4d` (feat(11-04): add soft top tip to first-steps linking to onboarding guide)
- FOUND: full onboarding e2e suite green — 4/4 tests passed (including the new closing-section test) after installing the Chromium browser binary
- FOUND: full unit suite green — 62 test suites / 293 tests passed; `pnpm lint` (0 errors, pre-existing warnings only) and `pnpm typecheck` clean

---
*Phase: 11-flagship-discovery-release*
*Completed: 2026-07-25*
