---
phase: 15-profile-ui-tags-narrative
verified: 2026-07-30T06:05:06Z
status: human_needed
score: 5/5 must-haves verified
overrides_applied: 0
gaps: []
human_verification:
  - test: "Open a pilot school profile (e.g. a tagged Lichtenberg school with perfilDaEscola)"
    expected: "After the header: H2 Perfil da escola, then Características da escola with category H3s, confidence chips, Ver evidência expand revealing source-type badges and #source-* links; Fontes shows Citado em: including tag labels; factual schoolProfile row reads Perfil oficial"
    why_human: "Layout order, chip styling, and expand interaction need visual confirmation beyond RTL"
  - test: "On a tag with community (or mixed official/community) citations, expand Ver evidência and scan Fontes grouping"
    expected: "Collapsed tag shows label + confidence only (no Comunidade badge); expanded evidence and Fontes use formatSourceType labels (e.g. Oficial vs Fontes comunitárias trianguladas) with the same chip treatment — no stigma styling"
    why_human: "NARR-03 official-vs-community distinction is visual; automated tests assert string presence, not visual hierarchy"
  - test: "Open a non-pilot school profile and compare to pre-phase expectations"
    expected: "No Perfil da escola / Características chrome; factual sections and Fontes unchanged aside from additive correction link; Perfil oficial label on schoolProfile field"
    why_human: "Byte-identical non-pilot regression is Phase 16; spot-check that additive-only rendering holds in the browser"
  - test: "From any school profile, click Sugerir correção ou atualização → Enviar por e-mail"
    expected: "Lands on /report-correction/?school={slug} with Escola prefilled, scope copy naming tags and Perfil da escola, mailto subject/body including slug and qualitative scope"
    why_human: "mailto client behavior and query prefill on static export need a real browser"
---

# Phase 15: Profile UI (Tags & Narrative) Verification Report

**Phase Goal:** Pilot school profile pages render tags and narrative with clear evidence provenance, without altering non-pilot pages.
**Verified:** 2026-07-30T06:05:06Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth   | Status     | Evidence       |
| --- | ------- | ---------- | -------------- |
| 1   | Pilot school profile pages render a `TagsSection` with tags grouped by category, showing confidence and source-type badges with expandable evidence | ✓ VERIFIED | `TagsSection` groups via `groupTagsByCategory` + `TAG_CATEGORY_ORDER`; confidence via `formatTagConfidence`; expand toggles `aria-expanded` and shows `formatSourceType` chips + `#source-{id}` links. Wired in `SchoolProfile` when `school.tags.length > 0`. Jest: TagsSection 5/5 green. |
| 2   | The profile UI visually distinguishes official information from community-sourced observations wherever both appear | ✓ VERIFIED | Factual field label renamed to **Perfil oficial** vs editorial H2 **Perfil da escola**; Fontes + expanded tag evidence use `formatSourceType` (`Oficial` vs `Fontes comunitárias trianguladas`); collapsed tags omit community badges (D-12/D-13). Tests assert collapsed hide + expand reveal. |
| 3   | Removing any single tag or narrative block from a pilot school's data does not break profile rendering — each qualitative element renders independently | ✓ VERIFIED | `EditorialNarrative` returns null without text; `TagsSection` returns null for `tags=[]`; `SchoolProfile` conditionally renders each independently. Tests: perfil-only (narrative, no tags), non-pilot (neither), tagged (both). |
| 4   | The `Fontes` section on a pilot school page includes citations sourced from tags and narrative in addition to existing fields, with no duplicate entries | ✓ VERIFIED | `collectCitedSources` merges field ∪ tag citations keyed by source id (`Map` dedupe) with `citedBy` labels; `SourcesSection` renders **Citado em:**. Plan/CONTEXT lock: no invented `perfilDaEscola`→sourceId cite-backs (narrative synthesizes already-cited evidence — those sources already appear via fields/tags). Tests: tag-only once; field+tag dedupe with citedBy. |
| 5   | The correction/report-an-issue affordance on profile pages explicitly covers tags and narrative content | ✓ VERIFIED | Profile CTA → `/report-correction/?school={slug}`; `REPORT_COPY.scope` names tags and Perfil da escola; mailto body prompts factual/tags/narrative. Page wrapped in `Suspense` for static export. |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
| -------- | -------- | ------ | ------- |
| `src/features/schools/tagTaxonomy/index.ts` | Category helpers | ✓ VERIFIED | `getTagCategory`, `formatTagCategory`, `TAG_CATEGORY_ORDER`; all 10 taxonomy ids mapped |
| `src/features/schools/TagsSection/index.tsx` | Category-grouped tags + expand | ✓ VERIFIED | Client component; substantive; wired from SchoolProfile |
| `src/features/schools/TagsSection/utils.ts` | `groupTagsByCategory` | ✓ VERIFIED | Omits empty categories; order = `TAG_CATEGORY_ORDER` |
| `src/features/schools/EditorialNarrative/index.tsx` | Perfil da escola block | ✓ VERIFIED | Server component; null when empty; wired conditionally |
| `src/features/schools/collectCitedSources/index.ts` | Field ∪ tag Fontes merge | ✓ VERIFIED | Tag loop + `citedBy` Set; Map dedupe by source id |
| `src/features/schools/SourcesSection/index.tsx` | Citado em: cite-back | ✓ VERIFIED | Conditional paragraph when `citedBy.length > 0` |
| `src/features/schools/SchoolProfile/index.tsx` | Composition + correction CTA | ✓ VERIFIED | Editorial zone after `</header>`; Fontes; correction `<a>`; used by `src/app/schools/[slug]/page.tsx` |
| `src/features/schools/SchoolProfile/constants.ts` | Perfil oficial label | ✓ VERIFIED | `schoolProfile: "Perfil oficial"` |
| `src/features/schools/ReportCorrection/index.tsx` | Prefill + mailto | ✓ VERIFIED | `useSearchParams` + `getSchoolBySlug` + `mailto:` |
| `src/features/schools/ReportCorrection/constants.ts` | Locked copy + email | ✓ VERIFIED | Scope copy names tags + Perfil da escola |
| `src/app/report-correction/page.tsx` | Static route + Suspense | ✓ VERIFIED | Metadata + Suspense fallback |

### Key Link Verification

| From | To | Via | Status | Details |
| ---- | -- | --- | ------ | ------- |
| `getTagCategory` | `TagTaxonomyId` | `tagCategoryById` Record | ✓ WIRED | All 10 ids mapped in `tagTaxonomy/index.ts` |
| `collectCitedSources` | `school.tags[].citations` | Second aggregation loop | ✓ WIRED | `for (const tag of school.tags ?? [])` |
| `SourcesSection` article | `entry.citedBy` | Citado em: paragraph | ✓ WIRED | Lines 66–70 in SourcesSection |
| TagsSection toggle | Expanded evidence | `aria-expanded` + `aria-controls` + `useId` | ✓ WIRED | TagRow client state |
| Expanded citation | `#source-{id}` | Anchor href | ✓ WIRED | `href={\`#source-${citation.sourceId}\`}` |
| `useSearchParams` school | `getSchoolBySlug` | Allowlist resolve | ✓ WIRED | ReportCorrection |
| Enviar por e-mail | `mailto:` | `encodeURIComponent` subject/body | ✓ WIRED | `buildMailtoHref` |
| SchoolProfile header | EditorialNarrative / TagsSection | Conditional after `</header>` | ✓ WIRED | `perfilDaEscola` / `tags` guards |
| SchoolProfile | `/report-correction/?school=` | Link after Fontes | ✓ WIRED | `href={\`/report-correction/?school=${school.slug}\`}` |
| SchoolProfile | `collectCitedSources(school)` | Fontes data | ✓ WIRED | `groupedSources` → SourcesSection |

> Note: `gsd-sdk query verify.key-links` reported "Source file not found" for plan paths (SDK resolution issue). Links verified by direct file inspection.

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| EditorialNarrative | `text` | `school.perfilDaEscola` from page → SchoolProfile | Pilot content in `lichtenbergPrimarySchools` | ✓ FLOWING |
| TagsSection | `tags` / `sources` | `school.tags` / `school.sources` | Pilot tags + sources | ✓ FLOWING |
| SourcesSection | `groupedSources` | `collectCitedSources(school)` field ∪ tag merge | Real citations + cite-back labels | ✓ FLOWING |
| ReportCorrection | `slug` / school name | `?school=` → `getSchoolBySlug` | Allowlisted schools | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| Phase 15 component suites | `pnpm exec jest --testPathPatterns='(TagsSection\|EditorialNarrative\|ReportCorrection\|collectCitedSources\|SourcesSection\|SchoolProfile\|tagTaxonomy)'` | 7 suites, 44 tests passed | ✓ PASS |
| TagsSection empty omit | Jest: returns null when tags=[] | Pass | ✓ PASS |
| Fontes tag merge + dedupe | Jest: tag-only once; field+tag citedBy | Pass | ✓ PASS |
| Non-pilot omits qualitative chrome | Jest: SchoolProfile non-pilot test | Pass | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ---------- | ----------- | ------ | -------- |
| NARR-01 | 15-00, 15-01, 15-03, 15-05 | Structured tags grouped, cited, evidence-strength labels | ✓ SATISFIED | TagsSection + taxonomy categories + confidence chips + expand |
| NARR-03 | 15-00, 15-03, 15-05 | UI distinguishes official vs community | ✓ SATISFIED | Perfil oficial vs Perfil da escola; formatSourceType in expand/Fontes; no collapsed Comunidade badge |
| NARR-04 | 15-00, 15-03, 15-05 | Qualitative elements independently removable | ✓ SATISFIED | Conditional render + null returns; perfil-only / empty-tags tests |
| NARR-05 | 15-00, 15-02, 15-05 | Fontes includes tag (+ narrative-backed) citations | ✓ SATISFIED | Field ∪ tag merge, dedupe, Citado em:; no invented narrative sourceIds per plan lock |
| NARR-06 | 15-00, 15-04, 15-05 | Correction path covers tags and narrative | ✓ SATISFIED | Profile CTA + ReportCorrection scope/mailto copy |

**Orphaned requirements:** None. REQUIREMENTS.md maps NARR-01, NARR-03, NARR-04, NARR-05, NARR-06 to Phase 15; all appear in plan frontmatter. NARR-02 is Phase 14 (correctly out of scope).

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| `EditorialNarrative/index.tsx` | 7 | `return null` when no text | ℹ️ Info | Intentional empty omit (NARR-04) |
| `TagsSection/index.tsx` | 23, 86 | `return null` empty tags / missing source | ℹ️ Info | Intentional; not a stub |
| `SchoolProfile/index.tsx` | 134 | `return null` missing field | ℹ️ Info | Pre-existing field guard |

No TODO/FIXME/placeholder stubs, hollow props, or orphaned qualitative components found.

### Human Verification Required

### 1. Pilot profile visual pass

**Test:** Open a pilot school profile (tagged Lichtenberg school with `perfilDaEscola`).
**Expected:** After header — H2 Perfil da escola, then Características with category H3s, confidence chips, Ver evidência expand with source-type badges and Fontes anchors; factual row labeled Perfil oficial; Citado em: includes tag labels where applicable.
**Why human:** Layout, chip styling, and expand interaction need visual confirmation beyond RTL.

### 2. Official vs community distinction

**Test:** Expand evidence on a tag citing community (or mixed) sources; scan Fontes groups.
**Expected:** Collapsed = label + confidence only; expanded/Fontes use shared chip treatment with distinct `formatSourceType` labels (Oficial vs Fontes comunitárias trianguladas), no stigma styling.
**Why human:** NARR-03 is a visual contract; tests only assert strings.

### 3. Non-pilot additive-only check

**Test:** Open a non-pilot school profile.
**Expected:** No editorial/tags chrome; correction link present; structure otherwise unchanged.
**Why human:** Full byte-identical regression is Phase 16; browser spot-check still needed for Phase 15 goal.

### 4. Correction mailto flow

**Test:** Profile → Sugerir correção ou atualização → Enviar por e-mail.
**Expected:** Prefill + scope copy naming tags and Perfil da escola; mailto opens with slug and qualitative prompt.
**Why human:** Real mailto / static-export query behavior.

### Gaps Summary

No automated gaps. All five roadmap success criteria are implemented, wired, and covered by green Jest suites (44 tests). Status is `human_needed` solely for browser/visual UAT of provenance UX and the correction path.

---

_Verified: 2026-07-30T06:05:06Z_
_Verifier: Claude (gsd-verifier)_
