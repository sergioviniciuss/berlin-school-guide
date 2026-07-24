# Phase 10: Education Pathway Editorial - Research

**Researched:** 2026-07-24
**Domain:** Static MDX editorial content + Phase 9 guide visual components (EducationTimeline, BerlinCallout, GlossaryTerm)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Organize as **journey chapters**, not one H2 per school type. Germany-first H1: **“Como funciona o sistema educacional na Alemanha”**. Chapter H2s in order: Antes da escola → Ensino primário → Depois da 6ª série → Os caminhos possíveis → Formação profissional → Ensino superior.
- **D-02:** Under **Os caminhos possíveis**, use H3s for **Gymnasium**, **ISS**, and **Gemeinschaftsschule** (Berlin’s main secondary models). Briefly introduce **Realschule** / **Hauptschule** as types still common in many other German states — not as equal primary paths for Berlin families, and **not** as a final “Comparando Berlim…” chapter.
- **D-03:** **No final Berlin-vs-Germany comparison chapter.** Berlin differences appear inline throughout; Germany-first framing matches ONBD-04.
- **D-04:** Timeline `anchorHref` targets **only real timeline nodes**: Kita, Grundschule, secondary paths (as applicable), Ausbildung, Ensino superior. Purely narrative H2s (e.g. “Depois da 6ª série”) do **not** need timeline anchors — they may precede the anchored node sections.
- **D-05:** “Antes da escola” covers Kita / creche / Kindergarten and whether attendance is compulsory; “Ensino primário” covers Grundschule grades, what children learn, and Berlin differences at concept level; “Depois da 6ª série” covers Empfehlung, how families choose, whether parents can disagree, and Berlin vs other states at the transition.
- **D-06:** Guide is **narrative-first**. Full **“O que verificar”** blocks only at action moments: (1) after Grundschule — recommendation and choosing the next path; (2) choosing among Gymnasium / ISS / Gemeinschaftsschule; (3) qualification routes (Abitur, Fachabitur, Ausbildung, Duales Studium, university).
- **D-07:** Kita and Grundschule chapters focus on **understanding the system**, with lighter informational callouts — not full verification checklists.
- **D-08:** Each “O que verificar” block is **self-contained** so the family can decide without leaving the page; where appropriate, add **one or two optional** “learn more” / “next step” links to `/guides/first-steps`, `/guides/berlin-school-system`, or `/schools` — never required reading.
- **D-09:** Use short **“Em Berlim…”** callouts (`BerlinCallout` inline or equivalent) **only where the experience genuinely differs** (e.g. 6-year Grundschule, ISS / Berlin secondary landscape).
- **D-10:** At most **one** summary **“Berlin em destaque”** callout, placed around the **primary → secondary** transition, linking to `/guides/berlin-school-system`.
- **D-11:** This guide explains **what differs and why it matters for understanding the journey**. Practical enrollment detail (Bezirk assignment, catchment, applications, timelines, exceptions) **stays in** `/guides/berlin-school-system` to avoid duplication and keep roles clear.
- **D-12:** **Both** patterns: short Portuguese gloss on **first use** in narrative; complete **Glossário** section at the bottom using `<GlossaryTerm>` for quick reference. Readers must not need to leave the page to understand a term.
- **D-13:** Glossary covers **ONBD-05 required terms** (Ganztag, Hort, Willkommensklasse, Ausbildung, Duales Studium, Fachabitur, and related) **plus** journey essentials: Kita, Grundschule, Gymnasium, ISS, Gemeinschaftsschule, Abitur, Empfehlung, Universität, Hochschule; include **Berufsschule / OSZ** and **MSA** if those terms are introduced in the prose.
- **D-14:** Narrative may link to glossary anchors where helpful; bottom Glossário is the authoritative quick-reference list.

### Claude's Discretion
- Exact Portuguese wording, heading slugification for anchors, and which secondary nodes get individual vs shared anchors
- Length and density of each chapter within the locked outline
- Exact placement of the single Berlin summary callout within the primary→secondary transition
- Whether “O que verificar” is plain MDX lists or a small shared pattern reused from berlin-school-system
- Timeline demo data (`constants.ts`) summary copy updates to remove Phase 10 placeholders
- Unit/e2e updates strictly needed to keep existing onboarding route tests green (discovery/homepage e2e remains Phase 11)

### Deferred Ideas (OUT OF SCOPE)
- Homepage journey card + Guides hub flagship placement — Phase 11 (DISC-01, DISC-02)
- Broader cross-links and explicit complementary relationship copy beyond light verify-block links — Phase 11 (DISC-03, DISC-04)
- Portuguese SEO metadata polish + homepage → onboarding e2e smoke — Phase 11 (REL-01, REL-03)
- Interactive pathway calculators or quizzes — out of scope per REQUIREMENTS.md
- Practical Berlin enrollment procedures — remain on `/guides/berlin-school-system`
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ONBD-01 | Flagship guide explains full path Kita → secondary → vocational → higher ed | Journey H2 outline (D-01); MDX body replaces placeholder; EducationTimeline stays first |
| ONBD-02 | Major decision points in plain Brazilian Portuguese | Chapters “Depois da 6ª série”, “Os caminhos possíveis”, qualification routes; three “O que verificar” moments (D-06) |
| ONBD-03 | Non-Gymnasium pathways (Ausbildung, Duales Studium, Fachabitur) | Equal-weight H3s + Formação profissional / Ensino superior chapters; timeline primaryBranches already peer-weighted |
| ONBD-04 | Berlin differences woven into Germany-first narrative | Inline “Em Berlim…” + one `BerlinCallout summary` (D-09/D-10); no closing comparison chapter (D-03) |
| ONBD-05 | Integrated glossary for key German terms | First-use gloss + bottom `<GlossaryTerm>` list (D-12–D-14); requires GlossaryTerm `id` for narrative links |
</phase_requirements>

## Summary

Phase 10 is an **editorial content phase**, not a stack or visual-system build. Phase 9 already shipped the route shell (`/guides/german-education-system`), `GuideIntro` H1 matching D-01, MDX component registration, `EducationTimeline`, `BerlinCallout`, and `GlossaryTerm`. The planner should treat the work as: (1) replace placeholder MDX with the locked journey chapters; (2) wire timeline `anchorHref` + summaries to real section anchors; (3) one small component gap-fill so glossary deep-links work; (4) keep existing onboarding e2e green without touching hub/homepage.

The highest-risk planning mistakes are scope leaks (enrollment calendars, hub promotion, new UI libraries) and **anchor mismatches** — today only MDX `h2` auto-slugifies, `GlossaryTerm` has **no `id`**, and secondary tracks are H3s without ids. Berlin’s secondary transition also changed recently (Förderprognose / Probeunterricht replacing the old Probejahr framing), so concept-level copy must stay accurate without hardcoding year-locked enrollment dates that belong on `berlin-school-system`.

**Primary recommendation:** Ship one MDX rewrite + `constants.ts` anchor/summary sync + a minimal `GlossaryTerm` `id={slugifyHeading(term)}` enhancement; prefer **shared** `#os-caminhos-possiveis` for secondary timeline links (or add `h3` ids if individual links are desired); reuse berlin-school-system’s plain `**O que verificar:**` MDX pattern; do not add packages.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Guide narrative (Kita→Uni) | CDN / Static (MDX at build) | — | Content is committed MDX, compiled by `@next/mdx`, statically exported |
| Section anchors for timeline deep-links | CDN / Static (`mdx-components` h2 ids) | Frontend Server (SSG) | `slugifyHeading` on H2 at render; timeline links are in-page hashes |
| Glossary quick-reference + deep-links | CDN / Static (`GlossaryTerm`) | Browser / Client | Need stable `id` on term blocks; no runtime data |
| Berlin difference highlighting | CDN / Static (MDX + BerlinCallout) | Browser / Client | Summary callout is static; timeline `berlinNote` badges hydrate with Collapsible nodes |
| Education journey visualization | Browser / Client (`EducationTimeline` client tree) | CDN / Static | Interactive expand/collapse; demo data from `constants.ts` |
| Optional next-step links | CDN / Static | — | Plain relative links to existing static routes |
| Discovery / hub / SEO polish | — (deferred Phase 11) | — | Explicitly out of Phase 10 boundary |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js (App Router, `output: "export"`) | 16.2.10 (local) / 16.2.11 latest `[VERIFIED: npm registry]` | Static route shell + MDX compilation | Already ships the guide page |
| `@next/mdx` + `@mdx-js/react` | 16.2.10 / 3.1.1 `[VERIFIED: package.json + npm]` | Author editorial as MDX | Phase 7/9 guide pattern |
| React | 19.2.7 `[VERIFIED: package.json]` | Component tree | Project standard |
| Existing guide components | Phase 9 | Timeline, Berlin callouts, glossary | Locked building blocks — do not replace |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Jest + Testing Library | 30.4.2 `[VERIFIED: package.json]` | Unit tests for GlossaryTerm id / timeline constants | Only if component behavior changes |
| Playwright | 1.61.1 `[VERIFIED: package.json]` | Keep `e2e/onboarding.spec.ts` green | Regression only in Phase 10 |
| Tailwind 4 + existing prose classes | project | Typography via `mdx-components.tsx` | No new design tokens required |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Plain MDX `**O que verificar:**` lists | New `VerifyChecklist` component | Premature abstraction (one prior use in berlin-school-system already works as MDX) — prefer plain MDX per AGENTS.md |
| Shared `#os-caminhos-possiveis` for all secondary nodes | Add `h3` auto-ids in `mdx-components.tsx` | Individual H3 anchors are nicer UX; requires small MDX mapping change + careful slug choice for “ISS” vs full name |
| Prose “Em Berlim…” sentences | Force `BerlinCallout variant="inline"` in MDX body | Inline variant is a **pill badge** (`span`) designed for timeline nodes — awkward as paragraph callouts |

**Installation:**

```bash
# No new packages — content + small component enhancement only
pnpm test -- GlossaryTerm EducationTimeline
pnpm exec playwright test e2e/onboarding.spec.ts
```

**Version verification:** Stack versions read from `package.json` and spot-checked with `pnpm view` on 2026-07-24. No installs required for Phase 10.

## Architecture Patterns

### System Architecture Diagram

```text
Family opens /guides/german-education-system
        │
        ▼
┌───────────────────────────────┐
│ page.tsx (SSG)                │
│  GuideIntro (H1 = D-01 title) │
│  + compiled MDX               │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│ MDX body                      │
│  1. <EducationTimeline />     │── expand node → summary + optional #anchor
│  2. Journey H2 chapters       │── first-use gloss + optional #glossary-links
│  3. ≤1 BerlinCallout summary  │── Link → /guides/berlin-school-system
│  4. “O que verificar” (×3)    │── optional links → first-steps / schools
│  5. ## Glossário              │── <GlossaryTerm id=slug(term)>…
└───────────────────────────────┘
                │
                ▼
        Static HTML export (no runtime CMS/API)
```

### Recommended Project Structure

```text
src/content/guides/
└── german-education-system.mdx     # REPLACE placeholder — primary deliverable

src/features/guides/
├── EducationTimeline/
│   └── constants.ts                # UPDATE summaries + anchorHref (+ optional berlinNote)
├── GlossaryTerm/
│   ├── index.tsx                   # ADD id via slugifyHeading(term)
│   └── index.test.tsx              # EXTEND for id assertions
└── mdxUtils/
    └── index.ts                    # REUSE slugifyHeading (already used by h2)

src/app/guides/german-education-system/
└── page.tsx                        # KEEP — H1/metadata already match D-01

src/mdx-components.tsx              # OPTIONAL: add h3 ids if individual secondary anchors chosen
e2e/onboarding.spec.ts              # KEEP green; do not expand to homepage→guide (Phase 11)
```

### Pattern 1: Journey chapters with timeline-first layout
**What:** Keep `<EducationTimeline />` as the first MDX element (Phase 9 D-02 / UI-SPEC). Do **not** put another H1 in MDX — `GuideIntro` already renders the D-01 title. MDX starts at chapter H2s.
**When to use:** Always for this route.
**Example:**

```mdx
<EducationTimeline />

## Antes da escola

A **Kita** (creche / educação infantil)…

## Ensino primário
…
```

### Pattern 2: Timeline `anchorHref` ↔ `slugifyHeading` contract
**What:** H2 text is the source of truth for hashes. Precompute slugs before writing `constants.ts`.
**When to use:** Every timeline node that should deep-link into prose.

Verified slug map for locked H2s `[VERIFIED: slugifyHeading in src/features/guides/mdxUtils/index.ts]`:

| H2 text | Slug / recommended `anchorHref` |
|---------|----------------------------------|
| Antes da escola | `#antes-da-escola` (Kita) |
| Ensino primário | `#ensino-primario` (Grundschule) |
| Depois da 6ª série | `#depois-da-6-serie` — **no** timeline anchor (D-04) |
| Os caminhos possíveis | `#os-caminhos-possiveis` (secondary paths — shared default) |
| Formação profissional | `#formacao-profissional` (Ausbildung) |
| Ensino superior | `#ensino-superior` |
| Glossário | `#glossario` |

**Recommended discretionary default:** Point Gymnasium / ISS / Gemeinschaftsschule nodes all to `#os-caminhos-possiveis`. Add `h3` id generation only if product wants per-track “Ver seção completa” targets.

### Pattern 3: Dual glossary (first-use + bottom list)
**What:** On first mention, short Portuguese gloss in prose; optionally `[Termo](#termo)` to Glossário. Bottom section uses `<GlossaryTerm term="…">` for every D-13 term.
**When to use:** All German terms in D-13 / ONBD-05.

**Required component gap-fill:** `GlossaryTerm` currently renders `<dl>` with **no `id`** `[VERIFIED: src/features/guides/GlossaryTerm/index.tsx]`. Narrative `#ganztag` links cannot land. Add:

```tsx
import { slugifyHeading } from "@/features/guides/mdxUtils";

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const id = slugifyHeading(term);
  return (
    <dl id={id} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 scroll-mt-20">
      …
    </dl>
  );
}
```

Use the **German term string** as `term` so `#ausbildung`, `#duales-studium`, `#fachabitur`, `#willkommensklasse` stay predictable.

### Pattern 4: Berlin differences without enrollment duplication
**What:** Concept-level Berlin differences inline; one summary box near primary→secondary transition; deep enrollment stays on `/guides/berlin-school-system`.
**When to use:** 6-year Grundschule, Berlin secondary landscape (ISS / Gemeinschaftsschule), transition rules at concept level.

**BerlinCallout usage:**
- **Exactly one** `<BerlinCallout variant="summary">` (D-10) — already includes fixed link “Ver guia completo do sistema em Berlim” `[VERIFIED: BerlinCallout/index.tsx]`.
- For MDX body differences: prefer prose **“Em Berlim…”** (equivalent to berlin-school-system) rather than forcing the inline pill badge into paragraphs.
- Optional: set `berlinNote` on the Grundschule timeline stage (type already supports it; demo data currently unused `[VERIFIED: constants.ts + TimelineNode]`).

### Pattern 5: “O que verificar” as plain MDX
**What:** Reuse berlin-school-system’s established pattern — bold lead-in + bullet list — only at the three D-06 moments.
**When to use:** Action moments only; Kita/Grundschule stay lighter (D-07).

```mdx
**O que verificar:**

- …
- Opcional: [Primeiros passos](/guides/first-steps)
```

### Anti-Patterns to Avoid
- **Duplicating H1 in MDX:** Page already has GuideIntro title — second H1 breaks outline and e2e heading checks.
- **Final “Berlim vs Alemanha” chapter:** Violates D-03 / ONBD-04.
- **Year-locked enrollment calendars** (e.g. “5–12 de março de 2026”) in this guide: stale quickly; belongs conceptually (“confirme o calendário do ano letivo”) or on berlin-school-system (D-11).
- **Ranking language** (“melhor caminho”, “só o Gymnasium leva à universidade”): violates EDITORIAL_GUIDE + ONBD-03.
- **Hub / homepage / metadata overhaul:** Phase 11.
- **New checklist/callout components** before a second concrete reuse need (AGENTS.md).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Heading anchors | Custom slug utils | `slugifyHeading` | Already strips accents; used by MDX h2 |
| Timeline UI | New diagram library | `EducationTimeline` | VIS-* complete in Phase 9 |
| Berlin highlight box | Ad-hoc bordered div | `BerlinCallout variant="summary"` | Fixed a11y heading + link |
| Glossary cards | Markdown-only list for this guide | `<GlossaryTerm>` | Phase 9 shell + D-12 preference |
| Verify checklist component | Shared React widget | Plain MDX `**O que verificar:**` | Matches berlin-school-system; one use case |
| CMS / content API | Runtime content fetch | Static MDX | V1 static-first |

**Key insight:** Phase 10 succeeds by **authoring and wiring**, not inventing infrastructure. The only justified code change beyond MDX/`constants.ts` is making glossary anchors real.

## Common Pitfalls

### Pitfall 1: Anchor / timeline desync
**What goes wrong:** “Ver seção completa” jumps to a missing or wrong hash (placeholder `#o-caminho-da-kita-a-universidade` still in constants today `[VERIFIED: constants.ts]`).
**Why it happens:** H2 wording changes without updating `anchorHref`; H3 tracks assumed to have ids.
**How to avoid:** Lock H2 Portuguese strings first; compute slugs; update `constants.ts` in the same plan/task; prefer shared secondary hash unless `h3` ids ship.
**Warning signs:** Grep still finds `Fase 10` or `o-caminho-da-kita-a-universidade` after implementation.

### Pitfall 2: Glossary links that go nowhere
**What goes wrong:** `[Ausbildung](#ausbildung)` scrolls to top / nowhere.
**Why it happens:** `GlossaryTerm` lacks `id`.
**How to avoid:** Ship GlossaryTerm id enhancement before or with MDX narrative links; unit-test `document.getElementById("ganztag")`.
**Warning signs:** Manual click from prose to Glossário fails.

### Pitfall 3: Stale or over-specific Berlin transition rules
**What goes wrong:** Copy describes the old Probejahr world, or hardcodes 2026/27 dates/Notensumme procedures as eternal fact.
**Why it happens:** Berlin transition rules changed (Probejahr abolished; Gymnasium access via Förderprognose / Probeunterricht) `[CITED: berlin.de Übergang Jahrgangsstufe 7]`.
**How to avoid:** Explain concepts — parents choose school type; Gymnasium has suitability requirements via school prognosis; ISS/Gemeinschaftsschule remain full pathways to Abitur. Point families to official Senate pages / berlin-school-system for current-year process. Include **Förderprognose** in glossary alongside **Empfehlung** (D-05/D-13 use Empfehlung; Berlin official language favors Förderprognose).
**Warning signs:** Specific registration windows or “sempre sem restrição ao Gymnasium” claims.

### Pitfall 4: Enrollment content bleed
**What goes wrong:** Guide becomes a second berlin-school-system (Einzugsgebiet, Anmeldung forms, Bezirk calendars).
**Why it happens:** Natural parent questions during primary chapter.
**How to avoid:** D-11 fence — concept only here; optional link out in verify blocks.
**Warning signs:** Sections titled like “Como fazer a matrícula” with procedural steps.

### Pitfall 5: Gymnasium visual/editorial primacy
**What goes wrong:** Prose implies Gymnasium is the “real” university path.
**Why it happens:** Cultural default + listing Gymnasium first.
**How to avoid:** Peer H3 structure (D-02); explicit ONBD-03 coverage of Ausbildung / Duales Studium / Fachabitur; keep timeline primaryBranches equal weight (Phase 9 D-07).
**Warning signs:** Phrases like “o caminho normal” or burying vocational routes.

### Pitfall 6: Breaking Phase 9 e2e
**What goes wrong:** CI fails because H1 text or timeline region label changed.
**Why it happens:** Accidental GuideIntro title edit or timeline `aria-label` change.
**How to avoid:** Keep page.tsx H1 and region label unchanged; only replace MDX body + constants summaries.
**Warning signs:** `e2e/onboarding.spec.ts` failures on heading/region selectors.

## Code Examples

### Recommended MDX skeleton (locked outline)

```mdx
<EducationTimeline />

## Antes da escola

…

## Ensino primário

…

## Depois da 6ª série

…

**O que verificar:**

- …

## Os caminhos possíveis

### Gymnasium

### ISS

### Gemeinschaftsschule

…

**O que verificar:**

- …

<BerlinCallout variant="summary">
  Em Berlim, a Grundschule dura seis anos… Para matrícula e área de captura,
  veja o guia de Berlim (link já incluso no componente).
</BerlinCallout>

## Formação profissional

…

## Ensino superior

…

**O que verificar:**

- …

## Glossário

<GlossaryTerm term="Ganztag">…</GlossaryTerm>
<GlossaryTerm term="Hort">…</GlossaryTerm>
<!-- …full D-13 set… -->
```

Note: Exact placement of the single summary callout within the primary→secondary transition is discretionary — after “Depois da 6ª série” or inside/after “Os caminhos possíveis” both satisfy D-10 if there is only one.

### Timeline constants sync

```ts
// Source: existing TimelineStage type — src/features/guides/EducationTimeline/types.ts
const KITA: TimelineStage = {
  id: "kita",
  name: "Kita",
  grades: "Educação infantil",
  ageRange: "Idade aprox. 0–6 anos",
  summary: "2–3 sentences, no Phase 10 placeholder.",
  anchorHref: "#antes-da-escola",
};

const GRUNDSCHULE: TimelineStage = {
  id: "grundschule",
  name: "Grundschule",
  grades: "1ª à 6ª série", // Berlin-framed trunk already matches product
  ageRange: "Idade aproximada: 6–12 anos",
  summary: "…",
  anchorHref: "#ensino-primario",
  berlinNote: "dura 6 anos, até a 6ª série", // optional badge
};
```

### GlossaryTerm id enhancement

```tsx
// Source pattern: slugifyHeading — src/features/guides/mdxUtils/index.ts
import { slugifyHeading } from "@/features/guides/mdxUtils";

type GlossaryTermProps = {
  term: string;
  children: React.ReactNode;
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

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Placeholder MDX + stub anchors | Full journey editorial + real anchors | Phase 10 | ONBD-01–05 |
| Berlin Probejahr framing | Förderprognose + Probeunterricht for Gymnasium access | Schuljahr 2025/26+ `[CITED: berlin.de]` | Transition chapter must use current concepts |
| berlin-school-system as only system guide | Complementary pair: Germany-first onboarding + Berlin primary deep-dive | v1.1 roadmap | Clear role split (D-11) |

**Deprecated/outdated:**
- Placeholder heading `## O caminho da Kita à universidade` and “Fase 10” stub copy in MDX/`constants.ts`.
- Treating Realschule/Hauptschule as Berlin’s primary secondary choice set (timeline already demotes them to germany-wide collapsible).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Kita attendance is generally not Schulpflicht; compulsory schooling begins at Grundschule age | Antes da escola editorial | Misstates legal duty — verify against current Berlin/federal Schulpflicht framing during writing |
| A2 | Shared `#os-caminhos-possiveis` is sufficient for all three Berlin secondary timeline nodes | Pattern 2 | Weaker deep-link UX; fixable by adding h3 ids later |
| A3 | No Fontes section required for system-level facts (Phase 7 berlin-school-system also omits one) | Editorial | If user wants citations, add a short Fontes with Senate links without blocking narrative |
| A4 | Existing page metadata is good enough until Phase 11 REL-01 | Deferred scope | SEO suboptimal until Phase 11 — acceptable per CONTEXT |

## Open Questions

1. **Secondary timeline anchors: shared vs per-H3?**
   - What we know: Only H2 auto-ids exist today; D-04 allows secondary paths “as applicable”; discretion covers the choice.
   - What's unclear: Whether “Ver seção completa” on Gymnasium should land on Gymnasium H3 specifically.
   - Recommendation: Start shared `#os-caminhos-possiveis`; add `h3` id mapping in `mdx-components.tsx` only if UAT asks for per-track jumps.

2. **Empfehlung vs Förderprognose terminology**
   - What we know: CONTEXT/D-13 list Empfehlung; Berlin official pages emphasize Förderprognose for the Jahrgang 7 transition.
   - What's unclear: Exact Portuguese gloss pairing.
   - Recommendation: Use Empfehlung for Germany-wide framing; introduce Förderprognose as Berlin’s written prognosis document; put both in Glossário.

3. **Should MDX add a Fontes section?**
   - What we know: EDITORIAL_GUIDE requires citations for school factual claims; system guides historically explain without a sources block.
   - What's unclear: Whether v1.1 onboarding should cite Senate URLs.
   - Recommendation: Optional short Fontes with 1–3 official links if transition/qualification claims need trust reinforcement; not a phase blocker.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | build/test | ✓ | v24.12.0 | — |
| pnpm (Corepack) | scripts | ✓ | 11.11.0 | — |
| Jest | unit tests | ✓ | 30.4.2 | — |
| Playwright | e2e onboarding | ✓ | 1.61.1 | — |
| External CMS/API | — | N/A | — | Not used (static MDX) |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

Step 2.6: External tools limited to local Node/pnpm test toolchain — no new services.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest 30.4.2 + Testing Library; Playwright 1.61.1 |
| Config file | `jest.config.mjs` / `playwright` configs (existing) |
| Quick run command | `pnpm test -- GlossaryTerm EducationTimeline` |
| Full suite command | `pnpm test && pnpm exec playwright test e2e/onboarding.spec.ts` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ONBD-01 | Journey H2s present after timeline | manual + optional e2e assert | Manual: open route; optional Playwright heading checks | ❌ Wave 0 (optional) |
| ONBD-02 | Three “O que verificar” moments exist | manual / content review | Manual against D-06 | ❌ content review |
| ONBD-03 | Non-Gymnasium routes explained | manual / content review | Grep MDX for Ausbildung, Duales Studium, Fachabitur | ❌ content review |
| ONBD-04 | Berlin woven; ≤1 summary callout | unit (BerlinCallout unchanged) + manual | `pnpm test -- BerlinCallout`; count summary variants in MDX = 1 | ✅ component tests |
| ONBD-05 | GlossaryTerm ids + required terms | unit | `pnpm test -- GlossaryTerm` | ⚠️ extend existing |
| Regression | Route H1 + timeline region | e2e | `pnpm exec playwright test e2e/onboarding.spec.ts` | ✅ |
| Anchors | constants `anchorHref` match H2 slugs | unit or lint task | Small constants test or plan acceptance grep | ❌ Wave 0 recommended |

### Sampling Rate
- **Per task commit:** `pnpm test -- GlossaryTerm EducationTimeline`
- **Per wave merge:** `pnpm test && pnpm exec playwright test e2e/onboarding.spec.ts`
- **Phase gate:** Full unit suite + onboarding e2e green; manual content checklist for ONBD-01–05 before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] Extend `GlossaryTerm/index.test.tsx` — assert `id` equals `slugifyHeading(term)` (ONBD-05 / D-14)
- [ ] Optional: unit test or acceptance grep that `constants.ts` `anchorHref` values match locked H2 slugs and contain no `Fase 10` / placeholder hash
- [ ] Optional (not required): Playwright assertions for key H2s / Glossário — content e2e beyond shell remains Phase 11 REL-*

*(Framework install: none — infrastructure exists)*

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | No accounts in V1 |
| V3 Session Management | no | Static site |
| V4 Access Control | no | Public content |
| V5 Input Validation | no* | No user-submitted MDX; links are author-controlled relative paths |
| V6 Cryptography | no | N/A |

\*If optional external Senate links are added, use `https` URLs; existing MDX `a` mapping already sets `rel="noopener noreferrer"` for external hrefs `[VERIFIED: src/mdx-components.tsx]`.

### Known Threat Patterns for static MDX guides

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Authoring XSS via MDX | Tampering | Build-time MDX only; no runtime user content |
| Open redirects | Spoofing | Prefer relative in-app links; external only to known official domains |
| Misleading “official” claims | Elevation / Repudiation (trust) | Honest limitations language; defer procedural authority to Senate/Bezirk; no ranking |

## Project Constraints (from .cursor/rules/)

No `.cursor/rules/` directory found in this repository. Enforce constraints from `AGENTS.md` and `docs/` instead:

- Use **pnpm** / Corepack only
- Static-first; no production DB/API/auth for V1
- Feature-first `src/` layout; English paths, Brazilian Portuguese UI copy
- Avoid premature abstractions until two concrete use cases
- Check `docs/EDITORIAL_GUIDE.md` for tone: practical, no ranking language, German terms explained in Portuguese

## Sources

### Primary (HIGH confidence)
- `src/content/guides/german-education-system.mdx` — current placeholder structure
- `src/features/guides/EducationTimeline/constants.ts` — stub summaries/anchors
- `src/features/guides/GlossaryTerm/index.tsx` — missing `id`
- `src/mdx-components.tsx` — h2-only `slugifyHeading` ids; MDX component registry
- `src/features/guides/BerlinCallout/index.tsx` — inline vs summary variants
- `src/content/guides/berlin-school-system.mdx` — “O que verificar” + role of Berlin primary guide
- `e2e/onboarding.spec.ts` — regression contract (H1 + timeline region)
- `.planning/phases/10-education-pathway-editorial/10-CONTEXT.md` — D-01–D-14
- `package.json` + `pnpm view` — stack versions (2026-07-24)

### Secondary (MEDIUM confidence)
- [Berlin SenBJF — Wechsel zur 7. Klasse](https://www.berlin.de/sen/bildung/schule/bildungswege/uebergang-weiterfuehrende-schule/wechsel-zur-7-klasse/) — Elternwahlrecht, Förderprognose, Gymnasium suitability
- [Berlin SenBJF — Probeunterricht FAQ](https://www.berlin.de/sen/bildung/schule/bildungswege/uebergang-weiterfuehrende-schule/probeunterricht/) — Probejahr abolished; ISS/Gemeinschaftsschule still lead to Abitur
- `docs/EDITORIAL_GUIDE.md`, `docs/PRODUCT.md`, `docs/INFORMATION_ARCHITECTURE.md`

### Tertiary (LOW confidence)
- Exact legal formulation of Kita vs Schulpflicht for all age bands — confirm during editorial writing against current Berlin guidance (see A1)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; versions verified in-repo
- Architecture: HIGH — route/components/patterns verified in codebase; locked decisions constrain design
- Pitfalls: HIGH — anchor gap and Berlin transition change verified; enrollment bleed risk from CONTEXT
- Domain facts for Ausbildung/Duales Studium detail prose: MEDIUM — outline locked; sentence-level facts to confirm while writing

**Research date:** 2026-07-24
**Valid until:** 2026-08-24 (30 days; revisit sooner if Berlin Übergang rules change again)
