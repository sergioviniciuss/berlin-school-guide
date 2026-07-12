# Phase 3: Homepage, Navigation & Core Journey - Pattern Map

**Mapped:** 2026-07-11
**Files analyzed:** 14 new/modified/deleted files
**Analogs found:** 12 / 14

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/features/navigation/SiteHeader/index.tsx` | component (client) | event-driven | `src/features/schools/SchoolDirectory/index.tsx` | role-match |
| `src/features/navigation/SiteHeader/constants.ts` | config | transform | `src/features/schools/school/constants.ts` | role-match |
| `src/features/navigation/SiteHeader/types.ts` | model | transform | `src/features/schools/SchoolFilters/types.ts` | role-match |
| `src/features/navigation/SiteHeader/index.test.tsx` | test | — | `src/features/schools/SchoolDirectory/index.test.tsx` | exact |
| `src/features/navigation/SiteFooter/index.tsx` | component (server) | request-response (static) | `src/features/guides/GuideIntro/index.tsx` + `SchoolDirectory` Link | partial |
| `src/features/navigation/SiteFooter/index.test.tsx` | test | — | `src/features/guides/GuideIntro/index.test.tsx` | exact |
| `src/features/home/HomeJourneyCards/index.tsx` | component | request-response (static + Link nav) | `src/features/schools/SchoolCard/index.tsx` + `src/app/page.tsx` | partial |
| `src/features/home/HomeJourneyCards/index.test.tsx` | test | — | `src/features/schools/SchoolCard/index.test.tsx` | role-match |
| `src/components/ui/Sheet/index.tsx` | provider (ui primitive) | event-driven | `src/components/ui/Button/index.tsx` | role-match |
| `src/app/layout.tsx` | route (layout) | request-response (static build) | `src/app/layout.tsx` (extend in place) | exact |
| `src/app/page.tsx` | route | request-response (static build) | `src/app/methodology/page.tsx` + `src/app/page.tsx` | exact |
| `e2e/smoke.spec.ts` | test | — | `e2e/smoke.spec.ts` (second test block) | exact |
| `src/app/guides/m2-smoke/page.tsx` | route | — | DELETE — legacy smoke route | n/a |
| `src/content/guides/m2-smoke.mdx` | config (content) | — | DELETE — legacy MDX | n/a |

## Pattern Assignments

### `src/features/navigation/SiteHeader/index.tsx` (component, event-driven)

**Analog:** `src/features/schools/SchoolDirectory/index.tsx`

**Client directive + imports** (lines 1-5):

```tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
```

SiteHeader only needs `usePathname` + `useState` (drop router/searchParams). Add Sheet + Button + lucide imports per UI-SPEC.

**Pathname + client state pattern** (lines 40-44):

```tsx
export function SchoolDirectory({ schools }: SchoolDirectoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
```

Copy `usePathname` + `useState` for Sheet `open` state. Do **not** copy inline expand/collapse — use shadcn Sheet per UI-SPEC D-10.

**Link + methodology inline link pattern** (lines 114-116):

```tsx
<Link href="/methodology" className="font-medium text-blue-700 underline">
  Como funciona nossa pesquisa?
</Link>
```

Reuse `next/link` + Tailwind link classes for nav items. Active state uses `cn()` from `@/components/ui/utils` with exact pathname match:

```tsx
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href;
}
```

**Mobile toggle anti-pattern** (lines 137-158) — do **not** copy for primary nav:

```tsx
<button
  type="button"
  onClick={() => setMobileFiltersOpen((open) => !open)}
  className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900"
  aria-expanded={mobileFiltersOpen}
>
```

Use Sheet instead. Keep `aria-label` Portuguese copy from UI-SPEC for hamburger open/close.

**Landmark structure** (new — no analog):

```tsx
<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6">
  <Link href="/" className="text-base font-semibold text-neutral-950">
    Berlin School Guide
  </Link>
  <nav aria-label="Navegação principal" className="hidden md:flex md:gap-8">
    {/* desktop nav links */}
  </nav>
  {/* mobile Sheet trigger */}
</header>
```

---

### `src/features/navigation/SiteHeader/constants.ts` (config, transform)

**Analog:** `src/features/schools/school/constants.ts`

**Named constant export pattern** (lines 1-2):

```ts
export const evidenceCoverageVersion = "v2" as const;
```

**Nav items array** (new — extensible for Phase 6/7):

```ts
export const NAV_ITEMS = [
  { href: "/", label: "Início" },
  { href: "/schools", label: "Escolas" },
  { href: "/methodology", label: "Metodologia" },
] as const;
```

Export from `constants.ts`; import in `index.tsx`. Phase 6/7 append items here — no structural refactor.

---

### `src/features/navigation/SiteHeader/types.ts` (model, transform)

**Analog:** `src/features/schools/SchoolFilters/types.ts`

**Type-only file pattern** (lines 1-23):

```ts
import type {
  BinaryFilterValue,
  CoverageFilterValue,
  DirectoryFilterState,
  StatusFilterValue,
} from "@/features/schools/filterSchools/types";

export type FilterOptions = {
  districts: string[];
  neighbourhoods: string[];
  languages: string[];
  educationalFocus: string[];
};
```

**SiteHeader types** (new):

```ts
import type { NAV_ITEMS } from "./constants";

export type NavItem = (typeof NAV_ITEMS)[number];
export type NavItemHref = NavItem["href"];
```

---

### `src/features/navigation/SiteHeader/index.test.tsx` (test)

**Analog:** `src/features/schools/SchoolDirectory/index.test.tsx`

**next/navigation mock pattern** (lines 6-13):

```tsx
const replace = jest.fn();
let params = new URLSearchParams();

jest.mock("next/navigation", () => ({
  usePathname: () => "/schools",
  useRouter: () => ({ replace }),
  useSearchParams: () => params,
}));
```

**Adapt for SiteHeader** — only mock `usePathname` with mutable `let pathname = "/"`:

```tsx
let pathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));
```

**Link assertion pattern** (lines 51-57):

```tsx
it("links to the methodology page from the header", () => {
  render(<SchoolDirectory schools={getSchoolDirectoryItems()} />);

  expect(
    screen.getByRole("link", { name: /como funciona nossa pesquisa/i }),
  ).toHaveAttribute("href", "/methodology");
});
```

**SiteHeader test cases to copy structure:**
- Logo link → `/`
- Three nav links render with Portuguese labels
- Active class when `pathname = "/schools"` (assert `text-primary` or `font-semibold`)
- Mobile: hamburger `aria-label="Abrir menu de navegação"` opens sheet with nav links

Mock Sheet if needed, or test open via `fireEvent.click` on hamburger button.

---

### `src/features/navigation/SiteFooter/index.tsx` (component, static)

**Analog:** `src/features/guides/GuideIntro/index.tsx` (server presentational) + `SchoolDirectory` Link

**Simple server component pattern** from GuideIntro (lines 1-17):

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
```

SiteFooter: no `'use client'` — static copyright + optional link.

**Footer structure** (new — first footer in codebase):

```tsx
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 px-6 py-8">
      <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-neutral-600 sm:flex-row">
        <p>© {year} Berlin School Guide</p>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <Link href="/methodology" className="text-blue-700 underline hover:opacity-90">
          Metodologia
        </Link>
      </div>
    </footer>
  );
}
```

No trust disclaimer block (CONTEXT D-09).

---

### `src/features/navigation/SiteFooter/index.test.tsx` (test)

**Analog:** `src/features/guides/GuideIntro/index.test.tsx`

**Minimal render + role assertion** (lines 1-22):

```tsx
import { render, screen } from "@testing-library/react";

import { GuideIntro } from ".";

describe("GuideIntro", () => {
  it("renders the guide introduction content", () => {
    render(
      <GuideIntro
        eyebrow="Teste"
        title="Guia de validação"
        description="Componente mínimo para validar React Testing Library."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Guia de validação" }),
    ).toBeVisible();
```

**SiteFooter assertions:**
- `getByText(/© \d{4} Berlin School Guide/)`
- `getByRole("link", { name: "Metodologia" })` with `href="/methodology"`

---

### `src/features/home/HomeJourneyCards/index.tsx` (component, static + Link nav)

**Analog:** `src/features/schools/SchoolCard/index.tsx` (card shell) + `src/app/page.tsx` (CTA)

**Card border/padding pattern** from SchoolCard (lines 20-21):

```tsx
<article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
```

**Primary journey card** — extend with left accent per UI-SPEC:

```tsx
<article className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
  <h2 className="text-xl font-semibold">Explorar escolas</h2>
  <p className="mt-2 text-base leading-8 text-neutral-700">{/* body */}</p>
  <Button asChild className="mt-4">
    <Link href="/schools">Ver escolas em Lichtenberg</Link>
  </Button>
</article>
```

**Secondary card** — lighter surface from SchoolCard coverage block (lines 106-114):

```tsx
<div className="mt-5 rounded-md bg-neutral-50 p-3">
```

Use `rounded-lg border border-neutral-200 bg-neutral-50 p-5 md:p-6` for secondary card.

**Button + Link CTA pattern** from homepage (lines 14-18):

```tsx
<div>
  <Button asChild>
    <Link href="/schools">Ver escolas em Lichtenberg</Link>
  </Button>
</div>
```

Secondary CTA: `Button asChild variant="outline"` + `Link href="/methodology"`.

**Container** — wrap both cards in `div className="space-y-4"`.

---

### `src/features/home/HomeJourneyCards/index.test.tsx` (test)

**Analog:** `src/features/schools/SchoolCard/index.test.tsx`

**Render + heading assertion** (lines 11-23):

```tsx
describe("SchoolCard", () => {
  it("renders school summary and research coverage", () => {
    render(<SchoolCard school={getSchoolDirectoryItems()[1]} />);

    expect(
      screen.getByRole("heading", { name: "Bernhard-Grzimek-Schule" }),
    ).toBeVisible();
```

**HomeJourneyCards assertions:**
- `getByRole("heading", { name: "Explorar escolas" })`
- `getByRole("heading", { name: "Entender nossa metodologia" })`
- `getByRole("link", { name: "Ver escolas em Lichtenberg" })` → `href="/schools"`
- `getByRole("link", { name: "Como funciona nossa pesquisa" })` → `href="/methodology"`

---

### `src/components/ui/Sheet/index.tsx` (ui primitive, event-driven)

**Analog:** `src/components/ui/Button/index.tsx`

**No Sheet exists yet** — install via `pnpm dlx shadcn@latest add sheet`, then relocate to `src/components/ui/Sheet/index.tsx` per project colocation.

**Button colocation pattern to mirror** (lines 1-38):

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/components/ui/utils";

const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  { /* variants */ },
);

export function Button({ asChild = false, className, variant, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}
```

**Sheet requirements:**
- Directory: `src/components/ui/Sheet/index.tsx` (PascalCase, `index.tsx` entry)
- Import path: `@/components/ui/Sheet`
- Use `cn` from `@/components/ui/utils` (not shadcn default `@/features/guides/utils` alias)
- Export: `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetTrigger` (match CLI output)
- `components.json` aliases: `"ui": "@/components/ui"` — verify generated imports use `@/components/ui/utils`

**Usage in SiteHeader** (from RESEARCH — controlled open state):

```tsx
const [open, setOpen] = useState(false);

<Sheet open={open} onOpenChange={setOpen}>
  <Button
    variant="outline"
    aria-label="Abrir menu de navegação"
    onClick={() => setOpen(true)}
    className="md:hidden size-11"
  >
    <Menu className="size-5" />
  </Button>
  <SheetContent side="right" className="w-[280px] max-w-[85vw]">
    <SheetHeader>
      <SheetTitle>Navegação</SheetTitle>
    </SheetHeader>
    <nav aria-label="Navegação principal">
      {NAV_ITEMS.map(({ href, label }) => (
        <Link key={href} href={href} onClick={() => setOpen(false)}>
          {label}
        </Link>
      ))}
    </nav>
  </SheetContent>
</Sheet>
```

---

### `src/app/layout.tsx` (route, static build)

**Analog:** `src/app/layout.tsx` (extend in place)

**Current layout** (lines 1-22):

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Berlin School Guide",
  description:
    "Guia estático para famílias brasileiras avaliarem escolas primárias em Berlim.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

**Add chrome** — keep Server Component; import client `SiteHeader` + server `SiteFooter`:

```tsx
import { SiteFooter } from "@/features/navigation/SiteFooter";
import { SiteHeader } from "@/features/navigation/SiteHeader";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
```

Update `metadata.description` to UI-SPEC copy. Do **not** add `'use client'` to layout.

---

### `src/app/page.tsx` (route, static build)

**Analog:** `src/app/methodology/page.tsx` (thin composition) + current `src/app/page.tsx`

**Methodology page composition** (lines 1-21):

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
        description="Entenda o que significam os status de evidência..."
      />
      <MethodologyGuide />
    </main>
  );
}
```

**Homepage target shape:**

```tsx
import { GuideIntro } from "@/features/guides/GuideIntro";
import { HomeJourneyCards } from "@/features/home/HomeJourneyCards";

export const metadata = {
  title: "Berlin School Guide",
  description:
    "Guia de escolas primárias em Berlim para famílias brasileiras — com transparência sobre fontes e evidências.",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <GuideIntro
        eyebrow="Berlin School Guide"
        title="Escolas primárias em Berlim para famílias brasileiras"
        description="Informações verificadas com transparência sobre fontes, dados ausentes e limites da pesquisa — para você comparar opções com clareza."
      />
      <HomeJourneyCards />
      {/* scope note — inline or HomeScopeNote feature */}
      <p className="text-base text-neutral-600">
        <span className="font-medium">Cobertura inicial</span> — Começamos com escolas em{" "}
        <strong>Lichtenberg</strong>. Outros distritos...
      </p>
    </main>
  );
}
```

**Remove** from current page (lines 8, 14-18):
- `min-h-screen flex justify-center` centering
- Duplicate eyebrow/title ("Berlin School Guide" twice)
- Standalone single CTA div (moves into `HomeJourneyCards`)

---

### `e2e/smoke.spec.ts` (test)

**Analog:** `e2e/smoke.spec.ts` — replace first test; preserve second test block

**Stale first test to replace** (lines 3-14):

```tsx
test("renders the static home page and MDX guide", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Berlin School Guide" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Abrir página MDX" }).click();
  await expect(page).toHaveURL(/\/guides\/m2-smoke$/);
  await expect(
    page.getByRole("heading", { name: "Página MDX de validação" }),
  ).toBeVisible();
});
```

**New first test** (from RESEARCH):

```tsx
test("navigates from homepage to school directory", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Escolas primárias em Berlim para famílias brasileiras",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Ver escolas em Lichtenberg" }).click();
  await expect(page).toHaveURL(/\/schools$/);
  await expect(page.getByRole("heading", { name: "Escolas" })).toBeVisible();
});
```

**Optional second nav journey** — header link pattern from directory test (lines 16-19):

```tsx
test("searches and filters the static school directory", async ({ page }) => {
  await page.goto("/schools");
  await expect(page.getByRole("heading", { name: "Escolas" })).toBeVisible();
```

Add test: home → click header "Escolas" → `/schools` (NAV-03 alternate path).

**Preserve** second test block unchanged (directory search/filter).

---

### Deletions: `src/app/guides/m2-smoke/page.tsx` + `src/content/guides/m2-smoke.mdx`

**Analog (what to remove):** `src/app/guides/m2-smoke/page.tsx` (lines 1-13)

```tsx
import M2SmokeGuide from "@/content/guides/m2-smoke.mdx";

export const metadata = {
  title: "Página MDX de validação",
};

export default function M2SmokeGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <M2SmokeGuide />
    </main>
  );
}
```

Delete entire route directory and MDX file. Verify `pnpm build` no longer emits `/guides/m2-smoke`. Grep repo for `m2-smoke` references after deletion.

---

## Shared Patterns

### Server layout + client navigation island

**Source:** `src/app/layout.tsx` + `src/features/schools/SchoolDirectory/index.tsx`
**Apply to:** `layout.tsx`, `SiteHeader`

```tsx
// layout.tsx stays server — no "use client"
import { SiteHeader } from "@/features/navigation/SiteHeader";

<body>
  <SiteHeader />
  {children}
  <SiteFooter />
</body>
```

```tsx
// SiteHeader/index.tsx — client island
"use client";
import { usePathname } from "next/navigation";
```

### `cn()` utility for conditional classes

**Source:** `src/components/ui/utils/index.ts`
**Apply to:** `SiteHeader` active links, Sheet, any conditional Tailwind

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Button asChild + Link CTAs

**Source:** `src/app/page.tsx` + `src/components/ui/Button/index.tsx`
**Apply to:** `HomeJourneyCards`, journey card CTAs

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

<Button asChild>
  <Link href="/schools">Ver escolas em Lichtenberg</Link>
</Button>
```

### GuideIntro hero reuse

**Source:** `src/features/guides/GuideIntro/index.tsx`
**Apply to:** `src/app/page.tsx` hero section

```tsx
<GuideIntro
  eyebrow="Berlin School Guide"
  title="Escolas primárias em Berlim para famílias brasileiras"
  description="Informações verificadas com transparência..."
/>
```

Eyebrow (`text-sm font-semibold uppercase tracking-wide text-blue-700`) and h1 (`text-4xl font-semibold`) — do not duplicate strings (D-04).

### Jest `next/navigation` mock

**Source:** `src/features/schools/SchoolDirectory/index.test.tsx`
**Apply to:** `SiteHeader/index.test.tsx`

```tsx
let pathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));
```

### Page shell Tailwind contract

**Source:** `src/app/methodology/page.tsx`, `src/app/schools/page.tsx`
**Apply to:** `src/app/page.tsx` only — do not change schools/methodology shells

| Route | Main classes |
|-------|--------------|
| `/` | `mx-auto max-w-3xl space-y-12 px-6 py-12` |
| `/schools` | `mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8` (unchanged) |
| `/methodology` | `mx-auto max-w-3xl px-6 py-12 space-y-8` (unchanged) |

### shadcn ui primitive colocation

**Source:** `src/components/ui/Button/index.tsx`, `components.json`
**Apply to:** `src/components/ui/Sheet/index.tsx`

- PascalCase directory with `index.tsx`
- Import `cn` from `@/components/ui/utils`
- No flat `sheet.tsx` at `src/components/ui/` root

### Brazilian Portuguese user-facing copy

**Source:** `src/features/schools/SchoolDirectory/index.tsx` (lines 105-117)
**Apply to:** All new components — labels, aria-labels, headings per `03-UI-SPEC.md` copy contract

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `src/components/ui/Sheet/index.tsx` | ui primitive | event-driven | No drawer/overlay primitive exists yet — install from shadcn registry; follow Button colocation only |
| `src/features/navigation/SiteFooter/index.tsx` | component | static | First footer in codebase — compose from GuideIntro simplicity + Link pattern |

## Metadata

**Analog search scope:** `src/features/`, `src/app/`, `src/components/ui/`, `e2e/`
**Files scanned:** 55 feature files, 2 ui primitives, 5 app routes, 1 e2e spec
**Pattern extraction date:** 2026-07-11
