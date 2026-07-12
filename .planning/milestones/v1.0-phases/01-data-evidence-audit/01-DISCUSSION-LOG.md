# Phase 1: Data & Evidence Audit - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-11
**Phase:** 1-Data & Evidence Audit
**Areas discussed:** Fallback downgrades, Coverage score honesty, Directory vs detailed signaling, Honest copy replacement, Unchecked field defaults

---

## Fallback downgrades

| Option | Description | Selected |
|--------|-------------|----------|
| Clear value + `missing` | Remove ganztag reuse; null unless independently researched | |
| Keep value, downgrade to `not_confirmed` | Show Ganztag as hint, not verified | |
| Keep value + explicit inference note | `not_confirmed` with note; exclude from coverage; UI distinguishes inferred vs verified | ✓ |
| You decide | Claude picks approach | |

**User's choice:** Explicit inference approach with expanded rules — preserve inferred value when reasonable, mark `not_confirmed` never `verified`, mandatory evidence note, exclude from coverage, UI must distinguish inferred from verified, upgrade to `verified` when independent evidence found.

**Follow-up decisions:**
- `schoolProfile` + `pedagogyFocus` from `offers`: same inference rules ✓
- `inspectionAvailability` (directory-only): `missing` (not researched) ✓
- Builder: replace fallbacks with explicit `inferredFrom()` helper ✓

---

## Coverage score honesty

| Option | Description | Selected |
|--------|-------------|----------|
| Exclude inferred from numerator | Only `verified` counts; inferred/`not_confirmed` excluded | ✓ |
| Fix data only, keep algorithm | Downgrade fields; formula recalculates | |
| Topical validity check in algorithm | Reject verified with wrong-topic citations | |
| You decide | | |

**User's choice:** Exclude inferred from numerator. Level-aware denominator with single percentage — directory schools measured against directory field set, detailed against full set. UI shows tier label ("Pesquisa básica" / "Pesquisa detalhada"). Bump to coverage v2.

---

## Directory vs detailed signaling

| Option | Description | Selected |
|--------|-------------|----------|
| Research-level badge on SchoolCard now | "Perfil básico" / "Perfil detalhado" visible | ✓ |
| Coverage tier label only | No separate badge | |
| Data layer only, defer UI | Fix records; UI in Phase 4/5 | |

**User's choice:** Badge on cards. Directory cards show only meaningful fields — no missing/unsupported fields displayed. Clear CTA to full profile. No filter in Phase 1. Reclassify detailed schools after audit if they don't meet the bar.

---

## Honest copy replacement

| Option | Description | Selected |
|--------|-------------|----------|
| Lichtenberg-first + honest partial coverage | Emphasize scope and gaps | |
| Berlin School Guide positioning | Initial Lichtenberg coverage, districts expanding; no synthetic/prototype/milestone wording | ✓ |
| Minimal fix only | Remove "sintéticas" | |

**User's choice:** Berlin School Guide framing. Minimal homepage fix (remove M2, add `/schools` link). Keep + strengthen coverage disclaimer with level-aware note. Isolate synthetic exports from production paths.

---

## Unchecked field defaults

| Option | Description | Selected |
|--------|-------------|----------|
| `missing` for unchecked | bilingual, international, welcome classes | ✓ |
| `not_applicable` only with explicit evidence | General policy | ✓ |
| Keep `not_applicable` defaults | Infer absence from silence | |

**User's choice:** `missing` until verified for bilingual, international, welcome classes. `not_applicable` only when portrait or school site explicitly confirms field doesn't apply.

---

## Claude's Discretion

- Exact Portuguese copy strings
- `inferredFrom()` helper API shape
- Directory vs detailed field path lists for v2 denominators
- Profile CTA behavior before Phase 4 route exists
- Reclassification criteria for detailed schools

## Deferred Ideas

- Research-level filter/sort → Phase 5
- Full homepage + navigation → Phase 3
- Detail pages with full evidence display → Phase 4
- Methodology page → Phase 2
