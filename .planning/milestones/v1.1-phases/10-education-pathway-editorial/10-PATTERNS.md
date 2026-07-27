# Phase 10: Education Pathway Editorial - Pattern Map

**Mapped:** 2026-07-24
**Files analyzed:** 7
**Analogs found:** 7 / 7

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/content/guides/german-education-system.mdx` | content | transform (static MDX) | `src/content/guides/berlin-school-system.mdx` + current placeholder MDX | exact (editorial) / exact (component shell) |
| `src/features/guides/EducationTimeline/constants.ts` | config | transform | same file (Phase 9 stubs) + `types.ts` / `TimelineNode.tsx` | exact |
| `src/features/guides/GlossaryTerm/index.tsx` | component | request-response (SSG render) | same file + `mdx-components.tsx` h2 `id` pattern | role-match (id pattern) |
| `src/features/guides/GlossaryTerm/index.test.tsx` | test | request-response | same file (extend) | exact |
| `src/features/guides/EducationTimeline/fixtures.ts` | config / test fixture | transform | same file (placeholder `anchorHref`) | exact |
| `e2e/onboarding.spec.ts` | test | request-response | same file — keep green; no expansion | exact |
| `src/mdx-components.tsx` | config (optional) | transform | same file h2 mapping — **only if** per-H3 anchors chosen | role-match |

**Keep unchanged (integration contract):** `src/app/guides/german-education-system/page.tsx`, `BerlinCallout`, `EducationTimeline` UI, `mdxUtils/slugifyHeading`.

## Pattern Assignments

### `src/content/guides/german-education-system.mdx` (content, transform)

**Analog (structure + components):** current `src/content/guides/german-education-system.mdx`  
**Analog (editorial “O que verificar” / Em Berlim / links):** `src/content/guides/berlin-school-system.mdx`

**Core shell pattern** (lines 1–29 of current placeholder — keep timeline-first, GuideIntro H1 outside MDX, GlossaryTerm in Glossário):

```mdx
<EducationTimeline />

## Antes da escola
…

## Glossário

<GlossaryTerm term="Ganztag">…</GlossaryTerm>
```

**Do not duplicate H1** — page already renders title via `GuideIntro` (`page.tsx` lines 15–19):

```tsx
<GuideIntro
  eyebrow="Berlin School Guide"
  title="Como funciona o sistema educacional na Alemanha"
  description="Um panorama visual da jornada escolar — do Kita à universidade — com as diferenças de Berlim destacadas ao longo do caminho."
/>
```

**“O que verificar” pattern** (`berlin-school-system.mdx` lines 7–11) — reuse plain MDX at exactly three D-06 moments; Kita/Grundschule stay lighter:

```mdx
**O que verificar:**

- Se o endereço da família já está registrado em Berlim (Anmeldung) — isso define o Bezirk e, em muitos casos, a área de matrícula.
- Quais Grundschulen aparecem no diretório do Senado para o seu bairro.
- Se a escola oferece apoio para crianças que ainda não falam alemão fluentemente (por exemplo, **Willkommensklasse**).
```

**Optional next-step links** (`berlin-school-system.mdx` lines 26, 73–76; `first-steps.mdx` lines 3–4) — max 1–2 per verify block:

```mdx
No futuro, planejamos um guia dedicado só ao processo de matrícula passo a passo. Por enquanto, use este panorama junto com a [checklist de primeiros passos](/guides/first-steps).
```

```mdx
1. Explore o [diretório de escolas](/schools) — filtre por bairro, Ganztag, Willkommensklasse e outros critérios.
```

UI-SPEC preferred labels: `Primeiros passos` → `/guides/first-steps`; `Sistema escolar em Berlim` → `/guides/berlin-school-system`; `Ver escolas` → `/schools`.

**Inline Berlin prose** (`berlin-school-system.mdx` lines 3–4) — prefer sentence form in body; do **not** put `BerlinCallout variant="inline"` in MDX paragraphs:

```mdx
A **Grundschule** é a escola primária. **Em Berlim, dura seis anos (1ª à 6ª série; crianças por volta dos 6 a 12 anos)** — diferente dos quatro anos comuns em muitos outros estados alemães.
```

**First-use gloss** (same file line 3) — short Portuguese gloss on first German term mention:

```mdx
A **Grundschule** é a escola primária.
```

**Berlin summary callout** (current german-education-system.mdx lines 11–15 + component) — exactly one:

```mdx
<BerlinCallout variant="summary">
  Em Berlim, a Grundschule dura seis anos (1ª à 6ª série) em vez dos quatro
  anos comuns em outros estados alemães — por isso a escolha de percurso
  secundário acontece depois, por volta dos 12 anos.
</BerlinCallout>
```

**Bottom glossary with GlossaryTerm** (current placeholder lines 17–29) — prefer `<GlossaryTerm>` over berlin-school-system’s markdown list (`## Glossário` lines 79–90 there). Expand D-13 term set; use German `term` strings for stable hashes.

**Locked chapter outline** (CONTEXT D-01 / UI-SPEC):

```text
<EducationTimeline />
## Antes da escola
## Ensino primário
## Depois da 6ª série          (+ verify #1)
## Os caminhos possíveis
   ### Gymnasium | ### ISS | ### Gemeinschaftsschule
   (+ brief Realschule/Hauptschule other-state context)
   (+ verify #2)
   (+ ≤1 BerlinCallout summary in transition zone)
## Formação profissional
## Ensino superior             (+ verify #3)
## Glossário
```

**Anti-patterns from analogs:** no second H1; no final “Berlim vs Alemanha” chapter; no enrollment procedure sections that duplicate berlin-school-system; no year-locked calendars.

---

### `src/features/guides/EducationTimeline/constants.ts` (config, transform)

**Analog:** same file (Phase 9 stubs) + `types.ts` + `TimelineNode.tsx` consumer

**Type contract** (`types.ts` lines 1–9):

```typescript
export type TimelineStage = {
  id: string;
  name: string;
  grades: string;
  ageRange: string;
  summary: string;
  anchorHref?: string;
  berlinNote?: string;
};
```

**Current stub to replace** (`constants.ts` lines 3–11) — remove `Fase 10` / `#o-caminho-da-kita-a-universidade`:

```typescript
const KITA: TimelineStage = {
  id: "kita",
  name: "Kita",
  grades: "Educação infantil",
  ageRange: "Idade aprox. 0–6 anos",
  summary:
    "A Kita é o primeiro contato com o sistema alemão de educação, com foco em cuidado e desenvolvimento infantil. Vagas e custos variam por Bezirk. (Conteúdo completo chega na Fase 10.)",
  anchorHref: "#o-caminho-da-kita-a-universidade",
};
```

**Target anchor map** (must match `slugifyHeading` of locked H2s):

| Node | `anchorHref` |
|------|----------------|
| Kita | `#antes-da-escola` |
| Grundschule | `#ensino-primario` (+ optional `berlinNote: "dura 6 anos, até a 6ª série"`) |
| Gymnasium / ISS / Gemeinschaftsschule | `#os-caminhos-possiveis` (shared) |
| Ausbildung | `#formacao-profissional` |
| Ensino superior | `#ensino-superior` |
| “Depois da 6ª série” | no timeline node / no anchor |

**Consumer pattern** (`TimelineNode.tsx` lines 46–65) — `berlinNote` → inline pill; `anchorHref` → “Ver seção completa”:

```tsx
{berlinNote ? (
  <span className="mt-1 block">
    <BerlinCallout variant="inline" note={berlinNote} />
  </span>
) : null}
…
{anchorHref ? (
  <a
    href={anchorHref}
    className="mt-1 inline-block min-h-11 font-medium text-blue-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  >
    Ver seção completa
  </a>
) : null}
```

**Keep equal-weight structure** (`constants.ts` lines 87–104) — do not reorder or demote `primaryBranches`; germany-wide tracks stay in collapsible:

```typescript
export const DEMO_TRUNK: TimelineStage[] = [KITA, GRUNDSCHULE];
export const DEMO_SECONDARY_DECISION: SecondaryDecisionBlock = {
  label: "Depois da Grundschule",
  primaryBranches: [GYMNASIUM, ISS, GEMEINSCHAFTSSCHULE],
  germanyWideContext: {
    triggerLabel: "Como funciona em outros estados alemães",
    tracks: [REALSCHULE, HAUPTSCHULE],
  },
};
export const DEMO_OUTCOMES: TimelineStage[] = [AUSBILDUNG, ENSINO_SUPERIOR];
```

Summaries: 2–3 sentences, no placeholder phrasing.

---

### `src/features/guides/GlossaryTerm/index.tsx` (component, request-response)

**Analog (chrome):** same file lines 1–17  
**Analog (id + scroll-mt):** `src/mdx-components.tsx` h2 mapping lines 16–27 + `slugifyHeading` from `mdxUtils`

**Current implementation** (no `id` — gap to fill):

```tsx
export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  return (
    <dl className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <dt className="text-xl font-semibold text-neutral-950">{term}</dt>
      <dd className="mt-1 text-base leading-7 text-neutral-700">
        {children}
      </dd>
    </dl>
  );
}
```

**Imports + id pattern to copy** from MDX h2 (`mdx-components.tsx` lines 6–27) and RESEARCH/UI-SPEC:

```tsx
import type { ReactNode } from "react";
import { slugifyHeading } from "@/features/guides/mdxUtils";

type GlossaryTermProps = {
  term: string;
  children: ReactNode;
};

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  return (
    <dl
      id={slugifyHeading(term)}
      className="scroll-mt-20 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
    >
      <dt className="text-xl font-semibold text-neutral-950">{term}</dt>
      <dd className="mt-1 text-base leading-7 text-neutral-700">{children}</dd>
    </dl>
  );
}
```

**Slug utility** (`mdxUtils/index.ts` lines 20–27) — reuse; do not hand-roll:

```typescript
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
```

**Validation:** `term` must be the German string (`"Ganztag"`, `"Duales Studium"`, `"Fachabitur"`) so narrative links like `[Ausbildung](#ausbildung)` resolve. Visual chrome (border, bg, type) unchanged per UI-SPEC.

**Auth/guard:** N/A (static public content).

---

### `src/features/guides/GlossaryTerm/index.test.tsx` (test, request-response)

**Analog:** same file — extend existing Testing Library patterns

**Imports + structure** (lines 1–21):

```tsx
import { render, screen } from "@testing-library/react";

import { GlossaryTerm } from ".";

describe("GlossaryTerm", () => {
  it("renders the term and definition as visible text", () => {
    render(<GlossaryTerm term="Ganztag">Definição de teste.</GlossaryTerm>);

    expect(screen.getByText("Ganztag")).toBeVisible();
    expect(screen.getByText("Definição de teste.")).toBeVisible();
  });

  it("renders a dl containing exactly one dt and one dd", () => {
    const { container } = render(
      <GlossaryTerm term="Ganztag">Definição de teste.</GlossaryTerm>,
    );

    expect(container.querySelector("dl > dt")).not.toBeNull();
    expect(container.querySelector("dl > dd")).not.toBeNull();
  });
});
```

**Add assertions** (Wave 0 / ONBD-05):

```tsx
it("sets id from slugifyHeading(term) for deep links", () => {
  const { container } = render(
    <GlossaryTerm term="Duales Studium">Definição.</GlossaryTerm>,
  );
  expect(container.querySelector("#duales-studium")).not.toBeNull();
  expect(document.getElementById("duales-studium")).not.toBeNull();
});

it("adds scroll-mt-20 on the root dl", () => {
  const { container } = render(
    <GlossaryTerm term="Ganztag">Definição.</GlossaryTerm>,
  );
  expect(container.querySelector("dl")?.className).toContain("scroll-mt-20");
});
```

Keep existing multi-instance test; with real ids, terms must remain unique (already true for D-13 set).

---

### `src/features/guides/EducationTimeline/fixtures.ts` (config / test fixture, transform)

**Analog:** same file — sync placeholder hash if tests assert `href`

**Current stub** (lines 11–18):

```typescript
export const grundschuleFixture: TimelineStage = {
  id: "grundschule",
  name: "Grundschule",
  grades: "1ª à 6ª série",
  ageRange: "Idade aproximada: 6–12 anos",
  summary: "Resumo sintético de teste para a Grundschule.",
  anchorHref: "#o-caminho-da-kita-a-universidade",
};
```

Update `anchorHref` to a real Phase 10 hash (e.g. `#ensino-primario`) so fixtures do not reintroduce the placeholder. Fixture summaries may stay synthetic (“Resumo sintético…”).

---

### `e2e/onboarding.spec.ts` (test, request-response)

**Analog:** same file — regression contract only; do **not** expand to homepage→guide (Phase 11)

**Locked selectors** (lines 3–17) — keep H1 and region label unchanged:

```typescript
test("opens the German education system guide with the visual timeline", async ({
  page,
}) => {
  await page.goto("/guides/german-education-system");
  await expect(
    page.getByRole("heading", {
      name: "Como funciona o sistema educacional na Alemanha",
      level: 1,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", {
      name: "Linha do tempo: da Educação Infantil ao Ensino Superior",
    }).first(),
  ).toBeVisible();
});
```

Only touch this file if Phase 10 content accidentally breaks these assertions; optional content H2 assertions are Phase 11.

---

### `src/mdx-components.tsx` (config, optional — default: do not modify)

**Analog:** same file h2 id mapping

**Default Phase 10 choice:** shared `#os-caminhos-possiveis` for secondary timeline nodes — **no h3 ids**.

**If UAT later requires per-track anchors**, copy h2 pattern onto h3 (lines 16–30 currently):

```tsx
h2: ({ children }) => {
  const text = getTextContent(children);
  const id = slugifyHeading(text);
  return (
    <h2 id={id} className="mt-10 scroll-mt-20 text-2xl font-semibold text-neutral-950 first:mt-0">
      {children}
    </h2>
  );
},
h3: ({ children }) => (
  <h3 className="mt-6 text-lg font-semibold text-neutral-950">{children}</h3>
),
```

Component registry already includes `EducationTimeline`, `BerlinCallout`, `GlossaryTerm` (lines 62–64) — no registration changes needed.

## Shared Patterns

### Heading slug / deep-link contract
**Source:** `src/features/guides/mdxUtils/index.ts` + `src/mdx-components.tsx`  
**Apply to:** MDX H2s, GlossaryTerm `id`, EducationTimeline `anchorHref`

```typescript
slugifyHeading("Antes da escola") // => "antes-da-escola"
slugifyHeading("Ensino primário") // => "ensino-primario"
slugifyHeading("Os caminhos possíveis") // => "os-caminhos-possiveis"
slugifyHeading("Formação profissional") // => "formacao-profissional"
slugifyHeading("Duales Studium") // => "duales-studium"
```

H2 and GlossaryTerm roots use `scroll-mt-20` so sticky/header offset works.

### Berlin differences (two channels)
**Source:** `BerlinCallout/index.tsx` + berlin-school-system prose  
**Apply to:** MDX body + optional timeline `berlinNote`

- Body: prose **“Em Berlim…”** (not inline pill in paragraphs)
- Exactly one `<BerlinCallout variant="summary">` — fixed eyebrow + link to `/guides/berlin-school-system` (lines 15–35 of BerlinCallout)
- Timeline: optional `berlinNote` → `BerlinCallout variant="inline"` inside `TimelineNode`

```tsx
// BerlinCallout summary — fixed outbound CTA (do not reword)
<Link
  href="/guides/berlin-school-system"
  className="mt-3 inline-block min-h-11 font-medium text-blue-700 underline …"
>
  Ver guia completo do sistema em Berlim
</Link>
```

### MDX component registration
**Source:** `src/mdx-components.tsx` lines 62–64  
**Apply to:** editorial MDX only — components already registered; no new packages

### Route shell / e2e contract
**Source:** `page.tsx` + `e2e/onboarding.spec.ts`  
**Apply to:** all Phase 10 work — do not change GuideIntro H1 text or timeline `aria-label`

### No premature verify component
**Source:** `berlin-school-system.mdx` + AGENTS.md  
**Apply to:** three “O que verificar” blocks — plain `**O que verificar:**` + ul, not a new React widget

### Error handling / auth
**N/A** — static MDX site; no API, auth, or try/catch patterns for this phase. External links (if Fontes added) already get `rel="noopener noreferrer"` via MDX `a` mapping.

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| — | — | — | All Phase 10 files have in-repo analogs; no greenfield patterns |

## Metadata

**Analog search scope:** `src/content/guides/`, `src/features/guides/` (EducationTimeline, GlossaryTerm, BerlinCallout, mdxUtils, GuideIntro), `src/mdx-components.tsx`, `src/app/guides/german-education-system/`, `e2e/onboarding.spec.ts`  
**Files scanned:** ~15 primary + supporting (types, TimelineNode, fixtures, first-steps)  
**Pattern extraction date:** 2026-07-24
