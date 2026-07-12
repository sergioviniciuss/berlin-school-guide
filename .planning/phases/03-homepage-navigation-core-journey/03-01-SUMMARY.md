---
phase: 03-homepage-navigation-core-journey
plan: 01
subsystem: ui
tags: [nextjs, shadcn, sheet, navigation, react-testing-library]

requires: []
provides:
  - Global SiteHeader with desktop nav and mobile Sheet drawer
  - Global SiteFooter with copyright and Metodologia link
  - shadcn Sheet primitive at colocated path
  - Root layout wired with shared chrome on all routes
affects: [03-02-homepage, 03-03-e2e, phase-4-school-detail]

tech-stack:
  added: ["@radix-ui/react-dialog (via shadcn sheet)"]
  patterns:
    - "Client navigation island (SiteHeader) in server root layout"
    - "NAV_ITEMS as const for typed static nav paths"
    - "Exact pathname active-link detection (home only on /)"

key-files:
  created:
    - src/components/ui/Sheet/index.tsx
    - src/features/navigation/SiteHeader/index.tsx
    - src/features/navigation/SiteHeader/constants.ts
    - src/features/navigation/SiteHeader/types.ts
    - src/features/navigation/SiteHeader/index.test.tsx
    - src/features/navigation/SiteFooter/index.tsx
    - src/features/navigation/SiteFooter/index.test.tsx
  modified:
    - src/app/layout.tsx
    - package.json
    - pnpm-lock.yaml

key-decisions:
  - "Relocated shadcn Sheet output to src/components/ui/Sheet/index.tsx with cn from @/components/ui/utils"
  - "Portuguese aria-label on Sheet close button per UI-SPEC (Fechar menu de navegação)"
  - "Three live nav links only — no Guias, Comparar, or Em breve placeholders"

patterns-established:
  - "SiteHeader: usePathname + controlled Sheet state for mobile nav"
  - "SiteFooter: server component with dynamic copyright year"

requirements-completed: [NAV-02]

duration: 15min
completed: 2026-07-11
---

# Phase 3 Plan 01: Site Chrome — Header, Footer, Layout Summary

**Global site chrome with sticky SiteHeader (desktop nav + mobile Sheet), minimal SiteFooter, and root layout wiring for three live routes only.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-07-11T16:22:00Z
- **Completed:** 2026-07-11T16:37:28Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments

- Installed shadcn Sheet at colocated `src/components/ui/Sheet/index.tsx`
- Built `SiteHeader` with logo, three nav links (Início, Escolas, Metodologia), exact pathname active styling, and mobile hamburger Sheet
- Built `SiteFooter` with copyright year and Metodologia link — no trust disclaimer block
- Wired both into `src/app/layout.tsx` as global chrome; updated root metadata description to UI-SPEC copy

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Sheet and build SiteHeader with tests** — `9e923e6` (test RED), `1e0c986` (feat GREEN)
2. **Task 2: Build SiteFooter with tests** — `14ee512` (test RED), `0eede5c` (feat GREEN)
3. **Task 3: Wire SiteHeader and SiteFooter into root layout** — `eeaaec6` (feat)

## Files Created/Modified

- `src/components/ui/Sheet/index.tsx` — shadcn Sheet primitive for mobile nav drawer
- `src/features/navigation/SiteHeader/constants.ts` — `NAV_ITEMS` with three live routes
- `src/features/navigation/SiteHeader/types.ts` — `NavItem` type derived from constants
- `src/features/navigation/SiteHeader/index.tsx` — Client header with desktop nav and mobile Sheet
- `src/features/navigation/SiteHeader/index.test.tsx` — 6 unit tests (logo, links, active state, mobile menu)
- `src/features/navigation/SiteFooter/index.tsx` — Server footer with copyright and Metodologia link
- `src/features/navigation/SiteFooter/index.test.tsx` — 3 unit tests (copyright, link, no disclaimer)
- `src/app/layout.tsx` — Global chrome wrapping `{children}`; updated metadata description

## Decisions Made

- Relocated CLI-generated `sheet.tsx` to PascalCase colocated directory per AGENTS.md convention
- Fixed `cn` import to `@/components/ui/utils` instead of shadcn default `@/features/guides/utils` alias
- Added Portuguese `aria-label` on Sheet close button for UI-SPEC accessibility compliance

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Global navigation chrome is live on all routes — ready for homepage journey cards (03-02) and e2e smoke update (03-03)
- `NAV_ITEMS` constant is extensible for Phase 6/7 nav additions (Comparar, Guias)

## Self-Check: PASSED

- All key files verified present
- All task commits verified in git history (9e923e6, 1e0c986, 14ee512, 0eede5c, eeaaec6)
- 9/9 unit tests passing; typecheck clean

---
*Phase: 03-homepage-navigation-core-journey*
*Completed: 2026-07-11*
