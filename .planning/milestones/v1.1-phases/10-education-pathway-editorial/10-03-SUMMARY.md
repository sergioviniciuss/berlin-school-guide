---
phase: 10-education-pathway-editorial
plan: 03
subsystem: content
tags: [MDX, editorial, Glossário, Ausbildung, Duales-Studium, Fachabitur, BerlinCallout, ONBD]

# Dependency graph
requires:
  - phase: 10-education-pathway-editorial
    provides: Early journey MDX through Depois da 6ª série + verify #1; GlossaryTerm ids; timeline H2 anchors
  - phase: 09-onboarding-guide-visual-foundation
    provides: EducationTimeline / GuideIntro / BerlinCallout / GlossaryTerm route shell
provides:
  - Complete Kita→secondary→Ausbildung/higher-ed editorial on german-education-system
  - Peer Gymnasium / ISS / Gemeinschaftsschule H3s with verify #2 + single Berlin summary callout
  - Formação profissional + Ensino superior + verify #3 without Gymnasium-only framing
  - Full Glossário via GlossaryTerm (ONBD-05 + D-13) with narrative #slug deep-links
affects:
  - Phase 11 flagship discovery and cross-links
  - ONBD-01–05 phase verification

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Exactly three **O que verificar:** action moments; exactly one BerlinCallout summary in primary→secondary zone
    - Peer secondary H3s; Realschule/Hauptschule only as other-state context
    - Narrative [Term](#slug) deep-links for ONBD-05 terms before Glossário GlossaryTerm cards
    - Timeline Grundschule card Germany-first (1ª–4ª); Berlin 6-year duration in Em Berlim line only

key-files:
  created: []
  modified:
    - src/content/guides/german-education-system.mdx
    - src/features/guides/BerlinCallout/index.tsx
    - src/features/guides/BerlinCallout/index.test.tsx
    - src/features/guides/EducationTimeline/constants.ts
    - src/features/guides/EducationTimeline/constants.test.ts
    - src/features/guides/EducationTimeline/fixtures.ts
    - src/features/guides/EducationTimeline/index.test.tsx

key-decisions:
  - "Human content review approved after UAT: Germany-first Grundschule grades + typographic Berlin line"
  - "BerlinCallout inline variant replaced chip with left-ruled typographic line for timeline cards"

patterns-established:
  - "Full H2 order: Antes → Ensino primário → Depois da 6ª → Os caminhos → Formação → Ensino superior → Glossário"
  - "UAT visual fixes land as fix(10-03) commits after feat tasks, before plan metadata close"

requirements-completed: [ONBD-01, ONBD-02, ONBD-03, ONBD-04, ONBD-05]

# Metrics
duration: 2min
completed: 2026-07-24
---

# Phase 10 Plan 03: Pathways, Glossário & Human Review Summary

**Complete flagship MDX through Glossário with peer secondary paths, three verify moments, one Berlin summary callout, and ONBD-05 narrative deep-links — human-approved after two UAT visual fixes**

## Performance

- **Duration:** ~2 min (Task 3 close-out; Tasks 1–2 + UAT fixes completed earlier in session)
- **Started:** 2026-07-24T21:40:14Z
- **Completed:** 2026-07-24T21:41:31Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- Shipped Os caminhos possíveis with peer Gymnasium / ISS / Gemeinschaftsschule H3s, verify #2, and single BerlinCallout summary
- Completed Formação profissional, Ensino superior, verify #3, and Glossário with full GlossaryTerm set + narrative `#slug` deep-links for ONBD-05 terms
- Human review approved after UAT: Germany-first Grundschule timeline grades and typographic Berlin line (no chip)

## Task Commits

Each task was committed atomically:

1. **Task 1: Write Os caminhos possíveis + verify #2 + Berlin summary** - `39d6595` (feat)
2. **Task 2: Write Formação profissional, Ensino superior, Glossário** - `fd6d7b2` (feat)
3. **Task 3: Human content review for ONBD-01–05** - approved (no code commit; UAT follow-ups below)

**UAT fixes (post-checkpoint, before close):**

- `020a342` (fix) — Germany-first Grundschule grades (1ª–4ª) on timeline card
- `fbbe948` (fix) — Inline Berlin pill → typographic left-ruled line

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/content/guides/german-education-system.mdx` — Full pathway editorial through Glossário (343 lines)
- `src/features/guides/EducationTimeline/constants.ts` — Germany-first Grundschule grades; Berlin note as plain line text
- `src/features/guides/EducationTimeline/fixtures.ts` — Fixture grades aligned with constants
- `src/features/guides/EducationTimeline/constants.test.ts` / `index.test.tsx` — Assertions for grades + Berlin line
- `src/features/guides/BerlinCallout/index.tsx` — Inline variant typographic treatment
- `src/features/guides/BerlinCallout/index.test.tsx` — Updated inline variant expectations

## Decisions Made
- User approved editorial against ONBD-01–05 after UAT fixes; no further editorial edits at close
- Timeline Grundschule card shows majority-Germany 1ª–4ª; Berlin’s 6-year duration remains in Em Berlim callout/context only
- BerlinCallout `inline` uses a left-ruled text line instead of a rounded chip so long “Berlim: …” notes wrap cleanly

## Deviations from Plan

### Auto-fixed Issues

None during planned Tasks 1–2.

### Post-checkpoint UAT fixes (human-verify follow-up)

**1. [UAT] Germany-first Grundschule timeline grades**
- **Found during:** Task 3 (human content review)
- **Issue:** Timeline card framed Berlin 1ª–6ª as the default grade range
- **Fix:** Card grades/ages follow majority German pattern (1ª–4ª); Berlin duration stays in Em Berlim note
- **Files modified:** EducationTimeline constants, fixtures, tests
- **Verification:** `pnpm test -- GlossaryTerm EducationTimeline BerlinCallout` — 21 passed
- **Committed in:** `020a342`

**2. [UAT] Inline Berlin pill → typographic line**
- **Found during:** Task 3 (human content review)
- **Issue:** Rounded chip wrapped awkwardly for longer Berlin notes
- **Fix:** Left-ruled typographic “Berlim: …” line in BerlinCallout inline + timeline consumers
- **Files modified:** BerlinCallout + EducationTimeline tests/constants
- **Verification:** Unit suite green; chromium onboarding e2e green via static serve
- **Committed in:** `fbbe948`

---

**Total deviations:** 2 UAT follow-up fixes (not Rule 1–3 auto-fixes during Tasks 1–2)
**Impact on plan:** Visual/copy framing only; editorial structure and ONBD must_haves unchanged. User then typed `approved`.

## Issues Encountered
- Default `playwright.config.ts` webServer (`pnpm dev --port 4310`) failed while another Next.js dev was already running; verified e2e with `playwright.ci.config.ts` + `--project=chromium` against static `out` (3 passed)

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 10 editorial plans 00–03 complete; ONBD-01–05 content observable on `/guides/german-education-system`
- Ready for Phase 10 verify / Phase 11 flagship discovery
- No stubs blocking the plan goal

## Self-Check: PASSED
- FOUND: `src/content/guides/german-education-system.mdx`
- FOUND: `39d6595`
- FOUND: `fd6d7b2`
- FOUND: `020a342`
- FOUND: `fbbe948`
- FOUND: `.planning/phases/10-education-pathway-editorial/10-03-SUMMARY.md`

---
*Phase: 10-education-pathway-editorial*
*Completed: 2026-07-24*
