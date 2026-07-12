---
phase: 07-essential-parent-guides
plan: 02
subsystem: guides
tags: [mdx, editorial, portuguese, glossary, checklist]

requires:
  - phase: 07-essential-parent-guides
    provides: MDX route shells and mdx-components from 07-01
provides:
  - Full berlin-school-system.mdx (~1000 words, modular h2 sections)
  - Full first-steps.mdx checklist (area, timeline, documents, visit, questions)
  - Glossário with school-choice German terms
affects:
  - 07-03-PLAN (filter help links target glossary/Ganztag anchors)

tech-stack:
  added: []
  patterns:
    - "Parent-centered o que verificar bullets per system guide section"
    - "Checklist stops before detailed enrollment; mentions future dedicated guide"

key-files:
  modified:
    - src/content/guides/berlin-school-system.mdx
    - src/content/guides/first-steps.mdx
    - src/app/guides/berlin-school-system/page.test.tsx
    - src/app/guides/first-steps/page.test.tsx

requirements-completed: [GUID-01, GUID-02, GUID-03]

duration: 20min
completed: 2026-07-11
---

# Phase 7 Plan 02: Guide Editorial Content

**Full Portuguese MDX for Berlin primary system guide and Primeiros passos checklist**

## Accomplishments

- System guide covers Grundschule, matrícula overview, Einzugsgebiet, Ganztag, public/private, site usage, and Glossário
- Inline term explanations on first use; links to /schools, /compare, /methodology, and first-steps checklist
- Checklist grouped by area, timeline, documents, school visit, and questions to bring
- Enrollment step-by-step explicitly deferred to future guide per D-08

## Verification

```bash
pnpm test -- src/app/guides/berlin-school-system/page.test.tsx src/app/guides/first-steps/page.test.tsx
```

Page tests assert key section headings via mocked MDX stubs.
