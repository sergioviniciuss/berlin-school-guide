---
phase: 11
slug: flagship-discovery-release
status: draft
shadcn_initialized: true
preset: new-york / neutral / cssVariables
created: 2026-07-25
---

# Phase 11 — UI Design Contract

> Visual and interaction contract for Flagship Discovery & Release. Generated from locked CONTEXT.md decisions D-01–D-15, 11-RESEARCH.md patterns, and reuse of the Phase 9/10 visual system.

**Scope:** Restructure `HomeJourneyCards` to exactly two cards (Start here / Explore schools); reorder `GuidesHub`'s "Entenda o sistema" section to stack the onboarding flagship card above the retitled Berlin card; widen `GuideIntro.description` to `ReactNode` so both guide intros carry an inline cross-link sentence; add a "Próximos passos" MDX ordered list before Glossário; add a soft conditional tip to `first-steps.mdx`; polish Portuguese metadata. **No new components, no new design tokens, no new shadcn primitives.**

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn/ui — **reuse only** (no new `src/components/ui` additions this phase) |
| Preset | new-york, neutral, cssVariables `[VERIFIED: components.json]` |
| Component library | None new — `Button` (existing) is the only shadcn primitive touched, via existing `variant="default"`/`"outline"` |
| Icon library | lucide-react — unchanged; no new icons needed (no chevrons, no badges introduced this phase) |
| Font | Arial stack — unchanged (`globals.css` body) |

**Phase 11 additions to the design system:** none. This is a pure content-and-composition phase: card reordering, a widened prop type, and MDX prose. Building blocks stay `HomeJourneyCards`, `GuidesHub`, `GuideIntro`, `Button`, and MDX prose from `mdx-components.tsx`.

---

## Spacing Scale

Declared values (multiples of 4) — **identical to Phase 9/10**; no new tokens:

| Token | Value | Usage in Phase 11 |
|-------|-------|-------------------|
| xs | 4px | Not needed this phase |
| sm | 8px | Not needed this phase |
| md | 16px | `<div className="space-y-4">` gap between the two `HomeJourneyCards` cards (existing, unchanged); MDX list item spacing inside "Próximos passos" |
| lg | 24px | Between-card gap-equivalent already produced by `<article className="mt-4 ...">` in `GuidesHub` when stacking the flagship + Berlin cards (existing `mt-4` pattern, reused for the second card too) |
| xl | 32px | `<div className="space-y-8">` between `GuidesHub` sections (unchanged); `<main className="... space-y-8">` route-level rhythm (unchanged) |
| 2xl | 48px | Not needed this phase |
| 3xl | 64px | Not needed this phase |

**Exceptions:** none. Touch targets on `Button` (`h-10`, effectively 40px) and MDX links stay at their existing sizes — no new interactive controls are introduced.

---

## Typography

Reuses the project's existing type scale exactly — **no new sizes or weights**.

| Role | Size | Weight | Line Height | Used for |
|------|------|--------|-------------|----------|
| Body | 16px (`text-base`) | 400 | 1.5 (card bodies) / MDX prose default | `HomeJourneyCards` / `GuidesHub` card copy (`text-base leading-8 text-neutral-700`, unchanged class); `GuideIntro` description including the new inline-linked sentence; "Próximos passos" lead sentence and list items; first-steps top tip |
| Label | 14px (`text-sm`) | 600 | 1.3 | `GuideIntro` eyebrow (unchanged) |
| Heading | 20px (`text-xl`) | 600 | 1.3 | Card `h2`/`h3` titles in `HomeJourneyCards` and `GuidesHub` (unchanged classes) |
| Display | 36px (`text-4xl`) | 600 | 1.2 | `GuideIntro` H1 — reused unchanged; only the Berlin guide's H1 **text** changes (D-08 retitle), not its styling |

Two weights only: **400** (body, links) and **600** (headings, labels). No new weight introduced for the inline cross-link text — links use existing `underline` + `text-blue-700`/`font-medium` treatment (see Color), not bold.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `bg-white` / `hsl(var(--background))` (#ffffff) | Page background; card surfaces |
| Secondary (30%) | `border-neutral-200` (#e5e7eb), `bg-neutral-50` (#fafafa) | Secondary card chrome (Explore schools card, Berlin hub card, first-steps hub card) |
| Accent (10%) | `border-l-primary` (`hsl(221 83% 53%)` ≈ #2563eb) filled `Button` background; `text-blue-700 underline` for inline links | Reserved for **exactly one card per section**: the "Start here" homepage card and the onboarding flagship hub card (primary chrome), plus every inline cross-link sentence (GuideIntro complementary line, "Próximos passos" links, first-steps top tip link) |
| Destructive | not applicable | No destructive actions in this phase |

**Accent reserved for (explicit list — locked for this phase):**
1. `HomeJourneyCards` — the **"Start here" card only** (`border-l-primary` + filled `Button`), per D-04. "Explore schools" is secondary chrome (`bg-neutral-50` + `Button variant="outline"`).
2. `GuidesHub`'s "Entenda o sistema" section — the **onboarding flagship card only** (`border-l-primary` + filled `Button`), per D-07. The retitled Berlin card keeps secondary chrome (`bg-neutral-50` + `Button variant="outline"`), unchanged from today.
3. Every new inline cross-link (`text-blue-700 underline`): `GuideIntro` complementary sentences on both onboarding and Berlin pages (D-10), the three "Próximos passos" list-item links (D-13–15), and the first-steps top tip link (D-11) — matching the existing MDX `a` style already used for "Opcional:" links.

**Forbidden:** no `amber-*`/`red-*` (evidence-status tokens only, per Phase 9/10 precedent). No new accent color for the "Explore schools" or "first-steps" hub cards — they stay secondary/neutral so the accent unambiguously marks "start here."

**Card-chrome swap is the only color change this phase:** today `HomeJourneyCards`' primary chrome sits on "Explorar escolas"; Phase 11 **moves** the primary chrome (`border-l-primary` + filled `Button`) to the new "Start here" card and demotes the schools card to secondary chrome (`bg-neutral-50` + `Button variant="outline"`) — reusing the exact same two class strings already in the file, just reassigned.

---

## Copywriting Contract

All visible copy in Brazilian Portuguese; component/prop names and URL paths stay in English.

| Element | Copy |
|---------|------|
| Homepage primary CTA card title | `Comece por aqui` |
| Homepage primary CTA card body | `Entenda como funciona o sistema educacional na Alemanha antes de comparar escolas — o ponto de partida para famílias recém-chegadas.` |
| Homepage primary CTA button | `Começar pelo guia do sistema` → `/guides/german-education-system` |
| Homepage secondary card title | `Explorar escolas` (unchanged) |
| Homepage secondary card body | `Já conhece o sistema ou está comparando opções? Veja escolas primárias em Lichtenberg com status de evidência em cada informação.` |
| Homepage secondary button | `Ver escolas em Lichtenberg` → `/schools` (unchanged label) |
| Hub flagship card title | `Sistema educacional na Alemanha` |
| Hub flagship card body | `Comece aqui. Entenda como funciona o sistema educacional na Alemanha antes de escolher uma escola.` (D-06, verbatim) |
| Hub flagship button | `Ler guia do sistema educacional` → `/guides/german-education-system` (must stay distinct from the Berlin card's label below) |
| Hub Berlin card title (retitled, D-08) | `Como funciona o sistema escolar público de Berlim` |
| Hub Berlin card body | `Depois, veja como essas regras se aplicam especificamente às escolas públicas de Berlim.` (D-06, verbatim) |
| Hub Berlin button | `Ler guia do sistema escolar` → `/guides/berlin-school-system` (**unchanged** — 3 existing tests hardcode this label; do not touch) |
| Hub first-steps card body | `Quando estiver pronto para agir, siga o checklist prático.` (D-06, verbatim; title `Primeiros passos` and button `Abrir checklist` unchanged) |
| Onboarding `GuideIntro` H1 | `Como funciona o sistema educacional na Alemanha` (unchanged) |
| Onboarding `GuideIntro` description (widened to include D-10 complementary sentence) | `Um panorama visual da jornada escolar — do Kita à universidade — com as diferenças de Berlim destacadas ao longo do caminho. Depois, veja `**`Como funciona o sistema escolar público de Berlim`**` (inline link → /guides/berlin-school-system).` |
| Berlin `GuideIntro` H1 (retitled, D-08) | `Como funciona o sistema escolar público de Berlim` |
| Berlin `GuideIntro` description (widened, conditional per D-10) | `Um panorama prático do sistema — o que significam os termos alemães e o que vale conferir antes de visitar escolas ou iniciar a matrícula. Se você ainda não conhece a estrutura do sistema educacional alemão, recomendamos começar por `**`Como funciona o sistema educacional na Alemanha`**` (inline link → /guides/german-education-system).` |
| "Próximos passos" heading (new MDX `##`, before `## Glossário`) | `Próximos passos` |
| "Próximos passos" lead sentence | `Agora que você entende como funciona o sistema educacional alemão:` |
| "Próximos passos" item 1 | `**Entenda como isso funciona em Berlim** — veja as regras específicas do sistema escolar público berlinense.` + link `Como funciona o sistema escolar público de Berlim` → `/guides/berlin-school-system` |
| "Próximos passos" item 2 | `**Explore as escolas** — veja escolas primárias em Lichtenberg com status de evidência em cada informação.` + link `Ver escolas` → `/schools` |
| "Próximos passos" item 3 | `**Confira os primeiros passos** — checklist prático do zero até a visita e a matrícula.` + link `Primeiros passos` → `/guides/first-steps` |
| First-steps top conditional tip (D-11, verbatim, italic paragraph — not a callout box) | `Novo em Berlim? Se você ainda não conhece o sistema educacional alemão, recomendamos começar pelo guia `**`Como funciona o sistema educacional na Alemanha`**` (inline link → /guides/german-education-system) antes deste checklist.` |
| Onboarding page metadata title (REL-01) | `Sistema educacional alemão` (unchanged — already distinct and descriptive) |
| Berlin page metadata title (REL-01, polish for D-08 consistency) | `Sistema escolar público em Berlim` (updated from `Sistema escolar primário em Berlim` to match the H1 retitle's "sistema escolar público" framing) |
| Berlin page metadata description (REL-01, light polish) | `Grundschule, matrícula, Einzugsgebiet, Ganztag e o que verificar antes de escolher uma escola no sistema escolar público de Berlim.` |
| Empty state | Not applicable — no data fetching, no "no results" state anywhere in this phase |
| Error state | Not applicable — no forms, no user input |
| Destructive confirmation | Not applicable — no destructive actions |

**Tone locks (`docs/EDITORIAL_GUIDE.md` + D-12):** no ranking language between guides or between school-directory vs. onboarding ("melhor", "primeiro guia obrigatório"); the first-steps tip is phrased as a **soft, optional recommendation** ("recomendamos começar", not "é obrigatório ler antes"); directory (`/schools`) intro copy is explicitly **untouched** (D-12).

---

## Component Contracts (Reuse + Phase 11 Deltas)

### `HomeJourneyCards` — restructure from 3 cards to 2

**Delta:** delete the "Entender o sistema escolar" (`/guides`) and "Entender nossa metodologia" (`/methodology`) `<article>` blocks entirely (D-03 — remove, don't hide). Reassign chrome: the surviving directory card becomes secondary; a new onboarding card becomes primary.

```tsx
<div className="space-y-4">
  <article className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
    <h2 className="text-xl font-semibold">Comece por aqui</h2>
    <p className="mt-2 text-base leading-8 text-neutral-700">
      Entenda como funciona o sistema educacional na Alemanha antes de
      comparar escolas — o ponto de partida para famílias recém-chegadas.
    </p>
    <Button asChild className="mt-4">
      <Link href="/guides/german-education-system">
        Começar pelo guia do sistema
      </Link>
    </Button>
  </article>

  <article className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
    <h2 className="text-xl font-semibold">Explorar escolas</h2>
    <p className="mt-2 text-base leading-8 text-neutral-700">
      Já conhece o sistema ou está comparando opções? Veja escolas primárias
      em Lichtenberg com status de evidência em cada informação.
    </p>
    <Button asChild variant="outline" className="mt-4">
      <Link href="/schools">Ver escolas em Lichtenberg</Link>
    </Button>
  </article>
</div>
```

Card order in the DOM = visual order = tab order: onboarding card first (D-01 "default entry"), schools card second.

### `GuidesHub` — stack flagship above Berlin in "Entenda o sistema"

**Delta:** the section keeps its existing `<section aria-labelledby="guides-system-heading">` wrapper (D-05 — no new section-level structure). Add a second `<article>` for the onboarding flagship above the existing Berlin `<article>`; give the flagship the primary chrome (currently on the Berlin card) and demote Berlin to secondary chrome; retitle the Berlin card per D-08.

```tsx
<section aria-labelledby="guides-system-heading">
  <h2 id="guides-system-heading" className="text-lg font-semibold text-neutral-950">
    Entenda o sistema
  </h2>

  <article className="mt-4 rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
    <h3 className="text-xl font-semibold">Sistema educacional na Alemanha</h3>
    <p className="mt-2 text-base leading-8 text-neutral-700">
      Comece aqui. Entenda como funciona o sistema educacional na Alemanha
      antes de escolher uma escola.
    </p>
    <Button asChild className="mt-4">
      <Link href="/guides/german-education-system">
        Ler guia do sistema educacional
      </Link>
    </Button>
  </article>

  <article className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
    <h3 className="text-xl font-semibold">
      Como funciona o sistema escolar público de Berlim
    </h3>
    <p className="mt-2 text-base leading-8 text-neutral-700">
      Depois, veja como essas regras se aplicam especificamente às escolas
      públicas de Berlim.
    </p>
    <Button asChild variant="outline" className="mt-4">
      <Link href="/guides/berlin-school-system">Ler guia do sistema escolar</Link>
    </Button>
  </article>
</section>
```

The "Checklists práticas" section (first-steps card) is untouched structurally; only its body copy changes per the Copywriting Contract above.

**Label collision guard:** the flagship button label (`Ler guia do sistema educacional`) must stay textually distinct from the Berlin button label (`Ler guia do sistema escolar`) — both singular and plural forms differ by one word (`educacional` vs. `escolar`) which is sufficient for `getByRole("link", { name: ... })` exact-string matching used by existing tests.

### `GuideIntro` — widen `description` to `ReactNode`

**Delta:** the only code change to this component. Visual chrome (`space-y-3`, eyebrow/H1/description classes) is **unchanged** — only the prop type and what callers can pass changes.

```tsx
import type { ReactNode } from "react";

type GuideIntroProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
};

export function GuideIntro({ eyebrow, title, description }: GuideIntroProps) {
  return (
    <section className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-lg leading-8 text-neutral-700">{description}</p>
    </section>
  );
}
```

Caller usage (onboarding page — D-10 complementary sentence):

```tsx
<GuideIntro
  eyebrow="Berlin School Guide"
  title="Como funciona o sistema educacional na Alemanha"
  description={
    <>
      Um panorama visual da jornada escolar — do Kita à universidade — com as
      diferenças de Berlim destacadas ao longo do caminho. Depois, veja{" "}
      <Link href="/guides/berlin-school-system" className="text-blue-700 underline">
        Como funciona o sistema escolar público de Berlim
      </Link>
      .
    </>
  }
/>
```

Caller usage (Berlin page — D-08 retitle + D-10 conditional reciprocal sentence):

```tsx
<GuideIntro
  eyebrow="Berlin School Guide"
  title="Como funciona o sistema escolar público de Berlim"
  description={
    <>
      Um panorama prático do sistema — o que significam os termos alemães e o
      que vale conferir antes de visitar escolas ou iniciar a matrícula. Se
      você ainda não conhece a estrutura do sistema educacional alemão,
      recomendamos começar por{" "}
      <Link href="/guides/german-education-system" className="text-blue-700 underline">
        Como funciona o sistema educacional na Alemanha
      </Link>
      .
    </>
  }
/>
```

`first-steps/page.tsx`'s `GuideIntro` call is **unchanged** (D-11's tip lives in the MDX body, not the intro — see below), and the homepage/guides-hub `GuideIntro` calls keep plain-string descriptions (no widening needed there beyond the type change, which is backward-compatible).

### "Próximos passos" — plain MDX ordered list (no new component)

**Placement:** immediately before `## Glossário` in `src/content/guides/german-education-system.mdx` (D-13). Uses the same Markdown mechanics as the existing "O que verificar" bullet lists already in the file — a `##` heading, one lead sentence, then a numbered list with one bold micro-label + blurb + inline link per item (D-15 — explicitly not mini cards, no new component, renders as a semantic `<ol>`).

```mdx
## Próximos passos

Agora que você entende como funciona o sistema educacional alemão:

1. **Entenda como isso funciona em Berlim** — veja as regras específicas do
   sistema escolar público berlinense. [Como funciona o sistema escolar
   público de Berlim](/guides/berlin-school-system)
2. **Explore as escolas** — veja escolas primárias em Lichtenberg com status
   de evidência em cada informação. [Ver escolas](/schools)
3. **Confira os primeiros passos** — checklist prático do zero até a visita
   e a matrícula. [Primeiros passos](/guides/first-steps)

## Glossário
```

No `/compare` exit (D-14 — explicitly excluded). Exactly three items, exactly this order (Berlin → schools → first-steps), matching the existing document's `mt-10` H2 rhythm and MDX ordered-list rendering (`mdx-components.tsx`, unchanged).

### First-steps top conditional tip — plain italic paragraph (D-11)

**Placement:** as the very first line of `src/content/guides/first-steps.mdx`, **above** the existing lead paragraph ("Use esta checklist como roteiro…"). Rendered as a plain italic MDX paragraph — **no `BerlinCallout`, no border, no background** — because D-11 explicitly calls for "a small top conditional recommendation, not a prominent warning." A boxed/bordered callout here would read as an alert; italics + soft phrasing keeps it a gentle aside.

```mdx
_Novo em Berlim? Se você ainda não conhece o sistema educacional alemão,
recomendamos começar pelo guia [Como funciona o sistema educacional na
Alemanha](/guides/german-education-system) antes deste checklist._

Use esta checklist como roteiro — marque mentalmente ou imprima. Ela para
**antes** do envio detalhado de formulários de matrícula; o passo a passo
oficial varia por Bezirk e ano letivo.
```

---

## Layout Specifications

**Primary-screen focal point:** on the homepage, the "Start here" card is now the first visual element after `GuideIntro` and carries the accent border — it is the intended focal point (D-01, D-04). On `/guides`, the flagship card is the first `<article>` under "Entenda o sistema" and carries the same accent treatment.

### Homepage (`/`) — unchanged shell, 2 cards instead of 3

```
<main className="mx-auto max-w-3xl space-y-12 px-6 py-12">
  <GuideIntro … />                 {/* unchanged */}
  <HomeJourneyCards />             {/* 2 cards: Start here (primary), Explore schools (secondary) */}
  <p>…Cobertura inicial…</p>       {/* unchanged */}
</main>
```

### Guides hub (`/guides`) — unchanged shell, "Entenda o sistema" now holds 2 stacked cards

```
<main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
  <GuideIntro … />                 {/* unchanged */}
  <GuidesHub />                    {/* "Entenda o sistema": flagship + Berlin; "Checklists práticas": first-steps, unchanged */}
</main>
```

### Guide pages — unchanged shell, `description` now `ReactNode`

```
<main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
  <GuideIntro eyebrow="Berlin School Guide" title="…" description={<>…</>} />
  <GermanEducationSystemGuide /> | <BerlinSchoolSystemGuide />
</main>
```

No new route, no new page-shell pattern, no new container widths. Every layout change in this phase is content reordering or a prop-type widening inside already-established shells.

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (< `md`) | `HomeJourneyCards` and `GuidesHub` cards stack vertically (already the case — `space-y-4`/block-level `<article>`s, no flex/grid to break); card padding drops to the existing `p-5`/`p-6` mobile values (unchanged responsive classes) |
| Desktop (≥ `md`) | Card padding increases to `p-6 md:p-8` / `p-5 md:p-6` (unchanged responsive classes) — no new breakpoint behavior introduced |
| Both | "Próximos passos" ordered list and the first-steps tip are plain block-level MDX prose inside the existing `max-w-3xl` container — wrap naturally, no horizontal overflow risk (same guarantee as all other MDX prose in these files) |
| Print | First-steps page already wraps its MDX body in `guide-print space-y-6` (unchanged); the new top tip paragraph prints normally as body text — no print-specific handling needed since it carries no interactive/collapsible state |

No new responsive patterns in Phase 11 — every touched component already had correct mobile/desktop behavior; only content and chrome assignment change.

---

## Accessibility

- **Heading structure:** homepage and hub keep one H1 (`GuideIntro`) followed by card `h2`/`h3`s (unchanged levels) — removing two homepage cards removes two `h2`s but does not break the outline (no orphaned levels). The Berlin page's H1 text changes (D-08) but its semantic level does not.
- **Link name uniqueness:** the two "Entenda o sistema" hub CTAs must have distinct accessible names (`Ler guia do sistema educacional` vs. `Ler guia do sistema escolar`) so `getByRole("link", { name })` queries in existing and new tests stay unambiguous (see Component Contracts label-collision guard).
- **Inline cross-links:** every new inline link (`GuideIntro` complementary sentences, "Próximos passos" items, first-steps tip) uses real descriptive link text (the sibling guide's full title, or "Ver escolas"/"Primeiros passos") — never "clique aqui" — and reuses the existing `text-blue-700 underline` treatment already proven accessible elsewhere in the app (contrast pairs already in production per Phase 9 UI-SPEC).
- **No color-only signal:** the primary/secondary card distinction (accent border vs. neutral background) is reinforced by DOM order (flagship/start-here always first) and by copy ("Comece aqui" / distinct CTA verbs), not by color alone.
- **Focus/keyboard:** no new interactive component — `Button`/`Link` focus rings (`focus-visible:ring-2 focus-visible:ring-offset-2`, existing) are inherited unchanged.
- **Axe coverage (REL-02):** `/guides/german-education-system` must be added to `CORE_A11Y_ROUTES` (currently missing — confirmed absent by direct read of `e2e/a11y.spec.ts` during research); no new landmark or ARIA pattern is introduced that would require new axe rules.
- **Print-hidden nav:** unaffected — homepage/hub/guide changes don't touch `guide-print-hide`/`guide-print-expand` conventions.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|--------------|
| shadcn official | none new (reuse existing `Button`) | not required |
| Third-party registries | none | not applicable |

No `shadcn add`, no third-party blocks, no new npm UI packages. This phase is content/composition only.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
