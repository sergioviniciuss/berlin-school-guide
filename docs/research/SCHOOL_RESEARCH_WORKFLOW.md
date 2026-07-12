# School Research Workflow

Executable step-by-step checklist for researching Berlin primary schools and recording evidence-backed data in the Berlin School Guide codebase.

**Audience:** Human researchers and AI sessions. Follow this document as a procedural checklist — do not re-derive Phase 1 evidence rules from scratch. Policy definitions live in linked canonical docs.

## Prerequisites

Read these before starting research on a new or existing school record:

| Document | Purpose |
| -------- | ------- |
| [docs/RESEARCH.md](../RESEARCH.md) | Source hierarchy, citation philosophy, research statuses, conflict rules |
| [docs/DATA_MODEL.md](../DATA_MODEL.md) | Coverage levels, field evidence structure, minimum fields |
| [REAL_SCHOOL_RESEARCH_SPIKE.md](./REAL_SCHOOL_RESEARCH_SPIKE.md) | Lichtenberg baseline sources, portrait field patterns, field difficulty notes |
| Phase 1 code artifacts | `inferredFrom()` helper, coverage v2 denominators, `pnpm validate:data` gate |

**Policy authority:** When this workflow and [docs/RESEARCH.md](../RESEARCH.md) appear to conflict, RESEARCH.md wins. This document describes *how* to apply policy, not *what* the policy is.

## Source discovery checklist

Complete these steps in order for each school. Record sources in `sources[]` **before** assigning field evidence.

1. **Berlin Senate school directory** — search at [bildung.berlin.de/Schulverzeichnis](https://www.bildung.berlin.de/Schulverzeichnis/). Confirm the school exists, note the official school number, and open the Schulportrait link.
2. **Official school portrait (Schulportrait)** — use the portrait page as the primary source for basic metadata (name, address, Ortsteil, website, languages, Ganztag, welcome classes, offers). Record as `official_government` / `primary` reliability.
3. **School website** — when the portrait lists an official URL, visit the site for deeper fields (Ganztag/Hort pages, pedagogical profile, parent communication, facilities). Record as `school_website` / `secondary` reliability.
4. **Supplementary pages** — check for Ganztag or Hort detail pages, Willkommensklasse information, and official inspection report links (on school site or Senate directory). Add each distinct page as its own source entry.
5. **Record each source in `sources[]` first** — every source needs complete metadata before any field cites it:
   - `id` — stable slug scoped to the school (e.g. `{school-slug}-official-portrait`)
   - `title`, `url`, `type`, `reliability`, `publisher`
   - `dateAccessed` — the calendar date **this specific source** was checked (ISO `YYYY-MM-DD`); do not reuse a shared constant across sources

Stop source discovery when portrait + available school-site pages are exhausted. Do not infer missing fields from forums, reviews, or anecdotal sources in V1.

## Record setup

Add or update the school in `src/content/schools/real/lichtenbergPrimarySchools/index.ts` using the `primarySchool()` builder pattern.

### 1. Define `sources[]` first

```typescript
sources: [officialPortraitSource, /* optional school-site sources */],
```

Each call to `source()` (or equivalent helper) must pass an individual `dateAccessed` per source — not a module-level shared date constant.

### 2. Set research metadata

```typescript
research: {
  status: "directory_only" | "in_research" | "profile_ready",
  coverageLevel: "directory" | "detailed",
  lastResearched: "YYYY-MM-DD",      // date of last full field-by-field review
  lastSourceChecked: "YYYY-MM-DD",  // date of most recently accessed cited source
},
```

- **`directory_only` + `directory`** — portrait-level research only (11 coverage fields).
- **`in_research` or `profile_ready` + `detailed`** — extended field research (23 coverage fields); requires independent citations per verified field.

Set `lastResearched` and `lastSourceChecked` to the **actual dates for this school**, not a project-wide milestone date.

### 3. Assign field evidence

After sources exist, walk each field and assign `value` + `evidence` using the per-field decision trees below. Run `pnpm validate:data` before marking research complete.

## Per-field decision trees

Use explicit numbered steps. When in doubt, prefer `missing` or `not_confirmed` over `verified`.

### Field: ganztag (directory tier)

1. Portrait lists a Ganztag model (e.g. gebundener Ganztag, offener Ganztag, Halbtags)? → record the value with `verified` status and cite the portrait source.
2. Portrait checked but no Ganztag field present? → `missing` with a Portuguese note explaining the portrait was checked.
3. No portrait available? → stop; obtain portrait first (see Source discovery checklist).

### Field: afterSchoolCare

1. Independent Ganztag, Hort, or eFöB source explicitly describes after-school care? → record value with `verified` and cite that source.
2. Infer afterSchoolCare from a verified `ganztag` field only? → `not_confirmed` via `inferredFrom()` with a mandatory Portuguese note (e.g. *"Inferido a partir do modelo Ganztag do retrato oficial; Hort/eFöB não confirmado separadamente."*). **Never `verified` from ganztag alone.**
3. No portrait and no independent source? → `missing`.

### Field: schoolProfile / pedagogyFocus

1. Portrait or school website explicitly states a pedagogical profile or focus area? → `verified` with direct citation to that statement.
2. Infer from portrait `offers` list (e.g. Musik, Sport)? → `not_confirmed` via `inferredFrom()` citing the offers field; mandatory Portuguese note explaining inference from offers, not a confirmed profile statement.
3. No offers or profile text found? → `missing`.
4. **Never** mark `verified` from offers alone — offers are not a pedagogical profile confirmation.

### Field: bilingualPrograms / internationalPrograms

1. Portrait or school website explicitly lists bilingual or international program? → `verified` with citation.
2. Default when not explicitly verified → `missing` (not `not_applicable` unless the field genuinely does not apply to this school type).

### Field: inspectionAvailability (directory-only schools)

1. School has `directory_only` status or `directory` coverage level? → default `missing` with note that inspection was not researched at basic tier.
2. Do **not** use portrait-only check → `not_confirmed` for directory schools.
3. Independent inspection source found (Senate directory link or school inspection page)? → `verified` with `available` or appropriate value and cite the inspection source.

### Field: inspectionAvailability (detailed tier)

1. Official inspection or quality report URL confirmed? → `verified`.
2. Portrait checked, no inspection link found, school is detailed tier? → may use `not_confirmed` with explanation (only when detailed research was attempted).
3. No research attempted? → `missing`.

## Evidence status assignment

Assign exactly one status per field. UI labels (Brazilian Portuguese) come from `formatSchoolField`:

| Status | When to use | UI label |
| ------ | ----------- | -------- |
| `verified` | Non-null value, ≥1 acceptable citation, no unresolved conflict | Verificado |
| `missing` | Information not found during research | Informação não encontrada |
| `not_confirmed` | Value inferred or weakly supported; includes all `inferredFrom()` outputs | Informação inferida, não confirmada |
| `not_applicable` | Field does not apply to this school; excluded from coverage | Não se aplica |
| `unverified` | Value present but no acceptable citation | Informação não verificada |
| `outdated` | Value exists but needs re-verification | Precisa de nova verificação |
| `conflicting` | Sources materially disagree | Informação conflitante |

**Coverage numerator:** Only `verified` fields count toward the coverage percentage. `not_confirmed`, `missing`, and other statuses do not increase coverage.

## Inference rules

Cross-field inference must use the `inferredFrom()` helper in `src/content/schools/real/lichtenbergPrimarySchools/inferredFrom/`:

```typescript
inferredFrom({
  sourceField: "ganztag",           // field being inferred from
  sourceEvidence: ganztagEvidence,  // evidence object from source field
  note: "…mandatory Portuguese note…",
})
```

Rules:

- Output status is **always** `not_confirmed` — never `verified`.
- `note` is required (non-empty Portuguese string explaining the inference).
- Citations propagate from the source field's evidence — do not invent new citations.
- `lastChecked` on the inferred field matches the source field's check date.

## Citation rules

Every `verified` field requires:

1. **≥1 citation** referencing a `sourceId` in the school's `sources[]` array.
2. **Acceptable source** — primary (official government/inspection) or secondary (school website, public dataset) reliability per [docs/RESEARCH.md](../RESEARCH.md).
3. **Complete source metadata** on the cited source: `publisher`, `url`, `dateAccessed` (and `type`, `reliability`).

`pnpm validate:data` enforces these rules via `schoolSchema.superRefine()` and `validateFieldCitations`. Fix all validation errors before marking research complete.

## Coverage v2 reference

Coverage measures **research completeness**, not school quality. Version `v2` uses level-aware denominators (`evidenceCoverageVersion` in code).

| Tier | `coverageLevel` | Label (`getCoverageTierLabel`) | Denominator fields |
| ---- | --------------- | ------------------------------ | ------------------ |
| Directory | `directory` | Pesquisa básica | 11 portrait fields: name, schoolNumber, website, classification, level, district, neighbourhood, address, gradesServed, ganztag, languages |
| Detailed | `detailed` | Pesquisa detalhada | 23 fields: all directory fields plus afterSchoolCare, bilingualPrograms, internationalPrograms, welcomeClasses, schoolProfile, pedagogyFocus, inclusionSupport, transitionAfterGrade6, familyCommunication, inspectionAvailability, inspectionData, facilities |

Numerator counts only fields with `verified` status. A school at 100% directory coverage means all 11 portrait fields are independently verified — not that the school is "complete" in every possible dimension.

## Date update rules

Research dates must reflect actual check activity for each school.

| Field | Meaning | How to set |
| ----- | ------- | ---------- |
| `source.dateAccessed` | Date **this specific source** was last checked | Set individually when visiting each URL; never share one constant across all sources |
| `evidence.lastChecked` | Date the field evidence was last evaluated | Match the source check date used for that field's citation |
| `research.lastSourceChecked` | Most recent source access on this school | Max `dateAccessed` among sources cited by any field on this school |
| `research.lastResearched` | Last full field-by-field review | Date you completed (or re-completed) the per-field decision trees for this school |

For schools with uneven research depth (e.g. portrait-only vs multi-source), `lastSourceChecked` and `lastResearched` may differ — that is expected and honest.

## Completion gate

Research is **not complete** until validation passes:

```bash
pnpm validate:data
```

1. Run from the repository root after all fields and sources are assigned.
2. Fix every reported error (schema, citation, cross-field rules).
3. Re-run until exit code 0.
4. Only then update `research.status` to reflect completion level (`directory_only` or `profile_ready`).

Do not skip validation because the record "looks correct" — the schema catches missing citations, unacceptable sources, and structural errors.

## Re-research procedure

When any field or source is re-checked (correction, new portrait data, parent report, annual refresh):

1. **Update the affected source's `dateAccessed`** to the date of the new check.
2. **Re-walk the per-field decision trees** for fields that depend on the updated source.
3. **Update `evidence.lastChecked`** on changed fields.
4. **Update both `research.lastResearched` and `research.lastSourceChecked`** — even if only one source changed, both dates must reflect the re-research session.
5. **Run `pnpm validate:data`** before considering the update complete.

If a previously `verified` field can no longer be confirmed, downgrade to `missing`, `not_confirmed`, or `outdated` with an explanatory note — do not leave stale `verified` status.
