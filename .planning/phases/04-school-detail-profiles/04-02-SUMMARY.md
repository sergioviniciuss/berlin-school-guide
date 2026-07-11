---
phase: 04-school-detail-profiles
plan: 02
subsystem: schools
tags: [nextjs, profile, evidence, tailwind, jest, static-export]

requires:
  - phase: 04-school-detail-profiles
    provides: getSchoolBySlug, ProfileFieldRow, ProfileSection, StatusBadge, collectCitedSources
provides:
  - SchoolProfile hero and four thematic field sections
  - SourcesSection Fontes bibliography with grouped source cards
  - Static /schools/[slug] route with generateStaticParams for 10 schools
  - Portuguese segment 404 with Voltar ao diretório CTA
affects:
  - 04-03 directory card links and SiteHeader active state

tech-stack:
  added: []
  patterns:
    - "SchoolProfile orchestrates PROFILE_SECTIONS over getSchoolFieldByPath"
    - "Hero website link only when website.evidence.status is verified"
    - "SourcesSection filters anecdotal_reserved via formatSourceType null"
    - "dynamicParams=false closed slug set for static export"

key-files:
  created:
    - src/features/schools/SchoolProfile/constants.ts
    - src/features/schools/SchoolProfile/index.tsx
    - src/features/schools/SchoolProfile/index.test.tsx
    - src/features/schools/SourcesSection/index.tsx
    - src/features/schools/SourcesSection/index.test.tsx
    - src/app/schools/[slug]/page.tsx
    - src/app/schools/[slug]/not-found.tsx
  modified: []

key-decisions:
  - "Field label tests use getAllByText to tolerate hero duplicate labels (e.g. Site da escola)"
  - "Research dates line renders only when lastResearched or lastSourceChecked exist on school.research"

patterns-established:
  - "Profile pages use max-w-3xl editorial shell separate from directory max-w-7xl"
  - "Fontes source cards expose id=source-{sourceId} anchors for Ver fonte links"

requirements-completed: [PROF-01, PROF-02, PROF-03, PROF-04, PROF-06]

duration: 12min
completed: 2026-07-11
---

# Phase 4 Plan 02: SchoolProfile Composition and Static Route Summary

**SchoolProfile hero with coverage disclaimer, all 23 evidence-labeled field rows, grouped Fontes bibliography, and static `/schools/[slug]` pages for all 10 Lichtenberg schools.**

## Performance

- **Duration:** 12 min
- **Started:** 2026-07-11T17:35:00Z
- **Completed:** 2026-07-11T17:47:00Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- `SchoolProfile` renders rich hero (eyebrow, badge, coverage block, methodology link) plus Identificação, Oferta pedagógica, Apoio à família, and Inspeção sections with all 23 field labels
- Directory-tier fixture shows `Informação não encontrada` for unsupported detailed fields — never hidden
- `SourcesSection` deduplicates and groups cited sources with Publicador/Consultado em metadata and `#source-{id}` anchors
- `/schools/[slug]` route pre-renders 10 school profiles at build time with `dynamicParams = false` and Portuguese metadata
- Segment `not-found.tsx` shows Escola não encontrada with Voltar ao diretório primary CTA

## Task Commits

Each task was committed atomically:

1. **Task 1: SchoolProfile, SourcesSection, and constants with tests** - `0aa866d` (test), `13fa7b2` (feat)
2. **Task 2: Static profile route, metadata, and 404 page** - `7a8ef2c` (feat)

## Verification

```bash
pnpm test -- src/features/schools/SchoolProfile/index.test.tsx \
  src/features/schools/SourcesSection/index.test.tsx --no-coverage
# 2 suites, 10 tests passed

pnpm build
# 10 school profile routes generated (adam-ries-schule … +7 more)
# out/schools/*.html count: 10 (Next.js 16 flat export format)
```

## Files Created/Modified

- `src/features/schools/SchoolProfile/constants.ts` - PROFILE_SECTIONS and profileFieldLabels per UI-SPEC
- `src/features/schools/SchoolProfile/index.tsx` - Hero + thematic sections + SourcesSection orchestration
- `src/features/schools/SchoolProfile/index.test.tsx` - 6 profile rendering tests
- `src/features/schools/SourcesSection/index.tsx` - Grouped Fontes bibliography cards
- `src/features/schools/SourcesSection/index.test.tsx` - 4 sources section tests
- `src/app/schools/[slug]/page.tsx` - generateStaticParams, generateMetadata, SchoolProfile route
- `src/app/schools/[slug]/not-found.tsx` - Portuguese 404 page

## Decisions Made

- Tests query duplicate labels (Site da escola) with `getAllByText` / `getByRole(heading)` since hero and field rows share copy per UI-SPEC
- Research dates line omitted when neither date exists on directory-tier research metadata

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Plan verification command `out/schools/*/index.html` expects directory-style export; Next.js 16 emits flat `out/schools/{slug}.html` files — build output confirms 10 profile pages via route table and file count

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Ready for plan 04-03 (SchoolCard link wrapping, SiteHeader `/schools/*` active state, optional e2e smoke extension). Profile pages are live at `/schools/[slug]` for all 10 schools.

## Self-Check: PASSED

- FOUND: src/features/schools/SchoolProfile/index.tsx
- FOUND: src/features/schools/SourcesSection/index.tsx
- FOUND: src/app/schools/[slug]/page.tsx
- FOUND: src/app/schools/[slug]/not-found.tsx
- FOUND: 0aa866d, 13fa7b2, 7a8ef2c

---
*Phase: 04-school-detail-profiles*
*Completed: 2026-07-11*
