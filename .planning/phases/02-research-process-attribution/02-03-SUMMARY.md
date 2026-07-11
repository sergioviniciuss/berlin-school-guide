---
phase: 02-research-process-attribution
plan: 03
subsystem: ui
tags: [methodology, mdx, static-export, trust-ux, evidence-status, coverage-v2]

requires:
  - phase: 01-data-evidence-audit
    provides: formatFieldStatus labels, getCoverageTierLabel, honest directory copy with coverage disclaimer
provides:
  - Static /methodology route with Portuguese metadata and parent-facing MDX content
  - Evidence status glossary synced with formatFieldStatus labels
  - Coverage v2 plain-language explanation (Pesquisa básica/detailed, not school quality)
  - German term glossary seed (Ganztag, Hort, Willkommensklasse, Bezirk, Schulportrait)
  - Directory header link "Como funciona nossa pesquisa?" for pre-Phase-3 discoverability
affects:
  - Phase 3 (shared navigation can link to existing methodology page)
  - Phase 7 (full German-term guide library builds on methodology glossary seed)

tech-stack:
  added: []
  patterns:
    - "MDX guide content under src/content/guides/ imported by App Router page shell"
    - "GuideIntro hero above MDX body for editorial pages"
    - "Jest MDX mock in page.test.tsx when next/jest does not transform .mdx"

key-files:
  created:
    - src/content/guides/methodology.mdx
    - src/app/methodology/page.tsx
    - src/app/methodology/page.test.tsx
  modified:
    - src/features/schools/SchoolDirectory/index.tsx
    - src/features/schools/SchoolDirectory/index.test.tsx

key-decisions:
  - "Methodology page uses GuideIntro + MDX hybrid matching 02-PATTERNS recommendation"
  - "Page test mocks MDX import; file-level rg checks enforce label sync with formatFieldStatus"

patterns-established:
  - "Parent methodology page: GuideIntro eyebrow/title + MDX sections (~one scroll, no source URLs)"
  - "Directory header inline Link to /methodology after coverage disclaimer sentence"

requirements-completed: [RSCH-03]

duration: 12min
completed: 2026-07-11
---

# Phase 02 Plan 03: Methodology Page & Directory Discoverability Summary

**Portuguese `/methodology` page explains evidence statuses, coverage v2 tiers, and German terms — with a discoverable link from the school directory header**

## Performance

- **Duration:** 12 min
- **Started:** 2026-07-11T12:01:00Z
- **Completed:** 2026-07-11T12:13:00Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Shipped static `/methodology` route with metadata title "Metodologia" and parent-facing MDX prose
- Documented all seven evidence status labels using exact `formatFieldStatus` Portuguese strings
- Explained coverage v2 as research completeness (Pesquisa básica/detailed), not school quality ranking
- Added directory header link "Como funciona nossa pesquisa?" pointing to `/methodology` (D-10)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create methodology MDX content and /methodology route** - `2b0a3aa` (feat)
2. **Task 2: Add directory header methodology link and tests** - `60018bc` (feat)

## Files Created/Modified

- `src/content/guides/methodology.mdx` - Parent summary: card reading, evidence statuses, coverage v2, German glossary
- `src/app/methodology/page.tsx` - Static route shell with GuideIntro and MDX import
- `src/app/methodology/page.test.tsx` - Renders page; asserts heading and Verificado label
- `src/features/schools/SchoolDirectory/index.tsx` - Header paragraph link to /methodology
- `src/features/schools/SchoolDirectory/index.test.tsx` - Link href and accessible name assertion

## Decisions Made

- Used GuideIntro + MDX composition per 02-PATTERNS hybrid pattern (not bare MDX like m2-smoke)
- Mocked MDX in page test because Jest cannot parse `.mdx` without additional transform config

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Mock MDX import in methodology page test**
- **Found during:** Task 1 (page.test.tsx)
- **Issue:** Jest failed with SyntaxError parsing `methodology.mdx` — next/jest does not transform MDX in unit tests
- **Fix:** Added `jest.mock("@/content/guides/methodology.mdx")` stub rendering "Verificado"; label sync enforced via acceptance `rg` checks on MDX file
- **Files modified:** `src/app/methodology/page.test.tsx`
- **Verification:** `pnpm test -- src/app/methodology/page.test.tsx` passes
- **Committed in:** `2b0a3aa` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Test mock required for Jest compatibility; MDX content sync verified separately via file grep in acceptance criteria.

## Issues Encountered

None beyond Jest MDX parsing (handled as deviation above).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Parents can reach `/methodology` from directory header before Phase 3 shared navigation
- Phase 3 can add site-wide nav linking to existing methodology route
- Phase 4 detail pages can reference methodology for evidence/coverage context
- Phase 7 can expand German-term guides beyond the short methodology glossary

## Self-Check: PASSED

- FOUND: src/content/guides/methodology.mdx
- FOUND: src/app/methodology/page.tsx
- FOUND: src/app/methodology/page.test.tsx
- FOUND: src/features/schools/SchoolDirectory/index.tsx
- FOUND: .planning/phases/02-research-process-attribution/02-03-SUMMARY.md
- FOUND: 2b0a3aa
- FOUND: 60018bc

---
*Phase: 02-research-process-attribution*
*Completed: 2026-07-11*
