# Phase 7: Essential Parent Guides - Research

**Researched:** 2026-07-11
**Domain:** Static MDX parent guides, guides hub, navigation integration
**Confidence:** HIGH

## Summary

Phase 7 ships three new routes (`/guides`, `/guides/berlin-school-system/`, `/guides/first-steps/`) using the established methodology page pattern: `GuideIntro` + MDX import in a `max-w-3xl` shell. No new npm dependencies. Content is editorial MDX in `src/content/guides/` with optional MDX component extensions in `src/mdx-components.tsx`.

The hub composes `GuideIntro` + new `GuidesHub` feature using `HomeJourneyCards` visual hierarchy (primary featured card for system guide, secondary neutral card for checklist). Only live guides appear — no teaser cards per D-01/D-05.

Navigation follows Phase 6 Comparar pattern: add `Guias` to `NAV_ITEMS` between Escolas and Comparar (or after Escolas — recommend: Início, Escolas, **Guias**, Comparar, Metodologia). Update `isActive` for `/guides/*`. Homepage gains a third journey card. Directory and compare intro areas gain contextual cross-links to `/guides`.

German terms (GUID-03): system guide uses inline `<dfn>` or bold term + explanation on first use, plus anchored Glossário section. Methodology page keeps evidence/research terms; optionally add cross-link from methodology "Termos em alemão" to system guide glossário for school-choice terms (without duplicating full glossary).

Checklist is static MDX ordered/unordered list with print CSS in `globals.css` scoped to `.guide-print` or checklist page wrapper. No client state.

Phase 5 deferred item: Ganztag/Willkommensklasse help links in filters can now point to `/guides/berlin-school-system/#ganztag` instead of `/methodology`.

**Primary recommendation:** Three-plan wave — (1) routes + hub + MDX shell, (2) editorial content, (3) nav/cross-links/e2e.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01 through D-19 as captured in 07-CONTEXT.md (hub live-only, modular system guide, Primeiros passos checklist, inline+glossary terms, journey-card hub, Guias nav, homepage card, directory/compare cross-links)

### Claude's Discretion
- MDX components, print button vs CSS-only, section nav, exact cross-link copy, SEO metadata, test scope

### Deferred (OUT OF SCOPE)
- Full guide library, `/checklists/` top-level, interactive persistence, hub teasers, detailed enrollment guide page
</user_constraints>

<phase_requirements>
| ID | Description | Research Support |
|----|-------------|------------------|
| GUID-01 | Berlin primary system guide in PT | `berlin-school-system.mdx` modular h2 sections + GuideIntro |
| GUID-02 | Practical checklist | `first-steps.mdx` static list + print CSS |
| GUID-03 | German terms in PT context | Inline + Glossário; EDITORIAL_GUIDE definitions |
</phase_requirements>

## Standard Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Content | MDX in `src/content/guides/` | Same as methodology |
| Routes | Next.js App Router static pages | `src/app/guides/**/page.tsx` |
| Layout | `GuideIntro` + `main.max-w-3xl` | methodology pattern |
| Hub | `GuidesHub` feature | HomeJourneyCards card styling |
| Styling | Tailwind + optional `@media print` | No new UI library |

## Architecture Patterns

### Recommended plan structure
1. **07-01** — Routes, GuidesHub, MDX wiring stubs, print CSS foundation
2. **07-02** — Full editorial MDX content (system guide + checklist + glossary)
3. **07-03** — Nav, homepage card, cross-links, filter help link updates, e2e

### File structure
```text
src/app/guides/page.tsx
src/app/guides/berlin-school-system/page.tsx
src/app/guides/first-steps/page.tsx
src/content/guides/berlin-school-system.mdx
src/content/guides/first-steps.mdx
src/features/guides/GuidesHub/
```

## Don't Hand-Roll

| Problem | Use Instead |
|---------|-------------|
| CMS for guides | Static MDX (project standard) |
| Interactive checklist state | Static MDX + print CSS |
| Custom markdown parser | `@next/mdx` existing setup |

## Common Pitfalls

1. **Hub teasers** — violates D-01; only link live routes
2. **Duplicating methodology glossary** — split school-system vs evidence terms (D-13)
3. **Breaking HomeJourneyCards test** — update test that forbids `/guides` links
4. **English slugs with Portuguese headings** — slug `first-steps`, title `Primeiros passos`

## Validation Architecture

| Requirement | Test Type | Tool |
|-------------|-----------|------|
| GUID-01 system guide renders | Unit | Jest page tests |
| GUID-02 checklist renders + print class | Unit | Jest + optional CSS snapshot |
| GUID-03 glossary section present | Unit | Jest content assertion |
| Guides hub links | Unit | GuidesHub tests |
| Nav Guias link | Unit | SiteHeader/Footer tests |
| Home → guides journey | E2E | Playwright smoke |

## RESEARCH COMPLETE
