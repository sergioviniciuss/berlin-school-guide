---
phase: 11-flagship-discovery-release
reviewed: 2026-07-25T19:24:00Z
depth: standard
files_reviewed: 17
files_reviewed_list:
  - e2e/metadata.spec.ts
  - e2e/a11y.spec.ts
  - e2e/smoke.spec.ts
  - e2e/onboarding.spec.ts
  - src/features/home/HomeJourneyCards/index.tsx
  - src/features/home/HomeJourneyCards/index.test.tsx
  - src/app/page.test.tsx
  - src/features/guides/GuidesHub/index.tsx
  - src/features/guides/GuidesHub/index.test.tsx
  - src/app/guides/page.test.tsx
  - src/features/guides/GuideIntro/index.tsx
  - src/features/guides/GuideIntro/index.test.tsx
  - src/app/guides/german-education-system/page.tsx
  - src/app/guides/berlin-school-system/page.tsx
  - src/app/guides/berlin-school-system/page.test.tsx
  - src/content/guides/german-education-system.mdx
  - src/content/guides/first-steps.mdx
findings:
  critical: 0
  warning: 1
  info: 1
  total: 2
status: issues_found
---

# Phase 11: Code Review Report

**Reviewed:** 2026-07-25T19:24:00Z
**Depth:** standard
**Files Reviewed:** 17
**Status:** issues_found

## Summary

Reviewed all production source, MDX content, and test files listed across the six `11-*-SUMMARY.md` files for Phase 11 (Flagship Discovery Release), covering the two-card homepage hierarchy (DISC-01), the GuidesHub flagship stack (DISC-02), the widened `GuideIntro` cross-links and Berlin retitle (DISC-03/DISC-04/REL-01), the onboarding closing narrative and first-steps tip (ONBD-06/DISC-03), and the Wave 0/Wave-gate e2e and a11y coverage (REL-01–03).

The implementation is clean overall: no `dangerouslySetInnerHTML`, no hardcoded secrets, no dangerous functions, consistent heading hierarchy, and Playwright selectors correctly scoped to avoid ambiguity (verified the `h2:has-text("Próximos passos") ~ ol` selector matches exactly one `<ol>` in the document, and that the scoped "Ver escolas" link inside it doesn't collide with the two other "Ver escolas" links elsewhere in the same MDX file, since Playwright's `getByRole` on a `.locator()` result scopes strictly to descendants of the matched element).

One content-coherence issue was found by cross-referencing the newly reordered `GuidesHub` (this phase's changed file) against its caller, `src/app/guides/page.tsx` (unchanged this phase, deliberately left out of Plan 02's interface boundary per its SUMMARY) — the page's lead-in copy now contradicts the flagship-first ordering the phase intentionally introduced. One minor duplication note is also recorded as Info.

## Warnings

### WR-01: /guides page intro copy contradicts the new flagship-first ordering (DISC-02)

**File:** `src/app/guides/page.tsx:18`
**Issue:** Plan 02 reordered `GuidesHub` so the onboarding "Sistema educacional na Alemanha" card (primary chrome, "Comece aqui...") now stacks above the Berlin card — Germany-first, Berlin-second, per DISC-02. However, the `/guides` page's own intro paragraph (rendered directly above the hub, not part of `GuidesHub` itself and not touched by Plan 02) still reads:

> "Comece pelo sistema escolar berlinense, depois use checklists práticas para visitar escolas e se preparar para a matrícula."

("Start with the Berlin school system...") — the opposite of the order a reader sees immediately below in the hub. This isn't a code defect in the files Plan 02 touched (the plan explicitly scoped out `page.tsx`), but it's a real narrative inconsistency surfaced by this reorder that undercuts the DISC-02 intent of making the onboarding guide the unambiguous first stop.
**Fix:** Update the description to lead with the onboarding guide, e.g.:
```tsx
description="Comece pelo guia do sistema educacional alemão, depois veja como as regras se aplicam a Berlim e use checklists práticas para visitar escolas e se preparar para a matrícula."
```

## Info

### IN-01: Cross-link anchor styling duplicated verbatim across two page files

**File:** `src/app/guides/german-education-system/page.tsx:27`, `src/app/guides/berlin-school-system/page.tsx:28`
**Issue:** Both guide pages inline the exact same `className="text-blue-700 underline"` string on their `next/link` cross-link. With Plan 03 this is now the second occurrence of this literal, so it meets the "two concrete use cases" bar the project's own conventions use before considering an extraction (`AGENTS.md`: "avoid generic utilities or reusable components until at least two concrete use cases exist").
**Fix:** Not urgent — flagging for awareness only. If a third guide page adds an inline cross-link, consider a shared `text-blue-700 underline` constant (e.g., co-located in `GuideIntro`) rather than a fourth copy-paste.

---

_Reviewed: 2026-07-25T19:24:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
