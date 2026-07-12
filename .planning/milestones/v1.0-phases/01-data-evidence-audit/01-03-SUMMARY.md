---
phase: 01-data-evidence-audit
plan: 01-03
subsystem: ui
tags: [school-card, trust-ux, copy, synthetic-isolation, evidence-coverage]

requires:
  - phase: 01-02
    provides: coverageLevel, coverageTierLabel, and v2 evidenceCoverage on SchoolDirectoryItem
provides:
  - SchoolCard badges (Perfil básico/detailed) and Pesquisa tier labels in coverage display
  - Field visibility rules hiding missing Facts; muted not_confirmed tone
  - Honest Berlin School Guide copy on directory, schools page, and homepage
  - Synthetic fixtures isolated from production schoolDirectoryData exports
affects:
  - Phase 4 (school detail pages will replace coming-soon CTA)
  - Phase 3 (navigation and homepage journey)

tech-stack:
  added: []
  patterns:
    - "shouldRenderFact gates Fact rendering when status is missing and value is null"
    - "Synthetic fixtures imported directly in tests via school/fixtures, not production module"

key-files:
  created: []
  modified:
    - src/features/schools/SchoolCard/index.tsx
    - src/features/schools/SchoolCard/index.test.tsx
    - src/features/schools/SchoolCard/utils.ts
    - src/features/schools/SchoolDirectory/index.tsx
    - src/app/schools/page.tsx
    - src/app/page.tsx
    - src/features/schools/schoolDirectoryData/index.ts
    - src/features/schools/schoolDirectoryData/index.test.ts

key-decisions:
  - "Profile CTA uses honest non-link coming-soon message until Phase 4 detail pages exist"
  - "Removed getSyntheticSchools export; tests import fixtures directly from school/fixtures"
  - "Empty string name fallback replaces synthetic production placeholder in toSchoolDirectoryItem"

patterns-established:
  - "SchoolCard coverage line: {coverageTierLabel} · {percentage}% · level-aware disclaimer"
  - "Homepage primary CTA links to /schools for Lichtenberg directory discovery"

requirements-completed: [DATA-04, DATA-05, DATA-06]

duration: 14min
completed: 2026-07-11
---

# Phase 01 Plan 03: Trust UX — Cards, Copy, Synthetic Isolation Summary

**SchoolCard shows research depth badges and tier labels, production pages use honest Lichtenberg messaging, and synthetic fixtures are unreachable from the data module**

## Performance

- **Duration:** 14 min
- **Started:** 2026-07-11T11:03:00Z
- **Completed:** 2026-07-11T11:17:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments

- SchoolCard renders Perfil básico/detailed badges, Pesquisa básica/detailed tier in coverage, and hides missing Facts
- Directory header, schools metadata, and homepage replaced synthetic/M2 scaffolding with honest V1 copy and `/schools` CTA
- Removed `getSyntheticSchools` from production exports; tests use fixtures directly; eliminated `"Escola sintética sem nome"` fallback

## Task Commits

Each task was committed atomically:

1. **Task 1: Update SchoolCard with badges, tier label, and field visibility rules** - `960f753` (feat)
2. **Task 2: Replace synthetic/M2 copy in directory, schools page, and homepage** - `203bc67` (feat)
3. **Task 3: Isolate synthetic fixtures from production exports** - `6951ae3` (feat)

## Files Created/Modified

- `src/features/schools/SchoolCard/index.tsx` - badges, tier coverage text, field gating, coming-soon CTA
- `src/features/schools/SchoolCard/utils.ts` - `shouldRenderFact` helper alongside `getStatusTone`
- `src/features/schools/SchoolCard/index.test.tsx` - badge, tier, missing-field, and CTA tests
- `src/features/schools/SchoolDirectory/index.tsx` - honest header copy with Lichtenberg scope
- `src/app/schools/page.tsx` - metadata without synthetic wording
- `src/app/page.tsx` - Berlin School Guide eyebrow, honest description, `/schools` link
- `src/features/schools/schoolDirectoryData/index.ts` - removed synthetic export; empty name fallback
- `src/features/schools/schoolDirectoryData/index.test.ts` - real-school count and direct fixture regression test

## Decisions Made

- Profile CTA remains text-only (no `/schools/[slug]` link) until Phase 4 detail pages ship
- Synthetic shape regression preserved by importing `validDirectoryOnlySchool` directly in tests
- `getStatusTone` already mutes `not_confirmed` via non-verified branch — no extra styling needed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Jest 30 requires `--testPathPatterns` (plural) instead of plan's `--testPathPattern` flag
- Plan-level `rg` for M2 still matches legacy `src/app/guides/m2-smoke/page.tsx` (pre-existing route, out of scope)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Directory cards now surface research depth honestly for parent trust evaluation
- Homepage → `/schools` journey is wired; navigation phase can build on this entry point
- School detail pages (Phase 4) should replace the coming-soon CTA with real profile links
- Legacy `/guides/m2-smoke` route still exists with M2 naming — candidate for cleanup in a future phase

## Self-Check: PASSED

- FOUND: src/features/schools/SchoolCard/index.tsx
- FOUND: src/features/schools/SchoolDirectory/index.tsx
- FOUND: src/features/schools/schoolDirectoryData/index.ts
- FOUND: .planning/phases/01-data-evidence-audit/01-03-SUMMARY.md
- FOUND: 960f753
- FOUND: 203bc67
- FOUND: 6951ae3

---
*Phase: 01-data-evidence-audit*
*Completed: 2026-07-11*
