# Phase 2: Research Process & Attribution - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Make school research repeatable for humans and AI sessions, and transparent for parents. Deliver: a step-by-step research workflow document, honest per-school research dates, complete citable source records in data (ready for Phase 4 rendering), extended `pnpm validate:data` citation checks, and a Portuguese `/methodology` page explaining evidence status and coverage.

This phase does not build school detail pages (Phase 4), shared site navigation (Phase 3), or the full German-term guide library (Phase 7). Citation *rendering* on profile pages is Phase 4; Phase 2 ensures citation *data* is complete and validated.

</domain>

<decisions>
## Implementation Decisions

### Research workflow document
- **D-01:** Primary audience is **both human researchers and AI sessions** — one executable checklist any researcher can follow without re-deriving Phase 1 evidence rules.
- **D-02:** Structure is a **step-by-step checklist with per-field status rules**, not policy-only prose.
- **D-03:** Procedural workflow lives in **`docs/research/SCHOOL_RESEARCH_WORKFLOW.md`**; `docs/RESEARCH.md` remains the policy reference (source hierarchy, citation philosophy) and is cross-linked, not duplicated.
- **D-04:** Field-status rules use an **explicit decision tree per field type** — e.g. portrait has ganztag → `verified`; infer afterSchoolCare from ganztag → `not_confirmed` via `inferredFrom()` with mandatory Portuguese note; directory-only inspection → `missing`.
- **D-05:** Workflow must reference Phase 1 artifacts: `inferredFrom()`, coverage v2 denominators, directory vs detailed tiers, and `pnpm validate:data` as the completion gate.

### Methodology page (`/methodology`)
- **D-06:** Depth is a **practical parent summary (~one scroll)** — how to read school cards, what evidence statuses mean, what coverage % measures. Not a full research manual.
- **D-07:** Explain **coverage v2 in plain language with examples** — e.g. "Pesquisa básica = campos do retrato oficial; a porcentagem mede completude da pesquisa neste nível, não qualidade da escola."
- **D-08:** Include a **short glossary** of core German school terms (Ganztag, Willkommensklasse, Hort, etc.) with Portuguese explanations — seeds Phase 7 guides without replacing them.
- **D-09:** Page is Brazilian Portuguese; route `/methodology` per `docs/INFORMATION_ARCHITECTURE.md`.
- **D-10:** Discoverability before Phase 3 nav: add a **link from the directory header copy** (e.g. "Como funciona nossa pesquisa?") — not footer-only, not standalone URL with no in-app path.

### Citation completeness (data layer)
- **D-11:** Phase 2 bar: **every `verified` field across all 10 schools** has complete citation records (publisher, URL, access date) — audit and fix gaps in data during this phase.
- **D-12:** Citation **rendering** on school pages is **deferred to Phase 4**; Phase 2 delivers data that is ready to render.
- **D-13:** **Extend `pnpm validate:data`** to enforce citation quality for verified fields (acceptable source types, complete metadata) — wire existing `validateFieldCitations` logic or equivalent into the validation path.
- **D-14:** Source `accessedAt` dates reflect the **actual date each source was checked** during research, not a single milestone date for the whole set.

### Research date integrity
- **D-15:** `lastResearched` and `lastSourceChecked` use **per-school actual dates** from when that school was reviewed — not one shared Phase 1 date for all 10.
- **D-16:** For schools with uneven depth (e.g. Lew-Tolstoi, Richard-Wagner): **`lastSourceChecked`** = date of the most recently accessed source; **`lastResearched`** = date of the last full field-by-field review (may differ).
- **D-17:** CI validation: **dates required on all 10 real schools**; `lastSourceChecked` must be **≥ oldest cited `accessedAt`** on that school's sources.
- **D-18:** Workflow doc includes an explicit re-research step: **update both dates whenever any field or source is re-checked**.

### Claude's Discretion
- Exact Portuguese copy for methodology page and directory header methodology link
- MDX vs static page composition for `/methodology` (follow existing guide patterns)
- Citation validation error messages and whether to add `pnpm validate:citations` alias
- Per-school date values during citation audit (derive from source `accessedAt` evidence)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Research policy and process
- `docs/RESEARCH.md` — Source hierarchy, citation requirements, research statuses, missing/conflict rules (policy layer)
- `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` — Baseline sources, field difficulty, portrait patterns from Lichtenberg spike
- `docs/DATA_MODEL.md` — School coverage levels, field evidence structure, minimum fields
- `docs/EDITORIAL_GUIDE.md` — Brazilian Portuguese tone, German term explanation style

### Architecture and requirements
- `docs/INFORMATION_ARCHITECTURE.md` — `/methodology` route, navigation goals, static-first constraint
- `.planning/REQUIREMENTS.md` — RSCH-01 through RSCH-04 traceability
- `.planning/phases/01-data-evidence-audit/01-CONTEXT.md` — Locked evidence inference and coverage v2 decisions (D-01–D-28)

### Validation and evidence code
- `src/features/schools/validateSchools/index.ts` — Current `pnpm validate:data` entry point
- `src/features/evidence/validateFieldCitations/index.ts` — Citation acceptability checks (to wire into CI)
- `src/features/schools/researchMetadata/index.ts` — `lastResearched` / `lastSourceChecked` schema rules
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — School records and sources to audit

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/RESEARCH.md` — Policy foundation; link from workflow doc, do not replace
- `docs/research/REAL_SCHOOL_RESEARCH_SPIKE.md` — Spike findings to distill into workflow checklist
- `src/features/evidence/validateFieldCitations/` — Citation quality logic exists with tests; not yet in `validate:data`
- `src/features/schools/researchMetadata/` — Date validation for `in_research` / `profile_ready` statuses
- `src/app/guides/m2-smoke/page.tsx` + MDX — Pattern for static guide/methodology pages
- `src/features/schools/SchoolDirectory/index.tsx` — Directory header where methodology link will be added

### Established Patterns
- User-facing content in Brazilian Portuguese; English routes (`/methodology`)
- School data in `lichtenbergPrimarySchools/index.ts` with `sources[]` and per-field `evidence.citations`
- `pnpm validate:data` is the structural gate; Phase 2 extends it for citation/date integrity
- Phase 1: all 10 schools currently `directory_only` / `directory` post-audit

### Integration Points
- New `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` cross-links `docs/RESEARCH.md` and Phase 1 `inferredFrom` rules
- `/methodology` route under `src/app/methodology/` (or MDX under `src/content/`)
- Directory header link in `SchoolDirectory`
- `validateSchools` extended to call citation + date checks for real schools

</code_context>

<specifics>
## Specific Ideas

- Workflow must be executable by a future Claude session without re-reading the entire codebase — checklist + decision trees, not philosophy alone
- Methodology page is for parents evaluating trust, not researchers — keep it practical; workflow doc is for researchers
- German terms on cards stay in German for now (Phase 1 decision); methodology glossary explains them in Portuguese context
- Citation audit is part of Phase 2 execution, not a separate future pass

</specifics>

<deferred>
## Deferred Ideas

- Full German-term guide library — Phase 7 (methodology glossary is a short seed only)
- Citation rendering on school detail pages — Phase 4 (RSCH-04 UI portion)
- Shared header/footer linking methodology — Phase 3
- Per-field evidence labels on detail pages — Phase 4
- Automated topical validity checks (does citation text discuss the field topic?) — out of scope unless planner finds minimal hook

</deferred>

---

*Phase: 02-research-process-attribution*
*Context gathered: 2026-07-11*
