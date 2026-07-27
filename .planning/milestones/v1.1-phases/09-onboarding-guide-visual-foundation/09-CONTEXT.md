# Phase 9: Onboarding Guide Visual Foundation - Context

**Gathered:** 2026-07-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Build reusable MDX visual components (education timeline, integrated pathway branches, Berlin callouts, glossary term shell) and ship a public route shell at `/guides/german-education-system` so families immediately see a visual education journey scaffold — not a text wall.

In scope: VIS-01, VIS-02, VIS-03; route + GuideIntro + placeholder MDX wired with live component demos and section heading stubs for Phase 10 editorial.

Out of scope: full Kita→higher-ed editorial content (Phase 10); homepage/Guides hub prominence and cross-links (Phase 11); interactive pathway calculators; replacing `/guides/berlin-school-system`.

</domain>

<decisions>
## Implementation Decisions

### Education timeline infographic (VIS-01)
- **D-01:** Use a **responsive infographic**, not a simple sequential timeline. Desktop: left-to-right flow with **branching decision points** (e.g. Gymnasium vs other Sekundarschule tracks) and **converging higher-education pathways** where appropriate. Mobile: top-to-bottom journey preserving the same visual structure.
- **D-02:** Primary goal is **communicate the entire German education system at a glance** — parents should grasp the full path before reading prose.
- **D-03:** Every timeline node shows **stage name, grades, and approximate age range together**. Stage name is largest; grades and ages are smaller but always visible — none treated as secondary metadata. Example hierarchy: `Grundschule` → `Grades 1–6` → `Ages ~6–12`.
- **D-04:** Nodes are **compact cards** — stage name + grades + ages only inside the card. Longer explanations live in surrounding prose sections below (Phase 10 fills these; Phase 9 may use placeholder stubs).
- **D-05:** Nodes are **expandable** — tap/click reveals a **short summary (2–3 sentences max)** plus an **optional link to an on-page section anchor** below. Not full accordion sections for the whole guide.

### Pathway / decision diagrams (VIS-02)
- **D-06:** Branching is **integrated into the main timeline infographic** — branches emerge from Grundschule/secondary transition nodes in the same visual, not as a separate disconnected diagram block.
- **D-07:** Show **all major routes**: Gymnasium, Realschule, Hauptschule, Gesamtschule, and vocational/Ausbildung paths to higher education. Do not imply Gymnasium is the only path.
- **D-08:** On mobile, show the **main path fully**; secondary/vocational branches collapse into a **collapsible "Outras vias"** section so the page stays scannable without losing route coverage.

### Berlin difference callouts (VIS-03)
- **D-09:** **Dual pattern** — (1) **inline "Em Berlim" badge** on affected timeline nodes with optional one-line note on the node itself; (2) a **summary "Berlin em destaque" box** grouping Berlin differences and linking to `/guides/berlin-school-system` for the Berlin primary deep-dive.
- **D-10:** Callout tone is **factual highlight** — neutral accent border/background, informative not alarming. Berlin differences should scan quickly without feeling like warnings.

### Phase 9 route shell & component scope
- **D-11:** Ship **`/guides/german-education-system`** in Phase 9 with **GuideIntro**, **live timeline/pathway/callout demos using placeholder copy**, and **section heading stubs** (anchors Phase 10 will fill). Not a components-only fixture page without a public route.
- **D-12:** Include a **`GlossaryTerm` component shell** in Phase 9 — styled term + definition block usable in MDX, with placeholder terms in the demo MDX. Full glossary editorial and cross-linking is Phase 10 (ONBD-05).

### Claude's Discretion
- Exact infographic layout mechanics (connectors, arrows, spacing, color tokens) within existing Tailwind/shadcn patterns
- Expand/collapse interaction details (animation, `aria-expanded`, keyboard support)
- Placeholder copy wording and which nodes carry Berlin badges in the demo
- Component directory structure under `src/features/guides/` and MDX registration in `mdx-components.tsx`
- Print behavior for infographic components (reuse existing guide print CSS where sensible)
- Unit test scope for new components and route shell

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product & editorial
- `docs/PRODUCT.md` — Germany-first onboarding for Brazilian families; explain system before comparing schools
- `docs/EDITORIAL_GUIDE.md` — Portuguese tone, German term definitions, no ranking language
- `docs/INFORMATION_ARCHITECTURE.md` — `/guides` routes, user journey guide → directory

### Architecture & prior decisions
- `docs/DECISIONS.md` — Static-first, MDX content, English URL segments
- `.planning/REQUIREMENTS.md` — VIS-01, VIS-02, VIS-03 (Phase 9); ONBD-* deferred to Phases 10–11
- `.planning/milestones/v1.0-phases/07-essential-parent-guides/07-CONTEXT.md` — GuideIntro pattern, `/guides/berlin-school-system` as complementary Berlin primary guide, glossary inline + anchor section pattern

### Milestone direction
- `.planning/PROJECT.md` — v1.1 milestone: full Kita→Uni path, non-Gymnasium routes, Berlin woven throughout, timelines/diagrams not text walls
- `.planning/ROADMAP.md` — Phase 9 success criteria and phase boundaries

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/features/guides/GuideIntro/index.tsx` — eyebrow, title, description hero for guide pages
- `src/app/guides/berlin-school-system/page.tsx` — route shell pattern: `max-w-3xl`, GuideIntro + MDX import + `buildPageMetadata`
- `src/mdx-components.tsx` — heading anchors via `slugifyHeading`, typography for prose; extend with new guide visual components
- `src/features/guides/mdxUtils/` — `getTextContent`, `slugifyHeading` for anchor IDs
- `src/features/guides/GuidesHub/index.tsx` — hub cards (Phase 11 will add flagship card; do not change hub hierarchy in Phase 9)
- Print-friendly guide styling in `src/app/globals.css` (from Phase 7 checklist work)

### Established Patterns
- English URL slugs, Brazilian Portuguese visible copy
- Feature-first colocation under `src/features/guides/`
- Static MDX guides imported in `src/app/guides/*/page.tsx`
- No timeline/diagram/Berlin-callout MDX components exist yet — greenfield within guides feature

### Integration Points
- New route: `src/app/guides/german-education-system/page.tsx`
- New MDX: `src/content/guides/german-education-system.mdx` (placeholder + component demos)
- Register components in `src/mdx-components.tsx` or colocated exports consumed by MDX
- Phase 10 will replace placeholder copy and wire glossary links; Phase 11 will promote route on homepage and `/guides`

</code_context>

<specifics>
## Specific Ideas

- Desktop infographic should read like a **journey map**: main trunk left-to-right, branches at transitions, paths converging toward Abitur/Ausbildung/Uni
- Timeline node label example the user gave:
  - **Grundschule** (largest)
  - Grades 1–6
  - Ages ~6–12
- Expandable nodes: brief teaser only — full narrative belongs in anchored sections below
- Berlin callouts: inline on nodes **and** a summary box that points families to `/guides/berlin-school-system` for Berlin primary specifics (6-year Grundschule, etc.)
- Phase 9 page should feel like a **scaffold parents can already orient from**, even before Phase 10 editorial ships

</specifics>

<deferred>
## Deferred Ideas

- **Full editorial content** (Kita→Uni narrative, decision-point prose, glossary links) — Phase 10 (ONBD-01–05)
- **Homepage journey card + Guides hub flagship placement** — Phase 11 (DISC-01, DISC-02)
- **Cross-links onboarding ↔ berlin-school-system ↔ first-steps ↔ directory** — Phase 11 (DISC-03, DISC-04)
- **Portuguese SEO metadata polish + e2e smoke for homepage → onboarding** — Phase 11 (REL-01, REL-03)
- **Interactive pathway calculators or quizzes** — out of scope per REQUIREMENTS.md

</deferred>

---

*Phase: 09-onboarding-guide-visual-foundation*
*Context gathered: 2026-07-12*
