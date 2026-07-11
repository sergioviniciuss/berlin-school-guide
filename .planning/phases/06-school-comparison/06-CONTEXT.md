# Phase 6: School Comparison - Context

**Gathered:** 2026-07-11
**Revised:** 2026-07-11 (post-discussion — supersedes auto-generated assumptions)
**Status:** Ready for planning (revised)

<domain>
## Phase Boundary

Build `/compare` so families can select multiple Lichtenberg schools from the directory **or school profiles** and view the same criteria side by side — with per-field evidence status, coverage visibility, honest limitations copy, and a mobile-optimized layout. No quality ranking, composite scores, or "best school" signals.

Selection UX, comparison views (desktop table + mobile stacked layout), shareable URL, profile-page compare action, and Comparar nav link are in scope.

**Out of scope for Phase 6:** favorites/pinned schools, print/export, user-configurable compatibility scoring, ranking or recommendation logic, guides content, new data sources.

</domain>

<decisions>
## Implementation Decisions

### School selection UX (COMP-01)
- **D-01:** Do **not** use plain checkboxes as the primary interaction. Each school card and profile header exposes an explicit secondary action:
  - default: **"Adicionar à comparação"**
  - selected: **"Na comparação"** (same control toggles removal)
- **D-02:** Profile navigation remains **separate** from the comparison action — clicking "Ver perfil" / card body must not toggle comparison.
- **D-03:** **Minimum 2**, **maximum 3** schools in one comparison.
- **D-04:** When ≥1 school is selected, show a **sticky selection bar** with count copy and primary CTA **"Comparar escolas"** (enabled only when ≥2 selected).
- **D-05:** Directory selection persists in URL as **`/schools?compare=slug1,slug2,slug3`** (comma-separated, English param, order preserved).
- **D-06:** Comparison page uses **`/compare?schools=slug1,slug2,slug3`**. Selection, removal, and direct URL loading preserve slug **order** consistently.
- **D-07:** Invalid or duplicate slugs are handled gracefully — dedupe while preserving first-seen order; unknown slugs skipped with visible notice.

### Compare from profile (COMP-01)
- **D-08:** School profile header includes **"Adicionar à comparação" / "Na comparação"** in Phase 6 — not deferred.
- **D-09:** Profile action reuses the **same comparison selection state and max-3 rules** as directory cards via a shared selection module (sessionStorage mirror + URL sync on `/schools` and `/compare`).

### Comparison layout — desktop (COMP-02, COMP-03)
- **D-10:** Route **`/compare`** with visible heading **"Comparar"**.
- **D-11:** Desktop layout: **criteria table** — rows = profile fields grouped by section, columns = selected schools.
- **D-12:** Keep **school header row** and **criteria label column** sticky where technically practical on desktop.
- **D-13:** Each cell shows **formatted value + evidence status badge**; preserve **inferred/conflicting evidence notes** where profile pages show them.
- **D-14:** Column header shows **school name**, **profile research tier**, and **coverage percentage** clearly labeled as research coverage — not school quality.
- **D-15:** **No composite score**, no winner highlighting, no ranking language.
- **D-16:** Add **"Mostrar apenas diferenças"** toggle. When enabled, hide rows where all selected schools have **equivalent displayed values and statuses**.
- **D-17:** **Do not hide rows solely because all values are missing** if that would obscure an important research gap — rows where every school is `missing` for the same field **remain visible** when the toggle is on (all statuses equivalent but gap is material).

### Comparison layout — mobile (COMP-02, COMP-06-adjacent)
- **D-18:** Do **not** use the raw desktop table as the only mobile experience.
- **D-19:** Mobile (`below lg`): **criteria-first stacked sections** — criterion name, then one compact value/status block per selected school (2–3 schools).
- **D-20:** Keep **school identity visible** while scrolling (sticky mini school strip or repeated school labels per criterion block — planner picks best pattern).
- **D-21:** Avoid requiring users to track horizontally scrolling columns on mobile.

### Comparison criteria (COMP-02, COMP-03)
- **D-22:** Field groups mirror profile sections: **Identificação**, **Oferta pedagógica**, **Apoio à família**, **Inspeção** — reuse `PROFILE_SECTIONS` / `profileFieldLabels`.
- **D-23:** Compare priority criteria from `docs/COMPARISON.md`; directory-only schools show missing/not_confirmed honestly.
- **D-24:** Inspection availability compared as available / unavailable / not_confirmed only — no quality interpretation.

### Limitations copy (COMP-04)
- **D-25:** Always-visible **Portuguese limitations block** above comparison content — no ranking, coverage ≠ quality, missing fields mean ask on visit; link to **`/methodology`**.

### Navigation
- **D-26:** Add **`Comparar`** to header and footer **only when `/compare` ships** (Phase 3 D-07 pattern).

### Empty and error states
- **D-27:** Fewer than 2 valid schools on `/compare` → empty state with link to **`/schools`**.
- **D-28:** Compare bar CTA and empty states reference **2–3 schools**, not 4.

### Claude's Discretion
- Exact sticky bar placement (bottom recommended to avoid clash with mobile filter bar)
- Mobile school-identity pattern (sticky strip vs per-block labels)
- Shared selection module file layout (`compareSelection/` vs extend `parseCompareSlugs/`)
- Unit vs e2e split for diff-toggle and mobile layout

</decisions>

<specifics>
## Specific Ideas

- Comparison should feel like profile field rows extended side-by-side — same trust language and badges.
- User journey: filter directory → add schools → compare criteria; alternate path: profile → add to comparison → compare.
- Phase 5 URL-sync patterns apply to `compare` param alongside existing filter params.

</specifics>

<canonical_refs>
## Canonical References

### Comparison policy
- `docs/COMPARISON.md` — No quality score, priority criteria, coverage semantics, missing evidence rules
- `docs/PRODUCT.md` — Product stance against universal rankings
- `docs/DECISIONS.md` — Static-first architecture

### Information architecture
- `docs/INFORMATION_ARCHITECTURE.md` — `/compare` route, `Comparar` heading, compare journey

### Prior phase decisions
- `.planning/phases/03-homepage-navigation-core-journey/03-CONTEXT.md` — D-07 live nav only
- `.planning/phases/04-school-detail-profiles/04-CONTEXT.md` — Profile sections and evidence labeling
- `.planning/phases/05-directory-ux-discovery/05-CONTEXT.md` — URL sync, mobile tap targets, sticky bars

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (Waves 1–2 shipped — partial compatibility)
- `parseCompareSlugs`, `resolveCompareSchools`, `buildComparePageHref` — **needs max cap 3** (was 4)
- `formatProfileFieldValue` extracted from ProfileFieldRow — **compatible**
- `CompareBar` sticky bottom bar — **compatible** (copy update only)
- `SchoolCard` compare control — **needs redesign** (checkbox → toggle button)
- `ComparisonTable` / `SchoolComparison` (Wave 3 partial) — **needs mobile layout, diff toggle, evidence notes, max-3 copy**

### Integration Points
- Directory: toggle button + `?compare=` URL sync
- Profile: `SchoolProfile` header compare action + shared selection state
- Compare page: desktop table + mobile stacked layout + limitations

</code_context>

<deferred>
## Deferred Ideas

- **Favorite / pinned schools** — explicitly out of Phase 6
- **Print/export comparison** — backlog
- **User-configurable compatibility score** — per COMPARISON.md, not V1
- **Ranking or recommendation logic** — out of scope
- **Guias nav link** — Phase 7

</deferred>

---

*Phase: 06-school-comparison*
*Context gathered: 2026-07-11*
*Revised after user discussion: 2026-07-11*
