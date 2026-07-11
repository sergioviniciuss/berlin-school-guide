# Berlin School Guide

## What This Is

A static Next.js site in Brazilian Portuguese that helps Brazilian families living in Berlin understand the primary school system and compare nearby schools using evidence-backed, source-attributed information. V1 focuses on Lichtenberg public primary schools as the first geographic scope, with architecture that can expand to other Berlin districts later.

## Core Value

Parents can trust what they read because every factual school field shows its evidence status and sources — and missing or unconfirmed information is visible, not hidden.

## Requirements

### Validated

- ✓ Static Next.js 16 App Router foundation with static export — M2
- ✓ TypeScript strict, Tailwind 4, shadcn/ui primitives, Jest, RTL, Playwright, Zod, MDX — M2
- ✓ School + evidence data model with field-level `value` + `evidence`, citations, and Zod validation — M3
- ✓ Evidence coverage calculation for important V1 fields — M3
- ✓ Searchable `/schools` directory with URL-synced filters (district, neighbourhood, classification, ganztag, bilingual, welcome classes, languages, focus, after-school care, inspection, coverage) — M4
- ✓ 10 real Lichtenberg public primary schools from official Berlin school directory portraits — research spike 2026-07-10
- ✓ CI pipeline: lint, typecheck, test, validate:data, build — existing
- ✓ Product, research, comparison, data model, IA, editorial, and decision documentation in `docs/` — M1
- ✓ Lichtenberg school evidence audit — all 10 records field-reviewed with honest statuses — Phase 1 (2026-07-11)
- ✓ Evidence coverage v2 with level-aware denominators and verified-only numerator — Phase 1 (2026-07-11)
- ✓ Trust UX on directory cards (research depth badges, tier labels, honest copy, synthetic isolation) — Phase 1 (2026-07-11)
- ✓ Documented, repeatable school research workflow with per-field checklist — Phase 2 (2026-07-11)
- ✓ Per-school `lastResearched`/`lastSourceChecked` dates validated via `validateResearchDates` — Phase 2 (2026-07-11)
- ✓ Parent-facing `/methodology` page explaining evidence statuses and coverage v2 — Phase 2 (2026-07-11)
- ✓ Citation data completeness enforced on verified fields (UI rendering deferred to Phase 4) — Phase 2 (2026-07-11)
- ✓ Homepage landing page with journey cards to directory and methodology — Phase 3 (2026-07-11)
- ✓ Shared site header/footer navigation (Início, Escolas, Metodologia) on all pages — Phase 3 (2026-07-11)
- ✓ Core journey: home → school directory via in-page links (e2e verified) — Phase 3 (2026-07-11)
- ✓ School detail pages (`/schools/[slug]`) with per-field evidence labels, Fontes section, and 10 static routes — Phase 4 (2026-07-11)
- ✓ Three detailed school profiles (Adam-Ries, Lew-Tolstoi, Richard-Wagner) with honest audit; seven directory-only profiles — Phase 4 (2026-07-11)
- ✓ Clickable SchoolCard links from directory to profile pages — Phase 4 (2026-07-11)
- ✓ Debounced search with result counts, URL-synced `q` param, and sort by name/coverage/tier — Phase 5 (2026-07-11)
- ✓ Tiered filter panel (Essenciais/Avançados), mobile Sheet drawer, active-filter summary, contextual empty states — Phase 5 (2026-07-11)
- ✓ Shareable directory URLs restore search, filters, and sort; research-depth cues on cards and header — Phase 5 (2026-07-11)

### Active
- [ ] Build comparison experience without quality rankings
- [ ] Publish essential parent guides (system understanding + practical decision support)
- [ ] Release readiness: accessibility, responsive behavior, SEO, static export validation

### Out of Scope

- Backend database or production server-side APIs — static-first V1 per `docs/PRODUCT.md` and `docs/DECISIONS.md`
- User accounts, authentication, personalized dashboards — not V1
- Broad Berlin-wide directory import (M8) — defer until Lichtenberg V1 is trustworthy
- 20–30 pilot profiles across Berlin (M9) — defer; deepen Lichtenberg set first
- User-generated ratings, subjective school rankings, AI recommendations without evidence
- Mobile app, multilingual support beyond Brazilian Portuguese, live transit, enrollment management
- Automatic scraping of third-party review sites

## Context

### Brownfield state (assessed 2026-07-11)

This project was initially built with Codex (milestones M1–M4 largely complete) and is now continued with Cursor and GSD. Codebase map: `.planning/codebase/`.

#### 1. Fully implemented

| Area | Evidence |
|------|----------|
| Static app foundation | `next.config.mjs` (`output: "export"`), CI in `.github/workflows/ci.yml` |
| School/evidence schema | `src/features/schools/school/index.ts`, `src/features/evidence/*` |
| Data validation CLI | `pnpm validate:data` via `src/features/schools/validateSchools/` |
| School directory UI | `src/app/schools/page.tsx`, `SchoolDirectory`, debounced search, sort, mobile Sheet filters, empty states (Phase 5) |
| Client-side filtering | `src/features/schools/filterSchools/` with URL query sync |
| Real Lichtenberg dataset | `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — 10 schools |
| Research spike documentation | `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` |
| Synthetic fixtures for schema regression | `src/features/schools/school/fixtures.ts`, JSON fixtures in `src/content/schools/fixtures/` |

#### 2. Partially implemented

| Area | State |
|------|-------|
| School research depth | 3/10 schools have detailed profiles (Adam-Ries, Lew-Tolstoi, Richard-Wagner); 7 are `directory_only` |
| Evidence coverage UI | Coverage v2 with level-aware denominators; tier labels on cards (Phase 1) |
| MDX guides | `methodology.mdx` published |
| Site navigation | `SiteHeader`/`SiteFooter` on all pages; live nav: Início, Escolas, Metodologia; profile route active state (Phase 3–4) |
| Homepage | Fuller landing with journey cards to `/schools` and `/methodology` (Phase 3) |
| Research workflow | `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` + `validateResearchDates` in `pnpm validate:data` |
| Information architecture | `/`, `/schools`, `/schools/[slug]`, `/methodology` live; `/compare` and `/guides` not yet built |
| Comparison | Philosophy in `docs/COMPARISON.md`; no `/compare` route or feature code |
| School detail pages | `src/app/schools/[slug]/` with `SchoolProfile`, `SourcesSection`, evidence-labeled fields (Phase 4) |

#### 3. Resolved in Phase 1 (2026-07-11)

| Issue | Resolution |
|-------|------------|
| Homepage M2 scaffolding copy | Replaced with Berlin School Guide messaging and `/schools` CTA |
| Directory "escolas sintéticas" copy | Honest Lichtenberg scope messaging |
| Synthetic fallback name in production mapper | Removed from production paths |
| `getSyntheticSchools()` in production data module | Removed; tests import fixtures directly |
| `ganztag` → `afterSchoolCare` implicit verified fallback | `inferredFrom()` returns `not_confirmed` with explicit notes |
| `offers` reused for `schoolProfile` and `pedagogyFocus` | Explicit inference rules; no silent verified reuse |
| `bilingualPrograms` defaults to `not_applicable` when unset | Defaults to `missing` unless verified |
| `inspectionAvailability` weak portrait default | Directory schools use `missing`; independent citations when overridden |

#### 4. Resolved in Phase 3 (2026-07-11)

| Issue | Resolution |
|-------|------------|
| Legacy `/guides/m2-smoke` route | Removed route and MDX content |
| `e2e/smoke.spec.ts` stale homepage assertion | Rewritten for home → `/schools` journey (e2e passes) |

#### 5. Remaining scaffolding / deferred

All 10 schools cite **Senatsverwaltung Berlin official school portraits** (`bildung.berlin.de/Schulverzeichnis/Schulportrait.aspx`). After Phase 4 audit, three schools upgraded to `profile_ready` / `detailed`; seven remain `directory_only` / `directory`.

| School | Official portrait | Independent school sources | Post-audit status |
|--------|-------------------|--------------------------|-------------------|
| Adam-Ries-Schule | ✓ | Welcome classes page | `profile_ready` / `detailed` |
| Bernhard-Grzimek-Schule | ✓ | — | `directory_only` / `directory` |
| Bürgermeister-Ziethen-Schule | ✓ | — | `directory_only` / `directory` |
| Friedrichsfelder Schule | ✓ | — | `directory_only` / `directory` |
| Grundschule am Tränkegraben | ✓ | — | `directory_only` / `directory` |
| Schmetterlings-Grundschule | ✓ | — | `directory_only` / `directory` |
| Karlshorster Schule | ✓ | — | `directory_only` / `directory` |
| Lew-Tolstoi-Schule | ✓ | Website + Ganztag page | `profile_ready` / `detailed` |
| Richard-Wagner-Schule | ✓ | Website, Ganztag, inspection | `profile_ready` / `detailed` |
| Seepark-Grundschule | ✓ | — | `directory_only` / `directory` |

#### 6. Evidence model after Phase 1

- Cross-field inference uses `inferredFrom()` → `not_confirmed` with mandatory Portuguese notes
- Coverage v2: directory schools scored on 11 portrait fields; detailed tier on 23 fields; numerator counts `verified` only
- Directory cards show Perfil básico badge and Pesquisa básica tier label
- Inferred fields (e.g. afterSchoolCare from ganztag) omitted from cards unless independently verified

#### 7. Research process reproducibility

**Reproducible (Phase 2).** `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` provides step-by-step checklist for humans and AI sessions. `validateResearchDates` enforces per-school date coherence; `validateFieldCitations` enforces citation completeness on verified fields. `/methodology` explains evidence and coverage to parents.

#### 8. What prevents usable V1 today

1. **No comparison** — key parent workflow missing
2. **No educational guides** — system explanation not published
3. **Directory UX polish** — search/filter/sort usability deferred to Phase 5

#### 9. CONCERNS.md items required before launch

**Must resolve (remaining):**
- Comparison experience (Phase 6)

**Should resolve:**
- Document deployment security headers when host is chosen (Phase 8)
- Add dependency scanning (Dependabot or `pnpm audit` in CI) (Phase 8)
- Refresh e2e tests for new homepage journey (Phase 8)

**Resolved in Phase 1:**
- Homepage M2 scaffolding, directory synthetic copy, ganztag fallbacks, synthetic data isolation

**Resolved in Phase 3:**
- Site-wide navigation, m2-smoke legacy route, e2e homepage journey smoke test

**Resolved in Phase 4:**
- School detail profiles with evidence labels and Fontes section
- Directory card → profile navigation
- Three-school detailed upgrade with honest audit

**Monitor (not blocking at 10 schools):**
- Client-side filter performance at Berlin-wide scale (M8 deferred)
- Fragile four-file filter sync when adding new filters

### Prior roadmap ordering (user directive)

1. Audit existing school data and evidence
2. Fix misleading, synthetic, unsupported, or incorrectly scored information
3. Make research and source attribution reproducible
4. Complete core user journey: homepage → discovery → comparison
5. Shared navigation and essential usability
6. Accessibility, responsive, SEO, static export, production readiness
7. Only then: additional features or district expansion

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
| Field-level evidence model | Core product differentiator | ✓ Good — keep; fix fallbacks |
| Official Berlin school portraits as primary source | Most authoritative basic metadata | ✓ Good — keep |
| Lichtenberg-first geographic scope | Owner relevance + manageable research depth | — Pending V1 completion |
| Evidence coverage = research completeness, not school quality | `docs/DECISIONS.md` 2026-07-10 | ✓ Good — coverage v2 implemented in Phase 1 |
| Feature-first architecture | `AGENTS.md`, established codebase patterns | ✓ Good — keep |

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
*Last updated: 2026-07-11 after Phase 5 completion*
