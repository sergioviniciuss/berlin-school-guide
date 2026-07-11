# Phase 6: School Comparison - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Build `/compare` so families can select multiple Lichtenberg schools from the directory and view the same criteria side by side — with per-field evidence status, coverage visibility, and honest limitations copy. No quality ranking, composite scores, or "best school" signals.

Selection UX, comparison table, shareable URL, and Comparar nav link are in scope. Guides content, new data sources, profile page redesign, and future compatibility scoring are out of scope.

</domain>

<decisions>
## Implementation Decisions

### School selection from directory (COMP-01)
- **D-01:** Each `SchoolCard` gets a **compare checkbox** (separate from the profile link — checkbox click must not navigate to profile).
- **D-02:** **Minimum 2 schools** required to open the comparison view; **maximum 4 schools** in one comparison.
- **D-03:** When ≥1 school is selected, show a **sticky compare bar** (mobile + desktop) with count — e.g. `"2 escolas selecionadas"` — and primary CTA **"Comparar escolas"** linking to `/compare`.
- **D-04:** Selection state **persists in URL** as `?compare=slug1,slug2` on `/schools` (comma-separated slugs, English param name) so refresh and back/forward restore selection; navigating to `/compare` uses the same slug list in `?schools=slug1,slug2`.

### Comparison page layout (COMP-02, COMP-03)
- **D-05:** Route **`/compare`** with visible heading **"Comparar"** per `docs/INFORMATION_ARCHITECTURE.md`.
- **D-06:** Layout is a **criteria table**: rows = comparison fields grouped by section (matching `SchoolProfile` section headings), columns = selected schools (school name in column header).
- **D-07:** Each cell shows **formatted value + evidence status badge** (reuse `StatusBadge` / `formatFieldStatus` patterns from profile pages) — unverified data never styled as fact.
- **D-08:** Column header for each school includes **research tier label + coverage %** (same semantics as directory cards — coverage = research completeness, not quality).
- **D-09:** **No composite score**, no column highlighting as "winner", no default sort by quality, no ranking language anywhere on the page.

### Comparison criteria (COMP-02, COMP-03)
- **D-10:** Compare the **priority criteria from `docs/COMPARISON.md`** using the same important field paths as detailed profiles where data exists; for directory-only schools, show missing/not_confirmed honestly.
- **D-11:** Field groups mirror profile sections: **Identificação**, **Oferta pedagógica**, **Apoio à família**, **Inspeção** — reuse `PROFILE_SECTIONS` / `profileFieldLabels` as the row source of truth.
- **D-12:** **Inspection availability** compared as available / unavailable / not_confirmed only — no quality interpretation (per COMPARISON.md).

### Limitations copy (COMP-04)
- **D-13:** Page opens with a **Portuguese limitations block** explaining what comparison can and cannot tell a family (no ranking, coverage ≠ quality, missing fields mean ask on visit) — link to `/methodology`.
- **D-14:** Limitations copy is **always visible** above the table (not collapsed behind a tooltip).

### Navigation and discoverability
- **D-15:** Add **`Comparar`** to `SiteHeader` / `SiteFooter` nav when `/compare` ships (Phase 3 D-07 — live routes only).
- **D-16:** Compare bar CTA and empty `/compare` state link back to **`/schools`** to pick schools.

### Shareable comparison URLs
- **D-17:** `/compare?schools=slug1,slug2,slug3` restores the same schools in a fresh session (static lookup via `getSchoolBySlug`).
- **D-18:** Invalid or unknown slugs in the URL are **skipped with a visible notice**; if fewer than 2 valid schools remain, show empty state with link to directory.

### Mobile behavior
- **D-19:** On viewports below `lg`, comparison table uses **horizontal scroll** with the criteria label column **sticky** on the left — no card-per-school rewrite in V1.
- **D-20:** Compare checkbox and sticky bar meet **≥44px tap targets** on mobile (consistent with Phase 5).

### Claude's Discretion
- Exact sticky compare bar visual treatment (bottom vs top)
- Remove-school control on `/compare` (per-column X vs edit link back to directory)
- Whether selection also mirrors in `sessionStorage` for cross-tab resilience (URL is source of truth regardless)
- Unit test depth for comparison formatters vs e2e coverage split

</decisions>

<specifics>
## Specific Ideas

- Follow Phase 5 URL-sync patterns (`router.replace`, English query param names, omit empty params).
- Comparison should feel like an extension of the profile page field rows — same trust language, same badges.
- User journey from IA: filter directory → select schools → compare verified criteria side by side.

</specifics>

<canonical_refs>
## Canonical References

### Comparison policy
- `docs/COMPARISON.md` — No quality score, priority criteria list, coverage semantics, missing evidence rules, inspection comparison rules
- `docs/PRODUCT.md` — Product stance against universal rankings
- `docs/DECISIONS.md` — Static-first architecture, comparison philosophy

### Information architecture
- `docs/INFORMATION_ARCHITECTURE.md` — `/compare` route, `Comparar` heading, user journey "Compare Nearby Options", English URL params

### Data model
- `docs/DATA_MODEL.md` — Field-level evidence, important fields, directory vs detailed tiers

### Prior phase decisions
- `.planning/phases/03-homepage-navigation-core-journey/03-CONTEXT.md` — D-07 add Comparar nav when route ships
- `.planning/phases/04-school-detail-profiles/04-CONTEXT.md` — Profile field sections, evidence labeling patterns
- `.planning/phases/05-directory-ux-discovery/05-CONTEXT.md` — URL sync, mobile tap targets, sticky bars

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/features/schools/SchoolProfile/constants.ts` — `PROFILE_SECTIONS`, `profileFieldLabels` for comparison rows
- `src/features/schools/ProfileFieldRow/` — Per-field value + badge + citation pattern
- `src/features/schools/StatusBadge/` — Evidence status pills
- `src/features/schools/formatSchoolField/` — Shared formatters for ganztag, lists, inspection, etc.
- `src/features/schools/getSchoolBySlug/` — Static slug lookup for compare page
- `src/features/schools/SchoolCard/` — Extend with compare checkbox without breaking profile link
- `src/features/schools/SchoolDirectory/` — Host selection state + compare query param sync
- `src/features/navigation/SiteHeader/constants.ts` — `NAV_ITEMS` extension point for Comparar

### Established Patterns
- Feature-first colocated directories with `index.tsx` + `index.test.tsx`
- URL as shareable state (`SchoolDirectory` filter/sort pipeline from Phase 5)
- Brazilian Portuguese UI copy, English route/param names
- Static export — no API routes; all data from `getRealSchools()` / `getSchoolBySlug`

### Integration Points
- Directory: checkbox selection + `compare` query param on `/schools`
- New: `src/app/compare/page.tsx` + `src/features/schools/SchoolComparison/` (or equivalent feature unit)
- Navigation: add Comparar link after route exists

</code_context>

<deferred>
## Deferred Ideas

- **User-configurable compatibility score** — explicitly deferred in `docs/COMPARISON.md`; not V1
- **Compare from profile page** ("Add to comparison" on `/schools/[slug]`) — nice-to-have; directory selection is sufficient for V1 unless planner finds trivial wiring
- **Print/export comparison** — backlog
- **Guias nav link** — Phase 7

</deferred>

---

*Phase: 06-school-comparison*
*Context gathered: 2026-07-11*
