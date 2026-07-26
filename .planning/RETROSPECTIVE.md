# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.1 — Understand the German & Berlin Education System

**Shipped:** 2026-07-26
**Phases:** 3 | **Plans:** 13 | **Tasks:** 29

### What Was Built
- Visual education journey components (`EducationTimeline`, `BerlinCallout`, `GlossaryTerm`) on `/guides/german-education-system`
- Full Germany-first MDX editorial with Berlin differences, glossary deep-links, and verify moments
- Homepage two-card Start here → onboarding + Explorar escolas
- Guides hub flagship stack + complementary Berlin retitle and cross-linked intros
- Próximos passos / first-steps tip completing Germany → Berlin → schools → act
- Metadata, a11y, smoke, and full Jest + e2e CI green bar

### What Worked
- Wave 0 Nyquist scaffolds (RED e2e first) made Plan 01/03 green targets explicit
- Locked CONTEXT decisions (D-01–D-15) kept homepage/hub composition from scope creep
- Complementary Germany↔Berlin framing avoided duplicating the Berlin primary guide

### What Was Inefficient
- Phase 09 human UAT left `partial` (4 visual scenarios) and was deferred at milestone close
- Milestone closed without a formal `/gsd-audit-milestone` pass
- Guides page intro copy lagged hub reorder until code-review-fix (WR-01)

### Patterns Established
- Homepage journey cards: primary filled + `border-l-primary` vs secondary outline + muted surface
- Distinct accessible CTA names when two guide cards share a hub section
- `GuideIntro.description: ReactNode` for inline sibling links
- MDX sibling CSS (`h2:has-text(...) ~ ol`) when headings lack section wrappers

### Key Lessons
1. When reordering hub cards, update the parent page intro in the same plan — call-site copy drifts otherwise
2. Subjective visual UAT should be closed before milestone archive, or explicitly deferred with owners
3. Wave 0 intentional RED smoke is fine if later plans own greening — document that in SUMMARY

### Cost Observations
- Model mix: primarily Sonnet executors/verifiers (balanced profile)
- Notable: Phase 11 ran sequentially on the main tree (worktree isolation unavailable) without merge conflicts

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | many | 8 | Trustworthy Lichtenberg launch + release gates |
| v1.1 | multi-day | 3 | Content + discovery flagship; deferred human UAT at close |

### Cumulative Quality

| Milestone | Plans | Requirements | Notes |
|-----------|-------|--------------|-------|
| v1.0 | 26 | shipped | Evidence model + parent journey |
| v1.1 | 13 | 16/16 complete | Onboarding flagship; 2 deferred close items |

### Top Lessons (Verified Across Milestones)

1. Evidence honesty and static-first architecture remain non-negotiable
2. Editorial tone (no rankings) must carry through homepage CTAs and guide intros
3. Close subjective UAT or document deferrals before tagging a milestone
