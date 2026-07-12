# Milestones

## v1.0 Lichtenberg Trustworthy Launch (Shipped: 2026-07-12)

**Phases completed:** 8 phases, 26 plans, 52 tasks

Known deferred items at close: 4 (see STATE.md Deferred Items)

**Key accomplishments:**

- Explicit `inferredFrom()` helper and `primarySchool()` refactor stop cross-field verified inflation across all 10 Lichtenberg school records
- Level-aware coverage v2 scores directory schools on 11 portrait fields and detailed schools on 23, counting only verified evidence in the numerator
- SchoolCard shows research depth badges and tier labels, production pages use honest Lichtenberg messaging, and synthetic fixtures are unreachable from the data module
- Executable research checklist with per-field decision trees, coverage v2 tiers, and validate:data completion gate — cross-linked to RESEARCH.md policy without duplication
- Real-school research date coherence via validateResearchDates, per-source dateAccessed audit on 10 Lichtenberg schools, and RSCH-04 citation data gate confirmed in schoolSchema
- Portuguese `/methodology` page explains evidence statuses, coverage v2 tiers, and German terms — with a discoverable link from the school directory header
- Global site chrome with sticky SiteHeader (desktop nav + mobile Sheet), minimal SiteFooter, and root layout wiring for three live routes only.
- Portuguese homepage landing with parent-facing hero, dominant directory journey card, secondary methodology card, and honest Lichtenberg scope note per UI-SPEC copy contract
- Removed stale m2-smoke scaffolding and rewrote Playwright smoke tests to cover homepage → /schools via journey CTA and header nav
- Static slug lookup, dotted-path field resolution, deduplicated Fontes aggregation, and reusable profile field row components with evidence badges and citation affordances.
- SchoolProfile hero with coverage disclaimer, all 23 evidence-labeled field rows, grouped Fontes bibliography, and static `/schools/[slug]` pages for all 10 Lichtenberg schools.
- Three Lichtenberg schools upgraded to honest detailed/profile_ready metadata; directory cards link to profiles; Escolas nav stays active on profile routes; e2e smoke confirms Lew-Tolstoi card → profile flow.
- 300ms debounced search with URL `q` sync, pure sortSchools utility (name/coverage/tier), and memoized filter→sort pipeline with dynamic research-depth header counts
- Tiered Essenciais/Avançados filters with methodology help links, right-side mobile Sheet with hybrid draft apply, sticky filter bar, and native sort select wired to immediate URL updates
- Contextual directory empty states, SchoolCard tier help, few-results tip, shareable URL e2e, and client-side filter scaling documentation
- Pure compare URL/slug utilities with max-4 dedupe and shared evidence-aware field formatting extracted from ProfileFieldRow
- Directory compare selection with URL-synced ?compare= slugs, sibling checkbox on SchoolCard, and sticky CompareBar gating navigation until two schools are selected
- Trust-first `/compare` criteria table with shareable URLs, limitations copy, Comparar nav, and Playwright journey coverage
- Align directory and profile compare selection with revised CONTEXT: toggle buttons, max 3 schools, shared sessionStorage state
- Ship `/guides` hub and route shells with MDX wiring, anchor headings, and print CSS foundation
- Full Portuguese MDX for Berlin primary system guide and Primeiros passos checklist
- Wire Guias into site chrome, cross-links, filter help URLs, and Playwright coverage

---
