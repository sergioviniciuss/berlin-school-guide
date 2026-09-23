# Phase 14: Pilot Profile Content - Context

**Gathered:** 2026-07-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Author real, evidence-backed tags and a short PT-BR “Perfil da escola” on the **five named pilot schools** from `docs/research/PILOT_SELECTION.md`, against the Phase 13 schema — exercising sparse-but-honest tagging, live community triangulation (fail-closed OK), and `pnpm validate:data` green with **non-pilot schools untouched**. Profile UI chips, Fontes merge of tag/narrative citations, and directory/compare tag surfaces remain Phase 15+.

Success anchors (from ROADMAP): 3–5 schools with tags + perfil (this phase: all 5); ≥1 low-doc school; triangulation exercised end-to-end (published tag **or** documented withhold); perfil synthesizes only already-cited evidence; validate:data passes; non-pilots unchanged.

</domain>

<decisions>
## Implementation Decisions

### Where “Perfil da escola” lives
- **D-01:** Store perfil as an optional field on the **school record**, not separate MDX: `perfilDaEscola`.
- **D-02:** Schema shape: `perfilDaEscola: z.string().trim().min(1).optional()` — plain PT-BR text only for v1.2 (no MDX, no Markdown features).
- **D-03:** Cross-field rules: if `tags` present (non-empty) → `perfilDaEscola` required; if `perfilDaEscola` present → `qualitativeLastReviewed` required; schools with neither remain valid (non-pilots).
- **D-04:** Extend Phase 13 rule: `qualitativeLastReviewed` required whenever **any** qualitative content exists (tags **or** perfil), not tags alone.

### Tagging depth / sparse-honest
- **D-05:** Sparse-but-honest always wins over completeness. Tag only when evidence supports a sustained “what kind of school” claim **beyond** the factual field (Phase 12 facts≠tags rule).
- **D-06:** **No hard minimum or maximum** tags per school. Zero tags + short perfil is a valid, successful pilot outcome for thin schools (esp. Seepark, Friedrichsfelder, and possibly Grzimek).
- **D-07:** Do not invent tags to fill a quota or demonstrate taxonomy coverage.

### Narrative length & citation discipline
- **D-08:** Target ~**one concise PT-BR paragraph** (soft guideline ≈ 3–5 sentences / short evidence synthesis — not a mini-article).
- **D-09:** **No Zod `.max()`** on `perfilDaEscola` — length is editorial, not schema-enforced.
- **D-10:** Citation discipline is **editorial/human**: every claim in perfil must be supportable from that school’s existing `sources[]`, verified fields, and/or tag citations. No new uncited facts. Schema does not parse sentence→sourceId maps in v1.2.
- **D-11:** Follow `docs/EDITORIAL_GUIDE.md` Perfil voice: no ranking/superlatives/reputation language; sparse-but-honest; parent-centered verified vs unconfirmed.

### Community triangulation research
- **D-12:** Perform **live research** for Lew-Tolstoi-Schule community venues (provisional PILOT_SELECTION candidate). No synthetic community fixtures to force a green tag.
- **D-13:** If independence / never-sole-basis thresholds are not met → **fail closed: omit `active-school-community`**. That outcome is successful methodology validation.
- **D-14:** **PILOT-03 satisfaction (option 1A):** end-to-end triangulation is exercised by the **documented research attempt + outcome** — either a published triangulated tag meeting Phase 13 validators, **or** a documented withhold. A published community tag is not mandatory for phase completion.

### `qualitativeLastReviewed` + withhold / research notes
- **D-15:** Every pilot school that ships tags and/or `perfilDaEscola` must set `qualitativeLastReviewed` to the ISO `YYYY-MM-DD` of qualitative authoring/review.
- **D-16:** When community triangulation is **attempted and withheld**, require a short durable note in **both** places (**1c**):
  - Optional school-record field (e.g. `qualitativeResearchNotes: z.string().trim().min(1).optional()`) — brief withhold/research summary;
  - Fuller write-up under `docs/research/` (extend PILOT_SELECTION or add a Phase 14 research log).
- **D-17:** Exact Zod name for the notes field is Claude’s discretion if semantics match D-16 (`qualitativeResearchNotes` preferred).

### Pilot scope
- **D-18:** Author qualitative content for **all five** named schools: Richard-Wagner-Schule, Lew-Tolstoi-Schule, Bernhard-Grzimek-Schule, Friedrichsfelder Schule, Seepark-Grundschule.
- **D-19:** Non-pilot schools in `lichtenbergPrimarySchools` remain untouched (VAL-01). Coverage % must not be silently altered by qualitative work.

### Carried forward (do not reopen)
- Phase 12 taxonomy, independence, Perfil voice, pilot selection rationale; Phase 13 tag/citation/confidence/allowlist validators; never-sole-basis hard rule; confidence enum IDs.

### Claude's Discretion
- Exact PT-BR copy for each school’s perfil and which tags (if any) each school earns — must obey D-05–D-11 and real evidence found during research.
- Whether `primarySchool()` factory gains helpers for tags/perfil or authors pass them on the finished object.
- Exact docs path/filename for the fuller community research log (D-16).
- Soft character/sentence targets beyond D-08 when drafting acceptance checks.
- Whether successful community tag on Tolstoi also gets a brief positive research note (optional; withhold note is mandatory only on withhold).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase & requirements
- `.planning/ROADMAP.md` — Phase 14 goal, success criteria, NARR-02 / PILOT-01–03
- `.planning/REQUIREMENTS.md` — NARR-02, PILOT-01–03; VAL-01 constraint
- `.planning/PROJECT.md` — v1.2 match-making; profile-only tags this milestone
- `.planning/phases/12-editorial-research-framework/12-CONTEXT.md` — taxonomy, independence, pilot criteria
- `.planning/phases/13-evidence-tag-schema-layer/13-CONTEXT.md` — schema/validator decisions D-01–D-22

### Pilot & editorial policy
- `docs/research/PILOT_SELECTION.md` — named 5-school set; Lew-Tolstoi community candidate; fail-closed framing
- `docs/EDITORIAL_GUIDE.md` — Perfil da Escola Voice; Tag Taxonomy Voice; Facts Versus Tags
- `docs/RESEARCH.md` — Community Source Independence; source hierarchy
- `docs/DATA_MODEL.md` — Tag Taxonomy; Qualitative Review Tracking
- `docs/DECISIONS.md` — richness≠quality; taxonomy ADRs

### Code to extend
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — author tags/perfil on pilots only
- `src/features/schools/school/index.ts` — add `perfilDaEscola` (+ notes field); cross-field refine
- `src/features/evidence/validateTagEvidence/index.ts` — must stay green for authored tags
- `src/features/schools/validateSchools/index.ts` — `pnpm validate:data`
- `src/features/schools/tagTaxonomy/index.ts` — closed tag IDs
- `src/content/guides/methodology.mdx` — family-facing confidence/source language (align copy, don’t reopen)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `primarySchool()` factory + `field()` / `evidence()` / `sources[]` in `lichtenbergPrimarySchools`
- Phase 13 `schoolTagSchema`, `validateTagEvidence`, confidence/format helpers
- `qualitativeLastReviewed` already on schema (extend requirement to perfil)

### Established Patterns
- Additive optional fields so non-pilots stay valid
- Citations by `sourceId` into school-level `sources[]`
- Directory-colocated Zod + Jest

### Integration Points
- Phase 15 will render `perfilDaEscola` + tags — keep field names stable
- No tag/perfil UI in this phase

</code_context>

<specifics>
## Specific Ideas

- Pilot validates methodology, not presentation polish.
- Prefer schema field `perfilDaEscola` over nested `editorial.perfil` for simple authoring beside tags.
- PILOT-03 = attempt + documented outcome (1A), not a forced published community tag.
- Withhold notes: brief on school record + fuller in `docs/research/` (1c).

</specifics>

<deferred>
## Deferred Ideas

- Profile UI for tags/perfil and Fontes merge of qualitative citations — Phase 15
- MDX or Markdown-rich perfil — post-v1.2 if needed
- Synthetic community fixtures to force PILOT-03 green tag — rejected
- Tag quotas / minimum tags per school — rejected
- Directory card / compare tag surfaces — later milestone

</deferred>

---

*Phase: 14-pilot-profile-content*
*Context gathered: 2026-07-29*
