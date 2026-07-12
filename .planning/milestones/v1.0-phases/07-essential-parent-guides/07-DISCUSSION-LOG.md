# Phase 7: Essential Parent Guides - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-11
**Phase:** 07-essential-parent-guides
**Areas discussed:** V1 guide scope, Checklist format, German terms/glossary, Guias hub & navigation

---

## V1 Guide Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal | System guide + checklist only; no hub | |
| Hub with live only | `/guides` index listing only shipped pages | ✓ |
| Hub with teasers | "Em breve" cards for future guides | |

**System guide depth:** User chose modular anchor-linked reference — concise (~recommended length), one practical question per section, enough context to understand and act, may mention future dedicated guides in prose without placeholder links. Goal: first page every new family reads.

---

## Checklist Format

| Option | Description | Selected |
|--------|-------------|----------|
| School visit only | Open Day questions | |
| Enrollment prep only | Documents/deadlines | |
| Both separate pages | Two checklists | |
| Primeiros passos (custom) | Combined newcomer path: catchment, timeline, documents, Open Day, questions — stops before detailed enrollment | ✓ |

| Interactivity | Selected |
|---------------|----------|
| Static MDX + print stylesheet | ✓ |
| Interactive localStorage checkboxes | |
| Static only | |

| Route | Selected |
|-------|----------|
| `/checklists/...` | |
| Under `/guides/...` | ✓ |
| Embedded in system guide | |

**Slug decision (planner discretion):** `/guides/first-steps/` with Portuguese title "Primeiros passos"

---

## German Terms (GUID-03)

| Glossary approach | Selected |
|-------------------|----------|
| Inline + Glossário section at bottom | ✓ |
| Inline only | |
| Separate glossary page | |

| Methodology overlap | Selected |
|---------------------|----------|
| Split roles — guides = school choice terms; methodology = evidence terms | ✓ |
| Cross-link only | |
| Consolidate all terms to one page | |

---

## Guias Hub & Navigation

| Hub layout | Selected |
|------------|----------|
| Simple list | |
| Journey cards by learning path; scalable categories (Entenda o sistema, Checklists práticas, Guias avançados) | ✓ |

| Nav updates | Selected |
|-------------|----------|
| Header + footer + homepage card + cross-links from directory/compare | ✓ |

| Future guide references | Selected |
|-------------------------|----------|
| Hub lists live only; prose may mention future topics; no placeholders/teasers/disabled cards | ✓ |

---

## Claude's Discretion

Copy, MDX components beyond GuideIntro, print button vs CSS-only, exact cross-link placement, SEO metadata, test scope.

## Deferred Ideas

Full guide library, `/checklists/` top-level route, interactive checklist persistence, hub teasers, detailed enrollment guide, correction flow.
