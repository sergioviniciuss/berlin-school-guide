# Phase 13: Evidence & Tag Schema Layer - Context

**Gathered:** 2026-07-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Encode Phase 12’s editorial/research rules into the Zod data model and `validate:data` pipeline so structured, cited tags and triangulated community evidence are representable and rejectable **before** any real pilot content is authored (Phase 14). Deliverable surface is schema, validators, fixtures/tests, and PT-BR format helpers aligned with `/methodology` — **not** profile UI chips/narrative rendering (Phase 15) and **not** authoring pilot tags on real schools (Phase 14).

Success anchors (from ROADMAP): optional tags on `schoolSchema` (taxonomy id + confidence + ≥1 citation); `journalism` + displayable `triangulated_community` source types distinct from `anecdotal_reserved`; `validateTagEvidence` enforcing independence log + never-sole-basis; confidence vocabulary = evidence strength; fixture tests for valid and invalid combinations.

</domain>

<decisions>
## Implementation Decisions

### Reliability vs source-type shape
- **D-01:** Keep **orthogonal axes**: `sourceType` = what kind of source; `reliability` = how much authority for **factual** verification.
- **D-02:** Add `journalism` and `triangulated_community` to `sourceTypeSchema` only. Do **not** add `triangulated_community` as a reliability enum value.
- **D-03:** Keep `reliabilityLevelSchema` as `primary | secondary | anecdotal | unknown`.
- **D-04:** Suggested default mapping when authoring sources: official / authoritative datasets → usually `primary`; `journalism` → usually `secondary`; `triangulated_community` → `anecdotal`; `anecdotal_reserved` → `anecdotal`.
- **D-05:** Harden factual verification with an **allowlist**, not exclusion-only. Conceptually: `isAcceptableFactualEvidence(source)` requires acceptable reliability (`primary` | `secondary`) **and** an explicitly approved factual `sourceType` set (must include existing official/website/dataset types + `journalism`; must **exclude** `triangulated_community` and `anecdotal_reserved`). Prefer allowlist so new source types do not accidentally become factual evidence.
- **D-06:** Correct Phase 12 docs (`docs/RESEARCH.md` Reliability Levels section and any mirrors): `triangulated_community` is a **source type**, not a reliability level. Reliability ladder stays the four values above.

### “Never sole basis” for `active-school-community`
- **D-07:** Hard schema rule (not soft editorial policy): `active-school-community` is valid only when citations include **≥2 independent `triangulated_community` sources** (each with independence log) **and ≥1** citation from an allowlisted **non-community** type (`official_government` | `official_inspection` | `school_website` | `public_dataset` | `journalism`).
- **D-08:** Community-only tags must be **rejected** by `validateTagEvidence` / school `superRefine`. Matches methodology “nunca sozinha” and TAG-03.
- **D-09:** All other v1 tags remain official and/or journalism only (no community citations) — carry forward Phase 12 D-06.

### Independence log attachment
- **D-10:** Independence log attaches **on each community citation** (nested on the citation when the cited source is `triangulated_community`), not as a single tag-level blob and not as intrinsic fields on the `Source` record alone.
- **D-11:** Log fields remain the Phase 12 D-13 minimal set: venue/publisher, URL or stable identifier, date accessed, one-line independence rationale vs other source(s), echo-check note. Exact Zod property names are Claude’s discretion if they stay 1:1 with those semantics.
- **D-12:** Reuse school-level `sources[]` + citation-by-`sourceId` pattern (extend citation shape for community cites); do not invent a parallel citation system.

### `qualitativeLastReviewed` requirement
- **D-13:** School-level field, strict ISO **`YYYY-MM-DD`** (not a full timestamp).
- **D-14:** **Required iff any qualitative content exists**: tags omitted or empty → field optional; tags non-empty → field required. When narrative/editorial fields are added in later phases, any qualitative content triggers the same requirement.
- **D-15:** Non-pilot / untouched schools must keep passing `validate:data` without placeholder dates (VAL-01).

### Confidence label IDs
- **D-16:** Closed enum: `confirmed_multi_source` | `confirmed_official` | `partial`.
- **D-17:** PT-BR map (must match `/methodology`):  
  - `confirmed_multi_source` → “Confirmado por múltiplas fontes”  
  - `confirmed_official` → “Confirmado por fonte oficial”  
  - `partial` → “Evidência parcial”
- **D-18:** `confirmed_official` remains valid when the qualifying source is a school website — family-facing “fonte oficial” is the broader concept already published.
- **D-19:** Do **not** use high/medium/low (misreadable as school-quality ratings).
- **D-20:** Validators must enforce **confidence ↔ citation consistency** (e.g. `confirmed_official` requires ≥1 qualifying official/school-website-class source; `confirmed_multi_source` requires evidence from more than one qualifying independent source). Exact “qualifying” predicates are Claude’s discretion within these rules and Phase 12 taxonomy evidence rules.

### Display labels this phase
- **D-21:** Ship **schema + format helpers now**: extend `formatSourceType` for `journalism` and `triangulated_community`; add confidence (and tag-id) format helpers so tests/docs lock the same strings Phase 15 will render. Profile UI chips remain Phase 15.
- **D-22:** `anecdotal_reserved` continues to be non-displayable (existing null/hide pattern).

### Carried forward from Phase 12 (do not reopen)
- Closed 10-tag / 4-category taxonomy IDs; community evidence only for `active-school-community`; independence definition; fail-closed on conflict; tag ≠ automatic from factual fields; `qualitativeLastReviewed` separate from factual `research_*` cadence.

### Claude's Discretion
- Exact Zod field names for independence-log properties and tag object shape (`id` vs `taxonomyId`, citation array name, etc.) — must satisfy D-10–D-12 and TAG-01–04.
- Exact factual `sourceType` allowlist membership beyond the required inclusions/exclusions in D-05.
- Exact predicates for confidence↔citation consistency (D-20) and for “independent” checks that are machine-enforceable vs research-notes-only.
- Exact PT-BR strings for per-tag taxonomy labels in format helpers (must stay non-superlative / anti-ranking; align with methodology where a family name already exists, e.g. community tag).
- Directory layout under `src/features/` (`tag/`, `tagTaxonomy/`, etc.) following existing colocated Zod patterns.
- Whether doc correction (D-06) is a dedicated plan task vs bundled with sourceType enum work — must ship in this phase.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase & requirements
- `.planning/ROADMAP.md` — Phase 13 goal, success criteria, TAG-01–04 mapping
- `.planning/REQUIREMENTS.md` — TAG-01–04; VAL-01/VAL-02 constraints
- `.planning/PROJECT.md` — v1.2 anti-ranking; schema before content
- `.planning/phases/12-editorial-research-framework/12-CONTEXT.md` — locked taxonomy, independence, cadence (D-01–D-23)
- `.planning/phases/12-editorial-research-framework/12-RESEARCH.md` — prior research for framework (patterns/pitfalls)

### Product docs (encode + correct drift)
- `docs/DATA_MODEL.md` — Tag Taxonomy v1; Qualitative Review Tracking (`qualitativeLastReviewed`)
- `docs/RESEARCH.md` — Canonical Source Types; Reliability Levels (**fix community-as-reliability drift per D-06**); Community Source Independence
- `docs/DECISIONS.md` — 2026-07-26 ADRs (taxonomy, source hierarchy extension, richness≠quality, qualitative cadence)
- `docs/EDITORIAL_GUIDE.md` — facts-vs-tags; confidence = evidence strength
- `docs/COMPARISON.md` — no rankings / quality scores
- `docs/research/PILOT_SELECTION.md` — named pilot set (content authorship is Phase 14; schema must not force tags on non-pilots)

### Public copy to stay aligned
- `src/content/guides/methodology.mdx` — family-facing source tiers + three confidence labels (D-17)

### Code to extend
- `src/features/evidence/sourceTypes/index.ts` — `sourceTypeSchema` / `reliabilityLevelSchema` / `isAcceptableReliabilityLevel`
- `src/features/evidence/source/index.ts` — `sourceSchema`
- `src/features/evidence/fieldEvidence/index.ts` — citation shape to extend for independence log
- `src/features/evidence/validateFieldCitations/index.ts` — factual citation gate pattern
- `src/features/evidence/formatSourceType/index.ts` — PT-BR source-type labels
- `src/features/schools/school/index.ts` — `schoolSchema` + `superRefine`
- `src/features/schools/validateSchools/index.ts` — `pnpm validate:data`
- `src/features/schools/schoolClassification/index.ts` — closed `z.enum` catalog pattern
- `src/features/schools/school/fixtures.ts` / `src/content/schools/fixtures/` — fixture patterns for valid/invalid cases

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `sourceTypes` + `source` + `fieldEvidence` — extend enums and citation schema; keep school `sources[]` as the registry
- `validateFieldCitations` / school `superRefine` — mirror for `validateTagEvidence`
- `formatSourceType` — extend for new displayable types; hide reserved anecdotal
- `schoolClassification` — pattern for closed tag taxonomy enum
- `validateSchools` / `pnpm validate:data` — must remain green for all 10 real schools with tags omitted

### Established Patterns
- Directory-colocated Zod units (`index.ts`, `index.test.ts`, `fixtures.ts`)
- Additive optional fields on `schoolSchema` so non-pilots stay valid
- Acceptable factual reliability today is primary/secondary only — Phase 13 must add sourceType allowlist on top (D-05)

### Integration Points
- `schoolDirectoryData` parses with `schoolSchema` — invalid tags must fail load/validate
- Real data: `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — leave untagged in this phase

</code_context>

<specifics>
## Specific Ideas

- Prefer factual allowlist over exclusion lists so future source types do not silently become factual evidence.
- Confidence validators should encode methodology meaning, not free-form author choice.
- Format helpers ship in Phase 13 specifically to prevent ID↔label drift before UI exists.

</specifics>

<deferred>
## Deferred Ideas

- Profile UI rendering of tags/confidence chips and Fontes merge — Phase 15
- Authoring tags / “Perfil da escola” on the named pilot schools — Phase 14
- Expanding community evidence to tags beyond `active-school-community` — post-pilot / taxonomy v2
- Softening never-sole-basis or community-only-with-partial confidence — explicitly rejected for v1 schema

</deferred>

---

*Phase: 13-evidence-tag-schema-layer*
*Context gathered: 2026-07-29*
