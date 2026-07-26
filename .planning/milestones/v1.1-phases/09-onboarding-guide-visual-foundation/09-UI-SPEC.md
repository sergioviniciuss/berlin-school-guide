---
phase: 9
slug: onboarding-guide-visual-foundation
status: draft
shadcn_initialized: true
preset: new-york / neutral / cssVariables
created: 2026-07-12
---

# Phase 9 — UI Design Contract

> Visual and interaction contract for Onboarding Guide Visual Foundation. Generated from locked CONTEXT.md decisions D-01 through D-12 and 09-RESEARCH.md architecture patterns.

**Scope:** `EducationTimeline` (responsive branching infographic), `BerlinCallout` (inline badge + summary box), `GlossaryTerm` (shell), and the `/guides/german-education-system` route shell with `GuideIntro` + placeholder MDX. No editorial content (Phase 10), no homepage/hub promotion (Phase 11), no interactive calculators.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn/ui — reuse `Button`; compose `@radix-ui/react-collapsible` directly (no new `src/components/ui` primitive; matches this phase's single-consumer scope) |
| Preset | new-york, neutral, cssVariables `[VERIFIED: components.json, npx shadcn info]` |
| Component library | Radix primitives (`@radix-ui/react-collapsible`, new dependency, v1.1.16) + `class-variance-authority` where a card has real style variants |
| Icon library | lucide-react — `ChevronDown` (expand affordance), reuse existing `ChevronRight`/badge patterns |
| Font | Arial stack — unchanged |

**New shadcn additions:** none. `@radix-ui/react-collapsible` is installed as a plain npm dependency and composed by hand inside `TimelineNode`/the mobile disclosure — the same way `Sheet` composes `@radix-ui/react-dialog` — because there is exactly one component family consuming it in this phase; do not create a shared `src/components/ui/Collapsible` wrapper yet (AGENTS.md: no abstractions before ≥2 concrete use cases).

---

## Spacing Scale

Declared values (multiples of 4, reusing the project's existing scale — no new tokens):

| Token | Value | Usage in Phase 9 |
|-------|-------|-------------------|
| xs | 4px | Gap between stage-name/grades/ages lines inside a node card; icon-to-label gap in badges |
| sm | 8px | Padding inside compact branch-node cards (mobile "Outras vias" items); gap between fan-out branch cards on narrow desktop widths |
| md | 16px | Default gap between trunk nodes (desktop flex row) and between stepper items (mobile `<ol>`); node card internal padding (main trunk cards) |
| lg | 24px | Gap between `EducationTimeline` and the `BerlinCallout` summary box; page `px-6` (unchanged from existing guide shell) |
| xl | 32px | Vertical gap between major page sections (timeline block → prose section → glossary section) |
| 2xl | 48px | Not used in Phase 9 |
| 3xl | 64px | Not used in Phase 9 |

**Exceptions:**
- Touch targets: every interactive element (node card trigger, "Outras vias" trigger, anchor links inside expanded content) has `min-h-11` (44px), matching the existing `min-h-11` convention in `SchoolComparison`/`ComparisonMobile`.
- Connector line thickness is a visual-weight token, not a spacing token: `border-2` (2px) for main-trunk connectors, `border` (1px) for branch/tick connectors — see Component Contracts.

---

## Typography

Reuses the project's existing type scale exactly — no new sizes introduced. `Display` is inherited unchanged from `GuideIntro` (not modified this phase); the other three roles apply specifically to the new components.

| Role | Size | Weight | Line Height | Used for |
|------|------|--------|-------------|----------|
| Label | 12px (`text-xs`) | 600 (`font-semibold`) | 1.3 | Grades + age range lines inside node cards (D-03); "Em Berlim" badge text; "Outras vias" chevron-adjacent helper text |
| Body | 16px (`text-base`) | 400 (`font-normal`) | 1.5 | Expanded node summary text (D-05); `BerlinCallout` summary-box body; `GlossaryTerm` definition text; MDX prose (unchanged, inherited from `mdx-components.tsx`) |
| Heading | 20px (`text-xl`) | 600 (`font-semibold`) | 1.3 | Node stage name (D-03, always the largest element inside its own card); `GlossaryTerm` term; `BerlinCallout` summary-box eyebrow label uses `text-sm` (14px) uppercase per existing `GuideIntro` eyebrow convention — see below |
| Display | 36px (`text-4xl`) | 600 (`font-semibold`) | 1.2 | `GuideIntro` h1 — reused unchanged from Phase 7, not modified |

Two weights only: 400 (regular, body copy) and 600 (semibold, everything else — labels, headings, eyebrows). No 500/700 introduced.

**Node card internal hierarchy (D-03), concretely:**
```
Grundschule          ← Heading role, text-xl font-semibold text-neutral-950
1ª à 4ª série         ← Label role, text-xs font-semibold text-neutral-600
Idade aprox. 6–10     ← Label role, text-xs font-normal text-neutral-500
```
Stage name is visually dominant by size+weight; grades/ages stay visible at all times (never hidden, never truncated) — they use `font-semibold`/`font-normal` respectively so grades read slightly more prominent than the age range, matching "smaller but always visible — none treated as secondary metadata."

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `bg-white` / `hsl(var(--background))` (#ffffff) | Page background, node card surfaces |
| Secondary (30%) | `border-neutral-200` (#e5e7eb) borders, `bg-neutral-50` (#fafafa) for the mobile "Outras vias" trigger and `GlossaryTerm` box background | Card borders, grouped/collapsed surfaces |
| Accent (10%) | `bg-blue-50` (#eff6ff) / `text-blue-800` (#1e40af) / `text-blue-700` (#1d4ed8), plus `border-l-primary` (`hsl(221 83% 53%)` ≈ #2563eb) | Reserved **exclusively** for Berlin-specific elements: the inline "Em Berlim" badge, the "Berlin em destaque" summary box (background + left border + link), and the summary box's link to `/guides/berlin-school-system` |
| Destructive | not applicable | No destructive actions in this phase |

**Accent reserved for:** the "Em Berlim" inline badge (`BerlinCallout variant="inline"`), the "Berlin em destaque" summary box background/border/heading (`BerlinCallout variant="summary"`), and that box's outbound link to `/guides/berlin-school-system`. Nothing else in `EducationTimeline` or `GlossaryTerm` uses blue — this keeps the accent legible as "this is a Berlin difference" per D-10.

**Explicitly forbidden in this phase:** `amber-*`/`red-*` tokens. Those are reserved elsewhere in the codebase for evidence-status warnings (`StatusBadge`: `not_confirmed` = amber, `conflicting` = red) — reusing them for Berlin callouts would visually imply "something is wrong," violating D-10's neutral/factual tone.

**No track-hierarchy color coding (D-07 compliance):** `EducationTimeline` node cards use **one uniform card style** — `bg-white border border-neutral-200` — for every stage and every branch track (Gymnasium, Realschule, Hauptschule, Gesamtschule, Ausbildung-direto, and the shared trunk). No node gets `border-l-primary` or any other accent treatment based on being a "main"/"featured" track. Visual distinction between trunk and branches comes only from **layout position** (trunk = single column; branches = fanned-out row / grouped disclosure), never from color or border weight. This is a locked decision, not an open question — it directly satisfies "do not imply Gymnasium is the only path."

---

## Copywriting Contract

All visible copy in Brazilian Portuguese; component/prop names stay in English.

| Element | Copy |
|---------|------|
| Route eyebrow | `Berlin School Guide` (matches existing guide eyebrow pattern) |
| Route h1 | `Como funciona o sistema educacional na Alemanha` |
| Route description | `Um panorama visual da jornada escolar — do Kita à universidade — com as diferenças de Berlim destacadas ao longo do caminho.` |
| Timeline region label | `aria-label="Linha do tempo: da Educação Infantil ao Ensino Superior"` |
| Node expand affordance (implicit, via chevron) | no text label needed; chevron + `aria-expanded` communicate state — see Accessibility |
| Node "read more" link (D-05) | `Ver seção completa` |
| Secondary decision-point label (mobile stepper, before the collapsible) | `Escolha do percurso após a Grundschule` |
| Mobile "Outras vias" trigger (collapsed) | `Ver as vias do ensino secundário` |
| Mobile "Outras vias" trigger (expanded, same element, label unchanged — only chevron rotates) | `Ver as vias do ensino secundário` |
| Inline Berlin badge | `Em Berlim` + one-line note, e.g. `Em Berlim — dura 6 anos, até a 6ª série` |
| Summary box eyebrow | `Berlin em destaque` |
| Summary box link | `Ver guia completo do sistema em Berlim` |
| `GlossaryTerm` section heading (MDX, static text) | `Glossário` |
| `GlossaryTerm` placeholder note (Phase 9 demo only) | *(Definição completa na Fase 10.)* appended after each placeholder definition |
| Empty state | Not applicable — `EducationTimeline`/`BerlinCallout`/`GlossaryTerm` always render with props; there is no "no data" state in Phase 9 (static placeholder data ships with the component) |
| Error state | Not applicable — no data fetching, no forms, no user input anywhere in this phase |
| Destructive confirmation | Not applicable — no destructive actions in this phase |

**Editorial tone check (docs/EDITORIAL_GUIDE.md):** all placeholder copy above is practical/neutral, uses no ranking language ("melhor", "recomendado"), and lists tracks in the fixed canonical order Gymnasium → Realschule → Hauptschule → Gesamtschule → Ausbildung purely for consistent placeholder ordering, not to imply preference — the plan/executor should keep this order stable but must not add any visual or copy cue suggesting one track is preferred.

---

## Component Contracts

### `EducationTimeline`

**Purpose:** VIS-01 + VIS-02 — communicate the full Kita→Uni journey at a glance, with branching decision points integrated into the same visual (D-01, D-02, D-06).

**Public props:**
```typescript
type TimelineStage = {
  id: string;
  name: string;            // "Grundschule"
  grades: string;          // "1ª à 4ª série"
  ageRange: string;         // "Idade aprox. 6–10"
  summary: string;          // 2–3 sentences, teaser shown on expand (D-05)
  anchorHref?: string;      // optional on-page section link
  berlinNote?: string;      // if present, renders inline "Em Berlim" badge (D-09)
  branches?: TimelineStage[]; // secondary/vocational tracks fanning from this node (D-06, D-07)
};

type EducationTimelineProps = {
  trunk: TimelineStage[];    // shared path: Kita → Grundschule → …
  convergence: TimelineStage; // node all branches feed back into (e.g. higher ed / job market)
};
```
`TimelineNode` stays an internal, non-exported implementation detail (AGENTS.md: no premature reusable primitives).

**Structure — two full render trees, toggled by Tailwind responsive classes only (Pattern 2, no `matchMedia`):**

```tsx
<div className="hidden lg:block"><EducationTimelineDesktop trunk={trunk} convergence={convergence} /></div>
<div className="lg:hidden"><EducationTimelineMobile trunk={trunk} convergence={convergence} /></div>
```

**Desktop layout (`EducationTimelineDesktop`):**
- Outer landmark: `<div role="region" aria-label="Linha do tempo: da Educação Infantil ao Ensino Superior">`.
- Trunk (Kita → Grundschule) renders as an `<ol className="flex items-stretch gap-4">`, each `<li>` a `TimelineNode`, separated by a horizontal connector (`<span aria-hidden className="mx-2 h-0 flex-1 self-center border-t-2 border-neutral-300" />` between trunk siblings only).
- After the last trunk node, render the branch fan-out: a horizontal divider (`border-t-2 border-neutral-300`) spanning the fan-out width, with short vertical tick connectors (`border-l border-neutral-300`, `h-4`, `1px`) dropping to each branch node.
- Branch tracks render as `<ul className="flex flex-wrap justify-center gap-3">` (unordered — no ranking, D-07), each `<li>` a `TimelineNode` sized `min-w-[104px] max-w-[144px]` so all five tracks (Gymnasium, Realschule, Hauptschule, Gesamtschule, Ausbildung-direto) fit and wrap within the existing `max-w-3xl` guide container without horizontal overflow.
- Convergence: mirrored tick connectors merge upward into the single `convergence` node, rendered as the final `TimelineNode` in the trunk `<ol>` (visually closes the loop).
- **Container width decision:** the whole `EducationTimeline` stays inside the existing `max-w-3xl` page shell — no new wide-container pattern is introduced in Phase 9. Branch cards are sized compactly (see above) specifically to fit five tracks in that width. This keeps `page.tsx` identical to the proven `berlin-school-system/page.tsx` shell (D-11).

**Mobile layout (`EducationTimelineMobile`) — vertical stepper:**
- `<ol className="ml-1 space-y-3 border-l-2 border-neutral-200 pl-5">`, each trunk `<li>` a `TimelineNode` with a small step dot (`before:absolute before:-left-[calc(1.25rem+1px)] before:top-3 before:size-2 before:rounded-full before:bg-neutral-300`).
- **Resolving the D-07/D-08 tension explicitly:** the "main path shown fully" (D-08) is the shared trunk (Kita → Grundschule) plus the `convergence` node — *not* any single secondary track. Immediately after Grundschule in the stepper, render a plain-text decision-point label (`Escolha do percurso após a Grundschule`, no card, no accent) followed by **one** collapsible trigger item (`Ver as vias do ensino secundário`) styled like a node card with a trailing chevron. Expanding it reveals all five branch tracks as an inner `<ul>` of `TimelineNode`s with identical styling to each other — none pre-selected or shown by default. This guarantees no track (including Gymnasium) gets default visibility over the others on mobile, which is the stronger, non-negotiable constraint (D-07) relative to D-08's scannability goal — both are satisfied: the trunk is fully visible uninterrupted, and every track is exactly one tap away with equal weight.
- After the branch disclosure (open or closed), the stepper continues with the `convergence` node.

**`TimelineNode` (internal) — anatomy, states, interaction:**
- Markup: `<Collapsible.Root>` wrapping a card (`rounded-lg border border-neutral-200 bg-white p-3 lg:p-4`).
- `Collapsible.Trigger` = the whole card header, `min-h-11 w-full flex items-start justify-between gap-2 text-left`, containing the stage-name/grades/ages stack (Typography hierarchy above) plus a `ChevronDown` icon (`size-4 text-neutral-500 transition-transform data-[state=open]:rotate-180`).
- If `berlinNote` is present, render `BerlinCallout variant="inline"` immediately below the ages line, inside the trigger (still part of the always-visible card face, not hidden behind expand — D-09 requires the badge visible on the node itself).
- `Collapsible.Content` = `mt-2 border-t border-neutral-100 pt-2 text-base leading-6 text-neutral-700` containing `summary` text (2–3 sentences max, enforced by placeholder copy, not by component logic) and, if `anchorHref` is set, the `Ver seção completa` link (`font-medium text-blue-700 underline`) below it.
- States: default (closed) → hover (desktop pointer only) adds `hover:border-neutral-300`; focus-visible adds `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` on the trigger; expanded (`data-state="open"`) rotates the chevron and reveals `Collapsible.Content` — no color change on expand (avoids implying "active = better").
- Print (Pitfall 4 resolved): add a `guide-print-expand` marker class to every `Collapsible.Content`; in `globals.css`'s existing `@media print` block, force `.guide-print-expand { display: block !important; height: auto !important; }` and hide the chevron icon via `.guide-print-hide` on the `ChevronDown`. Printed guides show every node's teaser expanded — the point of a printable takeaway (per Pitfall 4 guidance) — while the on-screen default stays collapsed.

### `BerlinCallout`

**Purpose:** VIS-03 — Berlin differences visually distinct, factual, non-alarming (D-09, D-10).

**Public props:**
```typescript
type BerlinCalloutProps =
  | { variant: "inline"; note: string }
  | { variant: "summary"; children: ReactNode };
```

**`variant="inline"`:** `<span className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-800">Em Berlim<span className="font-normal text-blue-700">— {note}</span></span>`. Rendered inside/below a `TimelineNode`'s always-visible card face, never inside the collapsed `Collapsible.Content`.

**`variant="summary"`:** `<aside aria-labelledby="berlin-em-destaque-heading" className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-blue-50/40 p-5">`, containing a `text-sm font-semibold uppercase tracking-wide text-blue-800` eyebrow (`Berlin em destaque`, `id="berlin-em-destaque-heading"`), body content (`children`, Body role — 16px/400/1.5), and a closing link (`Ver guia completo do sistema em Berlim`, `text-blue-700 underline font-medium`, `href="/guides/berlin-school-system"`, `min-h-11` tap target). Rendered once, below the timeline, grouping all Berlin differences mentioned inline (D-09).

**Tone check (D-10):** no icon implying warning (no `AlertTriangle`); border-left accent uses `border-l-primary` (blue), matching the "featured" visual language already used for neutral/positive emphasis elsewhere (`GuidesHub`, `HomeJourneyCards`) — never the amber/red evidence-warning tokens.

### `GlossaryTerm`

**Purpose:** D-12 — styled term + definition shell, placeholder terms in Phase 9, full editorial/glossary linking is Phase 10.

**Public props:**
```typescript
type GlossaryTermProps = {
  term: string;        // "Ganztag"
  children: ReactNode; // definition body (MDX children)
};
```

**Structure:** no interactivity in Phase 9 — stays a server component.
```tsx
<dl className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
  <dt className="text-xl font-semibold text-neutral-950">{term}</dt>
  <dd className="mt-1 text-base leading-7 text-neutral-700">{children}</dd>
</dl>
```
Multiple `GlossaryTerm` instances render as adjacent `<dl>` blocks (valid HTML; Phase 10 may later wrap them in a single `<dl>` with cross-links — out of scope here). `dd` margin is explicitly reset (`mt-1`, no default browser indent) to match the card's padding rhythm.

---

## Layout Specifications

### Route (`/guides/german-education-system`)

Mirrors `berlin-school-system/page.tsx` exactly — no new page-shell pattern:

```
<main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
  <GuideIntro eyebrow="Berlin School Guide"
              title="Como funciona o sistema educacional na Alemanha"
              description="Um panorama visual da jornada escolar — do Kita à universidade — com as diferenças de Berlim destacadas ao longo do caminho." />
  <GermanEducationSystemGuide />  {/* compiled MDX: EducationTimeline, heading stubs, BerlinCallout summary, GlossaryTerm demos */}
</main>
```

### Placeholder MDX section order (D-11)

```
<EducationTimeline ... />

## O caminho da Kita à universidade
*(Conteúdo completo chega na Fase 10 — esta seção é um placeholder.)*

<BerlinCallout variant="summary">…</BerlinCallout>

## Glossário
<GlossaryTerm term="Ganztag">…</GlossaryTerm>
<GlossaryTerm term="Hort">…</GlossaryTerm>
```
Section `h2`s use the existing `mdx-components.tsx` heading override unchanged (auto-slugified `id`, `scroll-mt-20`) — these are the anchor targets `TimelineNode`'s optional `anchorHref` points to.

### Spacing between blocks

`space-y-8` (32px) at the `<main>` level (unchanged) separates `GuideIntro` from the MDX body. Inside the MDX body, `EducationTimeline` → first `h2` uses the existing `mdx-components.tsx` `p`/`h2` margins (no override needed); `BerlinCallout variant="summary"` gets `mt-6` above it when following prose (handled by the MDX author's placement, not by the component itself, to keep it a plain block-level element usable anywhere).

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (< 1024px, `lg` breakpoint) | `EducationTimelineMobile` renders: vertical stepper, trunk fully visible, secondary/vocational tracks behind one "Outras vias" `Collapsible` (closed by default); each node card `min-h-11` tap target; no horizontal scroll — verified against the existing `document.documentElement.scrollWidth` e2e overflow-check pattern at 390px width |
| Desktop (≥ 1024px) | `EducationTimelineDesktop` renders: horizontal trunk with branch fan-out and convergence, all five tracks visible simultaneously without interaction (D-02 "at a glance"); fan-out wraps (`flex-wrap`) rather than overflowing if the viewport is exactly at the `lg` boundary |
| Both | Individual node expand/collapse (D-05) works identically on both variants — same `TimelineNode` component, just arranged differently by the two parent layouts |
| Print | All `Collapsible.Content` forced visible via `guide-print-expand` (see `TimelineNode` states); chevrons hidden via `guide-print-hide` |

---

## Accessibility

- **Landmark:** `EducationTimeline`'s outer wrapper is `role="region" aria-label="Linha do tempo: da Educação Infantil ao Ensino Superior"` so assistive tech can jump directly to it.
- **List semantics:** trunk = `<ol>` (sequential, ordered); branch tracks = `<ul>` (no order/ranking among tracks — reinforces D-07 at the semantic level, not just visually).
- **Disclosure a11y:** every `Collapsible.Trigger` (node cards, "Outras vias") gets Radix's automatic `aria-expanded`/`aria-controls`/keyboard (Space/Enter) handling for free — no hand-rolled ARIA (per 09-RESEARCH.md "Don't Hand-Roll").
- **Focus:** all triggers and links use `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`, matching the existing `SheetClose` focus-ring convention.
- **Touch targets:** every trigger/link is `min-h-11` (44px), matching `ComparisonMobile`/`SchoolComparison` conventions.
- **Color contrast:** `text-blue-800`/`bg-blue-50` and `text-neutral-700`/`bg-white` combinations reuse pairs already in production elsewhere in the app (`SourcesSection`, `StatusBadge`), so contrast is already proven acceptable.
- **Heading structure:** node stage names are **not** rendered as `<h*>` elements (they are visual card headings, not document-outline headings) — this avoids polluting the page's heading hierarchy with placeholder/interactive card labels; the real document headings are the MDX `h2`s (`O caminho da Kita à universidade`, `Glossário`), consistent with existing guide pages. `GlossaryTerm`'s `dt` is likewise not an `<h*>` for the same reason (Phase 10 may revisit if glossary needs independent heading navigation).
- **Berlin badge:** the inline badge text itself (`Em Berlim`) is real text content (not an icon-only or color-only signal), so it's conveyed to screen readers and to users with color-vision deficiency without relying on the blue accent alone.
- **No horizontal overflow:** verified via the existing e2e pattern (`document.documentElement.scrollWidth > document.documentElement.clientWidth` at 390px) — flagged in 09-RESEARCH.md as a Wave 0 test gap to add to `e2e/smoke.spec.ts` or a new spec file.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|--------------|
| shadcn official | none new (reuse existing `Button`) | not required |
| npm (non-registry) | `@radix-ui/react-collapsible@1.1.16` | not a shadcn registry block — a plain, directly-imported Radix primitive (same trust tier as the already-installed `@radix-ui/react-dialog` used by `Sheet`); no `shadcn add`/third-party registry involved, so the registry vetting gate does not apply |

No third-party shadcn registries are declared or used in this phase.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
