# Roadmap: Berlin School Guide

## Milestones

- ✅ **v1.0 Lichtenberg Trustworthy Launch** — Phases 1–8 (shipped 2026-07-12) — [archive](milestones/v1.0-ROADMAP.md)
- ✅ **v1.1 Understand the German & Berlin Education System** — Phases 9–11 (shipped 2026-07-26) — [archive](milestones/v1.1-ROADMAP.md)
- 🚧 **v1.2 Evidence-Based School Profiles** — Phases 12–16 (in progress)

## Phases

<details>
<summary>✅ v1.0 Lichtenberg Trustworthy Launch (Phases 1–8) — SHIPPED 2026-07-12</summary>

- [x] Phase 1: Data & Evidence Audit (3/3 plans) — 2026-07-11
- [x] Phase 2: Research Process & Attribution (3/3 plans) — 2026-07-11
- [x] Phase 3: Homepage, Navigation & Core Journey (3/3 plans) — 2026-07-11
- [x] Phase 4: School Detail Profiles (3/3 plans) — 2026-07-11
- [x] Phase 5: Directory UX & Discovery (3/3 plans) — 2026-07-11
- [x] Phase 6: School Comparison (4/4 plans) — 2026-07-11
- [x] Phase 7: Essential Parent Guides (3/3 plans) — 2026-07-11
- [x] Phase 8: Release Readiness (4/4 plans) — 2026-07-12

Full details: [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

</details>

<details>
<summary>✅ v1.1 Understand the German & Berlin Education System (Phases 9–11) — SHIPPED 2026-07-26</summary>

- [x] Phase 9: Onboarding Guide Visual Foundation (3/3 plans) — 2026-07-12
- [x] Phase 10: Education Pathway Editorial (4/4 plans) — 2026-07-24
- [x] Phase 11: Flagship Discovery & Release (6/6 plans) — 2026-07-25

Full details: [milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md)

</details>

### 🚧 v1.2 Evidence-Based School Profiles

- [x] **Phase 12: Editorial & Research Framework** — Evidence standards, source hierarchy, editorial voice, tag taxonomy v1, pilot-selection criteria, qualitative review cadence (completed 2026-07-26)
- [x] **Phase 13: Evidence & Tag Schema Layer** — Structured tags, journalism/triangulated-community source tiers, triangulation validation, confidence labels (completed 2026-07-29)
- [x] **Phase 14: Pilot Profile Content** — 3–5 Lichtenberg schools tagged and narrated, including a lower-documentation school and a triangulated-community example (completed 2026-07-29)
- [ ] **Phase 15: Profile UI (Tags & Narrative)** — TagsSection + editorial narrative rendering, official-vs-community distinction, extended Fontes and correction path
- [ ] **Phase 16: Validation & Release Gates** — Non-pilot regression proof, schema/UI/Fontes test coverage, full CI green

## Phase Details

### Phase 12: Editorial & Research Framework
**Goal**: The editorial and research rules governing evidence-backed tags and narrative are written, reviewed, and published before any pilot school is tagged.
**Depends on**: v1.1 shipped (Phase 11)
**Requirements**: FRAME-01, FRAME-02, FRAME-03, FRAME-04
**Success Criteria** (what must be TRUE):
  1. `docs/RESEARCH.md` defines the official → journalism → triangulated-community source hierarchy with a concrete, auditable definition of "independent" sources
  2. `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, and `docs/DECISIONS.md` define tag taxonomy v1, banned/attributed-reputation language, and the non-superlative "Perfil da escola" voice
  3. The public `/methodology` page is updated to explain the evidence-backed tag/profile model, source tiers, and confidence labels to families
  4. A written pilot-selection rationale naming at least one deliberately lower-documentation school is recorded in `docs/` before any tagging begins
  5. A qualitative-content review cadence, distinct from the existing factual `research_status` recheck cadence, is documented
**Plans**: 4 plans
Plans:
- [x] 12-01-PLAN.md — Extend docs/RESEARCH.md + docs/DATA_MODEL.md (source hierarchy, independence rules, tag taxonomy shape, qualitative cadence field semantics)
- [x] 12-02-PLAN.md — Extend docs/EDITORIAL_GUIDE.md + docs/DECISIONS.md (banned/attributed-reputation voice, Perfil da escola voice, 4 dated ADR entries)
- [x] 12-03-PLAN.md — Extend public /methodology page (source tiers, tags vs facts, confidence labels, version marker)
- [x] 12-04-PLAN.md — Write docs/research/PILOT_SELECTION.md (named 3-5 school pilot set + community-evidence candidate)
**UI hint**: yes (methodology page content update)

### Phase 13: Evidence & Tag Schema Layer
**Goal**: The data model can represent structured, cited tags and triangulated community evidence, with validation rules enforced before any real content is authored.
**Depends on**: Phase 12
**Requirements**: TAG-01, TAG-02, TAG-03, TAG-04
**Success Criteria** (what must be TRUE):
  1. `schoolSchema` supports an optional tags collection where each tag references a taxonomy id, carries a confidence tier, and cites at least one evidence source
  2. `sourceTypeSchema`/`reliabilityLevelSchema` support `journalism` and a displayable triangulated-community source type, distinct from the reserved-only anecdotal tier
  3. A `validateTagEvidence` rule rejects any tag whose only evidence is a single, non-corroborated community source, and requires an independence-log entry for community-sourced tags
  4. Each tag's confidence label is drawn from a fixed, qualitative vocabulary that code and documentation both describe as evidence strength, not school quality
  5. Fixture-based unit tests demonstrate both valid and invalid tag/evidence combinations are correctly accepted or rejected
**Plans**: 4 plans
Plans:
- [x] 13-01-PLAN.md — Extend source types, factual allowlist, formatSourceType, D-06 Reliability Levels fix
- [x] 13-02-PLAN.md — Tag taxonomy, confidence enum, independence log, tag citation, format helpers
- [x] 13-03-PLAN.md — validateTagEvidence triangulation + confidence consistency (TDD)
- [x] 13-04-PLAN.md — Wire schoolSchema tags + qualitativeLastReviewed; keep validate:data green

### Phase 14: Pilot Profile Content
**Goal**: 3–5 representative Lichtenberg schools have real, evidence-backed tags and narrative authored against the Phase 13 schema, deliberately exercising triangulation and documentation-bias edge cases.
**Depends on**: Phase 13
**Requirements**: NARR-02, PILOT-01, PILOT-02, PILOT-03
**Success Criteria** (what must be TRUE):
  1. 3–5 schools in `lichtenbergPrimarySchools` have authored tags and a populated "Perfil da escola" narrative
  2. The pilot set includes at least one school explicitly selected for lower existing documentation, per the Phase 12 selection rationale
  3. At least one tag on a pilot school is backed by ≥2 independent, logged community sources, exercising the triangulation rule end-to-end
     *(Phase 14 acceptance per CONTEXT D-14: documented triangulation attempt + publish **or** documented withhold satisfies this criterion; a published community tag is not mandatory.)*
  4. Each pilot school's "Perfil da escola" narrative synthesizes only already-cited evidence, with no uncited claims and no ranking or superlative language
  5. `pnpm validate:data` passes for all schools after pilot content is authored, and the remaining 5–7 non-pilot schools are left untouched
**Plans**: 5 plans

Plans:
- [x] 14-01-PLAN.md — Schema: perfilDaEscola + qualitativeResearchNotes + D-03/D-04 cross-field gates (TDD)
- [x] 14-02-PLAN.md — DATA_MODEL docs + primarySchool qualitative passthrough
- [x] 14-03-PLAN.md — Sparse perfil/tags for Seepark, Friedrichsfelder, Grzimek (PILOT-02)
- [x] 14-04-PLAN.md — Wagner + Tolstoi content + live community triangulation log (PILOT-03)
- [x] 14-05-PLAN.md — Automated gate + human editorial/VAL-01 checkpoint

### Phase 15: Profile UI (Tags & Narrative)
**Goal**: Pilot school profile pages render tags and narrative with clear evidence provenance, without altering non-pilot pages.
**Depends on**: Phase 14
**Requirements**: NARR-01, NARR-03, NARR-04, NARR-05, NARR-06
**Success Criteria** (what must be TRUE):
  1. Pilot school profile pages render a `TagsSection` with tags grouped by category, showing confidence and source-type badges with expandable evidence
  2. The profile UI visually distinguishes official information from community-sourced observations wherever both appear
  3. Removing any single tag or narrative block from a pilot school's data does not break profile rendering — each qualitative element renders independently
  4. The `Fontes` section on a pilot school page includes citations sourced from tags and narrative in addition to existing fields, with no duplicate entries
  5. The correction/report-an-issue affordance on profile pages explicitly covers tags and narrative content
**Plans**: 6 plans
Plans:
- [ ] 15-00-PLAN.md — Wave 0 RED test stubs for TagsSection, EditorialNarrative, Fontes merge, SchoolProfile, ReportCorrection
- [ ] 15-01-PLAN.md — Tag taxonomy category helpers (getTagCategory / formatTagCategory)
- [ ] 15-02-PLAN.md — Fontes field+tag merge with citedBy + Citado em: in SourcesSection
- [ ] 15-03-PLAN.md — EditorialNarrative + TagsSection (category groups + evidence expand)
- [ ] 15-04-PLAN.md — /report-correction/ page with school prefill + mailto (NARR-06)
- [ ] 15-05-PLAN.md — Wire SchoolProfile editorial zone, Perfil oficial rename, correction CTA
**UI hint**: yes

### Phase 16: Validation & Release Gates
**Goal**: The pilot evidence-backed profile model is proven trustworthy, repeatable, and maintainable through automated regression coverage before milestone close.
**Depends on**: Phase 15
**Requirements**: VAL-01, VAL-02
**Success Criteria** (what must be TRUE):
  1. Non-pilot school profile pages and each school's `coverage.percentage` value are verified byte-identical before and after tags/editorial are introduced
  2. Jest/RTL tests cover the new schema validators (tag evidence, triangulation, community-tier rules) and the `TagsSection`/`EditorialNarrative` components
  3. Playwright coverage confirms tag chips, narrative, and `Fontes` render together on a pilot school profile page
  4. Full `pnpm test`, `pnpm e2e:ci`, and `next build` (static export) pass green before milestone close
**Plans**: TBD

## Progress

| Phase | Milestone | Plans | Status | Completed |
|-------|-----------|-------|--------|-----------|
| 1–8 | v1.0 | 26/26 | Shipped | 2026-07-12 |
| 9–11 | v1.1 | 13/13 | Shipped | 2026-07-26 |
| 12. Editorial & Research Framework | v1.2 | 4/4 | Complete    | 2026-07-26 |
| 13. Evidence & Tag Schema Layer | v1.2 | 4/4 | Complete    | 2026-07-29 |
| 14. Pilot Profile Content | v1.2 | 5/5 | Complete    | 2026-07-29 |
| 15. Profile UI (Tags & Narrative) | v1.2 | 0/6 | Planned | - |
| 16. Validation & Release Gates | v1.2 | 0/? | Not started | - |

## Future Backlog

*Deferred beyond v1.2 — see `.planning/REQUIREMENTS.md` Future Requirements for full detail*

| Item | Notes |
|------|-------|
| **Tag provenance / changelog UI** | Added date, evidence at addition, last reviewed — after pilot validation (FUT-01) |
| **Promote tags to directory cards & compare** | Gated on pilot model being proven (FUT-02) |
| **Expand/revise tag taxonomy** | Based on pilot gaps (FUT-03) |
| **Tag-aware Open Day questions** | After pilot validation (FUT-04) |
| **Apply model to remaining Lichtenberg schools** | After pilot validation (FUT-05) |
| **Expand coverage to additional Berlin districts** | After pilot validation (FUT-06) |
| **User-configurable compatibility framing** | Fit, not quality ranking — longer-term (FUT-07) |
| **Structured community-observation submission intake** | Longer-term (FUT-08) |
| **Berlin-wide directory import (M8) / cross-Berlin profiles (M9)** | Longer-term (FUT-09) |
| **Launch polish** | README status, production deploy, `NEXT_PUBLIC_SITE_URL` |
