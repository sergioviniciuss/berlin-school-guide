---
phase: 5
slug: directory-ux-discovery
status: approved
reviewed_at: 2026-07-11T20:05:00+02:00
shadcn_initialized: true
preset: new-york / neutral / cssVariables
created: 2026-07-11
---

# Phase 5 — UI Design Contract

> Visual and interaction contract for Directory UX & Discovery. Generated from locked CONTEXT.md decisions (D-01 through D-24).

**Scope:** Polish `/schools` directory — debounced search, sort controls, mobile Sheet filters, tiered filter panel, contextual empty states, research-depth cues. No comparison, guides content, profile page changes, or new data sources.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn/ui partial — `Sheet` (Phase 3), `Button` if needed for drawer footer |
| Preset | new-york, neutral, cssVariables (`components.json`) |
| Icons | lucide-react — `Filter`, `HelpCircle`, `X` where needed |
| Font | Arial stack (`globals.css`) — unchanged |

**Phase 5 shadcn additions:** none required. Sort control uses native `<select>` styled with Tailwind. Tier help uses `title` attribute or minimal Popover only if `title` is insufficient for screen readers.

---

## 1. Copywriting Contract

Brazilian Portuguese. Trust-focused, no quality rankings. Coverage = research completeness.

### Directory header

| Element | Copy / pattern |
|---------|----------------|
| Eyebrow | `Berlin School Guide` (unchanged) |
| h1 | `Escolas` |
| Intro paragraph | Keep existing honest Lichtenberg scope + methodology inline link |
| Dynamic counts line (D-19) | `{detailedCount} escolas com perfil detalhado · {directoryCount} com dados oficiais` — computed from `coverageLevel` |
| Methodology link | `Como funciona nossa pesquisa?` → `/methodology` |

### Search (DISC-01)

| Element | Copy |
|---------|------|
| Label | `Buscar escola pelo nome` |
| Placeholder | `Digite o nome da escola` |
| Pending state | `Atualizando…` (shown beside result count while debounce pending) |

### Result count + sort row

| Element | Copy |
|---------|------|
| Count | `{n} de {total} escolas encontradas` |
| Few-results tip (D-15) | `Poucos resultados — tente remover filtros` when `1 ≤ n ≤ 2` |
| Sort label | `Ordenar por` |
| Sort options | `Nome (A–Z)` · `Cobertura da pesquisa` · `Perfil detalhado primeiro` |

URL values: omit `sort` for name default; `sort=coverage`; `sort=tier`.

### Mobile filter bar (D-11)

| Element | Copy |
|---------|------|
| Sticky button | `Filtros ({n} ativos)` when n > 0; `Filtros` when n = 0 |
| Sheet title | `Filtros` |
| Footer primary | `Aplicar filtros` |
| Footer secondary | `Limpar filtros` |

### Filter tiers (D-21)

| Section | Legend |
|---------|--------|
| Essenciais | `Filtros essenciais` (visually `text-sm font-semibold`, not a fieldset legend duplicate) |
| Avançados | `Filtros avançados` inside `<details>` summary |

### Term help links (D-22)

| Term | Link text | Target |
|------|-----------|--------|
| Ganztag | `O que é Ganztag?` | `/methodology` |
| Willkommensklasse | `O que é Willkommensklasse?` | `/methodology` |

Style: `text-sm text-blue-700 underline` below filter group legend.

### Active filter chips (unchanged vocabulary)

Reuse `ActiveFilterSummary` chip labels (`Busca:`, `Distrito:`, etc.).

### Empty states (D-13–D-16)

| Scenario | h2 | Body | Actions |
|----------|-----|------|---------|
| Filters + zero results | `Nenhuma escola encontrada` | List active filters as bullets; suggest removing them | `Limpar todos os filtros` button + `Como funciona nossa pesquisa?` → `/methodology` |
| Search-only miss | `Nenhuma escola com esse nome` | `Não encontramos uma escola com "{query}". Verifique a grafia ou veja todas as escolas.` | `Limpar busca` button |
| Combined | Prefer search-specific h2 if `query` set and filters empty; else filter list variant |

### SchoolCard tier help (D-18)

| Element | Copy |
|---------|------|
| Help trigger | `?` icon or button beside `Pesquisa básica` / `Pesquisa detalhada` in coverage block |
| Tooltip — básica | `Pesquisa com dados oficiais do diretório escolar de Berlim. Campos extras ainda não foram verificados de forma independente.` |
| Tooltip — detalhada | `Pesquisa com fontes adicionais além do diretório oficial. A cobertura mostra quantos campos foram verificados neste nível — não a qualidade da escola.` |

---

## 2. Visuals — Layout

### Desktop (`lg+`) — unchanged shell width

```text
┌──────────────────────────────────────────────────────────────────┐
│ SiteHeader                                                       │
├──────────────────────────────────────────────────────────────────┤
│ max-w-7xl                                                        │
│  HEADER (title, intro, dynamic counts)                           │
│  ┌─────────────┬──────────────────────────────────────────────┐  │
│  │ FILTERS     │  SEARCH                                      │  │
│  │ sticky      │  [mobile: sticky Filtros bar — hidden lg+]   │  │
│  │ sidebar     │  SORT + COUNT + "Atualizando…"               │  │
│  │ Essenciais  │  ACTIVE CHIPS                                │  │
│  │ Avançados ▼ │  FEW-RESULTS TIP (conditional)             │  │
│  │             │  SCHOOL CARDS                                │  │
│  └─────────────┴──────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│ SiteFooter                                                       │
└──────────────────────────────────────────────────────────────────┘
```

Sidebar: `sticky top-6`, `w-[18rem]`, white card border — keep Phase 4 directory grid.

### Mobile (`< lg`)

```text
┌────────────────────────────┐
│ SiteHeader                 │
├────────────────────────────┤
│ HEADER + counts            │
│ SEARCH                     │
│ [sticky] Filtros (N)       │  ← opens Sheet
│ SORT + COUNT               │
│ CHIPS                      │
│ TIP (few results)          │
│ CARDS                      │
└────────────────────────────┘

Sheet (side=right):
┌────────────────────────────┐
│ Filtros              [X]   │  fixed header
├────────────────────────────┤
│ scrollable filter body     │
│ Essenciais + Avançados     │
├────────────────────────────┤
│ Limpar | Aplicar filtros   │  fixed footer
└────────────────────────────┘
```

Remove inline `Abrir filtros` expand panel — replaced by Sheet (D-09).

### Sort control

```text
┌─────────────────────────────────────────────────────┐
│ 3 de 10 escolas encontradas    Ordenar por [▼]      │
│ Atualizando… (conditional)                          │
└─────────────────────────────────────────────────────┘
```

Layout: `flex flex-wrap items-center justify-between gap-3`. Sort: `flex items-center gap-2 text-sm`.

Native `<select>`: `rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm`.

---

## 3. Interaction Contracts

### Search debounce (D-01–D-04)

- Local input state updates immediately on keystroke.
- URL `q` and filter pipeline update after **300ms** debounce.
- `Atualizando…` visible when `searchInput !== filters.query`.
- `aria-live="polite"` on count region; include settled count only (not pending text in live region if it causes double-announcement — pending as separate `aria-busy` optional).

### Sort (D-05–D-08)

- Changing sort updates URL immediately (no debounce).
- Default name sort omits `sort` param from URL.
- Sort applies after filter in pipeline.

### Mobile hybrid apply (D-10)

| Action | Behavior |
|--------|----------|
| Search typing | Instant URL after debounce |
| Chip remove / Limpar filtros (outside drawer) | Instant URL |
| Checkbox toggle inside Sheet | Updates `draftFilters` only |
| Aplicar filtros | Commit `draftFilters` → URL; close Sheet |
| Close Sheet (X, overlay, swipe) | **Apply** pending draft to URL (apply-on-close) |
| Limpar filtros (footer) | Reset draft to defaults; do not close until Apply unless product tests prefer instant clear — **default: clear draft + Apply in one action** |

### Sticky mobile filter bar

- Visible only `< lg`.
- `position: sticky; top: 0` or below header offset (`top-0` within main with `z-10 bg-white border-b`).
- `aria-expanded` + `aria-controls` pointing to Sheet content id.

### Filter tiers

- `<details>` for Avançados, `open={false}` by default.
- Essenciais groups: Distrito, Bairro, Tipo, Ganztag, Bilíngue, Willkommensklasse (Ganztag in Essenciais per parent priority).

### SchoolCard (D-17–D-18)

- Keep coverage block placement; optional minor spacing polish (`mt-4` consistency).
- Add `HelpCircle` or `?` button with `aria-label` explaining tier.

---

## 4. Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Search label | Existing `htmlFor="school-search"` |
| Sort label | Visible `Ordenar por` + `aria-label` on `<select>` |
| Sheet | `SheetTitle` "Filtros", focus trap per Radix |
| Sticky filter button | `aria-expanded`, `aria-controls="mobile-school-filters-sheet"` |
| Tier help | `aria-label="O que significa pesquisa básica"` / detalhada variant |
| Empty state actions | Buttons, not divs; clear focus rings |
| Touch targets | Min `44px` height on mobile filter bar and footer buttons |

---

## 5. Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `< lg` (1024px) | Sheet filters, sticky bar, single column results |
| `≥ lg` | Sidebar filters, no Sheet, two-column grid unchanged |

---

## 6. Out of Scope

- Comparison UI (Phase 6)
- `/guides` term explainers (Phase 7 — methodology links interim)
- Dedicated tier filter checkbox (D-20)
- Profile page layout changes
- New filter dimensions

---

*Phase: 05-directory-ux-discovery*
*Extends Phase 3 Sheet pattern and Phase 4 SchoolCard coverage block*
