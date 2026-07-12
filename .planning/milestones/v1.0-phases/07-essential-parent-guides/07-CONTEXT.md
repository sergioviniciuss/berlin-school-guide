# Phase 7: Essential Parent Guides - Context

**Gathered:** 2026-07-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Publish essential Portuguese parent guides so a Brazilian family new to Berlin understands how the Berlin primary school system works and has one practical checklist to act on — without building the full guide library.

In scope: `/guides` hub, Berlin primary system guide (GUID-01), "Primeiros passos" checklist (GUID-02), German term explanations in guide context (GUID-03), Guias navigation integration, cross-links from directory/compare.

Out of scope: full guide set (enrollment, catchment, ganztag, public/private, inspections as separate pages), correction/report flow, interactive checklist persistence, hub "Em breve" placeholders, `/checklists/` top-level route (checklist lives under `/guides`).

</domain>

<decisions>
## Implementation Decisions

### V1 guide scope (GUID-01)
- **D-01:** Ship a **`/guides` hub** listing **only live pages** — no disabled cards, no "Em breve" sections, no links without destinations (extends Phase 3 D-07).
- **D-02:** Primary guide at **`/guides/berlin-school-system/`** (IA-aligned English slug; Portuguese content and heading).
- **D-03:** System guide is **concise and modular** — anchor-linked sections, each answering one practical parent question (e.g. "O que é uma Grundschule?", "Como funciona a matrícula?", "O que é Ganztag?").
- **D-04:** Each section gives enough context to understand the concept and **what to verify next** — the first page every new family should read, not an encyclopedia.
- **D-05:** Within guide prose, **may mention** that a topic will get a dedicated guide later — but **no placeholder links or hub teasers** for unpublished guides.

### Checklist (GUID-02)
- **D-06:** One checklist: **"Primeiros passos"** — guides families from zero to ready to visit and enroll.
- **D-07:** Checklist combines essential **pre-visit and preparation** tasks: discover catchment school, understand timeline, prepare key documents, book Open Day if available, prepare questions to ask.
- **D-08:** Checklist **stops before detailed enrollment procedures** — those belong in a future dedicated guide.
- **D-09:** **Static MDX** with **print-friendly styling** — printable/readable list; optional "Imprimir" affordance or print CSS; no localStorage/checkbox persistence.
- **D-10:** Checklist route under guides: **`/guides/first-steps/`** (English slug; Portuguese title "Primeiros passos").

### German terms (GUID-03)
- **D-11:** **Inline explanations on first use** in the system guide, plus a dedicated **"Glossário" anchor section** at the bottom for quick reference.
- **D-12:** Follow **`docs/EDITORIAL_GUIDE.md`** term definitions (Grundschule, Einzugsgebiet, Ganztag, Hort, Willkommensklasse, etc.).
- **D-13:** **Split roles with methodology** — guides explain school-system terms for school choice; `/methodology` keeps evidence/research terminology only. Cross-link where helpful but do not duplicate methodology's evidence framing.

### Guias hub & navigation
- **D-14:** Hub uses **journey cards organized by learning path** — even with two guides, introduce the learning journey visually.
- **D-15:** Hub card hierarchy: **system guide featured/primary**, checklist **secondary/practical** below or beside it.
- **D-16:** Hub structure **scales by category** without redesign: e.g. "Entenda o sistema", "Checklists práticas", "Guias avançados" — only populate sections that have live content in Phase 7.
- **D-17:** Add **Guias** to **SiteHeader and SiteFooter** when routes ship (Phase 3 D-07).
- **D-18:** Add **homepage journey card** linking to `/guides` (Phase 3 D-06 deferred item now in scope).
- **D-19:** Add **cross-links** from directory and compare intro copy pointing families to guides when they need system context first.

### Claude's Discretion
- Exact Portuguese copy, section anchors, and journey card labels on hub/homepage
- MDX structure and any lightweight guide components (callout boxes, term highlights) beyond reusing `GuideIntro`
- Print CSS vs explicit print button
- Exact cross-link placement in `SchoolDirectory` and `SchoolComparison` intro areas
- SEO metadata per guide page
- Unit test scope for new routes and hub

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product & editorial
- `docs/PRODUCT.md` — Parent-centered principle, "explain the system before comparing schools"
- `docs/EDITORIAL_GUIDE.md` — Portuguese tone, German term definitions, parent-centered writing
- `docs/INFORMATION_ARCHITECTURE.md` — `/guides` routes, Guias heading, user journey from guide → directory

### Architecture & decisions
- `docs/DECISIONS.md` — Static-first, MDX content, English URL segments
- `.planning/phases/03-homepage-navigation-core-journey/03-CONTEXT.md` — D-06 (homepage guides card), D-07 (live nav only)

### Requirements
- `.planning/REQUIREMENTS.md` — GUID-01, GUID-02, GUID-03 (Phase 7); GUID-10 explicitly out of V1 scope

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/features/guides/GuideIntro/index.tsx` — eyebrow, title, description hero for guide pages
- `src/content/guides/methodology.mdx` — existing MDX guide content pattern
- `src/app/methodology/page.tsx` — page composition: `GuideIntro` + MDX import, max-w-3xl layout

### Established Patterns
- Guide pages: static MDX in `src/content/guides/`, route in `src/app/`, Portuguese visible copy, English URL segments
- Site chrome: `SiteHeader` / `SiteFooter` constants pattern (Comparar added in Phase 6)
- Homepage: `HomeJourneyCards` — journey card pattern (currently schools + methodology only)

### Integration Points
- `src/features/navigation/SiteHeader/constants.ts` — add Guias nav item
- `src/features/navigation/SiteFooter/index.tsx` — add Guias link
- `src/app/page.tsx` / `HomeJourneyCards` — add guides journey card
- `src/features/schools/SchoolDirectory/index.tsx` — optional intro cross-link to guides
- `src/features/schools/SchoolComparison/index.tsx` — optional intro cross-link to guides

</code_context>

<specifics>
## Specific Ideas

- System guide sections should feel like a **modular reference** — families can jump to the question they have now.
- Checklist should be useful to **nearly every newcomer**, not only families already at visit/enrollment stage.
- Hub should feel like the **start of a learning path**, not a bare link list — but must not promise guides that do not exist.

</specifics>

<deferred>
## Deferred Ideas

- Full guide library (enrollment, catchment, ganztag, public/private, inspections) — GUID-10 / roadmap backlog
- Dedicated `/checklists/` top-level route — checklist lives under `/guides/first-steps/` for Phase 7
- Interactive checklist with persisted checkbox state — static + print only
- Hub "Em breve" cards or disabled future-guide entries
- Detailed enrollment procedures guide — referenced in prose only until a future phase ships it
- Correction/report flow — separate future phase

</deferred>

---

*Phase: 07-essential-parent-guides*
*Context gathered: 2026-07-11*
