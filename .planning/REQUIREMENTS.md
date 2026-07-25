# Requirements: Berlin School Guide — v1.1

**Defined:** 2026-07-12
**Core Value:** Parents can trust what they read because every factual school field shows its evidence status and sources — and missing or unconfirmed information is visible, not hidden.

**Milestone:** v1.1 Understand the German & Berlin Education System

## v1.1 Requirements

### Onboarding Guide Content

- [x] **ONBD-01**: Flagship guide explains the full German education path from Kita through secondary school, vocational training, and higher education
- [x] **ONBD-02**: Guide covers major decision points (school transitions, track selection, qualification routes) in plain Brazilian Portuguese
- [x] **ONBD-03**: Guide explains non-Gymnasium pathways to university or higher education (e.g. Ausbildung, Duales Studium, Fachabitur)
- [x] **ONBD-04**: Berlin-specific differences are highlighted throughout the Germany-wide narrative (not structured as a Berlin guide with a German appendix)
- [x] **ONBD-05**: Integrated glossary explains key German terms (Ganztag, Hort, Willkommensklasse, Ausbildung, Duales Studium, Fachabitur, and related concepts)
- [x] **ONBD-06**: Guide positions the site as definitive onboarding for Brazilian families moving to Germany, with clear next steps toward directory/comparison/guides

### Visual Communication

- [x] **VIS-01**: Education journey is communicated with visual timeline(s), minimizing long unstructured text blocks
- [x] **VIS-02**: Pathway decision points use diagrams or structured visual branches (e.g. Gymnasium vs Realschule vs other tracks)
- [x] **VIS-03**: Berlin-specific callouts are visually distinct from Germany-wide content so families can scan differences quickly

### Discovery & Integration

- [x] **DISC-01**: Homepage prominently links to the onboarding guide as a primary journey entry
- [x] **DISC-02**: `/guides` hub positions the onboarding guide as the flagship card above other guides
- [x] **DISC-03**: Cross-links connect onboarding guide ↔ existing Berlin primary guide ↔ directory ↔ first-steps checklist
- [x] **DISC-04**: Relationship between new onboarding guide and `/guides/berlin-school-system` is explicit (complementary, not duplicate)

### Release Quality

- [x] **REL-01**: New guide route has Portuguese SEO metadata and passes existing metadata e2e patterns
- [ ] **REL-02**: Guide page meets accessibility basics (heading structure, landmark navigation, print-friendly where applicable)
- [ ] **REL-03**: Playwright smoke covers homepage → onboarding guide journey

## v1.2 Requirements (Next Milestone — School Coverage)

Deferred until v1.1 ships.

### Directory Expansion

- **EXP-01**: Complete research coverage for all Lichtenberg public primary schools beyond the current 10-school set
- **EXP-02**: Expand to additional Berlin districts using district-scoped content modules
- **EXP-03**: Berlin-wide directory import from official sources (M8)
- **EXP-04**: 20–30 detailed cross-Berlin pilot profiles (M9)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Berlin-only guide structure (Germany as appendix) | User direction: Germany-first onboarding with Berlin woven throughout |
| Interactive pathway calculators or quizzes | Static MDX milestone; avoid scope creep |
| Replacing `/guides/berlin-school-system` entirely | Complementary Berlin primary deep-dive remains valuable |
| School data research in v1.1 | Explicitly deferred to v1.2 after onboarding guide ships |
| Multilingual content beyond Brazilian Portuguese | Product constraint unchanged |
| User accounts or personalized pathway recommendations | Out of V1 scope |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ONBD-01 | Phase 10 | Complete |
| ONBD-02 | Phase 10 | Complete |
| ONBD-03 | Phase 10 | Complete |
| ONBD-04 | Phase 10 | Complete |
| ONBD-05 | Phase 10 | Complete |
| ONBD-06 | Phase 11 | Complete |
| VIS-01 | Phase 9 | Complete |
| VIS-02 | Phase 9 | Complete |
| VIS-03 | Phase 9 | Complete |
| DISC-01 | Phase 11 | Complete |
| DISC-02 | Phase 11 | Complete |
| DISC-03 | Phase 11 | Complete |
| DISC-04 | Phase 11 | Complete |
| REL-01 | Phase 11 | Complete |
| REL-02 | Phase 11 | Pending |
| REL-03 | Phase 11 | Pending |

**Coverage:**
- v1.1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-12*
*Last updated: 2026-07-12 after v1.1 roadmap creation*
