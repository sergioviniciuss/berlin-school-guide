# Phase 11: Flagship Discovery & Release - Pattern Map

**Mapped:** 2026-07-25
**Files analyzed:** 19
**Analogs found:** 19 / 19

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/features/home/HomeJourneyCards/index.tsx` | component | request-response (static SSR) | self — primary/secondary chrome already in file | exact |
| `src/features/home/HomeJourneyCards/index.test.tsx` | test | request-response | self — rewrite assertions for 2-card structure | exact |
| `src/features/guides/GuidesHub/index.tsx` | component | request-response (static SSR) | self + `HomeJourneyCards` chrome swap | exact |
| `src/features/guides/GuidesHub/index.test.tsx` | test | request-response | self — extend with flagship link assertion | exact |
| `src/features/guides/GuideIntro/index.tsx` | component | request-response (static SSR) | self + `ProfileSection` / `BerlinCallout` ReactNode props | exact |
| `src/features/guides/GuideIntro/index.test.tsx` | test | request-response | self — add ReactNode-with-link case | exact |
| `src/app/guides/german-education-system/page.tsx` | route | request-response (static SSR) | self — widen `GuideIntro` description w/ `Link` | exact |
| `src/app/guides/berlin-school-system/page.tsx` | route | request-response (static SSR) | self — retitle + reciprocal linked description | exact |
| `src/app/guides/berlin-school-system/page.test.tsx` | test | request-response | self — update H1 regex for D-08 retitle | exact |
| `src/app/page.test.tsx` | test | request-response | self — drop guides/methodology CTA assertions | exact |
| `src/app/guides/page.test.tsx` | test | request-response | self — add onboarding flagship link | exact |
| `src/content/guides/german-education-system.mdx` | content | transform (MDX → static React) | self — insert `##` + ordered list before Glossário | exact |
| `src/content/guides/first-steps.mdx` | content | transform (MDX → static React) | self — top italic tip + existing MDX link syntax | exact |
| `src/content/guides/berlin-school-system.mdx` | content | transform (MDX → static React) | self — optional light cross-link only if needed | role-match |
| `e2e/smoke.spec.ts` | test | request-response (browser) | self — homepage → onboarding journey pattern | exact |
| `e2e/metadata.spec.ts` | test | request-response (browser) | self — `CORE_ROUTES` array extension | exact |
| `e2e/a11y.spec.ts` | test | request-response (browser) | self — `CORE_A11Y_ROUTES` + `expectNoAccessibilityViolations` | exact |
| `src/app/page.tsx` | route | request-response (static SSR) | self — composition already wires `HomeJourneyCards`; likely unchanged | exact |
| `src/app/guides/page.tsx` | route | request-response (static SSR) | self — composition already wires `GuidesHub`; likely unchanged | exact |

**Not modified (by design):** `src/app/guides/first-steps/page.tsx` (D-11 tip lives in MDX), directory `/schools` intro (D-12), `e2e/onboarding.spec.ts` (route already covered; smoke owns discovery journey).

## Pattern Assignments

### `src/features/home/HomeJourneyCards/index.tsx` (component, static SSR)

**Analog:** self (`src/features/home/HomeJourneyCards/index.tsx`)

**Imports pattern** (lines 1-3):
```tsx
import Link from "next/link";

import { Button } from "@/components/ui/Button";
```

**Core pattern — two-tier card chrome** (lines 5-28; swap assignment per D-01–D-04):
```tsx
export function HomeJourneyCards() {
  return (
    <div className="space-y-4">
      {/* PRIMARY — today on "Explorar escolas"; Phase 11 moves this chrome to "Comece por aqui" */}
      <article className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold">Explorar escolas</h2>
        {/* ... */}
        <Button asChild className="mt-4">
          <Link href="/schools">Ver escolas em Lichtenberg</Link>
        </Button>
      </article>

      {/* SECONDARY — outline Button + bg-neutral-50 */}
      <article className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
        <h2 className="text-xl font-semibold">Entender o sistema escolar</h2>
        {/* ... */}
        <Button asChild variant="outline" className="mt-4">
          <Link href="/guides">Ver guias para famílias</Link>
        </Button>
      </article>
    </div>
  );
}
```

**Phase 11 delta (copy from UI-SPEC, reuse exact class strings):**
- Delete methodology + `/guides` articles entirely (D-03 — remove, don't hide).
- Primary chrome → onboarding card → `/guides/german-education-system`.
- Secondary chrome → schools card → `/schools` (keep button label `Ver escolas em Lichtenberg`).

---

### `src/features/home/HomeJourneyCards/index.test.tsx` (test)

**Analog:** self (lines 5-53)

**Core assertion pattern** (update in lockstep with new labels):
```tsx
it("renders journey headings for schools, guides, and methodology", () => {
  render(<HomeJourneyCards />);
  expect(screen.getByRole("heading", { name: "Explorar escolas" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Entender o sistema escolar" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Entender nossa metodologia" })).toBeVisible();
});

it("applies left accent class to the primary card article", () => {
  const { container } = render(<HomeJourneyCards />);
  const primaryCard = screen
    .getByRole("heading", { name: "Explorar escolas" })
    .closest("article");
  expect(primaryCard).toHaveClass("border-l-primary");
  expect(container.querySelectorAll("article")).toHaveLength(3);
});
```

**Phase 11 rewrite targets:**
- Headings: `Comece por aqui` + `Explorar escolas` only (length `2`).
- Links: `Começar pelo guia do sistema` → `/guides/german-education-system`; keep schools link.
- Remove assertions for `Ver guias para famílias` and `Como funciona nossa pesquisa`.
- Accent class asserts on `Comece por aqui` heading’s closest `article`.

---

### `src/features/guides/GuidesHub/index.tsx` (component, static SSR)

**Analog:** self section shell + `HomeJourneyCards` primary/secondary chrome

**Imports pattern** (lines 1-3):
```tsx
import Link from "next/link";

import { Button } from "@/components/ui/Button";
```

**Core section + single primary card** (lines 8-28 — stack a second article inside the same `<section>`):
```tsx
<section aria-labelledby="guides-system-heading">
  <h2
    id="guides-system-heading"
    className="text-lg font-semibold text-neutral-950"
  >
    Entenda o sistema
  </h2>
  <article className="mt-4 rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
    <h3 className="text-xl font-semibold">
      Como funciona a escola primária em Berlim
    </h3>
    {/* ... */}
    <Button asChild className="mt-4">
      <Link href="/guides/berlin-school-system">
        Ler guia do sistema escolar
      </Link>
    </Button>
  </article>
</section>
```

**Checklist section stays secondary** (lines 31-48) — only body copy per D-06:
```tsx
<article className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6">
  <h3 className="text-xl font-semibold">Primeiros passos</h3>
  {/* body → "Quando estiver pronto para agir, siga o checklist prático." */}
  <Button asChild variant="outline" className="mt-4">
    <Link href="/guides/first-steps">Abrir checklist</Link>
  </Button>
</article>
```

**Label collision guard:** keep Berlin CTA exactly `Ler guia do sistema escolar`; flagship CTA must differ (`Ler guia do sistema educacional` per UI-SPEC).

---

### `src/features/guides/GuidesHub/index.test.tsx` (test)

**Analog:** self (lines 22-31)

```tsx
it("links to system guide and first-steps checklist", () => {
  render(<GuidesHub />);

  expect(
    screen.getByRole("link", { name: "Ler guia do sistema escolar" }),
  ).toHaveAttribute("href", "/guides/berlin-school-system");
  expect(
    screen.getByRole("link", { name: "Abrir checklist" }),
  ).toHaveAttribute("href", "/guides/first-steps");
});
```

**Phase 11 extend:** keep Berlin assertion unchanged; add flagship link → `/guides/german-education-system` with distinct accessible name.

---

### `src/features/guides/GuideIntro/index.tsx` (component, static SSR)

**Analog:** self markup + `ProfileSection` / `BerlinCallout` for `ReactNode` typing

**Current string-only prop** (lines 1-16):
```tsx
type GuideIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
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

**ReactNode typing analog** from `src/features/schools/ProfileSection/index.tsx` (lines 1-14):
```tsx
import type { ReactNode } from "react";

type ProfileSectionProps = {
  heading: string;
  children: ReactNode;
};

export function ProfileSection({ heading, children }: ProfileSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-950">{heading}</h2>
      <dl className="divide-y divide-neutral-100">{children}</dl>
    </section>
  );
}
```

**Phase 11 delta:** one-line type change `description: string` → `description: ReactNode`. JSX already renders `{description}` inside `<p>` — fragments with `<Link>` work without markup changes. Do **not** use `dangerouslySetInnerHTML`.

---

### `src/features/guides/GuideIntro/index.test.tsx` (test)

**Analog:** self (lines 5-21) — keep string case; add ReactNode-with-link case

```tsx
it("renders the guide introduction content", () => {
  render(
    <GuideIntro
      eyebrow="Teste"
      title="Guia de validação"
      description="Componente mínimo para validar React Testing Library."
    />,
  );
  expect(screen.getByRole("heading", { name: "Guia de validação" })).toBeInTheDocument();
  expect(
    screen.getByText("Componente mínimo para validar React Testing Library."),
  ).toBeVisible();
});
```

**Add:** render with `description={<>…<a href="…">…</a></>}` (or `next/link` `Link`) and assert link role/href.

---

### `src/app/guides/german-education-system/page.tsx` (route, static SSR)

**Analog:** self + berlin-school-system page shell

**Imports + metadata + GuideIntro** (lines 1-22):
```tsx
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

**Phase 11:** keep metadata title; widen `description` to fragment + `Link` to `/guides/berlin-school-system` with `className="text-blue-700 underline"` (UI-SPEC). Import `Link` from `next/link`.

---

### `src/app/guides/berlin-school-system/page.tsx` (route, static SSR)

**Analog:** self (same shell as onboarding page)

**Current metadata + H1** (lines 5-22):
```tsx
export const metadata = buildPageMetadata({
  title: "Sistema escolar primário em Berlim",
  description:
    "Grundschule, matrícula, Einzugsgebiet, Ganztag e o que verificar antes de escolher uma escola primária em Berlim.",
  path: "/guides/berlin-school-system",
});

<GuideIntro
  eyebrow="Berlin School Guide"
  title="Como funciona a escola primária em Berlim"
  description="Um panorama prático do sistema — o que significam os termos alemães e o que vale conferir antes de visitar escolas ou iniciar a matrícula."
/>
```

**Phase 11:**
- H1 → `Como funciona o sistema escolar público de Berlim` (D-08).
- Metadata title → `Sistema escolar público em Berlim` (REL-01 polish per UI-SPEC).
- Description → ReactNode with conditional reciprocal link to `/guides/german-education-system` (D-10).

**Metadata builder analog** — `src/features/siteMetadata/index.ts` (lines 29-63):
```tsx
export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
}: BuildPageMetadataInput): Metadata {
  const canonicalUrl = buildCanonicalUrl(path);
  const pageTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { type: "website", locale: "pt_BR", url: canonicalUrl, /* ... */ },
    twitter: { card: "summary_large_image", /* ... */ },
  };
}
```

---

### `src/app/guides/berlin-school-system/page.test.tsx` (test)

**Analog:** self — MDX mock + H1 regex

```tsx
jest.mock("@/content/guides/berlin-school-system.mdx", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="berlin-school-system-mdx">
      <h2>O que é uma Grundschule?</h2>
      <h2>Glossário</h2>
    </div>
  ),
}));

expect(
  screen.getByRole("heading", {
    name: /como funciona a escola primária em berlim/i,
  }),
).toBeVisible();
```

**Phase 11:** update regex to `/como funciona o sistema escolar público de berlim/i`. Keep MDX mock pattern.

---

### `src/app/page.test.tsx` / `src/app/guides/page.test.tsx` (tests)

**Home page CTA assertions** (`src/app/page.test.tsx` lines 39-51) — rewrite like HomeJourneyCards tests:
```tsx
it("renders journey card CTAs via HomeJourneyCards", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("link", { name: "Ver escolas em Lichtenberg" }),
  ).toHaveAttribute("href", "/schools");
  expect(
    screen.getByRole("link", { name: "Ver guias para famílias" }),
  ).toHaveAttribute("href", "/guides");
  // …methodology — DELETE these two assertions; add Start-here CTA
});
```

**Guides hub page** (`src/app/guides/page.test.tsx` lines 6-16) — keep Berlin CTA; add flagship:
```tsx
expect(
  screen.getByRole("link", { name: "Ler guia do sistema escolar" }),
).toHaveAttribute("href", "/guides/berlin-school-system");
```

---

### `src/content/guides/german-education-system.mdx` (content, MDX transform)

**Analog:** existing "O que verificar" + Glossário placement (lines 227-239)

```mdx
**O que verificar:**

- Se Universität e Hochschule / Fachhochschule diferem no tipo de curso que a
  família imagina, e o que Abitur versus Fachabitur habilita nesse cenário.
- Opcional: [Ver escolas](/schools) · [Primeiros passos](/guides/first-steps)

## Glossário
```

**Phase 11 insert immediately before `## Glossário`** (plain ordered list — no new component):
```mdx
## Próximos passos

Agora que você entende como funciona o sistema educacional alemão:

1. **Entenda como isso funciona em Berlim** — … [Como funciona o sistema escolar público de Berlim](/guides/berlin-school-system)
2. **Explore as escolas** — … [Ver escolas](/schools)
3. **Confira os primeiros passos** — … [Primeiros passos](/guides/first-steps)

## Glossário
```

Inline link syntax matches existing `[texto](/path)` MDX convention (e.g. line 237). No `/compare` exit (D-14).

---

### `src/content/guides/first-steps.mdx` (content, MDX transform)

**Analog:** self top lead paragraph + existing guide links (lines 1-8)

```mdx
Use esta checklist como roteiro — marque mentalmente ou imprima. Ela para **antes** do envio detalhado de formulários de matrícula; o passo a passo oficial varia por Bezirk e ano letivo.

## Entender sua área

- Confirmar em qual **Bezirk** e bairro a família está registrada (Anmeldung).
- Ler o [guia do sistema escolar](/guides/berlin-school-system) — especialmente Einzugsgebiet e matrícula.
```

**Phase 11:** prepend italic soft tip (D-11) **above** the lead paragraph — not `BerlinCallout`, no bordered box:
```mdx
_Novo em Berlim? Se você ainda não conhece o sistema educacional alemão,
recomendamos começar pelo guia [Como funciona o sistema educacional na
Alemanha](/guides/german-education-system) antes deste checklist._
```

`first-steps/page.tsx` GuideIntro stays unchanged.

---

### `src/content/guides/berlin-school-system.mdx` (content, optional)

**Analog:** self cross-links already present; complementary relationship is owned by `GuideIntro` on the page (D-09/D-10). Only touch MDX if a mid-page "Opcional:" line needs light retargeting for title consistency — not required for core DISC-04.

---

### `e2e/smoke.spec.ts` (test, browser)

**Analog:** existing homepage journey tests (lines 3-58)

**Keep / lightly update schools CTA** (lines 3-16):
```tsx
test("navigates from homepage to school directory via journey CTA", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Ver escolas em Lichtenberg" }).click();
  await expect(page).toHaveURL(/\/schools$/);
});
```

**Must rewrite/remove** guides-hub-via-card (lines 53-58) — card deleted per D-03:
```tsx
test("navigates from homepage journey card to guides hub", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Ver guias para famílias" }).click();
  await expect(page).toHaveURL(/\/guides$/);
});
```

**Replace with REL-03 homepage → onboarding** (mirror schools CTA shape):
```tsx
test("navigates from homepage to onboarding guide via start-here CTA", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Começar pelo guia do sistema" }).click();
  await expect(page).toHaveURL(/\/guides\/german-education-system$/);
  await expect(
    page.getByRole("heading", {
      name: "Como funciona o sistema educacional na Alemanha",
      level: 1,
    }),
  ).toBeVisible();
});
```

**Header-nav → Berlin guide** (lines 30-51) — update H1 name after D-08 retitle; keep CTA label `Ler guia do sistema escolar`:
```tsx
await expect(
  page.getByRole("heading", {
    name: "Como funciona a escola primária em Berlim", // → público de Berlim
    level: 1,
  }),
).toBeVisible();
```

**Optional ONBD-06:** assert "Próximos passos" links on onboarding route (Berlin, `/schools`, first-steps; no `/compare`).

---

### `e2e/metadata.spec.ts` (test, browser)

**Analog:** self `CORE_ROUTES` loop (lines 3-49)

```tsx
const CORE_ROUTES = [
  { path: "/", title: /Escolas primárias em Berlim para famílias brasileiras/i },
  { path: "/schools", title: /Escolas/i },
  { path: "/compare", title: /Comparar/i },
  { path: "/guides", title: /Guias/i },
  { path: "/methodology", title: /Metodologia|Como funciona nossa pesquisa/i },
];

test.describe("metadata", () => {
  for (const route of CORE_ROUTES) {
    test(`exposes title, canonical, and Open Graph tags on ${route.path}`, async ({
      page,
    }) => {
      await page.goto(route.path);
      await expect(page).toHaveTitle(route.title);
      // canonical, og:title, og:locale=pt_BR, twitter:card …
    });
  }
});
```

**Phase 11 (REL-01):** add
```tsx
{
  path: "/guides/german-education-system",
  title: /Sistema educacional alemão|Como funciona o sistema educacional/i,
},
```
Berlin route is not in `CORE_ROUTES` today; optional add if planner wants metadata regression for retitled title.

---

### `e2e/a11y.spec.ts` (test, browser)

**Analog:** self + `e2e/a11y-utils.ts`

```tsx
// e2e/a11y.spec.ts
const CORE_A11Y_ROUTES = [
  "/",
  "/schools",
  "/schools/lew-tolstoi-schule",
  "/compare?schools=lew-tolstoi-schule,adam-ries-schule",
  "/guides",
  "/guides/berlin-school-system",
  "/methodology",
];

test.describe("accessibility", () => {
  for (const route of CORE_A11Y_ROUTES) {
    test(`has no axe violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expectNoAccessibilityViolations(page);
    });
  }
});
```

```tsx
// e2e/a11y-utils.ts
export async function expectNoAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
}
```

**Phase 11 (REL-02):** add `"/guides/german-education-system"` to `CORE_A11Y_ROUTES`. No new axe helper.

---

### `src/app/page.tsx` / `src/app/guides/page.tsx` (routes — likely unchanged)

**Composition already correct** — homepage (`src/app/page.tsx` lines 12-20):
```tsx
<main className="mx-auto max-w-3xl space-y-12 px-6 py-12">
  <GuideIntro /* … */ />
  <HomeJourneyCards />
  {/* scope note unchanged */}
</main>
```

Guides hub (`src/app/guides/page.tsx` lines 12-21):
```tsx
<main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
  <GuideIntro /* … */ />
  <GuidesHub />
</main>
```

Only touch if hub `GuideIntro` blurb must reflect Germany-first framing (discretionary; structure stays).

## Shared Patterns

### Primary vs secondary card chrome
**Source:** `src/features/home/HomeJourneyCards/index.tsx` lines 8-28; mirrored in `GuidesHub`
**Apply to:** homepage Start here / Explore schools; hub onboarding flagship / Berlin complementary
```tsx
// Primary
className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8"
<Button asChild className="mt-4">…</Button>

// Secondary
className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6"
<Button asChild variant="outline" className="mt-4">…</Button>
```

### Button + Link (asChild)
**Source:** `HomeJourneyCards` / `GuidesHub`
**Apply to:** all journey/hub CTAs
```tsx
<Button asChild className="mt-4">
  <Link href="/guides/german-education-system">…</Link>
</Button>
```

### Guide page shell + metadata
**Source:** `src/app/guides/*/page.tsx`
**Apply to:** onboarding + Berlin page edits
```tsx
export const metadata = buildPageMetadata({ title, description, path });
<main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
  <GuideIntro eyebrow="Berlin School Guide" title="…" description={…} />
  <GuideMdx />
</main>
```

### MDX internal links
**Source:** `src/content/guides/german-education-system.mdx` line 237; `first-steps.mdx` line 5
**Apply to:** Próximos passos, first-steps tip, any MDX relationship copy
```mdx
[Ver escolas](/schools)
[Como funciona o sistema educacional na Alemanha](/guides/german-education-system)
```

### Playwright route-array extension
**Source:** `e2e/metadata.spec.ts`, `e2e/a11y.spec.ts`
**Apply to:** REL-01 / REL-02 — append path; do not invent new suites

### Accessibility audit helper
**Source:** `e2e/a11y-utils.ts`
**Apply to:** a11y suite only — reuse `expectNoAccessibilityViolations`

### Distinct accessible link names
**Source:** existing `getByRole("link", { name })` in Jest + smoke
**Apply to:** hub flagship vs Berlin CTAs; homepage Start here vs Explore schools
- Berlin hub CTA **frozen:** `Ler guia do sistema escolar`
- Flagship CTA **must differ:** `Ler guia do sistema educacional`

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| — | — | — | All Phase 11 files map to existing analogs. Italic soft tip in MDX has no prior italic-paragraph precedent in `src/content/guides/*.mdx`, but reuses standard MDX `_…_` + `[link](/path)` — no new component. |

## Metadata

**Analog search scope:** `src/features/home/`, `src/features/guides/`, `src/features/siteMetadata/`, `src/app/`, `src/app/guides/`, `src/content/guides/`, `e2e/`
**Files scanned:** ~25 (components, pages, tests, MDX, Playwright)
**Pattern extraction date:** 2026-07-25
