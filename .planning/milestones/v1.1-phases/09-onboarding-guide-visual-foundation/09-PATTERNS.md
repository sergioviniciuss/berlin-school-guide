# Phase 9: Onboarding Guide Visual Foundation - Pattern Map

**Mapped:** 2026-07-12
**Files analyzed:** 15 (new) + 2 (modified)
**Analogs found:** 15 / 15

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|-----------------|---------------|
| `src/features/guides/EducationTimeline/index.tsx` | component (responsive dual-render container) | transform (static props → JSX) | `src/features/schools/SchoolComparison/index.tsx` | role-match |
| `src/features/guides/EducationTimeline/EducationTimelineDesktop.tsx` | component (presentational, list layout) | transform | `src/features/schools/ComparisonTable/index.tsx` | role-match |
| `src/features/guides/EducationTimeline/EducationTimelineMobile.tsx` | component (presentational, stacked layout) | transform | `src/features/schools/ComparisonMobile/index.tsx` | exact |
| `src/features/guides/EducationTimeline/TimelineNode.tsx` | component (internal, interactive card) | event-driven (expand/collapse) | `src/components/ui/Sheet/index.tsx` (Radix + `data-state` composition) | role-match |
| `src/features/guides/EducationTimeline/types.ts` | types | — | `src/features/schools/school/types.ts` pattern (not read; inferred from `School` type usage in `ComparisonTable`) | role-match |
| `src/features/guides/EducationTimeline/constants.ts` | config (placeholder data) | — | `src/features/schools/SchoolProfile/constants.ts` (`PROFILE_SECTIONS`, referenced in `ComparisonTable`/`ComparisonMobile`) | role-match |
| `src/features/guides/EducationTimeline/fixtures.ts` | test fixtures | — | `src/features/evidence/fieldEvidence/fixtures.ts` | exact |
| `src/features/guides/EducationTimeline/index.test.tsx` | test | — | `src/features/schools/ComparisonMobile/index.test.tsx` | exact |
| `src/features/guides/BerlinCallout/index.tsx` | component (dual-variant presentational) | transform | `src/features/schools/SourcesSection/index.tsx` (badge + card + link composition) | role-match |
| `src/features/guides/BerlinCallout/types.ts` | types | — | discriminated-union prop types already used in `BerlinCalloutProps` spec (new pattern, no direct analog needed — plain TS) | no-analog |
| `src/features/guides/BerlinCallout/index.test.tsx` | test | — | `src/features/guides/GuidesHub/index.test.tsx` | role-match |
| `src/features/guides/GlossaryTerm/index.tsx` | component (static presentational shell) | transform | `src/features/schools/StatusBadge/index.tsx` (small static prop-driven leaf component) | role-match |
| `src/features/guides/GlossaryTerm/index.test.tsx` | test | — | `src/features/guides/GuidesHub/index.test.tsx` | role-match |
| `src/app/guides/german-education-system/page.tsx` | route (page/composition) | request-response (SSG) | `src/app/guides/berlin-school-system/page.tsx` | exact |
| `src/content/guides/german-education-system.mdx` | content (MDX) | — | `src/content/guides/berlin-school-system.mdx` | exact |
| `src/mdx-components.tsx` (MODIFIED) | config (MDX component registry) | — | itself (existing file, additive change) | exact |
| `src/app/globals.css` (MODIFIED) | config (print CSS) | — | itself (existing `@media print` block) | exact |

## Pattern Assignments

### `src/features/guides/EducationTimeline/index.tsx` (component, transform)

**Analog:** `src/features/schools/SchoolComparison/index.tsx`

**Responsive dual-render pattern** (lines 77-90 of `SchoolComparison/index.tsx`):
```tsx
<div className="hidden lg:block">
  <ComparisonTable
    schools={schools}
    selectedSlugs={slugs}
    showDifferencesOnly={showDifferencesOnly}
  />
</div>
<div className="lg:hidden">
  <ComparisonMobile
    schools={schools}
    selectedSlugs={slugs}
    showDifferencesOnly={showDifferencesOnly}
  />
</div>
```
Apply directly to `EducationTimeline`: it stays a plain server component (no `"use client"` needed at this level — per RESEARCH.md Pitfall 2, only `TimelineNode` needs the client boundary), rendering both `EducationTimelineDesktop` and `EducationTimelineMobile` with the same `trunk`/`convergence` props, toggled purely by Tailwind classes (no `matchMedia`).

**Prop shape convention** — pass the same data down to both variants unchanged, exactly as `SchoolComparison` passes `schools`/`selectedSlugs`/`showDifferencesOnly` to both `ComparisonTable` and `ComparisonMobile` without transformation.

---

### `src/features/guides/EducationTimeline/EducationTimelineDesktop.tsx` (component, transform)

**Analog:** `src/features/schools/ComparisonTable/index.tsx`

**Landmark + semantic list pattern** (lines 29-34):
```tsx
<div className="overflow-x-auto rounded-lg border border-neutral-200">
  <table
    aria-label="Comparação de critérios"
    className="min-w-full border-collapse text-sm"
  >
```
Adapt to UI-SPEC's `role="region" aria-label="Linha do tempo: ..."` wrapper around an `<ol className="flex items-stretch gap-4">` trunk instead of a `<table>` — same "labelled landmark wrapping a semantic list" shape.

**Iterating a fixed section/field list into cards** (lines 81-129, `PROFILE_SECTIONS.map(...)`): mirrors how `EducationTimelineDesktop` should `trunk.map(...)` into `<li><TimelineNode .../></li>` and `stage.branches?.map(...)` into the fan-out `<ul>`. Use the same `key={...}` + conditional-render-null-when-empty idiom (`if (visibleFields.length === 0) return null;`) for "no branches on this node" cases.

**Connector between siblings** — no direct analog exists (`ComparisonTable` has no connector lines); build per UI-SPEC's own concrete spec (`border-t-2 border-neutral-300` between trunk siblings, `border-l` tick connectors to branches) — this is new visual code, not copied from an existing component.

---

### `src/features/guides/EducationTimeline/EducationTimelineMobile.tsx` (component, transform)

**Analog:** `src/features/schools/ComparisonMobile/index.tsx`

**Labelled stacked-list wrapper** (lines 25-26):
```tsx
<div aria-label="Comparação móvel de critérios" className="space-y-6">
  <div className="space-y-3">
```
Directly reusable shape for the mobile stepper: swap the outer `aria-label` for `role="region" aria-label="Linha do tempo: ..."` (per UI-SPEC), and swap `space-y-3` list of school cards for the `<ol className="ml-1 space-y-3 border-l-2 border-neutral-200 pl-5">` stepper of `TimelineNode`s.

**Section-by-section rendering with heading + null-guard** (lines 54-64):
```tsx
{PROFILE_SECTIONS.map((section) => {
  const visibleFields = filterComparisonFieldPaths(...);
  if (visibleFields.length === 0) {
    return null;
  }
  return (
    <section key={section.key} aria-labelledby={`comparison-mobile-${section.key}`} className="space-y-4">
      <h2 id={`comparison-mobile-${section.key}`} className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
        {section.heading}
      </h2>
      ...
```
Use this exact `aria-labelledby` + generated-`id` idiom for the mobile "Escolha do percurso após a Grundschule" decision-point label preceding the single "Outras vias" `Collapsible`.

---

### `src/features/guides/EducationTimeline/TimelineNode.tsx` (component, event-driven)

**Analog:** `src/components/ui/Sheet/index.tsx` (Radix primitive + `cva`/`data-state` composition — the only existing Radix-driven interactive component in the repo)

**Imports pattern** (lines 1-13):
```tsx
"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";

import { cn } from "@/components/ui/utils";
```
For `TimelineNode`, this becomes:
```tsx
"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
```
(No `forwardRef`/`cva` needed — `TimelineNode` is a simple internal function component per RESEARCH.md Pattern 3, not a forwarded-ref primitive like `Sheet`; UI-SPEC's own Pattern 3 code example in `09-RESEARCH.md` lines 251-283 is the authoritative, already-repo-conventioned implementation to follow directly.)

**`data-state`-driven styling convention** (lines 28-35, 42-49 of `Sheet/index.tsx`):
```tsx
className={cn(
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  className,
)}
```
Apply the same `data-[state=open]:...` attribute-selector idiom for the chevron rotation (`data-[state=open]:rotate-180`, already spelled out in UI-SPEC) and for the `guide-print-expand` print override — this is the established way this codebase drives CSS off Radix state, not a new pattern.

**Focus-ring convention** (`SheetClose`, line 72):
```tsx
className="... focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ..."
```
UI-SPEC specifies `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` for `TimelineNode`'s trigger and links — same token (`ring-ring`), `focus-visible` variant preferred per UI-SPEC's Accessibility section (matches the `SheetClose` convention's *tokens*, using the more modern `:focus-visible` pseudo-class).

**Chevron icon reuse:** `ChevronRight` is used in `src/features/schools/SchoolCard/index.tsx` (line 147, `<ChevronRight className="size-4" aria-hidden />`) as the established "icon-hidden-from-AT, decorative" idiom (`aria-hidden` on a `lucide-react` icon component) — copy this exact `aria-hidden` treatment for `ChevronDown` in `TimelineNode`.

---

### `src/features/guides/EducationTimeline/types.ts` (types)

**No direct analog file was read** (school domain types live in `src/features/schools/school/` per import paths seen in `ComparisonTable`, e.g. `import type { School } from "@/features/schools/school"`), but the **shape convention** is already fully specified in `09-UI-SPEC.md` (lines 128-143):
```typescript
type TimelineStage = {
  id: string;
  name: string;
  grades: string;
  ageRange: string;
  summary: string;
  anchorHref?: string;
  berlinNote?: string;
  branches?: TimelineStage[];
};

type EducationTimelineProps = {
  trunk: TimelineStage[];
  convergence: TimelineStage;
};
```
Follow the codebase's general types.ts convention (colocated `type` exports, no `interface`, no default export) as seen implicitly via `FieldStatus`/`FieldEvidence` types in `src/features/evidence/fieldEvidence` (referenced by `StatusBadge`).

---

### `src/features/guides/EducationTimeline/constants.ts` (config)

**Analog:** `src/features/schools/SchoolProfile/constants.ts` (`PROFILE_SECTIONS`, consumed by both `ComparisonTable` and `ComparisonMobile` as a single shared, colocated data source — same "one constants file feeds both desktop and mobile render paths" shape needed here for the placeholder `TimelineStage[]` demo data).

Per RESEARCH.md Open Question #1: keep placeholder stage/branch data as a typed constant (`export const DEMO_TRUNK: TimelineStage[] = [...]`, `export const DEMO_CONVERGENCE: TimelineStage = {...}`) colocated with the component, matching this precedent rather than moving data into `src/content/`.

---

### `src/features/guides/EducationTimeline/fixtures.ts` (test fixtures)

**Analog:** `src/features/evidence/fieldEvidence/fixtures.ts`

**Full file** (25 lines — shown in full as the pattern to copy):
```typescript
import type { FieldEvidence, FieldValue } from ".";

export const verifiedEvidence: FieldEvidence = {
  status: "verified",
  citations: [{ sourceId: "berlin-directory" }],
  lastChecked: "2026-07-10",
};

export const missingEvidence: FieldEvidence = {
  status: "missing",
  citations: [],
  note: "Synthetic fixture did not find this information.",
};
```
Convention: import the colocated type from `"."` (the component's own `index.tsx`/`types.ts` barrel), export small named `const` fixtures (not factory functions) with descriptive names, comment-free, one fixture per meaningfully distinct test scenario. For `EducationTimeline/fixtures.ts`, export e.g. `singleStage: TimelineStage`, `stageWithBranches: TimelineStage`, `stageWithBerlinNote: TimelineStage`.

---

### `src/features/guides/EducationTimeline/index.test.tsx` (test)

**Analog:** `src/features/schools/ComparisonMobile/index.test.tsx`

**Structure** (full file pattern, lines 1-16 + per-`it` shape):
```tsx
import { render, screen } from "@testing-library/react";

import { ComparisonMobile } from ".";
import { ... } from "@/features/schools/school/fixtures";

describe("ComparisonMobile", () => {
  it("renders criteria-first stacked layout without a table", () => {
    render(<ComparisonMobile schools={schools} selectedSlugs={slugs} />);

    expect(screen.getByLabelText("Comparação móvel de critérios")).toBeInTheDocument();
    ...
  });
```
Apply directly: `import { EducationTimeline } from "."`, import fixtures from colocated `./fixtures`, assert both `getByRole("region", { name: "Linha do tempo: ..." })` (landmark) and query into both the desktop (`hidden lg:block` container still renders in JSDOM — no `matchMedia` mock needed, per RESEARCH.md Pitfall 1) and mobile subtrees in the same render, exactly as `ComparisonMobile`'s tests query rendered DOM without viewport mocking.

**Interaction-testing idiom** — for expand/collapse assertions, follow `ComparisonMobile`'s "does not permanently expand" test shape (lines 86-101): render, assert collapsed text is `queryByText(...).not.toBeInTheDocument()`, then (new, via `userEvent.click`) assert it becomes visible — this file doesn't show a click yet, but is the closest "hidden-until-interacted" assertion precedent in the repo; combine with Radix's own testing idiom (`getByRole("button", { expanded: false })` → click → `expanded: true`) per RESEARCH.md's `aria-expanded` test guidance.

---

### `src/features/guides/BerlinCallout/index.tsx` (component, transform)

**Analog:** `src/features/schools/SourcesSection/index.tsx`

**Badge + card composition using the exact accent tokens this phase reuses** (line 50):
```tsx
<span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-800">
  {group.label}
</span>
```
This is the closest existing precedent for `BerlinCallout`'s `variant="inline"` badge (`bg-blue-50`/`text-blue-800`), already proven in production — confirms UI-SPEC's color choice is not a new token, just a reused one.

**Card-with-link composition** (lines 45-49, 70-78 — `<article>` card containing a badge, body text, and a trailing external link with icon):
```tsx
<article ... className="rounded-lg border border-neutral-200 bg-white p-4 space-y-2">
  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-800">
    {group.label}
  </span>
  ...
  <a href={entry.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline">
    {entry.source.url}
    <ExternalLink className="size-3.5" aria-hidden />
  </a>
</article>
```
Adapt for `variant="summary"`: swap the plain `border-neutral-200` card for UI-SPEC's `border border-neutral-200 border-l-4 border-l-primary bg-blue-50/40 p-5` aside (see `HomeJourneyCards`/`GuidesHub` below for that exact left-accent idiom), keep the "trailing link, `text-blue-700 underline`" pattern but drop `target="_blank"`/`ExternalLink` since the summary link is an internal `<Link>`-style same-site anchor to `/guides/berlin-school-system`, not an external source.

**Border-left accent card idiom** (shared pattern, see below) — `src/features/home/HomeJourneyCards/index.tsx` line 8 and `src/features/guides/GuidesHub/index.tsx` line 15:
```tsx
<article className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
```
This is the exact `border-l-4 border-l-primary` "featured, neutral emphasis" idiom UI-SPEC cites (Component Contracts, `BerlinCallout` summary variant) as the precedent for using blue-accent-border-left for "highlighted but not alarming" — confirms D-10's tone choice already has two production precedents to point to.

**Discriminated union props (no direct analog, new but idiomatic TS):**
```typescript
type BerlinCalloutProps =
  | { variant: "inline"; note: string }
  | { variant: "summary"; children: ReactNode };
```
No existing component in this codebase uses a discriminated union prop type (`StatusBadge`, `GuideIntro`, etc. all use single flat prop objects) — this is a new but standard TypeScript pattern, already fully specified in UI-SPEC, not requiring further precedent-search.

---

### `src/features/guides/BerlinCallout/index.test.tsx` (test)

**Analog:** `src/features/guides/GuidesHub/index.test.tsx`

**Structure** (full file, 33 lines):
```tsx
import { render, screen } from "@testing-library/react";

import { GuidesHub } from ".";

describe("GuidesHub", () => {
  it("renders category headings and live guide cards only", () => {
    render(<GuidesHub />);
    expect(screen.getByRole("heading", { name: "Entenda o sistema", level: 2 })).toBeVisible();
    ...
  });

  it("links to system guide and first-steps checklist", () => {
    render(<GuidesHub />);
    expect(screen.getByRole("link", { name: "Ler guia do sistema escolar" })).toHaveAttribute("href", "/guides/berlin-school-system");
  });
});
```
For `BerlinCallout`, mirror this exact "render once per variant, assert visible text/role + `href` attribute" shape: one `describe` block, one `it` per variant (`variant="inline"` renders `Em Berlim` + note text; `variant="summary"` renders `Berlin em destaque` eyebrow, children, and a link with `href="/guides/berlin-school-system"`).

---

### `src/features/guides/GlossaryTerm/index.tsx` (component, transform)

**Analog:** `src/features/schools/StatusBadge/index.tsx`

**Full file as the "small, static, prop-driven leaf" template** (26 lines):
```tsx
import type { FieldStatus } from "@/features/evidence/fieldEvidence";
import { formatFieldStatus } from "@/features/schools/formatSchoolField";

const statusBadgeClasses: Record<FieldStatus, string> = { ... };

type StatusBadgeProps = {
  status: FieldStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-sm font-semibold ${statusBadgeClasses[status]}`}>
      {formatFieldStatus(status)}
    </span>
  );
}
```
`GlossaryTerm` follows the same shape (no client directive, flat prop type, single-purpose render, no internal state) but per UI-SPEC uses `<dl>/<dt>/<dd>` semantics instead of a `<span>`:
```tsx
type GlossaryTermProps = {
  term: string;
  children: ReactNode;
};

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  return (
    <dl className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <dt className="text-xl font-semibold text-neutral-950">{term}</dt>
      <dd className="mt-1 text-base leading-7 text-neutral-700">{children}</dd>
    </dl>
  );
}
```
(This exact JSX is already fully specified in `09-UI-SPEC.md` lines 204-209 — implement as written, this pattern entry just confirms it matches the repo's "small static leaf component" convention.)

---

### `src/features/guides/GlossaryTerm/index.test.tsx` (test)

**Analog:** `src/features/guides/GuidesHub/index.test.tsx` (see BerlinCallout test section above for the shape) — render, assert `getByText(term)` and children content are visible; assert semantic `<dl>`/`<dt>`/`<dd>` structure via `container.querySelector` or role-based queries since `dl`/`dt`/`dd` don't have dedicated ARIA roles in Testing Library's default query set.

---

### `src/app/guides/german-education-system/page.tsx` (route)

**Analog:** `src/app/guides/berlin-school-system/page.tsx`

**Full file (24 lines) — copy verbatim and adapt strings:**
```tsx
import BerlinSchoolSystemGuide from "@/content/guides/berlin-school-system.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";
import { buildPageMetadata } from "@/features/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Sistema escolar primário em Berlim",
  description:
    "Grundschule, matrícula, Einzugsgebiet, Ganztag e o que verificar antes de escolher uma escola primária em Berlim.",
  path: "/guides/berlin-school-system",
});

export default function BerlinSchoolSystemPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona a escola primária em Berlim"
        description="Um panorama prático do sistema — o que significam os termos alemães e o que vale conferir antes de visitar escolas ou iniciar a matrícula."
      />
      <BerlinSchoolSystemGuide />
    </main>
  );
}
```
UI-SPEC (lines 220-227) already gives the exact adapted version for `german-education-system` — same shell, same `max-w-3xl`, swapped copy/title/import. This is an exact 1:1 structural copy with no new architecture.

---

### `src/content/guides/german-education-system.mdx` (content)

**Analog:** `src/content/guides/berlin-school-system.mdx`

**Heading/prose/list conventions** (lines 1-24):
```mdx
## O que é uma Grundschule?

A **Grundschule** é a escola primária na Alemanha — em geral da 1ª à 4ª série...

**O que verificar:**

- Se o endereço da família já está registrado em Berlim (Anmeldung)...
```
`##` headings (auto-slugified by `mdx-components.tsx`'s `h2` override, becoming anchor targets), bold German terms on first use, bulleted "O que verificar" checklists. For Phase 9's placeholder MDX, follow UI-SPEC's exact section order (lines 229-243): `<EducationTimeline />` → `## O caminho da Kita à universidade` (placeholder italic note) → `<BerlinCallout variant="summary">` → `## Glossário` → `<GlossaryTerm>` entries — component tags interleave with the same `##` heading convention already established.

---

### `src/mdx-components.tsx` (MODIFIED, config)

**Analog:** itself — additive change to the existing file (61 lines, shown in full above under Shared Patterns).

**Exact insertion point and pattern** (per RESEARCH.md Pattern 1, matching this file's own `h1`-`strong` override style):
```typescript
import { EducationTimeline } from "@/features/guides/EducationTimeline";
import { BerlinCallout } from "@/features/guides/BerlinCallout";
import { GlossaryTerm } from "@/features/guides/GlossaryTerm";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ...existing h1/h2/h3/p/ul/ol/li/a/strong overrides, unchanged...
    EducationTimeline,
    BerlinCallout,
    GlossaryTerm,
    ...components,
  };
}
```
Add the three named imports at the top (alongside the existing `getTextContent`/`slugifyHeading` import from `@/features/guides/mdxUtils`) and three new keys in the returned object, placed just before `...components` — do not touch any existing `h1`-`strong` overrides.

---

### `src/app/globals.css` (MODIFIED, config)

**Analog:** itself — additive rules inside the existing `@media print { ... }` block (lines 23-51):
```css
@media print {
  .guide-print-hide {
    display: none !important;
  }

  header,
  footer {
    display: none !important; /* (elided in read range, existing rule) */
  }

  .guide-print {
    color: #000;
  }

  .guide-print h2 {
    break-after: avoid;
    page-break-after: avoid;
  }

  .guide-print li {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .guide-print ul,
  .guide-print ol {
    margin-top: 0.5rem;
  }
}
```
Per UI-SPEC's `TimelineNode` print handling and RESEARCH.md Pitfall 4, add two new rules inside this same `@media print` block (do not create a second `@media print` block):
```css
.guide-print-expand {
  display: block !important;
  height: auto !important;
}
```
`.guide-print-hide` already exists and is reused as-is for hiding the chevron icon on print — no new class needed for that half.

## Shared Patterns

### Responsive dual-render (no `matchMedia`)
**Source:** `src/features/schools/SchoolComparison/index.tsx` lines 77-90
**Apply to:** `EducationTimeline/index.tsx` (desktop/mobile split)
```tsx
<div className="hidden lg:block">{/* desktop */}</div>
<div className="lg:hidden">{/* mobile */}</div>
```

### Radix primitive + `data-state` CSS styling (no hand-rolled ARIA)
**Source:** `src/components/ui/Sheet/index.tsx` lines 28-35, and RESEARCH.md's own worked example (Pattern 3, lines 251-283)
**Apply to:** `TimelineNode.tsx` (per-node expand/collapse), mobile "Outras vias" wrapper
```tsx
"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
```
```css
data-[state=open]:rotate-180
```

### Border-left "featured/neutral emphasis" accent card
**Source:** `src/features/home/HomeJourneyCards/index.tsx` line 8; `src/features/guides/GuidesHub/index.tsx` line 15
**Apply to:** `BerlinCallout` `variant="summary"` aside
```tsx
className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8"
```
(UI-SPEC swaps `bg-white` for `bg-blue-50/40` specifically for the Berlin summary box — the border-left + rounded-card shape is what's shared.)

### Blue badge token (`bg-blue-50`/`text-blue-800`) reserved for informational/citation-style callouts
**Source:** `src/features/schools/SourcesSection/index.tsx` line 50; `src/features/schools/SchoolCard/index.tsx` line 46 (`text-blue-700` profile badge)
**Apply to:** `BerlinCallout` `variant="inline"` badge — confirms this accent is already an established "informational, not alarming" tone in this codebase, distinct from `StatusBadge`'s amber/red warning tokens.

### `aria-hidden` decorative icon convention
**Source:** `src/features/schools/SchoolCard/index.tsx` line 147 (`<ChevronRight className="size-4" aria-hidden />`); `src/features/schools/SourcesSection/index.tsx` line 77 (`<ExternalLink className="size-3.5" aria-hidden />`)
**Apply to:** `ChevronDown` in `TimelineNode`, any other decorative icon in the new components.

### Test structure: `render` + `screen` + `describe`/`it`, fixtures imported from colocated `fixtures.ts`
**Source:** `src/features/schools/ComparisonMobile/index.test.tsx`, `src/features/guides/GuidesHub/index.test.tsx`, `src/features/evidence/fieldEvidence/fixtures.ts`
**Apply to:** all three new component test files (`EducationTimeline`, `BerlinCallout`, `GlossaryTerm`).

### Global MDX component registration (zero per-file import)
**Source:** `src/mdx-components.tsx` (full file)
**Apply to:** registering `EducationTimeline`, `BerlinCallout`, `GlossaryTerm` so `german-education-system.mdx` can use them by tag name directly.

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| Branch-fan-out connector CSS (inside `EducationTimelineDesktop.tsx`) | presentational (SVG/CSS lines) | transform | No branching-diagram or connector-line UI exists anywhere in the codebase yet — this is genuinely new visual code; build per UI-SPEC's explicit spacing/border spec (Component Contracts → `EducationTimeline` → Desktop layout), not from a codebase precedent. RESEARCH.md's own Pitfall 3 guidance (two independent CSS paths per orientation, no shared/rotated implementation) is the closest thing to a "pattern" here. |
| `BerlinCalloutProps` discriminated union | types | — | No existing component in this codebase uses a discriminated-union prop type; all current props types are flat objects. Standard TypeScript, fully specified in UI-SPEC — no search needed, just note it's a first for this repo. |

## Metadata

**Analog search scope:** `src/features/schools/` (ComparisonTable, ComparisonMobile, SchoolComparison, SchoolCard, StatusBadge, SourcesSection), `src/components/ui/Sheet`, `src/features/guides/` (GuideIntro, GuidesHub, mdxUtils), `src/features/home/HomeJourneyCards`, `src/features/evidence/fieldEvidence`, `src/app/guides/berlin-school-system/page.tsx`, `src/content/guides/berlin-school-system.mdx`, `src/mdx-components.tsx`, `src/app/globals.css`
**Files scanned:** 14 read in full/targeted ranges
**Pattern extraction date:** 2026-07-12

---

## PATTERN MAPPING COMPLETE

**Phase:** 9 - Onboarding Guide Visual Foundation
**Files classified:** 17 (15 new + 2 modified)
**Analogs found:** 15 / 17 (2 explicitly flagged as no-analog: connector CSS, discriminated-union prop type)

### Coverage
- Files with exact analog: 6 (`EducationTimelineMobile`, `fixtures.ts`, `index.test.tsx` for EducationTimeline, route `page.tsx`, `.mdx` content, `mdx-components.tsx` modification)
- Files with role-match analog: 9 (`EducationTimeline/index.tsx`, `EducationTimelineDesktop`, `TimelineNode`, `types.ts`, `constants.ts`, `BerlinCallout` + its test, `GlossaryTerm` + its test)
- Files with no analog: 2 (branch connector CSS, discriminated-union prop shape)

### Key Patterns Identified
- Every responsive/interactive/registration mechanism this phase needs already has a proven precedent: `hidden lg:block`/`lg:hidden` dual-render (`SchoolComparison`), Radix + `data-state` composition (`Sheet`), global MDX component registration (`mdx-components.tsx`), and the `GuideIntro` + MDX-import route shell (`berlin-school-system/page.tsx`) — Phase 9 is pure pattern-reuse, not new infrastructure.
- The Berlin-accent color tokens (`bg-blue-50`/`text-blue-800`, `border-l-4 border-l-primary`) are already production-proven for "informational/featured, not alarming" contexts in `SourcesSection`, `SchoolCard`, `HomeJourneyCards`, and `GuidesHub` — no new token risk.
- Test files consistently follow `render` + `screen` + `describe`/`it` with fixtures imported from a colocated `fixtures.ts`, and `aria-label`/`role`-based queries over snapshot testing — apply verbatim to all three new component test files.
- The only genuinely new code in this phase is the branch fan-out connector visuals and the discriminated-union `BerlinCalloutProps` type — both are already fully specified in `09-UI-SPEC.md` with no codebase precedent needed.

### File Created
`.planning/phases/09-onboarding-guide-visual-foundation/09-PATTERNS.md`

### Ready for Planning
Pattern mapping complete. Planner can now reference analog patterns in PLAN.md files.
