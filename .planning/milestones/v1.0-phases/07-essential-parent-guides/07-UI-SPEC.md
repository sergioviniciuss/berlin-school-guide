---
phase: 7
slug: essential-parent-guides
status: approved
reviewed_at: 2026-07-11T23:35:00+02:00
shadcn_initialized: true
preset: new-york / neutral / cssVariables
created: 2026-07-11
---

# Phase 7 — UI Design Contract

> Visual and interaction contract for Essential Parent Guides. Generated from locked CONTEXT.md (D-01 through D-19).

**Scope:** `/guides` hub, `/guides/berlin-school-system/`, `/guides/first-steps/`, Guias nav, homepage journey card, cross-links from directory/compare. Static MDX + print-friendly checklist. No interactive checkbox persistence, no hub teasers for unpublished guides.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn/ui — reuse `Button`, existing card borders |
| Preset | new-york, neutral, cssVariables |
| Icons | lucide-react — `BookOpen`, `ListChecks`, `Printer` (optional) |
| Font | Arial stack — unchanged |
| Layout width | `max-w-3xl` for guide pages (match `/methodology`) |

**New shadcn:** none required.

---

## 1. Copywriting Contract

Brazilian Portuguese. Practical relocation-guide tone. No school quality rankings.

### Global

| Element | Copy |
|---------|------|
| Nav label | `Guias` → `/guides` |
| Hub h1 | `Guias` |
| Hub intro | Short learning-path framing — e.g. "Comece pelo sistema escolar berlinense, depois use checklists práticas para visitar escolas." |

### Hub categories (only show sections with live content)

| Section | When visible |
|---------|--------------|
| `Entenda o sistema` | System guide live |
| `Checklists práticas` | First-steps checklist live |
| `Guias avançados` | Hidden in Phase 7 — no empty section heading |

### System guide (`/guides/berlin-school-system/`)

| Element | Copy pattern |
|---------|--------------|
| Eyebrow | `Berlin School Guide` |
| h1 | `Como funciona a escola primária em Berlim` |
| Description | First-read framing for Brazilian families new to Berlin |
| Section h2s | Question-led — e.g. `O que é uma Grundschule?`, `Como funciona a matrícula?`, `O que é Ganztag?` |
| Glossário h2 | `Glossário` — quick-reference term list at bottom |

### Checklist (`/guides/first-steps/`)

| Element | Copy pattern |
|---------|--------------|
| h1 | `Primeiros passos` |
| Description | Newcomer path from zero to visit-ready |
| List items | Action-oriented checklist steps (static `<ul>` or ordered list) |
| Print affordance | `Imprimir checklist` button (optional) or browser print via `@media print` |

### Cross-links

| Location | Copy pattern |
|----------|--------------|
| Directory intro | Link to guides when family needs system context first |
| Compare intro | Similar — before comparing, understand the system |

---

## 2. Layout Specifications

### Guides hub (`/guides`)

```
[GuideIntro: Guias + intro paragraph]

<section Entenda o sistema>
  [Featured journey card — primary border-l-primary, white bg]
    h2: Como funciona a escola primária em Berlim
    p: one-line description
    Button → /guides/berlin-school-system/
</section>

<section Checklists práticas>
  [Secondary card — neutral-50 bg, outline button]
    h2: Primeiros passos
    p: one-line description
    Button outline → /guides/first-steps/
</section>
```

Match `HomeJourneyCards` visual language: primary card = featured, secondary = neutral-50.

### Guide pages

Same shell as methodology:
- `main.mx-auto.max-w-3xl.px-6.py-12.space-y-8`
- `GuideIntro` + MDX body
- System guide: optional **in-page section nav** at top (anchor links to h2 ids) — Claude's discretion; recommend compact `<nav aria-label="Nesta página">` list on desktop only if content exceeds ~4 sections

### Checklist print

- `@media print`: hide site header/footer or use existing layout print rules
- Checklist items remain readable; page breaks avoided mid-item where possible
- No background colors that waste ink

---

## 3. Component Contracts

| Component | Purpose |
|-----------|---------|
| `GuideIntro` | Reuse unchanged for all guide pages + hub |
| `GuidesHub` | Category sections + journey cards for live guides only |
| `GuideSectionNav` (optional) | Anchor jump links for system guide |
| MDX `GuideTerm` (optional) | Inline term with title tooltip or `<dfn>` styling for first use |

---

## 4. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Hub cards stack vertically; guide pages single column; min-h-11 tap targets on cards/buttons |
| Desktop | Hub cards may stack or use consistent vertical rhythm; guide max-w-3xl centered |

---

## 5. Accessibility

- Hub cards: each card is an `<article>` with heading + descriptive paragraph + link/button
- Section nav: `aria-label="Nesta página"` if present
- Print button: `aria-label="Imprimir checklist"`
- Anchor headings: stable `id` attributes matching link targets

---

## 6. Out of Scope (UI)

- Disabled/"Em breve" hub cards
- Interactive checklist checkboxes with persistence
- Separate `/checklists/` route
- Full guide library index sections with empty categories
