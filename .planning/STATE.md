---
gsd_state_version: 1.0
milestone: v1.2
milestone_name: Evidence-Based School Profiles
status: Roadmap ready
stopped_at: null
last_updated: "2026-07-26T18:56:00.000Z"
last_activity: 2026-07-26 — Roadmap created, Phases 12–16 defined
progress:
  total_phases: 5
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-26)

**Core value:** Parents can trust what they read because every factual school field shows its evidence status and sources — and missing or unconfirmed information is visible, not hidden.
**Current focus:** Milestone v1.2 Evidence-Based School Profiles — roadmap ready, awaiting Phase 12 planning

## Current Position

Phase: 12 — Editorial & Research Framework (not started)
Plan: —
Status: Roadmap ready — next is `/gsd-plan-phase 12`
Last activity: 2026-07-26 — Roadmap created: Phases 12–16 defined, 19/19 requirements mapped

## Performance Metrics

**Velocity:**

- v1.0 plans completed: 26
- v1.0 phases completed: 8/8
- v1.1 phases planned: 3 (9–11)
- v1.1 plans completed: 13

| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| Phase 09 P01 | 25min | 2 tasks | 5 files |
| Phase 09 P02 | 20min | 3 tasks | 11 files |
| Phase 09 P03 | 20min | 3 tasks | 4 files |
| Phase 10 P00 | 1min | 2 tasks | 2 files |
| Phase 10 P01 | 1min | 2 tasks | 3 files |
| Phase 10 P02 | 2min | 2 tasks | 1 files |
| Phase 10 P03 | 2min | 3 tasks | 7 files |
| Phase 11 P01 | 6min | 2 tasks | 3 files |
| Phase 11 P02 | 5min | 2 tasks | 3 files |
| Phase 11 P03 | 8min | 2 tasks | 5 files |
| Phase 11 P04 | 12min | 2 tasks | 3 files |
| Phase 11 P05 | 4min | 2 tasks | 1 files |

## Decisions

- GlossaryTerm omits types.ts; two-field prop type stays local to index.tsx per StatusBadge convention
- BerlinCallout summary variant is an unmargined block-level aside so it composes freely in MDX/prose
- [Phase 09-02]: Test 3 (mobile Outras vias collapsed-by-default) scoped queries with within() to the mobile region, since both desktop and mobile trees render simultaneously in jsdom
- [Phase 09-02]: TimelineNode stays an internal, non-exported implementation detail of EducationTimeline per AGENTS.md no-premature-abstraction guidance
- [Phase 09-03]: Route shell, MDX content, and Playwright tests followed the plan verbatim with no deviations; MDX heading text chosen to slugify exactly to the anchorHref already baked into EducationTimeline's demo data
- [Phase 10-00]: Wave 0 ships tests only — no GlossaryTerm or constants.ts production changes
- [Phase 10-00]: Anchor contract uses stage ids (kita, grundschule, …) for lookups
- [Phase 10-01]: Shared secondary hash #os-caminhos-possiveis for Gymnasium/ISS/Gemeinschaftsschule (no mdx h3 remapping)
- [Phase 10-01]: Grundschule berlinNote is concept-level only; no Einzugsgebiet/Anmeldung procedure copy
- [Phase 10-02]: Verify #1 optional links: first-steps + berlin-school-system (two allowed max)
- [Phase 10-02]: Deferred Glossário and BerlinCallout summary to Plan 03 so D-13 set ships complete once
- [Phase 10-03]: Human content review approved after UAT: Germany-first Grundschule grades + typographic Berlin line
- [Phase 10-03]: BerlinCallout inline variant replaced chip with left-ruled typographic line for timeline cards
- [Phase 11-01]: Removed guides-hub and methodology homepage cards entirely (not hidden) per D-03; still discoverable via nav
- [Phase 11-02]: Kept Berlin hub CTA label exactly 'Ler guia do sistema escolar' while giving the flagship CTA the distinct label 'Ler guia do sistema educacional' to avoid getByRole name collisions
- [Phase 11-03]: Widened GuideIntro.description to ReactNode instead of adding a second prop/paragraph, per D-09's no-separate-section intent
- [Phase 11-04]: Scoped e2e Próximos passos assertions via CSS sibling selector h2:has-text(...) ~ ol since MDX headings have no <section> wrapper
- [Phase 11-05]: No production code changes needed at the phase gate — full green bar and human approval confirmed Plans 01-04 already satisfied all phase success criteria
- v1.2 milestone: Evidence-Based School Profiles — match-making over ranking; methodology framework is a first-class deliverable; pilot 3–5 schools profile-only
- [Roadmap]: v1.2 phase order follows research SUMMARY.md build order — framework docs (12) → schema layer (13) → pilot content (14) → profile UI (15) → validation/release gates (16); directory/compare tag promotion stays explicitly out of scope
- [Roadmap]: NARR-02 (Perfil da escola content rule) mapped to Phase 14 (pilot content authors it) rather than Phase 15 (UI only renders it); NARR-04 (removable without breaking) mapped to Phase 15 as an observable rendering behavior

## Blockers/Concerns

- None

## Accumulated Context

### Prior milestones

- v1.0 Lichtenberg Trustworthy Launch — shipped 2026-07-12 (phases 1–8)
- v1.1 Understand the German & Berlin Education System — shipped 2026-07-26 (phases 9–11)

### Known deferred at v1.1 close

- Phase 09 human UAT (`09-HUMAN-UAT.md`) still `partial` — 4 subjective visual scenarios pending
- No formal `v1.1-MILESTONE-AUDIT.md` run before close
