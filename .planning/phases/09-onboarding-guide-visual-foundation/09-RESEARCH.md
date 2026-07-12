# Phase 9: Onboarding Guide Visual Foundation - Research

**Researched:** 2026-07-12
**Domain:** MDX-embedded React visual components (timeline/branching infographic, callouts, glossary shell) in a static Next.js App Router site
**Confidence:** HIGH

## Summary

Phase 9 is a greenfield component-building phase inside an already-established feature-first Next.js 16 / React 19 / Tailwind 4 codebase. No timeline, branching-diagram, or callout MDX components exist yet, but every supporting pattern needed already exists in the repo: the `mdx-components.tsx` global-component-registration convention, a responsive dual-render pattern (`hidden lg:block` / `lg:hidden`) already used for `ComparisonTable`/`ComparisonMobile`, a `guide-print` / `guide-print-hide` print CSS convention, Radix primitives + `class-variance-authority` + `tailwindcss-animate` for interactive primitives (currently only `Dialog`/`Slot`, used by `Sheet`), and existing color tokens (`bg-blue-50 text-blue-800`, `border-l-4 border-l-primary`) that map cleanly onto the Berlin-callout and glossary visual needs. The route-shell pattern (`GuideIntro` + MDX import + `buildPageMetadata`, `max-w-3xl` container) is fully established from `/guides/berlin-school-system` and `/guides/first-steps`.

The one genuinely new piece of architecture is that Phase 9 is the **first phase to put custom interactive React components inside `.mdx` content**. This works today without new content-pipeline plumbing: components returned from `useMDXComponents()` in `src/mdx-components.tsx` are globally available inside every `.mdx` file by their component name (e.g. `<EducationTimeline />`) with no per-file import needed — confirmed against current Next.js App Router MDX docs. The only new dependency needed is `@radix-ui/react-collapsible` (for accessible expand/collapse on timeline nodes and the mobile "Outras vias" disclosure), which is a natural, low-risk extension of the Radix pattern the repo already uses for `Sheet`.

**Primary recommendation:** Build four new colocated components under `src/features/guides/` (`EducationTimeline`, `TimelineNode` used internally, `BerlinCallout`, `GlossaryTerm`), register them by name in `src/mdx-components.tsx`, add `@radix-ui/react-collapsible` for node expand/collapse and the mobile secondary-routes disclosure, and ship the route with the same `GuideIntro` + MDX-import + `buildPageMetadata` shell already proven at `/guides/berlin-school-system`.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Education timeline rendering (branching infographic, desktop/mobile layouts) | Browser / Client (React component, static-rendered) | — | Pure presentational component; data is static placeholder props, no server logic needed |
| Node expand/collapse interaction | Browser / Client | — | Client-side UI state only (`"use client"` + Radix Collapsible); no persistence, no server round-trip |
| Berlin callout rendering (inline badge + summary box) | Browser / Client | — | Static presentational component consumed from MDX |
| Glossary term shell | Browser / Client | — | Static presentational component; content is placeholder in Phase 9 |
| Route shell (`/guides/german-education-system`) | Frontend Server (SSR/SSG via `output: "export"`) | Browser / Client | Next.js App Router page is statically generated at build time (`output: "export"`); interactive sub-components hydrate on the client |
| MDX compilation (content → JSX) | Build tooling (`@next/mdx`) | — | Happens entirely at build time; no runtime MDX parsing |
| Page metadata (title/OG/canonical) | Frontend Server (SSG) | — | `buildPageMetadata` runs at build time, same as all other guide routes |

No API/backend or database tier is implicated — this phase is 100% static-first, consistent with `docs/DECISIONS.md`.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| VIS-01 | Education journey communicated with visual timeline(s), minimizing long text blocks | `EducationTimeline` component pattern (desktop branching infographic / mobile stacked journey), reusing the `hidden lg:block` / `lg:hidden` dual-render pattern already proven in `ComparisonTable`/`ComparisonMobile` |
| VIS-02 | Pathway decision points use diagrams or structured visual branches | Branching is modeled as data (nodes with `branches` arrays) inside the same `EducationTimeline` component per D-06; mobile secondary branches collapse into "Outras vias" via `@radix-ui/react-collapsible` per D-08 |
| VIS-03 | Berlin-specific callouts visually distinct from Germany-wide content | `BerlinCallout` component (summary box) + inline badge slot on `TimelineNode`, using existing `bg-blue-50 text-blue-800` / `border-l-4 border-l-primary` tokens for a factual, non-alarming tone per D-09/D-10 |
</phase_requirements>

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Education timeline infographic (VIS-01)**
- D-01: Responsive infographic — desktop left-to-right flow with branching decision points and converging higher-education pathways; mobile top-to-bottom journey preserving the same visual structure.
- D-02: Primary goal is to communicate the entire German education system at a glance, before prose.
- D-03: Every node shows stage name, grades, and age range together — stage name largest, grades/ages smaller but never hidden as secondary metadata (e.g. `Grundschule` → `Grades 1–6` → `Ages ~6–12`).
- D-04: Nodes are compact cards — stage name + grades + ages only. Longer explanations live in prose sections below (Phase 10 fills these; Phase 9 may use placeholder stubs).
- D-05: Nodes are expandable — tap/click reveals a short summary (2–3 sentences max) plus an optional link to an on-page section anchor. Not full accordion sections for the whole guide.

**Pathway / decision diagrams (VIS-02)**
- D-06: Branching is integrated into the main timeline infographic — branches emerge from Grundschule/secondary transition nodes in the same visual, not a separate disconnected diagram block.
- D-07: Show all major routes: Gymnasium, Realschule, Hauptschule, Gesamtschule, and vocational/Ausbildung paths to higher education. Do not imply Gymnasium is the only path.
- D-08: On mobile, show the main path fully; secondary/vocational branches collapse into a collapsible "Outras vias" section so the page stays scannable without losing route coverage.

**Berlin difference callouts (VIS-03)**
- D-09: Dual pattern — (1) inline "Em Berlim" badge on affected timeline nodes with optional one-line note on the node itself; (2) a summary "Berlin em destaque" box grouping Berlin differences and linking to `/guides/berlin-school-system` for the Berlin primary deep-dive.
- D-10: Callout tone is factual highlight — neutral accent border/background, informative not alarming. Berlin differences should scan quickly without feeling like warnings.

**Phase 9 route shell & component scope**
- D-11: Ship `/guides/german-education-system` in Phase 9 with GuideIntro, live timeline/pathway/callout demos using placeholder copy, and section heading stubs (anchors Phase 10 will fill). Not a components-only fixture page without a public route.
- D-12: Include a `GlossaryTerm` component shell in Phase 9 — styled term + definition block usable in MDX, with placeholder terms in the demo MDX. Full glossary editorial and cross-linking is Phase 10 (ONBD-05).

### Claude's Discretion
- Exact infographic layout mechanics (connectors, arrows, spacing, color tokens) within existing Tailwind/shadcn patterns
- Expand/collapse interaction details (animation, `aria-expanded`, keyboard support)
- Placeholder copy wording and which nodes carry Berlin badges in the demo
- Component directory structure under `src/features/guides/` and MDX registration in `mdx-components.tsx`
- Print behavior for infographic components (reuse existing guide print CSS where sensible)
- Unit test scope for new components and route shell

### Deferred Ideas (OUT OF SCOPE)
- Full editorial content (Kita→Uni narrative, decision-point prose, glossary links) — Phase 10 (ONBD-01–05)
- Homepage journey card + Guides hub flagship placement — Phase 11 (DISC-01, DISC-02)
- Cross-links onboarding ↔ berlin-school-system ↔ first-steps ↔ directory — Phase 11 (DISC-03, DISC-04)
- Portuguese SEO metadata polish + e2e smoke for homepage → onboarding — Phase 11 (REL-01, REL-03)
- Interactive pathway calculators or quizzes — out of scope per REQUIREMENTS.md
</user_constraints>

## Project Constraints (from AGENTS.md / docs)

- **Package manager:** pnpm via Corepack only — never npm/yarn commands in scripts, docs, or CI. `[VERIFIED: package.json]` `packageManager: "pnpm@11.11.0"`.
- **Static-first:** No production database, server-side API, or auth for V1. This phase is pure static content + client-hydrated presentational components — fully compliant by construction.
- **Feature-first `src/`:** New components belong in `src/features/guides/`; `src/app` stays routing/composition-only; `src/components/ui` is shadcn/ui primitives only (so `EducationTimeline`, `BerlinCallout`, `GlossaryTerm` are **feature** components, not `ui` primitives — they are guide-domain components, not generic design-system primitives).
- **Directory-based colocation:** One directory per component (`index.tsx`, `index.test.tsx`, `types.ts`, `utils.ts`, `constants.ts`, `fixtures.ts` as needed) — do not repeat the directory name in file names.
- **English routes/identifiers, Portuguese visible copy:** `/guides/german-education-system` route segment, component/prop names in English, all rendered copy (including placeholder MDX) in Brazilian Portuguese.
- **Avoid generic/reusable abstractions until 2 use cases exist:** `TimelineNode` should stay an internal implementation detail of `EducationTimeline` (not a standalone exported "reusable" component) unless/until a second consumer appears.
- **Editorial tone (docs/EDITORIAL_GUIDE.md):** practical, neutral, no ranking language — applies to placeholder copy in Phase 9's demo MDX, not just Phase 10's real editorial.
- **Testing proportional to risk (AGENTS.md):** important workflows eventually need coverage; Phase 9 introduces new interactive components (expand/collapse) and a new public route — both are reasonable candidates for unit tests per "Claude's Discretion" on test scope.

## Standard Stack

### Core (already in the project — no version changes needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|---------------|
| next | 16.2.10 | App Router, static export (`output: "export"`), MDX page support | Already the project's framework `[VERIFIED: package.json]` |
| react / react-dom | 19.2.7 | Component runtime | Already in use `[VERIFIED: package.json]` |
| @next/mdx | 16.2.10 | Compiles `.mdx` files into importable React components | Already wired in `next.config.mjs` `[VERIFIED: next.config.mjs]` |
| @mdx-js/react | 3.1.1 | Provides the `useMDXComponents` context mechanism `mdx-components.tsx` relies on | Already in use `[VERIFIED: package.json, src/mdx-components.tsx]` |
| tailwindcss | 4.3.2 | Styling | Already in use `[VERIFIED: package.json]` |
| class-variance-authority | 0.7.1 | Variant-based component styling (used by `Button`, `Sheet`) | Already the established pattern for components with style variants `[VERIFIED: src/components/ui/Button/index.tsx]` |
| tailwindcss-animate | ^1.0.7 | Provides `animate-in`/`animate-out`/`data-[state=]` animation utility classes already used with Radix `Dialog` | Already in use for Radix-driven animation `[VERIFIED: src/components/ui/Sheet/index.tsx]` |
| lucide-react | 1.24.0 | Icons (chevrons for expand/collapse affordance, matching `ChevronRight` already used in `SchoolCard`) | Already the icon library `[VERIFIED: package.json, src/features/schools/SchoolCard/index.tsx]` |
| @radix-ui/react-dialog | ^1.1.19 | Precedent for how this repo pairs a Radix primitive with `cva` + `tailwindcss-animate` (`Sheet`) | Pattern precedent, not directly reused here |

### Supporting (new addition needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @radix-ui/react-collapsible | 1.1.16 (latest, `[VERIFIED: npm view @radix-ui/react-collapsible version, 2026-07-12]`) | Accessible disclosure primitive: manages `aria-expanded`, `aria-controls`, `data-state`, keyboard (Space/Enter) automatically | Use for (a) individual timeline node expand/collapse (D-05) and (b) the mobile "Outras vias" collapsible section (D-08) |

**Installation:**
```bash
pnpm add @radix-ui/react-collapsible
```

**Version verification:** `npm view @radix-ui/react-collapsible version` returned `1.1.16` on 2026-07-12, consistent in major version with the already-installed `@radix-ui/react-dialog@^1.1.19` and `@radix-ui/react-slot@1.3.0` (all Radix v1.x primitives) — no version-skew risk.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@radix-ui/react-collapsible` | Hand-rolled `useState` + conditional render + manual `aria-expanded` | Radix gives correct ARIA (`aria-controls`, keyboard handling, `data-state` for CSS animation) for free; hand-rolling risks subtly wrong a11y semantics that the project's own `e2e/a11y.spec.ts` (axe) would eventually need to catch anyway. Given the repo already pays the Radix dependency cost for `Sheet`, adding one more small Radix primitive is lower-risk than hand-rolling. |
| `@radix-ui/react-collapsible` | Native `<details>`/`<summary>` | Valid, zero-JS, and genuinely reasonable for the mobile "Outras vias" disclosure alone — flagged as a real alternative below (see Pattern 3). Weaker fit for **per-node** expand (D-05) because node cards need controlled icon rotation and precise height-animation styling that native `<details>` makes awkward across browsers. |
| Custom SVG connector paths for branch lines | CSS-only borders/positioning (flexbox/grid + pseudo-elements) | Given "Claude's Discretion" on exact connector mechanics and the project's stated preference to avoid new abstractions until proven necessary, plain CSS (borders, absolutely-positioned connector `<div>`s) is lower-risk than introducing an SVG diagram library (e.g. React Flow) for a scope this constrained (single infographic, no drag/zoom/pan needed). An SVG/diagram library would be over-engineering for V1. |

## Architecture Patterns

### System Architecture Diagram

```
Build time (pnpm build / next build, output: "export")
──────────────────────────────────────────────────────────
 src/content/guides/german-education-system.mdx
    │  (placeholder prose + <EducationTimeline/>, <BerlinCallout/>,
    │   <GlossaryTerm/> JSX tags, no per-file imports needed)
    ▼
 @next/mdx compiler (next.config.mjs: withMDX)
    │  compiles .mdx → React component module
    ▼
 src/mdx-components.tsx → useMDXComponents()
    │  injects { h1, h2, ..., EducationTimeline, BerlinCallout, GlossaryTerm }
    │  as the component map available inside every .mdx file
    ▼
 src/app/guides/german-education-system/page.tsx
    │  imports compiled MDX component + GuideIntro + buildPageMetadata
    ▼
 Static HTML output (out/) — one prerendered page, no runtime server
──────────────────────────────────────────────────────────
Runtime in browser (hydration)
──────────────────────────────────────────────────────────
 EducationTimeline (client component, "use client")
    │
    ├─ Desktop render path (hidden below `lg`):
    │     TimelineNode[] laid out left→right with branch connectors
    │     → each TimelineNode wraps Radix Collapsible.Root
    │           Trigger (card) → toggles → Content (2–3 sentence summary + anchor link)
    │
    └─ Mobile render path (hidden at `lg` and above):
          TimelineNode[] stacked top→bottom (main path)
          → secondary/vocational nodes grouped inside one
            Radix Collapsible.Root labeled "Outras vias"

 BerlinCallout
    ├─ inline mode: small badge rendered inside/near a TimelineNode
    └─ summary mode: standalone box below the timeline, links to
       /guides/berlin-school-system

 GlossaryTerm
    └─ static term/definition block, no interactivity in Phase 9
```

A reader can trace the primary use case (family opens the route) top-to-bottom: MDX content is compiled at build time with the visual components resolved from the global registry, statically exported, then hydrates client-side so the timeline's expand/collapse and the mobile disclosure become interactive.

### Recommended Project Structure

```
src/features/guides/
├── GuideIntro/                     # existing — reused as-is
├── GuidePrintButton/                # existing — reused as-is
├── GuidesHub/                       # existing — untouched in Phase 9
├── mdxUtils/                        # existing — reused for heading anchors
├── EducationTimeline/               # NEW — desktop + mobile branching infographic
│   ├── index.tsx                    # public component, renders both responsive variants
│   ├── index.test.tsx
│   ├── TimelineNode.tsx             # internal node card (kept in same dir per D-04/D-05 scope; promote to its own directory only if reused elsewhere)
│   ├── types.ts                     # node/branch/stage data shape
│   ├── constants.ts                 # placeholder demo data for Phase 9 (Phase 10 may relocate to content)
│   └── fixtures.ts                  # test fixtures
├── BerlinCallout/                   # NEW — inline badge + summary box variants
│   ├── index.tsx
│   ├── index.test.tsx
│   └── types.ts
└── GlossaryTerm/                    # NEW — term/definition shell
    ├── index.tsx
    └── index.test.tsx

src/content/guides/
└── german-education-system.mdx      # NEW — placeholder copy + component demos + heading stubs

src/app/guides/german-education-system/
└── page.tsx                         # NEW — GuideIntro + buildPageMetadata + MDX import, same shape as berlin-school-system/page.tsx

src/mdx-components.tsx                # MODIFIED — register EducationTimeline, BerlinCallout, GlossaryTerm
```

### Pattern 1: Global MDX component registration (no per-file import)

**What:** Components exported from `useMDXComponents()` in `src/mdx-components.tsx` are available by tag name in every `.mdx` file automatically — this is how `h1`/`h2`/`a` are already overridden in this repo.
**When to use:** For all three new visual components, so `german-education-system.mdx` can write `<EducationTimeline />`, `<BerlinCallout variant="summary">...</BerlinCallout>`, `<GlossaryTerm term="Ganztag">...</GlossaryTerm>` directly, matching the zero-import ergonomics of the existing heading/link overrides.
**Example:**
```typescript
// Source: Next.js docs (nextjs.org/docs/app/guides/mdx) + existing src/mdx-components.tsx
import { EducationTimeline } from "@/features/guides/EducationTimeline";
import { BerlinCallout } from "@/features/guides/BerlinCallout";
import { GlossaryTerm } from "@/features/guides/GlossaryTerm";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ...existing h1/h2/p/ul/ol/li/a/strong overrides...
    EducationTimeline,
    BerlinCallout,
    GlossaryTerm,
    ...components,
  };
}
```

### Pattern 2: Responsive dual-render (desktop branching vs. mobile stacked)

**What:** Render two structurally different layouts for the same data, toggled purely by Tailwind responsive `hidden`/`block` classes — no JS `matchMedia`, no layout shift risk from client-only detection.
**When to use:** For `EducationTimeline`'s desktop-branching vs. mobile-stacked requirement (D-01), directly mirroring the existing `ComparisonTable`/`ComparisonMobile` split.
**Example:**
```typescript
// Source: existing repo pattern (src/features/schools/SchoolComparison/index.tsx)
<div className="hidden lg:block">
  <EducationTimelineDesktop stages={stages} />
</div>
<div className="lg:hidden">
  <EducationTimelineMobile stages={stages} />
</div>
```
Both variants render into the DOM at build time (good for static export and for unit tests, which can query either variant directly without mocking viewport size — see Common Pitfalls).

### Pattern 3: Accessible disclosure via Radix Collapsible

**What:** Wrap each expandable unit in `Collapsible.Root` / `Collapsible.Trigger` / `Collapsible.Content`, styling open/closed state via the `data-state` attribute (matching the existing `data-[state=open]`/`data-[state=closed]` convention already used in `Sheet`).
**When to use:** Individual `TimelineNode` expand (D-05) and the mobile "Outras vias" section (D-08).
**Example:**
```tsx
// Source: radix-ui.com/primitives/docs/components/collapsible
"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

function TimelineNode({ stage, grades, ages, summary, anchorHref }: TimelineNodeProps) {
  return (
    <Collapsible.Root className="rounded-lg border border-neutral-200 bg-white p-3">
      <Collapsible.Trigger className="flex w-full items-center justify-between gap-2 text-left">
        <span>
          <span className="block text-base font-semibold text-neutral-950">{stage}</span>
          <span className="block text-sm text-neutral-600">{grades}</span>
          <span className="block text-xs text-neutral-500">{ages}</span>
        </span>
        <ChevronDown
          className="size-4 shrink-0 text-neutral-500 transition-transform data-[state=open]:rotate-180"
          aria-hidden
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="mt-2 text-sm text-neutral-700">
        <p>{summary}</p>
        {anchorHref ? (
          <a href={anchorHref} className="mt-1 inline-block font-medium text-blue-700 underline">
            Ver seção completa
          </a>
        ) : null}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
```
Note: `ChevronDown` needs `data-[state=open]` to read from the **Trigger's** state; Radix puts `data-state` on `Trigger` and `Content`, so the icon should live inside `Collapsible.Trigger` (as above) for the CSS attribute selector to apply directly, or receive `open` via local state if pulled out further.

### Pattern 4: Berlin callout — dual mode via one component

**What:** A single `BerlinCallout` component with an internal variant (`inline` badge vs. `summary` box) rather than two separate components, since both share the "Em Berlim" framing and D-09 explicitly describes them as one dual pattern.
**When to use:** `variant="inline"` rendered adjacent to/inside affected `TimelineNode`s; `variant="summary"` rendered once below the timeline, linking to `/guides/berlin-school-system`.
**Example:**
```tsx
// Illustrative — new code, not from an external source
type BerlinCalloutProps =
  | { variant: "inline"; note: string }
  | { variant: "summary"; children: ReactNode };

export function BerlinCallout(props: BerlinCalloutProps) {
  if (props.variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-800">
        Em Berlim
        <span className="font-normal text-blue-700">— {props.note}</span>
      </span>
    );
  }

  return (
    <aside className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-blue-50/40 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
        Berlin em destaque
      </p>
      <div className="mt-2 text-sm leading-7 text-neutral-700">{props.children}</div>
      <a href="/guides/berlin-school-system" className="mt-3 inline-block font-medium text-blue-700 underline">
        Ver guia completo do sistema em Berlim
      </a>
    </aside>
  );
}
```
This reuses the `bg-blue-50`/`text-blue-800` tokens already used for source-group badges (`SourcesSection`) and the `border-l-4 border-l-primary` accent already used for featured cards (`GuidesHub`, `HomeJourneyCards`) — satisfying D-10's "neutral, factual, not alarming" requirement without introducing new color tokens (amber/red are already reserved in this codebase for evidence-status warnings, per `StatusBadge`, and would send the wrong signal here).

### Anti-Patterns to Avoid

- **Full-page accordion instead of per-node disclosure:** D-05 explicitly says nodes reveal a short 2–3 sentence teaser, not full accordion sections for the whole guide — don't let `EducationTimeline` grow into a giant FAQ-accordion; full narrative stays in the prose sections below (Phase 10).
- **Separate disconnected branch diagram:** D-06 explicitly forbids a second, disconnected diagram block for pathway branching — branches must render as part of the same `EducationTimeline` visual/data structure, not a sibling component.
- **JS-based responsive detection (`matchMedia`/`useEffect` + `window.innerWidth`):** would break static export assumptions, cause hydration flicker, and diverge from the proven `hidden lg:block`/`lg:hidden` CSS-only pattern already in the codebase.
- **Reusing amber/red tokens for Berlin callouts:** those colors are already semantically reserved for evidence-status warnings (`not_confirmed`, `conflicting` in `StatusBadge`) — reusing them for Berlin callouts would visually imply "something is wrong" and violate D-10's neutral/factual tone requirement.
- **Promoting `TimelineNode` to a standalone exported/reusable primitive prematurely:** AGENTS.md explicitly says to avoid generic/reusable components until ≥2 concrete use cases exist; keep it as an internal implementation detail of `EducationTimeline` for Phase 9.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Expand/collapse disclosure with correct ARIA | Custom `useState` + manual `aria-expanded`/`aria-controls` wiring | `@radix-ui/react-collapsible` | Radix handles `aria-expanded`, `aria-controls` id-linking, keyboard (Space/Enter) toggling, and `data-state` for CSS-only animation — all edge cases the project's own axe e2e suite (`e2e/a11y.spec.ts`) would otherwise need to catch by trial and error |
| MDX-to-React component wiring | A bespoke content-loader or per-page manual `<MDXProvider>` wrapper | The existing `mdx-components.tsx` global registration convention already wired by `@next/mdx` | This mechanism already exists and works for `h1`/`h2`/`a`; duplicating it with a second registration path would fragment the MDX component system |

**Key insight:** Nothing in this phase needs a new architectural mechanism — every "hard part" (responsive dual-layout, accessible disclosure, MDX component injection, print styling, route/metadata shell) already has a working precedent in this codebase or a maintained Radix primitive. The work is applying existing patterns to new visual content, not inventing new infrastructure.

## Common Pitfalls

### Pitfall 1: Testing responsive components with Jest/RTL
**What goes wrong:** Assuming you need to mock `window.matchMedia` or set `innerWidth` to test mobile vs. desktop timeline rendering.
**Why it happens:** Many responsive-component patterns elsewhere (not this repo) use JS-based viewport detection.
**How to avoid:** Because this repo's pattern renders both variants into the DOM simultaneously (hidden via Tailwind classes), Jest/RTL tests can query both the desktop and mobile subtrees directly in the same render — exactly how `ComparisonMobile`'s and `ComparisonTable`'s tests already work. No `matchMedia` mock is needed.
**Warning signs:** If a test needs `window.matchMedia = jest.fn()...` to make an assertion pass, the component was probably built with JS-based responsive detection instead of the established CSS-based pattern — reconsider the implementation.

### Pitfall 2: `"use client"` boundary placement breaking static export
**What goes wrong:** Marking the entire `EducationTimeline` module (or worse, the MDX file itself) `"use client"` unnecessarily, or forgetting it entirely on the component that actually holds interactive state.
**Why it happens:** Only the component(s) using Radix Collapsible's `open`/`onOpenChange` state (or relying on `Collapsible.Trigger`'s internal state) need to be client components; the surrounding MDX content and route `page.tsx` can and should stay server components for static generation (`output: "export"`).
**How to avoid:** Put `"use client"` only at the top of the file(s) that use Radix Collapsible (`TimelineNode`, and the mobile "Outras vias" wrapper if it manages `open` state itself). `GlossaryTerm` and the `BerlinCallout` "summary" variant have no interactivity in Phase 9 and should stay server components.
**Warning signs:** Build warnings about client boundaries, or unnecessarily large client JS bundles for a static-first site.

### Pitfall 3: Branch connector styling breaking on mobile stacked layout
**What goes wrong:** CSS built for desktop horizontal connectors (absolute positioning, fixed pixel offsets) doesn't degrade gracefully when the same node data renders in the mobile stacked layout, causing overflow or visual artifacts.
**Why it happens:** Because D-01 requires the *same visual structure* on mobile (top-to-bottom) as desktop (left-to-right), it's tempting to reuse one set of connector CSS for both.
**How to avoid:** Build the connector/branch visuals as two genuinely separate rendering paths (per Pattern 2) with independent, simple CSS for each orientation (e.g., desktop: `border-t`/absolute lines between flex siblings; mobile: `border-l` vertical line down a stacked column) rather than trying to rotate/transform one shared connector implementation. Verify with the existing e2e overflow check pattern (`document.documentElement.scrollWidth > clientWidth`, already used in `e2e/smoke.spec.ts` for the comparison table) at a mobile viewport width (390px, matching the existing test).

### Pitfall 4: Forgetting the print stylesheet for new interactive components
**What goes wrong:** Timeline nodes stay collapsed (showing only the teaser card) when a family prints the guide, defeating the point of a printable takeaway.
**Why it happens:** The existing `guide-print`/`guide-print-hide` CSS classes (`src/app/globals.css`) were designed for the checklist page, not for components with hidden/expandable content.
**How to avoid:** Decide explicitly (Claude's Discretion, per CONTEXT.md) whether print output should force all node summaries visible (e.g. `@media print { [data-state] { display: block !important; } }` overriding Collapsible's `hidden` content behavior) or intentionally omit expandable detail from print and rely on the prose sections below. Either choice is acceptable, but it should be a conscious decision recorded in the plan, not an accidental side effect of Radix's default closed-by-default behavior.
**Warning signs:** A printed guide where every timeline node teaser is empty/collapsed.

### Pitfall 5: MDX component name collisions or missing registration
**What goes wrong:** Using `<EducationTimeline />` in the `.mdx` file before it's registered in `mdx-components.tsx` renders nothing or throws at build time (Next.js MDX treats unregistered capitalized tags as undefined components).
**Why it happens:** Easy to write the MDX demo content before wiring the registration, especially when iterating on the component in isolation first (e.g. via a test).
**How to avoid:** Register each new component in `src/mdx-components.tsx` as part of the same task/commit that first uses it in the `.mdx` file, and smoke-test by running `pnpm build` (static export will fail loudly on an unresolved MDX component) before considering the task done.

## Code Examples

### Route shell (mirrors existing `/guides/berlin-school-system` exactly)
```tsx
// Source: existing repo pattern, src/app/guides/berlin-school-system/page.tsx
import GermanEducationSystemGuide from "@/content/guides/german-education-system.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Sistema educacional alemão",
  description:
    "Um panorama visual do caminho educacional na Alemanha, do Kita à universidade, com as diferenças de Berlim em destaque.",
  path: "/guides/german-education-system",
});

export default function GermanEducationSystemPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona o sistema educacional na Alemanha"
        description="Um panorama visual da jornada escolar — do Kita à universidade — com as diferenças de Berlim destacadas ao longo do caminho."
      />
      <GermanEducationSystemGuide />
    </main>
  );
}
```
Note: consider whether the infographic needs a wider container than `max-w-3xl` (used for pure-prose guides). A reasonable approach — flagged as Claude's Discretion for the plan — is keeping `GuideIntro` and prose at `max-w-3xl` while letting `EducationTimeline` render inside a wider wrapper (e.g. `max-w-5xl` or full-bleed within the `main`) so the desktop branching diagram has room to breathe without forcing the whole page narrower or wider than the established guide convention.

### Placeholder MDX demo structure
```mdx
<!-- Source: illustrative, following existing src/content/guides/*.mdx conventions -->
<EducationTimeline />

## O caminho da Kita à universidade

*(Conteúdo completo chega na Fase 10 — esta seção é um placeholder.)*

<BerlinCallout variant="summary">
  Em Berlim, a Grundschule dura seis anos (1ª à 6ª série) em vez dos quatro anos comuns em outros estados alemães.
</BerlinCallout>

## Glossário

<GlossaryTerm term="Ganztag">
  Modelo de escola em tempo integral ou com atividades ao longo do dia. *(Definição completa na Fase 10.)*
</GlossaryTerm>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| Pages-router `next-mdx-remote` + manual `MDXProvider` wrapping per page | App Router `mdx-components.tsx` file convention with automatic global injection | Next.js 13+ App Router MDX support (stable well before Next 16) | This repo already uses the current approach; no migration needed, just extension with new component entries |

**Deprecated/outdated:** None relevant — the repo's MDX setup, Radix usage, and Tailwind version are all current as of this research date.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|----------------|
| A1 | A wider container than `max-w-3xl` is desirable for the desktop infographic specifically, while prose stays narrower | Code Examples / Architecture Patterns | Low — purely visual; if wrong, planner/implementer can keep `max-w-3xl` throughout with no functional impact, only a more cramped desktop diagram |
| A2 | `ChevronDown` (or similar) icon exists and is styleable via `data-[state=open]:rotate-180` when placed inside `Collapsible.Trigger` | Pattern 3 | Low — `lucide-react` is already a dependency with a broad icon set; if `ChevronDown` specifically doesn't exist under that exact name, an equivalent chevron icon certainly does |

**If this table is empty:** N/A — two low-risk, easily-reversible layout/styling assumptions are logged above; nothing here blocks planning.

## Open Questions (RESOLVED)

1. **Should `EducationTimeline`'s placeholder data live in a `constants.ts` inside the component directory, or in `src/content/`?**
   - RESOLVED: For Phase 9, keep placeholder stage/branch data as a typed constant colocated with `EducationTimeline` (simplest, matches "don't build abstractions before 2 use cases" guidance). Leave a clear seam (exported `TimelineStage[]` type) so Phase 10 can decide whether to keep it as a TS constant or move it to structured content — this is a Phase 10 planning decision, not a Phase 9 blocker.
   - What we know: Phase 9 explicitly uses placeholder copy (D-04, D-11); Phase 10 will replace it with real editorial content.
   - What's unclear: Whether Phase 10's editorial work will replace the *component's* placeholder data structure in place, or whether the timeline's node data should be designed from the start to live in `src/content/` (MDX-adjacent) so Phase 10 only edits content, not component code.

2. **Exact node count/labels for the Phase 9 demo (which stages, which get Berlin badges)?**
   - RESOLVED: Use a representative but not exhaustive placeholder set (e.g. Kita, Grundschule, secondary branch fan-out with the four named tracks, Ausbildung/Abitur convergence) — enough to prove the branching visual works and satisfy D-07's "don't imply Gymnasium is the only path" framing, without trying to pre-author Phase 10's content. This is a copy/data decision for the plan, not a research gap.
   - What we know: D-07 requires showing Gymnasium, Realschule, Hauptschule, Gesamtschule, and vocational/Ausbildung routes; D-09 requires at least one Berlin-badged node in the demo.
   - What's unclear: Whether the Phase 9 demo should already include the full "Kita → Uni" stage list (matching the real eventual content) or a smaller illustrative subset, since full editorial accuracy is explicitly Phase 10's job.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| pnpm | All install/build/test commands | ✓ | 11.11.0 `[VERIFIED]` | — |
| Node.js | Next.js build/dev | ✓ | v24.12.0 `[VERIFIED]` | — |
| npm registry access | Installing `@radix-ui/react-collapsible` | ✓ | package resolves at 1.1.16 `[VERIFIED: npm view]` | — |
| @next/mdx / @mdx-js/react | MDX compilation | ✓ (already installed) | 16.2.10 / 3.1.1 `[VERIFIED: package.json]` | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None — the only new dependency (`@radix-ui/react-collapsible`) is confirmed available and version-compatible; no fallback path is needed.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 + React Testing Library 16.3.2 (unit); Playwright 1.61.1 + @axe-core/playwright 4.10.2 (e2e/a11y) `[VERIFIED: package.json]` |
| Config file | `jest.config.mjs` (unit), `playwright.config.ts` / `playwright.ci.config.ts` (e2e) |
| Quick run command | `pnpm test -- EducationTimeline` (or `BerlinCallout`, `GlossaryTerm`) for a single component |
| Full suite command | `pnpm test` (unit), `pnpm e2e` (Playwright, dev server required) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|--------------------|---------------|
| VIS-01 | Desktop and mobile timeline variants both render node stage/grades/ages (D-03) | unit | `pnpm test -- EducationTimeline` | ❌ Wave 0 |
| VIS-01 | Timeline node expands on click to reveal summary + optional anchor link (D-05) | unit | `pnpm test -- EducationTimeline` | ❌ Wave 0 |
| VIS-01 | No horizontal overflow on mobile viewport (390px) for the new route | e2e | add assertion to `e2e/smoke.spec.ts` or a new `e2e/onboarding.spec.ts`, reusing the `document.documentElement.scrollWidth` check pattern from the existing compare mobile test | ❌ Wave 0 |
| VIS-02 | All major routes (Gymnasium/Realschule/Hauptschule/Gesamtschule/Ausbildung) present in timeline data/render (D-07) | unit | `pnpm test -- EducationTimeline` | ❌ Wave 0 |
| VIS-02 | Mobile secondary/vocational branches collapse into "Outras vias" (D-08) | unit | `pnpm test -- EducationTimeline` (assert `aria-expanded="false"` initially, becomes `true` after interaction via `userEvent.click`) | ❌ Wave 0 |
| VIS-03 | Inline "Em Berlim" badge renders on designated node(s) (D-09) | unit | `pnpm test -- BerlinCallout` and/or `EducationTimeline` | ❌ Wave 0 |
| VIS-03 | Summary "Berlin em destaque" box links to `/guides/berlin-school-system` (D-09) | unit | `pnpm test -- BerlinCallout` | ❌ Wave 0 |
| D-11 (route) | `/guides/german-education-system` renders `GuideIntro` + placeholder MDX with live component demos | unit + manual | unit: a route-level smoke test if the plan adds one (optional, App Router page components are excluded from Jest coverage per `jest.config.mjs`'s `collectCoverageFrom` — `!src/app/**/page.{ts,tsx,mdx}`); manual: `pnpm dev` and visually confirm | ❌ Wave 0 (unit optional) |
| D-12 (glossary shell) | `GlossaryTerm` renders term + definition with correct semantic structure | unit | `pnpm test -- GlossaryTerm` | ❌ Wave 0 |

Note: because `src/app/**/page.{ts,tsx,mdx}` is explicitly excluded from Jest coverage collection (`jest.config.mjs`), route-level verification of D-11 is expected to lean on manual verification (`pnpm dev`) plus the existing e2e suite pattern, consistent with how `berlin-school-system`'s route has no dedicated Jest test today — only component-level unit tests plus e2e smoke/a11y/metadata coverage.

### Sampling Rate
- **Per task commit:** `pnpm test -- <ComponentName>` for the component just built; `pnpm typecheck` and `pnpm lint` (both fast, no config changes needed).
- **Per wave merge:** `pnpm test` (full unit suite) plus `pnpm build` (static export — the most reliable way to catch an unregistered/misnamed MDX component per Pitfall 5).
- **Phase gate:** Full unit suite green, `pnpm build` green, and a manual visual check of `/guides/german-education-system` at both desktop and mobile viewport widths before `/gsd-verify-work`. Playwright e2e/a11y additions are optional for Phase 9 (REL-01/REL-02/REL-03 are formally Phase 11 requirements) but adding the new route to `e2e/a11y.spec.ts`'s `CORE_A11Y_ROUTES` list is low-cost and catches obvious ARIA regressions in the new interactive components early — flagged as a planner decision, not a hard requirement.

### Wave 0 Gaps
- [ ] `src/features/guides/EducationTimeline/index.test.tsx` — new, covers VIS-01/VIS-02
- [ ] `src/features/guides/EducationTimeline/fixtures.ts` — placeholder stage/branch fixture data shared between the component, its tests, and the demo MDX
- [ ] `src/features/guides/BerlinCallout/index.test.tsx` — new, covers VIS-03
- [ ] `src/features/guides/GlossaryTerm/index.test.tsx` — new, covers D-12
- [ ] Framework install: `pnpm add @radix-ui/react-collapsible` — required before `EducationTimeline`'s expand/collapse or the mobile disclosure can be implemented
- [ ] Decision (not a file): whether to extend `e2e/a11y.spec.ts` / `e2e/metadata.spec.ts` route lists with `/guides/german-education-system` in Phase 9 or leave that to Phase 11 — no gap in test *infrastructure*, just a scope call for the plan

## Security Domain

No new attack surface is introduced: this phase adds only static, client-rendered presentational components with no user input, no forms, no data fetching, and no new routes that accept parameters. `security_enforcement` considerations are not applicable beyond what's already covered by the existing static-export architecture.

| ASVS Category | Applies | Standard Control |
|----------------|---------|-------------------|
| V2 Authentication | No | N/A — no auth in this product (docs/PRODUCT.md) |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A — fully public static route |
| V5 Input Validation | No | No user input is accepted by any Phase 9 component |
| V6 Cryptography | No | N/A |

No known threat patterns apply beyond standard static-site hygiene already covered elsewhere in the project (e.g. `rel="noopener noreferrer"` on external links, already handled generically in `mdx-components.tsx`'s `a` override, which the new MDX content will inherit).

## Sources

### Primary (HIGH confidence)
- `[VERIFIED: package.json]` — exact installed versions of next, react, @next/mdx, @mdx-js/react, tailwindcss, class-variance-authority, tailwindcss-animate, lucide-react, @radix-ui/react-dialog, @radix-ui/react-slot
- `[VERIFIED: next.config.mjs]` — `@next/mdx` wiring, `output: "export"`, `pageExtensions`
- `[VERIFIED: src/mdx-components.tsx]` — existing global MDX component registration pattern
- `[VERIFIED: src/features/schools/SchoolComparison/index.tsx, ComparisonTable/index.tsx, ComparisonMobile/index.tsx]` — responsive dual-render pattern
- `[VERIFIED: src/components/ui/Sheet/index.tsx, Button/index.tsx]` — Radix + cva + tailwindcss-animate composition pattern
- `[VERIFIED: src/app/globals.css]` — `guide-print`/`guide-print-hide` print CSS convention
- `[VERIFIED: e2e/smoke.spec.ts, a11y.spec.ts, metadata.spec.ts]` — existing test conventions for routes, mobile overflow, and a11y/metadata coverage lists
- `[VERIFIED: npm view @radix-ui/react-collapsible version]` — confirmed `1.1.16` available on npm registry, 2026-07-12
- `[CITED: nextjs.org/docs/app/guides/mdx]` — global `mdx-components.tsx` component injection behavior (components available in every `.mdx` file without per-file import)
- `[CITED: radix-ui.com/primitives/docs/components/collapsible]` — Collapsible API (`Root`/`Trigger`/`Content`, `data-state`, `aria-expanded`/`aria-controls` auto-management, CSS variables for height animation)

### Secondary (MEDIUM confidence)
- WebSearch synthesis of Next.js MDX docs and a third-party Next.js+MDX tutorial (alexchantastic.com), cross-verified against this repo's own already-working `mdx-components.tsx` — confirms the mechanism this repo already relies on, not a new claim.

### Tertiary (LOW confidence)
- None used as a basis for recommendations in this document.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every core library is already installed and verified in `package.json`; the one new dependency's version was verified live against the npm registry.
- Architecture: HIGH — every pattern recommended (responsive dual-render, MDX global component registration, Radix+cva+tailwindcss-animate composition, print CSS convention, route shell shape) has a working precedent already in this exact codebase.
- Pitfalls: HIGH — derived directly from this repo's existing test/build conventions (jest.config.mjs coverage exclusions, e2e overflow-check pattern, MDX build-time failure mode) rather than generic external knowledge.

**Research date:** 2026-07-12
**Valid until:** 30 days (stable stack, no fast-moving dependencies; re-verify `@radix-ui/react-collapsible` version if planning is delayed significantly past this window)

---

## RESEARCH COMPLETE

**Phase:** 9 - Onboarding Guide Visual Foundation
**Confidence:** HIGH

### Key Findings
- No new architectural mechanism is needed — every hard part (responsive dual-layout, accessible disclosure, MDX component injection, print styling, static route/metadata shell) already has a working precedent in this exact codebase (`ComparisonTable`/`ComparisonMobile`, `Sheet`, `mdx-components.tsx`, `guide-print` CSS, `berlin-school-system/page.tsx`).
- Phase 9 is the first phase to embed interactive React components inside `.mdx` content; this works today via the existing `useMDXComponents()` global registration in `src/mdx-components.tsx` — components become available by name in every `.mdx` file with zero per-file imports, confirmed against current Next.js App Router docs.
- The one new dependency needed is `@radix-ui/react-collapsible` (verified available at v1.1.16, version-consistent with the already-installed Radix v1.x primitives) for accessible expand/collapse on timeline nodes (D-05) and the mobile "Outras vias" disclosure (D-08).
- Existing color tokens (`bg-blue-50 text-blue-800`, `border-l-4 border-l-primary`) map cleanly onto the Berlin-callout's required "factual, not alarming" tone (D-10) — the amber/red tokens already reserved for evidence-status warnings should explicitly be avoided here.
- Recommended structure: `EducationTimeline`, `BerlinCallout`, `GlossaryTerm` as new colocated directories under `src/features/guides/`, keeping `TimelineNode` as an internal implementation detail (not a standalone reusable export) per the project's anti-premature-abstraction convention.

### File Created
`.planning/phases/09-onboarding-guide-visual-foundation/09-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | All core libraries verified in `package.json`; new dependency verified live against npm registry |
| Architecture | HIGH | Every recommended pattern has a working precedent already in this codebase |
| Pitfalls | HIGH | Derived from this repo's actual test/build/coverage configuration, not generic knowledge |

### Open Questions
1. Whether placeholder timeline data should live as a component-colocated constant (recommended for Phase 9) vs. content-adjacent structure (a Phase 10 decision, not a Phase 9 blocker).
2. Exact placeholder node set/labels for the Phase 9 demo — a copy/data decision for the plan, not a research gap.

### Ready for Planning
Research complete. Planner can now create PLAN.md files.
