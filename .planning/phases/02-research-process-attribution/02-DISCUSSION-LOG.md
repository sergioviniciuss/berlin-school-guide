# Phase 2: Research Process & Attribution - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-11
**Phase:** 02-research-process-attribution
**Areas discussed:** Research workflow document, Methodology page depth, Citation completeness, Research date integrity

---

## Research workflow document

| Option | Description | Selected |
|--------|-------------|----------|
| Both humans and AI | One checklist any researcher can execute | ✓ |
| Human researchers only | Optimized for manual research | |
| AI sessions only | Optimized for Claude-style execution | |

| Option | Description | Selected |
|--------|-------------|----------|
| Step-by-step checklist | Per-field rules and procedural steps | ✓ |
| Policy reference only | Expand RESEARCH.md rules, no steps | |
| Split docs | Policy in RESEARCH.md, checklist elsewhere | ✓ (implicit: new workflow doc + cross-link RESEARCH.md) |

| Option | Description | Selected |
|--------|-------------|----------|
| `docs/research/SCHOOL_RESEARCH_WORKFLOW.md` | New procedural doc | ✓ |
| Expand `docs/RESEARCH.md` | Single file | |
| `.planning/` internal doc | Not in docs/ | |

| Option | Description | Selected |
|--------|-------------|----------|
| Explicit decision tree per field | Portrait → verified; infer → not_confirmed | ✓ |
| General principles only | Researcher judgment | |
| Copy inferredFrom rules inline | Plus per-field source table | |

**User's choice:** 1, 1, 1, 1 across all four questions

---

## Methodology page depth

| Option | Description | Selected |
|--------|-------------|----------|
| Practical summary (~1 scroll) | How to read cards, statuses, coverage | ✓ |
| Full evidence taxonomy | Every status and source type | |
| Minimal FAQ | 5–6 questions | |

| Option | Description | Selected |
|--------|-------------|----------|
| Plain-language coverage v2 | Examples for Pesquisa básica/detailed | ✓ |
| Brief mention | Link to workflow for researchers | |
| Skip coverage math | Verified vs missing only | |

| Option | Description | Selected |
|--------|-------------|----------|
| Short glossary section | German term + Portuguese explanation | ✓ |
| No glossary | Evidence mechanics only | |
| Inline only | Where terms appear in examples | |

| Option | Description | Selected |
|--------|-------------|----------|
| Footer link on /schools | Minimal discoverability | |
| Directory header link | "Como funciona nossa pesquisa?" | ✓ |
| Standalone URL only | No in-app links until Phase 3 | |

**User's choice:** 1, 1, 1, 2

---

## Citation completeness

| Option | Description | Selected |
|--------|-------------|----------|
| Full citation audit now | Publisher, URL, access date for all verified fields | ✓ |
| Schema validation only | Spot-fix obvious gaps | |
| Audit report only | Defer fixes | |

| Option | Description | Selected |
|--------|-------------|----------|
| Data-ready Phase 2, render Phase 4 | Matches RSCH-04 split | ✓ |
| Minimal sources on directory cards | Phase 2 rendering | |
| Standalone citation preview page | Phase 2 | |

| Option | Description | Selected |
|--------|-------------|----------|
| Extend `pnpm validate:data` | Citation quality in CI | ✓ |
| Manual audit only | No CI enforcement | |
| Separate validate:citations script | Not merged yet | |

| Option | Description | Selected |
|--------|-------------|----------|
| Actual per-source access dates | When source was checked | ✓ |
| Single milestone date | 2026-07-11 for all | |
| Planner discretion | Pragmatic default | |

**User's choice:** 1, 1, 1, 1

---

## Research date integrity

| Option | Description | Selected |
|--------|-------------|----------|
| Per-school actual audit dates | When that school was reviewed | ✓ |
| Single shared date | Phase 1 completion for all 10 | |
| Portrait vs deeper dates | By research depth | |

| Option | Description | Selected |
|--------|-------------|----------|
| lastSourceChecked = most recent source access; lastResearched = full review | May differ | ✓ |
| Same date for both fields | Every school | |
| Planner discretion per school | During audit | |

| Option | Description | Selected |
|--------|-------------|----------|
| Dates required all 10 schools; lastSourceChecked ≥ oldest accessedAt | CI enforced | ✓ |
| Dates only for in_research/profile_ready | Partial enforcement | |
| Warn-only | Don't fail CI yet | |

| Option | Description | Selected |
|--------|-------------|----------|
| Update both dates on any re-check | Explicit workflow step | ✓ |
| lastSourceChecked only on source change | Partial update rule | |
| Researcher judgment | Principle only | |

**User's choice:** 1, 1, 1, 1

---

## Claude's Discretion

- MDX vs page composition for `/methodology`
- Exact Portuguese copy for methodology and directory header link
- Citation validation error message format
- Per-school date derivation during audit

## Deferred Ideas

- Full glossary / guide library — Phase 7
- Citation UI on detail pages — Phase 4
- Shared navigation to methodology — Phase 3
