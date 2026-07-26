# Phase 12: Editorial & Research Framework - Research

**Researched:** 2026-07-26
**Domain:** Editorial/research documentation framework (docs-only + one MDX content update) for an evidence-backed, anti-ranking static Next.js school guide
**Confidence:** HIGH (stack/architecture — direct codebase + docs inspection); MEDIUM (editorial/legal risk surface — see Assumptions Log)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Tag taxonomy v1**
- D-01: Closed category set + closed tag IDs in v1. Organize as categories with 1–3 tags each (not a flat list).
- D-02: v1 shape — 10 tags across 4 categories:
  - Academic focus: `stem-focus`, `languages-focus`, `arts-music-focus`
  - Learning model: `bilingual-program`, `special-pedagogical-model`, `all-day-model`
  - Student support: `inclusion-support`, `transition-support`
  - School environment: `structured-learning-environment`, `active-school-community`
- D-03: Out of v1: `High demand` (admissions pressure/popularity, not school–child match; hard to evidence comparably).
- D-04: `active-school-community` describes visible parent/community participation — never implies the community is "better."
- D-05: Taxonomy rule: a tag must help a family decide whether the school matches their child — not catalog every offer. Tags describe a sustained, decision-relevant characteristic — not isolated projects, generic claims, or documentation richness.
- D-06: Community evidence may be used only for `active-school-community` (never as sole basis; official corroboration where applicable). All other v1 tags = official and/or journalism only. Pilot thoroughly tests the community workflow on one tag before any v2 expansion.
- D-07: Tag only when character goes beyond the factual field. Facts answer "what does this school have?"; tags answer "what kind of school is this?" (e.g. verified Ganztag ≠ automatic `all-day-model`; SESB/bilingual stream ≠ automatic `bilingual-program`).

**Community independence rule**
- D-08: Independence = different publisher/community origin, not different URLs or different individuals in the same venue. Guiding principle: observations could reasonably have arisen separately, not merely been repeated.
- D-09: Echoes do not count — including same-thread comments, cross-posts, screenshots/reposts of the same discussion, two Reddit threads about the same post, same article republished elsewhere.
- D-10: Acceptable independence examples: Reddit + Facebook parent group; two unrelated Facebook groups (different moderation/membership); parent blog + Reddit; local parent forum + Facebook group.
- D-11: Conflict → fail closed: no tag. Research log may record supporting evidence, opposing evidence, and withhold reason. Public profile omits the tag. Absence of a tag means insufficient evidence, not negative.
- D-12: Minimum community-source quality: active, multi-voice venue — multiple participants (not a single testimonial), recent enough to reflect the current school, substantive discussion (not one-line reactions). Abandoned pages with one comment do not count.
- D-13: Independence log is minimal structured per source: venue/publisher, URL or stable identifier, date accessed, one-line independence rationale vs other source(s), echo-check note. Longer reasoning belongs in research notes, not the required log.
- D-14: Community sources normally within ~24 months of authoring/review. Older material only if it clearly describes a durable characteristic still confirmed by current official information or other up-to-date evidence.

**Pilot-selection criteria**
- D-15: Phase 12 delivers criteria + a full named 3–5 school pilot set in `docs/` (no selection drift). Names are proposed during planning/docs execution from these criteria and reviewed in the Phase 12 PR/verification — not picked ad hoc in chat.
- D-16: Diversity dimensions (coverage targets, not 1:1 seats — one school may satisfy multiple): (1) well-documented school; (2) low-documentation school; (3) bilingual/SESB school; (4) distinctive specialization (e.g. music, STEM); (5) typical neighbourhood school.
- D-17: Objective of the set: validate methodology across different evidence conditions, not showcase "best" schools.
- D-18: Low-documentation = existing `researchStatus` of `directory_only` plus thin public web presence (sparse beyond Senate portrait).
- D-19: Intentionally include ≥1 school where independent community venues are plausibly findable, so the pilot exercises the full triangulation workflow for `active-school-community`. If evidence still fails the threshold → fail closed and withhold the tag (that outcome is successful validation of the model).

**Qualitative review cadence**
- D-20: Hybrid model: periodic + event-driven. Event triggers include major school website updates, significant press coverage, curriculum/program changes, repeated correction reports, and methodology version changes. Community observations are revalidated on each qualitative review pass.
- D-21: Periodic baseline: annual review for all qualitative content (tags + "Perfil da escola"). Community-backed `active-school-community` must be revalidated at least every ~12 months.
- D-22: This milestone introduces distinct tracking separate from factual `research_status` (e.g. `qualitativeLastReviewed`). Phase 12 documents the policy and required field semantics; Phase 13 implements the schema.
- D-23: On methodology version change: re-review all pilot qualitative content (every tagged/narrated pilot profile) before declaring the new methodology version live.

### Claude's Discretion
- Exact wording of confidence-label vocabulary and banned/attributed-reputation phrase lists when drafting `docs/EDITORIAL_GUIDE.md` / `docs/DECISIONS.md` (deferred from deep discussion; must still satisfy ROADMAP success criterion 2 and anti-ranking product rules).
- Depth and structure of the public `/methodology` MDX update (Area 5 deferred; still required by FRAME-02 — keep families clear on source tiers, tags vs facts, confidence = evidence strength not quality, and absence-of-tag ≠ negative).
- Concrete school names for the 3–5 pilot set, chosen objectively from D-15–D-19 during Phase 12 docs work.
- Exact doc section layout / which files hold pilot rationale vs cadence vs taxonomy (must cover RESEARCH, EDITORIAL_GUIDE, DATA_MODEL, DECISIONS per roadmap).

### Deferred Ideas (OUT OF SCOPE)
- Methodology page depth / family-facing framing details — deferred until internal methodology is solid; still ship FRAME-02 update in Phase 12 with Claude discretion on depth.
- Confidence-label wording and banned-phrase inventory — deferred from discuss deep-dive; still required in editorial docs this phase (Claude discretion within anti-ranking rules).
- Expanding community evidence to other tags — explicitly post-v1 / after pilot validation.
- `High demand` tag — rejected for v1; may revisit only with comparable official evidence and a match-making rationale.
- Tags on directory cards / compare — already out of milestone scope (FUT-02).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FRAME-01 | Editorial & research framework in `docs/` defines evidence standards, source hierarchy (official → journalism → triangulated community), editorial voice, tag taxonomy v1, citation rules, and maintenance guidelines | Existing `docs/RESEARCH.md`/`docs/EDITORIAL_GUIDE.md`/`docs/DATA_MODEL.md` structure mapped section-by-section for additive extension (see Architecture Patterns); D-01–D-14 give exact taxonomy/independence content to write; Pitfalls 1, 2, 3, 8 give the specific rules the voice/taxonomy sections must contain |
| FRAME-02 | Public `/methodology` page is updated and versioned to explain the evidence-backed profile model to families | Current `src/content/guides/methodology.mdx` + `src/app/methodology/page.tsx` read in full (see Code Examples); extension pattern identified (plain MDX headings/bullets, no new component); "versioned" requirement mapped to a concrete mechanism recommendation |
| FRAME-03 | Written pilot-selection criteria include ≥1 lower-documentation school and are recorded before tagging begins | Full `lichtenbergPrimarySchools/index.ts` dataset inspected; data-driven candidate mapping against D-16/D-18/D-19 provided (see Pilot Candidate Analysis) so the planner can finalize named schools with evidence, not guesswork |
| FRAME-04 | Qualitative content has an explicit review cadence separate from factual field recheck | D-20–D-23 give the exact cadence; existing `research_status`/`lastResearched`/`lastSourceChecked` model in `docs/RESEARCH.md` read to identify the parallel field/section to add without overloading the factual model |
</phase_requirements>

## Summary

Phase 12 is a pure documentation-and-content phase: four existing `docs/` files get new sections, one existing MDX guide gets new sections, and (per Claude's discretion) a new `docs/research/` file may hold the pilot rationale. No schema, component, or dependency changes belong here — those are explicitly Phase 13 (schema) and Phase 15 (UI). The project's own `.planning/research/SUMMARY.md` and `.planning/research/PITFALLS.md` (already produced for this milestone) did the heavy technology/pitfall research; this document translates that into phase-scoped, file-level guidance plus a data-driven pilot-candidate analysis pulled directly from the real school dataset.

The existing four canonical docs (`docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, `docs/DECISIONS.md`) already use a consistent, simple prose+bullet+table Markdown style with no front-matter or tooling dependency — the safest and only appropriate pattern is to extend each with new `##` sections that slot into the existing structure, never rewriting existing sections. `docs/DECISIONS.md` additionally requires new dated entries in its fixed `Context/Decision/Alternatives Considered/Consequences` format for every structural decision this phase locks in (taxonomy v1, source-category extension, qualitative-richness-≠-quality, qualitative review cadence).

The public methodology page (`src/content/guides/methodology.mdx`, rendered via `src/app/methodology/page.tsx`) is plain Markdown with no custom MDX components — it should stay that way for this update; no new component is needed to satisfy FRAME-02. The site has reusable presentational primitives (`GlossaryTerm`, `BerlinCallout`) if the planner wants a term callout for something like "fonte triangulada" or "SESB," but their use is optional, not required.

For FRAME-03, this research read the full 10-school Lichtenberg dataset (`src/content/schools/real/lichtenbergPrimarySchools/index.ts`) and cross-referenced every school's `researchStatus`, `offers`, and source count against D-16's five diversity dimensions. A concrete, data-backed candidate table is provided below so the planner/execution agent can select and justify the named 3–5 schools directly from evidence already in the repository, rather than re-deriving it from scratch.

**Primary recommendation:** Treat this phase as four additive doc-edit tasks (RESEARCH.md, EDITORIAL_GUIDE.md, DATA_MODEL.md, DECISIONS.md) + one MDX content task (methodology.mdx) + one new pilot-rationale artifact, all cross-referencing each other by section anchor, with the pilot table below as the starting evidence base for FRAME-03's named selection.

## Architectural Responsibility Map

This phase has no runtime/application-tier work — it is entirely authored content. The "tiers" below are adapted to a static-content project rather than a typical multi-service app.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Source hierarchy + independence definition (FRAME-01) | Documentation (`docs/`, source of truth per `AGENTS.md`) | — | Pure policy text; no runtime component reads this file directly, it governs how humans/agents author data in Phase 13/14 |
| Tag taxonomy v1 + banned-language + Perfil voice (FRAME-01) | Documentation (`docs/`) | — | Same — governs future schema (Phase 13) and content authoring (Phase 14), not itself executable |
| Public methodology explanation (FRAME-02) | Frontend Server (SSR) / Static Export | CDN / Static | `src/content/guides/methodology.mdx` compiles into a statically exported page at build time via `@next/mdx`; no client-side interactivity or API involved |
| Pilot-selection rationale (FRAME-03) | Documentation (`docs/`) | — | Editorial/process record; consumed by Phase 14 execution, not by any running code |
| Qualitative review cadence policy (FRAME-04) | Documentation (`docs/`) | Database / Storage (future) | Phase 12 documents the policy only; the corresponding `qualitativeLastReviewed`-style field lands in the static data model in Phase 13 |

**Why this matters:** every capability in this phase is documentation-tier, not code-tier. The plan-checker should treat any task that proposes new components, schema fields, or npm dependencies in this phase as a scope violation — that work belongs to Phase 13 (schema) or Phase 15 (UI), per the roadmap's own phase boundaries and the CONTEXT.md phase-boundary statement ("Schema enforcement and pilot content authoring belong to Phases 13–14").

## Standard Stack

No new dependency, library, or tooling is required for this phase.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@next/mdx` | 16.2.10 (pinned, verified in `package.json`) | Compiles `src/content/guides/methodology.mdx` into the static `/methodology` page | Already the exclusive mechanism for guide content in this repo (`berlin-school-system.mdx`, `first-steps.mdx`, `german-education-system.mdx`, `methodology.mdx`) |
| Markdown (no framework) | n/a | Authoring format for all four extended `docs/` files | Matches 100% of existing `docs/*.md` files — no linter, no schema, no front-matter in use today |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `src/features/guides/GlossaryTerm` | existing, unmodified | Optional term-definition callout (`<dl>`/`<dt>`/`<dd>`) | Only if the methodology update introduces a term worth a standalone definition block (e.g. "fonte triangulada"); not required — the existing methodology.mdx uses plain bold-term bullet lists successfully already |
| `src/features/guides/BerlinCallout` | existing, unmodified | Highlighted aside box | Not a natural fit for methodology content (it's Berlin-vs-Germany framing, not evidence framing) — do not force it in |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Plain Markdown sections in existing `docs/*.md` | A new structured format (YAML frontmatter, docs site generator) | Would violate `AGENTS.md`'s "prefer evolving the existing architecture" and "avoid generic utilities... until at least two concrete use cases exist" — no other doc in the repo uses structured frontmatter |
| Extending existing MDX file | New per-tag/community MDX components on the methodology page | Premature — FRAME-02 only requires explaining the model in prose; component-level tag/badge rendering is Phase 15's job, applied to actual school pages, not the methodology guide |

**Installation:** none required.

**Version verification:** No new packages are introduced, so no `npm view` verification is needed. Existing pinned versions (`@next/mdx@16.2.10`, `zod@4.4.3`) are unaffected by this phase.

## Architecture Patterns

### System Architecture Diagram

```text
docs/ (source of truth, human+agent authored)
   │
   ├─ docs/RESEARCH.md ──────────┐
   ├─ docs/EDITORIAL_GUIDE.md ───┼── read by: Phase 13 schema design,
   ├─ docs/DATA_MODEL.md ────────┤            Phase 14 content authoring,
   ├─ docs/DECISIONS.md ─────────┘            docs/research/SCHOOL_RESEARCH_WORKFLOW.md
   │
   └─ docs/research/<new pilot-rationale file>  (Claude's discretion on filename)
             │
             ▼
   src/content/guides/methodology.mdx  (public mirror, PT-BR, family-facing)
             │
             ▼  (compiled at build time via @next/mdx)
   src/app/methodology/page.tsx  (route shell, GuideIntro + <MethodologyGuide />)
             │
             ▼ (next build --> static export)
   Static HTML at /methodology
```

A reader should be able to trace: an internal policy decision (e.g. "community can never be sole basis for a tag") is written once in `docs/RESEARCH.md`/`docs/DECISIONS.md`, and its family-facing consequence ("we only show this when confirmed by two independent sources") is mirrored in plain language in `methodology.mdx`, which Next.js compiles into the public static page. No other data flow exists in this phase — there is no schema, API, or client-side state.

### Recommended Project Structure

No new directories are required. This phase only edits existing files and optionally adds one new file:

```text
docs/
├── RESEARCH.md          # extend: journalism/community tiers, independence definition, review cadence
├── EDITORIAL_GUIDE.md   # extend: tag taxonomy voice rules, banned/attributed-language list, Perfil voice
├── DATA_MODEL.md        # extend: tag taxonomy v1 shape (doc-only, no code), qualitativeLastReviewed semantics
├── DECISIONS.md         # extend: new dated decision entries (taxonomy, source tiers, qualitative richness ≠ quality, cadence)
└── research/
    ├── SCHOOL_RESEARCH_WORKFLOW.md        # existing — cross-reference, do not duplicate
    ├── REAL_SCHOOL_RESEARCH_SPIKE.md      # existing — source for pilot candidate evidence
    └── PILOT_SELECTION.md                 # NEW (suggested name) — criteria + named 3-5 school rationale

src/content/guides/
└── methodology.mdx      # extend: source tiers, tags vs facts, confidence labels, absence ≠ negative
```

### Pattern 1: Additive `##` section extension in existing docs files

**What:** Every edit to `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, and `docs/DATA_MODEL.md` should be a new `##`-level section appended in a logical position (near related existing sections), never a rewrite of existing prose.

**When to use:** All FRAME-01 work.

**Example (mirrors existing `docs/RESEARCH.md` style):**
```1:19:docs/RESEARCH.md
# Research

## Research Standard

Every factual school attribute should be supported by evidence.

If a claim cannot be verified, it should be omitted, marked as missing, or labeled `não confirmado`, depending on the context.

## Source Hierarchy

Sources should be evaluated in this order:

1. Official Berlin Senate, district, or public education sources.
2. Official school inspection or quality reports.
3. Individual school websites.
4. Public statistical datasets.
5. Parent reviews, forums, Google ratings, and social media.
```

The existing "Source Hierarchy" section already numbers a 5-tier list ending in "Parent reviews, forums, Google ratings, and social media" (currently undisplayed/reserved). FRAME-01 requires inserting `journalism` as a new tier and promoting a defined *subset* of tier 5 (triangulated community, ≥2 independent sources per D-08–D-14) to a displayable status — without touching tiers 1–4's existing wording, and without un-reserving `anecdotal_reserved` itself (that stays reserved; `TAG-02` in Phase 13 adds a *new*, distinct displayable community-signal type per `.planning/research/SUMMARY.md`).

### Pattern 2: New dated `docs/DECISIONS.md` entries per structural decision

**What:** `docs/DECISIONS.md` has a fixed, repeated format (`## YYYY-MM-DD: Decision title` → `### Context` → `### Decision` → `### Alternatives Considered` → `### Consequences`). Every locked decision this phase finalizes in prose (taxonomy v1 shape, source-tier extension, qualitative-richness-≠-quality, review cadence split) should get its own dated entry, appended after the existing 2026-07-10 entries.

**When to use:** For each of: (a) tag taxonomy v1 + community-only-for-`active-school-community` rule, (b) source hierarchy extension (journalism + triangulated community tier), (c) "qualitative richness ≠ quality" as an explicit extension of the existing "Evidence Coverage Measures Research Completeness" decision, (d) qualitative review cadence as distinct from `research_status` recheck.

**Example (existing format to follow exactly):**
```13:31:docs/DECISIONS.md
Each decision should use this format:

```md
## YYYY-MM-DD: Decision title

### Context

What situation, constraint, or problem led to the decision?

### Decision

What was decided?

### Alternatives Considered

What other options were considered?

### Consequences

What tradeoffs, limitations, or follow-up work result from this decision?
```
```

### Pattern 3: Plain-Markdown MDX extension for the public methodology page

**What:** `methodology.mdx` uses only H2 headings and bullet lists (no imported components today). Extend it the same way — new `##` sections for source tiers, tags vs. facts, confidence labels, and "absence of a tag ≠ negative" — matching the existing tone and bullet-definition style already used for evidence-status labels.

**When to use:** FRAME-02.

**Example (existing style to mirror):**
```5:15:src/content/guides/methodology.mdx
## Status de evidência

Estes são os rótulos que você vê nos cartões:

- **Verificado** — encontramos a informação em uma fonte oficial ou confiável e a conferimos.
- **Informação não encontrada** — pesquisamos, mas não localizamos essa informação nas fontes disponíveis.
- **Informação inferida, não confirmada** — deduzimos a partir de outro dado (por exemplo, cuidado no contraturno a partir do modelo Ganztag), mas ainda não confirmamos diretamente.
```

A new "confidence label" section for tags should follow this exact bullet-definition pattern, not introduce a different visual/structural convention. Note the route shell's `metadata.description` in `src/app/methodology/page.tsx` ("Como interpretamos evidências, dados ausentes e cobertura da pesquisa") may also need a small wording update if tags become a headline topic of the page — a one-line task, not a redesign.

### Pattern 4: "Versioned" methodology (FRAME-02 requirement)

**What:** The roadmap and REQUIREMENTS.md require the methodology page to be "updated and versioned." No versioning mechanism exists today (no version number/date is displayed on `/methodology`).

**When to use:** FRAME-02, and again at D-23 ("On methodology version change: re-review all pilot qualitative content").

**Recommendation:** The lightest mechanism consistent with the static-first, no-database constraint is a visible "last updated" / methodology-version marker in the MDX content itself (e.g., a line such as "Metodologia v1.1 — atualizada em 26/07/2026"), with the authoritative version number recorded in `docs/DECISIONS.md`. This avoids inventing a new versioning system, component, or data field — it is prose, matching this phase's documentation-only scope. Full "trigger re-review of all pilot content on version bump" tooling (D-23) is a Phase 13/16 process, not a Phase 12 artifact; Phase 12 only needs to establish that a version marker exists and what triggers incrementing it.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Recording a "why we decided X" trail | A new ADR tool/format | The existing `docs/DECISIONS.md` `Context/Decision/Alternatives/Consequences` format | Already established, already the single source of truth per `AGENTS.md`; a second decision-log format would fragment history |
| Explaining evidence tiers to families | A new UI component/widget on the methodology page | Plain MDX headings + bullets, matching the existing page | The existing page already explains a comparable concept (evidence statuses) successfully with zero components; this phase is text, not a redesign |
| Versioning the methodology content | A CMS, git-tag-based doc versioning system, or a database `version` table | A simple in-content version marker + `docs/DECISIONS.md` entry (see Pattern 4) | Static-first V1 constraint (`AGENTS.md`, `docs/DECISIONS.md` "Use Static-First Architecture") explicitly rules out new infrastructure for a docs-versioning need this small |

**Key insight:** every "don't hand-roll" risk in this phase is really "don't reach for tooling when prose and the existing docs format already solve the problem" — the temptation in a framework-writing phase is to over-engineer the *documentation itself* (schemas for schemas, versioning systems for versioning). Resist it; Phase 12's own deliverable is text.

## Pilot Candidate Analysis

> Supplements FRAME-03. This is a data-driven starting point for the planner/execution agent, built by reading every school currently in `src/content/schools/real/lichtenbergPrimarySchools/index.ts` and scoring it against D-16's five dimensions. Per D-15, final names must still be proposed during Phase 12 docs execution and reviewed in the Phase 12 PR — this table is evidence to support that decision, not a pre-made decision.

All 10 current Lichtenberg schools, with `researchStatus`, offers/specialization signal, and source count:

| School | `researchStatus` | Sources beyond portrait | Distinguishing signal | Candidate dimension(s) |
|--------|-------------------|--------------------------|------------------------|--------------------------|
| Richard-Wagner-Schule | `profile_ready` (detailed) | 4 (incl. official inspection page) | `musikbetontes Profil` + Hochbegabtenförderung | **Well-documented** + **distinctive specialization (music)** |
| Lew-Tolstoi-Schule | `profile_ready` (detailed) | 2 | Staatliche Europa-Schule Berlin (SESB) Deutsch-Russisch | **Bilingual/SESB** (strongest fit — officially SESB-labeled) |
| Adam-Ries-Schule | `profile_ready` (detailed) | 2 | bilingual Deutsch-Türkisch alphabetization + inclusion (Autismus Kleinklassen) | Bilingual (secondary fit, not SESB) + well-documented |
| Bernhard-Grzimek-Schule | `directory_only` | 0 | `mathematisch-naturwissenschaftliches Profil` (STEM) | **Low-documentation** + **distinctive specialization (STEM)** — satisfies two dimensions at once |
| Karlshorster Schule | `directory_only` | 0 | `gesundheitsbetontes Profil` (health focus) | Low-documentation; weaker specialization fit than STEM/music |
| Grundschule am Tränkegraben | `directory_only` | 0 | no `offers` listed at all | **Low-documentation** (very thin — no specialization signal beyond portrait) |
| Seepark-Grundschule | `directory_only` | 0 | no `offers`, no `ganztag` field at all | **Low-documentation** (thinnest record in the entire dataset) |
| Bürgermeister-Ziethen-Schule | `directory_only` | 0 | only `Umwelterziehung` | Low-documentation / **typical neighbourhood** |
| Friedrichsfelder Schule | `directory_only` | 0 | only generic `Schulanfangsphase` organizational notes | **Typical neighbourhood school** (no distinguishing offer) |
| Schmetterlings-Grundschule | `directory_only` | 0 | no `offers` listed | Low-documentation / typical neighbourhood |

**Suggested 4–5 school combination covering all five D-16 dimensions with minimal overlap-only-where-intentional:**

1. **Richard-Wagner-Schule** — well-documented anchor + music specialization (only school with an official inspection-report citation; strongest "what does a rich profile look like" reference point).
2. **Lew-Tolstoi-Schule** — bilingual/SESB (the only school with an official SESB designation in the current dataset).
3. **Bernhard-Grzimek-Schule** — low-documentation *and* distinctive specialization (STEM) in one school, directly pressure-testing Pitfall 3 (taxonomy-as-documentation-proxy) since it has zero non-portrait sources yet a clear specialization claim from the official portrait alone.
4. **Friedrichsfelder Schule** (or **Bürgermeister-Ziethen-Schule**) — typical neighbourhood school with no strong distinguishing offer, testing whether the taxonomy correctly produces a sparse-but-honest profile rather than forcing tags onto an unremarkable school.
5. *(Optional 5th slot)* **Grundschule am Tränkegraben** or **Seepark-Grundschule** — an even thinner low-documentation school than #3, if the planner wants two distinct low-documentation reference points (one with a specialization claim, one with none at all).

**D-19 (community-plausibility) note:** none of the current school records contain any community-source signal yet — that is expected, since community research only happens during Phase 14 content authoring, not Phase 12. This research cannot verify in advance which specific school has a *discoverable* independent community venue (Facebook group, forum, blog) without performing the actual Phase 14 research pass. **Recommendation:** name the D-19 candidate provisionally in the pilot-rationale doc (schools with an international/bilingual draw — Adam-Ries-Schule's Deutsch-Türkisch community or Lew-Tolstoi-Schule's Russian-speaking Europa-Schule community — are statistically more likely to have active, discoverable parent venues than a directory-only school with no distinguishing program), but explicitly document that the final community-source outcome (tag applied or fail-closed per D-11) is only known after Phase 14's actual search — and that a fail-closed outcome on the named D-19 school is itself a valid, successful result per D-19's own text ("If evidence still fails the threshold → fail closed... that outcome is successful validation").

## Common Pitfalls

These are the `.planning/research/PITFALLS.md` findings whose primary prevention phase is this one (Phase 12). Full detail, warning signs, and recovery costs are in that file — this section extracts the phase-actionable core.

### Pitfall 1: Soft ranking language re-enters through editorial prose
**What goes wrong:** Words like "muito procurada," "reputação forte," "uma das escolas mais bem vistas" pass review because they're not numeric scores, but carry the same "objectively better" implication the product bans.
**How to avoid:** `docs/EDITORIAL_GUIDE.md`'s "Claims" section needs an explicit banned/require-attribution word list (e.g. "procurada," "concorrida," "renomada," "reputação," "bem vista," "recomendada") — every such claim must be attributed to a named, dated source, framed as "o que alguém disse," never "o que é verdade."
**Warning signs:** A tag or phrase would still make sense with all citations deleted.

### Pitfall 2: Community-sourced reputation synthesis carries distinct legal exposure
**What goes wrong:** Even triangulated, hedged community-sentiment synthesis is a different legal risk category from raw third-party reviews (which V1 already excludes per `docs/DECISIONS.md`) — German case law (`spickmich.de`, OLG Köln 2007; OLG Karlsruhe 2008) distinguishes protected opinion (Meinungsäußerung) from disguised factual claims (Tatsachenbehauptung), and "selectively incomplete reporting" can itself be treated as an untrue factual claim.
**How to avoid:** Require attributed phrasing ("pais relatam...", never "a escola é..."), require the independence log (D-13) to double as an auditable triangulation trail, and extend the correction workflow explicitly to name editorial/reputation disputes as a distinct category.
**Confidence:** LOW-MEDIUM beyond the cited case law — see Assumptions Log A1. Flag for real legal review before Phase 14 publishes, not just at Phase 12 doc-writing.

### Pitfall 3: Tag taxonomy becomes a documentation-richness proxy, not what it claims to measure
**What goes wrong:** Well-documented schools accumulate tags regardless of actual fit; under-documented schools look "thin" even when equally suited — reproducing the selection-bias failure mode documented in peer-reviewed research on GreatSchools-style ratings (Angrist et al., NBER WP 29608).
**How to avoid:** Every tag needs a first-class `não confirmado`/missing state (never silent absence); the pilot must include a genuinely low-documentation school (see Pilot Candidate Analysis) specifically to prove the taxonomy holds up under thin evidence.
**Warning signs:** 100% tag coverage across the whole pilot set is itself a red flag, not a success metric.

### Pitfall 5: Pilot selection is itself an unexamined editorial decision
**What goes wrong:** Picking "whichever schools are easiest to research" quietly becomes the de facto generalization test, and the methodology only proves itself against easy cases.
**How to avoid:** Write selection criteria down *before* picking names (D-15–D-19 already do this); record, per pilot school, what source pool was available/consulted, not just the resulting profile.
**Warning signs:** Nobody can explain after the fact why these specific schools were chosen over others.

### Pitfall 6: Evidence/tag density gets read by parents as a quality signal
**What goes wrong:** A rich profile with 6 tags next to a sparse one with 1 tag and a "poucas informações disponíveis" note reads as a strength/weakness comparison, even though the real difference may just be "we found more sources."
**How to avoid:** Design the sparse-but-honest state as a first-class, complete-feeling pattern in the editorial voice guide, not a fallback; extend `docs/DECISIONS.md`'s existing "coverage ≠ quality" principle to explicitly name "qualitative richness ≠ quality" alongside it.
**Warning signs:** Internal reviewers instinctively say "this one seems better" when shown two pilot profiles side by side.

### Pitfall 7: Qualitative content goes stale faster than the fact-recheck cadence assumes
**What goes wrong:** `última pesquisa`/`última verificação das fontes` timestamps were designed for slow-moving official facts; a community-sourced characterization can go stale (new Schulleitung, aged-out forum thread) while those timestamps still read as "current."
**How to avoid:** D-20–D-23 already define the cadence (annual baseline + event triggers + community-specific ~12-month revalidation + version-bump full re-review) — Phase 12's job is to write this down as policy and specify the field semantics (`qualitativeLastReviewed`) precisely enough for Phase 13 to implement without re-deciding anything.
**Warning signs:** The methodology deliverable defines how to *create* a qualitative profile but not how or when to *re-review* one.

### Pitfall 8: Hedge loss in translation
**What goes wrong:** "einige Eltern berichten" (hedge: *some* parents) can drift into "pais relatam" (reads as near-universal) during translation-while-editorializing, silently reintroducing Pitfall 1/2 through a different door.
**How to avoid:** Add an explicit rule to `docs/EDITORIAL_GUIDE.md`: quantifier/hedge words in source material must be preserved with equivalent specificity in PT-BR; a second reviewer should re-check translated qualitative claims against the *original-language* source, not just the PT-BR draft.
**Warning signs:** PT-BR prose sounds more confident/definitive than the underlying source material when back-translated informally.

**Pitfall 4 (citation density) note:** its primary prevention phase is Pilot Profile (Phase 14), since it can only be diagnosed against real, multi-source prose. However, `.planning/research/PITFALLS.md` also names Phase 12 as the phase to make the *UI-pattern decision* before scaling past the pilot — so `docs/EDITORIAL_GUIDE.md` should state a preference now (consolidated per-section evidence notes over inline superscript citations on every clause of narrative) even though the first real test happens in Phase 14/15.

## Code Examples

Verified patterns from this codebase (all HIGH confidence — direct file reads, not external sources):

### Existing `docs/DECISIONS.md` entry format to replicate
```13:31:docs/DECISIONS.md
Each decision should use this format:

## YYYY-MM-DD: Decision title

### Context

What situation, constraint, or problem led to the decision?

### Decision

What was decided?

### Alternatives Considered

What other options were considered?

### Consequences

What tradeoffs, limitations, or follow-up work result from this decision?
```

### Existing methodology.mdx bullet-definition style to replicate
```5:15:src/content/guides/methodology.mdx
## Status de evidência

Estes são os rótulos que você vê nos cartões:

- **Verificado** — encontramos a informação em uma fonte oficial ou confiável e a conferimos.
- **Informação não encontrada** — pesquisamos, mas não localizamos essa informação nas fontes disponíveis.
```

### Existing methodology page route shell (only touch `metadata`/`GuideIntro` copy if truly needed)
```1:23:src/app/methodology/page.tsx
import MethodologyGuide from "@/content/guides/methodology.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Metodologia",
  description:
    "Como interpretamos evidências, dados ausentes e cobertura da pesquisa.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona nossa pesquisa"
        description="Entenda o que significam os status de evidência, a cobertura da pesquisa e os termos alemães que você vê nos cartões."
      />
      <MethodologyGuide />
    </main>
  );
}
```

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | German case law on teacher/school rating platforms (`spickmich.de`, OLG Köln 2007; OLG Karlsruhe 2008) reasonably extrapolates to this product's triangulated-community-tag editorial content | Common Pitfalls (Pitfall 2) | If the extrapolation doesn't hold, the correction-workflow/attribution rules Phase 12 writes may be insufficient or excessive; `.planning/research/PITFALLS.md` already flags this LOW confidence and recommends a real German-qualified legal review before Phase 14 publishes — Phase 12 should document that recommendation as a checkpoint, not resolve the legal question itself |
| A2 | Exact confidence-label wording and banned/attributed-phrase list (Claude's Discretion per CONTEXT.md) will satisfy ROADMAP success criterion 2 without further iteration | Architecture Patterns / Don't Hand-Roll | If wording is too permissive, Pitfall 1 (soft ranking language) can slip through in Phase 14 content; if too restrictive, it may block legitimate parent-centered phrasing. Low-cost to fix (copy edit) if caught during Phase 12 PR review |
| A3 | A simple in-content version marker + `docs/DECISIONS.md` entry satisfies FRAME-02's "versioned" requirement, without a dedicated versioning mechanism/component | Architecture Patterns (Pattern 4) | If reviewers expect a more formal versioning system (e.g., a visible version-history log), this may need a follow-up task; low cost to add since it's still prose, not code |
| A4 | The suggested pilot combination (Pilot Candidate Analysis) satisfies D-16's five dimensions and D-19's community-plausibility intent using only data already in the repository | Pilot Candidate Analysis | Community-venue discoverability specifically cannot be verified without doing the actual Phase 14 search; if the named D-19 candidate's community turns out to have no discoverable independent venues, D-19's own text treats that fail-closed outcome as a valid result, not a phase failure — but the planner should still note this is provisional, not verified |

## Open Questions

1. **Exact file for the pilot-selection rationale (FRAME-03)**
   - What we know: it must be recorded "in `docs/`" before tagging begins (ROADMAP success criterion 4); `docs/research/` already holds two precedent files (`SCHOOL_RESEARCH_WORKFLOW.md`, `REAL_SCHOOL_RESEARCH_SPIKE.md`) that mix process + evidence in a similar way.
   - What's unclear: whether it should be a new standalone file (e.g. `docs/research/PILOT_SELECTION.md`) or a new section inside an existing file (e.g. appended to `docs/RESEARCH.md` or `docs/DECISIONS.md`).
   - Recommendation: new standalone file under `docs/research/`, cross-linked from `docs/RESEARCH.md` and `docs/DECISIONS.md` (a decision entry can reference it) — keeps the four canonical docs from growing an unrelated "which schools did we pick" section, consistent with how `SCHOOL_RESEARCH_WORKFLOW.md` already lives alongside but separate from `docs/RESEARCH.md`. Final call is explicitly Claude's Discretion per CONTEXT.md.

2. **Where `qualitativeLastReviewed` semantics should be documented precisely**
   - What we know: D-22 says Phase 12 documents "the policy and required field semantics"; Phase 13 implements the schema. `docs/DATA_MODEL.md` already documents field-level semantics for the existing `research` object (status, coverageLevel, lastResearched, lastSourceChecked).
   - What's unclear: whether the new field's semantics belong in `docs/DATA_MODEL.md` (parallel to the existing `research` object docs) or in `docs/RESEARCH.md` (parallel to the existing "Research Status" section).
   - Recommendation: document the *policy and cadence* (when/why it changes) in `docs/RESEARCH.md` next to "Research Status," and document the *field shape* (name, type, where it lives on the school record) in `docs/DATA_MODEL.md` next to the existing `research` object fields — mirroring how those two docs already divide "policy" vs. "shape" for the factual model.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 + React Testing Library 16.3.2 (already configured) |
| Config file | `jest.config.mjs` |
| Quick run command | `pnpm test -- methodology` |
| Full suite command | `pnpm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FRAME-01 | `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, `docs/DECISIONS.md` contain the new source-hierarchy, taxonomy, and voice sections | manual-only (doc content review) | n/a — prose has no executable assertion surface; verified via human/PR review against ROADMAP success criteria 1–2 | n/a |
| FRAME-02 | `/methodology` page renders updated content explaining source tiers, tags vs. facts, and confidence labels | unit (RTL) | `pnpm test -- src/app/methodology/page.test.tsx` | ✅ exists — extend the existing `describe("MethodologyPage")` block with new assertions for whatever new headings/labels are added to the MDX (the existing test mocks the MDX import, so keep the mock and the real assertions in sync manually) |
| FRAME-03 | A written pilot-selection rationale document exists in `docs/` naming the 3–5 schools and including ≥1 lower-documentation school | manual-only (doc content review) | n/a — reviewer checks the named schools against the recorded criteria and this research's Pilot Candidate Analysis table | ❌ Wave 0 (new file) |
| FRAME-04 | A qualitative review cadence distinct from `research_status` recheck is documented | manual-only (doc content review) | n/a — reviewer checks `docs/RESEARCH.md` for the new cadence section | n/a |

### Sampling Rate
- **Per task commit:** `pnpm test -- methodology` (only if the methodology page/MDX was touched that commit)
- **Per wave merge:** `pnpm test` (full Jest suite, to catch any incidental regression in unrelated tests from the MDX content change)
- **Phase gate:** Full green `pnpm test` plus a manual checklist pass confirming all 5 ROADMAP success criteria are met in the actual doc files (this phase has no `pnpm validate:data` or e2e surface to gate on, since no school data or schema changes)

### Wave 0 Gaps
- [ ] No new test file is strictly required — the existing `src/app/methodology/page.test.tsx` can be extended in place once the actual new MDX headings/labels are finalized during planning.
- [ ] Optional: if the planner wants automated enforcement of Pitfall 1's banned-word list ahead of Phase 14 content authoring, a lightweight script/test that greps the *editorial guide itself* for the presence of the required banned-word list section could be added — but this is a nice-to-have, not required to satisfy FRAME-01–04, and risks over-scoping a docs-only phase into tooling work. Flag for planner discretion; do not treat as a hard requirement.

*(No e2e/Playwright coverage is needed for this phase — the methodology page already has Playwright smoke coverage from prior phases per `.planning/STATE.md`'s release-gate history, and this phase's content change doesn't add new interactive behavior.)*

## Security Domain

`security_enforcement` is absent from `.planning/config.json`, so treated as enabled — but this phase has no attack surface to evaluate.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this product (static-first, `docs/DECISIONS.md`) |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | No access-controlled resources |
| V5 Input Validation | No | This phase adds no user input, form, or schema field — pure static Markdown/MDX content |
| V6 Cryptography | No | Not applicable |

### Known Threat Patterns for this stack
None apply to this phase specifically. The only content-adjacent risk identified is legal/editorial (Pitfall 2, Assumption A1) — a reputational/defamation-law risk, not an ASVS-scoped application-security risk. It is addressed in Common Pitfalls and the Assumptions Log, not here.

## Sources

### Primary (HIGH confidence)
- Direct file reads: `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, `docs/DECISIONS.md`, `docs/PRODUCT.md`, `docs/COMPARISON.md`, `docs/INFORMATION_ARCHITECTURE.md`, `docs/research/SCHOOL_RESEARCH_WORKFLOW.md`, `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md`, `AGENTS.md`
- Direct file reads: `src/content/guides/methodology.mdx`, `src/app/methodology/page.tsx`, `src/app/methodology/page.test.tsx`, `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (full 10-school dataset), `src/features/guides/BerlinCallout/index.tsx`, `src/features/guides/GuideIntro/index.tsx`, `src/features/guides/GlossaryTerm/index.tsx`
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/PROJECT.md`, `.planning/config.json`, `.planning/phases/12-editorial-research-framework/12-CONTEXT.md`
- `package.json`, `jest.config.mjs` — dependency/version verification, no new packages needed

### Secondary (MEDIUM confidence)
- `.planning/research/SUMMARY.md` and `.planning/research/PITFALLS.md` — project-level research already produced for this milestone (HIGH confidence per their own metadata for stack/architecture, MEDIUM for legal/pitfalls); reused directly rather than re-researched, since re-deriving milestone-level findings inside a phase-level research pass would duplicate work already done to a higher standard than a single-phase pass could achieve

### Tertiary (LOW confidence)
- German case law extrapolation (Pitfall 2 / Assumption A1) — already flagged LOW-MEDIUM by `.planning/research/PITFALLS.md` itself; not independently re-verified in this phase-research pass, carried forward as-is with the same confidence caveat

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; verified directly against `package.json` and existing file patterns
- Architecture: HIGH — directly grounded in reading every file this phase will touch, plus the full real-school dataset for the pilot analysis
- Pitfalls: MEDIUM — inherited from `.planning/research/PITFALLS.md`'s own confidence rating (German media-law extrapolation is the only LOW-confidence sub-claim, explicitly flagged)

**Research date:** 2026-07-26
**Valid until:** No expiry pressure — this phase touches static docs/content with no external API or fast-moving dependency; findings remain valid until the underlying `docs/` files or school dataset change materially (e.g., before Phase 13 planning begins, re-check that no new schools were added to `lichtenbergPrimarySchools` that would change the Pilot Candidate Analysis)
