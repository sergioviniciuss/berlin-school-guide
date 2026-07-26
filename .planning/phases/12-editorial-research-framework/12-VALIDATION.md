---
phase: 12
slug: editorial-research-framework
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-07-26
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 30.4.2 + React Testing Library 16.3.2 |
| **Config file** | `jest.config.mjs` |
| **Quick run command** | `pnpm test -- methodology` |
| **Full suite command** | `pnpm test` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm test -- methodology` (only if methodology page/MDX was touched)
- **After every plan wave:** Run `pnpm test`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 12-*-* | TBD | TBD | FRAME-01 | — | N/A (docs prose) | manual | n/a — human/PR review of `docs/RESEARCH.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DATA_MODEL.md`, `docs/DECISIONS.md` | n/a | ⬜ pending |
| 12-*-* | TBD | TBD | FRAME-02 | — | N/A (static MDX) | unit | `pnpm test -- src/app/methodology/page.test.tsx` | ✅ exists | ⬜ pending |
| 12-*-* | TBD | TBD | FRAME-03 | — | N/A (docs prose) | manual | n/a — reviewer checks pilot rationale names 3–5 schools incl. ≥1 lower-doc | ❌ Wave 0 (new file) | ⬜ pending |
| 12-*-* | TBD | TBD | FRAME-04 | — | N/A (docs prose) | manual | n/a — reviewer checks qualitative cadence section in `docs/RESEARCH.md` | n/a | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Planner fills concrete Task IDs / Plan / Wave columns when PLAN.md files are written.*

---

## Wave 0 Requirements

Existing infrastructure covers automated FRAME-02 coverage via `src/app/methodology/page.test.tsx` — extend in place once new MDX headings/labels are finalized during planning. No new test framework install required.

Optional (planner discretion, not hard requirement): lightweight grep/test that the editorial guide contains the banned-word list section.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Source hierarchy + independent-source definition in RESEARCH.md | FRAME-01 | Prose has no executable assertion surface | Diff-review `docs/RESEARCH.md` against ROADMAP success criterion 1 |
| Tag taxonomy v1, banned language, Perfil voice in EDITORIAL_GUIDE / DATA_MODEL / DECISIONS | FRAME-01 | Prose review | Diff-review those three docs against ROADMAP success criterion 2 |
| Pilot-selection rationale with ≥1 lower-documentation school | FRAME-03 | Doc content review | Confirm named schools match D-16 diversity dimensions and include a deliberately thin-record school |
| Qualitative review cadence distinct from research_status | FRAME-04 | Doc content review | Confirm `docs/RESEARCH.md` has a qualitative cadence section separate from factual recheck |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
