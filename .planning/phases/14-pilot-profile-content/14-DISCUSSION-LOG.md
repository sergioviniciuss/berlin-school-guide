# Phase 14: Pilot Profile Content - Discussion Log

**Date:** 2026-07-29
**Mode:** discuss (all 6 gray areas; user priority order)

## Areas discussed

### 1. Where “Perfil da escola” lives
**Options:** (1) School-record string field [recommended], (2) Per-school MDX, (3) Both
**Selected:** 1 — `perfilDaEscola: z.string().trim().min(1).optional()`; plain PT-BR; tags→perfil required; perfil→qualitativeLastReviewed required; no MDX/Markdown.

### 2. Tagging depth / sparse-honest
**Options:** (1) Sparse-but-honest [recommended], (2) Min one tag, (3) Role-based quotas
**Selected:** 1 — no hard min/max; zero tags + short perfil valid.

### 3. Narrative length & citation discipline
**Options:** (1) Short paragraph + editorial discipline [recommended], (2) Hard citation map schema, (3) Multi-paragraph
**Selected:** 1 — soft length only; no Zod max; human citation discipline.

### 4. Community triangulation research
**Options:** (1A) Live research + fail-closed; PILOT-03 = attempt+outcome, (1B) Require published tag, (2) Synthetic fixtures, (3) Defer
**Selected:** 1A

### 5. qualitativeLastReviewed + withhold notes
**Options:** (1a) School notes only, (1b) Docs only, (1c) Both [selected], (2) Date only, (3) Date only with tags
**Selected:** 1c — date on all qualitative pilots; withhold note on school + fuller docs log.

### 6. Pilot scope
**Options:** (1) All 5 [recommended], (2) Subset 3–5, (3) Core 3
**Selected:** 1 — all five named schools.

## Deferred
- UI (Phase 15), MDX perfil, synthetic community fixtures, tag quotas

---

*Audit trail only — see 14-CONTEXT.md for locked decisions.*
