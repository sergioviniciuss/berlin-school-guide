# Phase 9: Onboarding Guide Visual Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-12
**Phase:** 9-onboarding-guide-visual-foundation
**Areas discussed:** Education timeline layout, Pathway/decision diagrams, Berlin difference callouts, Phase 9 route shell scope

---

## Education timeline layout

| Option | Description | Selected |
|--------|-------------|----------|
| Horizontal desktop / vertical mobile (recommended default) | Simple left-to-right sequence on desktop, stacked on mobile | |
| Responsive infographic (custom) | Left-to-right flow with branching and converging paths on desktop; top-to-bottom preserving structure on mobile | ✓ |
| Always vertical | Single scrollable column on all devices | |

**User's choice:** Responsive infographic — desktop left-to-right with branching decision points and converging higher-ed pathways; mobile top-to-bottom preserving visual structure. Goal: entire system at a glance, not just a sequence of stages.

| Option | Description | Selected |
|--------|-------------|----------|
| Stage names primary | Institution type largest; ages secondary | |
| Age ranges primary | Ages largest; stage names secondary | |
| All three with hierarchy (custom) | Stage name + grades + ages on every node; stage name largest | ✓ |

**User's choice:** All three always visible with clear hierarchy. Example: Grundschule / Grades 1–6 / Ages ~6–12.

| Option | Description | Selected |
|--------|-------------|----------|
| Compact card | Stage + grades + ages only in node | ✓ |
| Rich card | Node includes bullet highlights | |
| You decide | Minimal nodes; Phase 10 adds via props | |

| Option | Description | Selected |
|--------|-------------|----------|
| Static infographic | No interaction | |
| Expandable nodes | Tap/click reveals detail | ✓ |
| Anchor links only | Static nodes linking to sections below | |

| Option | Description | Selected |
|--------|-------------|----------|
| Short summary on expand | 2–3 sentences + optional anchor link | ✓ |
| Bullets only | Bullet list in expanded state | |
| Full section inline | Accordion-style full content | |

---

## Pathway / decision diagrams

| Option | Description | Selected |
|--------|-------------|----------|
| Integrated into main timeline | Branches emerge from transition nodes in same infographic | ✓ |
| Separate diagram block | Distinct decision diagram below timeline | |
| Both | Main timeline + dedicated branching diagram | |

| Option | Description | Selected |
|--------|-------------|----------|
| Full non-Gymnasium routes | Gymnasium, Realschule, Hauptschule, Gesamtschule, vocational/Ausbildung | ✓ |
| Gymnasium + vocational only | Simplified secondary representation | |
| You decide | All routes; collapse minor paths on mobile | |

| Option | Description | Selected |
|--------|-------------|----------|
| Collapse minor on mobile | Main path full; secondary branches in collapsible "Outras vias" | ✓ |
| Full vertical on mobile | All branches visible; longer scroll | |
| You decide | Preserve structure; optimize readability | |

---

## Berlin difference callouts

| Option | Description | Selected |
|--------|-------------|----------|
| Inline badge on nodes | "Em Berlim" pill + one-line note on affected nodes | |
| Sidebar callout box | Grouped Berlin differences in one block | |
| Both | Inline badges + summary "Berlin em destaque" box linking to berlin-school-system | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| Factual highlight | Neutral accent border/background | ✓ |
| Prominent | Strong amber/blue alarm-style emphasis | |
| Subtle | Icon + text only | |

---

## Phase 9 route shell scope

| Option | Description | Selected |
|--------|-------------|----------|
| Demo + section stubs | Public route with live components, placeholder copy, heading stubs for Phase 10 | ✓ |
| Components only | No public route until Phase 10 | |
| Minimal route | GuideIntro + one timeline example only | |

| Option | Description | Selected |
|--------|-------------|----------|
| Defer glossary to Phase 10 | Timeline/pathway/callout only in Phase 9 | |
| GlossaryTerm shell in Phase 9 | Styled term + definition component with placeholders | ✓ |

---

## Claude's Discretion

None explicitly requested — user made concrete choices for all discussed areas. Planner/implementer has discretion on layout mechanics, a11y details, placeholder copy, and test scope (see CONTEXT.md).

## Deferred Ideas

- Full editorial content — Phase 10
- Homepage/Guides hub discovery — Phase 11
- Interactive calculators — backlog / out of scope
