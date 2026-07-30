---
gsd_state_version: 1.0
milestone: v1.2
milestone_name: Evidence-Based School Profiles
status: executing
last_updated: "2026-07-30T05:53:06.086Z"
last_activity: 2026-07-30
progress:
  total_phases: 5
  completed_phases: 3
  total_plans: 19
  completed_plans: 17
  percent: 89
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-26)

**Core value:** Parents can trust what they read because every factual school field shows its evidence status and sources — and missing or unconfirmed information is visible, not hidden.
**Current focus:** Phase 15 — profile-ui-tags-narrative

## Current Position

Phase: 15 (profile-ui-tags-narrative) — EXECUTING
Plan: 5 of 6
Status: Ready to execute
Last activity: 2026-07-30
Resume file: None

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
| Phase 12 P01 | 12min | 2 tasks | 2 files |
| Phase 12 P02 | 8min | 2 tasks | 2 files |
| Phase 12 P03 | 6min | 2 tasks | 3 files |
| Phase 12 P04 | 8min | 1 tasks | 1 files |
| Phase 13 P01 | 1min | 2 tasks | 9 files |
| Phase 13 P02 | 1min | 2 tasks | 8 files |
| Phase 13 P03 | 1min | 2 tasks | 3 files |
| Phase 13 P04 | 2min | 2 tasks | 3 files |
| Phase 14 P01 | 8min | 2 tasks | 3 files |
| Phase 14 P02 | 1min | 2 tasks | 2 files |
| Phase 14 P03 | 1min | 2 tasks | 1 files |
| Phase 14 P04 | 3min | 2 tasks | 3 files |
| Phase 14 P05 | 8min | 2 tasks | 1 files |
| Phase 15 P00 | 3min | 3 tasks | 11 files |
| Phase 15 P01 | 2min | 2 tasks | 2 files |
| Phase 15 P02 | 1min | 2 tasks | 3 files |
| Phase 15 P03 | 2min | 2 tasks | 4 files |

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
- [Phase 12-01]: Extended Source Hierarchy with journalism + triangulated-community tiers and a Community Source Independence definition in docs/RESEARCH.md, kept tiers 1-4 and all other sections untouched
- [Phase 12-01]: Documented closed Tag Taxonomy v1 (10 tag IDs, 4 categories) and qualitativeLastReviewed field semantics in docs/DATA_MODEL.md, cross-referenced to RESEARCH.md's Qualitative Review Cadence
- [Phase 12-02]: Appended four dated 2026-07-26 ADR entries tracing to CONTEXT.md D-01–D-23: tag taxonomy v1, source hierarchy extension, qualitative-richness-is-not-quality, and qualitative review cadence
- [Phase 12-03]: Placed source-tier and tag sections between Cobertura da pesquisa and Termos em alemão per UI-SPEC Content Extension Contract; version marker v1 dated 2026-07-26
- [Phase 12-04]: Named the 5-school pilot set verbatim from 12-RESEARCH.md's Pilot Candidate Analysis, independently re-verified against the real dataset before committing
- [Phase 13-01]: Factual allowlist includes official types + journalism; excludes community/anecdotal
- [Phase 13-01]: Reliability Levels in RESEARCH.md point community evidence to Canonical Source Types + Community Source Independence
- [Phase 13-02]: Independence log property names locked to venue/identifier/dateAccessed/independenceRationale/echoCheckNote
- [Phase 13-02]: formatTagConfidence imports TagConfidence from tagTaxonomy to share the closed enum type
- [Phase 13-03]: Multi-source predicate includes triangulated_community sourceIds only for active-school-community
- [Phase 13-03]: Distinct independenceLog.venue enforced across community citations on the same tag (A6)
- [Phase 13-04]: qualitativeLastReviewed required iff (tags?.length ?? 0) > 0 — empty tags[] does not require it
- [Phase 13-04]: Real Lichtenberg schools left untagged; validate:data green without placeholder dates
- [Phase 14-01]: perfilDaEscola and qualitativeResearchNotes are plain trimmed optional strings; no Zod .max() (D-09)
- [Phase 14]: qualitativeResearchNotes alone does not require qualitativeLastReviewed (RESEARCH A4)
- [Phase 14]: Empty tags: [] remains the no-tags path (length > 0 gate)
- [Phase 14]: Factory passthrough (not post-spread) locked for all five pilots in later plans — Plan 14-02 discretion Pattern 4
- [Phase 14]: Conditional spreads omit undefined qualitative fields so non-pilot School objects stay identical — Plan 14-02 discretion Pattern 4
- [Phase 14-03]: Withheld stem-focus on Grzimek — portrait MINT offer alone fails facts≠tags (D-05)
- [Phase 14-03]: All three thin/mid pilots ship zero tags + perfil + qualitativeLastReviewed 2026-07-29
- [Phase 14-04]: Withheld active-school-community on Tolstoi — Eltern/Förderverein present but ≥2 independent community venues not found (D-13)
- [Phase 14-04]: Published arts-music-focus on Wagner citing musikbetonung page + official portrait
- [Phase 14-04]: Published bilingual-program on Tolstoi citing dedicated SESB page + official portrait
- [Phase 14-05]: Human approved with three family-facing perfil wording refinements before close
- [Phase 14-05]: Stock unconfirmed phrase locked to "Até o momento, não houve confirmação independente…"
- [Phase 15-00]: Wave 0 ships RED tests + null stubs only — no production qualitative UI
- [Phase 15-00]: TagsSection/EditorialNarrative/ReportCorrection stubs return null so imports resolve and assertions stay RED until later plans
- [Phase 15-01]: Category helpers live in tagTaxonomy; groupTagsByCategory deferred to TagsSection (Plan 03)
- [Phase 15-02]: No perfilDaEscola invented cite-back — only field paths and tag ids contribute to citedBy
- [Phase 15-02]: citedBy sorted with localeCompare pt-BR for stable Fontes output
- [Phase 15-03]: TagRow stays an inner component in TagsSection/index.tsx (no separate TagEvidence directory)
- [Phase 15-03]: EditorialNarrative returns null for falsy text so Wave 0 empty/undefined cases green without parent gating yet

## Blockers/Concerns

- None

## Accumulated Context

### Prior milestones

- v1.0 Lichtenberg Trustworthy Launch — shipped 2026-07-12 (phases 1–8)
- v1.1 Understand the German & Berlin Education System — shipped 2026-07-26 (phases 9–11)

### Known deferred at v1.1 close

- Phase 09 human UAT (`09-HUMAN-UAT.md`) still `partial` — 4 subjective visual scenarios pending
- No formal `v1.1-MILESTONE-AUDIT.md` run before close
