---
phase: 04-school-detail-profiles
plan: 01
subsystem: schools
tags: [nextjs, evidence, profile, tailwind, jest]

requires:
  - phase: 03-homepage-navigation-core-journey
    provides: Site shell, SchoolCard patterns, formatSchoolField vocabulary
provides:
  - getSchoolBySlug and getAllSchoolSlugs static lookup
  - getSchoolFieldByPath dotted-path FieldValue resolver
  - collectCitedSources deduped Fontes aggregation
  - formatSourceType Portuguese source-type labels
  - StatusBadge, ProfileFieldRow, ProfileSection UI primitives
affects:
  - 04-02-SchoolProfile route composition
  - 04-03 directory card and navigation updates

tech-stack:
  added: []
  patterns:
    - "Thin getSchoolBySlug find over getRealSchools"
    - "Shared getSchoolFieldByPath extracted from coverage resolver"
    - "collectCitedSources walks all 23 field paths regardless of status"
    - "Tailwind-only StatusBadge pills via formatFieldStatus"

key-files:
  created:
    - src/features/schools/getSchoolBySlug/index.ts
    - src/features/schools/getSchoolFieldByPath/index.ts
    - src/features/schools/collectCitedSources/index.ts
    - src/features/schools/collectCitedSources/types.ts
    - src/features/evidence/formatSourceType/index.ts
    - src/features/schools/StatusBadge/index.tsx
    - src/features/schools/ProfileFieldRow/index.tsx
    - src/features/schools/ProfileSection/index.tsx
  modified: []

key-decisions:
  - "ProfileFieldRow formats not_confirmed/conflicting values directly from raw field values rather than status-fallback formatters"
  - "collectCitedSources includes citations from all field statuses per D-17"

patterns-established:
  - "Profile field rows always render StatusBadge alongside value text"
  - "Verified fields expose Ver fonte anchor and Abrir original with rel=noopener noreferrer"

requirements-completed: [PROF-01, PROF-02, PROF-03, PROF-04]

duration: 15min
completed: 2026-07-11
---

# Phase 4 Plan 01: Profile Data Layer and Field Primitives Summary

**Static slug lookup, dotted-path field resolution, deduplicated Fontes aggregation, and reusable profile field row components with evidence badges and citation affordances.**

## Performance

- **Duration:** 15 min
- **Started:** 2026-07-11T17:34:00Z
- **Completed:** 2026-07-11T17:49:00Z
- **Tasks:** 3
- **Files modified:** 13

## Accomplishments

- `getSchoolBySlug` / `getAllSchoolSlugs` resolve all 10 Lichtenberg schools from validated real data
- `getSchoolFieldByPath` resolves nested paths like `location.district` for profile rendering
- `collectCitedSources` dedupes by sourceId, groups by type order, sorts titles pt-BR, includes not_confirmed citations
- `formatSourceType` maps V1 source enums to Portuguese labels (null for anecdotal_reserved)
- `StatusBadge`, `ProfileFieldRow`, and `ProfileSection` implement UI-SPEC field row contract with security mitigations (text escaping, external link rel)

## Task Commits

Each task was committed atomically:

1. **Task 1: Slug lookup and field-path resolver with tests** - `093fb68` (feat)
2. **Task 2: Citation aggregation and source-type labels with tests** - `e4da0de` (feat)
3. **Task 3: StatusBadge, ProfileFieldRow, and ProfileSection with tests** - `6a772ef` (feat)

## Verification

```bash
pnpm test -- src/features/schools/getSchoolBySlug/index.test.ts \
  src/features/schools/getSchoolFieldByPath/index.test.ts \
  src/features/schools/collectCitedSources/index.test.ts \
  src/features/evidence/formatSourceType/index.test.ts \
  src/features/schools/ProfileFieldRow/index.test.tsx --no-coverage
# 5 suites, 21 tests passed

pnpm typecheck
# passed
```

## Files Created/Modified

- `src/features/schools/getSchoolBySlug/index.ts` - Slug lookup over getRealSchools
- `src/features/schools/getSchoolFieldByPath/index.ts` - Dotted-path FieldValue resolver
- `src/features/schools/collectCitedSources/index.ts` - Fontes citation aggregation
- `src/features/schools/collectCitedSources/types.ts` - CitedSourceEntry and GroupedCitedSources types
- `src/features/evidence/formatSourceType/index.ts` - Source type enum to Portuguese label
- `src/features/schools/StatusBadge/index.tsx` - Evidence status Tailwind pill
- `src/features/schools/ProfileFieldRow/index.tsx` - Per-field value, badge, note, citations
- `src/features/schools/ProfileSection/index.tsx` - Section h2 + dl wrapper
- Colocated test files for each unit above

## Decisions Made

- ProfileFieldRow shows raw formatted values for not_confirmed/conflicting fields (not status-fallback text from formatBoolean/formatStringList) so parents see the inferred/conflicting claim alongside the badge and note
- collectCitedSources walks all importantSchoolFieldPathsDetailedV2 paths regardless of field status to satisfy D-17

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Ready for plan 04-02 (SchoolProfile orchestration and `/schools/[slug]` route). Data layer and field primitives are tested and composable.

## Self-Check: PASSED

- FOUND: src/features/schools/getSchoolBySlug/index.ts
- FOUND: src/features/schools/getSchoolFieldByPath/index.ts
- FOUND: src/features/schools/collectCitedSources/index.ts
- FOUND: src/features/evidence/formatSourceType/index.ts
- FOUND: src/features/schools/StatusBadge/index.tsx
- FOUND: src/features/schools/ProfileFieldRow/index.tsx
- FOUND: src/features/schools/ProfileSection/index.tsx
- FOUND: 093fb68, e4da0de, 6a772ef

---
*Phase: 04-school-detail-profiles*
*Completed: 2026-07-11*
