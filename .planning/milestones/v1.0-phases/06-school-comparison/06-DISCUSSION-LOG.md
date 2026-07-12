# Phase 6 Discussion Log

**Date:** 2026-07-11
**Type:** Retroactive discuss-phase (user-provided decisions after auto-generated context)

## What happened

Phase 6 was auto-planned and partially executed before a formal discuss session. User provided locked decisions; `06-CONTEXT.md` was revised accordingly.

## Wave 1–2 compatibility audit

| Area | Shipped (Waves 1–2) | User decision | Action |
|------|---------------------|---------------|--------|
| `parseCompareSlugs` max cap | 4 | **3** | **Fix** — change constant + tests |
| `SchoolDirectory` max selection | 4 | **3** | **Fix** |
| `SchoolCard` interaction | Checkbox | **Toggle button** ("Adicionar à comparação" / "Na comparação") | **Fix** — Plan 06-04 |
| Profile compare action | Not built | **Required in Phase 6** | **Add** — Plan 06-04 |
| Shared selection state | URL only on `/schools` | **URL + sessionStorage for profile** | **Add** — Plan 06-04 |
| `CompareBar` | Bottom sticky, min-2 CTA | Keep | **Keep** |
| `formatProfileFieldValue` | Extracted | Keep | **Keep** |
| `resolveCompareSlugs` | Dedupe + skip invalid | Keep + preserve order | **Keep** |
| URL param names | `compare` / `schools` | Keep | **Keep** |

## Wave 3 partial audit (paused)

| Area | Shipped (partial 06-03) | User decision | Action |
|------|-------------------------|---------------|--------|
| Desktop table | Built | Keep + sticky headers | **Extend** |
| Mobile layout | Horizontal scroll only | **Dedicated stacked layout** | **Replace** — revised 06-03 |
| Diff toggle | Not built | **Required** | **Add** — revised 06-03 |
| Evidence notes in cells | Badge only | **Include notes** | **Add** — revised 06-03 |
| Empty state copy | "2 a 4 escolas" | **2 a 3** | **Fix** |
| Nav + e2e | Partial / pending | Keep intent | **Resume after plan revision** |

## Plans after revision

- **06-04-PLAN.md** — Gap closure: max-3, toggle button, shared selection, profile header action (runs before finishing 06-03)
- **06-03-PLAN.md** — Revised: mobile layout, diff toggle, evidence notes, sticky headers
