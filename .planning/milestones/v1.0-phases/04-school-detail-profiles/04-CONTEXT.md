# Phase 4: School Detail Profiles - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Families can open any school in the directory and see its complete, evidence-labeled profile at `/schools/[slug]`. Deliver working detail pages for all 10 Lichtenberg schools, per-field evidence status labels, consolidated sources with publisher and access dates, directory card links, and tier-appropriate depth (three detailed schools vs seven directory schools).

This phase does not build directory UX polish (Phase 5), comparison (Phase 6), parent guides (Phase 7), or Open Day question content (deferred). Citation *data* was completed in Phase 2; Phase 4 renders it.

</domain>

<decisions>
## Implementation Decisions

### Profile layout and sections
- **D-01:** Detail pages use a **single long scroll** with clearly labeled sections — no tabs or accordion-first layout.
- **D-02:** Fields are **grouped into thematic sections** (e.g. Identificação, Oferta pedagógica, Apoio à família, Inspeção, Fontes) aligned with the school-page journey in `docs/INFORMATION_ARCHITECTURE.md`.
- **D-03:** Profile header is **rich** — school name, profile badge, district/neighbourhood, coverage tier + %, research dates, plus **website link and address prominently** in the hero area.
- **D-04:** On mobile, **identity and evidence summary appear first** — name, type, location, coverage badge, then field sections (no mobile-specific field reorder beyond header priority).
- **D-05:** Section names, exact groupings, and hero layout details are Claude's discretion within the grouped-section model.

### Per-field evidence labels
- **D-06:** **Every field shows an explicit status badge** (Verificado / Não confirmado / Ausente / Não aplicável / etc.) using existing `formatFieldStatus` vocabulary.
- **D-07:** **Inferred / `not_confirmed` fields** show the value, a "Não confirmado" badge, and an **inline evidence note** explaining the inference (Phase 1 D-04).
- **D-08:** Verified fields get **both** inline citation affordances **and** entries in the consolidated Fontes section — not sources-only.
- **D-09:** **Conflicting fields** show the value, a "Conflitante" badge, and the mandatory conflict note from evidence.

### Directory vs detailed research depth
- **D-10:** **Upgrade Adam-Ries, Lew-Tolstoi, and Richard-Wagner** to `detailed` / `profile_ready` metadata in Phase 4 after honest re-evaluation against the detailed publication bar (PROF-05, ROADMAP SC #4) — only fields that meet verified standards count.
- **D-11:** The **seven directory schools** show **all 23 important detailed fields** on the profile page, with unsupported fields explicitly marked **Ausente** (not hidden).
- **D-12:** **Detailed-tier schools** show extra detailed-level sections **only when fields are verified**; missing detailed fields are still listed with Ausente status.
- **D-13:** **Defer Open Day / visit questions** — not in Phase 4 scope despite `docs/DATA_MODEL.md` mention; belongs to a later phase.

### Sources and citations UX
- **D-14:** A consolidated **"Fontes" section at the bottom** lists all sources cited on the page, **deduplicated and grouped by source type** (official directory, school website, inspection report, etc.).
- **D-15:** On verified fields, inline citations provide **both** an anchor link to the matching Fontes entry **and** a direct external URL link.
- **D-16:** Each source entry shows **rich metadata**: source type badge (Oficial / Site da escola / etc.), publisher, access date, title, URL, and optional quote/note from the citation when present.
- **D-17:** **Inferred fields** inherit portrait/source citations in Fontes; the field-level note explains the inference — no separate invented source.

### Missing and not-applicable fields
- **D-18:** **Always show every important field** for the school's tier with explicit status — never hide Ausente fields.
- **D-19:** **`not_applicable` fields are shown explicitly** with "Não aplicável" status (not hidden).
- **D-20:** Include a **short disclaimer near the coverage block** linking to `/methodology` — e.g. that Ausente means the information has not yet been confirmed.

### Directory card → profile navigation
- **D-21:** The **entire school card is clickable** — wraps in a link to `/schools/[slug]` (remove "em breve" coming-soon copy).
- **D-22:** Exact Portuguese affordance copy for whole-card navigation is Claude's discretion (visible hint, aria-label, or subtle chevron — card must remain accessible).
- **D-23:** **Keep profile badge and coverage block** on directory cards after profiles ship — detail page expands, card stays scannable.

### Claude's Discretion
- `getSchoolBySlug` helper and `generateStaticParams` for 10 slugs
- Per-school `generateMetadata` (title/description in Portuguese)
- 404 handling for unknown slugs
- `SiteHeader` active state for `/schools/[slug]` (may need pathname `startsWith` for Escolas)
- New profile components (`SchoolProfile`, field row with badge, `SourcesSection`, etc.)
- Exact reclassification criteria and field updates when upgrading the three detailed schools
- E2e extension for directory → profile navigation (minimal smoke addition; full CI in Phase 8)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data model, research, and editorial
- `docs/DATA_MODEL.md` — Directory vs detailed coverage levels, field list, evidence statuses, Open Day (deferred)
- `docs/RESEARCH.md` — Source types, reliability levels, research statuses (`profile_ready`, etc.)
- `docs/EDITORIAL_GUIDE.md` — Verified vs unconfirmed distinction, no quality claims, tone for profile copy
- `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` — Field-level research rules, inference patterns, coverage tiers
- `docs/INFORMATION_ARCHITECTURE.md` — `/schools/[slug]/` URL, school-page journey questions

### Product and architecture
- `docs/PRODUCT.md` — V1 scope, trust positioning, static-first constraint
- `docs/DECISIONS.md` — Evidence coverage v2, sources array + citation by sourceId

### Requirements and prior phase context
- `.planning/REQUIREMENTS.md` — PROF-01 through PROF-07 traceability
- `.planning/ROADMAP.md` — Phase 4 success criteria
- `.planning/phases/01-data-evidence-audit/01-CONTEXT.md` — Inference rules (D-01–D-08), coverage v2, directory vs detailed badges
- `.planning/phases/02-research-process-attribution/02-CONTEXT.md` — Citation data complete; rendering deferred to Phase 4 (D-12)
- `.planning/phases/03-homepage-navigation-core-journey/03-CONTEXT.md` — SiteHeader/SiteFooter; active nav may need `/schools/*` handling

### Code integration points
- `src/features/schools/school/index.ts` — `School` schema, `collectFieldEvidence()`
- `src/features/schools/school/constants.ts` — Important field paths (11 directory / 23 detailed)
- `src/features/schools/formatSchoolField/index.ts` — Portuguese status labels
- `src/features/evidence/calculateEvidenceCoverage/index.ts` — Coverage v2 on detail pages
- `src/features/evidence/source/index.ts` — Source metadata shape
- `src/features/evidence/validateFieldCitations/index.ts` — Citation resolution pattern
- `src/features/schools/SchoolCard/index.tsx` — Card to wire as link
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — 10 school records to display and optionally upgrade

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `formatFieldStatus` — Centralized Portuguese labels for all evidence statuses
- `calculateEvidenceCoverage` + `getCoverageTierLabel` — Coverage block on profile header
- `collectFieldEvidence(school)` — Walk all fields for profile rendering and citation aggregation
- `SchoolCard` + `shouldRenderFact` / `getStatusTone` — Card patterns to extend (badge-per-field on detail, not card)
- `methodology.mdx` — Status vocabulary parents already learned; link from coverage disclaimer
- `GuideIntro` / page shell patterns — `max-w-3xl`, `px-6 py-12` composition

### Established Patterns
- Field-level `{ value, evidence }` with `verified`, `not_confirmed`, `missing`, `not_applicable`
- `sources[]` at school level; field citations reference `sourceId`
- `inferredFrom()` produces `not_confirmed` with mandatory notes
- Static export (`output: "export"`) — requires `generateStaticParams` for all slugs
- All 10 schools currently `directory_only` / `directory` in data — Phase 4 upgrades three after re-evaluation

### Integration Points
- New route: `src/app/schools/[slug]/page.tsx`
- New helper: `getSchoolBySlug(slug)` over `getRealSchools()`
- `SchoolCard` → `<Link href={/schools/${slug}}>` wrapping entire card
- `SiteHeader` pathname matching for `/schools/*`
- Dedupe and group `school.sources` for Fontes section via cited sourceIds

</code_context>

<specifics>
## Specific Ideas

- Profile pages are the trust centerpiece — every field must be honest, including Ausente and Não confirmado
- Rich header gives parents immediate orientation (where, website, how much research exists) before reading fields
- Three deeper-research schools earn detailed tier in data, not just in UI cosmetics
- Fontes section is the bibliography parents check before trusting information — grouped and rich metadata

</specifics>

<deferred>
## Deferred Ideas

- Open Day / "Perguntas para visita" sections — future phase (not PROF-01–07)
- Directory UX polish (sort, filter summary, mobile layout) — Phase 5
- Comparison from profile pages — Phase 6
- Full e2e CI for profile flows — Phase 8
- Per-field anecdotal signals — out of V1 scope per `docs/DATA_MODEL.md`

</deferred>

---

*Phase: 04-school-detail-profiles*
*Context gathered: 2026-07-11*
