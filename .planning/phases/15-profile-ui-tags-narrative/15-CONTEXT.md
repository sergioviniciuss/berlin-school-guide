# Phase 15: Profile UI (Tags & Narrative) - Context

**Gathered:** 2026-07-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Pilot school profile pages render evidence-backed **tags** and the editorial **“Perfil da escola”** narrative with clear provenance, visually calm official-vs-community distinction where community citations appear, a **merged Fontes** section that includes qualitative citations without duplicates, and a lightweight **correction/report** path that explicitly covers factual fields, tags, and the editorial narrative — **without** altering non-pilot page structure beyond additive optional rendering, and **without** promoting tags to directory/compare (FUT-02).

Success anchors (ROADMAP): TagsSection by category + confidence + expandable evidence; official vs community distinction; independent removable qualitative blocks; Fontes includes tag/narrative citations without dupes; correction affordance covers tags + narrative.

Requirements: NARR-01, NARR-03, NARR-04, NARR-05, NARR-06.

</domain>

<decisions>
## Implementation Decisions

### Page placement & naming
- **D-01:** Place editorial content **immediately after the page header**, before Identificação — families first understand “what kind of school this is,” then read factual sections.
- **D-02:** Editorial block order: **“Perfil da escola”** narrative first, then tags section beneath it (same post-header zone).
- **D-03:** Reserve the heading **“Perfil da escola”** exclusively for the editorial narrative (`perfilDaEscola`).
- **D-04:** Rename the factual `schoolProfile` field label from “Perfil da escola” to **“Perfil oficial”** (preferred exact string; similar wording only if localization conflict arises).
- **D-05:** Clear hierarchy: verified source data (factual sections) vs guide’s evidence-backed synthesis (editorial narrative + tags).

### Tag presentation & evidence expand
- **D-06:** Render tags in a dedicated section titled **“Características da escola”**, below the editorial narrative.
- **D-07:** Group tags by taxonomy **category**; **omit empty categories**.
- **D-08:** If a school has **no tags**, omit the Características section entirely (narrative-only pilots remain valid).
- **D-09:** Default collapsed state per tag: **tag label + confidence badge only** (highly scannable).
- **D-10:** Independent per-tag control **“Ver evidência” / “Ocultar”** reveals source types and citations for that tag only (NARR-04 — independently supported/removable).
- **D-11:** Do not put tags inline inside the narrative paragraph.

### Official vs community distinction
- **D-12:** Show official vs community distinctions **only inside expanded evidence**, via existing `formatSourceType` labels on citations.
- **D-13:** Use the **same visual treatment** as other source-type chips/labels (e.g. Fontes / SourcesSection language) — community is another evidence source that already met a higher editorial bar before publication; no warning/stigma styling.
- **D-14:** No persistent collapsed-state “Comunidade” badge on tags unless revisited later.
- **D-15:** Keep the editorial narrative **free** of official/community indicators; provenance stays on tags + merged Fontes.

### Fontes merge & correction path
- **D-16:** Extend citation collection so **field, tag, and qualitative** references merge into a **single** Fontes section, **deduplicated by source id** (extend `collectCitedSources` or equivalent).
- **D-17:** When feasible, each source card briefly indicates which **fields, tags, and/or the editorial narrative** reference it — improve transparency without complex bidirectional navigation systems.
- **D-18:** Add a lightweight **`/report-correction/`** page linked from **every** school profile.
- **D-19:** Correction copy and flow **explicitly cover** factual fields, tags, and **Perfil da escola**.
- **D-20:** Keep the page **minimal for v1.2**: explanation + how to report; **school prefilled** when arriving from a profile link (query/slug). No production backend/auth required — static page + mailto or equivalent is in scope; full interactive server-backed forms are out of scope.

### Carried forward (do not reopen)
- Confidence PT-BR labels and “evidence strength ≠ school quality” (Phase 13 / methodology).
- Tags profile-only this milestone; directory/compare tag surfaces deferred (Phase 12 / FUT-02).
- Plain-text `perfilDaEscola`; sparse/zero tags OK (Phase 14).
- `qualitativeResearchNotes` is research/withhold metadata — **not** a public profile section (do not render).
- Non-pilot schools: no forced empty qualitative chrome; optional fields simply absent (NARR-04 / VAL-01 spirit).

### Claude's Discretion
- Exact spacing/typography of the post-header editorial zone and whether narrative + Características share one wrapper vs two sibling sections.
- Microcopy polish for “Ver evidência” / “Ocultar” and empty-pilot edge cases beyond D-08.
- Component directory names (`TagsSection`, editorial narrative component naming) as long as ROADMAP names remain recognizable for Phase 16 tests.
- Exact Fontes “cited by” label formatting (D-17) within “brief indication, no complex backlinking.”
- Whether `/report-correction/` uses mailto, a static form posting elsewhere, or both — must stay static-export friendly and school-prefilled (D-20).
- How `qualitativeLastReviewed` appears (if at all) near editorial content — optional small metadata; not a success criterion.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase & requirements
- `.planning/ROADMAP.md` — Phase 15 goal, success criteria, NARR-01/03–06; UI hint: yes
- `.planning/REQUIREMENTS.md` — NARR-01, NARR-03, NARR-04, NARR-05, NARR-06
- `.planning/PROJECT.md` — profile-only tags this milestone; match-making over ranking
- `.planning/phases/12-editorial-research-framework/12-CONTEXT.md` — taxonomy, community rules, profile-only tags
- `.planning/phases/13-evidence-tag-schema-layer/13-CONTEXT.md` — confidence labels, source types, format helpers
- `.planning/phases/14-pilot-profile-content/14-CONTEXT.md` — `perfilDaEscola`, sparse tags, withheld community tag

### Product docs
- `docs/EDITORIAL_GUIDE.md` — Perfil da Escola Voice; Tag Taxonomy Voice; Facts Versus Tags
- `docs/INFORMATION_ARCHITECTURE.md` — `/report-correction/` URL; school profile journey
- `docs/RESEARCH.md` — consolidated Fontes; every school page should offer report/update; source hierarchy
- `docs/DATA_MODEL.md` — tag taxonomy categories; qualitative fields
- `docs/COMPARISON.md` — compare remains factual-only (do not add tags here)
- `docs/DECISIONS.md` — richness≠quality ADRs

### Public methodology copy
- `src/content/guides/methodology.mdx` — family-facing source tiers + confidence language (align UI labels)

### Code to extend
- `src/features/schools/SchoolProfile/index.tsx` — compose narrative + tags after header; link correction
- `src/features/schools/SchoolProfile/constants.ts` — rename `schoolProfile` label to “Perfil oficial”
- `src/features/schools/collectCitedSources/index.ts` — merge tag/qualitative citations + cite-back metadata
- `src/features/schools/SourcesSection/index.tsx` — render cite-back if provided; keep source-type chips
- `src/features/schools/ComparisonEvidenceNote/index.tsx` — expand/collapse pattern reference (adapt, don’t force compare coupling)
- `src/features/schools/tagTaxonomy/index.ts` — `formatTagId` + categories
- `src/features/evidence/formatTagConfidence/index.ts` — confidence badges
- `src/features/evidence/formatSourceType/index.ts` — source-type labels in expanded evidence + Fontes
- `src/app/schools/[slug]/page.tsx` — profile route shell
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — pilot data with tags/`perfilDaEscola` (consume, don’t re-author)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SchoolProfile` + `ProfileSection` / `ProfileFieldRow` / `StatusBadge` — factual profile chrome
- `SourcesSection` + `collectCitedSources` — Fontes grouping by source type (field citations only today)
- `formatTagId`, `formatTagConfidence`, `formatSourceType` — ready for chips/labels
- `ComparisonEvidenceNote` — existing “Ver/Ocultar” expand pattern on compare (reference for per-tag evidence)

### Established Patterns
- Feature-first directories under `src/features/schools/`
- PT-BR user-facing copy; English code/paths
- Static export — no auth/backend for correction flow
- Optional qualitative fields absent on non-pilots

### Integration Points
- Insert editorial zone after header in `SchoolProfile`
- Extend `collectCitedSources` inputs/outputs for tags (+ narrative cite-back if modeled)
- New `src/app/report-correction/` route; profile CTA with school slug/query
- Phase 16 will expect Jest/RTL for TagsSection / editorial narrative and Playwright for pilot page rendering

</code_context>

<specifics>
## Specific Ideas

- Match-making hierarchy: character (Perfil + Características) before field dump.
- “Community is simply another evidence source that already met a higher editorial bar” — calm, equal chip treatment.
- Fontes cite-back should feel like a brief transparency aid, not a graph UI.
- Correction path must name tags and Perfil da escola explicitly so families know qualitative content is in scope.

</specifics>

<deferred>
## Deferred Ideas

- Tags on directory cards / compare — FUT-02 / later milestone
- Stronger community visual contrast or collapsed “Comunidade” badge — rejected for Phase 15
- Full server-backed correction form with persistence — out of v1.2 static scope
- Tag-aware Open Day questions — FUT-04
- Rendering `qualitativeResearchNotes` publicly — rejected

</deferred>

---

*Phase: 15-profile-ui-tags-narrative*
*Context gathered: 2026-07-29*
