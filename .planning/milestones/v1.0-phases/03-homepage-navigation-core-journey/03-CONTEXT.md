# Phase 3: Homepage, Navigation & Core Journey - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the product navigable early: expand the homepage beyond Phase 1's minimal hero, add shared site header/footer on every page, and ensure families can reach the school directory and methodology using only in-page links — without typing URLs.

This phase does not build school detail pages (Phase 4), comparison (Phase 6), parent guides library (Phase 7), or directory UX polish beyond wiring navigation (Phase 5). Guides and comparison nav items are deferred until those routes exist.

</domain>

<decisions>
## Implementation Decisions

### Homepage content and layout
- **D-01:** Expand homepage to a **fuller landing page** — hero plus journey cards linking to `/schools` and `/methodology` (not the minimal single-CTA shape from Phase 1).
- **D-02:** Secondary homepage content includes a **methodology journey card** and a **short Lichtenberg scope note** (initial coverage area; more Berlin districts over time) — aligns with Phase 1 D-21 honest scope messaging.
- **D-03:** Journey card layout: **directory card visually dominant**; methodology card smaller/secondary (stacked on mobile).
- **D-04:** Homepage hero uses a **parent-facing headline** — eyebrow "Berlin School Guide" plus Portuguese title such as "Escolas primárias em Berlim para famílias brasileiras" with trust-focused subtitle (not duplicate product name as both eyebrow and title).

### Shared navigation scope
- **D-05:** Header nav shows **live routes only**: Início (`/`), Escolas (`/schools`), Metodologia (`/methodology`). No Guias or Comparar links until Phase 6/7 deliver those routes.
- **D-06:** **Defer homepage guides link** until Phase 7 — NAV-01 guides portion satisfied later when `/guides` exists; Phase 3 homepage links to `/schools` and `/methodology` only (no dead links).
- **D-07:** **Add nav items when routes ship** — Phase 6 adds Comparar; Phase 7 adds Guias; no disabled/"Em breve" nav placeholders in Phase 3.
- **D-08:** Site logo/product name **always links to `/`** on every page.

### Header/footer pattern
- **D-09:** Shared chrome is **header + minimal footer** — copyright line; optional methodology link in footer; no repeated trust disclaimer block (methodology page covers that).
- **D-10:** **Mobile: hamburger menu** — collapsed menu on small viewports; full horizontal nav on desktop.
- **D-11:** **Active nav item highlighted** (underline or bold) on current page.
- **D-12:** Install `SiteHeader` and `SiteFooter` in **root `src/app/layout.tsx`** wrapping all routes — single global chrome per IA goal.

### Legacy M2 cleanup
- **D-13:** **Remove `/guides/m2-smoke` entirely** — delete route, `src/content/guides/m2-smoke.mdx`, and related page/tests; aligns with Phase 1 synthetic/M2 cleanup.
- **D-14:** **Update `e2e/smoke.spec.ts` in Phase 3** — replace homepage → m2-smoke assertion with home → `/schools` (or header nav) journey.
- **D-15:** **Keep directory inline methodology link** — global nav plus existing "Como funciona nossa pesquisa?" link in `SchoolDirectory` header (Phase 2 D-10); pages keep `GuideIntro`/page titles without duplicate nav chrome.

### Claude's Discretion
- Exact Portuguese copy for homepage sections, journey cards, and nav labels
- `SiteHeader`/`SiteFooter` component API, hamburger implementation (shadcn primitives vs minimal custom)
- Footer content beyond copyright (year, optional single methodology link)
- Homepage unit test scope for new landing sections
- Exact active-link styling (underline vs bold vs background)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Information architecture and editorial
- `docs/INFORMATION_ARCHITECTURE.md` — Primary navigation goals, URL structure, Portuguese labels for routes, static-first constraint
- `docs/EDITORIAL_GUIDE.md` — Brazilian Portuguese tone for user-facing copy
- `docs/PRODUCT.md` — V1 scope, Lichtenberg-first geography, trust positioning

### Requirements and prior phase context
- `.planning/REQUIREMENTS.md` — NAV-01, NAV-02, NAV-03 traceability
- `.planning/phases/01-data-evidence-audit/01-CONTEXT.md` — D-20/D-21 product positioning; D-23 minimal homepage baseline
- `.planning/phases/02-research-process-attribution/02-CONTEXT.md` — D-10 directory methodology inline link; `/methodology` page exists

### Codebase concerns and patterns
- `.planning/codebase/CONCERNS.md` — Missing site-wide navigation; stale m2-smoke and e2e references
- `.planning/codebase/ARCHITECTURE.md` — `src/app` thin composition; features own behavior
- `.planning/codebase/STRUCTURE.md` — Feature-first layout; `GuideIntro` pattern

### Existing routes to wire
- `src/app/layout.tsx` — Root layout (currently bare HTML shell)
- `src/app/page.tsx` — Homepage to expand
- `src/app/schools/page.tsx` — Directory route
- `src/app/methodology/page.tsx` — Methodology route (Phase 2)
- `src/features/guides/GuideIntro/index.tsx` — Reusable hero pattern
- `src/features/schools/SchoolDirectory/index.tsx` — Directory header with methodology link
- `e2e/smoke.spec.ts` — Stale m2-smoke homepage test to replace

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `GuideIntro` — Hero eyebrow/title/description used on home and methodology pages
- `Button` + `next/link` — Primary CTA pattern on current homepage
- `methodology.mdx` + `/methodology` route — Secondary journey destination already shipped (Phase 2)
- shadcn/ui primitives under `src/components/ui/` — Candidate building blocks for header, mobile menu

### Established Patterns
- Page shells in `src/app/*/page.tsx` compose feature components with Tailwind (`max-w-3xl`, `px-6 py-12`)
- No shared layout chrome yet — Phase 3 introduces first cross-route UI abstraction (two concrete use cases: header on all pages + footer on all pages)
- Brazilian Portuguese user-facing labels; English route segments

### Integration Points
- `src/app/layout.tsx` — Add `SiteHeader` above `{children}` and `SiteFooter` below
- `src/app/page.tsx` — Replace minimal hero with fuller landing (journey cards)
- Remove `src/app/guides/m2-smoke/` and `src/content/guides/m2-smoke.mdx`
- `e2e/smoke.spec.ts` — First test block needs rewrite for new homepage/nav journey

</code_context>

<specifics>
## Specific Ideas

- Homepage should feel like a real product entry point for Brazilian families, not milestone scaffolding
- Directory is the primary journey; methodology is secondary but discoverable from home and directory
- Lichtenberg scope communicated honestly without making the product feel incomplete

</specifics>

<deferred>
## Deferred Ideas

- **Guias nav link and homepage guides card** — Phase 7 when `/guides` ships
- **Comparar nav link** — Phase 6 when `/compare` ships
- **Full e2e CI wiring** — Phase 8 release readiness (Phase 3 updates smoke spec only)
- **Disabled/"Em breve" nav placeholders** — Rejected; live routes only

</deferred>

---

*Phase: 03-homepage-navigation-core-journey*
*Context gathered: 2026-07-11*
