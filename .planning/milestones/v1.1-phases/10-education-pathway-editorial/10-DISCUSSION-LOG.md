# Phase 10: Education Pathway Editorial - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-24
**Phase:** 10-education-pathway-editorial
**Areas discussed:** Page structure & section flow, Decision point depth & what-to-verify pattern, Berlin callout editorial strategy, Glossary & German term treatment

---

## Page structure & section flow

| Option | Description | Selected |
|--------|-------------|----------|
| One section per major stage | H2 per timeline stage with anchors matching nodes | |
| Journey chapters | Broader H2s with nested H3s for tracks | ✓ (with Germany-first hybrid) |
| You decide | Claude picks structure | |

**User's choice:** Journey chapters with explicit outline; then hybrid Germany-first (option 3) — H1 “Como funciona o sistema educacional na Alemanha”; drop final comparison chapter; Realschule/Hauptschule as brief other-state context; timeline anchors only on real nodes.

**Notes:** Initial outline used Berlin-tilted H1 and a final “Comparando Berlim…” chapter; reconciled to ONBD-04 via Germany-first framing and inline Berlin differences.

---

## Decision point depth & what-to-verify pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Verify at every major transition | “O que verificar” on Kita→GS, post-6th, tracks, quals | |
| Narrative-first, verify at hardest decisions | Verify only at action moments | ✓ |
| Decision callout cards | Short “neste momento decide…” boxes | |

**User's choice:** Narrative-first; “O que verificar” only after Grundschule, track choice (Gymnasium/ISS/Gemeinschaftsschule), and qualification routes. Kita/Grundschule stay understanding-focused.

### Verify block outbound links

| Option | Description | Selected |
|--------|-------------|----------|
| Self-contained + light links | On-page decision + optional next-step links | ✓ |
| Self-contained only | No outbound links; Phase 11 handles discovery | |
| You decide | | |

**User's choice:** Self-contained bullets; one or two optional links to first-steps / berlin-school-system / directory as “learn more”, not required reading.

---

## Berlin callout editorial strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Inline + occasional summary | Em Berlim inline; ≤1 summary box | ✓ |
| Summary boxes only in prose | Timeline badges; summary-variant in MDX | |
| Minimal BerlinCallout | Mostly plain prose | |

### Enrollment detail ownership

| Option | Description | Selected |
|--------|-------------|----------|
| Concept only here | Differences + why; enrollment in berlin-school-system | ✓ |
| Overlap allowed | Brief enrollment restatement OK | |
| You decide | | |

**User's choice:** 1A — inline Em Berlim where genuine differences; at most one summary callout at primary→secondary linking to berlin-school-system; no practical enrollment duplication.

---

## Glossary & German term treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Both first-use + bottom Glossário | Inline gloss + `<GlossaryTerm>` section | ✓ |
| Bottom glossary only | | |
| Inline GlossaryTerm throughout | No separate section | |

### Glossary breadth

| Option | Description | Selected |
|--------|-------------|----------|
| ONBD-05 + journey essentials | Add Kita, GS, tracks, Abitur, Empfehlung, Uni/HS, etc. | ✓ |
| ONBD-05 list only | | |
| You decide extras | | |

**User's choice:** 1A — first-use Portuguese gloss + full Glossário covering ONBD-05 plus Kita, Grundschule, Gymnasium, ISS, Gemeinschaftsschule, Abitur, Empfehlung, Universität, Hochschule; Berufsschule/OSZ and MSA if introduced in prose.

---

## Claude's Discretion

- Exact Portuguese copy, slug anchors, chapter length
- Placement of the single Berlin summary callout within the transition
- MDX vs small shared pattern for “O que verificar”
- Timeline constants summary/`anchorHref` updates
- Minimal test updates to keep onboarding route green

## Deferred Ideas

- Phase 11 discovery, hub, SEO, homepage→onboarding e2e
- Interactive calculators (out of scope)
- Berlin enrollment procedures (remain on berlin-school-system)
