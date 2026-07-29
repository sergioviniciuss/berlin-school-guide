# Requirements: Berlin School Guide — v1.2

**Defined:** 2026-07-26
**Core Value:** Parents can trust what they read because every factual school field shows its evidence status and sources — and missing or unconfirmed information is visible, not hidden.
**Milestone:** v1.2 Evidence-Based School Profiles

**Success criterion:** Prove that the evidence-backed school profile model is trustworthy, repeatable, and maintainable — helping families understand what kind of school this is and whether it matches their needs — rather than ranking schools or maximizing coverage.

## v1.2 Requirements

### Framework & methodology

- [x] **FRAME-01**: Editorial & research framework in `docs/` defines evidence standards, source hierarchy (official → journalism → triangulated community), editorial voice, tag taxonomy v1, citation rules, and maintenance guidelines
- [x] **FRAME-02**: Public `/methodology` page is updated and versioned to explain the evidence-backed profile model to families
- [x] **FRAME-03**: Written pilot-selection criteria include ≥1 lower-documentation school and are recorded before tagging begins
- [x] **FRAME-04**: Qualitative content has an explicit review cadence separate from factual field recheck

### Evidence model & tags

- [x] **TAG-01**: School records support structured tags with per-tag citations and evidence status
- [x] **TAG-02**: Source model supports `journalism` and a displayable triangulated-community tier (distinct from hidden reserved anecdotal)
- [x] **TAG-03**: Community evidence requires ≥2 independent sources, an independence log, and can never be the sole basis for a tag
- [x] **TAG-04**: Each tag shows a qualitative confidence label that means evidence strength, not school quality

### Profile narrative & UI

- [ ] **NARR-01**: Pilot school profiles render structured tags (grouped, cited, with evidence-strength labels)
- [ ] **NARR-02**: Short PT-BR `Perfil da escola` synthesizes existing cited evidence only — never introduces uncited claims or ranking language
- [ ] **NARR-03**: UI clearly distinguishes official information from community observations
- [ ] **NARR-04**: Every qualitative element (tag or narrative block) is independently supported and removable without breaking the profile
- [ ] **NARR-05**: Fontes includes citations from tags and narrative as well as existing fields
- [ ] **NARR-06**: Correction / report-an-issue path explicitly covers tags and narrative

### Pilot & validation

- [ ] **PILOT-01**: 3–5 representative Lichtenberg schools ship fully tagged and narrated profiles
- [ ] **PILOT-02**: Pilot set includes ≥1 lower-documentation school
- [ ] **PILOT-03**: At least one triangulated-community example is exercised end-to-end
- [ ] **VAL-01**: Non-pilot school profiles remain unchanged; coverage % is not silently altered by tags/editorial
- [ ] **VAL-02**: Automated tests cover schema/triangulation rules, tags/narrative UI, and Fontes merge

## Future Requirements

Deferred beyond v1.2. Tracked but not in current roadmap.

### After pilot validation

- **FUT-01**: Tag provenance / changelog UI (added date, evidence at addition, last reviewed)
- **FUT-02**: Promote validated tags to directory cards and comparison views
- **FUT-03**: Expand / revise tag taxonomy based on pilot gaps
- **FUT-04**: Tag-aware Open Day questions
- **FUT-05**: Apply evidence-backed profile model to remaining Lichtenberg schools
- **FUT-06**: Expand coverage to additional Berlin districts

### Longer-term

- **FUT-07**: User-configurable compatibility framing (fit, not quality ranking)
- **FUT-08**: Structured community-observation submission intake
- **FUT-09**: Berlin-wide directory import (M8) and cross-Berlin detailed profiles (M9)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Numeric/star scores, “top N,” “excellent school,” “better than X” | Anti-ranking philosophy; match-making over ranking |
| Confidence labels as school-quality signals | Confidence means evidence strength only |
| Community as sole basis for a tag | Triangulation rule; trust model |
| Tags on directory cards or compare this milestone | Deferred until pilot model is proven |
| Maximizing school count as success metric | Coverage expansion is secondary |
| AI-generated tags/narrative without human citation trail | Trust / evidence requirements |
| School-authored or paid “premium profile” tags | Conflict of interest |
| Aggregated parent star ratings | Misleading; banned by existing decisions |
| Backend DB, auth, personalized dashboards | Static-first V1 |
| Multilingual beyond Brazilian Portuguese | Product constraint unchanged |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FRAME-01 | Phase 12 | Complete |
| FRAME-02 | Phase 12 | Complete |
| FRAME-03 | Phase 12 | Complete |
| FRAME-04 | Phase 12 | Complete |
| TAG-01 | Phase 13 | Complete |
| TAG-02 | Phase 13 | Complete |
| TAG-03 | Phase 13 | Complete |
| TAG-04 | Phase 13 | Complete |
| NARR-01 | Phase 15 | Pending |
| NARR-02 | Phase 14 | Pending |
| NARR-03 | Phase 15 | Pending |
| NARR-04 | Phase 15 | Pending |
| NARR-05 | Phase 15 | Pending |
| NARR-06 | Phase 15 | Pending |
| PILOT-01 | Phase 14 | Pending |
| PILOT-02 | Phase 14 | Pending |
| PILOT-03 | Phase 14 | Pending |
| VAL-01 | Phase 16 | Pending |
| VAL-02 | Phase 16 | Pending |

**Coverage:**
- v1.2 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-26*
*Last updated: 2026-07-26 — roadmap created, Phases 12–16 mapped (19/19 requirements)*
