# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-11)

**Core value:** Parents can trust what they read because every factual school field shows its evidence status and sources — and missing or unconfirmed information is visible, not hidden.
**Current focus:** Phase 1 — Data & Evidence Audit

## Current Position

Phase: 1 of 8 (Data & Evidence Audit)
Plan: 0 of TBD in current phase
Status: Ready to plan
Last activity: 2026-07-11 — Roadmap revised to 8 phases (nav + directory UX prioritized)

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: -
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: -
- Trend: -

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Brownfield assessment (2026-07-11): Static export, no backend, field-level evidence model, Lichtenberg-first scope, and feature-first architecture are all confirmed good — keep as-is.
- Brownfield assessment (2026-07-11): Evidence coverage scoring is currently inflated by implicit fallbacks (`ganztag` → `afterSchoolCare`, `offers` reused for multiple fields) — must be fixed in Phase 1, not carried forward.
- Roadmap revision (2026-07-11): Navigation moves to Phase 3 (usable product earlier); new Phase 5 for directory UX before comparison; 8 phases total.

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 1] `docs/DECISIONS.md` 2026-07-10 entry ("evidence coverage = research completeness, not school quality") is directionally correct but currently misapplied — coverage math inflates verified counts via fallback evidence reuse. Must resolve before Phase 2 methodology page can honestly describe scoring.
- [Phase 8] E2E suite (`e2e/smoke.spec.ts`) exists but is not wired into CI (`.github/workflows/ci.yml`) — must add before release readiness can be considered done.
- [Phase 8] No HTTP security headers or dependency vulnerability scanning documented for the eventual static host — deployment docs in Phase 8 should address this.

## Deferred Items

Items acknowledged and carried forward — see ROADMAP.md **Future Backlog** for full list.

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Scope | Complete all Lichtenberg Grundschulen | Future backlog | 2026-07-11 roadmap revision |
| Scope | Additional Berlin districts | Future backlog | 2026-07-11 roadmap revision |
| Scope | Berlin-wide directory import (M8) | Future backlog | 2026-07-11 project init |
| Scope | 20–30 pilot profiles across Berlin (M9) | Future backlog | 2026-07-11 project init |

## Session Continuity

Last session: 2026-07-11
Stopped at: 8-phase roadmap approved with user adjustments; ready to commit and plan Phase 1
Resume file: None
