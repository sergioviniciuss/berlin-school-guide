# Requirements: Berlin School Guide V1

**Defined:** 2026-07-11
**Core Value:** Parents can trust what they read because every factual school field shows its evidence status and sources — and missing or unconfirmed information is visible, not hidden.

## v1 Requirements

### Data Integrity & Evidence

- [ ] **DATA-01**: Every Lichtenberg school record is audited field-by-field against its cited sources
- [ ] **DATA-02**: Implicit evidence fallbacks (`ganztag` → `afterSchoolCare`, `offers` → multiple fields) are removed or explicitly flagged as unsupported inference
- [ ] **DATA-03**: Evidence coverage score reflects only fields with topically valid, independently cited evidence
- [ ] **DATA-04**: Directory-only vs detailed research levels are distinguished in data and UI (no detailed claims from directory-only sources)
- [ ] **DATA-05**: Misleading "synthetic" labels and M2 scaffolding copy are replaced with honest partial-coverage messaging
- [ ] **DATA-06**: Synthetic test fixtures are isolated from production data paths (`getRealSchools` only in pages)

### Research Process

- [ ] **RSCH-01**: A documented, repeatable school research workflow exists (sources, field checklist, evidence status rules)
- [ ] **RSCH-02**: Each school record includes `lastResearched` and `lastSourceChecked` dates that match actual research
- [ ] **RSCH-03**: A methodology page explains how evidence, missing data, and coverage scores work for parents
- [ ] **RSCH-04**: Source citations are visible and link to original references on school detail pages

### School Profiles

- [ ] **PROF-01**: User can open a school detail page at `/schools/[slug]` for every school in the directory
- [ ] **PROF-02**: Detail page shows key facts with per-field evidence status labels
- [ ] **PROF-03**: Detail page shows consolidated sources section with publisher and access date
- [ ] **PROF-04**: Missing and unconfirmed fields are clearly labeled — never shown as verified
- [ ] **PROF-05**: Three deeply researched schools (Adam-Ries, Lew-Tolstoi, Richard-Wagner) meet detailed profile publication standards
- [ ] **PROF-06**: Seven directory-only schools show only claims supported by official portrait data, with other fields marked missing
- [ ] **PROF-07**: School cards in directory link to detail pages

### Comparison

- [ ] **COMP-01**: User can select schools from the directory to compare
- [ ] **COMP-02**: Comparison shows criteria side by side without a universal quality ranking
- [ ] **COMP-03**: Comparison surfaces missing data and evidence coverage per school
- [ ] **COMP-04**: Comparison limitations are explained in Portuguese

### Navigation & Core Journey

- [ ] **NAV-01**: Homepage introduces the product in Portuguese and links to directory and guides
- [ ] **NAV-02**: Shared site header/footer navigation connects home, directory, guides, comparison, and methodology
- [ ] **NAV-03**: User can complete journey: home → understand system (guide) → browse/filter schools → view profile → compare

### Guides

- [ ] **GUID-01**: Berlin primary education system guide page exists in Brazilian Portuguese
- [ ] **GUID-02**: At least one practical checklist (school visit or enrollment preparation) exists
- [ ] **GUID-03**: German education terms are explained in Portuguese context

### Release Readiness

- [ ] **REL-01**: Static production build passes with no errors
- [ ] **REL-02**: All school data passes `pnpm validate:data`
- [ ] **REL-03**: Critical user workflows have Playwright e2e coverage (directory, profile, comparison, navigation)
- [ ] **REL-04**: Pages have appropriate metadata (title, description) for SEO in Portuguese
- [ ] **REL-05**: Layout is usable on mobile and desktop viewports
- [ ] **REL-06**: Accessibility basics reviewed (headings, labels, focus, contrast) for core pages
- [ ] **REL-07**: Deployment documentation includes static host requirements (headers, export output)

## v2 Requirements

Deferred until Lichtenberg V1 is trustworthy and released.

### Directory Expansion

- **DIR-01**: Broad Berlin-wide primary school directory from official sources (M8)
- **DIR-02**: Private primary schools included where reliable basic data exists

### Research Scale

- **RSCH-10**: 20–30 detailed pilot profiles across Berlin with geographic diversity (M9)
- **RSCH-11**: Automated or semi-automated import from official Berlin school directory

### Guides Depth

- **GUID-10**: Full guide set (enrollment, catchment, ganztag, public/private, inspections)
- **GUID-11**: Correction/report flow for factual errors

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend database or production APIs | Static-first V1; no demonstrated need |
| User accounts / authentication | Not V1 per `docs/PRODUCT.md` |
| Berlin-wide directory before Lichtenberg V1 | Trust and process must be proven first |
| School quality rankings or scores | Violates comparison philosophy |
| User-generated reviews | Trust model is evidence-based editorial research |
| Mobile native app | Web-first V1 |
| Multilingual UI | Brazilian Portuguese only for V1 |
| Live transit / route planning | Not core to school evaluation |
| AI recommendations without citations | Conflicts with evidence-first principle |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |
| DATA-03 | Phase 1 | Pending |
| DATA-04 | Phase 1 | Pending |
| DATA-05 | Phase 1 | Pending |
| DATA-06 | Phase 1 | Pending |
| RSCH-01 | Phase 2 | Pending |
| RSCH-02 | Phase 2 | Pending |
| RSCH-03 | Phase 2 | Pending |
| RSCH-04 | Phase 2 | Pending |
| PROF-01 | Phase 3 | Pending |
| PROF-02 | Phase 3 | Pending |
| PROF-03 | Phase 3 | Pending |
| PROF-04 | Phase 3 | Pending |
| PROF-05 | Phase 3 | Pending |
| PROF-06 | Phase 3 | Pending |
| PROF-07 | Phase 3 | Pending |
| COMP-01 | Phase 4 | Pending |
| COMP-02 | Phase 4 | Pending |
| COMP-03 | Phase 4 | Pending |
| COMP-04 | Phase 4 | Pending |
| NAV-01 | Phase 5 | Pending |
| NAV-02 | Phase 5 | Pending |
| NAV-03 | Phase 5 | Pending |
| GUID-01 | Phase 6 | Pending |
| GUID-02 | Phase 6 | Pending |
| GUID-03 | Phase 6 | Pending |
| REL-01 | Phase 7 | Pending |
| REL-02 | Phase 7 | Pending |
| REL-03 | Phase 7 | Pending |
| REL-04 | Phase 7 | Pending |
| REL-05 | Phase 7 | Pending |
| REL-06 | Phase 7 | Pending |
| REL-07 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-11*
*Last updated: 2026-07-11 after initial definition*
