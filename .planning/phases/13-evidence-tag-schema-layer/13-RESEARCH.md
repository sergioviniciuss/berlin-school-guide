# Phase 13: Evidence & Tag Schema Layer - Research

**Researched:** 2026-07-29
**Domain:** Zod school/evidence schema — tags, source types, triangulation validators, PT-BR format helpers
**Confidence:** HIGH

## Summary

Phase 13 encodes Phase 12’s editorial rules into the existing static Zod pipeline (`schoolSchema` → `pnpm validate:data`) so structured tags, journalism / triangulated-community sources, independence logs, confidence labels, and `qualitativeLastReviewed` are representable and rejectable **before** any pilot content is authored. The codebase already has the right extension points: orthogonal `sourceType` / `reliability` enums, school-level `sources[]` + citation-by-`sourceId`, `validateFieldCitations` + `superRefine`, colocated Jest fixtures, and `formatSourceType`’s hide-reserved pattern. No new npm packages are required.

The critical work is additive schema + hard validators (not UI): factual verification must switch from reliability-only to an **allowlist** of `(reliability ∈ {primary,secondary}) ∧ (sourceType ∈ approved factual set)`; `active-school-community` must enforce ≥2 `triangulated_community` citations (each with independence log) **and** ≥1 non-community allowlisted type; all other tags must reject community citations; confidence must be a closed evidence-strength enum with citation-consistency checks; empty/omitted tags must keep all 10 real schools green without placeholder dates.

**Primary recommendation:** Extend existing evidence/school Zod units (no parallel citation system); add `validateTagEvidence` mirrored on `validateFieldCitations`; ship format helpers + `docs/RESEARCH.md` reliability drift fix in the same phase; leave real school records untagged.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Reliability vs source-type shape
- **D-01:** Keep **orthogonal axes**: `sourceType` = what kind of source; `reliability` = how much authority for **factual** verification.
- **D-02:** Add `journalism` and `triangulated_community` to `sourceTypeSchema` only. Do **not** add `triangulated_community` as a reliability enum value.
- **D-03:** Keep `reliabilityLevelSchema` as `primary | secondary | anecdotal | unknown`.
- **D-04:** Suggested default mapping when authoring sources: official / authoritative datasets → usually `primary`; `journalism` → usually `secondary`; `triangulated_community` → `anecdotal`; `anecdotal_reserved` → `anecdotal`.
- **D-05:** Harden factual verification with an **allowlist**, not exclusion-only. Conceptually: `isAcceptableFactualEvidence(source)` requires acceptable reliability (`primary` | `secondary`) **and** an explicitly approved factual `sourceType` set (must include existing official/website/dataset types + `journalism`; must **exclude** `triangulated_community` and `anecdotal_reserved`). Prefer allowlist so new source types do not accidentally become factual evidence.
- **D-06:** Correct Phase 12 docs (`docs/RESEARCH.md` Reliability Levels section and any mirrors): `triangulated_community` is a **source type**, not a reliability level. Reliability ladder stays the four values above.

#### “Never sole basis” for `active-school-community`
- **D-07:** Hard schema rule (not soft editorial policy): `active-school-community` is valid only when citations include **≥2 independent `triangulated_community` sources** (each with independence log) **and ≥1** citation from an allowlisted **non-community** type (`official_government` | `official_inspection` | `school_website` | `public_dataset` | `journalism`).
- **D-08:** Community-only tags must be **rejected** by `validateTagEvidence` / school `superRefine`. Matches methodology “nunca sozinha” and TAG-03.
- **D-09:** All other v1 tags remain official and/or journalism only (no community citations) — carry forward Phase 12 D-06.

#### Independence log attachment
- **D-10:** Independence log attaches **on each community citation** (nested on the citation when the cited source is `triangulated_community`), not as a single tag-level blob and not as intrinsic fields on the `Source` record alone.
- **D-11:** Log fields remain the Phase 12 D-13 minimal set: venue/publisher, URL or stable identifier, date accessed, one-line independence rationale vs other source(s), echo-check note. Exact Zod property names are Claude’s discretion if they stay 1:1 with those semantics.
- **D-12:** Reuse school-level `sources[]` + citation-by-`sourceId` pattern (extend citation shape for community cites); do not invent a parallel citation system.

#### `qualitativeLastReviewed` requirement
- **D-13:** School-level field, strict ISO **`YYYY-MM-DD`** (not a full timestamp).
- **D-14:** **Required iff any qualitative content exists**: tags omitted or empty → field optional; tags non-empty → field required. When narrative/editorial fields are added in later phases, any qualitative content triggers the same requirement.
- **D-15:** Non-pilot / untouched schools must keep passing `validate:data` without placeholder dates (VAL-01).

#### Confidence label IDs
- **D-16:** Closed enum: `confirmed_multi_source` | `confirmed_official` | `partial`.
- **D-17:** PT-BR map (must match `/methodology`):  
  - `confirmed_multi_source` → “Confirmado por múltiplas fontes”  
  - `confirmed_official` → “Confirmado por fonte oficial”  
  - `partial` → “Evidência parcial”
- **D-18:** `confirmed_official` remains valid when the qualifying source is a school website — family-facing “fonte oficial” is the broader concept already published.
- **D-19:** Do **not** use high/medium/low (misreadable as school-quality ratings).
- **D-20:** Validators must enforce **confidence ↔ citation consistency** (e.g. `confirmed_official` requires ≥1 qualifying official/school-website-class source; `confirmed_multi_source` requires evidence from more than one qualifying independent source). Exact “qualifying” predicates are Claude’s discretion within these rules and Phase 12 taxonomy evidence rules.

#### Display labels this phase
- **D-21:** Ship **schema + format helpers now**: extend `formatSourceType` for `journalism` and `triangulated_community`; add confidence (and tag-id) format helpers so tests/docs lock the same strings Phase 15 will render. Profile UI chips remain Phase 15.
- **D-22:** `anecdotal_reserved` continues to be non-displayable (existing null/hide pattern).

#### Carried forward from Phase 12 (do not reopen)
- Closed 10-tag / 4-category taxonomy IDs; community evidence only for `active-school-community`; independence definition; fail-closed on conflict; tag ≠ automatic from factual fields; `qualitativeLastReviewed` separate from factual `research_*` cadence.

### Claude's Discretion
- Exact Zod field names for independence-log properties and tag object shape (`id` vs `taxonomyId`, citation array name, etc.) — must satisfy D-10–D-12 and TAG-01–04.
- Exact factual `sourceType` allowlist membership beyond the required inclusions/exclusions in D-05.
- Exact predicates for confidence↔citation consistency (D-20) and for “independent” checks that are machine-enforceable vs research-notes-only.
- Exact PT-BR strings for per-tag taxonomy labels in format helpers (must stay non-superlative / anti-ranking; align with methodology where a family name already exists, e.g. community tag).
- Directory layout under `src/features/` (`tag/`, `tagTaxonomy/`, etc.) following existing colocated Zod patterns.
- Whether doc correction (D-06) is a dedicated plan task vs bundled with sourceType enum work — must ship in this phase.

### Deferred Ideas (OUT OF SCOPE)
- Profile UI rendering of tags/confidence chips and Fontes merge — Phase 15
- Authoring tags / “Perfil da escola” on the named pilot schools — Phase 14
- Expanding community evidence to tags beyond `active-school-community` — post-pilot / taxonomy v2
- Softening never-sole-basis or community-only-with-partial confidence — explicitly rejected for v1 schema
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TAG-01 | School records support structured tags with per-tag citations and evidence status | Optional `tags[]` on `schoolSchema`; each tag = closed taxonomy id + confidence + ≥1 citation-by-`sourceId`; `qualitativeLastReviewed` gated by non-empty tags |
| TAG-02 | Source model supports `journalism` and displayable triangulated-community tier (distinct from hidden reserved anecdotal) | Extend `sourceTypeSchema` only; keep reliability four-value; extend `formatSourceType` (null for `anecdotal_reserved`) |
| TAG-03 | Community evidence requires ≥2 independent sources, independence log, never sole basis | `validateTagEvidence`: ≥2 `triangulated_community` + ≥1 non-community; independence log required per community citation; other tags forbid community cites |
| TAG-04 | Each tag shows a qualitative confidence label that means evidence strength, not school quality | Closed confidence enum + format helper matching methodology strings; confidence↔citation consistency validators; no high/medium/low |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Source type / reliability enums | CDN / Static (build-time Zod) | — | Static school JSON/TS parsed at build/validate; no runtime API |
| Factual citation gate (`isAcceptableFactualEvidence`) | CDN / Static | — | Enforced in `schoolSchema.superRefine` during `validate:data` / directory parse |
| Tag taxonomy + confidence schemas | CDN / Static | — | Closed enums colocated under `src/features/` |
| Independence log on community citations | CDN / Static | — | Nested on tag citation objects; validated against `sources[]` registry |
| `validateTagEvidence` | CDN / Static | — | Pure functions + Zod `superRefine`; same tier as `validateFieldCitations` |
| PT-BR format helpers | CDN / Static | Browser / Client (Phase 15 consumers) | Helpers ship now; UI rendering deferred |
| `docs/RESEARCH.md` reliability drift fix | Documentation | — | Source-of-truth correction for planners/authors |
| Profile tag chips / Fontes merge | — (deferred Phase 15) | — | Explicitly out of scope |
| Pilot tag authoring on real schools | — (deferred Phase 14) | — | Real records stay untagged this phase |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | **4.4.3** `[VERIFIED: npm registry + package.json]` | Schema + `superRefine` validation | Already powers `schoolSchema`, `sourceSchema`, `researchMetadataSchema` |
| TypeScript / Next.js App Router | next **16.2.10** `[VERIFIED: package.json]` | Static site host | Existing architecture; no change |
| Jest | **30.4.2** `[VERIFIED: package.json + npm view]` | Unit tests for schemas/validators/formatters | Existing colocated `index.test.ts` pattern |
| tsx | via `validate:data` script `[VERIFIED: package.json]` | Run `validateSchools` CLI | Existing data gate |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@/` path aliases | existing | Feature imports | Same as current evidence/schools features |
| Node `fs` in validateSchools | built-in | Fixture JSON parse | Unchanged pipeline |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zod `superRefine` | Separate CI script only | Weaker — directory load must reject invalid tags too; keep Zod as source of truth |
| Parallel tag citation registry | Reuse `sources[]` | Locked by D-12; parallel system would drift |
| New validation library | Stay on Zod 4 | No benefit; stack already proven |
| Soft editorial-only triangulation | Hard schema rules | Locked by D-07/D-08; soft rules fail VAL-02 later |

**Installation:**

```bash
# No new packages — extend existing zod/jest stack
pnpm test
pnpm validate:data
```

**Version verification:** zod `4.4.3` matches local `node_modules` and npm registry as of 2026-07-29. Jest `30.4.2` verified via `npm view jest version`. `[VERIFIED: npm registry]`

## Project Constraints (from .cursor/rules/)

No `.cursor/rules/` directory found in this workspace. `[VERIFIED: glob]`

Applicable constraints from `AGENTS.md` (treat as binding for planning):

- Use **pnpm** / Corepack only — no npm/yarn command introduction.
- Check `docs/` before data-model changes; `docs/DECISIONS.md` explains why.
- Preserve static-first V1 — no production DB, server API, auth.
- Feature-first `src/` layout; directory-colocated units (`index.ts` + `index.test.ts` + `types.ts` / `fixtures.ts`).
- English for paths/identifiers; Brazilian Portuguese for user-facing labels (format helpers).
- School data must remain statically generable; no external APIs for filtering/profiles in production V1.

## Architecture Patterns

### System Architecture Diagram

```text
Author / fixture / real school record (TS or JSON)
        │
        ▼
 schoolSchema.parse / safeParse
        │
        ├─► sourceSchema (sources[])
        │      └─ sourceType ∈ {…, journalism, triangulated_community, anecdotal_reserved}
        │      └─ reliability ∈ {primary, secondary, anecdotal, unknown}
        │
        ├─► optional tags[]
        │      └─ id ∈ closed 10-tag taxonomy
        │      └─ confidence ∈ {confirmed_multi_source, confirmed_official, partial}
        │      └─ citations[] → sourceId (+ independenceLog if community)
        │
        ├─► optional qualitativeLastReviewed (YYYY-MM-DD)
        │
        ▼
 superRefine gates
        │
        ├─► existing field citation gate
        │      validateFieldCitations → isAcceptableFactualEvidence(source)
        │
        ├─► tag gate
        │      validateTagEvidence(tag, sources)
        │         ├ unknown sourceId? reject
        │         ├ active-school-community? ≥2 community + ≥1 non-community + logs
        │         ├ other tags? forbid community / anecdotal_reserved
        │         └ confidence ↔ citation consistency
        │
        └─► qualitativeLastReviewed required iff tags.length > 0
        │
        ▼
 pnpm validate:data  +  schoolDirectoryData parse
        │
        ▼
 Static pages (tags unused in UI until Phase 15)
```

### Recommended Project Structure

```text
src/features/evidence/
├── sourceTypes/              # extend enums; add factual allowlist + isAcceptableFactualEvidence
├── source/                   # unchanged shape; new fixtures for journalism/community
├── fieldEvidence/            # keep fieldCitationSchema lean (no independence log)
├── validateFieldCitations/   # switch to isAcceptableFactualEvidence
├── validateTagEvidence/      # NEW — triangulation + confidence consistency
├── independenceLog/          # NEW — minimal Zod object for D-11 fields
├── tagCitation/              # NEW — sourceId + optional quote/note + optional independenceLog
├── formatSourceType/         # extend journalism + triangulated_community; hide anecdotal_reserved
├── formatTagConfidence/      # NEW — D-17 strings
└── calculateEvidenceCoverage/  # do NOT count tags (VAL-01)

src/features/schools/
├── tagTaxonomy/              # NEW — closed z.enum(10) + category map + formatTagId
├── school/                   # add tags?, qualitativeLastReviewed?; wire superRefine
├── validateSchools/          # unchanged entry; must stay green for 10 real schools
└── collectCitedSources/      # DO NOT expand for tags this phase (Phase 15)
```

### Pattern 1: Closed taxonomy enum (mirror `schoolClassification`)

**What:** `z.enum([...])` for the exact 10 tag IDs from `docs/DATA_MODEL.md`.  
**When to use:** Any closed product vocabulary that must fail closed on unknown IDs.  
**Example:**

```typescript
// Source: existing src/features/schools/schoolClassification/index.ts pattern
export const tagTaxonomyIdSchema = z.enum([
  "stem-focus",
  "languages-focus",
  "arts-music-focus",
  "bilingual-program",
  "special-pedagogical-model",
  "all-day-model",
  "inclusion-support",
  "transition-support",
  "structured-learning-environment",
  "active-school-community",
]);
```

### Pattern 2: Citation-by-sourceId + school registry

**What:** Citations store `sourceId` only; resolve against `school.sources`.  
**When to use:** Tags and fields — never embed duplicate Source objects on each citation.  
**Example:**

```typescript
// Source: src/features/evidence/fieldEvidence/index.ts + Phase 13 extension
export const independenceLogSchema = z.object({
  venue: z.string().min(1),
  identifier: z.string().min(1), // URL or stable id
  dateAccessed: z.string().date(),
  independenceRationale: z.string().min(1),
  echoCheckNote: z.string().min(1),
});

export const tagCitationSchema = z.object({
  sourceId: z.string().min(1),
  quote: z.string().optional(),
  note: z.string().optional(),
  independenceLog: independenceLogSchema.optional(),
});
```

`superRefine` / `validateTagEvidence` requires `independenceLog` when resolved `source.type === "triangulated_community"`. `[ASSUMED]` property names above are the recommended discretion choice (1:1 with D-11 semantics).

### Pattern 3: Optional qualitative fields that keep non-pilots valid

**What:** `tags` and `qualitativeLastReviewed` optional at object level; conditional requirement in `superRefine`.  
**When to use:** Additive schema evolution without forcing placeholder data on 10 real schools.  
**Example:**

```typescript
// Source: Zod 4 date format verified locally — z.string().date() accepts YYYY-MM-DD only
tags: z.array(schoolTagSchema).optional(),
qualitativeLastReviewed: z.string().date().optional(),
// superRefine:
// if ((school.tags?.length ?? 0) > 0 && !school.qualitativeLastReviewed) → issue
```

`[VERIFIED: local zod@4.4.3]` — `z.string().date()` accepts `2026-07-29` and rejects ISO datetimes.

### Pattern 4: Factual allowlist (replace reliability-only gate)

**What:**

```typescript
export const acceptableFactualSourceTypes = [
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
  "journalism",
] as const;

export function isAcceptableFactualEvidence(source: Source): boolean {
  return (
    isAcceptableReliabilityLevel(source.reliability) &&
    (acceptableFactualSourceTypes as readonly string[]).includes(source.type)
  );
}
```

**When to use:** Verified field citations (update `validateFieldCitations`) and as the “non-community” set for TAG-03 (same five types). `[VERIFIED: D-05 + D-07 locked sets]`

### Pattern 5: Confidence ↔ citation consistency (recommended predicates)

**Machine-enforceable recommendations** (Claude’s discretion under D-20):

| Confidence | Required predicate |
|------------|-------------------|
| `confirmed_official` | ≥1 cited source with `type ∈ {official_government, official_inspection, school_website}` (D-18) |
| `confirmed_multi_source` | ≥2 **distinct** `sourceId`s whose types are in factual allowlist **or** `triangulated_community` (only legal on community tag) |
| `partial` | ≥1 citation, but neither of the above predicates holds (e.g. sole `journalism` or sole `public_dataset`) |

**Bidirectional rule (recommended):** derived expected confidence from citations must equal declared confidence — authors cannot pick `confirmed_multi_source` with a single official cite, nor `partial` when multi-source is satisfied. `[ASSUMED]` bidirectional enforcement is the safest reading of D-20 + methodology; if planner prefers one-way “declared implies predicate,” document that explicitly in PLAN.

**Independence machine checks vs research-notes-only:**

| Check | Enforce in Zod? |
|-------|-----------------|
| ≥2 distinct `triangulated_community` sourceIds | Yes |
| Each community citation has full independence log | Yes |
| Optional weak check: community logs’ `venue` strings differ | Recommended yes (cheap) |
| Echo / same-thread semantic independence | No — research-notes / Phase 14 human judgment |
| ~24-month community recency | No hard gate this phase (policy in docs; optional later) |
| Fail-closed on conflicting community evidence | No auto-detect — absence of tag is the published outcome |

### Anti-Patterns to Avoid

- **Putting `triangulated_community` on `reliabilityLevelSchema`:** recreates the Phase 12 doc drift (D-06).
- **Exclusion-only factual checks:** new source types would silently pass; use allowlist (D-05).
- **Independence log on `Source` only or tag-level blob:** violates D-10.
- **Requiring `qualitativeLastReviewed` always:** breaks VAL-01 / D-15 for untagged schools.
- **Authoring tags on real Lichtenberg schools:** Phase 14 only.
- **Expanding `collectCitedSources` / SourcesSection for tags:** Phase 15.
- **Counting tags in `calculateEvidenceCoverage`:** would silently change coverage % (VAL-01).
- **high/medium/low confidence:** banned by D-19 / anti-ranking.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Date format YYYY-MM-DD | Custom regex | `z.string().date()` (Zod 4) | Already used for `dateAccessed` / research dates; rejects datetimes |
| Closed tag IDs | Free `z.string()` | `z.enum` like `schoolClassification` | Fail closed on typos |
| Citation graph / second registry | Parallel `tagSources[]` | School `sources[]` + `sourceId` | D-12; Fontes Phase 15 merges one registry |
| Factual acceptability | Ad-hoc if/else in school refine only | Shared `isAcceptableFactualEvidence` | Field + tag validators must agree |
| PT-BR label maps | Inline strings in future UI | `formatSourceType` / `formatTagConfidence` / `formatTagId` now | D-21 locks strings before Phase 15 |
| Full NLP independence | Custom classifiers | Structured log + distinct sourceIds | Echo semantics are human research judgment |

**Key insight:** Phase 13 is schema hardening of rules already written in docs — reuse the field-evidence validation style rather than inventing a second evidence subsystem.

## Common Pitfalls

### Pitfall 1: Reliability ladder still lists community as a level
**What goes wrong:** Authors set `reliability: "triangulated_community"` (invalid after D-03) or docs contradict code.  
**Why it happens:** Phase 12 added community to Reliability Levels by mistake.  
**How to avoid:** Dedicated or bundled task to rewrite `docs/RESEARCH.md` Reliability Levels to only `primary | secondary | anecdotal | unknown`, pointing community at Canonical Source Types (D-06).  
**Warning signs:** Grep finds `reliability` + `triangulated_community` in docs.

### Pitfall 2: Factual gate stays reliability-only
**What goes wrong:** A `triangulated_community` source with mistaken `reliability: "secondary"` could verify factual fields.  
**Why it happens:** Today `validateFieldCitations` only calls `isAcceptableReliabilityLevel`. `[VERIFIED: source code]`  
**How to avoid:** Implement allowlist + update field citation tests with a journalism-pass and community-fail case.

### Pitfall 3: Empty array vs omitted tags vs required review date
**What goes wrong:** `tags: []` still forces `qualitativeLastReviewed`, or omitted tags reject.  
**Why it happens:** Ambiguous “any qualitative content.”  
**How to avoid:** Treat **non-empty** `tags` as the trigger (`(tags?.length ?? 0) > 0`); omit field or `[]` both OK without date (D-14/D-15).

### Pitfall 4: Community-only `active-school-community` accepted as `partial`
**What goes wrong:** Softening never-sole-basis via confidence.  
**Why it happens:** Misreading “partial” as escape hatch.  
**How to avoid:** Never-sole-basis is independent of confidence (D-07/D-08); reject before confidence checks.

### Pitfall 5: Independence log required on wrong layer
**What goes wrong:** Log on Source breaks reuse of same source across contexts; tag-level log can’t attribute per cite.  
**Why it happens:** Convenience.  
**How to avoid:** Nested on citation; require only when resolved type is `triangulated_community` (D-10).

### Pitfall 6: Fontes / coverage regressions from incomplete SourceType unions
**What goes wrong:** TypeScript exhaustiveness errors in `collectCitedSources` `SOURCE_TYPE_ORDER` or `formatSourceType` Record when enums grow.  
**Why it happens:** `SourceType` union expands.  
**How to avoid:** Update `formatSourceType` labels map; for `collectCitedSources`, either leave order as-is (new types simply won’t group until Phase 15 — entries filtered by type may silently drop) **or** add journalism/community to order without wiring tag citations. Prefer: update `SOURCE_TYPE_ORDER` + format labels so any accidental field citation of journalism still groups; still do **not** merge tag citations (Phase 15). `[ASSUMED]` safest Phase 13 fix is extend `SOURCE_TYPE_ORDER` for displayable types so field-cited journalism isn’t dropped if authored early.

### Pitfall 7: Fixture `School` type breakage
**What goes wrong:** Adding required fields breaks `validDirectoryOnlySchool` fixtures.  
**Why it happens:** New required schema keys.  
**How to avoid:** Keep tags / qualitativeLastReviewed optional; add **separate** valid/invalid tag fixtures for tests.

## Code Examples

### Extend source types (TAG-02)

```typescript
// Source: src/features/evidence/sourceTypes/index.ts — target shape
export const sourceTypeSchema = z.enum([
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
  "journalism",
  "triangulated_community",
  "anecdotal_reserved",
]);

export const reliabilityLevelSchema = z.enum([
  "primary",
  "secondary",
  "anecdotal",
  "unknown",
]);
```

### validateTagEvidence sketch (TAG-03 / TAG-04)

```typescript
// Recommended shape — implement in src/features/evidence/validateTagEvidence/
const COMMUNITY_TAG = "active-school-community";
const NON_COMMUNITY = acceptableFactualSourceTypes; // same D-07 list

export function validateTagEvidence(
  tag: SchoolTag,
  sources: Source[],
): { ok: true } | { ok: false; messages: string[] } {
  const sourceById = new Map(sources.map((s) => [s.id, s]));
  const resolved = tag.citations.map((c) => ({
    citation: c,
    source: sourceById.get(c.sourceId),
  }));
  // unknown sourceId → fail
  // for each triangulated_community cite → independenceLog required
  // if tag.id === COMMUNITY_TAG:
  //   count community types ≥ 2 (distinct sourceIds)
  //   count NON_COMMUNITY types ≥ 1
  // else:
  //   reject any triangulated_community or anecdotal_reserved
  // confidence consistency per Pattern 5
}
```

### format helpers (D-17 / D-21)

```typescript
// methodology.mdx locked strings [VERIFIED: src/content/guides/methodology.mdx]
formatTagConfidence("confirmed_multi_source"); // "Confirmado por múltiplas fontes"
formatTagConfidence("confirmed_official"); // "Confirmado por fonte oficial"
formatTagConfidence("partial"); // "Evidência parcial"

formatSourceType("journalism"); // "Jornalismo independente"
formatSourceType("triangulated_community"); // "Fontes comunitárias trianguladas"
formatSourceType("anecdotal_reserved"); // null
```

### Recommended tag-id PT-BR labels (discretion, non-superlative)

| ID | Recommended PT-BR label |
|----|-------------------------|
| `stem-focus` | Foco em STEM |
| `languages-focus` | Foco em idiomas |
| `arts-music-focus` | Foco em artes e música |
| `bilingual-program` | Programa bilíngue |
| `special-pedagogical-model` | Modelo pedagógico específico |
| `all-day-model` | Modelo de período integral |
| `inclusion-support` | Apoio à inclusão |
| `transition-support` | Apoio na transição |
| `structured-learning-environment` | Ambiente de aprendizagem estruturado |
| `active-school-community` | Comunidade escolar ativa |

`[ASSUMED]` Exact wording except `active-school-community` (matches methodology “Comunidade escolar ativa”). Labels must avoid ranking language (“melhor”, “excelente”, etc.).

### schoolSchema additions

```typescript
// Conceptual — wire into existing superRefine after field gates
tags: z.array(schoolTagSchema).optional(),
qualitativeLastReviewed: z.string().date().optional(),
```

Recommended `schoolTagSchema` field names (discretion): `id`, `confidence`, `citations` — short, matches taxonomy language in docs (“tag id”).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 5 source types; anecdotal reserved only | + `journalism` + `triangulated_community` displayable | Phase 12 docs / Phase 13 code | Tags can cite journalism & triangulated community |
| Factual gate = primary/secondary reliability only | Reliability **and** factual sourceType allowlist | Phase 13 | Community cannot verify factual fields even if mis-labeled |
| No tags on school records | Optional cited tags + confidence | Phase 13 | Enables Phase 14 authoring |
| Community as reliability level in docs | Community as source type only | Phase 13 doc fix (D-06) | Aligns docs with orthogonal axes |

**Deprecated/outdated:**
- `docs/RESEARCH.md` Reliability Levels entry for `triangulated_community` — must be removed/relocated (D-06).
- Reliability-only `hasAcceptableSource` semantics — extend to factual allowlist.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Independence log property names: `venue`, `identifier`, `dateAccessed`, `independenceRationale`, `echoCheckNote` | Pattern 2 | Rename cost only if planner prefers different keys |
| A2 | Bidirectional confidence↔citation enforcement (derived must match declared) | Pattern 5 | If one-way only, authors could under-label strong evidence |
| A3 | `public_dataset` alone → `partial` (not `confirmed_official`) | Pattern 5 | Methodology emphasizes official/school website for “fonte oficial”; dataset multi-source still OK |
| A4 | Extend `collectCitedSources` SOURCE_TYPE_ORDER for new displayable types without tag merge | Pitfall 6 | If skipped, journalism field cites may be dropped from Fontes until Phase 15 |
| A5 | Recommended PT-BR tag labels table (except community) | Code Examples | Phase 15 copy tweaks possible; lock via tests now |
| A6 | Soft venue-differ check between community independence logs | Pattern 5 | Optional; skipping still meets D-07 distinct sourceIds |

**If this table is empty:** All claims in this research were verified or cited — no user confirmation needed.

## Open Questions (RESOLVED)

1. **Should `SOURCE_TYPE_ORDER` / Fontes grouping include journalism + triangulated_community in Phase 13?**
   - **RESOLVED:** Yes — extend `SOURCE_TYPE_ORDER` + `formatSourceType` labels in Plan 13-01 (A4). Do not merge tag citations into Fontes (Phase 15).

2. **How strict should confidence consistency be (one-way vs bidirectional)?**
   - **RESOLVED:** Bidirectional — derived expected confidence from citations must equal declared confidence (A2). Encoded in Plan 13-03 `validateTagEvidence`.

3. **Machine check for distinct community venues?**
   - **RESOLVED:** Enforce distinct community `sourceId`s + full independence logs; also require distinct `venue` strings between community logs (A6). Full echo/semantic independence remains human judgment (Phase 14).

## Environment Availability

Step 2.6: mostly code/config — verified local toolchain.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | tests / validate:data | ✓ | v24.12.0 | — |
| pnpm (Corepack) | package scripts | ✓ | 11.11.0 | — |
| zod (workspace) | schemas | ✓ | 4.4.3 | — |
| Jest | unit tests | ✓ | 30.4.2 | — |
| External APIs / DB | — | n/a | — | Not used |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json`. `[VERIFIED: config.json]`

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 + Testing Library (jsdom) |
| Config file | `jest.config.mjs` |
| Quick run command | `pnpm exec jest src/features/evidence src/features/schools/tagTaxonomy src/features/schools/school/index.test.ts --no-coverage` |
| Full suite command | `pnpm test` |
| Data gate | `pnpm validate:data` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TAG-01 | Optional tags parse; each tag needs id + confidence + ≥1 citation; unknown sourceId rejected; non-empty tags require `qualitativeLastReviewed` | unit | `pnpm exec jest src/features/schools/school/index.test.ts --no-coverage` | ❌ Wave 0 — extend existing school tests + fixtures |
| TAG-01 | Empty/omitted tags: school valid without `qualitativeLastReviewed` | unit | same | ❌ Wave 0 |
| TAG-02 | `sourceTypeSchema` accepts `journalism` + `triangulated_community`; reliability rejects community string | unit | `pnpm exec jest src/features/evidence/sourceTypes --no-coverage` | ⚠️ extend existing `sourceTypes/index.test.ts` |
| TAG-02 | `formatSourceType` returns PT-BR for new types; null for `anecdotal_reserved` | unit | `pnpm exec jest src/features/evidence/formatSourceType --no-coverage` | ⚠️ extend existing |
| TAG-03 | `active-school-community` rejects <2 community, missing non-community, missing independence log, community-only | unit | `pnpm exec jest src/features/evidence/validateTagEvidence --no-coverage` | ❌ Wave 0 |
| TAG-03 | Non-community tags reject `triangulated_community` citations | unit | same | ❌ Wave 0 |
| TAG-04 | Confidence enum + format strings match methodology | unit | `pnpm exec jest src/features/evidence/formatTagConfidence --no-coverage` | ❌ Wave 0 |
| TAG-04 | Confidence↔citation consistency accept/reject matrix | unit | `pnpm exec jest src/features/evidence/validateTagEvidence --no-coverage` | ❌ Wave 0 |
| D-05 | Verified fields reject community even with secondary reliability; accept journalism with secondary | unit | `pnpm exec jest src/features/evidence/validateFieldCitations --no-coverage` | ⚠️ extend existing |
| VAL-01 preview | `validateRealSchools` still 10/10 with untagged reals | unit / gate | `pnpm validate:data` + existing validateSchools test | ✅ exists — must remain green |
| D-06 | Docs: Reliability Levels no longer list `triangulated_community` as reliability | smoke/grep | `rg -n "Reliability Levels" -A20 docs/RESEARCH.md` | docs task |

### Sampling Rate

- **Per task commit:** targeted Jest path for touched unit (`pnpm exec jest <path> --no-coverage`)
- **Per wave merge:** `pnpm test` + `pnpm validate:data`
- **Phase gate:** Full suite green + validate:data green before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `src/features/evidence/validateTagEvidence/index.ts` + `index.test.ts` — TAG-03/TAG-04 matrix
- [ ] `src/features/evidence/independenceLog/index.ts` (+ tests if non-trivial)
- [ ] `src/features/evidence/tagCitation/index.ts` (+ tests)
- [ ] `src/features/schools/tagTaxonomy/index.ts` + `index.test.ts` + `formatTagId`
- [ ] `src/features/evidence/formatTagConfidence/index.ts` + `index.test.ts`
- [ ] Extend `sourceTypes`, `formatSourceType`, `validateFieldCitations`, `school` fixtures/tests for new cases
- [ ] Synthetic valid/invalid tagged school fixtures (do **not** mutate real Lichtenberg records)
- [ ] Doc correction task for `docs/RESEARCH.md` Reliability Levels (D-06)

*(Existing Jest + `validate:data` infrastructure is sufficient — no framework install needed.)*

## Security Domain

> `security_enforcement` not set to false — included.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Static site; no accounts (AGENTS.md) |
| V3 Session Management | no | — |
| V4 Access Control | no | Public static content |
| V5 Input Validation | yes | Zod schemas on all school/tag/source shapes; fail closed |
| V6 Cryptography | no | No secrets in this phase |

### Known Threat Patterns for static evidence schema

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Injecting unverified community claim as sole tag basis | Spoofing / Tampering | Hard never-sole-basis + independence log (TAG-03) |
| Mislabeling community as factual verified field | Tampering | Factual sourceType allowlist (D-05) |
| Confidence as fake quality score | Elevation of privilege (semantic) | Closed evidence-strength enum + D-19 ban on high/medium/low |
| Invalid dates / placeholder review stamps on all schools | Repudiation | Conditional `qualitativeLastReviewed`; ISO date only |
| Doc/code drift on reliability | Tampering (process) | D-06 doc fix in same phase |

## Sources

### Primary (HIGH confidence)

- Workspace source: `src/features/evidence/sourceTypes/index.ts`, `source/index.ts`, `fieldEvidence/index.ts`, `validateFieldCitations/index.ts`, `formatSourceType/index.ts`
- Workspace source: `src/features/schools/school/index.ts`, `validateSchools/index.ts`, `schoolClassification/index.ts`, `collectCitedSources/index.ts`
- `.planning/phases/13-evidence-tag-schema-layer/13-CONTEXT.md` — locked decisions
- `.planning/REQUIREMENTS.md` — TAG-01–04
- `.planning/ROADMAP.md` — Phase 13 success criteria
- `docs/DATA_MODEL.md` — Tag Taxonomy v1; Qualitative Review Tracking
- `docs/RESEARCH.md` — Canonical Source Types; Reliability Levels (drift); Community Source Independence
- `src/content/guides/methodology.mdx` — confidence + source tier PT-BR copy
- Zod 4.4.3 local behavior for `z.string().date()` — verified in-session
- `package.json` / `npm view` — zod 4.4.3, jest 30.4.2

### Secondary (MEDIUM confidence)

- `.planning/phases/12-editorial-research-framework/12-CONTEXT.md` / `12-RESEARCH.md` — upstream taxonomy & independence rules
- `docs/DECISIONS.md` — 2026-07-26 ADRs for taxonomy / source hierarchy / qualitative cadence

### Tertiary (LOW confidence)

- Exact PT-BR wording for 9 non-community tag labels (A5) — align in Phase 15 UI if needed
- Whether weak `venue` inequality check is worth encoding (A6)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — existing zod/jest/pnpm stack verified; no new deps
- Architecture: HIGH — extension points and locked decisions map 1:1 to files
- Pitfalls: HIGH — several confirmed from current `validateFieldCitations` / doc drift / VAL-01 constraints

**Research date:** 2026-07-29  
**Valid until:** 2026-08-28 (stable schema domain; re-check if Zod major or school dataset changes)
