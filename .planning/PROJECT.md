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

### Active

- [ ] Audit all 10 Lichtenberg school records for evidence accuracy and misleading defaults
- [ ] Fix inflated or incorrect evidence coverage scoring (especially `afterSchoolCare` fallback)
- [ ] Replace misleading "synthetic" / M2 scaffolding copy with honest V1 messaging
- [ ] Establish reproducible school research workflow with source attribution standards
- [ ] Build school detail pages (`/schools/[slug]`) with citations and missing-data labels
- [ ] Build comparison experience without quality rankings
- [ ] Create homepage and shared navigation for core user journey
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
| School directory UI | `src/app/schools/page.tsx`, `SchoolDirectory`, `SchoolFilters`, `SchoolSearch`, `SchoolCard`, `SchoolResults` |
| Client-side filtering | `src/features/schools/filterSchools/` with URL query sync |
| Real Lichtenberg dataset | `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — 10 schools |
| Research spike documentation | `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` |
| Synthetic fixtures for schema regression | `src/features/schools/school/fixtures.ts`, JSON fixtures in `src/content/schools/fixtures/` |

#### 2. Partially implemented

| Area | State |
|------|-------|
| School research depth | 3/10 schools have deeper field research (Adam-Ries, Lew-Tolstoi, Richard-Wagner); 7 are `directory_only` |
| Evidence coverage UI | Shown on cards but can misrepresent completeness due to builder fallbacks |
| MDX guides | Only `m2-smoke` smoke page exists (`src/content/guides/m2-smoke.mdx`) |
| Information architecture | Documented in `docs/INFORMATION_ARCHITECTURE.md` but most routes do not exist |
| Comparison | Philosophy in `docs/COMPARISON.md`; no `/compare` route or feature code |
| School detail pages | No `src/app/schools/[slug]/` route; `SchoolCard` is not linked anywhere |

#### 3. Scaffolding, placeholder, synthetic, or misleading

| Issue | Location |
|-------|----------|
| Homepage still says "M2" foundation validation | `src/app/page.tsx` — links only to MDX smoke test, not `/schools` |
| Directory copy says "escolas sintéticas" | `SchoolDirectory/index.tsx`, `src/app/schools/page.tsx` metadata |
| Synthetic fallback name in production mapper | `toSchoolDirectoryItem` — `"Escola sintética sem nome"` |
| `getSyntheticSchools()` exported alongside real data | `schoolDirectoryData/index.ts` — test-only, risk of confusion |
| `ganztag` → `afterSchoolCare` implicit fallback | `lichtenbergPrimarySchools/index.ts` lines 144–148 |
| `offers` array reused for `schoolProfile` and `pedagogyFocus` | same builder — may over-verify distinct fields from one source |
| `bilingualPrograms` defaults to `not_applicable` when unset | may be wrong for schools not yet checked |
| `inspectionAvailability` defaults to `not_confirmed` with portrait citation | weak topical match |

#### 4. Schools researched with official sources

All 10 schools cite **Senatsverwaltung Berlin official school portraits** (`bildung.berlin.de/Schulverzeichnis/Schulportrait.aspx`). Additional school-website sources for deeper profiles:

| School | Official portrait | School website sources | Research status |
|--------|-------------------|------------------------|-----------------|
| Adam-Ries-Schule | ✓ | Welcome classes page | `in_research` / `detailed` |
| Bernhard-Grzimek-Schule | ✓ | — | `directory_only` / `directory` |
| Bürgermeister-Ziethen-Schule | ✓ | — | `directory_only` / `directory` |
| Friedrichsfelder Schule | ✓ | — | `directory_only` / `directory` |
| Grundschule am Tränkegraben | ✓ | — | `directory_only` / `directory` |
| Schmetterlings-Grundschule | ✓ | — | `directory_only` / `directory` |
| Karlshorster Schule | ✓ | — | `directory_only` / `directory` |
| Lew-Tolstoi-Schule | ✓ | Website + Ganztag page | `in_research` / `detailed` |
| Richard-Wagner-Schule | ✓ | Website, Ganztag, inspection, music pages | `in_research` / `detailed` |
| Seepark-Grundschule | ✓ | — | `directory_only` / `directory` |

#### 5. Fields with valid evidence (typical for directory records)

Verified from official portraits for most schools: name, school number, website, classification, level, district, neighbourhood, address, grades served, languages, ganztag (when listed), pedagogyFocus/schoolProfile (when `offers` present in portrait).

#### 6. Fields relying on inference, fallback, or weak evidence

| Field | Problem |
|-------|---------|
| `afterSchoolCare` | 7/10 marked `verified` via ganztag reuse; only Lew-Tolstoi and Richard-Wagner have independent after-school research |
| `bilingualPrograms` | `not_applicable` default without per-school verification for 7 directory-only schools |
| `welcomeClasses` | `missing` default; only Adam-Ries explicitly verified |
| `familyCommunication`, `transitionAfterGrade6`, `facilities`, `inclusionSupport` | `missing` for most; some detailed schools partially filled |
| `inspectionAvailability` | Default `not_confirmed` still counts portrait as citation |
| `pedagogyFocus` / `schoolProfile` | Both derived from same `offers` list when not overridden |

#### 7. Research process reproducibility

**Partially reproducible.** The spike documents official sources, field difficulty, and schema gaps (`docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md`). The `primarySchool()` builder encodes source patterns. **Missing:** step-by-step research checklist in repo, per-field source requirements, citation snippet/archive notes, automated audit script comparing claims to cited URLs, methodology page for parents.

#### 8. Coverage score accuracy

**Partially accurate, currently inflated.** Measured coverage (2026-07-11):

| School | Verified/Total | % | Notes |
|--------|----------------|---|-------|
| Richard-Wagner-Schule | 18/21 | 86% | Most honestly researched |
| Adam-Ries-Schule | 18/22 | 82% | Strong; afterSchool still from ganztag fallback |
| Lew-Tolstoi-Schule | 18/23 | 78% | Extra bilingual/international fields |
| 5 OGB schools | 15/21 | 71% | afterSchool inflated via ganztag |
| 2 schools without ganztag | 11/21 | 52% | More honest baseline |

Coverage measures field *status* counts, not topical validity of citations. `not_applicable` fields are excluded; implicit fallbacks inflate `verified` counts. Spike recommends separate directory vs detailed coverage views.

#### 9. What prevents usable V1 today

1. **No school detail pages** — directory is a dead end; core product promise unfulfilled
2. **Misleading copy** — homepage and directory describe synthetic/M2 validation data
3. **No navigation** — cannot move between sections without typing URLs
4. **No comparison** — key parent workflow missing
5. **No educational guides** — system explanation (primary V1 goal) not published
6. **Trust risk** — evidence fallbacks and inflated coverage undermine the evidence-first positioning
7. **No methodology/transparency page** — parents cannot evaluate research quality

#### 10. CONCERNS.md items required before launch

**Must resolve:**
- Homepage M2 scaffolding → real V1 entry point with `/schools` CTA
- Directory "synthetic" copy → honest partial-coverage messaging
- `ganztag` → `afterSchoolCare` fallback → stop inflating coverage
- Site-wide navigation for existing routes

**Should resolve:**
- Remove or isolate `getSyntheticSchools` from production data module
- Document deployment security headers when host is chosen
- Add dependency scanning (Dependabot or `pnpm audit` in CI)

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
| Evidence coverage = research completeness, not school quality | `docs/DECISIONS.md` 2026-07-10 | ⚠️ Revisit — scoring currently inflated |
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
*Last updated: 2026-07-11 after GSD project initialization*
