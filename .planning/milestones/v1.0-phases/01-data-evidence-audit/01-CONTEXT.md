# Phase 1: Data & Evidence Audit - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Audit all 10 Lichtenberg school records so every published fact is honestly evidenced. Remove misleading evidence fallbacks, fix coverage scoring to reflect real research depth, distinguish directory-only from detailed schools in data and UI, replace synthetic/M2 copy, and isolate synthetic test fixtures from production paths.

This phase does not build school detail pages, full homepage journey, methodology documentation, or new research workflow — those belong to later phases.

</domain>

<decisions>
## Implementation Decisions

### Evidence inference and fallback correction
- **D-01:** When a field value is reasonably inferred from another verified field (e.g. `afterSchoolCare` from `ganztag`, `schoolProfile`/`pedagogyFocus` from portrait `offers`), preserve the inferred value because it can help parents — but never mark it `verified`.
- **D-02:** Inferred fields use `not_confirmed` status with an explicit evidence note stating the value is inferred and has not been independently confirmed.
- **D-03:** Inferred fields must not contribute to evidence coverage numerators.
- **D-04:** UI must clearly distinguish inferred information from verified information (directory cards and any field display in this phase).
- **D-05:** When independent evidence is later found, replace inferred status with `verified` and proper citations.
- **D-06:** Apply the same inference rules to `schoolProfile` and `pedagogyFocus` when derived from portrait `offers`.
- **D-07:** `inspectionAvailability` for directory-only schools that have not been researched should be `missing`, not `not_confirmed` with a portrait citation.
- **D-08:** Replace implicit fallbacks in `primarySchool()` with an explicit `inferredFrom()` helper that centralizes inference rules and mandates evidence notes — no silent cross-field verification reuse.

### Coverage scoring (v2)
- **D-09:** Bump evidence coverage to **v2** — same important field concept, new counting rules documented in constants/decisions.
- **D-10:** Coverage numerator counts only `verified` fields; inferred/`not_confirmed` fields are excluded.
- **D-11:** Coverage denominator is **level-aware**: directory-level schools are measured against the field set expected for a directory profile; detailed schools against the full detailed field set. Single percentage per school — no dual scores.
- **D-12:** Coverage measures completeness within the declared research scope; directory schools must not be penalized for not having detailed-level fields they were never expected to have.
- **D-13:** Display coverage with a tier label: **"Pesquisa básica"** (directory) or **"Pesquisa detalhada"** (detailed) plus the percentage.
- **D-14:** Strengthen the existing disclaimer that coverage measures research completeness, not school quality — add level-aware context so parents understand why two schools may show similar percentages with different information depth.

### Directory vs detailed signaling
- **D-15:** Add a visible research-level badge on every `SchoolCard`: **"Perfil básico"** or **"Perfil detalhado"**.
- **D-16:** Directory cards show only fields with meaningful information available — do not display unsupported or missing fields on cards.
- **D-17:** Directory cards include a clear call-to-action to view the full school profile for additional information (detail page implementation is Phase 4; CTA may link ahead or use honest "em breve" framing if route doesn't exist yet — planner decides minimal honest approach).
- **D-18:** No research-level filter or sort in Phase 1 — distinction is visible on cards only.
- **D-19:** Reclassify schools after audit — if a school currently marked `detailed` does not meet the detailed bar once inflated fields are corrected, downgrade to directory level.

### Honest copy and synthetic cleanup
- **D-20:** Position the product as **Berlin School Guide** — not a Lichtenberg-only guide, not a prototype, not milestone scaffolding.
- **D-21:** Directory copy states Lichtenberg as the **initial coverage area** with more Berlin districts coming over time. Avoid "synthetic", "prototype", "research in progress", or milestone references (M2, M4, etc.).
- **D-22:** Copy communicates current scope without making the product feel incomplete; every published fact is backed by cited sources and transparent evidence.
- **D-23:** Minimal homepage fix in Phase 1 — remove M2 eyebrow/framing and add a link to `/schools`. Full homepage journey remains Phase 3.
- **D-24:** Fix directory header copy (`SchoolDirectory`) and `/schools` page metadata — remove "sintéticas" / synthetic validation wording.
- **D-25:** Isolate synthetic paths from production — remove `getSyntheticSchools` from production exports; keep fixtures in test-only paths; remove `"Escola sintética sem nome"` production fallback in mapper.

### Unchecked field defaults
- **D-26:** `bilingualPrograms`, `internationalPrograms`, and similar unchecked fields default to `missing` until explicitly verified — not `not_applicable`.
- **D-27:** `welcomeClasses` keeps `missing` as the default for unchecked schools.
- **D-28:** `not_applicable` is allowed only when explicit evidence confirms the field does not apply (portrait or school site states absence) — never inferred from silence.

### Claude's Discretion
- Exact Portuguese copy for directory header, homepage minimal fix, and coverage disclaimer wording
- `inferredFrom()` helper API shape and evidence note templates
- Directory vs detailed field path lists for coverage v2 denominators
- Whether profile CTA links to a placeholder or waits for Phase 4 route
- Exact reclassification criteria for downgrading "detailed" schools after audit

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data model and evidence rules
- `docs/DATA_MODEL.md` — School coverage levels (directory vs detailed), minimum fields, field evidence structure
- `docs/RESEARCH.md` — Source hierarchy, citation requirements, missing/unconfirmed labeling rules, inspection availability values
- `docs/DECISIONS.md` — Evidence coverage versioning (2026-07-10 entries), `not_applicable` exclusion rules, static-first architecture

### Requirements and project context
- `.planning/REQUIREMENTS.md` — DATA-01 through DATA-06 traceability for this phase
- `.planning/PROJECT.md` — Brownfield assessment: known fallback issues, coverage inflation table, school research status
- `.planning/codebase/CONCERNS.md` — Documented tech debt: ganztag→afterSchoolCare, synthetic copy, `getSyntheticSchools` export

### Research spike (baseline for audit)
- `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` — Official sources used, field difficulty, schema gaps from real-data spike

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — `primarySchool()` builder; all 10 school records and implicit fallbacks to fix
- `src/features/evidence/calculateEvidenceCoverage/index.ts` — Coverage calculation to update for v2 level-aware denominators
- `src/features/schools/school/constants.ts` — `evidenceCoverageVersion`, `importantSchoolFieldPathsV1` field list
- `src/features/schools/SchoolCard/index.tsx` — Card UI for badges, field display cleanup, coverage tier label
- `src/features/schools/SchoolDirectory/index.tsx` — Directory header copy to replace
- `src/app/schools/page.tsx` — Page metadata with synthetic wording
- `src/app/page.tsx` — Homepage M2 scaffolding for minimal fix
- `src/features/schools/schoolDirectoryData/index.ts` — Production data path; `getSyntheticSchools` to isolate

### Established Patterns
- Field-level `value` + `evidence` with statuses: `verified`, `not_confirmed`, `missing`, `not_applicable`
- Evidence coverage shown on cards as percentage with explanatory text
- `research.coverageLevel` and `research.status` already on school records (`directory` / `detailed`, `directory_only` / `in_research`)
- Zod validation via `pnpm validate:data` — structural checks only, no topical evidence validation

### Integration Points
- `getRealSchools()` → `getSchoolDirectoryItems()` → `SchoolDirectory` → `SchoolCard` — production data flow to update
- Coverage recalculation flows through `toSchoolDirectoryItem` mapping into filter/card display
- Test fixtures in `src/features/schools/school/fixtures.ts` and `src/content/schools/fixtures/` remain test-only

</code_context>

<specifics>
## Specific Ideas

- Inferred values stay visible when helpful (e.g. Ganztag type as after-school hint) but must never count as verified research
- Product framing: Berlin-wide guide with Lichtenberg as first district, expanding over time — not a limited pilot feel
- Directory stays clean and scannable; missing/inferred/verified distinction belongs on detail pages (Phase 4)
- Three schools (Adam-Ries, Lew-Tolstoi, Richard-Wagner) are candidates for detailed status but must earn it post-audit

</specifics>

<deferred>
## Deferred Ideas

- Research-level filter/sort in directory — Phase 5 (Directory UX & Discovery)
- Full homepage rewrite and shared navigation — Phase 3
- School detail pages with full field/evidence display — Phase 4
- Methodology page explaining evidence to parents — Phase 2
- Topical validity validation in coverage algorithm beyond status checks — out of scope unless planner finds minimal v2 hook
- Homepage full product intro beyond minimal M2 removal — Phase 3

</deferred>

---

*Phase: 01-data-evidence-audit*
*Context gathered: 2026-07-11*
