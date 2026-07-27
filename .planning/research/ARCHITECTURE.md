# Architecture Research

**Domain:** Evidence-backed school profile intelligence (tags + editorial narrative + mixed-source evidence) integrated into an existing static Next.js school-profile architecture
**Researched:** 2026-07-26
**Confidence:** HIGH (grounded directly in current codebase — `src/features/schools/school`, `src/features/evidence/*`, `src/features/schools/SchoolProfile`, `docs/DATA_MODEL.md`, `docs/RESEARCH.md`, `docs/DECISIONS.md` — not external ecosystem speculation)

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        Framework docs (source of truth)                  │
│  docs/RESEARCH.md (source hierarchy + tag rules) · docs/EDITORIAL_GUIDE  │
│  .md (narrative voice) · docs/DATA_MODEL.md (field shapes) · docs/       │
│  DECISIONS.md (why)  — authored first, code encodes these rules          │
├──────────────────────────────────────────────────────────────────────────┤
│                      Content layer (src/content/schools)                 │
│  real/lichtenbergPrimarySchools/index.ts — existing 10 schools           │
│  3-5 pilot schools gain: tags[] + editorial{official, community}         │
│  (MODIFIED, additive, optional fields — other 5-7 schools untouched)     │
├──────────────────────────────────────────────────────────────────────────┤
│                 Schema layer (src/features/schools, .../evidence)        │
│  schoolSchema (MODIFIED: +tags?, +editorial?)                            │
│  tag/ (NEW) · tagTaxonomy/ (NEW) · sourceTypeSchema (MODIFIED: +values)  │
│  validateTagEvidence (NEW) · fieldEvidence / source / validateField-     │
│  Citations (UNCHANGED — reused as-is)                                    │
├──────────────────────────────────────────────────────────────────────────┤
│                    Build-time data flow (unchanged mechanism)            │
│  schoolSchema.parse() → School → getSchoolBySlug() → page.tsx            │
│  pnpm validate:data → schoolSchema.safeParse() over all content          │
├──────────────────────────────────────────────────────────────────────────┤
│                 Profile UI composition (src/features/schools)            │
│  SchoolProfile (MODIFIED: conditionally renders new sections)            │
│  ├─ header (unchanged)                                                   │
│  ├─ EditorialNarrative (NEW) — official synthesis vs community profile   │
│  ├─ TagsSection (NEW) — evidence-backed tags, grouped by category        │
│  ├─ ProfileSection × N (unchanged existing fact sections)                │
│  └─ SourcesSection (MODIFIED: collectCitedSources also walks tags/       │
│     editorial citations)                                                 │
├──────────────────────────────────────────────────────────────────────────┤
│         Directory / Compare (SchoolCard, ComparisonTable) — UNTOUCHED    │
│         Tags/editorial are profile-only this milestone (explicit scope)  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Status | Responsibility | Typical Implementation |
|-----------|--------|-----------------|-------------------------|
| `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, `docs/DECISIONS.md` | **Modified** | Canonical framework: source hierarchy extension (journalism/community), tag taxonomy rules, narrative voice for official vs community sections, decision log entries | Prose docs edited before any schema code, per `AGENTS.md` ("check relevant docs before data-model changes") |
| `schoolSchema` (`src/features/schools/school/index.ts`) | **Modified** | Composes new optional `tags` and `editorial` blocks; extends `.superRefine()` with tag/narrative citation-quality rules | Add two optional fields; add validation branches alongside the existing citation gate loop |
| `tag/` (new unit) | **New** | Zod schema + type for a single school-level tag: taxonomy id, confidence, evidence entries (which may span official/journalism/community sources) | `src/features/schools/tag/index.ts`, mirrors `fieldEvidence`/`source` schema style |
| `tagTaxonomy/` (new unit) | **New** | Canonical, versioned catalog of valid tag ids + PT-BR labels + categories, referenced by id from school records (never duplicated inline) | `src/features/schools/tagTaxonomy/{index.ts,constants.ts}`, same pattern as `schoolClassification` enums |
| `sourceTypeSchema` (`src/features/evidence/sourceTypes/index.ts`) | **Modified (additive)** | Adds `journalism` and a community-signal type usable outside the reserved-only `anecdotal_reserved` case, so tags can cite non-official sources explicitly and visibly | Extend the existing `z.enum([...])`; add a `getSourceCategory()` helper mapping type → `official \| journalism \| community` for UI grouping |
| `validateTagEvidence/` (new unit) | **New** | Cross-checks each tag's citations resolve to real `school.sources[]` entries and enforces "community is never the sole basis for a tag" | `src/features/evidence/validateTagEvidence/index.ts`, mirrors `validateFieldCitations` exactly |
| `fieldEvidence`, `source`, `validateFieldCitations`, `calculateEvidenceCoverage` | **Unchanged** | Existing field-level evidence primitives keep governing the existing fact fields; coverage v1 denominator is not touched | Reused as-is; tags/editorial deliberately excluded from the coverage calculation |
| `SchoolProfile` (`src/features/schools/SchoolProfile/index.tsx`) | **Modified** | Inserts `EditorialNarrative` and `TagsSection` conditionally (`school.editorial`/`school.tags` present); layout for schools without these fields is byte-identical to today | Two new conditional blocks between header and `PROFILE_SECTIONS.map(...)` |
| `EditorialNarrative` (new component) | **New** | Renders "Perfil oficial" (official synthesis) and "Perfil da comunidade" (community profile) as two clearly-labeled blocks with per-block source-type badge and inline citations | New directory under `src/features/schools/EditorialNarrative/` |
| `TagsSection` (new component) | **New** | Renders tags grouped by taxonomy category, each showing confidence + source-type badge + expandable evidence, linking into the consolidated `Fontes` section | New directory under `src/features/schools/TagsSection/` |
| `SourceCategoryBadge` or extended `formatSourceType` | **New / Modified** | Small presentational unit distinguishing official / journalism / community visually, reused by `TagsSection`, `EditorialNarrative`, and `SourcesSection` | Extend `src/features/evidence/formatSourceType/` or add a sibling `src/features/evidence/sourceCategory/` unit once 2+ call sites exist |
| `collectCitedSources` (`src/features/schools/collectCitedSources/`) | **Modified** | Must also walk `tags[].evidence` and `editorial.*.citations` so the `Fontes` section stays the single consolidated source list | Extend the existing collection walk, not a second parallel "sources" mechanism |
| `SchoolCard`, `ComparisonTable`, `filterSchools`, directory filter options | **Unchanged** | Tags/editorial narrative are explicitly out of scope for directory cards and compare this milestone | No changes; do not thread tag data into these components yet |

## Recommended Project Structure

```
src/
├── features/
│   ├── evidence/
│   │   ├── sourceTypes/            # MODIFIED: add journalism/community-signal values + getSourceCategory()
│   │   ├── validateTagEvidence/    # NEW: mirrors validateFieldCitations, adds "not community-only" rule
│   │   └── (fieldEvidence, source, validateFieldCitations, calculateEvidenceCoverage — unchanged)
│   └── schools/
│       ├── school/                 # MODIFIED: schoolSchema gains optional tags/editorial + superRefine branches
│       ├── tag/                    # NEW: tagSchema, TagConfidence, Tag type
│       ├── tagTaxonomy/            # NEW: canonical tag catalog (id, category, PT-BR label, description)
│       ├── SchoolProfile/          # MODIFIED: conditionally renders new sections
│       ├── EditorialNarrative/     # NEW: official vs community narrative blocks
│       ├── TagsSection/            # NEW: evidence-backed tag chips grouped by category
│       └── collectCitedSources/    # MODIFIED: also walks tag/editorial citations
├── content/
│   └── schools/
│       ├── real/lichtenbergPrimarySchools/  # MODIFIED: 3-5 records gain tags/editorial (additive)
│       └── fixtures/               # NEW fixtures: valid/invalid tag + editorial shapes for schema tests
docs/
├── RESEARCH.md                     # MODIFIED: extend source hierarchy, tag evidence rules, triangulation definition
├── EDITORIAL_GUIDE.md              # MODIFIED: narrative voice for official synthesis vs community profile
├── DATA_MODEL.md                   # MODIFIED: document tags/editorial field shapes
└── DECISIONS.md                    # MODIFIED: log the tag taxonomy + source-category decisions
```

### Structure Rationale

- **No new top-level domain folder.** Tags and editorial narrative are school-profile concepts, not a separate product domain — they belong inside `src/features/schools/` and `src/features/evidence/`, following the existing `AGENTS.md` rule to evolve the current architecture rather than invent new top-level abstractions.
- **`tagTaxonomy/` is separate from `tag/`** for the same reason `schoolClassification` is separate from the field that uses it: the taxonomy is a shared, versioned catalog (like the source registry pattern already decided in `docs/DECISIONS.md` — "school-level sources with field-level citations"), while `tag/` is the per-school schema that references taxonomy ids.
- **No generic "evidence-backed content block" abstraction.** Tags and editorial narrative both need citation/provenance, which is genuinely two concrete use cases — enough to justify a shared *validation helper* (`validateTagEvidence` reusing the same source-resolution logic as `validateFieldCitations`), but not enough to justify collapsing `FieldValue<T>`, tags, and narrative into one unified "evidence block" type. Keep three distinct, purpose-built shapes.
- **Content stays in the existing real-schools module.** Pilot schools are existing Lichtenberg records, not new content sources, so tags/editorial are added in place in `lichtenbergPrimarySchools/index.ts`. Only split into per-school files if the module becomes unwieldy after the pilot content is authored — do not pre-split speculatively.

## Architectural Patterns

### Pattern 1: Extend the field-value pattern for tags, don't reinvent it

**What:** A tag is not a single fact with one value — it is a taxonomy reference plus a confidence judgment plus a list of evidence entries that may span multiple source categories. Model it as its own small schema that *reuses* the existing `fieldCitationSchema`/`Source` resolution mechanics rather than nesting a `FieldValue<T>`.

**When to use:** Whenever new evidence-backed content needs citations but isn't a 1:1 "field has a value" case (tags are many-to-one with a school; narrative sections are prose, not scalar values).

**Trade-offs:** Slightly more schema surface than shoehorning tags into `FieldValue<string[]>`, but far clearer validation (confidence rules, community-sole-basis rule) and UI code (grouping by category, showing multiple sources per tag) than fighting the existing single-value/single-status shape.

**Example:**
```typescript
// src/features/schools/tag/index.ts
export const tagConfidenceSchema = z.enum(["confirmed", "reported", "emerging"]);

export const tagEvidenceEntrySchema = fieldCitationSchema; // reuse, don't duplicate

export const tagSchema = z
  .object({
    id: z.string().min(1), // references tagTaxonomy catalog id
    confidence: tagConfidenceSchema,
    evidence: z.array(tagEvidenceEntrySchema).min(1),
    note: z.string().optional(),
  })
  .superRefine((tag, ctx) => {
    // "confirmed" requires official evidence or triangulated community/journalism —
    // exact threshold is a docs/RESEARCH.md framework decision, enforced here.
  });

export type Tag = z.infer<typeof tagSchema>;
```

### Pattern 2: Structured narrative fields, not per-school MDX

**What:** Model "official synthesis" and "community profile" as structured, citable string fields on `schoolSchema` (e.g. `editorial: { official: FieldValue<string>, community: FieldValue<string> }`), rendered by splitting on paragraph breaks — not as a new per-school MDX content pipeline.

**When to use:** Any narrative text that must carry the same evidence/citation guarantees as the rest of the profile.

**Trade-offs:** MDX would allow richer formatting (lists, inline links, custom shortcodes) and matches how guides already work, but it would fragment the evidence model into two parallel systems: Zod-validated facts and unvalidated-provenance MDX prose. Since `docs/EDITORIAL_GUIDE.md` requires citations to be "visible near factual claims," an MDX-per-school pipeline would need a custom citation shortcode component wired back into `school.sources` anyway — that's more machinery than 3-5 pilot schools justify. Structured strings keep one validated source of truth and reuse `FieldValue<string>` + the existing citation gate unmodified.

**Example:**
```typescript
// schoolSchema addition
editorial: z
  .object({
    official: createFieldValueSchema(z.string().min(1)),
    community: createFieldValueSchema(z.string().min(1)),
  })
  .optional(),
```

### Pattern 3: Additive-only schema changes to preserve "others unchanged"

**What:** Every new field (`tags`, `editorial`) is `.optional()` on `schoolSchema`, and every new `sourceTypeSchema` enum value is additive. No existing field is renamed, restructured, or made required.

**When to use:** Any schema change during a pilot/rollout milestone where most content must remain untouched and re-validated without edits.

**Trade-offs:** Optional fields mean `SchoolProfile` and `collectCitedSources` need conditional branches (`school.tags ? ... : null`), which is marginally more branching than a uniform required shape — but it's the only way to guarantee the 5-7 non-pilot schools keep validating and rendering exactly as they do today, satisfying "pilot subset of schools; others unchanged."

## Data Flow

### Content-to-page flow (unchanged mechanism, extended shape)

```
docs/ framework (tag rules, narrative voice)
    ↓ (informs)
tagTaxonomy catalog + tagSchema + editorial fields on schoolSchema
    ↓
lichtenbergPrimarySchools/index.ts (3-5 records get tags[] + editorial{})
    ↓
schoolSchema.parse() [schoolDirectoryData / getSchoolBySlug] — unchanged call sites
    ↓
School object now optionally carries .tags and .editorial
    ↓
SchoolProfile renders EditorialNarrative + TagsSection only if present
    ↓
collectCitedSources walks facts + tags + editorial → SourcesSection (single Fontes list)
```

### Validation flow (build/CI time, extended rules)

```
pnpm validate:data
    ↓
schoolSchema.safeParse() over every fixture + every real record
    ↓
.superRefine() now also runs:
  - validateTagEvidence(tag.evidence, school.sources) per tag
  - "community not sole basis" check per tag
  - editorial.official / editorial.community citation checks (reuses existing verified-field gate)
    ↓
Non-pilot schools have no tags/editorial → these branches are simply skipped (no new failures)
```

### Key Data Flows

1. **Tag evidence resolution:** identical mechanics to field citations today — a tag's `evidence[].sourceId` must resolve into `school.sources[]`, and `isAcceptableReliabilityLevel`-style logic decides whether a tag can be `confirmed`. This is the same pattern as the existing citation quality gate, applied to a new shape.
2. **Coverage isolation:** `calculateEvidenceCoverage` and `importantSchoolFieldPathsV1` are **not** touched. Tags/editorial must never silently change the meaning of the existing, versioned coverage percentage (per `docs/DECISIONS.md` — coverage changes require an explicit new version). If an "editorial completeness" signal is wanted later, it should be a separate, clearly-labeled indicator, not folded into `coverage.percentage`.
3. **Source-consolidation flow:** `Fontes` must remain the single place all citations resolve to, regardless of whether they originate from a fact field, a tag, or a narrative block — this is why `collectCitedSources` is modified rather than adding a second sources section under `TagsSection`/`EditorialNarrative`.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|---------------------------|
| 3-5 pilot schools (this milestone) | Author tags/editorial directly in `lichtenbergPrimarySchools/index.ts`; one shared taxonomy file is plenty; no tooling needed beyond `pnpm validate:data` |
| 10 Lichtenberg schools (existing directory, partial rollout) | Same file, same taxonomy; watch file length — split into per-school modules only if `lichtenbergPrimarySchools/index.ts` becomes hard to navigate |
| 20-30 pilot profiles (M9, deferred) | Taxonomy catalog needs governance (who can add a new tag id, what counts as "confirmed") — this is where the framework doc pays off; still no runtime/backend needed |
| Berlin-wide (M8, deferred) | Tag authoring cost becomes the real bottleneck, not the schema — the architecture itself does not need to change, editorial throughput does |

### Scaling Priorities

1. **First bottleneck:** Editorial authoring time for narrative + tag evidence per school (a research/process problem, not a code problem) — the framework doc and taxonomy exist specifically to make this repeatable.
2. **Second bottleneck:** Taxonomy drift (inconsistent tag ids/labels across schools) once past a handful of profiles — mitigated by referencing tags by id from a single catalog rather than inlining labels per school, exactly as sources are already deduplicated.

## Anti-Patterns

### Anti-Pattern 1: Promoting tags into `SchoolCard`/`ComparisonTable` this milestone

**What people do:** Since tags are visually appealing, it's tempting to also surface them on directory cards or the compare view "since the data is already there."
**Why it's wrong:** `docs/PRODUCT.md`/`.planning/PROJECT.md` explicitly defers this ("Directory stays factual/lightweight; tags on cards/compare deferred to a later iteration") until the pilot methodology is validated. Doing it now expands scope and couples `SchoolCard`/`ComparisonTable` to an unvalidated data shape.
**Do this instead:** Keep `TagsSection`/`EditorialNarrative` profile-only; do not import tag types into `filterSchools`, `SchoolCard`, or `ComparisonTable`.

### Anti-Pattern 2: Building an MDX-per-school narrative pipeline

**What people do:** Reach for MDX for "editorial narrative" because guides already use MDX.
**Why it's wrong:** Guides are narrative-only content with no per-sentence evidence requirement. School narrative must carry the same citation guarantees as every other factual field (`docs/RESEARCH.md`: "every factual school attribute requires a source"). A parallel MDX pipeline would need custom shortcodes to reference `school.sources`, duplicating validation logic that already exists for structured fields.
**Do this instead:** Structured `FieldValue<string>` narrative fields on `schoolSchema`, rendered with simple paragraph splitting.

### Anti-Pattern 3: Folding tag/editorial completeness into `evidenceCoverage`

**What people do:** Add tags/editorial fields to `importantSchoolFieldPathsV1` so the trust percentage "reflects everything."
**Why it's wrong:** Coverage v1 is versioned and its meaning ("research completeness for important V1 fields") is already load-bearing product language across the directory filter, profile header, and methodology page. Silently changing its inputs breaks that contract and makes historical coverage numbers non-comparable.
**Do this instead:** Leave coverage v1 untouched. If a similar signal is wanted for tags/editorial, introduce a distinctly-named, separately-versioned metric.

### Anti-Pattern 4: A generic `EvidenceBlock<T>` unification

**What people do:** Notice that facts, tags, and narrative all "have evidence" and try to generalize into one polymorphic evidence-block type/component before shipping the pilot.
**Why it's wrong:** `AGENTS.md` explicitly warns against generic abstractions before at least two concrete use cases exist and have proven the actual variation needed. Facts (single value + single status), tags (multi-source + confidence + taxonomy id), and narrative (prose + per-block source category) have different enough shapes that a shared supertype would need escape hatches everywhere, defeating the purpose.
**Do this instead:** Three distinct schemas (`FieldValue<T>` unchanged, new `tagSchema`, new `editorial` field group) sharing only the citation-resolution helper (`validateFieldCitations`/`validateTagEvidence`), which is genuinely reusable logic, not a type hierarchy.

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|----------------|-------|
| `docs/RESEARCH.md`/`docs/EDITORIAL_GUIDE.md` ↔ `tagTaxonomy`/`tagSchema`/`EditorialNarrative` | Docs define rules first; code encodes them | Must be written/updated before schema work starts — this is the "framework as product asset" deliverable from `.planning/PROJECT.md` |
| `sourceTypeSchema` ↔ `Tag.evidence` / `editorial.*.evidence.citations` | New enum values consumed by both new schemas | Additive enum change; existing `Source` records are unaffected |
| `schoolSchema.superRefine` ↔ `validateTagEvidence` | Cross-field validation call, same style as existing `validateFieldCitations` call | Runs inside the same `.superRefine()` block already present in `school/index.ts`, not a new validation entry point |
| `SchoolProfile` ↔ `TagsSection` / `EditorialNarrative` | Conditional composition (`school.tags`/`school.editorial` presence) | Non-pilot schools render identically to today — no visual regression risk |
| `SchoolProfile` ↔ `collectCitedSources` ↔ `SourcesSection` | Extended data collection, same rendering contract | `SourcesSection` component itself likely needs no change if `collectCitedSources` already returns a uniform grouped-by-type shape; verify `GroupedCitedSources` types accommodate the new source-type values |
| `SchoolCard` / `ComparisonTable` / `filterSchools` ↔ tags | **No integration this milestone** | Explicit boundary — do not import tag types here yet |
| `validateSchools` (`pnpm validate:data`) ↔ new schema | Automatic — same script, same `schoolSchema`, no script changes needed | New fixtures should be added under `src/content/schools/fixtures/` to exercise tag/editorial validation branches directly (valid + invalid cases), same as existing fixture pattern |

## Suggested Build Order

1. **Framework docs** — extend `docs/RESEARCH.md` (source hierarchy → journalism/community categories, triangulation definition, tag confidence rules), `docs/EDITORIAL_GUIDE.md` (official vs community narrative voice/structure), `docs/DATA_MODEL.md` (document new field shapes), `docs/DECISIONS.md` (log the taxonomy + source-category decisions). No code yet — this is the product asset the milestone explicitly calls out.
2. **Schema layer** — `sourceTypeSchema` additive values + `getSourceCategory()`; `tagTaxonomy/`; `tag/` schema; `validateTagEvidence/`; `editorial` field group; `schoolSchema` optional `tags`/`editorial` + `.superRefine()` extension. Add fixtures (valid tagged school, invalid community-only-confirmed tag, etc.) and unit tests before touching real content.
3. **Pilot content** — author `tags`/`editorial` for 3-5 real Lichtenberg schools in `lichtenbergPrimarySchools/index.ts`, adding any new journalism/community `Source` entries needed; run `pnpm validate:data` continuously; leave the other 5-7 schools untouched.
4. **Profile UI** — build `TagsSection` and `EditorialNarrative`, wire into `SchoolProfile` conditionally, extend `collectCitedSources`; verify non-pilot school profile pages are pixel/DOM-identical to before (regression check, not just "no crash").
5. **Validation gates** — Jest/RTL coverage for new schema validators and both new components; confirm `next build` (static export) still succeeds; confirm `coverage.percentage` is byte-identical for all schools pre/post change (guards Anti-Pattern 3); add or extend Playwright coverage for a pilot school profile page per `AGENTS.md` testing expectations ("important workflows... should eventually have automated coverage").

## Sources

- `src/features/schools/school/index.ts`, `src/features/evidence/fieldEvidence/index.ts`, `src/features/evidence/source/index.ts`, `src/features/evidence/sourceTypes/index.ts` — current schema/evidence primitives (read directly, HIGH confidence)
- `src/features/schools/SchoolProfile/{index.tsx,constants.ts}`, `src/features/schools/ProfileFieldRow/index.tsx`, `src/features/schools/SourcesSection/index.tsx` — current profile UI composition (read directly, HIGH confidence)
- `src/features/schools/researchMetadata/index.ts`, `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — research metadata and real content authoring pattern (read directly, HIGH confidence)
- `docs/DATA_MODEL.md`, `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DECISIONS.md`, `docs/INFORMATION_ARCHITECTURE.md` — canonical product/architecture rules (read directly, HIGH confidence)
- `.planning/PROJECT.md` — v1.2 milestone scope, active requirements, out-of-scope boundaries (read directly, HIGH confidence)
- `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md` — prior codebase map, cross-checked against current source (2026-07-11 snapshot; current code confirmed consistent, with `SchoolProfile`/comparison additions from v1.1 layered on top)
- `AGENTS.md` — repository-wide conventions (feature-first structure, colocation, anti-premature-abstraction rule)

---
*Architecture research for: evidence-backed school profile tags + editorial narrative integration*
*Researched: 2026-07-26*
