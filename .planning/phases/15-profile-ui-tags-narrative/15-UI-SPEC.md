---
phase: 15
slug: profile-ui-tags-narrative
status: approved
shadcn_initialized: true
preset: new-york / baseColor neutral / cssVariables
created: 2026-07-29
reviewed_at: 2026-07-29T22:54:00+02:00
---

# Phase 15 — UI Design Contract

> Visual and interaction contract for Profile UI (Tags & Narrative). Locked decisions from `15-CONTEXT.md` + existing SchoolProfile design language. Generated for planner/executor consumption.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn |
| Preset | new-york; baseColor `neutral`; cssVariables true (`components.json`) |
| Component library | Radix primitives via shadcn (`src/components/ui`) |
| Icon library | lucide-react (`ExternalLink` already used on profile) |
| Font | Inherit site body stack (Arial, Helvetica, sans-serif in `globals.css`) — **do not introduce a new display font this phase** |

**Reuse, do not reinvent:** Match `SchoolProfile` / `SourcesSection` / `StatusBadge` / `ComparisonEvidenceNote` patterns (neutral surfaces, `text-blue-700` links, `rounded-full` chips, `border-neutral-200` cards).

---

## Spacing Scale

Declared values (multiples of 4), aligned to existing profile:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps (`gap-1`), chip py |
| sm | 8px | Compact gaps (`gap-2`), toggle spacing |
| md | 16px | Default padding (`p-4`), narrative paragraph gap |
| lg | 24px | Intra-section stacks (`space-y-6` between category groups) |
| xl | 32px | — reserved; prefer `space-y-8` (32px) between Fontes groups |
| 2xl | 48px | Profile major sections (`space-y-12` on SchoolProfile root) |
| 3xl | 64px | Page shell already uses `py-12` on main — keep |

Exceptions: none new. Touch targets for “Ver evidência” / correction link: min height **44px** hit area (padding OK; visual text size stays `text-sm`).

---

## Typography

Exactly four roles (map to Tailwind already used on profile):

| Role | Size | Weight | Line Height | Tailwind reference |
|------|------|--------|-------------|-------------------|
| Body | 16px | 400 | 1.5 | `text-base text-neutral-700` / `text-neutral-900` |
| Label | 14px | 600 | 1.4 | `text-sm font-semibold` (chips, meta, cite-back) |
| Heading | 20px | 600 | 1.2 | `text-xl font-semibold text-neutral-950` (section H2) |
| Display | 36px | 600 | 1.2 | `text-4xl font-semibold` (school name H1 — unchanged) |

Weights declared: **400** and **600** only. Do not add new weights for Phase 15 components.

Section H3 (category names under Características): `text-sm font-semibold text-neutral-700` (same as Fontes group labels).

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#FFFFFF` / `bg-white` + page white | Page background, surfaces |
| Secondary (30%) | Neutral-50/100/200 (`#FAFAFA` / borders `#E5E5E5`) | Coverage callout, quiet panels, divides |
| Accent (10%) | Blue-700 `#1D4ED8` (`text-blue-700`) + chip fill Blue-50 / text Blue-800 | **Only** the reserved list below |
| Destructive | Red-50 / Red-800 (existing StatusBadge conflicting) | Not used in Phase 15 qualitative UI |
| Caution (existing) | Amber-50 / Amber-900 | Not used for tags/confidence (confidence ≠ quality warning) |

**Accent reserved for (exclusive list):**
1. Text links (methodology, external source URLs, “Ver evidência” / “Ocultar”, correction CTA link)
2. Source-type chips (`bg-blue-50 text-blue-800 rounded-full`) — official, school site, journalism, **and** triangulated community equally
3. Optional focus ring on expand button (`ring` / primary) for a11y

**Not accent:** tag label text, confidence badges, narrative body, section headings (use neutral).

**Confidence badge styling:** Quiet neutral chips matching StatusBadge verified tone — `bg-neutral-100 text-neutral-800 rounded-full px-2 py-1 text-sm font-semibold`. Do **not** use amber/red for `partial` (partial = evidence strength, not error).

**Official vs community:** No extra color. Distinction is the `formatSourceType` label string inside expanded evidence only (CONTEXT D-12–D-14).

---

## Layout Contract (Phase-specific)

### Focal point

1. **Primary:** school name H1 in the existing header (always)
2. **Secondary (when present):** editorial H2 **“Perfil da escola”** — first content after header; Characteristics and factual sections follow in descending priority
3. Do not compete with H1 via larger type or accent fills on the editorial zone

### Profile composition order

1. Existing **header** (unchanged structure)
2. **Editorial zone** (new) — only if `perfilDaEscola` and/or `tags?.length`
3. Existing factual `PROFILE_SECTIONS`
4. **Fontes** (extended)
5. **Correction affordance** (new) — every real school profile

### Editorial zone

| Element | Spec |
|---------|------|
| Wrapper | Sibling of header; same root `space-y-12` rhythm — no card chrome around the whole zone |
| Narrative heading | H2: **“Perfil da escola”** |
| Narrative body | Single paragraph block, `text-base text-neutral-900`, max-width inherits profile (`max-w-3xl`) |
| Tags section heading | H2: **“Características da escola”** — render **only if** ≥1 tag |
| Category grouping | H3 = taxonomy category label (PT-BR); omit empty categories |
| Tag row | Tag label (`formatTagId`) + confidence badge on one line; expand control below/beside |
| Absent narrative | If no `perfilDaEscola`, omit narrative block entirely |
| `qualitativeResearchNotes` | **Never render** |

### Factual label rename

| Field | Old label | New label |
|-------|-----------|-----------|
| `schoolProfile` | Perfil da escola | **Perfil oficial** |

### Fontes cite-back

| Element | Spec |
|---------|------|
| Placement | Inside each source `<article>`, after publisher/date metadata |
| Style | `text-sm text-neutral-600` |
| Prefix | **“Citado em:”** |
| Content | Comma-separated PT-BR labels of citing fields, tag names, and/or **“Perfil da escola”** when narrative is associated |
| Missing cite-back | Omit the line (do not show empty “Citado em:”) |

### Correction path

| Element | Spec |
|---------|------|
| Profile placement | After Fontes, still inside profile column |
| Control | Text link (accent): **“Sugerir correção ou atualização”** → `/report-correction/?school={slug}` |
| Page layout | Same `main` shell: `mx-auto max-w-3xl px-6 py-12` |
| Page H1 | **“Sugerir correção”** |
| Intro | Explains scope includes factual fields, **características (tags)**, and **Perfil da escola** |
| Prefill | Show school name (from slug) in a read-only line: **“Escola: {name}”** |
| Action | Primary: **“Enviar por e-mail”** (mailto with subject including school name/slug) — static-export safe |
| Invalid/missing slug | Body explains how to name the school in the message; still offer generic mailto |

---

## Interaction Contract

| Interaction | Behavior |
|-------------|----------|
| Tag evidence expand | Button toggles `aria-expanded`; collapsed = label + confidence only; expanded = source-type chips + citation links (prefer `#source-{id}` when source is on page + optional external URL) |
| Toggle copy | Collapsed: **“Ver evidência”**; Expanded: **“Ocultar evidência”** |
| Pattern reference | Same interaction model as `ComparisonEvidenceNote` (button + revealed region); do not couple packages |
| Independent blocks | Removing any single tag or the narrative from data must not break the page (conditional render only) |
| Non-pilots | No empty Características shell; no empty Perfil shell |

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Narrative H2 | Perfil da escola |
| Tags H2 | Características da escola |
| Factual `schoolProfile` label | Perfil oficial |
| Evidence toggle (show) | Ver evidência |
| Evidence toggle (hide) | Ocultar evidência |
| Fontes cite-back prefix | Citado em: |
| Profile correction CTA | Sugerir correção ou atualização |
| Report page H1 | Sugerir correção |
| Report primary action | Enviar por e-mail |
| Report scope line | Inclua problemas em dados factuais, características (tags) e no texto de Perfil da escola. |
| Tags empty | *(no UI — section omitted)* |
| Fontes empty | Nenhuma fonte citada nesta página. *(existing — keep)* |
| Report missing school | Não encontramos essa escola no link. Descreva o nome da escola no e-mail. |
| Error (mailto blocked) | Não foi possível abrir o e-mail. Copie o endereço de contato da página e envie a sugestão manualmente. |

Destructive confirmation: **none** in this phase.

---

## Component Inventory (expected)

| Component | Responsibility |
|-----------|----------------|
| `EditorialNarrative` (or equivalent) | Renders `perfilDaEscola` under locked H2 |
| `TagsSection` | Category groups + tag rows + expand |
| `TagEvidence` (optional split) | Expanded source-type + citations |
| `collectCitedSources` (extend) | Merge field/tag/narrative cites; cite-back metadata |
| `SourcesSection` (extend) | Render “Citado em:” line |
| `ReportCorrection` page | Minimal static report flow |
| Profile wiring | Insert editorial zone; rename label; footer link |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none new required for this phase (compose with existing Tailwind + lucide) | not required |
| third-party | none | not applicable |

Do **not** add new shadcn blocks unless an existing primitive is missing; prefer plain markup matching SourcesSection.

---

## Accessibility

- Expand control: `type="button"`, `aria-expanded`, `aria-controls` pointing at evidence region id
- Headings: single H1 (school name); editorial/tags/Fontes as H2; categories as H3
- Focus visible on toggles and correction link
- Do not rely on color alone for confidence or source type (text labels required)

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS (FLAG addressed: collapse = “Ocultar evidência”)
- [x] Dimension 2 Visuals: PASS (FLAG addressed: focal point declared)
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-07-29
