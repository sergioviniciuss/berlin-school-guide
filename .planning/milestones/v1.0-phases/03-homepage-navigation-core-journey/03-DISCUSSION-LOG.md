# Phase 3: Homepage, Navigation & Core Journey - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-11
**Phase:** 03-homepage-navigation-core-journey
**Areas discussed:** Homepage depth, Nav scope for unreleased routes, Header/footer pattern, Legacy cleanup

---

## Homepage depth

| Option | Description | Selected |
|--------|-------------|----------|
| Single hero + primary CTA | Polish existing minimal shape | |
| Hero + 2–3 trust sections | Research, evidence, Lichtenberg scope blocks | |
| Fuller landing page | Hero + journey cards to /schools and /methodology | ✓ |

**User's choice:** Fuller landing page with journey cards

### Follow-up decisions

| Question | Selected |
|----------|----------|
| Secondary homepage actions | Methodology card + Lichtenberg scope note |
| Journey card layout | Primary directory card dominant; methodology secondary |
| Hero headline | Parent-facing Portuguese title; eyebrow stays "Berlin School Guide" |

---

## Nav scope for unreleased routes

| Option | Description | Selected |
|--------|-------------|----------|
| Live routes only | Início, Escolas, Metodologia | ✓ |
| All planned, disabled styling | Guias/Comparar as "Em breve" | |
| Omit until shipped | Add later phases only | |

**User's choice:** Live routes only

### Follow-up decisions

| Question | Selected |
|----------|----------|
| NAV-01 guides link (no /guides yet) | Defer guides link until Phase 7 |
| Future nav additions | Add links when routes exist in later phases |
| Logo links home | Yes, always on every page |

---

## Header/footer pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Header only | No footer | |
| Header + minimal footer | Copyright + optional methodology link | ✓ |
| Header + trust disclaimer footer | Repeat coverage-is-not-quality messaging | |

**User's choice:** Header + minimal footer

### Follow-up decisions

| Question | Selected |
|----------|----------|
| Mobile navigation | Hamburger menu on small viewports |
| Active nav highlighting | Yes — underline or bold |
| Layout placement | Root `src/app/layout.tsx` |

---

## Legacy cleanup

| Option | Description | Selected |
|--------|-------------|----------|
| Remove m2-smoke entirely | Delete route, MDX, tests | ✓ |
| Keep but hide | URL-only access | |
| Redirect to / | Remove content, redirect | |

**User's choice:** Full removal

### Follow-up decisions

| Question | Selected |
|----------|----------|
| Update e2e smoke test in Phase 3 | Yes — home → /schools journey |
| Delete m2-smoke.mdx | Yes — full removal |
| Directory inline methodology link | Keep global nav + existing SchoolDirectory link |

---

## Claude's Discretion

- Exact Portuguese copy for homepage, journey cards, nav labels
- Hamburger implementation details and active-link styling
- Footer content beyond copyright

## Deferred Ideas

- Guias and Comparar nav items — Phases 7 and 6 respectively
- Disabled "Em breve" nav placeholders — rejected
- Full e2e CI wiring — Phase 8
