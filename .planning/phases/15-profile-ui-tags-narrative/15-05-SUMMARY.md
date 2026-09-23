---
phase: 15-profile-ui-tags-narrative
plan: 05
subsystem: ui
tags: [school-profile, editorial-narrative, tags-section, report-correction, perfil-oficial, NARR]

requires:
  - phase: 15-profile-ui-tags-narrative
    provides: Field+tag Fontes merge via collectCitedSources (Plan 02)
  - phase: 15-profile-ui-tags-narrative
    provides: EditorialNarrative + TagsSection components (Plan 03)
  - phase: 15-profile-ui-tags-narrative
    provides: /report-correction/ route with mailto prefill (Plan 04)
provides:
  - SchoolProfile composition of editorial zone + correction CTA
  - Factual schoolProfile label renamed to Perfil oficial
  - Wave 0 complete + nyquist_compliant VALIDATION
affects:
  - Phase 16 validation/release gates
  - Pilot profile observability for NARR-01/03–06

tech-stack:
  added: []
  patterns:
    - Conditional editorial chrome after header (perfil then tags); no empty shells on non-pilots
    - Correction CTA as native <a> preserving IA trailing-slash href under static export

key-files:
  created: []
  modified:
    - src/features/schools/SchoolProfile/constants.ts
    - src/features/schools/SchoolProfile/index.tsx
    - .planning/phases/15-profile-ui-tags-narrative/15-VALIDATION.md

key-decisions:
  - "Correction CTA uses native <a> instead of next/link so Wave 0 href with trailing slash is preserved (Link normalizes it away)"
  - "SchoolProfile remains a Server Component; TagsSection stays the only client island in the editorial zone"

patterns-established:
  - "Post-header zone: EditorialNarrative then TagsSection then PROFILE_SECTIONS then Fontes then correction link"
  - "qualitativeResearchNotes and qualitativeLastReviewed never render on the public profile"

requirements-completed: [NARR-01, NARR-03, NARR-04, NARR-05, NARR-06]

duration: 3min
completed: 2026-07-30
---

# Phase 15 Plan 05: SchoolProfile Composition Summary

**Pilot profiles compose editorial narrative + tags after header, Perfil oficial factual label, merged Fontes, and correction CTA on every profile**

## Performance

- **Duration:** 3 min
- **Started:** 2026-07-30T05:57:39Z
- **Completed:** 2026-07-30T06:00:51Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Renamed factual `schoolProfile` label to **Perfil oficial**; editorial H2 remains **Perfil da escola**
- Wired `EditorialNarrative` + `TagsSection` after header; correction link on every profile
- Phase gate green: 364 unit tests, typecheck, and static `pnpm build` including `/report-correction`
- VALIDATION marked `wave_0_complete` + `nyquist_compliant` with Task IDs 15-00 through 15-05

## Task Commits

Each task was committed atomically:

1. **Task 1: Rename Perfil oficial and compose editorial zone + correction link** - `fef800f` (feat)
2. **Task 2: Phase gate — full unit suite + VALIDATION update** - `c404e11` (docs)

**Plan metadata:** `0e0f75b` (docs: complete plan)

## Files Created/Modified
- `src/features/schools/SchoolProfile/constants.ts` — `schoolProfile: "Perfil oficial"`
- `src/features/schools/SchoolProfile/index.tsx` — editorial zone + correction CTA composition
- `.planning/phases/15-profile-ui-tags-narrative/15-VALIDATION.md` — Wave 0 complete map

## Decisions Made
- Used native `<a>` for the correction CTA because Next.js `Link` strips the trailing slash before `?school=`, breaking Wave 0 assertions that lock `/report-correction/?school={slug}`
- Kept SchoolProfile as a Server Component; no `"use client"`; TagsSection remains the client boundary for evidence expand

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Correction CTA uses `<a>` instead of Next.js `Link`**
- **Found during:** Task 1 (compose editorial zone + correction link)
- **Issue:** `next/link` normalizes `/report-correction/?school=` → `/report-correction?school=` in the rendered `href`, failing Wave 0 SchoolProfile assertions
- **Fix:** Use a native `<a>` with the exact IA/plan href so the trailing slash is preserved; copy and query remain unchanged
- **Files modified:** `src/features/schools/SchoolProfile/index.tsx`
- **Verification:** `pnpm test -- SchoolProfile` — 10/10 green
- **Committed in:** `fef800f` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Required for Wave 0 href contract; no scope creep. Route and prefill behavior unchanged.

## Issues Encountered
None beyond the Link trailing-slash normalization above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 15 UI complete for NARR-01/03–06; ready for Phase 16 validation/release gates
- Manual-only VALIDATION rows (community visual check, real mailto client) remain for `/gsd-verify-work`

## Self-Check: PASSED

- FOUND: `15-05-SUMMARY.md`, SchoolProfile `index.tsx`/`constants.ts`, `15-VALIDATION.md`
- FOUND commits: `fef800f`, `c404e11`

---
*Phase: 15-profile-ui-tags-narrative*
*Completed: 2026-07-30*
