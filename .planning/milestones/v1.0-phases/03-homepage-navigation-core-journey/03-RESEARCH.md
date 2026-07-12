# Phase 3: Homepage, Navigation & Core Journey - Research

**Researched:** 2026-07-11
**Domain:** Next.js App Router shared chrome, client navigation, shadcn Sheet mobile menu, static landing page composition
**Confidence:** HIGH

## Summary

Phase 3 introduces the first cross-route UI abstraction in this brownfield static Next.js site: shared `SiteHeader`/`SiteFooter` in the root layout, a fuller homepage landing with journey cards, and m2-smoke legacy cleanup. The implementation path is well-established in the codebase — thin `src/app` pages compose feature components; client interactivity uses `next/navigation` hooks with Jest mocks; Playwright covers end-to-end journeys.

The root layout (`src/app/layout.tsx`) must remain a Server Component wrapping `<html>`/`<body>` while importing a Client Component header for `usePathname` active-link detection and mobile Sheet state. Next.js official docs explicitly recommend extracting navigation into a `'use client'` component because layouts do not re-render on navigation [CITED: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/03-file-conventions/layout.mdx]. `SiteFooter` can stay a Server Component (copyright year via `new Date().getFullYear()` is fine at build time for static export; both approaches work).

Mobile navigation should use shadcn Sheet (not the inline expand/collapse pattern used by `SchoolDirectory` mobile filters). Sheet provides focus trap, Escape-to-close, and scroll lock out of the box [CITED: https://ui.shadcn.com/docs/components/sheet]. Install via `pnpm dlx shadcn@latest add sheet` and relocate generated files to `src/components/ui/Sheet/` per project colocation (PascalCase directory, `index.tsx` entry).

**Primary recommendation:** Add `SiteHeader` (client) + `SiteFooter` (server) to root layout; expand homepage with `GuideIntro` + `HomeJourneyCards` + scope note; install shadcn Sheet for mobile nav; delete m2-smoke route/content; update e2e smoke test for home → `/schools` journey.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Global header/footer chrome | Frontend Server (SSR/static shell) | Browser (client header subtree) | Root layout composes at build time; header client subtree handles pathname + Sheet state |
| Active nav highlighting | Browser / Client | — | `usePathname()` reads current URL in client component; layout itself does not re-render [CITED: Next.js layout docs] |
| Mobile hamburger menu | Browser / Client | CDN / Static (Sheet JS bundle) | Sheet open/close is client-only interaction |
| Homepage journey cards | Frontend Server (static page) | Browser (Link navigation) | `src/app/page.tsx` server component composes static landing; CTAs use `next/link` |
| Logo → home navigation | Browser (client + server links) | — | `<Link href="/">` in header works in client component |
| m2-smoke removal | Build / Static | — | Delete route files; static export stops emitting `/guides/m2-smoke` |
| E2E navigation journey | Test runner (Playwright) | Dev server | Validates rendered static pages + client nav |

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Homepage content and layout
- **D-01:** Expand homepage to a **fuller landing page** — hero plus journey cards linking to `/schools` and `/methodology` (not the minimal single-CTA shape from Phase 1).
- **D-02:** Secondary homepage content includes a **methodology journey card** and a **short Lichtenberg scope note** (initial coverage area; more Berlin districts over time) — aligns with Phase 1 D-21 honest scope messaging.
- **D-03:** Journey card layout: **directory card visually dominant**; methodology card smaller/secondary (stacked on mobile).
- **D-04:** Homepage hero uses a **parent-facing headline** — eyebrow "Berlin School Guide" plus Portuguese title such as "Escolas primárias em Berlim para famílias brasileiras" with trust-focused subtitle (not duplicate product name as both eyebrow and title).

#### Shared navigation scope
- **D-05:** Header nav shows **live routes only**: Início (`/`), Escolas (`/schools`), Metodologia (`/methodology`). No Guias or Comparar links until Phase 6/7 deliver those routes.
- **D-06:** **Defer homepage guides link** until Phase 7 — NAV-01 guides portion satisfied later when `/guides` exists; Phase 3 homepage links to `/schools` and `/methodology` only (no dead links).
- **D-07:** **Add nav items when routes ship** — Phase 6 adds Comparar; Phase 7 adds Guias; no disabled/"Em breve" nav placeholders in Phase 3.
- **D-08:** Site logo/product name **always links to `/`** on every page.

#### Header/footer pattern
- **D-09:** Shared chrome is **header + minimal footer** — copyright line; optional methodology link in footer; no repeated trust disclaimer block (methodology page covers that).
- **D-10:** **Mobile: hamburger menu** — collapsed menu on small viewports; full horizontal nav on desktop.
- **D-11:** **Active nav item highlighted** (underline or bold) on current page.
- **D-12:** Install `SiteHeader` and `SiteFooter` in **root `src/app/layout.tsx`** wrapping all routes — single global chrome per IA goal.

#### Legacy M2 cleanup
- **D-13:** **Remove `/guides/m2-smoke` entirely** — delete route, `src/content/guides/m2-smoke.mdx`, and related page/tests; aligns with Phase 1 synthetic/M2 cleanup.
- **D-14:** **Update `e2e/smoke.spec.ts` in Phase 3** — replace homepage → m2-smoke assertion with home → `/schools` (or header nav) journey.
- **D-15:** **Keep directory inline methodology link** — global nav plus existing "Como funciona nossa pesquisa?" link in `SchoolDirectory` header (Phase 2 D-10); pages keep `GuideIntro`/page titles without duplicate nav chrome.

### Claude's Discretion

- Exact Portuguese copy for homepage sections, journey cards, and nav labels
- `SiteHeader`/`SiteFooter` component API, hamburger implementation (shadcn primitives vs minimal custom)
- Footer content beyond copyright (year, optional single methodology link)
- Homepage unit test scope for new landing sections
- Exact active-link styling (underline vs bold vs background)

### Deferred Ideas (OUT OF SCOPE)

- **Guias nav link and homepage guides card** — Phase 7 when `/guides` ships
- **Comparar nav link** — Phase 6 when `/compare` ships
- **Full e2e CI wiring** — Phase 8 release readiness (Phase 3 updates smoke spec only)
- **Disabled/"Em breve" nav placeholders** — Rejected; live routes only
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Homepage introduces the product in Portuguese and links to directory and guides | D-01–D-04 + UI-SPEC copy contract; `/schools` + `/methodology` journey cards; guides link deferred per D-06 until Phase 7 |
| NAV-02 | Shared site header/footer navigation connects home, directory, guides, comparison, and methodology | D-05/D-07/D-12: Phase 3 ships home + directory + methodology only; extensible nav config pattern for Phase 6/7 additions |
| NAV-03 | User can navigate from home to the school directory using only in-page links | Journey card CTA + header nav link + e2e smoke test; no URL typing required |
</phase_requirements>

## Project Constraints (from .cursor/rules/)

From `AGENTS.md` and `.cursor/rules/gsd.mdc` — planner must verify compliance:

- **Package manager:** pnpm only (Corepack); no npm/yarn in docs or scripts [VERIFIED: AGENTS.md]
- **Architecture:** `src/app` = routing/layout/metadata only; `src/features` = domain behavior; `src/components/ui` = shadcn primitives only [VERIFIED: AGENTS.md]
- **Colocation:** Directory-named folders with `index.tsx` / `index.test.tsx`; no repeated directory name in file names [VERIFIED: AGENTS.md]
- **Language split:** English paths/identifiers; Brazilian Portuguese user-facing copy [VERIFIED: AGENTS.md, INFORMATION_ARCHITECTURE.md]
- **Static-first:** `output: "export"` in `next.config.mjs` — no backend, auth, or production APIs [VERIFIED: next.config.mjs]
- **UI primitives:** Hand-authored shadcn-style under `src/components/ui/` (currently `Button/`, `utils/`) on Radix Slot + CVA [VERIFIED: codebase]
- **Existing nav state pattern:** `SchoolDirectory` uses `usePathname`/`useRouter`/`useSearchParams` — reuse mock pattern for header tests [VERIFIED: SchoolDirectory/index.test.tsx]

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.10 | App Router, static export, `Link`, layout | Project baseline [VERIFIED: package.json] |
| react / react-dom | 19.2.7 | UI runtime | Matches Next 16 [VERIFIED: package.json] |
| next/navigation | (bundled) | `usePathname` for active links | Official pattern for nav in layouts [CITED: Next.js layout docs] |
| lucide-react | 1.24.0 | `Menu`, `X` icons for hamburger | Installed, specified in UI-SPEC [VERIFIED: package.json] |
| shadcn Sheet | CLI add @ latest | Mobile nav drawer | UI-SPEC locked; focus trap + a11y [CITED: ui.shadcn.com/docs/components/sheet] |
| @radix-ui/react-slot | 1.3.0 | Button `asChild` for card CTAs | Existing Button primitive [VERIFIED: package.json] |
| tailwindcss | 4.3.2 | Layout, responsive `md:` breakpoint | Existing styling system [VERIFIED: package.json] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| class-variance-authority | 0.7.1 | Button variants on journey CTAs | Primary vs outline card CTAs |
| @testing-library/react | 16.3.2 | Component unit tests | SiteHeader, HomeJourneyCards |
| @playwright/test | 1.61.1 | E2E smoke | Home → schools journey |
| jest + jest-environment-jsdom | 30.4.x | Unit test runner | Colocated feature tests |

### Sheet dependency note (verify at install)

Latest shadcn docs (2026) document Sheet on **Base UI** (`@base-ui/react`) as the default for `npx shadcn@latest add sheet`, while this project's existing Button uses **Radix Slot** [CITED: https://ui.shadcn.com/docs/changelog/2026-01-base-ui]. Both are supported by shadcn with the same component API [CITED: shadcn Base UI changelog]. **Recommendation:** Run `pnpm dlx shadcn@latest add sheet` and accept whichever primitive the CLI installs; do not hand-roll a drawer. If the CLI prompts for Radix vs Base UI, either choice is acceptable — Sheet is an isolated primitive with no conflict with existing Button.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| shadcn Sheet | SchoolDirectory-style inline toggle | No focus trap, no scroll lock, worse a11y — rejected per UI-SPEC D-10 |
| Custom header in each page | Root layout chrome | Duplication; violates D-12 |
| `useSelectedLayoutSegment` | `usePathname` exact match | Overkill for flat Phase 3 routes (`/`, `/schools`, `/methodology`) |

**Installation:**

```bash
pnpm dlx shadcn@latest add sheet
```

**Version verification:** `next@16.2.10`, `lucide-react@1.24.0`, `@radix-ui/react-dialog@1.1.19` (registry latest — Sheet may depend on this or `@base-ui/react` depending on CLI) [VERIFIED: npm registry 2026-07-11]

## Architecture Patterns

### System Architecture Diagram

```text
                    ┌─────────────────────────────────────┐
                    │  Static build (next export)         │
                    │  src/app/layout.tsx (Server)        │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────▼───────────────────┐
                    │  <html lang="pt-BR">              │
                    │    <body>                         │
                    │      SiteHeader (Client)          │
                    │        ├─ Logo Link → /           │
                    │        ├─ Desktop NavLinks        │
                    │        │    usePathname → active  │
                    │        └─ Mobile Sheet menu       │
                    │      {children} ← page routes     │
                    │      SiteFooter (Server)          │
                    │    </body>                        │
                    └─────────────────┬───────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
          ▼                           ▼                           ▼
   src/app/page.tsx           src/app/schools/page.tsx    src/app/methodology/page.tsx
   (Server)                   (Server + Suspense)         (Server + MDX)
          │                           │                           │
          ▼                           ▼                           ▼
   GuideIntro                  SchoolDirectory              GuideIntro + MDX
   HomeJourneyCards            (existing, unchanged         (existing)
   Scope note                   methodology link)
          │
          ▼
   Link CTAs → /schools, /methodology
```

### Recommended Project Structure

```text
src/
├── app/
│   ├── layout.tsx              # Add SiteHeader + SiteFooter wrapper
│   ├── page.tsx                # Fuller landing (compose home features)
│   ├── schools/page.tsx        # Unchanged shell
│   └── methodology/page.tsx    # Unchanged shell
├── components/ui/
│   ├── Button/                 # existing
│   └── Sheet/                  # NEW via shadcn CLI → colocate here
│       └── index.tsx
└── features/
    ├── navigation/
    │   ├── SiteHeader/
    │   │   ├── index.tsx       # 'use client' — nav + mobile sheet
    │   │   ├── index.test.tsx
    │   │   ├── constants.ts    # nav items [{ href, label }]
    │   │   └── types.ts
    │   └── SiteFooter/
    │       ├── index.tsx       # server component
    │       └── index.test.tsx  # optional
    └── home/
        ├── HomeJourneyCards/
        │   ├── index.tsx
        │   └── index.test.tsx
        └── HomeScopeNote/        # optional split if HomeJourneyCards grows
            └── index.tsx
```

Delete on implementation:

```text
src/app/guides/m2-smoke/page.tsx
src/content/guides/m2-smoke.mdx
```

### Pattern 1: Server root layout + client navigation island

**What:** Keep `layout.tsx` as a Server Component; import `SiteHeader` marked `'use client'`.
**When to use:** Any shared chrome needing `usePathname` or interactive mobile menu.
**Example:**

```tsx
// Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/03-file-conventions/layout.mdx
// src/app/layout.tsx (Server)
import { SiteHeader } from "@/features/navigation/SiteHeader";
import { SiteFooter } from "@/features/navigation/SiteFooter";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

```tsx
// src/features/navigation/SiteHeader/index.tsx (Client)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/schools", label: "Escolas" },
  { href: "/methodology", label: "Metodologia" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  // ... desktop nav + mobile Sheet using navItems
}
```

### Pattern 2: Controlled Sheet mobile menu

**What:** `open` state on Sheet; close when nav link clicked.
**When to use:** Mobile hamburger (UI-SPEC D-10).
**Example:**

```tsx
// Source: https://ui.shadcn.com/docs/components/sheet
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";

export function MobileNav({ items, pathname }: { items: NavItem[]; pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
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
          {items.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={/* active styles per UI-SPEC */}
            >
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

### Pattern 3: Homepage composition (thin page, fat features)

**What:** `page.tsx` composes `GuideIntro`, `HomeJourneyCards`, scope note — no business logic in app layer.
**When to use:** All pages per existing architecture [VERIFIED: ARCHITECTURE.md].
**Example:**

```tsx
// src/app/page.tsx
import { GuideIntro } from "@/features/guides/GuideIntro";
import { HomeJourneyCards } from "@/features/home/HomeJourneyCards";
import { HomeScopeNote } from "@/features/home/HomeScopeNote";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <GuideIntro eyebrow="..." title="..." description="..." />
      <HomeJourneyCards />
      <HomeScopeNote />
    </main>
  );
}
```

### Pattern 4: Extensible nav config for Phase 6/7

**What:** Single `NAV_ITEMS` constant array in `SiteHeader/constants.ts`.
**When to use:** Phase 6 adds `{ href: "/compare", label: "Comparar" }`; Phase 7 adds Guias — no structural refactor.

### Anti-Patterns to Avoid

- **Putting `'use client'` on root layout:** Forces entire tree client-side; import client header instead [CITED: Next.js layout docs].
- **Prefix matching `/` for home active state:** `pathname.startsWith('/')` is always true — use exact `pathname === '/'` [VERIFIED: UI-SPEC active detection].
- **Duplicating methodology trust copy in footer:** Violates D-09; footer is copyright + optional methodology link only.
- **Adding Guias/Comparar disabled links:** Violates D-07; live routes only.
- **Keeping m2-smoke route:** Violates D-13; stale e2e will fail once homepage copy changes.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mobile slide-out menu | Custom overlay + manual focus trap | shadcn Sheet | Focus trap, Escape, scroll lock, aria [CITED: shadcn Sheet docs] |
| Active route detection | Manual window.location parsing | `usePathname()` | Next.js App Router canonical hook |
| Card CTA buttons | Raw `<a>` styled manually | `Button asChild` + `Link` | Existing project pattern [VERIFIED: page.tsx, Button] |
| Icon SVGs | Inline hamburger SVG | lucide-react `Menu`/`X` | Already installed [VERIFIED: package.json] |
| Nav item list in multiple files | Hardcoded links in header + footer + homepage | Shared constants or feature-level exports | Phase 6/7 nav expansion |

**Key insight:** Mobile navigation drawers are deceptively complex (focus management, aria-modal, scroll locking). Sheet solves this; `SchoolDirectory`'s inline filter toggle is acceptable for filters but not for primary site navigation.

## Common Pitfalls

### Pitfall 1: Stale layout pathname

**What goes wrong:** Active nav highlight doesn't update after client navigation.
**Why it happens:** Developer reads pathname in Server Component layout instead of client nav island.
**How to avoid:** `usePathname` only inside `'use client'` `SiteHeader` [CITED: Next.js layout docs].
**Warning signs:** Active state correct on full page load but wrong after `<Link>` click.

### Pitfall 2: shadcn CLI path mismatch

**What goes wrong:** CLI writes `@/components/ui/sheet.tsx` (lowercase flat file) conflicting with PascalCase colocation.
**Why it happens:** Default shadcn output vs project AGENTS.md convention.
**How to avoid:** After `pnpm dlx shadcn@latest add sheet`, move/rename to `src/components/ui/Sheet/index.tsx` and fix imports [VERIFIED: UI-SPEC Component Inventory].
**Warning signs:** Mixed `Button/` directory and `sheet.tsx` flat file under ui/.

### Pitfall 3: E2e test still references m2-smoke

**What goes wrong:** `e2e/smoke.spec.ts` first test fails — looks for "Abrir página MDX" link removed in Phase 1.
**Why it happens:** Homepage CTA changed in Phase 1; e2e not updated until Phase 3.
**How to avoid:** Rewrite test per D-14: assert hero h1, click "Ver escolas em Lichtenberg" or header "Escolas", expect `/schools` + "Escolas" heading [VERIFIED: e2e/smoke.spec.ts].
**Warning signs:** Playwright timeout on missing link text.

### Pitfall 4: Homepage hero duplicate title

**What goes wrong:** Eyebrow and h1 both say "Berlin School Guide".
**Why it happens:** Copy-paste from current `page.tsx` [VERIFIED: src/app/page.tsx lines 10-11].
**How to avoid:** Apply UI-SPEC copy: eyebrow product name, h1 parent-facing Portuguese title (D-04).
**Warning signs:** Two identical strings in hero region.

### Pitfall 5: Sticky header vs directory layout

**What goes wrong:** Header overlaps content or breaks directory sticky sidebar offset.
**Why it happens:** `sticky top-0` header changes scroll context.
**How to avoid:** Header `h-16 z-40`; directory sidebar keeps `sticky top-6` inside page main — no change needed in Phase 3 [VERIFIED: SchoolDirectory, UI-SPEC]. Revisit in Phase 5 if overlap reported.
**Warning signs:** Filter sidebar hidden under header on scroll.

## Code Examples

### Active link styling (exact pathname)

```tsx
// Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/03-file-conventions/layout.mdx
// Adapted for Phase 3 flat routes
const pathname = usePathname();

<Link
  href={href}
  className={cn(
    "text-sm font-medium text-neutral-700 hover:text-neutral-950",
    isActive(pathname, href) && "font-semibold text-primary border-b-2 border-primary",
  )}
>
  {label}
</Link>
```

### Jest mock for SiteHeader tests

```tsx
// Source: src/features/schools/SchoolDirectory/index.test.tsx [VERIFIED: codebase]
let pathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

it("highlights Escolas when pathname is /schools", () => {
  pathname = "/schools";
  render(<SiteHeader />);
  expect(screen.getByRole("link", { name: "Escolas" })).toHaveClass("text-primary");
});
```

### Playwright home → directory journey

```tsx
// Source: e2e/smoke.spec.ts pattern [VERIFIED: codebase]
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

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Minimal homepage + m2-smoke link | Fuller landing + global nav | Phase 3 (this phase) | Product navigable without typing URLs |
| Per-page chrome (none) | Root layout header/footer | Phase 3 | First shared layout abstraction |
| Inline mobile filter toggle | shadcn Sheet for primary nav | Phase 3 UI-SPEC | Better a11y for navigation drawer |
| shadcn Radix-only | shadcn supports Radix + Base UI | Jan 2026 [CITED: shadcn changelog] | Verify Sheet primitive at install |

**Deprecated/outdated:**
- `/guides/m2-smoke` route and MDX — delete in Phase 3 (D-13)
- E2e assertion for "Abrir página MDX" — replace (D-14)
- Homepage `min-h-screen flex justify-center` — replace with top-aligned landing (UI-SPEC)

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | shadcn CLI `add sheet` works with existing `components.json` without re-init | Standard Stack | Manual Sheet port from registry |
| A2 | `@base-ui/react` as Sheet dependency coexists with `@radix-ui/react-slot` Button | Standard Stack | Need Radix-specific sheet install flag |
| A3 | Exact pathname match suffices for active state (no `/schools/foo` yet) | Architecture | Phase 4 may need `startsWith` for `/schools/[slug]` — out of Phase 3 scope |

## Open Questions

1. **Sheet primitive library (Radix vs Base UI)**
   - What we know: shadcn 2026 supports both; project Button uses Radix Slot [CITED: shadcn changelog]
   - What's unclear: Which default `shadcn@latest add sheet` picks without prompt
   - Recommendation: Accept CLI default; document installed dependency in plan commit

2. **Homepage `page.test.tsx` vs feature-only tests**
   - What we know: `methodology/page.test.tsx` exists; jest excludes `src/app/**/page.tsx` from coverage collection but allows colocated tests [VERIFIED: jest.config.mjs]
   - What's unclear: Whether to test homepage at page or `HomeJourneyCards` level
   - Recommendation: Test `HomeJourneyCards` + `SiteHeader` in features; optional thin `page.test.tsx` for hero h1 integration

## Environment Availability

Step 2.6: SKIPPED (no external service dependencies — static site, local pnpm/shadcn CLI only).

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | next/jest/playwright | ✓ | (project standard) | — |
| pnpm | package scripts | ✓ | 11.11.0 [VERIFIED: package.json] | — |
| shadcn CLI | Sheet install | ✓ | via `pnpm dlx` | Manual copy from ui.shadcn.com |

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 + @testing-library/react 16.3.2 [VERIFIED: package.json] |
| Config file | `jest.config.mjs`, setup `jest.setup.ts` |
| Quick run command | `pnpm test -- --testPathPattern="navigation|HomeJourney" --no-coverage` |
| Full suite command | `pnpm test` |
| E2E command | `pnpm e2e` (Playwright 1.61.1, port 4310) [VERIFIED: playwright.config.ts] |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Homepage PT hero + journey card copy/links | unit | `pnpm test -- src/features/home/HomeJourneyCards/index.test.tsx -x` | ❌ Wave 0 |
| NAV-01 | Homepage h1 not duplicate eyebrow | unit | `pnpm test -- src/app/page.test.tsx -x` (optional) | ❌ Wave 0 |
| NAV-02 | Header renders 3 nav links + logo → `/` | unit | `pnpm test -- src/features/navigation/SiteHeader/index.test.tsx -x` | ❌ Wave 0 |
| NAV-02 | Footer copyright + methodology link | unit | `pnpm test -- src/features/navigation/SiteFooter/index.test.tsx -x` | ❌ Wave 0 |
| NAV-02 | Active nav highlight per route | unit | `pnpm test -- src/features/navigation/SiteHeader/index.test.tsx -x` | ❌ Wave 0 |
| NAV-02 | Mobile sheet opens/closes; nav accessible | unit | `pnpm test -- src/features/navigation/SiteHeader/index.test.tsx -x` | ❌ Wave 0 |
| NAV-03 | Home → `/schools` via in-page link | e2e | `pnpm e2e -- e2e/smoke.spec.ts -g "homepage"` | ❌ Wave 0 (rewrite existing) |
| NAV-03 | Header nav Escolas → directory | e2e | `pnpm e2e -- e2e/smoke.spec.ts` (add or extend) | ❌ Wave 0 |
| D-13 | m2-smoke route removed | build | `pnpm build` (no `/guides/m2-smoke` output) | ❌ Wave 0 |
| D-15 | Directory methodology link preserved | unit | `pnpm test -- src/features/schools/SchoolDirectory/index.test.tsx -x` | ✅ exists |

### Sampling Rate

- **Per task commit:** `pnpm test -- --testPathPattern="SiteHeader|HomeJourney|SiteFooter" --no-coverage`
- **Per wave merge:** `pnpm test && pnpm typecheck`
- **Phase gate:** `pnpm e2e` green before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `src/features/navigation/SiteHeader/index.test.tsx` — active links, mobile menu, aria labels
- [ ] `src/features/home/HomeJourneyCards/index.test.tsx` — CTAs to `/schools` and `/methodology`
- [ ] `src/features/navigation/SiteFooter/index.test.tsx` — copyright + optional methodology link
- [ ] `src/components/ui/Sheet/index.tsx` — install via shadcn CLI
- [ ] Rewrite `e2e/smoke.spec.ts` first test block — remove m2-smoke; assert home → schools
- [ ] Delete m2-smoke route files before e2e passes

## Security Domain

Static-export site with no auth, no user input persistence, no secrets [VERIFIED: CONCERNS.md, SECURITY.md].

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | N/A — no accounts |
| V3 Session Management | no | N/A |
| V4 Access Control | no | Public static content |
| V5 Input Validation | no | No user-submitted nav input; routes hardcoded |
| V6 Cryptography | no | N/A |

### Known Threat Patterns for {stack}

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via nav labels | Spoofing/Tampering | Static JSX copy only — no `dangerouslySetInnerHTML` in nav |
| Open redirect via `Link href` | Spoofing | Hardcoded internal paths in constants — no dynamic href from query params |
| Focus trap failure on mobile menu | Denial of service (a11y) | shadcn Sheet default focus trap [CITED: shadcn Sheet] |

## Sources

### Primary (HIGH confidence)

- `/vercel/next.js` (Context7) — root layout, `usePathname`, client NavLinks in layout
- https://ui.shadcn.com/docs/components/sheet — Sheet API, side prop, composition
- https://ui.shadcn.com/docs/changelog/2026-01-base-ui — Radix vs Base UI shadcn support
- Codebase: `src/app/layout.tsx`, `page.tsx`, `SchoolDirectory/index.tsx`, `SchoolDirectory/index.test.tsx`, `jest.config.mjs`, `playwright.config.ts`, `next.config.mjs`, `components.json`, `03-CONTEXT.md`, `03-UI-SPEC.md`

### Secondary (MEDIUM confidence)

- npm registry — package versions verified 2026-07-11
- `docs/INFORMATION_ARCHITECTURE.md` — nav labels and URL structure

### Tertiary (LOW confidence)

- None requiring validation — Sheet primitive choice (A2) flagged in Assumptions Log

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified in package.json/npm; patterns match existing codebase
- Architecture: HIGH — Next.js layout + client nav is official documented pattern; UI-SPEC provides wireframes
- Pitfalls: HIGH — m2-smoke stale e2e confirmed in repo; homepage duplicate title confirmed in `page.tsx`

**Research date:** 2026-07-11
**Valid until:** 2026-08-11 (stable stack; verify shadcn CLI output if >30 days)
