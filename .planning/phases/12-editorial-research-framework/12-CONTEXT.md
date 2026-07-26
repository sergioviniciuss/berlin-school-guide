# Phase 12: Editorial & Research Framework - Context

**Gathered:** 2026-07-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Write, review, and publish the editorial and research rules that govern evidence-backed tags and “Perfil da escola” narrative **before any pilot school is tagged**. Deliverable surface is documentation in `docs/` plus an update to the public `/methodology` page explaining the evidence-backed profile model. Schema enforcement and pilot content authoring belong to Phases 13–14.

Success anchors (from ROADMAP): source hierarchy with auditable “independent” definition; tag taxonomy v1 + banned/attributed-reputation voice rules; methodology page update; written pilot-selection rationale naming the pilot set (including ≥1 lower-documentation school); qualitative review cadence distinct from factual `research_status` recheck.

</domain>

<decisions>
## Implementation Decisions

### Tag taxonomy v1
- **D-01:** Closed category set + closed tag IDs in v1. Organize as categories with 1–3 tags each (not a flat list).
- **D-02:** v1 shape — **10 tags across 4 categories:**
  - **Academic focus:** `stem-focus`, `languages-focus`, `arts-music-focus`
  - **Learning model:** `bilingual-program`, `special-pedagogical-model`, `all-day-model`
  - **Student support:** `inclusion-support`, `transition-support`
  - **School environment:** `structured-learning-environment`, `active-school-community`
- **D-03:** **Out of v1:** `High demand` (admissions pressure/popularity, not school–child match; hard to evidence comparably).
- **D-04:** `active-school-community` describes visible parent/community participation — never implies the community is “better.”
- **D-05:** Taxonomy rule: a tag must help a family decide whether the school matches their child — not catalog every offer. Tags describe a **sustained, decision-relevant** characteristic — not isolated projects, generic claims, or documentation richness.
- **D-06:** Community evidence may be used **only** for `active-school-community` (never as sole basis; official corroboration where applicable). All other v1 tags = official and/or journalism only. Pilot thoroughly tests the community workflow on one tag before any v2 expansion.
- **D-07:** Tag only when character goes **beyond** the factual field. Facts answer “what does this school have?”; tags answer “what kind of school is this?” (e.g. verified Ganztag ≠ automatic `all-day-model`; SESB/bilingual stream ≠ automatic `bilingual-program`).

### Community independence rule
- **D-08:** Independence = **different publisher/community origin**, not different URLs or different individuals in the same venue. Guiding principle: observations could reasonably have **arisen separately**, not merely been repeated.
- **D-09:** Echoes do not count — including same-thread comments, cross-posts, screenshots/reposts of the same discussion, two Reddit threads about the same post, same article republished elsewhere.
- **D-10:** Acceptable independence examples: Reddit + Facebook parent group; two unrelated Facebook groups (different moderation/membership); parent blog + Reddit; local parent forum + Facebook group.
- **D-11:** Conflict → **fail closed: no tag**. Research log may record supporting evidence, opposing evidence, and withhold reason. Public profile omits the tag. Absence of a tag means **insufficient evidence**, not negative.
- **D-12:** Minimum community-source quality: **active, multi-voice venue** — multiple participants (not a single testimonial), recent enough to reflect the current school, substantive discussion (not one-line reactions). Abandoned pages with one comment do not count.
- **D-13:** Independence log is **minimal structured** per source: venue/publisher, URL or stable identifier, date accessed, one-line independence rationale vs other source(s), echo-check note. Longer reasoning belongs in research notes, not the required log.
- **D-14:** Community sources normally within **~24 months** of authoring/review. Older material only if it clearly describes a durable characteristic still confirmed by current official information or other up-to-date evidence.

### Pilot-selection criteria
- **D-15:** Phase 12 delivers **criteria + a full named 3–5 school pilot set** in `docs/` (no selection drift). Names are **proposed during planning/docs execution** from these criteria and reviewed in the Phase 12 PR/verification — not picked ad hoc in chat.
- **D-16:** Diversity dimensions (coverage targets, not 1:1 seats — one school may satisfy multiple):
  1. well-documented school
  2. low-documentation school
  3. bilingual/SESB school
  4. distinctive specialization (e.g. music, STEM)
  5. typical neighbourhood school
- **D-17:** Objective of the set: validate methodology across **different evidence conditions**, not showcase “best” schools.
- **D-18:** Low-documentation = existing `researchStatus` of **`directory_only`** plus **thin public web presence** (sparse beyond Senate portrait).
- **D-19:** Intentionally include ≥1 school where independent community venues are **plausibly findable**, so the pilot exercises the full triangulation workflow for `active-school-community`. If evidence still fails the threshold → fail closed and withhold the tag (that outcome is successful validation of the model).

### Qualitative review cadence
- **D-20:** Hybrid model: **periodic + event-driven**. Event triggers include major school website updates, significant press coverage, curriculum/program changes, repeated correction reports, and methodology version changes. Community observations are revalidated on each qualitative review pass.
- **D-21:** Periodic baseline: **annual** review for all qualitative content (tags + “Perfil da escola”). Community-backed `active-school-community` must be revalidated at least every **~12 months**.
- **D-22:** This milestone introduces **distinct tracking** separate from factual `research_status` (e.g. `qualitativeLastReviewed`). Phase 12 documents the policy and required field semantics; Phase 13 implements the schema.
- **D-23:** On methodology version change: **re-review all** pilot qualitative content (every tagged/narrated pilot profile) before declaring the new methodology version live.

### Claude's Discretion
- Exact wording of confidence-label vocabulary and banned/attributed-reputation phrase lists when drafting `docs/EDITORIAL_GUIDE.md` / `docs/DECISIONS.md` (deferred from deep discussion; must still satisfy ROADMAP success criterion 2 and anti-ranking product rules).
- Depth and structure of the public `/methodology` MDX update (Area 5 deferred; still required by FRAME-02 — keep families clear on source tiers, tags vs facts, confidence = evidence strength not quality, and absence-of-tag ≠ negative).
- Concrete school names for the 3–5 pilot set, chosen objectively from D-15–D-19 during Phase 12 docs work.
- Exact doc section layout / which files hold pilot rationale vs cadence vs taxonomy (must cover RESEARCH, EDITORIAL_GUIDE, DATA_MODEL, DECISIONS per roadmap).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase & requirements
- `.planning/ROADMAP.md` — Phase 12 goal, success criteria, FRAME-01–04 mapping
- `.planning/REQUIREMENTS.md` — FRAME-01–04; TAG/NARR/PILOT requirements that Phase 12 unlocks for later phases
- `.planning/PROJECT.md` — v1.2 milestone intent; anti-ranking; profile-only tags this milestone
- `.planning/research/SUMMARY.md` — recommended build order; framework-before-content gate
- `.planning/research/PITFALLS.md` — soft reputation language, taxonomy-as-documentation-proxy, pilot selection bias, qualitative staleness, richness≠quality

### Product docs (extend, do not replace)
- `docs/RESEARCH.md` — existing source hierarchy, reliability levels, research_status, correction workflow (extend with journalism/community tiers, independence, qualitative cadence)
- `docs/EDITORIAL_GUIDE.md` — tone, claims, parent-centered writing (extend with taxonomy rules, Perfil voice, attributed-reputation language)
- `docs/DATA_MODEL.md` — field/evidence shapes (document tag taxonomy + qualitativeLastReviewed semantics for Phase 13)
- `docs/DECISIONS.md` — coverage≠quality and related ADRs (extend qualitative richness≠quality; taxonomy + source-category decisions)
- `docs/COMPARISON.md` — no rankings / no quality scores
- `docs/PRODUCT.md` — product scope boundaries
- `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` — factual research workflow to keep distinct from qualitative cadence

### Public methodology surface
- `src/content/guides/methodology.mdx` — current family-facing methodology (evidence status + coverage only)
- `src/app/methodology/page.tsx` — route shell for methodology update

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/content/guides/methodology.mdx` + `GuideIntro` on `/methodology` — extend in place for FRAME-02
- `src/content/schools/real/lichtenbergPrimarySchools/index.ts` — 10-school set; `researchStatus` (`directory_only` vs `profile_ready`) feeds low-doc selection; existing bilingual/music profile fields inform dimension coverage
- `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` — factual recheck patterns to contrast with qualitative cadence

### Established Patterns
- Docs under `docs/` are source of truth; code follows later
- Evidence model already separates value + citations + research dates — qualitative tracking should stay parallel, not overload `research_status`
- Anti-ranking / coverage≠quality already documented — qualitative rules must extend, not weaken them

### Integration Points
- Phase 12 writes rules; Phase 13 encodes taxonomy IDs, independence-log shape, `qualitativeLastReviewed`, and validators
- Phase 14 authors tags/narrative only against the named pilot set and these rules
- Methodology MDX is the public mirror of internal docs — keep vocabulary consistent (PT-BR user-facing)

</code_context>

<specifics>
## Specific Ideas

- Philosophy to preserve in docs: **facts = “what does it have?” / tags = “what kind of school is this?”** — this is the intended product differentiator.
- Conservative v1 evidence posture: easier to expand community rules later than to rebuild trust after weak/duplicated community claims.
- Fail-closed triangulation and sparse profiles are first-class successes, not incomplete work.
- `active-school-community` is the single community-evidence pilot tag by design.

</specifics>

<deferred>
## Deferred Ideas

- **Methodology page depth / family-facing framing details** — deferred until internal methodology is solid; still ship FRAME-02 update in Phase 12 with Claude discretion on depth.
- **Confidence-label wording and banned-phrase inventory** — deferred from discuss deep-dive; still required in editorial docs this phase (Claude discretion within anti-ranking rules).
- Expanding community evidence to other tags — explicitly post-v1 / after pilot validation.
- `High demand` tag — rejected for v1; may revisit only with comparable official evidence and a match-making rationale.
- Tags on directory cards / compare — already out of milestone scope (FUT-02).

</deferred>

---

*Phase: 12-editorial-research-framework*
*Context gathered: 2026-07-26*
