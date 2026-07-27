# Milestones

## v1.1 Understand the German & Berlin Education System (Shipped: 2026-07-26)

**Phases completed:** 3 phases, 13 plans, 29 tasks

Known deferred items at close: 2 (see STATE.md Deferred Items)

**Delivered:** Flagship Germany-first onboarding guide with visual journey scaffold, Berlin-integrated editorial, homepage/hub discovery path, complementary cross-links, and release gates.

**Key accomplishments:**

- Two leaf React components — `BerlinCallout` (inline "Em Berlim" badge + "Berlin em destaque" summary box linking to the Berlin guide) and `GlossaryTerm` (dl/dt/dd term-definition shell) — both server components, no external dependencies, fully unit-tested.
- Responsive branching infographic (`EducationTimeline`) built with `@radix-ui/react-collapsible` — desktop fan-out diagram and mobile stacked stepper sharing one `TimelineNode` card, covering all 5 secondary/vocational tracks and forcing expanded summaries on print.
- Wires the `EducationTimeline`, `BerlinCallout`, and `GlossaryTerm` components (built in Plans 01-02) into a live, public route — `/guides/german-education-system` — via global MDX registration, a route shell mirroring `berlin-school-system/page.tsx`, placeholder editorial content with Phase 10 heading stubs, and Playwright coverage confirming no mobile overflow.
- RED GlossaryTerm deep-link tests and EducationTimeline locked H2 anchor contract so Plan 01 cannot ship broken glossary hashes or stub timeline links
- Germany-first MDX through Depois da 6ª série with Förderprognose framing and the first self-contained O que verificar block
- Complete flagship MDX through Glossário with peer secondary paths, three verify moments, one Berlin summary callout, and ONBD-05 narrative deep-links — human-approved after two UAT visual fixes
- Extended Playwright metadata/a11y route arrays for the onboarding guide and rewrote the homepage smoke journey to target onboarding, with two assertions intentionally RED until Plans 01 and 03 ship the corresponding UI.
- Restructured `HomeJourneyCards` from three cards to exactly two — "Comece por aqui" (primary, linking to the onboarding guide) and "Explorar escolas" (secondary, linking to the school directory) — making the onboarding guide the homepage's default entry point for new families.
- GuidesHub's "Entenda o sistema" section now stacks the onboarding flagship card (primary chrome, links to `/guides/german-education-system`) above the retitled Berlin public-school card (secondary chrome, D-08 heading), with D-06 role copy on all three hub cards.
- Widened `GuideIntro.description` to `ReactNode` and used it to wire a complementary, cross-linked reading path between the onboarding and Berlin guide intros, while retitling the Berlin guide to "Como funciona o sistema escolar público de Berlim" with matching Portuguese metadata polish.
- Added a "Próximos passos" MDX ordered list (Berlin guide → /schools → first-steps, no /compare) immediately before Glossário in the onboarding guide, plus a soft italic top tip in first-steps.mdx linking back to onboarding, completing the linear Germany → Berlin → schools → act discovery path.
- Full `pnpm test && pnpm e2e:ci` green bar plus human-approved homepage hierarchy and complementary editorial tone close out Phase 11's flagship discovery release with all eight requirements (REL-01–03, DISC-01–04, ONBD-06) confirmed end-to-end.

---

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
