# Phase 12: Editorial & Research Framework - Pattern Map

**Mapped:** 2026-07-26
**Files analyzed:** 8 (7 modified, 1 new)
**Analogs found:** 8 / 8

This phase is documentation-only (per `AGENTS.md` and `12-RESEARCH.md`'s Architectural Responsibility Map). There is no controller/service/component code to write — every "file" here is a Markdown/MDX document or its existing route/test shell. Roles and data-flow labels below are adapted accordingly (`documentation` in place of `service`/`controller`; `additive-section-edit` in place of `CRUD`/`request-response` for docs, since every edit is an append, never a rewrite of existing prose).

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|-----------------|----------------|
| `docs/RESEARCH.md` | documentation (policy) | additive-section-edit | itself (existing `## Source Hierarchy`, `## Reliability Levels`, `## Research Status` sections) | exact |
| `docs/EDITORIAL_GUIDE.md` | documentation (policy/voice) | additive-section-edit | itself (existing `## Claims`, `## Parent-Centered Writing` sections) | exact |
| `docs/DATA_MODEL.md` | documentation (schema-shape, prose only) | additive-section-edit | itself (existing `## Field Evidence`, `## Evidence Coverage Calculation` sections) | exact |
| `docs/DECISIONS.md` | documentation (ADR log) | append-only, fixed-template | itself (existing 11 dated `## YYYY-MM-DD: ...` entries) | exact |
| `docs/research/PILOT_SELECTION.md` (new) | documentation (process + evidence record) | new-file, structured-narrative | `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` + `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` | role-match (precedent pair for a new `docs/research/` file) |
| `src/content/guides/methodology.mdx` | content (MDX guide, request-response via static export) | additive-section-edit | itself (existing `## Status de evidência`, `## Cobertura da pesquisa` sections) | exact |
| `src/app/methodology/page.tsx` | route shell (Next.js App Router page) | request-response (static) | itself (only `metadata.description` / `GuideIntro` copy touched, no structural change) | exact |
| `src/app/methodology/page.test.tsx` | test (RTL) | request-response (unit test) | itself (existing `describe("MethodologyPage")` block) | exact |

All eight files are edited/created in place — there is no cross-domain "borrow a controller pattern from a service" situation here. The real pattern-matching work in this phase is **matching each new prose section to the exact heading level, list style, and template already used in that same file**, not borrowing from a different file's structure.

## Pattern Assignments

### `docs/RESEARCH.md` (documentation, additive-section-edit)

**Analog:** itself — `## Source Hierarchy`, `## Reliability Levels`, `## Canonical Source Types`, `## Research Status` sections

**Section style to copy** (lines 9–19, numbered source-hierarchy list + one-line reserved-tier note):
```9:19:docs/RESEARCH.md
## Source Hierarchy

Sources should be evaluated in this order:

1. Official Berlin Senate, district, or public education sources.
2. Official school inspection or quality reports.
3. Individual school websites.
4. Public statistical datasets.
5. Parent reviews, forums, Google ratings, and social media.

Anecdotal parent signals are reserved in the data model but should not be displayed in V1.
```

**Reliability-level list style to copy** (lines 31–38):
```31:38:docs/RESEARCH.md
## Reliability Levels

Reliability levels should reflect source authority, not whether the information is favorable to a school:

- `primary`: official government, district, inspection, or public education source.
- `secondary`: school-published information or reliable public dataset.
- `anecdotal`: subjective parent or community signal. Reserved in the data model but not displayed in V1.
- `unknown`: source reliability has not yet been classified.
```

**Enum-style status list to copy** (lines 77–85, same shape needed for a future qualitative-cadence status if one is introduced):
```77:85:docs/RESEARCH.md
## Research Status

A school may have one of these statuses:

- `directory_only`: basic directory data only;
- `in_research`: detailed research started but incomplete;
- `profile_ready`: detailed profile meets the minimum publication standard;
- `needs_review`: published or draft data needs source rechecking;
- `blocked`: research cannot proceed because key sources are unavailable or contradictory.
```

**What to add (per FRAME-01/FRAME-04, D-08–D-14, D-20–D-23):**
- A new `journalism` tier inserted into the existing numbered Source Hierarchy list (do not renumber/rewrite tiers 1–4's wording — insert and adjust only the trailing numbers) and a new `canonical_source_types` entry (parallel to `official_government`, `official_inspection`, `school_website`, `public_dataset`) for journalism, plus a distinct **triangulated community** entry that is explicitly *not* `anecdotal_reserved` (that stays reserved per `12-RESEARCH.md`'s Pattern 1 note — Phase 13/`TAG-02` adds the new displayable type).
- A new `## Community Source Independence` (or similarly named) section using the same flat bullet-list style as `## Reliability Levels`, covering D-08 (different publisher/origin), D-09 (echoes don't count, with the same concrete examples), D-10 (acceptable-independence examples), D-11 (fail-closed on conflict), D-12 (minimum source quality), D-13 (independence log fields), D-14 (~24 month recency).
- A new `## Qualitative Review Cadence` section (placed near `## Research Status`, mirroring its plain-prose-then-bullet-list shape) covering D-20 (hybrid periodic + event-driven), D-21 (annual baseline, ~12-month community revalidation), D-22 (policy note that `qualitativeLastReviewed` is distinct from `research_status`/`lastResearched`, cross-referencing `docs/DATA_MODEL.md` for the field shape), D-23 (full re-review on methodology version bump).

**Cross-reference convention already in use** (imitate this, do not invent a new citation style): `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` links back to RESEARCH.md as `[docs/RESEARCH.md](../RESEARCH.md)` — use the same relative-Markdown-link style when RESEARCH.md needs to point at the new `docs/research/PILOT_SELECTION.md` file or at `docs/DATA_MODEL.md`.

---

### `docs/EDITORIAL_GUIDE.md` (documentation, additive-section-edit)

**Analog:** itself — `## Claims`, `## Parent-Centered Writing`, `## Language` sections

**Claims-section style to copy** (lines 35–41, short declarative "do not" rules):
```35:41:docs/EDITORIAL_GUIDE.md
## Claims

Do not make factual claims without citations.

Do not imply school quality from incomplete evidence.

Do not describe a school as "good," "bad," "best," or "recommended" unless the claim is attributed and clearly contextualized.
```

**Term-glossary bullet style to copy** (lines 9–17, for any new German/taxonomy term needing a one-line PT-BR gloss):
```9:17:docs/EDITORIAL_GUIDE.md
Examples:

- Grundschule: escola primária alemã.
- Einzugsgebiet: área de residência normalmente vinculada a uma escola pública.
- Ganztag: modelo de escola em tempo integral ou com atividades ao longo do dia.
```

**What to add (per FRAME-01, D-04–D-07, Pitfalls 1/2/6/8, "Claude's Discretion" banned-word list):**
- Extend `## Claims` (or add a new `## Tag Taxonomy Voice` section directly after it) with the exact `docs/DECISIONS.md`-referenced banned/attributed-reputation phrase list from Pitfall 1 (e.g. "procurada," "concorrida," "renomada," "reputação," "bem vista," "recomendada") — every such claim requires attribution to a named, dated source, framed as "o que alguém disse," never "o que é verdade." Use the same short declarative "Do not ..." sentence pattern already used in `## Claims`.
- A new section for D-05/D-07's fact-vs-tag philosophy ("facts answer 'what does it have', tags answer 'what kind of school is this'") — this is the phase's stated product differentiator (see CONTEXT.md `<specifics>`) and should get its own short prose paragraph, not just a bullet.
- A new rule for D-04 (`active-school-community` never implies "better") and D-06 (community evidence only for that one tag, official corroboration preferred) — same short-sentence style as `## Claims`.
- A hedge-preservation rule (Pitfall 8): quantifier/hedge words in source material ("einige Eltern," "alguns pais") must be preserved with equivalent specificity in PT-BR translation — add near `## Citations In Prose` since it's a translation-fidelity rule, not a tone rule.
- A citation-density preference (Pitfall 4 / RESEARCH.md Pattern note): state a preference for consolidated per-section evidence notes over inline superscript citations on every clause of narrative prose — extend `## Citations In Prose` (lines 86–88) rather than creating a new section, since it already covers "citations should be visible near factual claims."
- Extend `## Parent-Centered Writing` (lines 43–59) with a parallel "Perfil da escola" narrative-voice subsection, following the exact same "Instead of only stating X, explain/help families understand Y" bullet pattern already used twice in that section (lines 47–52, 54–59).

---

### `docs/DATA_MODEL.md` (documentation, prose schema-shape, additive-section-edit)

**Analog:** itself — `## Field Evidence`, `## Evidence Coverage Calculation`, `## Anecdotal Signals` sections

**Field-list bullet style to copy** (lines 76–91, source-entry field enumeration):
```76:91:docs/DATA_MODEL.md
## Field Evidence

Each factual field should support multiple source entries.

A source entry should include:

- source title;
- source URL;
- source type;
- publisher or institution;
- date accessed;
- date published, when available;
- reliability level;
- notes, when useful.

Source types and reliability levels are defined in `docs/RESEARCH.md`.
```

**Enum-style field-status list to copy** (lines 139–148, exactly the shape a new `qualitative` status enum or `qualitativeLastReviewed` field doc should follow):
```139:148:docs/DATA_MODEL.md
### Field Evidence Statuses

Factual fields should use one of these statuses:

- `verified`: the field has a non-null value, at least one acceptable citation, and no unresolved material conflict;
- `missing`: the information was not found during research;
- `unverified`: a value exists but has no acceptable supporting source;
- `outdated`: the value exists but needs source rechecking;
- `conflicting`: sources materially disagree and the conflict must be explained;
- `not_applicable`: the field does not apply and is excluded from evidence coverage.
```

**"Reserved but not displayed" precedent to copy exactly** (lines 150–154, model for how the doc already handles a "documented now, implemented/enforced later" field — same shape needed for `qualitativeLastReviewed` since Phase 12 documents semantics but Phase 13 implements the schema):
```150:154:docs/DATA_MODEL.md
## Anecdotal Signals

The data model may reserve space for anecdotal parent signals, but these should not be displayed in V1.

No third-party review scraping should be implemented in V1.
```

**What to add (per FRAME-01/FRAME-04, D-01–D-03, D-22):**
- A new `## Tag Taxonomy` section (doc-only, no code): the closed category/tag-ID shape from D-01/D-02 — 4 categories, 1–3 tags each, list every tag ID exactly as named in CONTEXT.md (`stem-focus`, `languages-focus`, `arts-music-focus`, `bilingual-program`, `special-pedagogical-model`, `all-day-model`, `inclusion-support`, `transition-support`, `structured-learning-environment`, `active-school-community`). Use the same "field should include: - bullet; - bullet;" enumeration style as `## Field Evidence`, grouped by category heading (`###`) matching how `## Minimum School Fields` groups.
- A new `## Qualitative Review Tracking` (or similar) section documenting `qualitativeLastReviewed` field semantics (name, meaning, how it differs from `lastResearched`/`lastSourceChecked`) — mirror the "Anecdotal Signals" precedent's tone of "policy is documented now; implementation is a later phase," and explicitly cross-reference `docs/RESEARCH.md`'s new cadence section (per Open Question 2's recommendation: policy/cadence lives in RESEARCH.md, field shape lives here).

---

### `docs/DECISIONS.md` (documentation, ADR log, append-only fixed-template)

**Analog:** itself — the fixed `Context/Decision/Alternatives Considered/Consequences` template and its 11 existing dated entries

**Exact template to copy** (lines 13–31, this is a literal fill-in-the-blanks template already used by every entry in the file):
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

**Closest real entry to model tone/length on** (lines 94–113, an entry that — like this phase's decisions — extends an existing product principle without introducing new infrastructure):
```94:113:docs/DECISIONS.md
## 2026-07-10: Evidence Coverage Measures Research Completeness

### Context

Families need to know how much information has been verified for each school. This should not be confused with school quality.

### Decision

Evidence coverage will be represented as the percentage of important fields with verified information.

### Alternatives Considered

- No evidence completeness metric.
- Letter grades.
- Quality scores.
- Editorial confidence labels only.

### Consequences

The site can show research completeness transparently. It must clearly explain that evidence coverage is not a judgment about whether a school is good.
```

**What to add (per RESEARCH.md Pattern 2, four new dated entries, appended after the existing 2026-07-10 entries, dated 2026-07-26):**
1. Tag taxonomy v1 shape + community-evidence-only-for-`active-school-community` rule (D-01–D-07).
2. Source hierarchy extension: journalism tier + triangulated-community tier, independence definition (D-08–D-14).
3. "Qualitative richness ≠ quality" as an explicit extension of the existing "Evidence Coverage Measures Research Completeness" entry (lines 94–113 above) — the new entry's `### Context` should reference that prior decision by name, matching how this repo cross-links related decisions in prose (see `## 2026-07-10: Version V1 Evidence Coverage Fields`, lines 236–254, which explicitly extends the same earlier decision).
4. Qualitative review cadence as distinct from `research_status` recheck (D-20–D-23).

Each entry's `### Alternatives Considered` should list genuinely-considered rejected options already named in CONTEXT.md/RESEARCH.md (e.g. for taxonomy: "flat tag list without categories," "including `High demand`," "allowing community evidence for all tags") — do not invent alternatives not grounded in CONTEXT.md.

---

### `docs/research/PILOT_SELECTION.md` (new file — documentation, structured-narrative)

**Analog:** `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` (procedural checklist pattern) + `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` (evidence-record pattern) — this new file's job is close to a hybrid of both: written criteria (procedural, like WORKFLOW) plus a named evidence table justifying the choices (evidence record, like SPIKE).

**Header/prerequisites-table pattern to copy** (lines 1–18 of `SCHOOL_RESEARCH_WORKFLOW.md`, establishes audience + prerequisite-doc table + policy-authority note — reuse this exact shape so the new file plugs into the same doc network):
```1:18:docs/research/SCHOOL_RESEARCH_WORKFLOW.md
# School Research Workflow

Executable step-by-step checklist for researching Berlin primary schools and recording evidence-backed data in the Berlin School Guide codebase.

**Audience:** Human researchers and AI sessions. Follow this document as a procedural checklist — do not re-derive Phase 1 evidence rules from scratch. Policy definitions live in linked canonical docs.

## Prerequisites

Read these before starting research on a new or existing school record:

| Document | Purpose |
| -------- | ------- |
| [docs/RESEARCH.md](../RESEARCH.md) | Source hierarchy, citation philosophy, research statuses, conflict rules |
| [docs/DATA_MODEL.md](../DATA_MODEL.md) | Coverage levels, field evidence structure, minimum fields |
| [REAL_SCHOOL_RESEARCH_SPIKE.md](./REAL_SCHOOL_RESEARCH_SPIKE.md) | Lichtenberg baseline sources, portrait field patterns, field difficulty notes |
| Phase 1 code artifacts | `inferredFrom()` helper, coverage v2 denominators, `pnpm validate:data` gate |

**Policy authority:** When this workflow and [docs/RESEARCH.md](../RESEARCH.md) appear to conflict, RESEARCH.md wins. This document describes *how* to apply policy, not *what* the policy is.
```

**Date-stamped purpose-statement pattern to copy** (lines 1–9 of `REAL_SCHOOL_RESEARCH_SPIKE.md` — use for the pilot rationale's own "why this document exists" framing):
```1:9:docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md
# Real School Research Spike

Date checked: 2026-07-10

## Purpose

This spike tests whether Berlin School Guide can use real Berlin school data and produce useful, evidence-backed school records before implementing the full M5 detailed profile experience.

It focuses on public primary schools in Lichtenberg, especially Friedrichsfelde, Karlshorst, and nearby areas relevant to the project owner.
```

**What to add (per FRAME-03, D-15–D-19, the full Pilot Candidate Analysis table already computed in `12-RESEARCH.md`):**
- A `# Pilot Selection` header with a dated "Selected:" line (mirroring `REAL_SCHOOL_RESEARCH_SPIKE.md`'s `Date checked:` line).
- A `## Criteria` section restating D-16's five diversity dimensions as coverage targets (not 1:1 seats) and D-17's objective (validate methodology across evidence conditions, not showcase best schools) — plain bullet list, same style as other docs.
- A `## Selected Schools` section naming the final 3–5 schools (finalize from the candidate table already in `12-RESEARCH.md`'s "Pilot Candidate Analysis" section, which scored all 10 real Lichtenberg schools against D-16/D-18/D-19 using `researchStatus` and `offers` from `src/content/schools/real/lichtenbergPrimarySchools/index.ts`), with a short per-school rationale row explaining which dimension(s) each school satisfies — reuse the Markdown-table style already used in `12-RESEARCH.md`.
- A `## Community-Evidence Candidate (D-19)` note naming the provisional D-19 school and stating explicitly that a fail-closed outcome (no independent venue found in Phase 14) is a valid, successful result — not a phase failure.
- Cross-links back to `docs/RESEARCH.md` (independence rule) and `docs/DECISIONS.md` (the taxonomy/pilot decision entries), using the same relative-link syntax as `SCHOOL_RESEARCH_WORKFLOW.md`'s Prerequisites table.

---

### `src/content/guides/methodology.mdx` (content, additive-section-edit)

**Analog:** itself — `## Status de evidência`, `## Cobertura da pesquisa` sections (plain MDX, H2 + bullet-definition list, no imported components)

**Bullet-definition style to copy exactly** (lines 5–15 — bold term, em-dash, one-sentence explanation; this is the mandatory template for any new "confidence label" or "tag vs. fact" definitions):
```5:15:src/content/guides/methodology.mdx
## Status de evidência

Estes são os rótulos que você vê nos cartões:

- **Verificado** — encontramos a informação em uma fonte oficial ou confiável e a conferimos.
- **Informação não encontrada** — pesquisamos, mas não localizamos essa informação nas fontes disponíveis.
- **Informação inferida, não confirmada** — deduzimos a partir de outro dado (por exemplo, cuidado no contraturno a partir do modelo Ganztag), mas ainda não confirmamos diretamente.
```

**Metric-with-caveat paragraph style to copy** (lines 17–24 — states a number, then immediately clarifies what it does *not* mean; use this exact rhetorical move for "confidence = evidence strength, not quality" and "absence of a tag ≠ negative"):
```17:24:src/content/guides/methodology.mdx
## Cobertura da pesquisa

Medimos a completude da nossa pesquisa em dois níveis:

- **Pesquisa básica** — campos do retrato oficial da escola no diretório do Senado de Berlim (11 campos neste nível).
- **Pesquisa detalhada** — conjunto ampliado com informações adicionais de site da escola, inspeção e outras fontes (23 campos neste nível).

A porcentagem de cobertura mede quantos campos verificamos naquele nível — por exemplo, "Pesquisa básica · 64%" significa que confirmamos 64% dos campos do retrato oficial. **Essa porcentagem indica completude da nossa pesquisa, não qualidade da escola.**
```

**German-term glossary style to copy** (lines 26–34 — bold term, em-dash, PT-BR gloss; reuse if any new taxonomy term needs a one-line definition, e.g. "fonte triangulada"):
```26:34:src/content/guides/methodology.mdx
## Termos em alemão

Alguns termos aparecem nos cartões em alemão. Significados em português:

- **Ganztag** — modelo de escola em tempo integral ou com atividades ao longo do dia.
- **Hort** — cuidado ou atividades supervisionadas após o horário regular de aula.
- **Willkommensklasse** — turma de acolhimento para crianças recém-chegadas que ainda não falam alemão fluentemente.
```

**What to add (per FRAME-02, Claude's Discretion on depth, RESEARCH.md Pattern 3/4):**
- A new `## Fatos e categorias` (or similarly named) section explaining facts-vs-tags (D-07's "o que a escola tem" vs. "que tipo de escola é") in family-facing PT-BR, same bullet-definition style as `## Status de evidência`.
- A new section (or extension of `## Status de evidência`) listing tag/qualitative confidence labels, explicitly stating confidence reflects evidence strength, not school quality — reuse the exact "metric-with-caveat" bolded closing-sentence move from `## Cobertura da pesquisa` line 24 (`**Essa porcentagem indica ... não qualidade da escola.**`) for the parallel "ausência de uma categoria não é um sinal negativo" statement (FRAME-02 requirement, D-11).
- A version marker per RESEARCH.md Pattern 4 (e.g. a short line such as "Metodologia vX — atualizada em DD/MM/AAAA") — place it near the top or bottom matching the document's plain-prose tone; the authoritative version number itself belongs in the corresponding `docs/DECISIONS.md` entry, not invented ad hoc in the MDX.

---

### `src/app/methodology/page.tsx` (route shell, request-response/static)

**Analog:** itself — current full file, only the `metadata.description` string and/or `GuideIntro` `description` prop may need a small wording touch-up if tags become a headline topic; the component structure itself should not change.

**Current shell to preserve unchanged in structure** (whole file, 23 lines):
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

**What to change (optional, per RESEARCH.md's own note — "a one-line task, not a redesign"):** only touch the `metadata.description` string and/or the `GuideIntro description` prop text if the new tag/category content genuinely needs a headline mention; do not add new components, new props, or restructure the `<main>` layout.

---

### `src/app/methodology/page.test.tsx` (test, RTL, request-response)

**Analog:** itself — existing `describe("MethodologyPage")` block; the MDX import is mocked, so new assertions must target whatever literal PT-BR strings the mock is updated to render, not the real MDX content.

**Existing test + mock pattern to extend exactly** (full file, 24 lines):
```1:23:src/app/methodology/page.test.tsx
import { render, screen } from "@testing-library/react";

jest.mock("@/content/guides/methodology.mdx", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="methodology-mdx">
      <p>Verificado</p>
    </div>
  ),
}));

import MethodologyPage from "./page";

describe("MethodologyPage", () => {
  it("renders the methodology heading and evidence status labels", () => {
    render(<MethodologyPage />);

    expect(
      screen.getByRole("heading", { name: /como funciona nossa pesquisa/i }),
    ).toBeVisible();
    expect(screen.getByText("Verificado")).toBeVisible();
  });
});
```

**What to change (per RESEARCH.md's Phase Requirements → Test Map for FRAME-02):** if new headings/labels are added to the real MDX (e.g. a new tags-vs-facts heading or an "ausência não é negativa" label), add the corresponding literal string to the `jest.mock` factory's rendered `<div>` and add a matching `expect(screen.getByText(...))` assertion in the same `it` block or a new sibling `it`. Keep the mock and the real MDX content in sync manually — this file does not render the actual MDX.

## Shared Patterns

### Additive-only editing (never rewrite existing prose)
**Source:** `12-RESEARCH.md` Pattern 1; observed directly across all four `docs/*.md` files (every file is a flat sequence of independent `##` sections with no cross-section coupling).
**Apply to:** `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, `src/content/guides/methodology.mdx`.
All new content must be new `##` sections inserted near related existing sections. Never edit the wording of an existing section (e.g. don't touch the existing 5-tier Source Hierarchy numbering beyond inserting new tiers, don't reword `## Claims`'s existing three sentences).

### Fixed-template ADR entries
**Source:** `docs/DECISIONS.md` lines 13–31 (the file's own literal template block).
**Apply to:** all four new `docs/DECISIONS.md` entries this phase adds.
Every new entry must use exactly `## YYYY-MM-DD: Decision title` → `### Context` → `### Decision` → `### Alternatives Considered` → `### Consequences`, dated `2026-07-26` (or the actual execution date), appended after the last existing entry (currently `## 2026-07-10: Use tsx For Static Data Validation`).

### Bullet-definition style for family-facing labels
**Source:** `src/content/guides/methodology.mdx` lines 9–15, 30–34 (`- **Term** — one-sentence PT-BR explanation.`).
**Apply to:** any new confidence-label, tag-category, or German-term definitions added to `methodology.mdx`.
Do not introduce a table, a new component, or a different list marker style for these definitions — the existing page uses this single pattern for every defined term.

### PT-BR user-facing / English technical naming split
**Source:** `docs/DECISIONS.md` "2026-07-10: Use English Technical Naming" (lines 207–234); `AGENTS.md` Repository Conventions.
**Apply to:** every tag ID mentioned in any doc (`stem-focus`, `bilingual-program`, etc. stay lowercase-kebab-case English identifiers) versus every family-facing label/heading (must be Brazilian Portuguese, e.g. "Foco em STEM" as the *display* label for `stem-focus` if a display label is introduced in these docs).

### Cross-referencing via relative Markdown links
**Source:** `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` lines 13–15 (`[docs/RESEARCH.md](../RESEARCH.md)`).
**Apply to:** `docs/research/PILOT_SELECTION.md` (new file) linking back to `docs/RESEARCH.md`/`docs/DECISIONS.md`, and any new `docs/RESEARCH.md` section that needs to point at `docs/DATA_MODEL.md` or the new pilot file.

### "Policy now, schema/implementation later" framing
**Source:** `docs/DATA_MODEL.md` lines 150–154 (`## Anecdotal Signals` — "reserved... but should not be displayed in V1"); D-22 in CONTEXT.md.
**Apply to:** the new `qualitativeLastReviewed` field-semantics section in `docs/DATA_MODEL.md` and the community-tier/triangulated-source addition in `docs/RESEARCH.md` — both must state clearly that Phase 12 documents the rule/shape and Phase 13 implements the schema/validator, exactly as the existing Anecdotal Signals section separates "reserved in the model" from "not yet implemented for display."

## No Analog Found

None. Every file in this phase either already exists (7 files, edited in place) or has a close structural precedent pair already in the repository (`docs/research/PILOT_SELECTION.md` ← `SCHOOL_RESEARCH_WORKFLOW.md` + `REAL_SCHOOL_RESEARCH_SPIKE.md`).

## Metadata

**Analog search scope:** `docs/`, `docs/research/`, `src/content/guides/`, `src/app/methodology/`
**Files scanned:** `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, `docs/DECISIONS.md`, `docs/research/SCHOOL_RESEARCH_WORKFLOW.md`, `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md`, `src/content/guides/methodology.mdx`, `src/app/methodology/page.tsx`, `src/app/methodology/page.test.tsx`, `AGENTS.md`
**Pattern extraction date:** 2026-07-26
