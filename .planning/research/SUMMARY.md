# Project Research Summary

**Project:** Berlin School Guide — v1.2 Evidence-Based School Profiles
**Domain:** Evidence-backed qualitative decision-support content (structured tags + editorial narrative + mixed-source citations) layered onto an existing static Next.js school-profile product
**Researched:** 2026-07-26
**Confidence:** HIGH

## Executive Summary

This milestone is a content-and-trust-model problem wearing a small amount of schema/UI work, not a new-technology problem. The existing field-evidence architecture (`FieldValue<T>` + `Source` + `sourceId` citations + `superRefine` validation gates) already models exactly what tags and editorial narrative need — a value, a status, and citations. Experts building trust-first, anti-ranking qualitative content (ProPublica methodology pages, Wikipedia's inline-citation policy, Steam Hardware Hub's official/reporting/community tiering, College Scorecard's fact-only stance) converge on the same pattern this codebase already half-implements: extend the evidence model, add an explicit new "triangulated community" tier with a strict corroboration rule, and publish a versioned methodology *before* tagging any school.

The recommended approach is additive-only: extend `sourceTypeSchema` with `journalism` and a displayable community-signal type; add two new schema units (`tag/`, `tagTaxonomy/`) that reuse the existing citation-resolution mechanics rather than inventing a parallel system; model editorial narrative as structured, citable `FieldValue<string>` fields (not per-school MDX); and render everything through two new conditional components (`TagsSection`, `EditorialNarrative`) wired into the unchanged `SchoolProfile`/`collectCitedSources`/`SourcesSection` pipeline. No new npm dependency is required for the core work; `@radix-ui/react-popover` and `remark-gfm` are optional, deferred until pilot signals justify them.

The dominant risk is not technical but editorial/legal: qualitative content is exactly where the site's hard-won anti-ranking, coverage-≠-quality positioning can quietly erode — through soft reputation language re-entering via prose, through a tag taxonomy that silently rewards well-documented schools over well-suited ones, through citation density that overwhelms rather than reassures, and through community-sourced reputation claims carrying real (if extrapolated) German media-law exposure. Every one of these risks is preventable *before* code is written, by treating the "Editorial & Research Framework" deliverable as a true gate — written and reviewed before any pilot school is tagged — rather than a formality that follows the pilot.

## Key Findings

### Recommended Stack

No new core dependency is needed. The milestone's "stack" work is schema extension (widen `sourceTypeSchema`, add a tag catalog enum, add one new evidence rule for community triangulation) plus one dependency-free UI pattern (native `<details>`/`<summary>` for inline citation disclosure in prose). This directly follows `AGENTS.md`'s instruction to evolve the existing architecture rather than add abstractions prematurely — a CMS, markdown-remote pipeline, tagging library, or new UI framework would all violate that rule and aren't justified by a 3–5 school pilot.

**Core technologies:**
- `zod` (already pinned, 4.4.3): extend `sourceTypeSchema`/`reliabilityLevelSchema` with `journalism` + community-triangulation rules; new tag catalog schema and per-tag `FieldValue` wrapper — every fact-shaped thing in this codebase is already a Zod schema with a `superRefine` gate, so reuse it
- `@next/mdx` (already pinned): only for the public-facing methodology guide deliverable (`src/content/guides/methodology.mdx`-style), never for per-school narrative
- `class-variance-authority` (already pinned): backs one new shared `Badge` primitive (tag chips, confidence pills, source-type pills) — three concrete variants now justifies promoting this from `StatusBadge`-only to a shared primitive
- Native `<details>`/`<summary>` (no library): inline citation disclosure in narrative prose, zero JS, zero bundle cost, static-export compatible
- Optional/deferred: `@radix-ui/react-popover` (only if `<details>` proves visually disruptive), `remark-gfm` (only if the methodology guide wants footnote syntax) — neither needed for the pilot itself

Explicitly rejected: headless CMS/content frameworks, generic tagging libraries, review-aggregation/scraping tools, any ranking/scoring engine, rich-text/remark pipelines for per-school narrative, and content-tone linters — all disproportionate to a 3–5 school pilot and/or in direct conflict with existing `docs/` decisions.

### Expected Features

**Must have (table stakes) — already partly built for fields, must extend to tags/narrative:**
- Inline citation next to every factual claim/tag, reusing `ProfileFieldRow`/`SourcesSection` pattern
- Source-type/reliability label per claim (official / school-provided / community-non-official)
- Visible "missing / not confirmed" state for tags, never hidden — matches existing product principle
- Consolidated `Fontes` section per page covering facts + tags + narrative citations
- "Last researched"/"last verified" date visible (reuse `researchMetadata`)
- Correction/report-an-issue path explicitly extended to cover tags and narrative
- Public, versioned methodology explanation (extend existing `/methodology` route)
- Non-superlative editorial voice enforced on the new `Perfil da escola` content type, same rules as existing content

**Should have (differentiators — where this milestone should invest):**
- Structured tag taxonomy with per-tag evidence array (source-level provenance per attribute, not just a page-level source list) — no mainstream school-rating competitor does this
- Explicit three-tier evidence hierarchy per tag: official → reputable journalism → triangulated community (mirrors Steam Hardware Hub's official/reporting/community separation)
- Triangulation rule: a community observation needs ≥2 independent, non-collusive sources and can *never* be the sole basis for a tag (stricter than journalism's own two-source rule)
- Qualitative confidence label (3 fixed tiers) instead of any fabricated numeric score
- `Perfil da escola` narrative that answers "what kind of school" not "is it good," synthesized *from* already-tagged, cited fields
- Methodology treated as a versioned, first-class deliverable published before/alongside the first tagged pilot school

**Defer (v2+ / explicitly out of scope this milestone):**
- Tag provenance/changelog UI (add once staleness becomes an observed problem)
- Promoting tags to directory filter chips or comparison columns — gated on pilot validation, `.planning/PROJECT.md` already defers this
- Tag-aware Open Day questions, expanded/revised taxonomy, structured community-submission intake flow, user-configurable "compatibility" framing, broader geographic rollout

**Anti-features to actively resist:** numeric/star scores, single-source community tags, aggregated parent ratings, AI-generated tags/narrative without human citation trail, school-authored "premium profile" content, fabricated confidence percentages, comparative superlative language in narrative — all explicitly rejected by existing `docs/DECISIONS.md`/`docs/COMPARISON.md` and corroborated by documented failure modes at GreatSchools, Niche, CMS Care Compare, and US News.

### Architecture Approach

No new top-level domain folder: tags and editorial narrative are school-profile concepts and belong inside the existing `src/features/schools/` and `src/features/evidence/` directories, extending rather than replacing the current field-evidence primitives. The core discipline is additive-only schema change (`tags`/`editorial` as `.optional()` on `schoolSchema`, new enum values additive) so the other 5–7 non-pilot Lichtenberg schools keep validating and rendering byte-identically. Three distinct schema shapes are kept deliberately separate — `FieldValue<T>` (unchanged), `tag/` (multi-source + confidence + taxonomy reference), and `editorial` (prose + per-block source category) — sharing only a reusable citation-resolution helper, not a unified "evidence block" supertype, per `AGENTS.md`'s anti-premature-abstraction rule.

**Major components:**
1. `tagTaxonomy/` (new) — canonical, versioned catalog of valid tag ids + PT-BR labels + categories, referenced by id (never inlined), mirroring the existing source-registry pattern
2. `tag/` (new) — per-school schema: taxonomy reference + confidence tier + evidence array reusing `fieldCitationSchema`
3. `validateTagEvidence/` (new) — mirrors `validateFieldCitations`, adds the "community is never sole basis" rule
4. `sourceTypeSchema` (modified, additive) — adds `journalism` + a displayable community-signal type distinct from the reserved-only `anecdotal_reserved`
5. `TagsSection` / `EditorialNarrative` (new components) — conditionally rendered inside unchanged `SchoolProfile`, grouped by category with confidence + source-type badges
6. `collectCitedSources` (modified) — extended to walk tag/editorial citations so `Fontes` stays the single consolidated source list
7. `SchoolCard`/`ComparisonTable`/`filterSchools` — explicitly untouched; tags/editorial are profile-only this milestone

Suggested build order: framework docs first (no code) → schema layer + fixtures/tests → pilot content authored into existing `lichtenbergPrimarySchools/index.ts` → profile UI wired conditionally → validation gates (regression-check that non-pilot schools and `coverage.percentage` are unchanged).

### Critical Pitfalls

1. **Soft ranking language re-enters through editorial prose** ("muito procurada," "reputação forte") — avoid via an explicit banned/require-attribution word list in `docs/EDITORIAL_GUIDE.md`, enforced at every profile addition, not just once.
2. **Community-sourced reputation synthesis carries real legal exposure distinct from raw reviews** — even triangulated, editorializing community sentiment about a named school is a new risk category under German case law (Tatsachenbehauptung vs. Meinungsäußerung); requires attributed phrasing, a documented triangulation trail, an extended correction path, and a flagged legal-review checkpoint before pilot publish.
3. **Tag taxonomy becomes a proxy for "how well-documented is this school," not what it claims to measure** — schools with less online/community visibility will accumulate fewer tags regardless of actual fit; mitigate with a mandatory `não confirmado` tag state and deliberate inclusion of a low-documentation pilot school.
4. **Citation density overwhelms the profile UI**, turning a helpful summary into a legal-disclaimer wall — prototype with a real multi-source paragraph early, prefer consolidated evidence notes over per-clause inline markers.
5. **Pilot school/source selection is itself an unexamined editorial decision** that can bias the whole "validated" methodology toward easy cases — write selection criteria down before picking schools and ask "would this work on the hardest, least-documented school?" at pilot close.
6. **Rich vs. sparse profile density gets read by parents as a quality signal**, worse than the existing coverage-≠-quality risk because qualitative richness is more perceptually vivid than a numeric percentage — design the sparse/low-evidence state to feel complete on its own terms.
7. **Qualitative content goes stale faster than the existing fact-recheck cadence assumes**, with no distinct signal to catch it — needs its own shorter review cadence and status field, separate from `research_status`.

## Implications for Roadmap

Based on combined research, suggested phase structure for this milestone:

### Phase 1: Editorial & Research Framework
**Rationale:** Every domain researched (ProPublica, College Scorecard, Steam Hardware Hub) fixes methodology *before* the data it governs; writing rules after tagging schools risks retrofitting them to match whatever was already published — the opposite of the trust-first goal. This phase also directly prevents 6 of 7 pitfalls at their cheapest, "still just words" stage.
**Delivers:** Extended `docs/RESEARCH.md` (source hierarchy → journalism/community tiers, triangulation definition ≥2 independent sources), `docs/EDITORIAL_GUIDE.md` (banned/attributed-reputation-language list, official-vs-community narrative voice, hedge-preservation rule for translated source material), `docs/DATA_MODEL.md` (tag/editorial field shapes), `docs/DECISIONS.md` (taxonomy + source-category decisions, "qualitative richness ≠ quality" extension), a written pilot-selection rationale, and a defined qualitative-content review cadence distinct from fact-recheck.
**Addresses:** Methodology & research framework deliverable, tag taxonomy v1 scoping (FEATURES.md P1 items)
**Avoids:** Pitfalls 1, 2, 3, 5, 6, 7, 8 (all name this phase as primary prevention point)

### Phase 2: Evidence & Tag Schema Layer
**Rationale:** Schema must exist and be validated with fixtures before real content is authored against it, so mistakes surface in tests, not in published pilot profiles.
**Delivers:** `sourceTypeSchema` additive values (`journalism`, displayable community-signal type) + `getSourceCategory()` helper; new `tagTaxonomy/` and `tag/` units; new `validateTagEvidence/` (mirrors `validateFieldCitations`, enforces "community never sole basis"); `editorial` field group (`FieldValue<string>` for official/community narrative) added optionally to `schoolSchema`; valid/invalid fixtures for tag and editorial shapes; unit tests for new label maps and `superRefine` rules.
**Uses:** `zod` (existing), `class-variance-authority` for the new shared `Badge` primitive
**Implements:** `tagTaxonomy/`, `tag/`, `validateTagEvidence/`, `sourceTypeSchema` extension (ARCHITECTURE.md components)

### Phase 3: Pilot Profile Content (3–5 Lichtenberg schools)
**Rationale:** Content authoring is the real bottleneck this milestone (per ARCHITECTURE.md scaling analysis), and it's also where Pitfalls 3–5 (documentation bias, selection bias, staleness) must be pressure-tested against real schools, not hypothetical ones.
**Delivers:** Tags + editorial narrative authored directly in `lichtenbergPrimarySchools/index.ts` for 3–5 schools deliberately spanning at least one high- and one low-documentation school; any new `journalism`/community `Source` entries; continuous `pnpm validate:data` runs; the other 5–7 schools left untouched.
**Addresses:** FEATURES.md P1 items — tag taxonomy applied, triangulation rule exercised on at least one real example, `Perfil da escola` narrative drafted
**Avoids:** Pitfall 3 (via deliberate low-documentation inclusion), Pitfall 5 (via documented selection rationale)

### Phase 4: Profile UI (TagsSection + EditorialNarrative)
**Rationale:** UI should be built against real authored content (Phase 3), not placeholder text — Pitfall 4 specifically warns that citation-density problems are invisible until a real multi-source paragraph is rendered.
**Delivers:** New `TagsSection` (tags grouped by category, confidence + source-type badges, expandable evidence) and `EditorialNarrative` (official vs. community blocks) components; `SchoolProfile` wired to render them conditionally; `collectCitedSources` extended to walk tag/editorial citations into the single `Fontes` list; verification that non-pilot school profile pages remain pixel/DOM-identical.
**Uses:** Native `<details>`/`<summary>` for inline citation disclosure; shared `Badge` primitive from Phase 2
**Implements:** `TagsSection`, `EditorialNarrative`, modified `collectCitedSources`/`SourcesSection` (ARCHITECTURE.md components)

### Phase 5: Validation & Release Gates
**Rationale:** The milestone's stated goal is proving the model is trustworthy, *repeatable, and maintainable* — that requires explicit regression and readability checks, not just "it builds."
**Delivers:** Jest/RTL coverage for new schema validators and both new components; confirmed `next build` static export success; confirmed `coverage.percentage` byte-identical pre/post for all schools (guards against silently folding tags/editorial into the versioned coverage metric); extended Playwright coverage asserting tag chips + narrative + `Fontes` render together on a pilot school page; a real-content readability check for citation density before calling the pilot done.
**Delivers:** Confidence that the methodology "would still work on the hardest, least-documented school" (Pitfall 5's exit question) is answerable.

### Phase Ordering Rationale

- Framework-before-code is not a stylistic preference — every cross-domain analog researched (ProPublica, College Scorecard, Steam Hardware Hub) and every pitfall with a "Prevention Phase" column names the framework phase, because retrofitting rules to already-published content defeats the trust-first premise.
- Schema-before-content ensures fixture-level validation (invalid community-only-confirmed tag, etc.) exists before a real school's profile could accidentally violate the triangulation rule.
- Content-before-UI is necessary because Pitfall 4 (citation density) can only be diagnosed against real, multi-source prose — a lorem-ipsum UI prototype would hide the exact problem this phase order is designed to catch.
- Directory/compare integration is deliberately excluded from all phases — `.planning/PROJECT.md` defers it explicitly, and Pitfall 6 (density read as quality) compounds specifically once tags reach a side-by-side comparison surface, so it must stay out of scope until a future, explicitly-gated milestone.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Editorial & Research Framework):** the legal-exposure pitfall (Pitfall 2) is explicitly flagged LOW confidence beyond cited German case law (teacher-rating precedent extrapolated to school-reputation editorial content) — recommend a real German-qualified legal consultation before finalizing correction-workflow and voice rules, not just internal research.
- **Phase 3 (Pilot Profile Content):** triangulation "independence" judgment (what counts as two genuinely independent community sources vs. two people citing the same forum thread) has no existing tooling or precedent in this codebase — needs a concrete editorial-log format decided during planning, not assumed from the schema alone.

Phases with standard patterns (skip research-phase):
- **Phase 2 (Schema Layer):** directly extends existing, well-understood `FieldValue`/`Source`/`superRefine` patterns already proven across the codebase (fields, sources, research metadata) — architecture research is HIGH confidence and code-pattern-ready.
- **Phase 4 (Profile UI):** reuses existing `ProfileSection`/`SourcesSection`/`Badge`(`cva`) conventions and native HTML disclosure — no new UI paradigm to research.
- **Phase 5 (Validation & Release Gates):** mirrors existing Jest/RTL/Playwright/`validate:data` CI patterns already in place; no new tooling.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Grounded in direct codebase inspection plus live npm registry version checks; no speculative external tooling recommended |
| Features | MEDIUM-HIGH | No single analog matches this exact combination (anti-ranking + evidence-tiered + qualitative); synthesis draws on multiple independently-corroborated domains (Wikipedia policy, CMS/hospital-rating peer research, journalism sourcing standards, ProPublica/College Scorecard precedent) rather than one authoritative source |
| Architecture | HIGH | Directly grounded in current codebase read (`src/features/schools/school`, `src/features/evidence/*`, `SchoolProfile`) and canonical project docs, not external ecosystem speculation |
| Pitfalls | MEDIUM | German media-law case law and static-site/content precedent are well-documented, but direct precedent for a Brazilian-Portuguese, anti-ranking, evidence-labeled school guide specifically is thin — several findings (especially the legal-exposure pitfall) are extrapolated from adjacent domains and explicitly flagged as directional, not authoritative |

**Overall confidence:** HIGH for what to build and how; MEDIUM for the legal/editorial risk surface, which should be treated as a real gate (Phase 1) rather than a solved problem.

### Gaps to Address

- **Legal exposure of community-sourced reputation synthesis (Pitfall 2):** current research is LOW confidence beyond cited case law analyzing teacher-rating platforms, not qualitative school editorial guides specifically — flag for an actual legal-review checkpoint before Phase 3 pilot content publishes, not just internal editorial rules.
- **"Independence" definition for triangulation:** the ≥2-source rule requires a concrete, auditable definition of what makes two community sources independent (different families, different school years, not the same forum thread) — this must be decided as a concrete editorial-log format during Phase 1/Phase 3 planning, since the schema alone can enforce "≥2 sources" but not "genuinely independent."
- **Pilot school selection representativeness:** the research strongly recommends deliberately including at least one low-documentation school, but the actual selection has not yet happened — this should be an explicit planning decision in Phase 1, with rationale recorded in the methodology deliverable itself.

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection — `src/features/schools/school/index.ts`, `src/features/evidence/{fieldEvidence,source,sourceTypes}`, `src/features/schools/{SourcesSection,ProfileFieldRow,StatusBadge,ProfileSection,SchoolProfile,researchMetadata,collectCitedSources}`, `src/content/schools/real/lichtenbergPrimarySchools/index.ts`
- Canonical project docs — `docs/DATA_MODEL.md`, `docs/RESEARCH.md`, `docs/DECISIONS.md`, `docs/EDITORIAL_GUIDE.md`, `docs/COMPARISON.md`, `docs/INFORMATION_ARCHITECTURE.md`, `docs/PRODUCT.md`, `AGENTS.md`, `.planning/PROJECT.md`, `.planning/codebase/{ARCHITECTURE.md,STRUCTURE.md}`
- npm registry version checks (2026-07-26) — `zod@4.4.3`, `@radix-ui/react-popover@1.1.23`, `remark-gfm@4.0.1`, and related Radix package versions
- Wikipedia:Verifiability policy; Lonely Planet AI editorial policy (2026); AP Statement of News Values; NYT anonymous-sourcing guidelines; ProPublica "How We Analyzed..." methodology articles — official/primary policy sources
- Angrist, Hull, Pathak, Walters, "Race and the Mismeasure of School Quality," NBER Working Paper 29608 — peer-reviewed economics research on rating-system selection bias

### Secondary (MEDIUM confidence)
- CMS Hospital Compare / Care Compare star-rating critiques (JAMA Health Forum 2022, AHA/KNG Health issue brief)
- GreatSchools ratings methodology criticism (Chalkbeat 2019, 2022)
- Niche.com "Where Our Data Comes From," Niche Premium Profile marketing pages
- Steam Hardware Hub methodology page (official/reporting/community/analysis tiering) — single strong cross-domain analog
- OLG Köln *spickmich.de II*, OLG Karlsruhe 2008, LG Duisburg 2008 — German case law on rating platforms, extrapolated to this product's editorial context
- Snopes fact-check rating-definition history

### Tertiary (LOW confidence)
- General web search synthesis on parent school-choice decision biases and 2025–2026 school-reputation platform shifts — aggregated commentary, used only as directional support, not standalone evidence
- Legal-exposure analysis for community-sourced editorial synthesis specifically (as opposed to teacher-rating platforms) — needs real legal validation, flagged explicitly in Gaps to Address

---
*Research completed: 2026-07-26*
*Ready for roadmap: yes*
