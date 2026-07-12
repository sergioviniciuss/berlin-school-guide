---
phase: 04-school-detail-profiles
plan: 03
subsystem: schools
tags: [nextjs, evidence, navigation, playwright, jest]

requires:
  - phase: 04-school-detail-profiles
    provides: SchoolProfile route, profile field primitives from 04-01 and 04-02
provides:
  - Three-school detailed/profile_ready metadata after honest field audit
  - Whole-card SchoolCard Link to /schools/[slug] with Ver perfil affordance
  - SiteHeader Escolas active state on /schools/* via pathname.startsWith
  - E2e smoke test for directory card → profile navigation
affects:
  - Phase 5 directory UX polish
  - Phase 8 full e2e CI

tech-stack:
  added: []
  patterns:
    - "Single Link wrapper on directory cards — no nested interactive elements"
    - "SiteHeader isActive uses startsWith for /schools/* profile routes"
    - "profile_ready upgrade gated by pnpm validate:data after per-field audit"

key-files:
  created: []
  modified:
    - src/content/schools/real/lichtenbergPrimarySchools/index.ts
    - src/features/schools/SchoolCard/index.tsx
    - src/features/schools/SchoolCard/index.test.tsx
    - src/features/navigation/SiteHeader/index.tsx
    - src/features/navigation/SiteHeader/index.test.tsx
    - e2e/smoke.spec.ts

key-decisions:
  - "Adam-Ries and Lew-Tolstoi inspection fields explicitly set missing rather than defaulting to not_confirmed on detailed tier"
  - "SchoolCard uses recommended Ver perfil + ChevronRight hint with aria-label Ver perfil de {name}"

patterns-established:
  - "Directory cards navigate via whole-card Link; citation links remain profile-page only"
  - "Escolas nav highlights on both /schools and /schools/[slug]"

requirements-completed: [PROF-05, PROF-06, PROF-07]

duration: 12min
completed: 2026-07-11
---

# Phase 4 Plan 03: Data Tier Upgrade and Directory Navigation Integration Summary

**Three Lichtenberg schools upgraded to honest detailed/profile_ready metadata; directory cards link to profiles; Escolas nav stays active on profile routes; e2e smoke confirms Lew-Tolstoi card → profile flow.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-07-11T17:37:00Z
- **Completed:** 2026-07-11T17:49:00Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- Adam-Ries, Lew-Tolstoi, and Richard-Wagner pass `pnpm validate:data` with `detailed` / `profile_ready` metadata; seven schools remain `directory_only`
- SchoolCard wraps entire card in `Link` to `/schools/[slug]` with `Ver perfil` hint; em-breve copy removed
- SiteHeader highlights Escolas on `/schools/adam-ries-schule` via `pathname.startsWith("/schools/")`
- E2e smoke navigates Lew-Tolstoi directory card to profile with h1, Fontes heading, and Verificado badge visible

## Task Commits

Each task was committed atomically:

1. **Task 1: Three-school detailed tier metadata upgrade** - `d4621e7` (feat)
2. **Task 2: SchoolCard whole-card link and SiteHeader active state** - `f126fd5` (test), `c21752f` (feat)
3. **Task 3: E2e directory-to-profile navigation smoke test** - `b3f48c2` (feat)

## Verification

```bash
pnpm validate:data
# Validated 2 fixture school(s) and 10 real school record(s).

pnpm test -- src/features/schools/SchoolCard/index.test.tsx src/features/navigation/SiteHeader/index.test.tsx --no-coverage
# 2 suites, 15 tests passed

pnpm e2e -- -g "profile"
# 4 passed (includes navigates from directory card to school profile)

rg "em breve" src/features/schools/SchoolCard/
# Only in test asserting absence — not in index.tsx
```

## Files Created/Modified

- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` - Three-school metadata upgrade with explicit missing inspection fields
- `src/features/schools/SchoolCard/index.tsx` - Whole-card Link wrapper with Ver perfil affordance
- `src/features/schools/SchoolCard/index.test.tsx` - Link, aria-label, and hint assertions; em-breve removed
- `src/features/navigation/SiteHeader/index.tsx` - startsWith active matching for /schools/*
- `src/features/navigation/SiteHeader/index.test.tsx` - Profile route Escolas active test
- `e2e/smoke.spec.ts` - Directory card → Lew-Tolstoi profile smoke test

## Decisions Made

- Adam-Ries and Lew-Tolstoi inspection fields explicitly `missing` to avoid `primarySchool()` default `not_confirmed` on detailed tier without acceptable inspection sources
- SchoolCard uses UI-SPEC recommended `Ver perfil` + `ChevronRight` with `aria-label={`Ver perfil de ${school.name}`}`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Cleared Next.js dev lock for e2e webServer startup**
- **Found during:** Task 3 (e2e profile smoke test)
- **Issue:** Playwright webServer failed because another `next dev` instance held the project lock (PID 18948)
- **Fix:** Stopped stale dev process and removed `.next/dev/lock` before running `pnpm e2e -- -g "profile"`
- **Files modified:** None (runtime environment only)
- **Verification:** E2e profile test passed (4 tests, 4.5s)
- **Committed in:** b3f48c2 (Task 3 commit — test code unchanged)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Environment fix only; no code or scope changes.

## Issues Encountered

None beyond the dev-server lock conflict resolved during e2e verification.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 4 plan 04-03 complete. Directory cards navigate to live profile pages; three schools show `Perfil detalhado` badge in directory and on profile. Ready for Phase 5 directory UX polish or phase verification.

## Self-Check: PASSED

- FOUND: src/content/schools/real/lichtenbergPrimarySchools/index.ts
- FOUND: src/features/schools/SchoolCard/index.tsx
- FOUND: src/features/navigation/SiteHeader/index.tsx
- FOUND: e2e/smoke.spec.ts
- FOUND: .planning/phases/04-school-detail-profiles/04-03-SUMMARY.md
- FOUND: d4621e7, f126fd5, c21752f, b3f48c2

---
*Phase: 04-school-detail-profiles*
*Completed: 2026-07-11*
