---
phase: 12-editorial-research-framework
reviewed: 2026-07-26T22:49:00Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - docs/RESEARCH.md
  - docs/DATA_MODEL.md
  - docs/EDITORIAL_GUIDE.md
  - docs/DECISIONS.md
  - docs/research/PILOT_SELECTION.md
  - src/content/guides/methodology.mdx
  - src/app/methodology/page.tsx
  - src/app/methodology/page.test.tsx
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
---

# Phase 12: Code Review Report

**Reviewed:** 2026-07-26T22:49:00Z
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

Phase 12 is a documentation-and-content phase (framework docs + one public MDX page). The four framework docs (`docs/RESEARCH.md`, `docs/DATA_MODEL.md`, `docs/EDITORIAL_GUIDE.md`, `docs/DECISIONS.md`) are internally consistent: heading counts match the plan summaries exactly (RESEARCH.md 10→12, DATA_MODEL.md 9→11), all edits are additive `##` sections with no reworded prose, the `qualitativeLastReviewed` field is cross-referenced identically between `RESEARCH.md` and `DATA_MODEL.md`, and the four new `DECISIONS.md` ADR entries follow the required Context/Decision/Alternatives/Consequences template.

`src/content/guides/methodology.mdx` faithfully implements the `12-UI-SPEC.md` Content Extension Contract: the source-hierarchy explanation states the two-independent-sources rule, the confidence-label disclaimer mirrors the existing coverage-percentage disclaimer's bolded-consequence structure, the "absence of a tag ≠ negative" statement is present, and no banned reputation words are used. `page.tsx` and `page.test.tsx` are minimal, type-check cleanly, lint cleanly, and the test suite passes (`pnpm test -- methodology`: 1/1 green).

One real docs-vs-data accuracy issue was found in the new `docs/research/PILOT_SELECTION.md` (see WR-01). Two minor informational notes are included for awareness but do not block the phase.

## Warnings

### WR-01: Pilot rationale claims an "official school-inspection page" that is actually typed and rated as a school-website source

**File:** `docs/research/PILOT_SELECTION.md:27`
**Issue:** The rationale for Richard-Wagner-Schule states it has "4 sources including an official school-inspection page." Cross-checking `src/content/schools/real/lichtenbergPrimarySchools/index.ts`, the fourth source (`richardWagnerInspection`, id `richard-wagner-inspection`) is built via the `schoolWebsiteSource()` helper (`index.ts:270-275`), which sets `type: "school_website"` and `reliability: "secondary"` (`index.ts:45-60`) — not `official_inspection`/`primary` as defined in `docs/RESEARCH.md`'s Canonical Source Types and Reliability Levels. It is a page hosted on the school's own website that links to an inspection report, not a source of the `official_inspection` canonical type. Since Phase 14 will use `PILOT_SELECTION.md` as the authoritative rationale for pilot tagging, a future editor could reasonably assume `official_inspection`-typed evidence already exists for this school, or under-scrutinize the inspection claim's reliability level.
**Fix:** Soften the claim to match the actual source typing, e.g.:
```md
| Richard-Wagner-Schule | Well-documented; distinctive specialization (music) | `profile_ready`, detailed coverage, 4 sources including a school-website page describing a past official inspection; official portrait and school website confirm a `musikbetontes Profil` and Hochbegabtenförderung. The strongest existing reference point for a rich profile. |
```
Alternatively, if an authoritative `official_inspection`-typed source should exist for this school, that is a data-model gap to flag for Phase 13/14 rather than a documentation wording fix.

## Info

### IN-01: `Hierarquia das fontes` section silently omits the "public dataset" tier

**File:** `src/content/guides/methodology.mdx:26-35`
**Issue:** `docs/RESEARCH.md`'s Source Hierarchy has 7 tiers (official government, official inspection, school website, public dataset, journalism, triangulated community, anecdotal/social), but the family-facing bullet list only surfaces 4: "Fontes oficiais," "Site da escola," "Jornalismo independente," "Fontes comunitárias trianguladas." This appears to be an intentional simplification per `12-UI-SPEC.md` ("mirrors ... in family-facing language," not an exhaustive restatement), and `public_dataset` sources aren't currently cited on any real school profile, so this is not a functional bug — just worth confirming intent is durable if public-dataset sources are cited on a pilot school later.
**Fix:** No action required unless a school profile later cites a `public_dataset` source that isn't otherwise covered by one of the four listed tiers; at that point add a fifth bullet.

### IN-02: Methodology test suite fully mocks the MDX module, so new prose changes aren't verified against the real content

**File:** `src/app/methodology/page.test.tsx:3-14`
**Issue:** The test mocks `@/content/guides/methodology.mdx` entirely and asserts against hardcoded strings duplicated in the mock (e.g. `<p>Fontes comunitárias trianguladas</p>`, `<p>não é uma avaliação negativa da escola</p>`) rather than the real MDX file. This is a pre-existing pattern for this page (not introduced by Phase 12) and was an explicit, documented choice in `12-UI-SPEC.md`, so it's not a regression — but it means a typo or accidental deletion of these exact phrases in the real `methodology.mdx` would not be caught by this test.
**Fix:** No change required for this phase; if methodology content correctness becomes higher-risk later, consider a lightweight non-mocked smoke test that imports and renders the real MDX (per Next.js MDX + RTL patterns) for a subset of critical guides.

---

_Reviewed: 2026-07-26T22:49:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
