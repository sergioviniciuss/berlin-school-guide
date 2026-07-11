# Roadmap: Berlin School Guide — V1 (Lichtenberg Trustworthy Launch)

## Overview

This is a brownfield continuation. M1–M4 already shipped the static foundation, the school/evidence data model, and a filterable school directory with 10 real Lichtenberg schools. What's missing is trust integrity in that data, the reproducible research process behind it, and every downstream page a family needs to actually use it — plus a polished discovery experience before comparison and guides.

The eight phases prioritize **trustworthiness and data quality first**, then make the product **navigable early**, build **profiles and directory UX**, and only then add comparison, guides, and release readiness. Berlin-wide directory expansion (M8) and the 20–30 pilot profile push (M9) are explicitly out of scope for this milestone.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Data & Evidence Audit** - Audit all 10 Lichtenberg records, remove misleading evidence fallbacks and synthetic copy
- [ ] **Phase 2: Research Process & Attribution** - Document a repeatable research workflow with dated, citable sources and a parent-facing methodology page
- [ ] **Phase 3: Homepage, Navigation & Core Journey** - Replace M2 homepage copy and add shared site navigation
- [ ] **Phase 4: School Detail Profiles** - Build `/schools/[slug]` with per-field evidence labels and consolidated sources
- [ ] **Phase 5: Directory UX & Discovery** - Polish search, filters, sorting, empty states, mobile usability, and discoverability
- [ ] **Phase 6: School Comparison** - Let families compare selected schools side by side without a quality ranking
- [ ] **Phase 7: Essential Parent Guides** - Publish the Berlin primary system guide and a practical checklist in Portuguese
- [ ] **Phase 8: Release Readiness** - Validate build, data, e2e coverage, SEO, responsiveness, and accessibility before launch

## Phase Details

### Phase 1: Data & Evidence Audit
**Goal**: Every published fact about a Lichtenberg school is honestly evidenced — marked verified only when independently confirmed, missing when it isn't, and coverage numbers reflect real research depth rather than fallback inference.
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06
**Success Criteria** (what must be TRUE):
  1. Every one of the 10 Lichtenberg school records has been reviewed field-by-field against its cited sources, with any inaccurate or unsupported "verified" status corrected.
  2. `afterSchoolCare`, `pedagogyFocus`/`schoolProfile`, and other fields no longer inherit "verified" status from an unrelated field's citation (e.g. reusing `ganztag` evidence) unless that field was independently confirmed.
  3. Evidence coverage percentages shown anywhere in the app reflect only topically valid, independently cited fields — visibly lower for directory-only schools than before the audit.
  4. Directory-only schools are visibly distinguished from detailed schools in the data and UI, and no directory-only school displays a detailed-level claim it can't support.
  5. No page or component shows "sintética"/"synthetic"/M2 scaffolding wording, and synthetic test fixtures (`getSyntheticSchools` or equivalent) are unreachable from any production page.
**Plans**: 3 plans (3 waves)
- 01-01: Evidence data integrity — inferredFrom helper + 10-school audit
- 01-02: Evidence coverage v2 — level-aware denominators and tier labels
- 01-03: Trust UX — SchoolCard badges, honest copy, synthetic isolation

### Phase 2: Research Process & Attribution
**Goal**: Anyone — including a future Claude session — can repeat the school research process consistently, and parents can see exactly where every fact came from.
**Depends on**: Phase 1
**Requirements**: RSCH-01, RSCH-02, RSCH-03, RSCH-04
**Success Criteria** (what must be TRUE):
  1. A written research workflow document exists in the repo describing which sources to check, a per-field checklist, and the rules for assigning each evidence status.
  2. Every school record's `lastResearched`/`lastSourceChecked` dates match when that school's data was actually reviewed (checkable via `pnpm validate:data` or an audit script).
  3. A `/methodology` page written in Portuguese explains to a parent how evidence status, missing-data labeling, and coverage scores work.
  4. Every evidence entry across all schools carries a complete, citable source record (publisher, URL, access date) ready to render — no field is marked verified without a linkable source.
**Plans**: TBD

### Phase 3: Homepage, Navigation & Core Journey
**Goal**: The product becomes navigable early — a family landing on the site can understand what it is and reach the school directory without typing a URL.
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. The homepage presents the product in Portuguese, replacing the old "M2 foundation validation" copy, and links prominently to the school directory.
  2. A shared header/footer appears on every page and links home, directory, and methodology (comparison and guides links appear as those phases ship).
  3. A user can go from the homepage to the filtered school directory using only in-page navigation.
**Plans**: TBD
**UI hint**: yes

### Phase 4: School Detail Profiles
**Goal**: Families can open any school in the directory and see its complete, evidence-labeled profile.
**Depends on**: Phase 3
**Requirements**: PROF-01, PROF-02, PROF-03, PROF-04, PROF-05, PROF-06, PROF-07
**Success Criteria** (what must be TRUE):
  1. Every school in the directory has a working `/schools/[slug]` detail page (10/10, no dead links).
  2. Each detail page shows key facts with a visible per-field evidence status label (verified / not confirmed / missing) — unconfirmed data is never presented as fact.
  3. Each detail page has a consolidated sources section listing publisher and access date for every citation used on that page.
  4. The three deeply researched schools (Adam-Ries, Lew-Tolstoi, Richard-Wagner) present a fuller "detailed" profile, while the seven directory-only schools show only officially-sourced fields, with everything else clearly marked missing.
  5. Clicking a school card in `/schools` navigates directly to that school's detail page.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Directory UX & Discovery
**Goal**: The school directory is an excellent discovery experience — easy to search, filter, sort, and understand on any device.
**Depends on**: Phase 4
**Requirements**: DISC-01, DISC-02, DISC-03, DISC-04, DISC-05, DISC-06, DISC-07, DISC-08
**Success Criteria** (what must be TRUE):
  1. Search shows result counts, has clear Portuguese labeling, and feels responsive while typing (debounce or equivalent if needed).
  2. Active filters are summarized visibly and can be cleared in one action; filter controls are usable without reading code.
  3. User can sort results by at least name and evidence coverage (additional sort keys welcome if useful).
  4. Sharing a URL with filter/search params restores the same directory view in a fresh browser session.
  5. When no schools match, the page explains why and suggests how to broaden the search — not a blank screen.
  6. Directory layout and filter controls work on a mobile viewport without horizontal scrolling or unusably small tap targets.
  7. Filtering 10 schools shows no perceptible input lag; approach is documented for scaling later.
  8. Cards or list items surface research depth (directory vs detailed, coverage %) so parents can gauge data quality at a glance.
**Plans**: TBD
**UI hint**: yes

### Phase 6: School Comparison
**Goal**: Families can compare multiple nearby schools side by side, without the product pushing them toward a "best school" ranking.
**Depends on**: Phase 5
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04
**Success Criteria** (what must be TRUE):
  1. A user can select multiple schools from the directory and view them together on a comparison page.
  2. The comparison lays the same criteria side by side for each selected school, with no composite score or "best school" ranking shown.
  3. The comparison view surfaces each school's missing-data status and evidence coverage, not just its filled-in facts.
  4. The comparison page explains, in Portuguese, what the comparison can and cannot tell a family.
**Plans**: TBD
**UI hint**: yes

### Phase 7: Essential Parent Guides
**Goal**: A Brazilian family new to Berlin can understand how the local primary school system works and knows what to do next.
**Depends on**: Phase 6
**Requirements**: GUID-01, GUID-02, GUID-03
**Success Criteria** (what must be TRUE):
  1. A Portuguese-language guide page explains how the Berlin primary education system works (Grundschule basics, how enrollment generally works).
  2. At least one practical checklist (school visit or enrollment preparation) is published and usable end to end.
  3. German education terms used across the site (Ganztag, Bezirk, Schulportrait, etc.) are explained in Portuguese context within the guides.
**Plans**: TBD
**UI hint**: yes

### Phase 8: Release Readiness
**Goal**: The site is production-ready — it builds cleanly, its data validates, and it works for real families on real devices.
**Depends on**: Phase 7
**Requirements**: REL-01, REL-02, REL-03, REL-04, REL-05, REL-06, REL-07
**Success Criteria** (what must be TRUE):
  1. `pnpm build` produces a static export with zero errors, and `pnpm validate:data` passes for all school records.
  2. Playwright e2e tests cover the directory, profile, comparison, and navigation flows, and run as part of CI.
  3. Every page has an appropriate, distinct Portuguese title and description for SEO.
  4. Core pages are usable on both mobile and desktop viewports, with accessibility basics (heading structure, form labels, focus states, contrast) reviewed.
  5. Deployment documentation specifies static host requirements (export output directory, recommended response headers).
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Data & Evidence Audit | 0/3 | Ready to execute | - |
| 2. Research Process & Attribution | 0/TBD | Not started | - |
| 3. Homepage, Navigation & Core Journey | 0/TBD | Not started | - |
| 4. School Detail Profiles | 0/TBD | Not started | - |
| 5. Directory UX & Discovery | 0/TBD | Not started | - |
| 6. School Comparison | 0/TBD | Not started | - |
| 7. Essential Parent Guides | 0/TBD | Not started | - |
| 8. Release Readiness | 0/TBD | Not started | - |

## Future Backlog

*Not part of the V1 milestone. Track here; promote via `/gsd-add-backlog` or next milestone planning.*

| Item | Notes |
|------|-------|
| **Complete all Lichtenberg Grundschulen** | Research every public primary school in Lichtenberg with official sources and full evidence attribution — beyond the current 10-school spike set |
| **Expand to additional Berlin districts** | Reuse district-scoped content modules and research workflow; architecture already supports `location.district` |
| **Berlin-wide directory import (M8)** | Broad static directory from official Berlin school data once Lichtenberg V1 proves trustworthy |
| **20–30 detailed pilot profiles (M9)** | Cross-Berlin research depth with geographic diversity |
| **Full guide library** | Enrollment, catchment, ganztag, public/private, inspections, correction flow |
| **Future product enhancements** | Features beyond initial launch scope — evaluate only after V1 ships and parent feedback exists |
