---
phase: 10
slug: education-pathway-editorial
status: approved
shadcn_initialized: true
preset: new-york / neutral / cssVariables
created: 2026-07-24
reviewed_at: 2026-07-24T22:36:00+02:00
---

# Phase 10 — UI Design Contract

> Visual and interaction contract for Education Pathway Editorial. Generated from locked CONTEXT.md decisions D-01–D-14, 10-RESEARCH.md patterns, and Phase 9 UI-SPEC reuse.

**Scope:** Replace placeholder MDX on `/guides/german-education-system` with full Kita→higher-ed editorial; sync `EducationTimeline` summaries/`anchorHref`; enhance `GlossaryTerm` with stable `id` for in-page links. **No new visual system, no new shadcn primitives, no new design tokens.** Homepage/hub/SEO remain Phase 11.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn/ui — **reuse only** (no new `src/components/ui` additions this phase) |
| Preset | new-york, neutral, cssVariables `[VERIFIED: components.json; Phase 9 UI-SPEC]` |
| Component library | Existing Radix collapsible inside `EducationTimeline` only; no new Radix installs |
| Icon library | lucide-react — unchanged (chevron already in timeline) |
| Font | Arial stack — unchanged (`globals.css` body) |

**Phase 10 additions:** none to the design system. Building blocks stay `EducationTimeline`, `BerlinCallout`, `GlossaryTerm`, `GuideIntro`, and MDX prose from `mdx-components.tsx`.

**Allowed code change with visual impact:** `GlossaryTerm` gains `id={slugifyHeading(term)}` + `scroll-mt-20` on the root `<dl>` so narrative `#term` links land correctly. Card chrome (border, bg, type) stays identical to Phase 9.

---

## Spacing Scale

Declared values (multiples of 4) — **identical to Phase 9**; no new tokens:

| Token | Value | Usage in Phase 10 |
|-------|-------|-------------------|
| xs | 4px | Gaps inside timeline node cards / Berlin inline badge (unchanged) |
| sm | 8px | Compact timeline branch gaps; glossary `dt`→`dd` gap (`mt-1`) |
| md | 16px | MDX list item spacing (`space-y-2`); default prose rhythm |
| lg | 24px | Gap before `BerlinCallout` summary when following prose (`mt-6` author placement); page `px-6` |
| xl | 32px | `main` `space-y-8`; major section breathing room |
| 2xl | 48px | Not required this phase |
| 3xl | 64px | Not required this phase |

**Exceptions:**
- Touch targets: keep Phase 9 `min-h-11` (44px) on timeline expand triggers, “Ver seção completa”, and Berlin summary link.
- MDX chapter H2 uses existing `mt-10` / `first:mt-0` from `mdx-components.tsx` (40px — existing guide rhythm, not a new token).
- H3 track headings use existing `mt-6` (24px = lg).

---

## Typography

Reuses Phase 9 + existing MDX scale. **Do not introduce new font sizes or weights.**

| Role | Size | Weight | Line Height | Used for |
|------|------|--------|-------------|----------|
| Label | 12px (`text-xs`) | 600 | 1.3 | Berlin inline badge; timeline grades/ages (component-owned) |
| Body | 16px (`text-base`) | 400 | 1.5 (`leading-7` in MDX ≈ 1.75 for prose comfort — keep as shipped) | Narrative paragraphs; “O que verificar” bullets; GlossaryTerm `dd`; BerlinCallout summary body; timeline expanded summaries |
| Heading | 20px (`text-xl`) | 600 | 1.3 | GlossaryTerm `dt` (component); timeline stage names use existing `titleStyles` responsive scale |
| Display | 36px (`text-4xl`) | 600 | 1.2 | `GuideIntro` H1 — **do not duplicate in MDX** |

Two weights only: **400** (body) and **600** (labels, headings, strong).

**Document outline (inherited, do not change `mdx-components.tsx` type tokens this phase):**
- Chapter H2: `text-2xl font-semibold` (24px) — journey chapters
- Track H3: `text-lg font-semibold` (18px) — Gymnasium / ISS / Gemeinschaftsschule only under “Os caminhos possíveis”

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#ffffff` / `hsl(var(--background))` | Page background; timeline node surfaces |
| Secondary (30%) | `border-neutral-200` (#e5e7eb), `bg-neutral-50` (#fafafa) | GlossaryTerm cards; borders; grouped surfaces |
| Accent (10%) | `bg-blue-50` / `text-blue-800` / `text-blue-700` / `border-l-primary` (~#2563eb) | Berlin-only surfaces + in-page deep-link styling already used by MDX `a` |
| Destructive | not applicable | No destructive actions |

**Accent reserved for (unchanged from Phase 9):**
1. `BerlinCallout variant="inline"` (“Em Berlim” pill on timeline nodes via `berlinNote`)
2. `BerlinCallout variant="summary"` (background, left border, eyebrow, outbound link)
3. In-page / guide links already styled `text-blue-700 underline` (timeline “Ver seção completa”, MDX `a`, Berlin summary link)

**Forbidden:** `amber-*` / `red-*` for Berlin differences or pathway emphasis (evidence-status tokens only). No track-hierarchy color coding — all secondary H3s and timeline branches keep equal visual weight (ONBD-03 / Phase 9 D-07).

---

## Copywriting Contract

All visible copy in Brazilian Portuguese. English only for URL paths and code identifiers.

| Element | Copy |
|---------|------|
| Primary CTA (timeline → prose) | `Ver seção completa` |
| Primary CTA (Berlin deep-dive) | `Ver guia completo do sistema em Berlim` (fixed in `BerlinCallout` summary — do not reword) |
| Route eyebrow / H1 / description | Unchanged from Phase 9 `GuideIntro` — H1: `Como funciona o sistema educacional na Alemanha` |
| Timeline region label | `Linha do tempo: da Educação Infantil ao Ensino Superior` (do not change — e2e contract) |
| Chapter H2s (locked order) | `Antes da escola` → `Ensino primário` → `Depois da 6ª série` → `Os caminhos possíveis` → `Formação profissional` → `Ensino superior` → `Glossário` |
| Track H3s under caminhos | `Gymnasium` · `ISS` · `Gemeinschaftsschule` |
| Verify-block lead-in | `O que verificar:` (bold MDX lead-in, exact string) |
| Optional next-step link labels (inside verify blocks only) | Prefer: `Primeiros passos` → `/guides/first-steps`; `Sistema escolar em Berlim` → `/guides/berlin-school-system`; `Ver escolas` → `/schools` — max **one or two** links per verify block; never framed as required reading |
| Inline Berlin prose cue | Lead with **`Em Berlim…`** in sentence form for concept-level differences (not the pill component) |
| Summary box eyebrow | `Berlin em destaque` (component-owned) |
| Empty state heading | Not applicable — static MDX always has content after Phase 10 ships |
| Empty state body | Not applicable |
| Error state | Not applicable — no fetch/forms/user input |
| Destructive confirmation | Not applicable — no destructive actions |

**Tone locks (`docs/EDITORIAL_GUIDE.md` + ONBD-03):**
- Practical, neutral, approachable; no ranking (“melhor”, “recomendado”, “única via certa”).
- Non-Gymnasium routes (Ausbildung, Duales Studium, Fachabitur, ISS, Gemeinschaftsschule) get peer treatment in prose and H3 structure.
- First use of each German term: short Portuguese gloss in narrative; full list in Glossário.
- No year-locked enrollment calendars in this guide; point process detail to berlin-school-system.

---

## Component Contracts (Reuse + Phase 10 Deltas)

### `EducationTimeline` — reuse; update data only

**Visual/interaction:** unchanged from Phase 9 UI-SPEC (desktop fan-out, mobile stepper + “Outras vias”, equal-weight branches, print expand).

**Data contract (executor must sync `constants.ts`):**

| Node | `anchorHref` | Notes |
|------|--------------|-------|
| Kita | `#antes-da-escola` | Real H2 |
| Grundschule | `#ensino-primario` | Optional `berlinNote`: `dura 6 anos, até a 6ª série` |
| Gymnasium / ISS / Gemeinschaftsschule | `#os-caminhos-possiveis` | **Shared** H2 target (default — no new H3 ids this phase) |
| Ausbildung | `#formacao-profissional` | |
| Ensino superior | `#ensino-superior` | |
| Narrative-only H2 `Depois da 6ª série` | — | **No** timeline anchor (D-04) |

Summaries: 2–3 sentences, remove all “Fase 10” / placeholder phrasing. Keep equal visual weight across `primaryBranches`.

### `BerlinCallout` — reuse; editorial placement rules

| Variant | Phase 10 usage |
|---------|----------------|
| `summary` | **Exactly one** instance in MDX, placed in the primary→secondary transition (after “Depois da 6ª série” **or** inside/after “Os caminhos possíveis”). Children explain concept-level Berlin differences; component already appends the berlin-school-system link. |
| `inline` | Only via timeline `berlinNote` on nodes (e.g. Grundschule). **Do not** drop `variant="inline"` pills into MDX paragraphs — use prose “Em Berlim…” instead. |

### `GlossaryTerm` — reuse chrome; add anchor id

```tsx
// Visual chrome unchanged; add id + scroll margin only
<dl
  id={slugifyHeading(term)}
  className="scroll-mt-20 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
>
  <dt className="text-xl font-semibold text-neutral-950">{term}</dt>
  <dd className="mt-1 text-base leading-7 text-neutral-700">{children}</dd>
</dl>
```

- `term` prop = **German term string** so hashes stay `#ganztag`, `#duales-studium`, `#fachabitur`, etc.
- Adjacent `<dl>` blocks remain valid (same as Phase 9).
- No interactivity; server component.

### “O que verificar” — plain MDX pattern (no new component)

Reuse berlin-school-system pattern — **not** a React widget (AGENTS.md: one prior use already exists as MDX).

```mdx
**O que verificar:**

- Item self-contained on this page
- Item…
- Opcional: [Primeiros passos](/guides/first-steps)
```

**Count lock:** exactly **three** full verify blocks, at:
1. After Grundschule transition framing (“Depois da 6ª série”)
2. After choosing among Gymnasium / ISS / Gemeinschaftsschule
3. At qualification routes (Abitur / Fachabitur / Ausbildung / Duales Studium / university)

Kita and Ensino primário: lighter informational callouts only — **no** full verify checklists (D-07).

### MDX document composition

```
GuideIntro (page.tsx — H1 already set; MDX must NOT emit H1)

MDX body:
  <EducationTimeline />

  ## Antes da escola
  ## Ensino primário
  ## Depois da 6ª série
     + verify block #1
  ## Os caminhos possíveis
     ### Gymnasium | ### ISS | ### Gemeinschaftsschule
     + brief Realschule/Hauptschule as other-state context (not equal Berlin paths)
     + verify block #2
     + ≤1 <BerlinCallout variant="summary">…</BerlinCallout> in this transition zone
  ## Formação profissional
  ## Ensino superior
     + verify block #3
  ## Glossário
     <GlossaryTerm term="…">…</GlossaryTerm> × D-13 set
```

**Forbidden layouts:** final “Berlim vs Alemanha” chapter; second H1; second summary BerlinCallout; verify blocks outside the three action moments; enrollment procedure sections that duplicate berlin-school-system.

---

## Layout Specifications

**Primary-screen focal point:** `GuideIntro` H1 is the title focal point; `EducationTimeline` is the primary visual anchor above the journey chapters; chapter H2s are secondary reading hierarchy.

### Route shell

Unchanged from Phase 9:

```
<main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
  <GuideIntro … />
  <GermanEducationSystemGuide />  {/* full editorial MDX */}
</main>
```

### Section rhythm

| Block | Spacing rule |
|-------|--------------|
| Timeline → first H2 | Existing MDX `h2` `mt-10` (first H2 after timeline is not `first:mt-0` unless it is the first prose child — timeline is first; H2s keep `mt-10`) |
| Between chapters | H2 `mt-10` |
| Between track H3s | H3 `mt-6` |
| GlossaryTerm stack | Adjacent cards; rely on default block flow + `p-4` internal padding — no extra wrapper card |
| Berlin summary | Author-placed; prefer `mt-6`/`mt-8` equivalent via surrounding paragraph/heading margins — component itself stays unmargined (Phase 9) |

### Anchor / scroll

- H2 ids: auto via `slugifyHeading` + `scroll-mt-20` (existing).
- GlossaryTerm ids: `slugifyHeading(term)` + `scroll-mt-20` (Phase 10 delta).
- Timeline “Ver seção completa” must resolve to an existing id after ship (acceptance: no leftover `#o-caminho-da-kita-a-universidade`).

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (< `lg`) | Phase 9 timeline mobile stepper unchanged; long editorial prose stacks in `max-w-3xl`; no horizontal overflow |
| Desktop (≥ `lg`) | Phase 9 desktop timeline unchanged; chapters read as linear narrative below |
| Print | Timeline collapsibles stay force-expanded via `guide-print-expand`; Berlin summary and glossary print as normal block content |

No new responsive patterns in Phase 10.

---

## Accessibility

- Keep Phase 9 timeline landmark, list semantics, collapsible ARIA, focus rings, and 44px targets.
- Document outline: single H1 from GuideIntro; six journey H2s + Glossário; three peer H3s under caminhos — no fake headings inside GlossaryTerm (`dt` stays `dt`).
- Glossary deep-links: after id enhancement, in-page `[Termo](#slug)` must move focus/scroll to the matching `<dl>`.
- Berlin differences: never color-only — prose “Em Berlim…” or badge text “Em Berlim” always present.
- Optional external Senate links (if added in Fontes): existing MDX `a` already sets `rel="noopener noreferrer"` + `target="_blank"` for `http` hrefs.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none new | not required — 2026-07-24 |
| Third-party registries | none | not applicable — 2026-07-24 |

No `shadcn add`, no third-party blocks, no new npm UI packages.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
