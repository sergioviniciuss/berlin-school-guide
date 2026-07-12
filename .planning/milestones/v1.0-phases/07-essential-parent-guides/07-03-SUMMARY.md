---
phase: 07-essential-parent-guides
plan: 03
subsystem: navigation
tags: [navigation, cross-links, e2e, filters]

requires:
  - phase: 07-essential-parent-guides
    provides: /guides routes from 07-01
provides:
  - Guias in SiteHeader (after Escolas) and SiteFooter
  - Active nav highlighting for /guides/*
  - Homepage third journey card linking to /guides
  - Directory and compare cross-links to guides
  - Ganztag/Willkommensklasse filter help → system guide anchors
  - E2E guides journey (header nav + homepage card)
affects:
  - Phase 8 (e2e now covers guides navigation)

tech-stack:
  added: []
  patterns:
    - "Filter term help links to guide anchors instead of methodology"

key-files:
  modified:
    - src/features/navigation/SiteHeader/constants.ts
    - src/features/navigation/SiteHeader/index.tsx
    - src/features/navigation/SiteHeader/index.test.tsx
    - src/features/navigation/SiteFooter/index.tsx
    - src/features/navigation/SiteFooter/index.test.tsx
    - src/features/home/HomeJourneyCards/index.tsx
    - src/features/home/HomeJourneyCards/index.test.tsx
    - src/app/page.test.tsx
    - src/features/schools/SchoolDirectory/index.tsx
    - src/features/schools/SchoolDirectory/index.test.tsx
    - src/features/schools/SchoolComparison/index.tsx
    - src/features/schools/SchoolComparison/index.test.tsx
    - src/features/schools/SchoolFilters/index.tsx
    - src/features/schools/SchoolFilters/index.test.tsx
    - e2e/smoke.spec.ts

requirements-completed: [GUID-01, GUID-02, GUID-03]

duration: 15min
completed: 2026-07-11
---

# Phase 7 Plan 03: Navigation Integration and E2E

**Wire Guias into site chrome, cross-links, filter help URLs, and Playwright coverage**

## Accomplishments

- Added Guias nav item between Escolas and Comparar with child-route active state
- Added homepage "Entender o sistema escolar" journey card (3 cards total)
- Directory intro links "Novo em Berlim? Comece pelos guias"; compare header links to guides
- Updated Ganztag help → `#o-que-e-ganztag`; Willkommensklasse → `#glossario`
- Added 2 e2e tests: header nav to system guide, homepage card to hub

## Verification

```bash
pnpm test -- --testPathPattern="SiteHeader|SiteFooter|HomeJourneyCards|SchoolDirectory|SchoolComparison|SchoolFilters" --no-coverage
pnpm e2e -- e2e/smoke.spec.ts
pnpm build
```

11 e2e tests passed (was 9); 267 unit tests total.
