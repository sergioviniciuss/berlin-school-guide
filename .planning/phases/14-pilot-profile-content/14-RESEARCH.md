# Phase 14: Pilot Profile Content - Research

**Researched:** 2026-07-29
**Domain:** Evidence-backed pilot tag/perfil authoring on static school records + additive Zod cross-field rules
**Confidence:** HIGH

## Summary

Phase 14 is primarily a **content-authoring + small schema-extension** phase, not a new-stack phase. Phase 13 already shipped closed tag taxonomy, `validateTagEvidence` (triangulation / never-sole-basis / confidence consistency), optional `tags` + `qualitativeLastReviewed`, and a green `pnpm validate:data` gate over 10 real Lichtenberg schools with tags omitted. This phase adds `perfilDaEscola` (and optional research notes), extends cross-field `superRefine` rules, then authors real qualitative content on the five named pilots only.

The hard technical work is narrow and additive: optional string fields on `schoolSchema`, refine rules that keep non-pilots valid without placeholder dates, factory/authoring ergonomics in `lichtenbergPrimarySchools`, fixture tests for the new cross-field gates, a durable community-research log for Lew-Tolstoi (publish tag or fail-closed withhold), and `pnpm validate:data` remaining green. Editorial citation discipline for perfil text is **human**, not schema-parsed. Profile UI remains Phase 15.

**Primary recommendation:** Extend `schoolSchema` with `perfilDaEscola` + `qualitativeResearchNotes`, widen the qualitative-date gate to tags **or** perfil, author sparse-but-honest content on all five pilots against existing sources/`validateTagEvidence`, exercise live Tolstoi community research with documented outcome (1A), leave the other five schools untouched.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Where “Perfil da escola” lives
- **D-01:** Store perfil as an optional field on the **school record**, not separate MDX: `perfilDaEscola`.
- **D-02:** Schema shape: `perfilDaEscola: z.string().trim().min(1).optional()` — plain PT-BR text only for v1.2 (no MDX, no Markdown features).
- **D-03:** Cross-field rules: if `tags` present (non-empty) → `perfilDaEscola` required; if `perfilDaEscola` present → `qualitativeLastReviewed` required; schools with neither remain valid (non-pilots).
- **D-04:** Extend Phase 13 rule: `qualitativeLastReviewed` required whenever **any** qualitative content exists (tags **or** perfil), not tags alone.

#### Tagging depth / sparse-honest
- **D-05:** Sparse-but-honest always wins over completeness. Tag only when evidence supports a sustained “what kind of school” claim **beyond** the factual field (Phase 12 facts≠tags rule).
- **D-06:** **No hard minimum or maximum** tags per school. Zero tags + short perfil is a valid, successful pilot outcome for thin schools (esp. Seepark, Friedrichsfelder, and possibly Grzimek).
- **D-07:** Do not invent tags to fill a quota or demonstrate taxonomy coverage.

#### Narrative length & citation discipline
- **D-08:** Target ~**one concise PT-BR paragraph** (soft guideline ≈ 3–5 sentences / short evidence synthesis — not a mini-article).
- **D-09:** **No Zod `.max()`** on `perfilDaEscola` — length is editorial, not schema-enforced.
- **D-10:** Citation discipline is **editorial/human**: every claim in perfil must be supportable from that school’s existing `sources[]`, verified fields, and/or tag citations. No new uncited facts. Schema does not parse sentence→sourceId maps in v1.2.
- **D-11:** Follow `docs/EDITORIAL_GUIDE.md` Perfil voice: no ranking/superlatives/reputation language; sparse-but-honest; parent-centered verified vs unconfirmed.

#### Community triangulation research
- **D-12:** Perform **live research** for Lew-Tolstoi-Schule community venues (provisional PILOT_SELECTION candidate). No synthetic community fixtures to force a green tag.
- **D-13:** If independence / never-sole-basis thresholds are not met → **fail closed: omit `active-school-community`**. That outcome is successful methodology validation.
- **D-14:** **PILOT-03 satisfaction (option 1A):** end-to-end triangulation is exercised by the **documented research attempt + outcome** — either a published triangulated tag meeting Phase 13 validators, **or** a documented withhold. A published community tag is not mandatory for phase completion.

#### `qualitativeLastReviewed` + withhold / research notes
- **D-15:** Every pilot school that ships tags and/or `perfilDaEscola` must set `qualitativeLastReviewed` to the ISO `YYYY-MM-DD` of qualitative authoring/review.
- **D-16:** When community triangulation is **attempted and withheld**, require a short durable note in **both** places (**1c**):
  - Optional school-record field (e.g. `qualitativeResearchNotes: z.string().trim().min(1).optional()`) — brief withhold/research summary;
  - Fuller write-up under `docs/research/` (extend PILOT_SELECTION or add a Phase 14 research log).
- **D-17:** Exact Zod name for the notes field is Claude’s discretion if semantics match D-16 (`qualitativeResearchNotes` preferred).

#### Pilot scope
- **D-18:** Author qualitative content for **all five** named schools: Richard-Wagner-Schule, Lew-Tolstoi-Schule, Bernhard-Grzimek-Schule, Friedrichsfelder Schule, Seepark-Grundschule.
- **D-19:** Non-pilot schools in `lichtenbergPrimarySchools` remain untouched (VAL-01). Coverage % must not be silently altered by qualitative work.

#### Carried forward (do not reopen)
- Phase 12 taxonomy, independence, Perfil voice, pilot selection rationale; Phase 13 tag/citation/confidence/allowlist validators; never-sole-basis hard rule; confidence enum IDs.

### Claude's Discretion
- Exact PT-BR copy for each school’s perfil and which tags (if any) each school earns — must obey D-05–D-11 and real evidence found during research.
- Whether `primarySchool()` factory gains helpers for tags/perfil or authors pass them on the finished object.
- Exact docs path/filename for the fuller community research log (D-16).
- Soft character/sentence targets beyond D-08 when drafting acceptance checks.
- Whether successful community tag on Tolstoi also gets a brief positive research note (optional; withhold note is mandatory only on withhold).

### Deferred Ideas (OUT OF SCOPE)
- Profile UI for tags/perfil and Fontes merge of qualitative citations — Phase 15
- MDX or Markdown-rich perfil — post-v1.2 if needed
- Synthetic community fixtures to force PILOT-03 green tag — rejected
- Tag quotas / minimum tags per school — rejected
- Directory card / compare tag surfaces — later milestone
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NARR-02 | Short PT-BR `Perfil da escola` synthesizes existing cited evidence only — never introduces uncited claims or ranking language | Add `perfilDaEscola` on school record; editorial voice from EDITORIAL_GUIDE; human citation discipline (no sentence→source schema); soft ~1 paragraph; required when tags present |
| PILOT-01 | 3–5 representative Lichtenberg schools ship fully tagged and narrated profiles | Author all 5 named pilots; “fully tagged” means sparse-honest tags (may be zero) + populated perfil per D-06/D-18 |
| PILOT-02 | Pilot set includes ≥1 lower-documentation school | Bernhard-Grzimek + Seepark already selected as `directory_only` / thin; preserve selection; sparse profiles expected |
| PILOT-03 | At least one triangulated-community example is exercised end-to-end | Live Lew-Tolstoi research; publish `active-school-community` **or** documented withhold (1A); school notes + `docs/research/` log on withhold |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| `perfilDaEscola` / notes schema fields | CDN / Static (build-time Zod) | — | Authored TS data parsed by `schoolSchema` at validate/load |
| Cross-field qualitative gates | CDN / Static | — | `schoolSchema.superRefine`; same path as tags→`qualitativeLastReviewed` |
| Tag authoring + citations | CDN / Static | — | Real `sources[]` + `tags[]`; enforced by existing `validateTagEvidence` |
| Perfil PT-BR copy | Content / Editorial | CDN / Static (storage) | Human-authored; schema stores string only |
| Community triangulation research | Human research process | CDN / Static (sources + logs) | Live venues; outcomes recorded in school data + docs |
| `pnpm validate:data` | CDN / Static (CLI) | — | Gates all 10 real schools + fixtures |
| Profile tags/perfil UI | — (deferred Phase 15) | — | Explicitly out of scope |
| Coverage % / factual fields | Unchanged | — | Qualitative work must not alter non-pilot factual coverage |

## Project Constraints (from .cursor/rules/)

No `.cursor/rules/` directory present in this workspace `[VERIFIED: glob]`. Applicable constraints from `AGENTS.md` / project conventions:

- Use **pnpm** (Corepack); no npm/yarn unless requested.
- Check `docs/` before product/architecture/content/data-model changes; preserve static-first V1.
- English for paths/IDs/code; **Brazilian Portuguese** for user-facing content (`perfilDaEscola` copy).
- Feature-first `src/` layout; directory-colocated units (`index.ts` + `index.test.ts`).
- School data must remain statically generable; no production DB/API for filtering/pages.
- Avoid new abstractions until two concrete use cases exist; evolve existing Zod/school pipeline.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | **4.4.3** `[VERIFIED: package.json + node require]` | Schema + `superRefine` | Already powers `schoolSchema`, tags, sources |
| TypeScript / Next.js | next **16.2.10** `[VERIFIED: package.json]` | Static site host | Unchanged architecture |
| Jest | **30.4.2** `[VERIFIED: package.json]` | Unit tests for schema cross-field rules | Existing colocated pattern |
| tsx | **4.21.0** `[VERIFIED: package.json]` | `pnpm validate:data` runner | Existing data gate |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Existing `validateTagEvidence` | in-repo | Triangulation / confidence / never-sole-basis | Any authored tag |
| Existing `tagTaxonomy` / `tagCitation` / `independenceLog` | in-repo | Closed IDs + community cite shape | Community tag only |
| `docs/research/*` markdown | in-repo | Durable research log | PILOT-03 withhold/publish write-up |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `perfilDaEscola` string on school | Per-school MDX | Rejected (D-01); harder validate:data / Phase 15 coupling |
| Nested `editorial.perfil` | Flat `perfilDaEscola` | Flat preferred for authoring beside tags (CONTEXT specifics) |
| Zod `.max()` on perfil | Soft editorial length | Rejected (D-09) |
| Synthetic community fixtures | Live research | Rejected (D-12) |
| Sentence→sourceId citation map | Human discipline | Deferred; schema does not parse narrative cites (D-10) |

**Installation:**

```bash
# No new packages — use existing stack
corepack pnpm validate:data
corepack pnpm test
```

**Version verification:** zod 4.4.3, jest 30.4.2, next 16.2.10 confirmed from `package.json` on 2026-07-29. No registry `npm view` re-check required for this content phase (no new deps).

## Architecture Patterns

### System Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────────┐
│ Authoring (human / executor)                                    │
│  1. Live research (Tolstoi community venues)                    │
│  2. Decide tags (sparse) + draft PT-BR perfil                   │
│  3. On withhold: notes on school + docs/research log            │
└───────────────┬─────────────────────────────────────────────────┘
                │ writes
                ▼
┌─────────────────────────────────────────────────────────────────┐
│ src/content/schools/real/lichtenbergPrimarySchools/index.ts     │
│  pilots: tags? + perfilDaEscola + qualitativeLastReviewed       │
│        + sources[] (+ triangulated_community if published)      │
│        + qualitativeResearchNotes? (withhold)                   │
│  non-pilots: untouched                                          │
└───────────────┬─────────────────────────────────────────────────┘
                │ School objects
                ▼
┌─────────────────────────────────────────────────────────────────┐
│ schoolSchema.parse / safeParse                                  │
│  ├── field citation gates (unchanged)                           │
│  ├── per-tag validateTagEvidence (unchanged Phase 13)           │
│  └── NEW: tags→perfil; (tags|perfil)→qualitativeLastReviewed    │
└───────────────┬─────────────────────────────────────────────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
 pnpm validate:data   schoolDirectoryData
 (CLI gate)           (build/runtime parse)
        │
        ▼
  Phase 15 UI (deferred) reads perfilDaEscola + tags
```

### Recommended Project Structure

```text
src/features/schools/school/
├── index.ts              # add perfilDaEscola + qualitativeResearchNotes; extend superRefine
├── index.test.ts         # cross-field cases
└── fixtures.ts           # valid/invalid perfil fixtures

src/content/schools/real/lichtenbergPrimarySchools/
└── index.ts              # author 5 pilots only

docs/research/
├── PILOT_SELECTION.md    # keep selection rationale; optional pointer to log
└── PHASE14_COMMUNITY_TRIANGULATION.md   # recommended fuller log path (discretion)

docs/DATA_MODEL.md        # document perfilDaEscola + notes + qualitative gate extension
```

### Pattern 1: Additive optional qualitative fields

**What:** Add optional strings so non-pilots omit fields and stay valid without dates.  
**When to use:** Always for v1.2 qualitative content (matches Phase 13 tags pattern).  
**Example:**

```typescript
// Source: locked D-02 / D-17; mirrors Phase 13 qualitativeLastReviewed pattern
perfilDaEscola: z.string().trim().min(1).optional(),
qualitativeResearchNotes: z.string().trim().min(1).optional(),
qualitativeLastReviewed: z.string().date().optional(), // existing
```

### Pattern 2: Cross-field qualitative refine

**What:** Encode D-03/D-04 in `superRefine` beside the existing tags→date check.  
**When to use:** Any school with qualitative content.  
**Example:**

```typescript
// Source: D-03, D-04 — replace tags-only date gate
const hasTags = (school.tags?.length ?? 0) > 0;
const hasPerfil = Boolean(school.perfilDaEscola);

if (hasTags && !school.perfilDaEscola) {
  context.addIssue({
    code: "custom",
    path: ["perfilDaEscola"],
    message: "Schools with tags must include perfilDaEscola.",
  });
}

if ((hasTags || hasPerfil) && !school.qualitativeLastReviewed) {
  context.addIssue({
    code: "custom",
    path: ["qualitativeLastReviewed"],
    message:
      "Schools with tags or perfilDaEscola must include qualitativeLastReviewed (YYYY-MM-DD).",
  });
}
```

### Pattern 3: Author tags against existing `validateTagEvidence`

**What:** Reuse Phase 13 fixtures as the authoring checklist — especially for `active-school-community`.  
**When to use:** Every published tag.  
**Example shape (community publish):**

```typescript
// Source: src/features/evidence/validateTagEvidence/fixtures.ts validCommunityTag
{
  id: "active-school-community",
  confidence: "confirmed_multi_source", // must match deriveExpectedConfidence
  citations: [
    { sourceId: "…-community-a", independenceLog: { /* distinct venue */ } },
    { sourceId: "…-community-b", independenceLog: { /* distinct venue */ } },
    { sourceId: "…-official-or-website" }, // never sole basis
  ],
}
```

Community sources must be real `sources[]` entries with `type: "triangulated_community"`, `reliability: "anecdotal"` (Phase 13 D-04 mapping), valid URLs, and `dateAccessed` ISO dates. Independence log venues must be **distinct** (machine-checked).

### Pattern 4: Pilot authoring without touching non-pilots

**What:** Prefer spreading qualitative fields onto specific `primarySchool()` results, or extend `BaseSchoolInput` optionally.  
**Recommendation (discretion):** Extend `BaseSchoolInput` + `primarySchool` return with optional `tags`, `perfilDaEscola`, `qualitativeLastReviewed`, `qualitativeResearchNotes` so authors keep one object per school. Post-spread `{ ...primarySchool(...), ... }` is equally valid and minimizes factory churn — pick one consistently.

```typescript
// Source: existing primarySchool pattern in lichtenbergPrimarySchools/index.ts
primarySchool({
  // ...existing factual input...
  tags: [/* sparse */],
  perfilDaEscola: "…",
  qualitativeLastReviewed: "2026-07-29",
  qualitativeResearchNotes: "…", // only when needed (withhold)
})
```

### Name collision: `schoolProfile` vs `perfilDaEscola`

**Critical:** `schoolProfile` already exists as a **factual** `FieldValue<string>` (often German offers / portrait text with evidence status). `perfilDaEscola` is the **qualitative** PT-BR editorial synthesis. Do not rename or overload `schoolProfile`. Document the distinction in `docs/DATA_MODEL.md`. `[VERIFIED: school/index.ts + lichtenbergPrimarySchools]`

### Anti-Patterns to Avoid

- **Auto-deriving tags from factual fields:** verified Ganztag ≠ `all-day-model`; SESB ≠ automatic `bilingual-program` (EDITORIAL_GUIDE Facts Versus Tags).
- **Inventing tags for taxonomy coverage / quotas:** rejected (D-07).
- **Synthetic community sources to force PILOT-03 green:** rejected (D-12).
- **Putting uncited facts in perfil:** violates NARR-02 / D-10.
- **Ranking / reputation language** in perfil or tag rationale: EDITORIAL_GUIDE banned phrases.
- **Mutating non-pilot factual fields** while authoring pilots: breaks VAL-01 / D-19.
- **Requiring a published community tag** for phase done: CONTEXT D-14 overrides stricter ROADMAP wording (see Open Questions).
- **MDX/Markdown in perfil:** rejected for v1.2 (D-02).
- **UI work:** Phase 15 only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tag triangulation rules | Custom one-off checks in content file | `validateTagEvidence` via `schoolSchema` | Already encodes ≥2 community + never-sole-basis + confidence |
| Confidence label choice | Free-form strings | Closed enum + derived consistency | Wrong confidence fails parse |
| Independence log shape | Ad-hoc notes only | `independenceLogSchema` on citations | Machine-validated venue distinctness |
| Perfil storage | MDX pipeline / CMS | Optional string on school | Locked D-01; static-first |
| Data gate | Manual eyeballing only | `pnpm validate:data` | Existing CI/workflow gate |
| Community source types | Misuse `anecdotal_reserved` for displayable community | `triangulated_community` | Reserved type is non-displayable |

**Key insight:** Phase 14 success is **methodology exercised on real data**, not a new validation framework. Hand-rolling parallel citation systems or UI would expand scope into Phases 13/15.

## Common Pitfalls

### Pitfall 1: Conflating ROADMAP SC#3 with CONTEXT D-14

**What goes wrong:** Plan treats a published `active-school-community` tag as mandatory.  
**Why it happens:** ROADMAP success criterion 3 still says “at least one tag … backed by ≥2 independent … community sources.”  
**How to avoid:** Honor CONTEXT D-14 (1A): documented attempt + publish **or** withhold satisfies PILOT-03. Update plan acceptance criteria accordingly; optionally note ROADMAP wording drift for Phase 16 cleanup.  
**Warning signs:** Tasks that fail the phase if Tolstoi venues are insufficient.

### Pitfall 2: Facts≠tags violations on rich pilots

**What goes wrong:** Wagner gets `arts-music-focus` and `all-day-model` and `special-pedagogical-model` because offers list music + OGB + Hochbegabung.  
**Why it happens:** Pressure to “fully tag” PILOT-01.  
**How to avoid:** Tag only sustained character beyond the factual field; zero tags + perfil is success on thin schools; for Wagner, music focus is the strongest candidate — still require citations that support “what kind of school,” not merely “has offer X.”  
**Warning signs:** Tag count correlating with documentation richness.

### Pitfall 3: Confidence mismatch after adding a second source

**What goes wrong:** Author sets `confirmed_official` but cites portrait + website → validator expects `confirmed_multi_source`.  
**Why it happens:** `deriveExpectedConfidence` is deterministic. `[VERIFIED: validateTagEvidence/index.ts]`  
**How to avoid:** After choosing citations, set confidence to the derived value (or run validate:data and fix).  
**Warning signs:** `Declared confidence X does not match derived Y` in validate errors.

### Pitfall 4: Community tag missing never-sole-basis corroboration

**What goes wrong:** Two Facebook/Reddit sources, no official/journalism citation.  
**Why it happens:** Focus on independence, forget D-07.  
**How to avoid:** Always include ≥1 allowlisted non-community citation; official corroboration should speak to community participation where possible (e.g. school site Eltern/Förderverein pages) — if only generic portrait exists, editorial may still fail-closed.  
**Warning signs:** `requires ≥1 non-community allowlisted citation`.

### Pitfall 5: `schoolProfile` vs `perfilDaEscola` confusion

**What goes wrong:** Authors overwrite German factual `schoolProfile` with PT-BR narrative, or skip `perfilDaEscola` thinking `schoolProfile` is the Perfil.  
**Why it happens:** Similar names.  
**How to avoid:** Keep both; document in DATA_MODEL; perfil is plain PT-BR string without FieldEvidence wrapper.  
**Warning signs:** Perfil text appearing inside `schoolProfile.value` or evidence wrappers.

### Pitfall 6: Non-pilot drift / coverage silent change

**What goes wrong:** Touching Adam-Ries or others while editing the shared file; or “refreshing” factual fields on pilots and changing coverage.  
**Why it happens:** Single large content file.  
**How to avoid:** Diff discipline — only pilot qualitative fields (+ Tolstoi community sources if published); run validate:data; treat VAL-01 as a phase gate preview.  
**Warning signs:** Unexpected hunks on non-pilot school objects.

### Pitfall 7: Empty tags array vs omitted tags

**What goes wrong:** Setting `tags: []` and incorrectly requiring perfil/date, or vice versa.  
**Why it happens:** Phase 13 treats empty array as “no tags” for the date gate (`length > 0`). `[VERIFIED: school/index.ts]`  
**How to avoid:** Keep gate on `(tags?.length ?? 0) > 0`; prefer omit `tags` on non-pilots; pilots with zero tags should omit `tags` or use `[]` and still ship `perfilDaEscola` + date.

## Code Examples

Verified patterns from the codebase:

### Valid tagged school fixture (Phase 13)

```typescript
// Source: src/features/schools/school/fixtures.ts
export const validTaggedSchool = {
  ...validDirectoryOnlySchool,
  sources: [officialDirectorySource, schoolWebsiteSource, journalismSource, communitySourceA, communitySourceB],
  tags: [
    {
      id: "stem-focus" as const,
      confidence: "confirmed_official" as const,
      citations: [{ sourceId: schoolWebsiteSource.id }],
    },
  ],
  qualitativeLastReviewed: "2026-07-29",
};
```

### Independence log required shape

```typescript
// Source: src/features/evidence/independenceLog/index.ts
{
  venue: z.string().min(1),
  identifier: z.string().min(1),
  dateAccessed: z.string().date(),
  independenceRationale: z.string().min(1),
  echoCheckNote: z.string().min(1),
}
```

### Community source authoring defaults

```typescript
// Source: Phase 13 D-04 + source/fixtures.ts communitySourceA
{
  id: "lew-tolstoi-community-…",
  title: "…",
  url: "https://…", // must be valid URL (sourceSchema)
  type: "triangulated_community",
  reliability: "anecdotal",
  publisher: "…",
  dateAccessed: "YYYY-MM-DD",
}
```

## Pilot Evidence Snapshot (current data)

`[VERIFIED: lichtenbergPrimarySchools/index.ts + PILOT_SELECTION.md]` as of research date:

| School | researchStatus | Likely qualitative posture | Notes |
|--------|----------------|----------------------------|-------|
| Richard-Wagner-Schule | `profile_ready` | Strongest tag candidate (`arts-music-focus` if sustained beyond offers); short perfil synthesizing music + verified fields | 4 extra sources including music + inspection pages |
| Lew-Tolstoi-Schule | `profile_ready` | SESB bilingual character → careful `bilingual-program` judgment (facts≠tags); **community triangulation target** | Website + ganztag sources; GGB |
| Bernhard-Grzimek-Schule | `directory_only` | Possible thin `stem-focus` from portrait MINT claim **or** zero tags; sparse perfil | Portrait-only beyond directory; low-doc (PILOT-02) |
| Friedrichsfelder Schule | `directory_only` | Expect **zero tags** + sparse perfil | Typical neighbourhood |
| Seepark-Grundschule | `directory_only` | Expect **zero tags** + sparse perfil | Thinnest; no ganztag/offers |

Non-pilots (untouched): Adam-Ries, Bürgermeister-Ziethen, Tränkegraben, Schmetterlings, Karlshorster.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tags undocumented | Closed taxonomy + Zod validators | Phase 12–13 (2026-07) | Author against schema, not vibes |
| Community as reliability | `triangulated_community` source type | Phase 13 | Use correct source type when publishing |
| Qualitative date only for tags | Date for tags **or** perfil | Phase 14 (this) | Extend refine before authoring |
| No perfil field | `perfilDaEscola` optional string | Phase 14 | Enables NARR-02 storage pre-UI |

**Deprecated/outdated:**
- Treating ROADMAP “published community tag” wording as harder than CONTEXT 1A — CONTEXT wins for this phase.
- Using `schoolProfile` as the family-facing Perfil narrative.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Recommended docs log path `docs/research/PHASE14_COMMUNITY_TRIANGULATION.md` is acceptable (discretion) | Architecture / D-16 | Rename only; no schema impact |
| A2 | Extending `primarySchool()` input is preferable to post-spread for the 5 pilots | Pattern 4 | Planner may choose post-spread — both valid |
| A3 | Live Tolstoi venues may be insufficient → withhold is the probable outcome | PILOT-03 / Pitfalls | Plan must not require publish; research session found no useful public venue hits `[ASSUMED: web search empty ≠ venues absent]` |
| A4 | `qualitativeResearchNotes` alone should not require `qualitativeLastReviewed` (notes are research metadata; date gated by tags/perfil) | Schema refine | If product wants notes⇒date, add refine — low risk because pilots always get perfil |

**If empty table were required:** A1–A4 need planner/executor confirmation only where marked; locked decisions do not.

## Open Questions (RESOLVED)

1. **ROADMAP vs CONTEXT on PILOT-03** — **RESOLVED (planning 2026-07-29)**
   - Locked: Plan acceptance = CONTEXT D-14 (attempt + publish **or** documented withhold). ROADMAP SC#3 is satisfied by the documented triangulation exercise; a published community tag is not mandatory for phase completion. Optional ROADMAP wording cleanup deferred to Phase 16.

2. **What official signal corroborates `active-school-community`?** — **RESOLVED (planning 2026-07-29)**
   - Locked: Prefer Eltern/Förderverein/community-activity pages for official corroboration. If only a generic school site + community chatter exists → fail-closed (omit tag).

3. **Should DATA_MODEL document `perfilDaEscola` in this phase?** — **RESOLVED (planning 2026-07-29)**
   - Locked: Yes — Plan 02 updates `docs/DATA_MODEL.md` with `perfilDaEscola` (+ `qualitativeResearchNotes`) field shapes and the extended qualitativeLastReviewed gate. Research log filename locked to `docs/research/PHASE14_COMMUNITY_TRIANGULATION.md`.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | validate:data / jest | ✓ | v24.12.0 | — |
| pnpm (Corepack) | scripts | ✓ | 11.11.0 | — |
| Jest | schema tests | ✓ | 30.4.2 | — |
| tsx | `pnpm validate:data` | ✓ | 4.21.0 | — |
| Zod (in-repo) | schema | ✓ | 4.4.3 | — |
| Network / browser for live community research | PILOT-03 | ✓ (executor session) | — | Fail-closed withhold + docs log (D-13) |

**Missing dependencies with no fallback:** None for schema/content work.

**Missing dependencies with fallback:** Public community venues may be absent → withhold path.

**Baseline gate:** `pnpm validate:data` currently green — “Validated 2 fixture school(s) and 10 real school record(s).” `[VERIFIED: CLI 2026-07-29]`

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest **30.4.2** |
| Config file | `jest.config.mjs` |
| Quick run command | `pnpm exec jest src/features/schools/school/index.test.ts src/features/evidence/validateTagEvidence/index.test.ts --no-coverage` |
| Full suite command | `pnpm test` |
| Data gate | `pnpm validate:data` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NARR-02 (schema) | `perfilDaEscola` optional trim min(1); tags without perfil rejected; perfil without date rejected; omit both OK | unit | `pnpm exec jest src/features/schools/school/index.test.ts --no-coverage` | ⚠️ extend existing (Wave 0) |
| NARR-02 (editorial) | Perfil synthesizes cited evidence only; no ranking language | manual review | Human checklist vs EDITORIAL_GUIDE + school sources | ❌ manual-only (D-10) |
| PILOT-01 | All 5 pilots have `perfilDaEscola` + `qualitativeLastReviewed`; tags sparse-honest | gate + review | `pnpm validate:data` + diff review of 5 slugs | ⚠️ validate:data exists; content assertion manual/grep |
| PILOT-02 | ≥1 low-doc school in pilot set with authored perfil | review | Grep Seepark/Grzimek for `perfilDaEscola`; confirm `directory_only` unchanged | ❌ checklist |
| PILOT-03 | Live triangulation attempt documented; publish valid tag **or** notes+docs log | gate + docs | `pnpm validate:data` if published; else assert `qualitativeResearchNotes` + research log file exists | ⚠️ partial Wave 0 |
| VAL-01 preview | Non-pilots unchanged | review / diff | `git diff` limited to pilots + schema/docs | ❌ manual |
| Regression | Existing tag validators still green | unit | `pnpm exec jest src/features/evidence/validateTagEvidence --no-coverage` | ✅ |

### Sampling Rate

- **Per task commit:** schema unit tests above + `pnpm validate:data`
- **Per wave merge:** `pnpm test` + `pnpm validate:data`
- **Phase gate:** Full suite green + validate:data + research log present (if withhold) before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] Extend `src/features/schools/school/fixtures.ts` — valid school with perfil only; valid tags+perfil+date; invalid tags without perfil; invalid perfil without date
- [ ] Extend `src/features/schools/school/index.test.ts` — cover D-03/D-04 cross-field cases (before or with schema change; TDD preferred)
- [ ] No new test runner/framework needed
- [ ] Optional: lightweight content smoke test or script asserting five pilot slugs expose `perfilDaEscola` — nice-to-have, not required if validate:data + human checklist cover PILOT-01

*(Existing Jest + validate:data infrastructure covers schema/regression; editorial NARR-02 and sparse-tag judgment remain human.)*

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Static site; no accounts (AGENTS.md V1) |
| V3 Session Management | no | — |
| V4 Access Control | no | Public static content |
| V5 Input Validation | yes | Zod on school records (`trim().min(1)`, URL sources, date strings) |
| V6 Cryptography | no | — |

### Known Threat Patterns for static school content

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Malformed / hostile strings in authored content | Tampering | Zod parse at validate/load; React text escaping at render (Phase 15) |
| Invalid URLs in community sources | Tampering | `z.string().url()` on `sourceSchema` |
| Accidental PII in research notes (parent names) | Information disclosure | Editorial discipline — summarize venues, avoid naming individuals in public notes |
| Prompt-injection-like junk in scraped community quotes | Tampering | Prefer paraphrase + independence log; optional `quote` field is author-controlled |

## Sources

### Primary (HIGH confidence)

- `.planning/phases/14-pilot-profile-content/14-CONTEXT.md` — locked decisions D-01–D-19
- `src/features/schools/school/index.ts` — current schema + tags→date refine
- `src/features/evidence/validateTagEvidence/index.ts` + `fixtures.ts` — triangulation rules
- `src/features/schools/tagTaxonomy/index.ts` — closed tag IDs + confidence
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — 10 schools, factory, pilot evidence
- `docs/research/PILOT_SELECTION.md` — named set + Tolstoi community candidate
- `docs/EDITORIAL_GUIDE.md` — Perfil voice, Facts Versus Tags
- `docs/RESEARCH.md` — Community Source Independence
- `docs/DATA_MODEL.md` — Tag Taxonomy, Qualitative Review Tracking
- `package.json` / CLI — zod/jest versions; validate:data green baseline
- `.planning/phases/13-evidence-tag-schema-layer/13-CONTEXT.md` + `13-RESEARCH.md` — prior schema research

### Secondary (MEDIUM confidence)

- WebSearch for Lew-Tolstoi parent venues (2026-07-29) — no useful hits in this session; does **not** prove absence of venues

### Tertiary (LOW confidence)

- Assumed probable withhold outcome for Tolstoi pending live executor research (A3)

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — no new packages; verified in-repo versions and green validate:data
- Architecture: **HIGH** — clear extension points; locked field names; Phase 13 validators ready
- Pitfalls: **HIGH** — derived from locked decisions + verified validator behavior; ROADMAP/CONTEXT tension explicitly flagged
- Live community publishability: **LOW** until executor research — mitigated by fail-closed path

**Research date:** 2026-07-29  
**Valid until:** 2026-08-28 (30 days; content/policy stable; re-verify if Phase 13 validators change)
