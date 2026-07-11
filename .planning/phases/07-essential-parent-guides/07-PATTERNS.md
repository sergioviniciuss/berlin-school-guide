# Phase 7: Essential Parent Guides - Pattern Map

**Mapped:** 2026-07-11
**Files analyzed:** 22 new/modified files
**Analogs found:** 19 / 22

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/app/guides/page.tsx` | route | request-response (static build) | `src/app/methodology/page.tsx` + `src/app/page.tsx` | exact |
| `src/app/guides/page.test.tsx` | test | — | `src/app/methodology/page.test.tsx` | exact |
| `src/features/guides/GuidesHub/index.tsx` | component | request-response (static + Link nav) | `src/features/home/HomeJourneyCards/index.tsx` | exact |
| `src/features/guides/GuidesHub/index.test.tsx` | test | — | `src/features/home/HomeJourneyCards/index.test.tsx` | exact |
| `src/app/guides/berlin-school-system/page.tsx` | route | request-response (static build) | `src/app/methodology/page.tsx` | exact |
| `src/app/guides/berlin-school-system/page.test.tsx` | test | — | `src/app/methodology/page.test.tsx` | exact |
| `src/app/guides/first-steps/page.tsx` | route | request-response (static build) | `src/app/methodology/page.tsx` | exact |
| `src/app/guides/first-steps/page.test.tsx` | test | — | `src/app/methodology/page.test.tsx` | exact |
| `src/content/guides/berlin-school-system.mdx` | config (content) | file-I/O | `src/content/guides/methodology.mdx` | exact |
| `src/content/guides/first-steps.mdx` | config (content) | file-I/O | `src/content/guides/methodology.mdx` | partial (checklist + print) |
| `src/mdx-components.tsx` | config | transform | `src/mdx-components.tsx` (extend in place) | exact |
| `src/features/navigation/SiteHeader/constants.ts` | config | transform | same file (Phase 6 Comparar addition) | exact |
| `src/features/navigation/SiteHeader/index.tsx` | component (client) | event-driven | same file (`isActive` for `/schools/*`) | exact |
| `src/features/navigation/SiteHeader/index.test.tsx` | test | — | same file (Comparar assertions) | exact |
| `src/features/navigation/SiteFooter/index.tsx` | component (server) | request-response (static) | same file (Comparar link) | exact |
| `src/features/navigation/SiteFooter/index.test.tsx` | test | — | same file (Comparar link test) | exact |
| `src/features/home/HomeJourneyCards/index.tsx` | component | request-response (static + Link nav) | same file (Phase 3 journey cards) | exact |
| `src/features/home/HomeJourneyCards/index.test.tsx` | test | — | same file (negative `/guides` guard) | exact |
| `src/features/schools/SchoolDirectory/index.tsx` | component (client) | event-driven | same file (methodology inline link) | exact |
| `src/features/schools/SchoolDirectory/index.test.tsx` | test | — | same file (methodology link test) | exact |
| `src/features/schools/SchoolComparison/index.tsx` | component (client) | event-driven | `ComparisonLimitations` inline link | partial |
| `src/features/schools/SchoolComparison/index.test.tsx` | test | — | `ComparisonLimitations/index.test.tsx` | partial |
| `src/app/page.test.tsx` | test | — | same file (journey CTA assertions) | exact |
| `e2e/smoke.spec.ts` | test | — | homepage → `/schools` journey tests | role-match |
| `src/app/globals.css` (optional) | config | transform | — | no analog |

## Pattern Assignments

### `src/app/guides/page.tsx` (route, static build)

**Analog:** `src/app/methodology/page.tsx` + `src/app/page.tsx`

**Page shell pattern** from methodology (lines 1-21):

```tsx
import MethodologyGuide from "@/content/guides/methodology.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";

export const metadata = {
  title: "Metodologia",
  description:
    "Como interpretamos evidências, dados ausentes e cobertura da pesquisa.",
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Como funciona nossa pesquisa"
        description="Entenda o que significam os status de evidência, a cobertura da pesquisa e os termos alemães que você vê nos cartões."
      />
      <MethodologyGuide />
    </main>
  );
}
```

**Apply for hub:** Same `main` wrapper + `GuideIntro` with IA-aligned heading **Guias** (`title="Guias"`), parent-facing description about understanding the Berlin system first. Delegate card sections to `GuidesHub` below the intro (mirrors `HomePage` → `HomeJourneyCards` split in `src/app/page.tsx` lines 10-18).

**Metadata pattern:**

```tsx
export const metadata = {
  title: "Guias",
  description:
    "Guias práticos para famílias brasileiras entenderem o sistema escolar primário de Berlim.",
};
```

---

### `src/features/guides/GuidesHub/index.tsx` (component, static + Link nav)

**Analog:** `src/features/home/HomeJourneyCards/index.tsx`

**Primary vs secondary card hierarchy** (lines 7-29):

```tsx
export function HomeJourneyCards() {
  return (
    <div className="space-y-4">
      <article className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold">Explorar escolas</h2>
        <p className="mt-2 text-base leading-8 text-neutral-700">
          Veja escolas primárias em Lichtenberg com status de evidência em cada
          informação — o que confirmamos, o que falta e de onde veio.
        </p>
        <Button asChild className="mt-4">
          <Link href="/schools">Ver escolas em Lichtenberg</Link>
        </Button>
      </article>

      <article className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
        <h2 className="text-xl font-semibold">Entender nossa metodologia</h2>
        <p className="mt-2 text-base leading-8 text-neutral-700">
          Saiba como interpretamos evidências, cobertura da pesquisa e dados
          ausentes antes de confiar nas informações.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/methodology">Como funciona nossa pesquisa</Link>
        </Button>
      </article>
    </div>
  );
}
```

**Apply for hub (D-14–D-16):**

- Wrap cards in **category sections** with `h2` headings — e.g. `"Entenda o sistema"`, `"Checklists práticas"`. Only render sections that have live guides in Phase 7 (no empty categories, no "Em breve").
- **Featured primary card:** system guide at `/guides/berlin-school-system/` — use `border-l-primary bg-white` accent (same as directory card on homepage).
- **Secondary card:** checklist at `/guides/first-steps/` — use `bg-neutral-50` + `variant="outline"` button.
- Import `Button` from `@/components/ui/Button`, `Link` from `next/link`.
- **Do not** render disabled cards or links without destinations (D-01, Phase 3 D-07).

**Optional constants file:** If guide metadata grows, colocate `constants.ts` in `GuidesHub/` with live guide entries only — mirror `SiteHeader/constants.ts` extensible array pattern.

---

### `src/app/guides/berlin-school-system/page.tsx` (route, static build)

**Analog:** `src/app/methodology/page.tsx` (exact)

**Copy wholesale:**

```tsx
import BerlinSchoolSystemGuide from "@/content/guides/berlin-school-system.mdx";
import { GuideIntro } from "@/features/guides/GuideIntro";

export const metadata = {
  title: "Sistema escolar primário em Berlim",
  description:
    "Guia conciso para famílias brasileiras entenderem Grundschule, matrícula, Ganztag e outros conceitos do sistema escolar berlinense.",
};

export default function BerlinSchoolSystemGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Sistema escolar primário em Berlim"
        description="Respostas práticas às perguntas que famílias recém-chegadas fazem primeiro — o que verificar em seguida em cada tema."
      />
      <BerlinSchoolSystemGuide />
    </main>
  );
}
```

Route segment: English slug `/guides/berlin-school-system/` (D-02). Visible copy in Portuguese.

---

### `src/app/guides/first-steps/page.tsx` (route, static build)

**Analog:** `src/app/methodology/page.tsx` (exact)

Same shell as system guide. Checklist-specific metadata:

```tsx
export const metadata = {
  title: "Primeiros passos",
  description:
    "Checklist prática para famílias se prepararem para visitar escolas e iniciar a matrícula em Berlim.",
};
```

**Print affordance (D-09 — planner discretion):** Either add `@media print` rules on checklist wrapper class in `globals.css`, or a lightweight print button using `window.print()` in a small client component colocated under `src/features/guides/`. No existing print pattern in codebase — prefer print CSS on static checklist markup over new abstractions unless button is chosen.

---

### `src/content/guides/berlin-school-system.mdx` (config, file-I/O)

**Analog:** `src/content/guides/methodology.mdx`

**Section structure pattern** (lines 1-34):

```mdx
## Como lemos os cartões de escola

Cada informação nos cartões de escola vem com um status de evidência. Preferimos mostrar o que confirmamos, sinalizar o que falta e deixar claro quando algo foi inferido — em vez de preencher lacunas com suposições.

## Status de evidência

Estes são os rótulos que você vê nos cartões:

- **Verificado** — encontramos a informação em uma fonte oficial ou confiável e a conferimos.
```

**Apply for system guide (D-03–D-05, D-11–D-13):**

- Use `##` modular sections — one practical parent question per section (Grundschule, matrícula, Ganztag, Einzugsgebiet, etc.).
- **Inline term explanations on first use** per `docs/EDITORIAL_GUIDE.md` (lines 9-17):

```markdown
- Grundschule: escola primária alemã.
- Einzugsgebiet: área de residência normalmente vinculada a uma escola pública.
- Ganztag: modelo de escola em tempo integral ou atividades ao longo do dia.
- Hort: cuidado ou atividades supervisionadas após o horário regular de aula.
- Open Day: dia de visita à escola.
- Willkommensklasse: turma de acolhimento para crianças recém-chegadas.
```

- End with dedicated **`## Glossário`** anchor section for quick reference (D-11).
- **Split from methodology:** School-system terms live here; evidence/research terms (`Verificado`, `Schulportrait`, coverage %) stay on `/methodology`. Cross-link to methodology where evidence framing helps — do not duplicate methodology glossary.
- May mention future dedicated guides in prose; **no placeholder links** (D-05).
- Parent-centered writing per `docs/EDITORIAL_GUIDE.md` lines 43-59 — each section ends with what to verify next.

**Anchor navigation (D-03):** No `rehype-slug` in `next.config.mjs`. Add stable `id` on section headings via extended `h2` in `mdx-components.tsx` (see MDX section below), or manual `{#slug}` / explicit ids in MDX if supported at build time.

---

### `src/content/guides/first-steps.mdx` (config, file-I/O)

**Analog:** `src/content/guides/methodology.mdx` (partial — checklist semantics)

**List pattern** from methodology bullet lists (lines 9-15):

```mdx
- **Verificado** — encontramos a informação em uma fonte oficial ou confiável e a conferimos.
- **Informação não encontrada** — pesquisamos, mas não localizamos essa informação nas fontes disponíveis.
```

**Apply for checklist (D-06–D-08):**

- Static ordered checklist (`1.` / `-` items) covering pre-visit preparation: catchment discovery, timeline, documents, Open Day, questions to ask.
- **Stops before detailed enrollment procedures** — reference future guide in prose only.
- Wrap checklist in a semantic `<section>` or className from MDX component for print styling (`print:break-inside-avoid` on items if using Tailwind print variant).
- Link to system guide and `/schools` where tasks reference those destinations.

---

### `src/mdx-components.tsx` (config, extend in place)

**Analog:** `src/mdx-components.tsx` (lines 1-13)

**Current global MDX overrides:**

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold">{children}</h1>
    ),
    p: ({ children }) => (
      <p className="mt-4 leading-7 text-neutral-700">{children}</p>
    ),
    ...components,
  };
}
```

**Recommended extensions for guide pages:**

| Component | Purpose | Pattern |
|-----------|---------|---------|
| `h2` | Section headings with scroll anchors | `id` from slugified children + `className="mt-10 text-2xl font-semibold scroll-mt-20"` |
| `h3` | Subsections | `className="mt-6 text-xl font-semibold"` |
| `ul` / `ol` | Lists (checklist + glossary) | `className="mt-4 list-disc space-y-2 pl-6 text-neutral-700"` / `list-decimal` for checklist |
| `strong` | Term emphasis | Pass-through (already used in methodology MDX) |
| `a` | Internal cross-links | `className="font-medium text-blue-700 underline hover:opacity-90"` — match `SchoolDirectory` link styling |

**Extend vs create:**

| Need | Recommendation |
|------|----------------|
| Section intro hero | **Extend** — reuse `GuideIntro` in page shell, not in MDX |
| Term highlight on first use | **Extend** `mdx-components` `strong` or add minimal `GuideTerm` only if repeated markup exceeds 3 uses; otherwise inline `**Grundschule** — escola primária alemã.` in MDX per methodology glossary style |
| Callout / tip boxes | **Create** lightweight `GuideCallout` in `src/features/guides/GuideCallout/` only if prose needs visual distinction beyond bordered `ComparisonLimitations`-style block |
| Hub journey cards | **Create** `GuidesHub` — no existing hub component |
| Table of contents | **Defer** — with ~2 guides, hub + in-page `h2` anchors suffice; optional top-of-page anchor list as plain MDX links |

**Callout analog** (if needed): `src/features/schools/ComparisonLimitations/index.tsx` (lines 5-44):

```tsx
<section
  aria-labelledby="comparison-limitations-heading"
  className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-800"
>
  <h2 id="comparison-limitations-heading" className="text-base font-semibold text-neutral-950">
    O que esta comparação pode e não pode dizer
  </h2>
```

---

### `src/features/navigation/SiteHeader/constants.ts` (config, transform)

**Analog:** Phase 6 Comparar addition (current file lines 1-6)

```ts
export const NAV_ITEMS = [
  { href: "/", label: "Início" },
  { href: "/schools", label: "Escolas" },
  { href: "/compare", label: "Comparar" },
  { href: "/methodology", label: "Metodologia" },
] as const;
```

**Apply (D-17, Phase 3 D-07):** Insert Guias when `/guides` ships:

```ts
{ href: "/guides", label: "Guias" },
```

**Placement:** After Escolas, before Comparar — aligns with IA priority (education system guide before directory tools). Exact order is planner discretion; follow `docs/INFORMATION_ARCHITECTURE.md` nav goals (lines 7-13).

---

### `src/features/navigation/SiteHeader/index.tsx` (component, client)

**Analog:** `isActive` for `/schools/*` (lines 19-25)

```tsx
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/schools") {
    return pathname === "/schools" || pathname.startsWith("/schools/");
  }
  return pathname === href;
}
```

**Apply:** Add prefix match for Guias so `/guides/berlin-school-system/` highlights Guias nav item:

```tsx
if (href === "/guides") {
  return pathname === "/guides" || pathname.startsWith("/guides/");
}
```

No other structural changes — `NAV_ITEMS.map` drives desktop + mobile sheet automatically.

---

### `src/features/navigation/SiteFooter/index.tsx` (component, server)

**Analog:** Phase 6 Comparar footer link (lines 13-27)

```tsx
<Link
  href="/compare"
  className="text-blue-700 underline hover:opacity-90"
>
  Comparar
</Link>
<span aria-hidden="true" className="hidden sm:inline">·</span>
<Link
  href="/methodology"
  className="text-blue-700 underline hover:opacity-90"
>
  Metodologia
</Link>
```

**Apply (D-17):** Add Guias link with same classes and `·` separator — minimal footer scope matches Phase 6 pattern (not full nav mirror).

---

### `src/features/home/HomeJourneyCards/index.tsx` (component, static + Link nav)

**Analog:** same file — add third journey card (D-18, Phase 3 D-06 deferred)

**Extend** existing component; do not create parallel `HomeGuidesCard`. Add guides card as **secondary** (neutral-50 + outline button) or reorder per journey priority — system understanding should appear **before** directory exploration in ideal user journey (`docs/INFORMATION_ARCHITECTURE.md` lines 101-103), but Phase 3 D-03 keeps directory card visually dominant on homepage. Reasonable compromise: add guides as third card below methodology, or insert between hero flow and methodology with secondary styling.

**Link target:** `/guides` with Portuguese CTA copy (planner discretion).

**Test flip:** `index.test.tsx` currently asserts guides are absent (lines 44-49) — update to assert presence and href.

---

### `src/features/schools/SchoolDirectory/index.tsx` (component, client — header only)

**Analog:** existing methodology inline link (lines 256-274)

```tsx
<header className="space-y-3">
  <p className="text-sm font-semibold uppercase text-blue-700">
    Berlin School Guide
  </p>
  <h1 className="text-4xl font-semibold text-neutral-950">Escolas</h1>
  <p className="max-w-3xl text-lg leading-8 text-neutral-700">
    Explore escolas primárias em Berlim com informações verificadas e
    transparência sobre o que ainda não confirmamos. Começamos por
    Lichtenberg — mais distritos em breve. A cobertura da pesquisa mede
    completude dos dados neste nível, não qualidade da escola.{" "}
    <Link href="/methodology" className="font-medium text-blue-700 underline">
      Como funciona nossa pesquisa?
    </Link>
  </p>
```

**Apply (D-19):** Add guides cross-link for families needing system context first — e.g. link to `/guides` or `/guides/berlin-school-system/` with copy like "Novo em Berlim? Comece pelo guia do sistema escolar." Keep methodology link; both serve different intents (D-13).

**Link class pattern:** `font-medium text-blue-700 underline` — consistent with `ComparisonLimitations`.

---

### `src/features/schools/SchoolComparison/index.tsx` (component, client — intro/header)

**Analog:** `ComparisonLimitations` methodology link (lines 33-40)

```tsx
<Link
  href="/methodology"
  className="font-medium text-blue-700 underline hover:opacity-90"
>
  Metodologia
</Link>
```

**Apply (D-19):** Add cross-link in page header (`lines 31-37`) or extend `ComparisonLimitations` copy — families comparing schools may still need system context. Prefer header intro paragraph addition to keep limitations block focused on evidence framing.

**Header structure** (lines 31-37):

```tsx
<header>
  <h1 className="text-3xl font-semibold text-neutral-950">Comparar</h1>
  <p className="mt-2 text-base text-neutral-700">
    Critérios lado a lado para preparar perguntas — sem ranking de
    qualidade.
  </p>
</header>
```

---

## Test Patterns

### Guide page tests — from `src/app/methodology/page.test.tsx`

**MDX mock pattern** (lines 3-10):

```tsx
jest.mock("@/content/guides/methodology.mdx", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="methodology-mdx">
      <p>Verificado</p>
    </div>
  ),
}));
```

**Apply:** Mock each new MDX import; stub one distinctive string per guide (e.g. checklist item label, glossary term). Assert `GuideIntro` heading via role:

```tsx
describe("BerlinSchoolSystemGuidePage", () => {
  it("renders the guide heading and key content", () => {
    render(<BerlinSchoolSystemGuidePage />);
    expect(
      screen.getByRole("heading", { name: /sistema escolar primário/i }),
    ).toBeVisible();
    expect(screen.getByText("Grundschule")).toBeVisible(); // from mock or stub
  });
});
```

**Hub page test:** Mock `GuidesHub` or render integrated — assert `h1` "Guias" and links to both live guide routes only.

---

### Navigation tests — from `src/features/navigation/SiteHeader/index.test.tsx`

**Extend desktop + mobile nav assertions** (lines 24-44, 102-114):

```tsx
expect(
  within(nav).getByRole("link", { name: "Guias" }),
).toHaveAttribute("href", "/guides");
```

**Add active-state test** for `/guides/berlin-school-system/` — mirror Escolas profile test (lines 61-73):

```tsx
pathname = "/guides/berlin-school-system";
// expect Guias link to have text-primary + font-semibold
```

**Footer test** — extend `SiteFooter/index.test.tsx` Comparar pattern (lines 14-20):

```tsx
expect(screen.getByRole("link", { name: "Guias" })).toHaveAttribute(
  "href",
  "/guides",
);
```

---

### HomeJourneyCards tests — from `src/features/home/HomeJourneyCards/index.test.tsx`

**Replace negative guard** (lines 44-49) with positive assertions:

```tsx
it('links guides card to /guides', () => {
  render(<HomeJourneyCards />);
  expect(
    screen.getByRole("link", { name: /guias|sistema escolar/i }),
  ).toHaveAttribute("href", "/guides");
});
```

**Card count:** Update `toHaveLength(2)` → `3` if adding third card.

---

### Directory / comparison cross-link tests

**Directory pattern** from `SchoolDirectory/index.test.tsx` (lines 163-169):

```tsx
it("links to the methodology page from the header", () => {
  render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);
  expect(
    screen.getByRole("link", { name: /como funciona nossa pesquisa/i }),
  ).toHaveAttribute("href", "/methodology");
});
```

**Apply:** Add parallel test for guides link with chosen link name regex → `/guides` or `/guides/berlin-school-system/`.

**Comparison pattern** from `ComparisonLimitations/index.test.tsx` (lines 20-26):

```tsx
it("links to methodology page", () => {
  render(<ComparisonLimitations />);
  expect(
    screen.getByRole("link", { name: /metodologia/i }),
  ).toHaveAttribute("href", "/methodology");
});
```

---

### E2E (optional, planner discretion)

**Analog:** `e2e/smoke.spec.ts` homepage journey (lines 3-16)

```tsx
test("navigates from homepage to school directory via journey CTA", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Ver escolas em Lichtenberg" }).click();
  await expect(page).toHaveURL(/\/schools$/);
});
```

**Apply:** Add guides nav or homepage card journey: `/` → `/guides` → `/guides/berlin-school-system/` with visible Portuguese headings.

---

## Shared Patterns

### Guide page composition
**Source:** `src/app/methodology/page.tsx`
**Apply to:** All three guide routes (`/guides`, `/guides/berlin-school-system/`, `/guides/first-steps/`)

```tsx
<main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
  <GuideIntro eyebrow="Berlin School Guide" title="…" description="…" />
  {/* MDX content or GuidesHub */}
</main>
```

### Reuse GuideIntro — do not duplicate
**Source:** `src/features/guides/GuideIntro/index.tsx`
**Apply to:** Hub + both guide pages. Homepage already uses it (`src/app/page.tsx` lines 13-17).

### Live nav only
**Source:** Phase 3 D-07 + Phase 6 D-26
**Apply to:** `SiteHeader/constants.ts`, `SiteFooter`, `GuidesHub` — ship Guias link same PR as `/guides` route; no disabled nav entries.

### Inline cross-link styling
**Source:** `src/features/schools/SchoolDirectory/index.tsx` line 266
**Apply to:** Directory header, comparison intro, MDX `a` override

```tsx
className="font-medium text-blue-700 underline"
// add hover:opacity-90 where ComparisonLimitations uses it
```

### Editorial term definitions
**Source:** `docs/EDITORIAL_GUIDE.md` lines 9-17
**Apply to:** `berlin-school-system.mdx` inline + glossário; **not** methodology evidence terms

### Static MDX content pipeline
**Source:** `.planning/codebase/STRUCTURE.md` lines 196-200

```text
src/content/guides/<slug>.mdx  →  src/app/guides/<slug>/page.tsx imports MDX directly
```

### English URL / Portuguese UI
**Source:** `docs/INFORMATION_ARCHITECTURE.md` lines 47-56
**Apply to:** Routes `/guides`, `/guides/berlin-school-system/`, `/guides/first-steps/`; visible heading `Guias`

---

## Integration Points (exact paths)

| Integration | File | Action |
|-------------|------|--------|
| Global header nav | `src/features/navigation/SiteHeader/constants.ts` | Add `{ href: "/guides", label: "Guias" }` |
| Header active state | `src/features/navigation/SiteHeader/index.tsx` | Extend `isActive` for `/guides/*` |
| Header tests | `src/features/navigation/SiteHeader/index.test.tsx` | Assert Guias href + active on child routes |
| Footer link | `src/features/navigation/SiteFooter/index.tsx` | Add Guias link between Comparar and Metodologia |
| Footer tests | `src/features/navigation/SiteFooter/index.test.tsx` | Assert Guias href |
| Homepage journey | `src/features/home/HomeJourneyCards/index.tsx` | Add guides card linking to `/guides` |
| Homepage tests | `src/features/home/HomeJourneyCards/index.test.tsx` | Replace negative `/guides` guard |
| Homepage integration | `src/app/page.test.tsx` | Assert guides CTA if rendered via HomeJourneyCards |
| Directory cross-link | `src/features/schools/SchoolDirectory/index.tsx` | Add guides link in header paragraph (~line 261) |
| Directory tests | `src/features/schools/SchoolDirectory/index.test.tsx` | Assert guides link href |
| Compare cross-link | `src/features/schools/SchoolComparison/index.tsx` | Add guides link in header (~line 33) |
| Compare tests | `src/features/schools/SchoolComparison/index.test.tsx` | Assert guides link |
| MDX styling | `src/mdx-components.tsx` | Extend h2/h3/ul/ol/a for guide prose |
| Root layout | `src/app/layout.tsx` | No change — chrome already wraps all routes |
| Future filter help links | `src/features/schools/SchoolFilters/index.tsx` | **Out of Phase 7 scope** — still points to `/methodology` (Phase 5 interim); optional follow-up to point Ganztag/Willkommensklasse help to system guide |

---

## Reusable Components: Extend vs Create

| Component | Action | Rationale |
|-----------|--------|-----------|
| `GuideIntro` | **Extend** (reuse as-is) | Already serves all guide page heroes |
| `HomeJourneyCards` | **Extend** | Add third card; established primary/secondary visual hierarchy |
| `GuidesHub` | **Create** | Hub category sections + live-only cards — no existing hub |
| `GuideIntro` tests | **Reuse** | No changes unless new props added |
| `GuideCallout` | **Create only if needed** | ComparisonLimitations box is inline analog |
| `GuideTerm` | **Defer** | Methodology glossary uses plain MDX bullets successfully |
| `mdx-components.tsx` | **Extend** | h2/h3/lists/links needed for modular sections + checklist |
| `SiteHeader` / `SiteFooter` | **Extend** | Phase 6 Comparar proved insertion pattern |
| Print button component | **Defer** | Prefer print CSS on checklist unless UX requires button |

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| Print-specific CSS / button | config / component | transform | No `@media print` or print affordance exists in codebase |
| Guide table-of-contents component | component | transform | No in-page TOC pattern; anchor `h2` links sufficient for Phase 7 scope |
| Hub category section component | component | static | Category-grouped card layout is new — compose from HomeJourneyCards primitives |

---

## Metadata

**Analog search scope:** `src/app/`, `src/content/guides/`, `src/features/guides/`, `src/features/home/`, `src/features/navigation/`, `src/features/schools/SchoolDirectory/`, `src/features/schools/SchoolComparison/`, `src/features/schools/ComparisonLimitations/`, `docs/EDITORIAL_GUIDE.md`, `docs/INFORMATION_ARCHITECTURE.md`, Phase 3/6 pattern maps
**Files scanned:** ~35
**Pattern extraction date:** 2026-07-11
