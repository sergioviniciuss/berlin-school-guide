# Phase 5: Directory UX & Discovery - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-11
**Phase:** 5-directory-ux-discovery
**Areas discussed:** Search responsiveness, Sort controls, Mobile filter UX, Empty and zero-result states, Research depth on cards, Filter panel density

---

## Search responsiveness

| Option | Description | Selected |
|--------|-------------|----------|
| Debounce ~300ms | Filter after user stops typing; URL updates debounced | ✓ |
| Instant | Filter every keystroke | |
| On Enter/blur only | No live filtering | |

| Option | Description | Selected |
|--------|-------------|----------|
| No minimum | Single character filters | ✓ |
| 2 characters | Ignore single-letter | |
| 3 characters | Stricter minimum | |

| Option | Description | Selected |
|--------|-------------|----------|
| Count only | aria-live count after debounce | |
| Count + "Atualizando…" | Pending state while debouncing | ✓ |
| No extra feedback | Count change only | |

| Option | Description | Selected |
|--------|-------------|----------|
| URL sync when active | ?q=... when non-empty | ✓ |
| Omit when empty | Clear param when blank | |
| No URL for search | Local only | |

**User's choice:** 1, 1, 2, 1

---

## Sort controls

| Option | Description | Selected |
|--------|-------------|----------|
| Alphabetical A→Z default | Predictable browse order | ✓ |
| Coverage high→low default | Researched schools first | |
| Data file order | Keep implicit order | |

| Option | Description | Selected |
|--------|-------------|----------|
| Name + coverage only | ROADMAP minimum | |
| Name + coverage + neighbourhood | Extra locality sort | |
| Name + coverage + research tier | Perfil detalhado sort option | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| Above results | Beside count line | ✓ |
| In filter sidebar | With filters | |
| Both placements | Duplicate control | |

| Option | Description | Selected |
|--------|-------------|----------|
| URL ?sort= | Shareable sort state | ✓ |
| Session only | Resets on refresh | |

**User's choice:** 1, 3, 1, 1

---

## Mobile filter UX

| Option | Description | Selected |
|--------|-------------|----------|
| Sheet drawer | Match header nav pattern | ✓ |
| Inline expand | Current toggle | |
| Full-screen overlay | Dedicated screen | |

| Option | Description | Selected |
|--------|-------------|----------|
| Instant apply | Every toggle updates | |
| Apply on close | Batch in drawer | |
| Hybrid | Instant chips/search; batch in drawer | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky "Filtros (N ativos)" bar | While scrolling | ✓ |
| No sticky | Button once above results | |
| FAB | Floating action button | |

| Option | Description | Selected |
|--------|-------------|----------|
| Keep desktop sidebar | Sticky left column | ✓ |
| Collapse sidebar | Narrower desktop | |
| Sheet everywhere | Unified drawer | |

**User's choice:** 1, 3, 1, 1

---

## Empty and zero-result states

| Option | Description | Selected |
|--------|-------------|----------|
| List active filters | Actionable zero-result copy | ✓ |
| Generic hint only | Current message | |
| Contextual by cause | Different copy per cause | |

| Option | Description | Selected |
|--------|-------------|----------|
| Clear-all button only | In empty state | |
| Methodology link only | Trust fallback | |
| Both clear-all + methodology | Full DISC-05 treatment | ✓ |
| Neither | Rely on chips above | |

| Option | Description | Selected |
|--------|-------------|----------|
| No special case | Same as full results | |
| Few-results tip | "Poucos resultados…" below count | ✓ |
| Suggest dropping coverage filter | Smart suggestions | |

| Option | Description | Selected |
|--------|-------------|----------|
| Search-specific copy | Name not found + clear search | ✓ |
| Same generic empty | All cases alike | |
| "Ver todas as escolas" link | Reset to full list | |

**User's choice:** 1, 3, 2, 1

---

## Research depth on cards

| Option | Description | Selected |
|--------|-------------|----------|
| Prominent % near badge | Extra visibility | |
| Keep current block, polish | Existing coverage footer | ✓ |
| Hide % on cards | Badge only | |

| Option | Description | Selected |
|--------|-------------|----------|
| Keep tier labels only | Phase 1 vocabulary | |
| Badge only, drop tier label | Simplify | |
| Tier label + ? help | Explain basic vs detailed | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| Dynamic header one-liner | "3 detalhado · 7 oficiais" | ✓ |
| Keep current intro | Cards carry signal | |
| Expand intro paragraph | Longer explanation | |

| Option | Description | Selected |
|--------|-------------|----------|
| Sort only for tier | No filter group | ✓ |
| Add tier filter checkbox | Dedicated filter | |
| Both sort and filter | | |
| Neither | | |

**User's choice:** 2, 3, 1, 1

---

## Filter panel density

| Option | Description | Selected |
|--------|-------------|----------|
| Essentials + Advanced collapsed | Two-tier organization | ✓ |
| All expanded | Current flat list | |
| All collapsed accordion | Expand on demand | |

| Option | Description | Selected |
|--------|-------------|----------|
| Inline hint under legend | Short Portuguese explanation | |
| Link to guides/methodology | "O que é Ganztag?" | ✓ |
| Tooltip on legend | ? icon | |
| No extra help | Labels enough | |

| Option | Description | Selected |
|--------|-------------|----------|
| Coverage in Avançados | With advanced group | ✓ |
| Always visible | Prominent research filters | |
| Remove coverage filter | Sort only | |

| Option | Description | Selected |
|--------|-------------|----------|
| Fixed header/footer, scroll body | Supports Apply/Limpar | ✓ |
| Full scroll drawer | Entire sheet scrolls | |
| Paginated sections | Step through categories | |

**User's choice:** 1, 2, 1, 1

**Note:** Help links for German terms point to `/methodology` until Phase 7 `/guides` exists (Phase 3 D-06).

---

## Claude's Discretion

Areas deferred to planner/executor: debounce implementation, sort UI component, Sheet side, exact copy, apply-on-close semantics, tooltip vs Popover, test scope, DISC-07 scaling note placement.

## Deferred Ideas

- Tier-only filter checkbox
- Guides links for term help (methodology interim)
- Neighbourhood sort key
- Comparison from directory
