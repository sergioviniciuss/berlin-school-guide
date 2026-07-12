---
phase: 07-essential-parent-guides
plan: 01
subsystem: guides
tags: [guides, mdx, hub, print-css, nextjs]

requires:
  - phase: 03-homepage-navigation-core-journey
    provides: GuideIntro pattern and site chrome
provides:
  - /guides hub with GuidesHub journey cards (live guides only)
  - /guides/berlin-school-system and /guides/first-steps route shells
  - Extended mdx-components (h2 anchors, lists, links)
  - Print CSS foundation for checklist page
affects:
  - 07-02-PLAN (editorial content in MDX files)
  - 07-03-PLAN (nav integration to hub routes)

tech-stack:
  added: []
  patterns:
    - "Guide pages: GuideIntro + MDX import in max-w-3xl main shell"
    - "GuidesHub: category sections with primary/secondary card styling from HomeJourneyCards"
    - "h2 id generation via slugifyHeading for anchor links"

key-files:
  created:
    - src/app/guides/page.tsx
    - src/app/guides/page.test.tsx
    - src/app/guides/berlin-school-system/page.tsx
    - src/app/guides/berlin-school-system/page.test.tsx
    - src/app/guides/first-steps/page.tsx
    - src/app/guides/first-steps/page.test.tsx
    - src/features/guides/GuidesHub/index.tsx
    - src/features/guides/GuidesHub/index.test.tsx
    - src/features/guides/GuidePrintButton/index.tsx
    - src/features/guides/mdxUtils/index.ts
    - src/content/guides/berlin-school-system.mdx
    - src/content/guides/first-steps.mdx
  modified:
    - src/mdx-components.tsx
    - src/app/globals.css

requirements-completed: [GUID-01, GUID-02, GUID-03]

duration: 25min
completed: 2026-07-11
---

# Phase 7 Plan 01: Guide Routes, Hub, and MDX Shell

**Ship `/guides` hub and route shells with MDX wiring, anchor headings, and print CSS foundation**

## Accomplishments

- Created `GuidesHub` with "Entenda o sistema" and "Checklists práticas" sections — no teaser cards
- Added `/guides`, `/guides/berlin-school-system`, `/guides/first-steps` static routes
- Extended MDX components for h2/h3, lists, links with external rel attributes, and auto-generated heading ids
- Added print CSS hiding header/footer and `.guide-print-hide` chrome on checklist page
- Added `GuidePrintButton` client component for first-steps page

## Verification

```bash
pnpm test -- --testPathPattern="guides|GuidesHub" --no-coverage
pnpm build
```

All guide unit tests passed; build generates 3 new static routes.
