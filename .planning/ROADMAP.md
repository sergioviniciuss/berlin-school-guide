# Roadmap: Berlin School Guide

## Milestones

- ✅ **v1.0 Lichtenberg Trustworthy Launch** — Phases 1–8 (shipped 2026-07-12) — [archive](milestones/v1.0-ROADMAP.md)
- 🚧 **v1.1 Understand the German & Berlin Education System** — Phases 9–11 (in progress)
- 📋 **v1.2 School Coverage Expansion** — planned after v1.1

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

### 🚧 v1.1 Understand the German & Berlin Education System

- [ ] **Phase 9: Onboarding Guide Visual Foundation** — MDX timeline/diagram components, Berlin callout pattern, route shell for `/guides/german-education-system`
- [ ] **Phase 10: Education Pathway Editorial** — Full Kita→higher-ed content, decision points, glossary, Berlin differences woven throughout
- [ ] **Phase 11: Flagship Discovery & Release** — Homepage/Guides hub prominence, cross-links, berlin-school-system relationship, metadata, e2e, a11y

## Phase Details

### Phase 9: Onboarding Guide Visual Foundation
**Goal**: Families can open the onboarding guide and immediately see a visual education journey scaffold — timelines, pathway branches, and Berlin callouts — not a text wall.
**Depends on**: v1.0 shipped
**Requirements**: VIS-01, VIS-02, VIS-03
**Success Criteria** (what must be TRUE):
  1. `/guides/german-education-system` route exists with GuideIntro shell and placeholder MDX wired
  2. Reusable MDX components render an education timeline and at least one pathway decision diagram
  3. Berlin-specific callout component is visually distinct and usable inline in MDX
  4. Components are responsive on mobile and desktop without horizontal overflow
**Plans**: 3 plans
Plans:
- [ ] 09-01-PLAN.md — BerlinCallout + GlossaryTerm components (VIS-03, VIS-01)
- [ ] 09-02-PLAN.md — EducationTimeline branching infographic + TimelineNode (VIS-01, VIS-02)
- [ ] 09-03-PLAN.md — Route shell, MDX registration, placeholder content, e2e coverage (VIS-01, VIS-02, VIS-03)
**UI hint**: yes

### Phase 10: Education Pathway Editorial
**Goal**: The onboarding guide answers the questions every newly arrived Brazilian family has about the German education system, with Berlin differences highlighted throughout.
**Depends on**: Phase 9
**Requirements**: ONBD-01, ONBD-02, ONBD-03, ONBD-04, ONBD-05
**Success Criteria** (what must be TRUE):
  1. Guide covers Kita → Grundschule → secondary tracks → Abitur/Ausbildung → Uni/Hochschule in Brazilian Portuguese
  2. Non-Gymnasium routes to higher education are explained without implying Gymnasium is the only path
  3. Berlin differences (including 6-year Grundschule) appear as integrated callouts, not a separate Berlin-only section bolted on at the end
  4. Glossary entries for Ganztag, Hort, Willkommensklasse, Ausbildung, Duales Studium, Fachabitur, and related terms are linked from the narrative
  5. Editorial tone matches `docs/EDITORIAL_GUIDE.md` — practical, honest, no ranking language
**Plans**: TBD (via `/gsd-plan-phase 10`)
**UI hint**: yes (content-heavy; visual components from Phase 9)

### Phase 11: Flagship Discovery & Release
**Goal**: The onboarding guide is the site's primary entry point for new families and connects cleanly to the rest of the product.
**Depends on**: Phase 10
**Requirements**: ONBD-06, DISC-01, DISC-02, DISC-03, DISC-04, REL-01, REL-02, REL-03
**Success Criteria** (what must be TRUE):
  1. Homepage journey card promotes the onboarding guide as the primary "start here" path
  2. `/guides` hub shows onboarding guide as the flagship card above berlin-school-system and first-steps
  3. Cross-links connect onboarding ↔ berlin-school-system ↔ first-steps ↔ directory; relationship to berlin-school-system is stated in copy
  4. Page metadata (title, description, OG) is distinct and in Portuguese; e2e smoke covers homepage → onboarding guide
  5. Axe/accessibility checks pass on the new route
**Plans**: TBD (via `/gsd-plan-phase 11`)
**UI hint**: yes

## Progress

| Phase | Milestone | Plans | Status | Completed |
|-------|-----------|-------|--------|-----------|
| 1–8 | v1.0 | 26/26 | Shipped | 2026-07-12 |
| 9 | v1.1 | 0/3 | Planned | — |
| 10 | v1.1 | 0/? | Not started | — |
| 11 | v1.1 | 0/? | Not started | — |

## Future Backlog

*v1.2 — School Coverage Expansion (after v1.1)*

| Item | Notes |
|------|-------|
| **Complete all Lichtenberg Grundschulen** | Research every public primary school in Lichtenberg with official sources |
| **Expand to additional Berlin districts** | Reuse district-scoped content modules and research workflow |
| **Berlin-wide directory import (M8)** | Broad static directory from official Berlin school data |
| **20–30 detailed pilot profiles (M9)** | Cross-Berlin research depth with geographic diversity |
| **Full guide library** | Enrollment, catchment, inspections, correction flow — beyond onboarding |
| **Launch polish** | README status, production deploy, `NEXT_PUBLIC_SITE_URL` |
