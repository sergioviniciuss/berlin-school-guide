# Phase 5: Directory UX & Discovery - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Polish the `/schools` directory into an excellent discovery experience: responsive search with debounce, sort controls, improved empty and low-result states, mobile-friendly filter UX, and clearer research-depth cues — without adding comparison, guides content, new data sources, or school profile changes.

URL-synced filters already exist from M4; this phase refines usability, sorting, mobile patterns, and parent-facing copy. Scale documentation for filtering performance is in scope (DISC-07); Berlin-wide import is not.

</domain>

<decisions>
## Implementation Decisions

### Search responsiveness (DISC-01, DISC-07)
- **D-01:** Search uses **~300ms debounce** before filtering results and updating the URL.
- **D-02:** **No minimum character length** — single-character queries filter immediately after debounce.
- **D-03:** Show **result count plus subtle "Atualizando…"** text while a debounced search is pending; `aria-live` region updates when results settle.
- **D-04:** Search query **syncs to URL** as `?q=...` when non-empty; omit param when blank (preserves shareable links per DISC-04).

### Sort controls (DISC-03, DISC-04)
- **D-05:** **Default sort** when no `sort` param: **alphabetical A→Z by school name**.
- **D-06:** Sort keys: **name**, **evidence coverage %** (high→low), and **research tier** ("Perfil detalhado" first).
- **D-07:** Sort control lives **above results**, beside the result count line — visible without opening filters.
- **D-08:** Sort **persists in URL** as `?sort=name|coverage|tier` (or equivalent stable values).

### Mobile filter UX (DISC-02, DISC-06)
- **D-09:** Mobile filters open in a **Sheet drawer** — same interaction pattern as `SiteHeader` mobile nav (not inline expand).
- **D-10:** **Hybrid apply behavior** — search and active-filter chip changes apply **instantly**; toggles **inside the mobile drawer** batch until the user taps **"Aplicar filtros"** or closes the drawer (then apply).
- **D-11:** **Sticky filter bar** on mobile while scrolling results: **"Filtros (N ativos)"** opens the drawer; shows active filter count.
- **D-12:** **Desktop keeps sticky left sidebar** — no Sheet on `lg+`; only mobile/tablet below `lg` uses drawer pattern.

### Empty and low-result states (DISC-05)
- **D-13:** Zero results: **list active filters/search** that caused the empty set and suggest removing specific ones (not generic copy only).
- **D-14:** Zero-result actions: **"Limpar todos os filtros"** button in the empty state **plus** link to **`/methodology`** ("Como funciona nossa pesquisa?").
- **D-15:** **Few results (1–2 schools):** subtle tip below count — e.g. "Poucos resultados — tente remover filtros".
- **D-16:** Search-only miss (filters clear, name not found): dedicated copy **"Nenhuma escola com esse nome"** with a **clear-search** action.

### Research depth and discoverability (DISC-08)
- **D-17:** **Keep existing coverage block** on `SchoolCard` ("Cobertura da pesquisa" + tier label + %); **polish placement** only — do not hide % on cards.
- **D-18:** Keep **"Pesquisa básica" / "Pesquisa detalhada"** tier labels; add **`?` help affordance** (tooltip or popover) explaining what each tier means.
- **D-19:** Directory header gets a **dynamic one-liner** under the intro — e.g. "3 escolas com perfil detalhado · 7 com dados oficiais" (computed from dataset, not hardcoded).
- **D-20:** Research tier is reachable via **sort only** ("Perfil detalhado primeiro") — **no dedicated filter checkbox** for tier alone.

### Filter panel density (DISC-02)
- **D-21:** Filter groups split into **"Essenciais"** (distrito, bairro, tipo, bilíngue, Willkommensklasse) always visible and **"Avançados"** collapsed by default (idiomas, foco, contraturno, inspeção, cobertura).
- **D-22:** German/education terms (Ganztag, Willkommensklasse) get **inline help links** — e.g. "O que é Ganztag?" pointing to **`/methodology`** for now (guides route deferred to Phase 7 per Phase 3 D-06).
- **D-23:** **Coverage and inspection filters** live in the **"Avançados"** group.
- **D-24:** Mobile filter drawer: **scrollable body** with **fixed header** ("Filtros") and **fixed footer** ("Aplicar filtros" / "Limpar filtros") — supports hybrid apply (D-10).

### Claude's Discretion
- Exact debounce hook implementation (`useDebouncedValue` vs inline `setTimeout`)
- Sort control UI (native `<select>` vs shadcn Select)
- Sheet side (left vs bottom) and sticky bar styling
- Exact Portuguese copy for all new labels, tips, and empty states
- `sortSchools` utility and integration point in `SchoolDirectory` pipeline (filter → sort)
- Whether mobile drawer "close" applies pending filters or discards — recommend apply-on-close aligned with D-10
- Tooltip component choice (title attribute vs Popover) for tier help
- Unit/e2e test scope for debounce, sort URL, and empty states
- Brief DISC-07 scaling note in code comment or `docs/` (client-side filter at 10 schools; memoization pattern for future scale)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product and discovery
- `docs/PRODUCT.md` — Parent-centered discovery, no quality rankings, Brazilian Portuguese audience
- `docs/INFORMATION_ARCHITECTURE.md` — `/schools` directory URL, filter query params, navigation
- `docs/EDITORIAL_GUIDE.md` — Tone for labels, empty states, honest scope messaging

### Data model and evidence
- `docs/DATA_MODEL.md` — Directory vs detailed coverage levels, field statuses
- `docs/RESEARCH.md` — Research statuses, coverage tiers, source attribution
- `docs/DECISIONS.md` — Evidence coverage v2 (numerator/denominator rules for sort by coverage)

### Requirements and prior phase context
- `.planning/REQUIREMENTS.md` — DISC-01 through DISC-08
- `.planning/phases/01-data-evidence-audit/01-CONTEXT.md` — Coverage badges, tier labels, honest copy
- `.planning/phases/03-homepage-navigation-core-journey/03-CONTEXT.md` — Sheet/hamburger pattern, live routes only
- `.planning/phases/04-school-detail-profiles/04-CONTEXT.md` — SchoolCard link, profile badges, coverage on cards

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SchoolDirectory` — URL sync via `router.replace`, `queryParamMap`, `filtersFromSearchParams` / `toQueryString`
- `SchoolSearch` — labeled search input; needs debounce wrapper
- `SchoolFilters` + `FilterGroup` — checkbox filter groups; extend with tiered sections + help links
- `ActiveFilterSummary` — removable chips + "Limpar filtros"
- `SchoolResults` — empty state stub; expand per D-13–D-16
- `SchoolCard` — profile badge, coverage block, whole-card `Link` (Phase 4)
- `filterSchools` + `getDirectoryFilterOptions` — client-side filter pipeline
- `Sheet` (`src/components/ui/Sheet`) — reuse for mobile filters (Phase 3 header pattern)

### Established Patterns
- Client directory page: server loads schools, `SchoolDirectory` is `"use client"`
- Filter state in URL query params (DISC-04 foundation)
- Portuguese user-facing labels; English query param keys (`q`, `district`, etc.)
- `aria-live` on result count

### Integration Points
- `src/app/schools/page.tsx` → `SchoolDirectory` props
- Add `sort` query param alongside existing `queryParamMap` keys
- Mobile drawer state in `SchoolDirectory` (alongside existing `mobileFiltersOpen` toggle to replace)
- Header dynamic counts from `schools` prop (`coverageLevel` / `researchStatus`)

</code_context>

<specifics>
## Specific Ideas

- Mobile filter UX should feel consistent with site header Sheet — families already learned that pattern in Phase 3.
- Hybrid apply: parents expect chip removal and search to feel immediate; batching inside the drawer reduces accidental filter churn on small screens.
- Methodology link in empty state reinforces trust positioning when search feels "broken."

</specifics>

<deferred>
## Deferred Ideas

- **Dedicated "Apenas perfis detalhados" filter group** — sort-by-tier is enough for V1 Lichtenberg set (10 schools).
- **Guides links for Ganztag/Willkommensklasse help** — use `/methodology` until Phase 7 ships `/guides`.
- **Comparison shortcuts from directory** — Phase 6.
- **Neighbourhood as sort key** — not selected; name + coverage + tier sufficient.

</deferred>

---

*Phase: 05-directory-ux-discovery*
*Context gathered: 2026-07-11*
