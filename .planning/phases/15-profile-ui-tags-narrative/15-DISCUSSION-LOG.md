# Phase 15: Profile UI (Tags & Narrative) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-29
**Phase:** 15-profile-ui-tags-narrative
**Areas discussed:** Page placement & naming, Tag presentation & evidence expand, Official vs community distinction, Fontes merge & correction path

---

## Page placement & naming

### A. Section order

| Option | Description | Selected |
|--------|-------------|----------|
| After header, before Identificação | Character first, then facts | ✓ |
| After Oferta, before Fontes | Facts first, then qualitative | |
| Split | Narrative top; tags in Oferta | |

### B. Naming collision

| Option | Description | Selected |
|--------|-------------|----------|
| Rename factual row; keep “Perfil da escola” for narrative | Factual → “Perfil oficial” | ✓ |
| Keep factual label; rename narrative | e.g. Síntese editorial | |
| Both keep “Perfil…” with subtitle only | Weak distinction | |

**User's choice:** A1, B1 — editorial immediately after header; factual `schoolProfile` → “Perfil oficial”; reserve “Perfil da escola” for editorial narrative.

**Notes:** Clear distinction between verified source data and the guide’s evidence-backed synthesis.

---

## Tag presentation & evidence expand

### A. Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Grouped by category under Características | Omit empty categories | ✓ |
| Flat chip row | No category headings | |
| Inline in narrative | Chips inside paragraph | |

### B. Default visible

| Option | Description | Selected |
|--------|-------------|----------|
| Label + confidence only | Source types behind expand | ✓ |
| Label + confidence + source-type always | Citations expand | |
| Everything expanded | No collapse | |

### C. Expand pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Per-tag Ver evidência / Ocultar | Independent provenance | ✓ |
| Shared evidence panel | One panel for selected tag | |
| Always-visible citation links | No expand | |

**User's choice:** A1, B1, C1 — “Características da escola”; scannable defaults; per-tag evidence toggle.

---

## Official vs community distinction

### A. Where shown

| Option | Description | Selected |
|--------|-------------|----------|
| Expanded evidence only via formatSourceType | Calm when community rare | ✓ |
| Persistent tag-level Comunidade badge | Visible when collapsed | |
| Both | Badge + expand labels | |

### B. Visual strength

| Option | Description | Selected |
|--------|-------------|----------|
| Same treatment as other source-type chips | No stigma styling | ✓ |
| Stronger contrast for community | Color/border differentiation | |
| Explanatory line under community tags | Extra methodology callout | |

### C. Narrative chrome

| Option | Description | Selected |
|--------|-------------|----------|
| No official/community chrome on narrative | Provenance on tags + Fontes | ✓ |
| Footnote listing source tiers | Under paragraph | |
| Inline markers in narrative | In-text indicators | |

**User's choice:** A1, B1, C1 — community as equal evidence type that already met a higher editorial bar; narrative stays clean.

---

## Fontes merge & correction path

### A. Fontes merge

| Option | Description | Selected |
|--------|-------------|----------|
| Single deduped Fontes via extended collector | Field + tag + qualitative | ✓ |
| Separate Fontes das características subsection | Split lists | |
| Field-only Fontes; weak tag linking | Tag-only sources may be missing | |

### B. Cite-back on cards

| Option | Description | Selected |
|--------|-------------|----------|
| No per-cite back-links beyond today | Simpler cards | |
| Brief indication of fields/tags/narrative citing the source | Transparency without complex backlinking | ✓ |
| Claude discretion | As long as dedupe works | |

### C. Correction entry point

| Option | Description | Selected |
|--------|-------------|----------|
| Profile link → /report-correction/ | Explicit coverage of tags + Perfil | ✓ |
| Mailto-only on profile | No dedicated page | |
| Inline only next to tags/Perfil | No global profile link | |

### D. Correction page depth

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal v1.2 + school-prefilled | Static-friendly | ✓ |
| Full interactive backend form | Scope creep | |
| Stub “em breve” | Insufficient trust | |

**User's choice:** A1, B2, C1, D1 — merged Fontes with brief cite-back; lightweight `/report-correction/` with school prefilled; explicitly covers facts, tags, and Perfil da escola.

---

## Claude's Discretion

- Editorial zone layout details, component naming, Fontes cite-back microcopy, report mechanism (mailto vs static form), optional `qualitativeLastReviewed` display

## Deferred Ideas

- Directory/compare tags (FUT-02)
- Stronger community chrome / collapsed badge
- Server-backed correction persistence
- Tag-aware Open Day questions (FUT-04)
- Public `qualitativeResearchNotes`

---

*Audit trail only — see 15-CONTEXT.md for locked decisions.*
