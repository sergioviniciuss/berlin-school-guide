# Berlin School Guide

## What This Is

A static Next.js site in Brazilian Portuguese that helps Brazilian families in Berlin understand the German education system and compare nearby primary schools using evidence-backed, source-attributed information. The site leads with a flagship Germany-first onboarding guide (`/guides/german-education-system`), then connects families to Berlin practice, a Lichtenberg school directory, comparison, and practical checklists. Direction of travel: become a decision-support tool that answers “what kind of school is this?” and whether it may match a child’s needs — not a ranking directory. Architecture supports expanding geographic coverage beyond Lichtenberg.

## Current Milestone: v1.2 Evidence-Based School Profiles

**Goal:** Prove that an evidence-backed school profile model is trustworthy, repeatable, and maintainable — helping families understand what kind of school this is and whether it matches their needs, rather than ranking schools or maximizing coverage.

**Target features:**
- Evidence-backed school profile model on profiles only: structured tags + short PT-BR “Perfil da escola” / community narrative (no rankings, scores, or “better than X”)
- Explicit editorial & research framework deliverable: evidence standards, source hierarchy (official → journalism → triangulated community), editorial voice, tag taxonomy, citation rules, update/maintenance guidelines
- Pilot on 3–5 representative Lichtenberg schools to validate methodology before broader rollout
- Directory stays factual/lightweight; tags on cards/compare deferred to a later iteration
- Coverage expansion remains secondary this milestone

## Current State

**Shipped:** v1.0 Lichtenberg Trustworthy Launch (2026-07-12) · v1.1 Understand the German & Berlin Education System (2026-07-26)

**v1.1 delivered:** Visual education journey (`EducationTimeline`, `BerlinCallout`, `GlossaryTerm`), full Kita→higher-ed editorial with Berlin differences and glossary, homepage Start here → onboarding, guides hub flagship stack, complementary Berlin/first-steps cross-links, and release gates (metadata, a11y, smoke, Jest + e2e CI).

**Building:** v1.2 Evidence-Based School Profiles — Phases 12–13 complete (framework + Zod tag/evidence schema); next is pilot content authoring (Phase 14), then profile UI (Phase 15).

## Core Value

Parents can trust what they read because every factual school field shows its evidence status and sources — and missing or unconfirmed information is visible, not hidden.

## Requirements

### Validated

<details>
<summary>v1.0 Lichtenberg Trustworthy Launch</summary>

- ✓ Static Next.js 16 App Router foundation with static export — M2
- ✓ TypeScript strict, Tailwind 4, shadcn/ui primitives, Jest, RTL, Playwright, Zod, MDX — M2
- ✓ School + evidence data model with field-level `value` + `evidence`, citations, and Zod validation — M3
- ✓ Evidence coverage calculation for important V1 fields — M3
- ✓ Searchable `/schools` directory with URL-synced filters — M4
- ✓ 10 real Lichtenberg public primary schools from official Berlin school directory portraits — research spike 2026-07-10
- ✓ CI pipeline: lint, typecheck, test, validate:data, build
- ✓ Product, research, comparison, data model, IA, editorial, and decision documentation in `docs/` — M1
- ✓ Lichtenberg evidence audit, coverage v2, trust UX — Phase 1 (2026-07-11)
- ✓ Research workflow, research dates, `/methodology` — Phase 2 (2026-07-11)
- ✓ Homepage, site chrome, core journey — Phase 3 (2026-07-11)
- ✓ School detail profiles + Fontes — Phase 4 (2026-07-11)
- ✓ Directory search, filters, shareable URLs — Phase 5 (2026-07-11)
- ✓ School comparison without quality rankings — Phase 6 (2026-07-11)
- ✓ Essential parent guides (Berlin system + Primeiros passos) — Phase 7 (2026-07-11)
- ✓ Release readiness: CI e2e, SEO, axe, deployment docs — Phase 8 (2026-07-12)

</details>

- ✓ Flagship German education system onboarding guide with visual timelines — v1.1
- ✓ Berlin difference callouts integrated throughout Germany-wide narrative — v1.1
- ✓ Integrated glossary of key German terms with narrative deep-links — v1.1
- ✓ Non-Gymnasium pathways explained without ranking language — v1.1
- ✓ Homepage and Guides hub promote onboarding guide as primary entry point — v1.1
- ✓ Complementary cross-links: onboarding ↔ Berlin guide ↔ first-steps ↔ directory — v1.1
- ✓ Portuguese SEO metadata + a11y + homepage→onboarding smoke — v1.1
- ✓ Editorial & research framework (source hierarchy, independence rules, tag taxonomy v1, Perfil voice, qualitative cadence) — Validated in Phase 12: Editorial & Research Framework
- ✓ Public `/methodology` explains evidence-backed tags, source tiers, and confidence labels — Validated in Phase 12
- ✓ Written pilot-selection rationale naming 3–5 schools (incl. low-documentation) — Validated in Phase 12
- ✓ Tag/evidence schema + validators (`journalism`/`triangulated_community`, independence log, never-sole-basis, confidence enum) — Validated in Phase 13: Evidence & Tag Schema Layer

### Active

- [ ] Evidence-backed school profile model (structured tags + PT-BR editorial) on school profile pages
- [ ] Pilot qualitative profiles for 3–5 representative Lichtenberg schools
- [ ] Explicit official vs community evidence labeling; community only when triangulated

### Out of Scope

- Backend database or production server-side APIs — static-first V1 per `docs/PRODUCT.md` and `docs/DECISIONS.md`
- User accounts, authentication, personalized dashboards — not V1
- Stars, numeric scores, “top N”, “excellent school”, or “better than School X” language — anti-ranking product philosophy
- Promoting profile tags to directory cards or compare views — deferred until the pilot model is proven
- Maximizing school count as the v1.2 success metric — coverage expansion is secondary
- Broad Berlin-wide directory import (M8) — defer until Lichtenberg depth is trustworthy
- 20–30 pilot profiles across Berlin (M9) — defer
- User-generated ratings, subjective school rankings, AI recommendations without evidence
- Community sources as the sole basis for a tag or reputation statement
- Mobile app, multilingual support beyond Brazilian Portuguese, live transit, enrollment management
- Automatic scraping of third-party review sites

## Context

### Shipped surface (after v1.1)

| Area | State |
|------|-------|
| Onboarding guide | `/guides/german-education-system` — Germany-first path, Berlin callouts, glossary, Próximos passos |
| Homepage | Two-card Start here → onboarding + Explorar escolas |
| Guides hub | Flagship onboarding above complementary Berlin card + first-steps checklist |
| School directory | Lichtenberg 10-school set with filters, search, evidence coverage |
| Profiles / compare | Detail pages + max-3 comparison without rankings |
| Release gates | Jest, Playwright metadata/a11y/smoke/onboarding, `validate:data`, static export |

### Known deferred at v1.1 close

- Phase 09 human UAT (`09-HUMAN-UAT.md`) still `partial` — 4 subjective visual scenarios pending
- No formal `v1.1-MILESTONE-AUDIT.md` run before close

### Tech stack

Next.js (static export), TypeScript, Tailwind 4, shadcn/ui, MDX, Jest/RTL, Playwright, Zod, pnpm via Corepack.

## Constraints

- **Architecture**: Static-export Next.js — no runtime API or database for V1
- **Data integrity**: Validation passing ≠ factual correctness; evidence must be source-attributed and auditable
- **Language**: Brazilian Portuguese for all user-facing content; English for routes, files, code identifiers
- **Geography**: Lichtenberg first; schema and content structure must support future districts
- **Comparison policy**: No universal quality rankings or subjective scores (`docs/COMPARISON.md`)
- **Conventions**: Feature-first `src/` layout, directory colocation, pnpm — preserve existing patterns

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static export, no backend | V1 scope, deploy simplicity, trust through transparency | ✓ Good — keep |
| Field-level evidence model | Core product differentiator | ✓ Good — keep |
| Official Berlin school portraits as primary source | Most authoritative basic metadata | ✓ Good — keep |
| Lichtenberg-first geographic scope | Owner relevance + manageable research depth | ✓ Good — V1 shipped |
| Evidence coverage = research completeness, not school quality | `docs/DECISIONS.md` | ✓ Good — coverage v2 |
| Germany-first onboarding (not Berlin-first) | Families need system map before local practice | ✓ Good — v1.1 |
| Homepage two-card Start here / Explorar escolas | Onboarding is default entry; methodology via nav | ✓ Good — v1.1 |
| `GuideIntro.description` as `ReactNode` | Inline sibling links without a separate section | ✓ Good — v1.1 |
| Feature-first architecture | `AGENTS.md`, established codebase patterns | ✓ Good — keep |
| “What kind of school?” not “Is it good?” | Match-making over ranking; easier to defend and maintain | — Pending v1.2 |
| Evidence hierarchy: official → journalism → triangulated community | Community never sole basis for tags; always labeled non-official | ✓ Phase 12 — locked in docs + `/methodology` |
| Profile-only pilot (3–5 schools) before directory/compare surfaces | Validate methodology and maintenance cost before scale | ✓ Phase 12 — named set in `docs/research/PILOT_SELECTION.md` |
| Methodology framework as milestone deliverable | Repeatable expansion asset, not one-off profiles | ✓ Phase 12 — RESEARCH/EDITORIAL/DATA_MODEL/DECISIONS |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-07-29 — Phase 13 complete (evidence & tag schema layer)*
