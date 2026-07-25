# Phase 11: Flagship Discovery & Release - Research

**Researched:** 2026-07-25
**Domain:** Next.js App Router content site — internal information architecture, cross-linking, MDX content, Portuguese SEO metadata, Playwright e2e (smoke/metadata/a11y)
**Confidence:** HIGH

## Summary

Phase 11 is a pure content-and-composition phase inside an already-established static Next.js 16 (App Router) codebase. There is no new library, framework, or infrastructure to introduce — every requirement (ONBD-06, DISC-01–04, REL-01–03) is satisfied by editing existing React components (`HomeJourneyCards`, `GuidesHub`, `GuideIntro`), existing route `page.tsx` files, existing MDX content files, and extending three already-established Playwright suites (`smoke.spec.ts`, `metadata.spec.ts`, `a11y.spec.ts`).

The only structural decision requiring research (per CONTEXT's "Claude's Discretion" item) is how `GuideIntro` renders a complementary line with an inline link, since its `description` prop is currently typed `string`. The lowest-friction, most idiomatic fix — verified against the current component and its 5 existing call sites — is to widen `description: string` to `description: ReactNode`. This is a one-line type change; the JSX already renders `{description}` inside a `<p>`, so passing a `<>text <Link>...</Link> text</>` fragment works without any other change. All 5 existing call sites pass plain strings today and continue to satisfy `ReactNode` unmodified, so this is non-breaking.

**Primary recommendation:** Treat this as a content/composition phase, not a new-component phase. Widen `GuideIntro`'s `description` prop to `ReactNode`, restructure `HomeJourneyCards` to exactly two cards (swap the accent class instead of adding one), reorder `GuidesHub`'s "Entenda o sistema" section to hold two stacked cards, add MDX sections/lines (not new components) for cross-links and the closing "Próximos passos" list, and extend the three existing Playwright specs plus retarget one existing Jest assertion set per component. No new dependencies, no new architectural patterns.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Homepage journey card copy/links | Frontend Server (SSR, static) | — | `HomeJourneyCards` is a plain server component rendered at build time; no client state |
| Guides hub flagship ordering/copy | Frontend Server (SSR, static) | — | `GuidesHub` is a plain server component; static JSX, no data fetching |
| GuideIntro description as linked content | Frontend Server (SSR, static) | — | Presentational component; widening prop type is a compile-time/JSX concern only |
| Cross-link copy in MDX (intros, Próximos passos, first-steps tip) | Frontend Server (SSR, static via MDX compile) | — | `@next/mdx` compiles `.mdx` files to static React at build time; links are plain `<a>`/MDX autolinks resolved by Next's static router |
| Page metadata (title/description/OG) | Frontend Server (Next.js Metadata API) | — | `export const metadata = buildPageMetadata(...)` is evaluated at build time per route segment |
| Playwright smoke/metadata/a11y coverage | Browser / Client (test runner drives real browser) | — | Playwright tests assert against rendered DOM in Chromium/WebKit/Firefox per `playwright.config.ts` |
| Accessibility (heading order, landmark nav) | Browser / Client (axe-core audits rendered DOM) | Frontend Server (semantic HTML must be correct at render) | axe-core evaluates the final DOM; the server must emit correct semantics (heading levels, landmarks) for it to pass |

No API/backend or database tier is involved — this confirms the phase stays within the project's static-first architecture constraint (AGENTS.md, `docs/DECISIONS.md`).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Homepage "start here" hierarchy**
- **D-01:** Onboarding is the primary **Start here** journey card and default entry for new families. It must communicate that understanding the German education system comes **before** comparing individual schools. Link directly to `/guides/german-education-system` (not `/guides`).
- **D-02:** School directory remains highly visible as the **second** primary action for users who already know the system or are returning to compare schools (`/schools`).
- **D-03:** Homepage presents **exactly two** journey actions: Start here → onboarding; Explore schools → directory. Remove the existing "Entender o sistema escolar" card that pointed at `/guides`. Remove the methodology homepage card. Guides hub and methodology stay discoverable via main nav and contextual cross-links — they must not compete above the fold on the homepage.
- **D-04:** Give **Start here** the stronger visual treatment (primary accent / filled CTA). Keep Explore schools highly visible but secondary (e.g. outline CTA), consistent with today's primary-vs-secondary card chrome pattern in `HomeJourneyCards`.

**Guides hub flagship layout**
- **D-05:** Keep existing hub section structure. Under **Entenda o sistema**: onboarding flagship card on top; Berlin public-school guide as complementary card below. Keep **Primeiros passos** under **Checklists práticas**.
- **D-06:** Hub roles (copy intent):
  - German education system — *Comece aqui. Entenda como funciona o sistema educacional na Alemanha antes de escolher uma escola.*
  - Berlin school system — *Depois, veja como essas regras se aplicam especificamente às escolas públicas de Berlim.*
  - First steps — *Quando estiver pronto para agir, siga o checklist prático.*
- **D-07:** Flagship (onboarding) gets stronger visual treatment on the hub; Berlin card is secondary; first-steps stays checklist-style.
- **D-08:** Retitle the Berlin guide (hub card **and** page `GuideIntro`/H1) to **Como funciona o sistema escolar público de Berlim** — emphasize Berlin's public school system (not only "escola primária"). Pairing with onboarding: Germany = start here; Berlin = how those concepts apply in practice.

**Complementary relationship copy**
- **D-09:** Short complementary statements in **both** guide intros and the corresponding hub blurbs. Concise and action-oriented — **no** separate "how these guides relate" section.
- **D-10:** Complementary lines include **inline links** to the sibling guide (recommended reading path, not only conceptual). Example framing:
  - Germany: *Este guia explica como funciona o sistema educacional alemão. Depois, veja [Como funciona o sistema escolar público de Berlim](/guides/berlin-school-system).*
  - Berlin: *Este guia mostra como o sistema funciona especificamente em Berlim. Se você ainda não conhece a estrutura do sistema educacional alemão, recomendamos começar por [Como funciona o sistema educacional na Alemanha](/guides/german-education-system).*
- **D-11:** Update **first-steps** with a small top conditional recommendation (not a prominent warning), e.g. *Novo em Berlim? Se você ainda não conhece o sistema educacional alemão, recomendamos começar pelo guia [Como funciona o sistema educacional na Alemanha](/guides/german-education-system) antes deste checklist.*
- **D-12:** **Do not** change directory intro copy. By the time someone reaches `/schools` they are in exploration mode; don't add friction telling them to read another guide first. Homepage, guides, and first-steps already establish the recommended path.

**Closing next steps (ONBD-06)**
- **D-13:** Add **Próximos passos** as the final **narrative** section, immediately **before** Glossário. Glossário remains the last section as appendix/reference — not the endpoint of the learning journey.
- **D-14:** Closing progression (three exits only — **no `/compare`**):
  1. Berlin public-school guide
  2. Explore schools (`/schools`)
  3. First steps checklist
  Compare is discovered inside the directory exploration phase, not as a separate next step from onboarding.
- **D-15:** Format as an **ordered short numbered list** (one short blurb + link each), not mini cards — avoid looking like a second homepage.

### Claude's Discretion
- Exact Portuguese wording for homepage Start here / Explore schools card titles and body (within D-01–D-04 intent)
- Exact hub blurb wording within D-06 roles; CTA button labels
- How to render linked complementary text in GuideIntro (today `description` is a plain `string` — may extend props, add a sibling paragraph, or place the line at the top of MDX)
- REL-01 metadata title/description polish for onboarding (and Berlin retitle if metadata must match); reuse `buildPageMetadata` patterns
- REL-02 / REL-03: extend existing axe + smoke/metadata Playwright patterns (homepage → onboarding journey; include `/guides/german-education-system` in a11y routes if missing)
- Whether mid-page optional "O que verificar" links need light retargeting after hub/title changes (only if tests or consistency require it)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope. `/compare` as an onboarding exit was considered and explicitly rejected (discover via directory instead).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ONBD-06 | Guide positions the site as definitive onboarding for Brazilian families, with clear next steps toward directory/comparison/guides | "Próximos passos" MDX section researched below (structure, placement before Glossário, exact existing heading conventions to match) |
| DISC-01 | Homepage prominently links to the onboarding guide as a primary journey entry | `HomeJourneyCards` current structure fully mapped; exact class/markup changes identified |
| DISC-02 | `/guides` hub positions the onboarding guide as the flagship card above other guides | `GuidesHub` current structure fully mapped; card-stacking pattern within existing `<section>` identified |
| DISC-03 | Cross-links connect onboarding ↔ berlin-school-system ↔ directory ↔ first-steps checklist | Existing MDX cross-link conventions (`[texto](/guides/...)`, "Opcional:" lines) catalogued from both MDX files; reuse same pattern |
| DISC-04 | Relationship between onboarding and berlin-school-system is explicit (complementary, not duplicate) | `GuideIntro` prop-widening approach researched; exact D-10 copy already locked in CONTEXT, only wiring needed |
| REL-01 | New guide route has Portuguese SEO metadata and passes existing metadata e2e patterns | `buildPageMetadata` signature and `metadata.spec.ts` `CORE_ROUTES` pattern fully documented below |
| REL-02 | Guide page meets accessibility basics | `a11y.spec.ts` `CORE_A11Y_ROUTES` pattern documented; existing heading/landmark structure in `GuideIntro`/MDX already correct (h1 → h2 → h3), no new landmark work needed |
| REL-03 | Playwright smoke covers homepage → onboarding guide journey | `smoke.spec.ts` existing homepage-journey test patterns documented; exact assertions to add/replace identified |
</phase_requirements>

## Standard Stack

This phase introduces **no new dependencies**. All work uses libraries already installed and locked in `package.json`.

### Core (already installed — reused, not added)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.10 | App Router pages, Metadata API, static MDX compilation | Already the project's only framework; `[VERIFIED: package.json]` |
| @next/mdx / @mdx-js/react | 16.2.10 / 3.1.1 | Compiles `.mdx` guide content to static React | Already used for all 3 guide MDX files; `[VERIFIED: package.json, src/content/guides/*.mdx]` |
| react | 19.2.7 | Component model | `[VERIFIED: package.json]` |
| @playwright/test | 1.61.1 | e2e smoke/metadata/a11y suites | Already the only e2e runner; config at `playwright.config.ts` / `playwright.ci.config.ts`; `[VERIFIED: package.json, e2e/*.spec.ts]` |
| @axe-core/playwright | 4.10.2 | Accessibility audits in `a11y.spec.ts` | Already wired via `e2e/a11y-utils.ts::expectNoAccessibilityViolations`; `[VERIFIED: e2e/a11y-utils.ts]` |
| jest / @testing-library/react | 30.4.2 / 16.3.2 | Unit tests for components and pages | Already the project's only unit test stack; `[VERIFIED: package.json]` |

### Supporting
None needed — no new supporting libraries.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Widening `GuideIntro.description` to `ReactNode` | A new `complementary` prop rendered as a second `<p>` | Adds a prop and a second paragraph markup decision (spacing, tag) for what CONTEXT frames as a single sentence continuing the description; widening the existing prop is strictly simpler and matches the "concise, no separate section" intent (D-09) |
| Widening `GuideIntro.description` to `ReactNode` | Placing the complementary line only in MDX (top of `.mdx` file) | Works for guide *body* content, but `GuideIntro` renders the H1 + description **above** the MDX import in every guide page (see `src/app/guides/*/page.tsx`); D-09 explicitly says the complementary line belongs in "guide intros" (the `GuideIntro` component), not buried after the H1 inside MDX — string-in-MDX would visually detach it from the intro paragraph it should extend |
| New numbered-list component for "Próximos passos" | Reuse plain Markdown ordered list (`1.`, `2.`, `3.`) in MDX | D-15 explicitly asks for "ordered short numbered list... not mini cards" — a plain MDX ordered list renders as a semantic `<ol>` with no new component needed; matches existing MDX prose patterns used throughout both guide files (see "O que verificar" bullet lists) |

**Installation:** None required — no `pnpm add` needed for this phase.

**Version verification:** All versions above were read directly from the repository's own `package.json` — no registry lookup needed since no new/upgraded packages are introduced. `[VERIFIED: package.json]`

## Architecture Patterns

### System Architecture Diagram

```
Build time (next build / next dev):
  src/content/guides/*.mdx  ──(@next/mdx compile)──▶  Static React modules
                                                             │
  src/app/**/page.tsx  ──imports──▶  GuideIntro, GuidesHub,  │
                                      HomeJourneyCards, *.mdx │
                       ──exports──▶  metadata (buildPageMetadata) 
                                                             │
                                                             ▼
                                            Static HTML pages emitted
                                            (/, /guides, /guides/german-education-system,
                                             /guides/berlin-school-system, /guides/first-steps)

Request time (browsing the static site):
  Homepage (/)
    └─▶ HomeJourneyCards: "Start here" (primary CTA) ──▶ /guides/german-education-system
    └─▶ HomeJourneyCards: "Explore schools" (secondary CTA) ──▶ /schools

  /guides/german-education-system (onboarding, flagship)
    └─▶ GuideIntro description ──inline link──▶ /guides/berlin-school-system
    └─▶ MDX body cross-links (existing "Opcional:" lines) ──▶ /schools, /guides/first-steps
    └─▶ NEW "Próximos passos" (ordered list, before Glossário)
          1 ──▶ /guides/berlin-school-system
          2 ──▶ /schools
          3 ──▶ /guides/first-steps
    └─▶ Glossário (unchanged, last section)

  /guides (hub)
    └─▶ "Entenda o sistema" section
          ├─ card 1 (flagship, primary accent) ──▶ /guides/german-education-system
          └─ card 2 (secondary) ──▶ /guides/berlin-school-system
    └─▶ "Checklists práticas" section
          └─ card (unchanged) ──▶ /guides/first-steps

  /guides/berlin-school-system
    └─▶ GuideIntro title retitled: "Como funciona o sistema escolar público de Berlim"
    └─▶ GuideIntro description ──inline link──▶ /guides/german-education-system (conditional recommendation)

  /guides/first-steps
    └─▶ MDX top conditional tip ──inline link──▶ /guides/german-education-system

  /schools (directory) — UNCHANGED (D-12: no intro copy change)

Playwright e2e (browser-driven, post-build):
  smoke.spec.ts    ──▶ asserts homepage → onboarding CTA → onboarding H1 (REL-03)
  metadata.spec.ts ──▶ asserts title/canonical/OG/twitter on each CORE_ROUTES entry incl. onboarding (REL-01)
  a11y.spec.ts     ──▶ runs axe on each CORE_A11Y_ROUTES entry incl. onboarding (REL-02)
```

### Recommended Project Structure

No new directories. All work happens inside existing files:

```
src/
├── features/
│   ├── home/HomeJourneyCards/
│   │   ├── index.tsx        # restructure to 2 cards, swap accent to onboarding card
│   │   └── index.test.tsx   # rewrite assertions for 2-card structure
│   └── guides/
│       ├── GuidesHub/
│       │   ├── index.tsx        # stack onboarding (flagship) + berlin (secondary) under "Entenda o sistema"
│       │   └── index.test.tsx   # add assertions for onboarding card + link
│       └── GuideIntro/
│           ├── index.tsx        # widen description: string -> ReactNode
│           └── index.test.tsx   # existing string-based test stays valid; add ReactNode-with-link test
├── app/
│   ├── page.tsx                        # update metadata? no (title unchanged); HomeJourneyCards already wired
│   ├── page.test.tsx                   # update journey-card link assertions
│   └── guides/
│       ├── page.tsx                    # no structural change; GuidesHub does the work
│       ├── page.test.tsx               # add assertion for onboarding flagship link
│       ├── berlin-school-system/
│       │   ├── page.tsx                # retitle H1 + metadata title; widen GuideIntro description w/ link
│       │   └── page.test.tsx           # update heading name assertion
│       ├── german-education-system/
│       │   └── page.tsx                # widen GuideIntro description w/ link to Berlin guide
│       └── first-steps/
│           └── page.tsx                # unchanged (tip goes into MDX per D-11)
└── content/guides/
    ├── german-education-system.mdx     # insert "Próximos passos" ordered list before "## Glossário"
    ├── berlin-school-system.mdx        # optional: light cross-link tweak only if D-10 needs it here too
    └── first-steps.mdx                 # insert top conditional tip line (D-11) with inline link

e2e/
├── smoke.spec.ts       # add/replace homepage → onboarding assertions; update "Ver guias para famílias" removal
├── metadata.spec.ts     # add /guides/german-education-system to CORE_ROUTES
└── a11y.spec.ts         # add /guides/german-education-system to CORE_A11Y_ROUTES (currently missing)
```

### Pattern 1: Widening a presentational prop from `string` to `ReactNode` for inline links

**What:** Change `GuideIntroProps.description` from `string` to `ReactNode` so callers can pass JSX containing a `next/link` `<Link>` inline.
**When to use:** When a component already renders `{prop}` directly inside JSX (not inside an attribute, not passed to `.length`/string methods) and callers need rich inline content.
**Example:**
```tsx
// Source: current component at src/features/guides/GuideIntro/index.tsx (verified by direct read)
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
Caller usage (onboarding page), matching the D-10 example copy:
```tsx
// Source: pattern derived from src/app/guides/german-education-system/page.tsx (verified by direct read)
import Link from "next/link";

<GuideIntro
  eyebrow="Berlin School Guide"
  title="Como funciona o sistema educacional na Alemanha"
  description={
    <>
      Um panorama visual da jornada escolar — do Kita à universidade — com as
      diferenças de Berlim destacadas ao longo do caminho. Depois, veja{" "}
      <Link href="/guides/berlin-school-system" className="underline">
        Como funciona o sistema escolar público de Berlim
      </Link>
      .
    </>
  }
/>
```

### Pattern 2: Two-tier card chrome (primary vs. secondary) already established in `HomeJourneyCards`

**What:** The codebase already has a primary/secondary visual chrome pattern: primary card = `border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8` + default (filled) `Button`; secondary card = `border border-neutral-200 bg-neutral-50 p-5 md:p-6` + `Button variant="outline"`.
**When to use:** Reuse verbatim for the reordered homepage cards — just move the primary chrome from "Explorar escolas" to the new "Start here" (onboarding) card, and apply the secondary chrome to "Explore schools" (directory).
**Example:**
```tsx
// Source: current src/features/home/HomeJourneyCards/index.tsx (verified by direct read), restructured to 2 cards per D-01–D-04
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HomeJourneyCards() {
  return (
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
          Já conhece o sistema ou está comparando opções? Veja escolas
          primárias em Lichtenberg com status de evidência em cada informação.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/schools">Ver escolas em Lichtenberg</Link>
        </Button>
      </article>
    </div>
  );
}
```
(Exact Portuguese copy is Claude's Discretion per CONTEXT; the structural/chrome pattern above is the researched, reusable part.)

### Pattern 3: Hub section card-stacking (flagship above secondary within one `<section>`)

**What:** `GuidesHub`'s existing "Entenda o sistema" `<section>` currently holds a single `<article>` card. DISC-02/D-05 requires stacking two `<article>` cards inside that same section — flagship (onboarding, primary chrome) on top, Berlin (secondary chrome) below — mirroring the exact two-tier chrome pattern from Pattern 2.
**When to use:** Any time a hub section needs to promote one card above siblings without introducing new section-level structure (Phase 7 D-16 precedent: "hub scales by category without redesign" — reuse the section, add cards, don't add new abstractions).
**Example:**
```tsx
// Source: pattern derived from src/features/guides/GuidesHub/index.tsx (verified by direct read)
<section aria-labelledby="guides-system-heading">
  <h2 id="guides-system-heading" className="text-lg font-semibold text-neutral-950">
    Entenda o sistema
  </h2>

  {/* Flagship: onboarding — primary chrome */}
  <article className="mt-4 rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-white p-6 md:p-8">
    <h3 className="text-xl font-semibold">Sistema educacional na Alemanha</h3>
    <p className="mt-2 text-base leading-8 text-neutral-700">
      Comece aqui. Entenda como funciona o sistema educacional na Alemanha
      antes de escolher uma escola.
    </p>
    <Button asChild className="mt-4">
      <Link href="/guides/german-education-system">Ler guia do sistema educacional</Link>
    </Button>
  </article>

  {/* Secondary: Berlin — secondary chrome */}
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
Note: the existing test `screen.getByRole("link", { name: "Ler guia do sistema escolar" })` (in `GuidesHub/index.test.tsx`, `page.test.tsx` for `/guides`, and `smoke.spec.ts`) currently targets the Berlin card's CTA. Keep that exact label on the Berlin card's button (as shown above) so those 3 existing assertions keep passing unmodified, and add a **new** assertion for the onboarding flagship card's new CTA label.

### Pattern 4: MDX ordered list as a narrative closing section (no new component)

**What:** `Próximos passos` (D-13–D-15) is a plain MDX `##` heading followed by a lead sentence and a Markdown ordered list (`1.`, `2.`, `3.`), each item one short blurb + inline link — identical mechanics to the existing "O que verificar" bullet lists already used throughout `german-education-system.mdx`.
**When to use:** Any narrative closing/next-steps block in guide MDX that must NOT look like a card grid (D-15 explicit anti-goal).
**Example:**
```markdown
<!-- Source: pattern derived from src/content/guides/german-education-system.mdx (verified by direct read); inserted immediately before "## Glossário" -->
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
This renders as a semantic `<h2>` + `<p>` + `<ol><li>` — axe-clean by construction (ordered lists have no accessibility requirements beyond correct nesting, which MDX/remark produces automatically). `[VERIFIED: existing MDX files already produce clean axe results per CORE_A11Y_ROUTES including /guides/berlin-school-system]`

### Anti-Patterns to Avoid
- **Building a new "NextSteps" or "RelatedGuides" card component:** D-15 explicitly rejects a mini-card look for Próximos passos, and D-09 explicitly rejects a separate "how these guides relate" section/component. Both requirements are satisfied by plain MDX prose/list and a widened existing prop — introducing a new component here would violate AGENTS.md's "avoid generic utilities... until at least two concrete use cases exist" and add UI surface the phase does not need.
- **Changing `/schools` (directory) intro copy:** D-12 explicitly locks this out. Do not add "read the guide first" friction to `SchoolDirectory`/directory page copy.
- **Adding `/compare` to the onboarding closing list:** D-14 explicitly excludes it. Only 3 exits: Berlin guide, `/schools`, first-steps.
- **Retargeting the homepage's removed cards' hrefs to hide them (`display: none`) instead of deleting them:** D-03 says "remove" — delete the JSX for the `/guides` and `/methodology` homepage cards entirely, don't hide them, since hidden dead markup would still ship in the static HTML and could confuse a11y tooling (hidden-but-focusable links) or leave stale test hooks.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rich/linked description text in a component | A markdown-parsing helper or `dangerouslySetInnerHTML` for embedding a link in `description` | Widen prop type to `ReactNode` and pass JSX with `next/link` directly from the caller | Zero new code, zero XSS surface, full type safety, and `next/link` gets prefetching/client-nav for free |
| Ordered next-steps list | A new list/stepper UI component | Plain MDX Markdown ordered list (`1.`, `2.`, `3.`) | MDX already renders semantic `<ol>`; matches D-15's explicit "not mini cards" requirement and existing MDX prose conventions in the same files |
| SEO/OG metadata per route | Hand-rolled `<Head>` tags or ad hoc metadata objects | `buildPageMetadata({ title, description, path })` from `@/features/siteMetadata` | Already the sole metadata builder for every route in the app (verified across `page.tsx` for `/`, `/guides`, `/guides/berlin-school-system`, `/guides/first-steps`, `/guides/german-education-system`); guarantees canonical URL, OG, and Twitter card consistency and pt_BR locale automatically |
| Accessibility testing per new/changed route | Manual accessibility review only | Add the route to `CORE_A11Y_ROUTES` in `e2e/a11y.spec.ts`, reusing `expectNoAccessibilityViolations` (axe-core) | Already the project's only automated a11y gate; `/guides/german-education-system` is verifiably **absent** from `CORE_A11Y_ROUTES` today — this is a real gap REL-02 must close |

**Key insight:** Every "Don't Hand-Roll" item in this phase already has a load-bearing existing solution in the codebase. The research task here was locating exactly where each fits, not evaluating third-party alternatives.

## Common Pitfalls

### Pitfall 1: Breaking existing Jest/Playwright assertions that hardcode current copy/link labels
**What goes wrong:** `HomeJourneyCards/index.test.tsx`, `app/page.test.tsx`, and `e2e/smoke.spec.ts` all assert on the exact link name `"Ver guias para famílias"` (→ `/guides`) and `"Como funciona nossa pesquisa"` (→ `/methodology`), which D-03 requires removing from the homepage entirely.
**Why it happens:** These tests were written for the current 3-card homepage before Phase 11 existed; they will fail the moment the cards are removed, and if not updated in the same change, CI/local test runs will show false regressions unrelated to a code bug.
**How to avoid:** Update these three test files in the same task/commit as the `HomeJourneyCards` change: remove assertions for the deleted cards' links/headings, add new assertions for "Start here" → `/guides/german-education-system` and the renamed "Explore schools" → `/schools` labels (exact new labels are Claude's Discretion; keep test and component labels in lockstep).
**Warning signs:** `pnpm test` failures in `HomeJourneyCards`, `HomePage`, and `pnpm e2e` failures in `smoke.spec.ts`'s "navigates from homepage journey card to guides hub" test immediately after touching `HomeJourneyCards`.

### Pitfall 2: `GuidesHub`'s "Ler guia do sistema escolar" label collision between two cards
**What goes wrong:** The onboarding flagship card and the Berlin secondary card both plausibly want a CTA like "Ler guia..." — if both cards end up with the same accessible link name, `getByRole("link", { name: ... })` in three different test files (`GuidesHub/index.test.tsx`, `app/guides/page.test.tsx`, `e2e/smoke.spec.ts`) becomes ambiguous (Testing Library throws on multiple matches) or accidentally passes for the wrong card.
**Why it happens:** Both existing tests currently query by the CTA button label alone, not scoped to a specific `<article>`, because today there is only one system card.
**How to avoid:** Keep the Berlin card's CTA label exactly `"Ler guia do sistema escolar"` (unchanged) since 3 existing tests hardcode it, and give the new onboarding flagship card a **distinct** CTA label (e.g. "Ler guia do sistema educacional" or similar — Claude's Discretion, just must differ from the Berlin label).
**Warning signs:** Playwright/Jest errors like "Found multiple elements with the role 'link' and name ...".

### Pitfall 3: `metadata.spec.ts`/`a11y.spec.ts` iterate fixed route arrays — new routes must be added explicitly, not inferred
**What goes wrong:** `CORE_ROUTES` (metadata.spec.ts) and `CORE_A11Y_ROUTES` (a11y.spec.ts) are hardcoded arrays. `/guides/german-education-system` is present in neither today. REL-01/REL-02 will silently be "unverified by e2e" if these arrays aren't updated, even though the route itself works.
**Why it happens:** These suites were written before the onboarding route existed as a discovery target; nothing auto-discovers new routes.
**How to avoid:** Explicitly add `{ path: "/guides/german-education-system", title: /.../i }` to `CORE_ROUTES` and `"/guides/german-education-system"` to `CORE_A11Y_ROUTES`. Also decide whether `/guides/berlin-school-system`'s title regex in `metadata.spec.ts` needs updating if its `<title>` changes for the D-08 retitle (it is currently only in `CORE_A11Y_ROUTES`, not `CORE_ROUTES` — confirm whether REL-01 wording implies it should be added there too, or whether existing coverage of `/guides` hub is sufficient).
**Warning signs:** REL-01/REL-02 success criteria appear "done" by manual QA but have zero automated regression coverage; a future refactor could silently break onboarding metadata/a11y without any test failing.

### Pitfall 4: MDX `##` headings must slugify uniquely and match any existing anchor-linking to avoid ID collisions
**What goes wrong:** `german-education-system.mdx` already has anchor-based cross-references (`#ganztag`, `#os-caminhos-possiveis`, GlossaryTerm anchors like `#kita`). Adding a new `## Próximos passos` heading is safe (no collision, no existing anchor targets it), but if the exact heading text or ordering is changed later without checking, remark's auto-slugify (kebab-case) could theoretically collide with a future heading. No collision exists today for "Próximos passos" — confirmed by reading the full MDX file.
**Why it happens:** Remark/rehype auto-generates heading `id`s from text; MDX files in this project rely on this for both TOC-style H2 anchors and inline `[texto](#anchor)` links elsewhere in the same file (e.g., `#ganztag`).
**How to avoid:** Use a heading text that doesn't collide with existing `##`/`###` headings in the same file (`Antes da escola`, `Ensino primário`, `Depois da 6ª série`, `Os caminhos possíveis`, `Formação profissional`, `Ensino superior`, `Glossário` — "Próximos passos" is safely distinct).
**Warning signs:** None expected for this specific insertion, but worth a final visual check of rendered heading IDs after the change if any other in-page anchor links are added later.

### Pitfall 5: `page.test.tsx` for `berlin-school-system` mocks the MDX module and only asserts H1/H2 text — retitle must update both the page H1 assertion AND remain consistent with the hub card title
**What goes wrong:** `src/app/guides/berlin-school-system/page.test.tsx` currently asserts `/como funciona a escola primária em berlim/i` (case-insensitive substring via regex) for the H1. D-08 requires retitling to "Como funciona o sistema escolar público de Berlim" — the regex will fail after retitling because "escola primária" no longer appears in the new title.
**Why it happens:** Test regex hardcodes the *current* title text.
**How to avoid:** Update the regex/assertion in `page.test.tsx` in the same change as the `page.tsx` title/GuideIntro edit. Also check `e2e/smoke.spec.ts` line asserting `getByRole("heading", { name: "Como funciona a escola primária em Berlim", level: 1 })` — this **must** be updated too, or the "navigates to guides hub and system guide via header nav" smoke test will fail post-retitle.
**Warning signs:** `pnpm test` failure in `BerlinSchoolSystemPage` describe block; `pnpm e2e` failure in the "navigates to guides hub and system guide via header nav" smoke test.

## Code Examples

### Extending `CORE_ROUTES` in metadata.spec.ts (REL-01)
```typescript
// Source: pattern derived from e2e/metadata.spec.ts (verified by direct read)
const CORE_ROUTES = [
  { path: "/", title: /Escolas primárias em Berlim para famílias brasileiras/i },
  { path: "/schools", title: /Escolas/i },
  { path: "/compare", title: /Comparar/i },
  { path: "/guides", title: /Guias/i },
  {
    path: "/guides/german-education-system",
    title: /Sistema educacional alemão|Como funciona o sistema educacional/i,
  },
  { path: "/methodology", title: /Metodologia|Como funciona nossa pesquisa/i },
];
```

### Extending `CORE_A11Y_ROUTES` in a11y.spec.ts (REL-02)
```typescript
// Source: pattern derived from e2e/a11y.spec.ts (verified by direct read)
const CORE_A11Y_ROUTES = [
  "/",
  "/schools",
  "/schools/lew-tolstoi-schule",
  "/compare?schools=lew-tolstoi-schule,adam-ries-schule",
  "/guides",
  "/guides/berlin-school-system",
  "/guides/german-education-system", // NEW — closes REL-02 gap
  "/methodology",
];
```

### Extending smoke.spec.ts for homepage → onboarding journey (REL-03)
```typescript
// Source: pattern derived from e2e/smoke.spec.ts (verified by direct read)
test("navigates from homepage to onboarding guide via start-here CTA", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Escolas primárias em Berlim para famílias brasileiras",
    }),
  ).toBeVisible();

  // Exact CTA label is Claude's Discretion; must match HomeJourneyCards' new primary card
  await page.getByRole("link", { name: /* new "Start here" CTA label */ "" }).click();
  await expect(page).toHaveURL(/\/guides\/german-education-system$/);
  await expect(
    page.getByRole("heading", {
      name: "Como funciona o sistema educacional na Alemanha",
      level: 1,
    }),
  ).toBeVisible();
});
```
Note: the existing test `"navigates from homepage journey card to guides hub"` (asserting `"Ver guias para famílias"` → `/guides`) must be **removed or rewritten**, not left in place, since that card no longer exists on the homepage per D-03.

## State of the Art

Not applicable in the traditional sense (no external library/framework version drift to track). The only "old → current" shift is internal to this codebase's own information architecture:

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Homepage: 3 cards (schools primary, guides hub secondary, methodology secondary) | Homepage: 2 cards (onboarding primary "Start here", schools secondary "Explore") | Phase 11 (this phase) | `/guides` and `/methodology` homepage entry points removed; still reachable via header/footer nav |
| Guides hub: Berlin guide as sole primary "Entenda o sistema" card | Guides hub: onboarding flagship card + Berlin secondary card stacked in same section | Phase 11 (this phase) | Onboarding becomes the hub's recommended first read; Berlin repositioned as the practical-application follow-up |
| Berlin guide title: "Como funciona a escola primária em Berlim" | Retitled: "Como funciona o sistema escolar público de Berlim" | Phase 11 (this phase) | Emphasizes "public school system" over narrowly "primary school"; must be updated in hub card, page H1, and any test asserting the old string |

**Deprecated/outdated:** N/A — no library deprecations relevant to this phase.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The Berlin guide's retitle (D-08) does NOT need a `metadata.spec.ts` `CORE_ROUTES` entry update, since `/guides/berlin-school-system` is not currently in `CORE_ROUTES` (only in `CORE_A11Y_ROUTES`) — but its page `<title>` metadata (`buildPageMetadata({ title: "Sistema escolar primário em Berlim", ... })`) may need updating for consistency with the new H1, even without an e2e assertion forcing it. | Pitfall 3, Phase Requirements REL-01 | Low — if the planner decides the `<title>` metadata should also change to match the H1 retitle, that's a one-line edit in `berlin-school-system/page.tsx`'s `buildPageMetadata` call; no test currently locks the old title string in `metadata.spec.ts`, so this is a copy-consistency decision, not a test-breaking one. Flagging so planning explicitly decides rather than leaving it inconsistent. |
| A2 | Exact new CTA button labels for the homepage cards and the onboarding hub flagship card are safe to choose freely (Claude's Discretion) as long as they stay distinct from `"Ler guia do sistema escolar"` (Berlin, must stay unchanged) and are wired consistently between component and all referencing tests. | Pitfall 2, Pattern 2/3 examples | Low — these are presentational copy choices explicitly delegated to Claude's Discretion in CONTEXT; risk is purely a matter of internal consistency between the component and its tests, not a product/scope risk. |

**If this table is empty:** N/A — 2 assumptions logged above, both low-risk internal-consistency items already flagged for explicit planner decision, not scope-affecting.

## Open Questions

1. **Should `/guides/berlin-school-system`'s `<title>` metadata (not just H1) be updated to match the D-08 retitle?**
   - What we know: The page's `buildPageMetadata({ title: "Sistema escolar primário em Berlim", ... })` call is independent of the `GuideIntro` H1 prop; D-08 only explicitly mandates retitling "the Berlin guide (hub card **and** page `GuideIntro`/H1)".
   - What's unclear: Whether REL-01 ("Page metadata... is distinct and in Portuguese") implies the `<title>` tag should also reflect "sistema escolar público" wording for consistency, or whether the current title remains acceptable since it's not explicitly named in D-08.
   - Recommendation: Planner should default to updating the metadata title/description together with the H1 for editorial consistency (low cost, one-line change, no test currently pins the old string), unless the user's discussion intent was narrower.

2. **Does the Berlin guide's own intro need a reciprocal complementary line (D-09 says "both guide intros"), and should it be a *conditional* recommendation (matching D-10's Berlin example, which is conditional: "Se você ainda não conhece...") or unconditional?**
   - What we know: CONTEXT's D-10 example for the Berlin guide is explicitly conditional in phrasing ("Se você ainda não conhece a estrutura do sistema educacional alemão, recomendamos começar por...").
   - What's unclear: Nothing structurally — the example copy is already given verbatim in CONTEXT D-10. This is flagged only so the planner copies the CONTEXT example text (or a light edit of it) rather than re-deriving new wording, since D-10 already provides locked example copy for both guides.
   - Recommendation: Use the CONTEXT D-10 example copy directly (light editorial polish allowed per `docs/EDITORIAL_GUIDE.md` tone rules), wired through the widened `GuideIntro.description: ReactNode` prop (Pattern 1).

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified — this phase only edits existing React/MDX/Playwright code already present and configured in the repository; no new CLI tools, services, or runtimes are required).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 (unit/component) + Playwright 1.61.1 (e2e) |
| Config file | `jest.config.*` (root) for unit tests; `playwright.config.ts` / `playwright.ci.config.ts` for e2e |
| Quick run command | `pnpm test -- --testPathPattern="HomeJourneyCards|GuidesHub|GuideIntro|guides/page|berlin-school-system|first-steps|app/page"` |
| Full suite command | `pnpm test && pnpm e2e` (or `pnpm e2e:ci` in CI) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DISC-01 | Homepage shows exactly 2 journey cards; "Start here" links to `/guides/german-education-system` with primary chrome | unit | `pnpm test -- src/features/home/HomeJourneyCards/index.test.tsx` | ✅ (rewrite existing) |
| DISC-01 | Homepage journey CTAs render correctly at page level | unit | `pnpm test -- src/app/page.test.tsx` | ✅ (rewrite existing) |
| DISC-01 / REL-03 | User can click from homepage to onboarding guide and see its H1 | e2e (smoke) | `pnpm e2e -- e2e/smoke.spec.ts` | ✅ (add new test, remove/replace guides-hub-via-card test) |
| DISC-02 | `/guides` hub shows onboarding flagship above Berlin card in "Entenda o sistema" | unit | `pnpm test -- src/features/guides/GuidesHub/index.test.tsx` | ✅ (extend existing) |
| DISC-02 | `/guides` page renders hub with flagship link | unit | `pnpm test -- src/app/guides/page.test.tsx` | ✅ (extend existing) |
| DISC-03 / DISC-04 | Onboarding intro links to Berlin guide; Berlin intro links to onboarding | unit | `pnpm test -- src/features/guides/GuideIntro/index.test.tsx` (add ReactNode-with-link case) | ✅ (extend existing) |
| DISC-03 | Onboarding MDX "Próximos passos" links to Berlin guide, `/schools`, first-steps | manual + e2e (smoke can assert link presence) | `pnpm e2e -- e2e/smoke.spec.ts` (add assertion or new test for onboarding closing links) | ⚠️ new assertions needed |
| DISC-04 | Berlin H1/hub card retitled to "Como funciona o sistema escolar público de Berlim" | unit | `pnpm test -- src/app/guides/berlin-school-system/page.test.tsx` (update regex) | ✅ (update existing) |
| ONBD-06 | Onboarding MDX has "Próximos passos" section immediately before "Glossário" with 3 links, no `/compare` | manual (MDX structural check) + optional unit test on rendered MDX headings order | N/A (MDX content correctness is best verified via smoke e2e + visual/editorial review, consistent with how Phase 9/10 validated MDX content) | N/A — no MDX-content-order unit test convention exists in this codebase today |
| REL-01 | `/guides/german-education-system` has distinct Portuguese title/description/OG passing metadata pattern | e2e | `pnpm e2e -- e2e/metadata.spec.ts` (add to `CORE_ROUTES`) | ⚠️ Wave 0 gap — route missing from array today |
| REL-02 | `/guides/german-education-system` passes axe accessibility checks | e2e | `pnpm e2e -- e2e/a11y.spec.ts` (add to `CORE_A11Y_ROUTES`) | ⚠️ Wave 0 gap — route missing from array today |
| REL-03 | Playwright smoke covers homepage → onboarding guide journey | e2e | `pnpm e2e -- e2e/smoke.spec.ts` | ⚠️ Wave 0 gap — no such test exists today (only homepage → `/guides` hub) |

### Sampling Rate
- **Per task commit:** run the specific unit test file(s) touched (e.g. `pnpm test -- src/features/home/HomeJourneyCards`) — completes in seconds.
- **Per wave merge:** `pnpm test` (full Jest suite) to catch cross-file regressions (e.g. shared `GuideIntro` prop-type change affecting other call sites).
- **Phase gate:** `pnpm test && pnpm e2e:ci` full green before `/gsd-verify-work`, since REL-01/02/03 are only verifiable end-to-end via Playwright against a real build.

### Wave 0 Gaps
- [ ] `e2e/metadata.spec.ts` — add `/guides/german-education-system` to `CORE_ROUTES` (closes REL-01 automated coverage gap)
- [ ] `e2e/a11y.spec.ts` — add `/guides/german-education-system` to `CORE_A11Y_ROUTES` (closes REL-02 automated coverage gap)
- [ ] `e2e/smoke.spec.ts` — add homepage → onboarding-guide journey test; remove or rewrite the now-invalid "navigates from homepage journey card to guides hub" test (closes REL-03 gap, and prevents a guaranteed-failing test from lingering)
- [ ] No new test framework or config needed — Jest and Playwright are already fully configured.

## Security Domain

`security_enforcement` is not present in `.planning/config.json`; per default-enabled policy this section is included, but this phase has effectively no security surface: it is presentational copy, static MDX content, and static route metadata with zero user input, zero authentication, zero data persistence, and zero new external calls.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Site has no auth (static content site, confirmed by AGENTS.md: no accounts/auth for V1) |
| V3 Session Management | No | No sessions used or introduced |
| V4 Access Control | No | All routes are public static pages; no access-controlled resources |
| V5 Input Validation | No | This phase adds zero forms/inputs; all changes are static JSX/MDX authored by the developer, not user-supplied |
| V6 Cryptography | No | Not applicable — no secrets, tokens, or crypto operations touched |

### Known Threat Patterns for {stack}

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via unsanitized HTML injection when widening `description` to accept rich content | Tampering / Elevation of Privilege (if ever fed untrusted input) | Not a risk here: `description` is passed as **JSX** (`ReactNode`) authored directly in trusted `page.tsx` source files, not as an HTML string parsed via `dangerouslySetInnerHTML`. React's JSX rendering auto-escapes text nodes; only structured `next/link`/`<>` elements are ever passed. No developer should introduce `dangerouslySetInnerHTML` to implement this — explicitly called out in "Don't Hand-Roll" above. |
| Open redirect via cross-links | Tampering | Not applicable — all new links (`/guides/berlin-school-system`, `/schools`, `/guides/first-steps`, `/guides/german-education-system`) are internal relative paths hardcoded in source, not derived from user input or query parameters. |

## Sources

### Primary (HIGH confidence)
- Direct file reads (this session) — `package.json`, `src/features/home/HomeJourneyCards/index.tsx` + test, `src/features/guides/GuidesHub/index.tsx` + test, `src/features/guides/GuideIntro/index.tsx` + test, `src/app/page.tsx` + test, `src/app/guides/page.tsx` + test, `src/app/guides/berlin-school-system/page.tsx` + test, `src/app/guides/german-education-system/page.tsx`, `src/app/guides/first-steps/page.tsx` + test, `src/features/siteMetadata/index.ts` + test, `src/components/ui/Button/index.tsx`, `src/features/guides/GuidePrintButton/index.tsx`, `e2e/smoke.spec.ts`, `e2e/metadata.spec.ts`, `e2e/a11y.spec.ts`, `e2e/onboarding.spec.ts`, `e2e/a11y-utils.ts`, `src/content/guides/german-education-system.mdx`, `src/content/guides/berlin-school-system.mdx`, `src/content/guides/first-steps.mdx`, `src/features/navigation/SiteHeader/*`, `src/features/navigation/SiteFooter/*`
- `.planning/phases/11-flagship-discovery-release/11-CONTEXT.md` — locked decisions D-01 through D-15
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/config.json`
- `docs/INFORMATION_ARCHITECTURE.md`, `docs/EDITORIAL_GUIDE.md` — cross-checked for URL/copy conventions and tone rules
- `AGENTS.md` (workspace rule) — static-first architecture, feature-first `src/` structure, no-premature-abstraction guidance

### Secondary (MEDIUM confidence)
None used — no external web research was needed since this phase is entirely internal to an already-mapped codebase.

### Tertiary (LOW confidence)
None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; all versions read directly from `package.json`
- Architecture: HIGH — every component/page/test file touched by this phase was read directly in full
- Pitfalls: HIGH — every pitfall identified is backed by a specific existing test assertion or MDX heading verified by direct file read, not speculation

**Research date:** 2026-07-25
**Valid until:** Valid indefinitely for this phase's scope (internal codebase research, not subject to external library drift) — re-verify only if Phase 11 planning is deferred long enough for Phase 10's shipped content or the `GuideIntro`/`HomeJourneyCards`/`GuidesHub` components to change again before this phase executes.
