---
phase: 15-profile-ui-tags-narrative
plan: 04
subsystem: ui
tags: [report-correction, mailto, useSearchParams, Suspense, static-export, NARR-06]

requires:
  - phase: 15-profile-ui-tags-narrative
    provides: Wave 0 ReportCorrection RED tests + null stub (Plan 00)
  - phase: 15-profile-ui-tags-narrative
    provides: Compare Suspense + useSearchParams pattern (15-PATTERNS)
provides:
  - Static-export-safe /report-correction/ route with Suspense boundary
  - ReportCorrection client with school prefill via getSchoolBySlug allowlist
  - Encoded mailto covering factual fields, tags, and Perfil da escola (NARR-06)
affects:
  - 15-05 (SchoolProfile correction CTA wiring to /report-correction/?school=)

tech-stack:
  added: []
  patterns:
    - Compare-style Suspense + useSearchParams for static export query pages
    - Directory allowlist resolve for untrusted ?school= query (no open redirect)

key-files:
  created:
    - src/features/schools/ReportCorrection/constants.ts
    - src/app/report-correction/page.tsx
  modified:
    - src/features/schools/ReportCorrection/index.tsx
    - src/features/schools/ReportCorrection/index.test.tsx

key-decisions:
  - "Mock getSchoolBySlug in ReportCorrection tests so Wave 0 synthetic fixture slug can exercise prefill without living in the real directory"
  - "Show CORRECTION_EMAIL beside mailtoBlocked copy for manual fallback"

patterns-established:
  - "ReportCorrection: useSearchParams school param → getSchoolBySlug → encodeURIComponent mailto"
  - "Missing/unknown slug still offers generic mailto with locked missingSchool copy"

requirements-completed: [NARR-06]

duration: 2min
completed: 2026-07-30
---

# Phase 15 Plan 04: Report Correction Page Summary

**Static `/report-correction/` with Suspense, school prefill via allowlist lookup, and encoded mailto that names tags and Perfil da escola**

## Performance

- **Duration:** 2 min
- **Started:** 2026-07-30T05:54:00Z
- **Completed:** 2026-07-30T05:55:48Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Locked `REPORT_COPY` constants match UI-SPEC (scope line names tags + Perfil da escola)
- Client resolves `?school=` only through `getSchoolBySlug`; unknown/missing shows missing-school copy + generic mailto
- Route shell wraps client in Suspense for static-export `useSearchParams` safety

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement ReportCorrection client + constants** - `be7aa6f` (feat)
2. **Task 2: Add /report-correction/ route with Suspense** - `ff1a0ce` (feat)

**Plan metadata:** _(pending docs commit)_

## Files Created/Modified
- `src/features/schools/ReportCorrection/constants.ts` — SCHOOL_QUERY_PARAM, CORRECTION_EMAIL env fallback, locked REPORT_COPY
- `src/features/schools/ReportCorrection/index.tsx` — client prefill + encodeURIComponent mailto
- `src/features/schools/ReportCorrection/index.test.tsx` — mock getSchoolBySlug for synthetic fixture
- `src/app/report-correction/page.tsx` — metadata + Suspense page shell

## Decisions Made
- Mocked `getSchoolBySlug` in unit tests so Wave 0’s `validTaggedSchool` slug exercises prefill without requiring a directory entry
- Surfaced `CORRECTION_EMAIL` next to `mailtoBlocked` copy for the manual-send fallback

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Mock getSchoolBySlug for synthetic fixture slug**
- **Found during:** Task 1 (Implement ReportCorrection client + constants)
- **Issue:** Wave 0 tests use `validTaggedSchool.slug` (`synthetic-directory-school`), which is not in `getRealSchools()`, so allowlist lookup always missed and prefill assertions failed
- **Fix:** Added jest mock returning `validTaggedSchool` for that slug (and undefined otherwise)
- **Files modified:** `src/features/schools/ReportCorrection/index.test.tsx`
- **Verification:** `pnpm test -- ReportCorrection` exits 0
- **Committed in:** `be7aa6f` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Required for GREEN against existing Wave 0 tests; no production behavior change.

## Issues Encountered
None beyond the Wave 0 fixture/allowlist mismatch above.

## User Setup Required
**Correction inbox (optional for local, required before launch):** set `NEXT_PUBLIC_CORRECTION_EMAIL` to the production inbox. Code falls back to `contato@berlinschoolguide.de` when unset.

## Next Phase Readiness
- ReportCorrection page is routable; Plan 05 should wire SchoolProfile CTA to `/report-correction/?school={slug}`
- No blockers

## Self-Check: PASSED

- FOUND: `src/features/schools/ReportCorrection/constants.ts`
- FOUND: `src/features/schools/ReportCorrection/index.tsx`
- FOUND: `src/app/report-correction/page.tsx`
- FOUND: commit `be7aa6f`
- FOUND: commit `ff1a0ce`

---
*Phase: 15-profile-ui-tags-narrative*
*Completed: 2026-07-30*
