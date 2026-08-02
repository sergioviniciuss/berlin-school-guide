---
status: approved
phase: 15-profile-ui-tags-narrative
source: [15-VERIFICATION.md]
started: 2026-07-30T06:10:00Z
updated: 2026-08-02T11:51:00Z
---

## Current Test

Approved by user 2026-08-02 after Chrome MCP browser UAT (static `out/` on http://127.0.0.1:53730, 2026-07-30)

## Tests

### 1. Pilot profile visual pass
expected: After the header: H2 Perfil da escola, then Características da escola with category H3s, confidence chips, Ver evidência expand revealing source-type badges and #source-* links; Fontes shows Citado em: including tag labels; factual schoolProfile row reads Perfil oficial
result: pass
notes: Verified on `/schools/richard-wagner-schule` — order header → Perfil da escola → Características (Foco acadêmico) → factual sections → Fontes with Citado em: including “Foco em artes e música” → Perfil oficial label; Ver evidência present.

### 2. Official vs community distinction
expected: Collapsed tag shows label + confidence only (no Comunidade badge); expanded evidence and Fontes use formatSourceType labels (e.g. Oficial vs Fontes comunitárias trianguladas) with the same chip treatment — no stigma styling
result: pass
notes: Collapsed showed label + “Confirmado por múltiplas fontes” only. Expand revealed “Site da escola” + “Oficial” source-type labels with Ver fonte / Abrir original. No “Comunidade” collapsed badge. This pilot has no community-sourced citations; community label path covered by unit tests.

### 3. Non-pilot additive-only check
expected: No Perfil da escola / Características chrome; factual sections and Fontes unchanged aside from additive correction link; Perfil oficial label on schoolProfile field
result: pass
notes: `/schools/adam-ries-schule` — no Perfil da escola / Características; goes header → Identificação; Perfil oficial present; correction CTA present.

### 4. Correction mailto flow
expected: Lands on /report-correction/?school={slug} with Escola prefilled, scope copy naming tags and Perfil da escola, mailto subject/body including slug and qualitative scope
result: pass
notes: From adam-ries CTA → `/report-correction/?school=adam-ries-schule`; H1 Sugerir correção; scope copy names tags + Perfil da escola; Escola: Adam-Ries-Schule; mailto includes slug and qualitative scope text.

## Summary

total: 4
passed: 4
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps
