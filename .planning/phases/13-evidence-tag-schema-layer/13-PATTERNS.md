# Phase 13: Evidence & Tag Schema Layer - Pattern Map

**Mapped:** 2026-07-29
**Files analyzed:** 18
**Analogs found:** 18 / 18

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/features/evidence/sourceTypes/index.ts` | model | transform | itself (extend) | exact |
| `src/features/evidence/sourceTypes/index.test.ts` | test | transform | itself (extend) | exact |
| `src/features/evidence/source/fixtures.ts` | test | file-I/O | itself (extend) | exact |
| `src/features/evidence/independenceLog/index.ts` | model | transform | `src/features/evidence/fieldEvidence/index.ts` | role-match |
| `src/features/evidence/tagCitation/index.ts` | model | transform | `src/features/evidence/fieldEvidence/index.ts` (`fieldCitationSchema`) | exact |
| `src/features/schools/tagTaxonomy/index.ts` | model | transform | `src/features/schools/schoolClassification/index.ts` | exact |
| `src/features/schools/tagTaxonomy/index.test.ts` | test | transform | `src/features/evidence/sourceTypes/index.test.ts` | role-match |
| `src/features/evidence/formatTagConfidence/index.ts` | utility | transform | `src/features/evidence/formatSourceType/index.ts` | exact |
| `src/features/evidence/formatTagConfidence/index.test.ts` | test | transform | `src/features/evidence/formatSourceType/index.test.ts` | exact |
| `src/features/evidence/formatSourceType/index.ts` | utility | transform | itself (extend) | exact |
| `src/features/evidence/formatSourceType/index.test.ts` | test | transform | itself (extend) | exact |
| `src/features/evidence/validateFieldCitations/index.ts` | utility | transform | itself (harden allowlist) | exact |
| `src/features/evidence/validateFieldCitations/index.test.ts` | test | transform | itself (extend) | exact |
| `src/features/evidence/validateTagEvidence/index.ts` | utility | transform | `src/features/evidence/validateFieldCitations/index.ts` | exact |
| `src/features/evidence/validateTagEvidence/index.test.ts` | test | transform | `src/features/evidence/validateFieldCitations/index.test.ts` | exact |
| `src/features/schools/school/index.ts` | model | transform | itself (`superRefine` + optional fields) | exact |
| `src/features/schools/school/fixtures.ts` | test | transform | itself (spread invalid fixtures) | exact |
| `src/features/schools/school/index.test.ts` | test | transform | itself (extend) | exact |
| `src/features/schools/collectCitedSources/index.ts` | utility | transform | itself (`SOURCE_TYPE_ORDER`) | exact |
| `docs/RESEARCH.md` | config | file-I/O | itself (Reliability Levels section) | exact |

**Do not create/modify (anti-analogs):**
- `calculateEvidenceCoverage` — do not count tags (VAL-01)
- Real Lichtenberg school records — leave untagged (Phase 14)
- `SourcesSection` / tag→Fontes merge — Phase 15
- Profile UI chips — Phase 15

---

## Pattern Assignments

### `src/features/evidence/sourceTypes/index.ts` (model, transform)

**Analog:** `src/features/evidence/sourceTypes/index.ts` (extend in place)

**Imports / enum pattern** (lines 1–31):
```typescript
import { z } from "zod";

export const sourceTypeSchema = z.enum([
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
  "anecdotal_reserved",
]);

export const reliabilityLevelSchema = z.enum([
  "primary",
  "secondary",
  "anecdotal",
  "unknown",
]);

export const acceptableReliabilityLevels = ["primary", "secondary"] as const;

export function isAcceptableReliabilityLevel(
  reliability: ReliabilityLevel,
): reliability is AcceptableReliabilityLevel {
  return acceptableReliabilityLevels.includes(
    reliability as AcceptableReliabilityLevel,
  );
}
```

**Core pattern to copy:** Keep reliability enum **unchanged**. Insert `"journalism"` and `"triangulated_community"` into `sourceTypeSchema` **before** `anecdotal_reserved`. Mirror `acceptableReliabilityLevels` + predicate for factual allowlist:

```typescript
export const acceptableFactualSourceTypes = [
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
  "journalism",
] as const;

export function isAcceptableFactualEvidence(source: {
  type: SourceType;
  reliability: ReliabilityLevel;
}): boolean {
  return (
    isAcceptableReliabilityLevel(source.reliability) &&
    (acceptableFactualSourceTypes as readonly string[]).includes(source.type)
  );
}
```

**Error handling:** N/A (pure Zod + predicates). Fail closed via enum (unknown IDs throw on parse).

---

### `src/features/evidence/sourceTypes/index.test.ts` (test, transform)

**Analog:** `src/features/evidence/sourceTypes/index.test.ts`

**Testing pattern** (lines 7–36):
```typescript
describe("sourceTypes", () => {
  it("accepts the canonical V1 source types", () => {
    expect(sourceTypeSchema.parse("official_government")).toBe(
      "official_government",
    );
    // ... one expect per enum member
  });

  it("marks only primary and secondary reliability as acceptable for V1 verification", () => {
    expect(isAcceptableReliabilityLevel(reliabilityLevelSchema.parse("primary"))).toBe(true);
    expect(isAcceptableReliabilityLevel(reliabilityLevelSchema.parse("anecdotal"))).toBe(false);
  });
});
```

**Extend with:** parse accepts `journalism` / `triangulated_community`; reliability rejects `"triangulated_community"` string; `isAcceptableFactualEvidence` true for journalism+secondary, false for community+secondary.

---

### `src/features/evidence/source/fixtures.ts` (test, transform)

**Analog:** `src/features/evidence/source/fixtures.ts`

**Core fixture pattern** (lines 3–32):
```typescript
export const officialDirectorySource: Source = {
  id: "berlin-directory",
  title: "Synthetic Berlin school directory",
  url: "https://example.test/berlin-directory",
  type: "official_government",
  reliability: "primary",
  publisher: "Synthetic Berlin Senate source",
  dateAccessed: "2026-07-10",
  datePublished: "2026-07-01",
};

export const anecdotalSource: Source = {
  id: "parent-forum",
  title: "Synthetic parent forum",
  url: "https://example.test/forum",
  type: "anecdotal_reserved",
  reliability: "anecdotal",
  publisher: "Synthetic forum",
  dateAccessed: "2026-07-10",
};
```

**Copy for new fixtures:** Same shape; add `journalismSource` (`type: "journalism"`, `reliability: "secondary"`) and two distinct `triangulated_community` sources (`reliability: "anecdotal"`) with different `id`/`publisher` for never-sole-basis tests.

---

### `src/features/evidence/independenceLog/index.ts` (model, transform)

**Analog:** `src/features/evidence/fieldEvidence/index.ts` (Zod object + `z.string().date()`)

**Imports / object schema pattern** (lines 1–17):
```typescript
import { z } from "zod";

export const fieldCitationSchema = z.object({
  sourceId: z.string().min(1),
  quote: z.string().optional(),
  note: z.string().optional(),
});
```

**Date field pattern** (line 24 of same file):
```typescript
lastChecked: z.string().date().optional(),
```

**Core pattern for independence log** (D-11 semantics → recommended keys from RESEARCH):
```typescript
export const independenceLogSchema = z.object({
  venue: z.string().min(1),
  identifier: z.string().min(1),
  dateAccessed: z.string().date(),
  independenceRationale: z.string().min(1),
  echoCheckNote: z.string().min(1),
});
```

**Colocation:** `index.ts` + optional `index.test.ts` if non-trivial; export `IndependenceLog` via `z.infer`.

---

### `src/features/evidence/tagCitation/index.ts` (model, transform)

**Analog:** `src/features/evidence/fieldEvidence/index.ts` (`fieldCitationSchema`)

**Core citation-by-sourceId pattern** (lines 13–17):
```typescript
export const fieldCitationSchema = z.object({
  sourceId: z.string().min(1),
  quote: z.string().optional(),
  note: z.string().optional(),
});
```

**Extend for tags** (independence log optional at schema level; required in `validateTagEvidence` when resolved type is `triangulated_community`):
```typescript
export const tagCitationSchema = z.object({
  sourceId: z.string().min(1),
  quote: z.string().optional(),
  note: z.string().optional(),
  independenceLog: independenceLogSchema.optional(),
});
```

**Do not** put independence log on `sourceSchema` (D-10). Keep `fieldCitationSchema` lean — no independence log on field cites.

---

### `src/features/schools/tagTaxonomy/index.ts` (model, transform)

**Analog:** `src/features/schools/schoolClassification/index.ts`

**Closed enum pattern** (lines 1–17):
```typescript
import { z } from "zod";

export const schoolClassificationSchema = z.enum(["public", "private"]);

export const schoolLevelSchema = z.enum(["primary", "mixed_with_primary"]);

export type SchoolClassification = z.infer<typeof schoolClassificationSchema>;
```

**Apply to 10-tag taxonomy** (IDs from `docs/DATA_MODEL.md`):
```typescript
export const tagTaxonomyIdSchema = z.enum([
  "stem-focus",
  "languages-focus",
  "arts-music-focus",
  "bilingual-program",
  "special-pedagogical-model",
  "all-day-model",
  "inclusion-support",
  "transition-support",
  "structured-learning-environment",
  "active-school-community",
]);
```

**Also colocate here (Claude discretion):** `tagConfidenceSchema` (`confirmed_multi_source` | `confirmed_official` | `partial`), `schoolTagSchema` (`id`, `confidence`, `citations` with `.min(1)`), category map constant, and `formatTagId` PT-BR Record (mirror `formatSourceType`).

**Format helper analog for `formatTagId`:** `src/features/evidence/formatSourceType/index.ts` (Record map + null-hide only if needed; all 10 tags displayable).

---

### `src/features/evidence/formatTagConfidence/index.ts` (utility, transform)

**Analog:** `src/features/evidence/formatSourceType/index.ts`

**Imports / label map pattern** (lines 1–16):
```typescript
import type { SourceType } from "@/features/evidence/sourceTypes";

const labels: Record<Exclude<SourceType, "anecdotal_reserved">, string> = {
  official_government: "Oficial",
  school_website: "Site da escola",
  official_inspection: "Inspeção oficial",
  public_dataset: "Dados públicos",
};

export function formatSourceType(type: SourceType): string | null {
  if (type === "anecdotal_reserved") {
    return null;
  }
  return labels[type];
}
```

**Apply for confidence** (D-17 locked strings — all displayable, no null branch):
```typescript
const labels: Record<TagConfidence, string> = {
  confirmed_multi_source: "Confirmado por múltiplas fontes",
  confirmed_official: "Confirmado por fonte oficial",
  partial: "Evidência parcial",
};

export function formatTagConfidence(confidence: TagConfidence): string {
  return labels[confidence];
}
```

**Secondary analog:** `src/features/schools/getCoverageTierLabel/index.ts` — simple ID→PT-BR function with typed return.

---

### `src/features/evidence/formatSourceType/index.ts` (utility, transform)

**Analog:** itself

**Core pattern:** Extend `labels` Record with:
- `journalism: "Jornalismo independente"`
- `triangulated_community: "Fontes comunitárias trianguladas"`

Keep `anecdotal_reserved` → `null` (D-22). TypeScript exhaustiveness on `Record<Exclude<SourceType, "anecdotal_reserved">, string>` will force the new keys when enum grows.

---

### `src/features/evidence/validateFieldCitations/index.ts` (utility, transform)

**Analog:** itself — switch predicate only

**Imports / Map lookup pattern** (lines 1–23):
```typescript
import type { FieldEvidence } from "@/features/evidence/fieldEvidence";
import type { Source } from "@/features/evidence/source";
import { isAcceptableReliabilityLevel } from "@/features/evidence/sourceTypes";

export function validateFieldCitations(
  evidence: FieldEvidence,
  sources: Source[],
) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  const citationSources = evidence.citations.map((citation) =>
    sourceById.get(citation.sourceId),
  );
  const hasUnknownSource = citationSources.some((source) => !source);
  const hasAcceptableSource = citationSources.some(
    (source) => source && isAcceptableReliabilityLevel(source.reliability),
  );

  return {
    hasUnknownSource,
    hasAcceptableSource,
  };
}
```

**Change:** Replace `isAcceptableReliabilityLevel(source.reliability)` with `isAcceptableFactualEvidence(source)`. Keep return shape so `schoolSchema.superRefine` callers stay compatible. Optionally update error message in school refine from “primary or secondary source” to mention factual allowlist.

---

### `src/features/evidence/validateTagEvidence/index.ts` (utility, transform)

**Analog:** `src/features/evidence/validateFieldCitations/index.ts`

**Core pattern to mirror:**
1. Build `Map` from `sources` by `id`
2. Resolve each citation’s `sourceId`
3. Return structured result for `superRefine` to emit issues

**Recommended return shape** (richer than field validator — messages for tag rules):
```typescript
export function validateTagEvidence(
  tag: SchoolTag,
  sources: Source[],
): { ok: true } | { ok: false; messages: string[] }
```

**Rules to encode (from CONTEXT):**
- Unknown `sourceId` → fail
- `active-school-community`: ≥2 distinct `triangulated_community` sourceIds, each with `independenceLog`; ≥1 cite from factual allowlist types; reject community-only
- Other tags: reject any `triangulated_community` or `anecdotal_reserved`
- Confidence ↔ citation consistency (D-20; RESEARCH Pattern 5 bidirectional preferred)

**Do not** invent a second sources registry — resolve against school `sources[]` only (D-12).

---

### `src/features/evidence/validateTagEvidence/index.test.ts` (test, transform)

**Analog:** `src/features/evidence/validateFieldCitations/index.test.ts`

**Testing pattern** (lines 1–37):
```typescript
import { validateFieldCitations } from ".";
import {
  anecdotalSource,
  officialDirectorySource,
} from "@/features/evidence/source/fixtures";

describe("validateFieldCitations", () => {
  it("detects acceptable cited sources", () => {
    expect(
      validateFieldCitations(
        { status: "verified", citations: [{ sourceId: officialDirectorySource.id }] },
        [officialDirectorySource],
      ),
    ).toEqual({ hasUnknownSource: false, hasAcceptableSource: true });
  });

  it("does not treat anecdotal sources as acceptable for verified coverage", () => {
    expect(
      validateFieldCitations(
        { status: "verified", citations: [{ sourceId: anecdotalSource.id }] },
        [anecdotalSource],
      ),
    ).toEqual({ hasUnknownSource: false, hasAcceptableSource: false });
  });
});
```

**Matrix to cover:** community-only reject; &lt;2 community reject; missing independence log reject; valid community+official accept; non-community tag with community cite reject; confidence mismatch reject/accept.

---

### `src/features/schools/school/index.ts` (model, transform)

**Analog:** itself + conditional-required pattern from `researchMetadata`

**Imports pattern** (lines 1–15):
```typescript
import { z } from "zod";
import { createFieldValueSchema, type FieldEvidence } from "@/features/evidence/fieldEvidence";
import { sourceSchema } from "@/features/evidence/source";
import { validateFieldCitations } from "@/features/evidence/validateFieldCitations";
import { researchMetadataSchema } from "@/features/schools/researchMetadata";
```

**Optional additive fields** (keep non-pilots valid — D-14/D-15):
```typescript
tags: z.array(schoolTagSchema).optional(),
qualitativeLastReviewed: z.string().date().optional(),
```

**superRefine citation gate pattern** (lines 58–98):
```typescript
.superRefine((school, context) => {
  const fieldEntries = collectFieldEvidence(school);

  for (const { path, value, evidence } of fieldEntries) {
    const citationResult = validateFieldCitations(evidence, school.sources);

    if (citationResult.hasUnknownSource) {
      context.addIssue({
        code: "custom",
        path: [...path, "evidence", "citations"],
        message:
          "Field citation references a source that does not exist on the school record.",
      });
    }
    // ...
  }
});
```

**Wire tag gate the same way:**
```typescript
for (const [index, tag] of (school.tags ?? []).entries()) {
  const result = validateTagEvidence(tag, school.sources);
  if (!result.ok) {
    for (const message of result.messages) {
      context.addIssue({
        code: "custom",
        path: ["tags", index],
        message,
      });
    }
  }
}

if ((school.tags?.length ?? 0) > 0 && !school.qualitativeLastReviewed) {
  context.addIssue({
    code: "custom",
    path: ["qualitativeLastReviewed"],
    message: "Schools with tags must include qualitativeLastReviewed (YYYY-MM-DD).",
  });
}
```

**Conditional-required analog:** `src/features/schools/researchMetadata/index.ts` lines 33–49 (`detailed` → require dates). Same `context.addIssue` + path style; trigger is **non-empty** tags, not omitted/`[]`.

---

### `src/features/schools/school/fixtures.ts` + `index.test.ts` (test, transform)

**Analog:** existing school fixtures / tests

**Invalid fixture spread pattern** (fixtures.ts lines 231–254):
```typescript
export const invalidVerifiedWithoutCitation = {
  ...validDirectoryOnlySchool,
  name: field("Invalid School", {
    status: "verified",
    citations: [],
  }),
};

export const invalidAnecdotalVerifiedSource = {
  ...validDirectoryOnlySchool,
  sources: [anecdotalSource],
  name: field("Invalid School", {
    status: "verified",
    citations: [{ sourceId: anecdotalSource.id }],
  }),
};
```

**Test pattern** (index.test.ts lines 13–48):
```typescript
it("accepts a valid directory-only school", () => {
  expect(schoolSchema.parse(validDirectoryOnlySchool)).toEqual(
    validDirectoryOnlySchool,
  );
});

it("rejects verified fields that cite only anecdotal sources", () => {
  expect(() => schoolSchema.parse(invalidAnecdotalVerifiedSource)).toThrow();
});
```

**Add separate synthetic fixtures** (do not mutate `validDirectoryOnlySchool` required shape): valid tagged school with `qualitativeLastReviewed`; invalid community-only tag; invalid tags without review date; omit tags → still equals existing directory fixture (no date required).

---

### `src/features/schools/collectCitedSources/index.ts` (utility, transform)

**Analog:** itself

**SOURCE_TYPE_ORDER pattern** (lines 7–12):
```typescript
const SOURCE_TYPE_ORDER: SourceType[] = [
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
];
```

**Phase 13 change (A4):** Append `"journalism"` and `"triangulated_community"` so displayable types group if field-cited; **do not** collect tag citations (Phase 15). `anecdotal_reserved` stays out of order (non-displayable).

---

### `docs/RESEARCH.md` (config / docs, file-I/O)

**Analog:** itself — Reliability Levels section (lines 35–43)

**Current drift to fix (D-06):**
```markdown
- `triangulated_community`: independently corroborated community observation...
- `anecdotal`: subjective parent or community signal...
- `unknown`: source reliability has not yet been classified.
```

**Target:** Reliability ladder = only `primary | secondary | anecdotal | unknown`. Point community evidence at Canonical Source Types + Community Source Independence. Do not list `triangulated_community` under Reliability Levels.

---

## Shared Patterns

### Directory-colocated Zod units
**Source:** `src/features/evidence/*`, `src/features/schools/schoolClassification/`
**Apply to:** All new units (`independenceLog`, `tagCitation`, `tagTaxonomy`, `validateTagEvidence`, `formatTagConfidence`)

```text
UnitName/
├── index.ts
├── index.test.ts
└── fixtures.ts   # only when shared synthetic data needed
```

English identifiers; PT-BR only in format helpers.

### Citation registry via school `sources[]`
**Source:** `fieldCitationSchema` + `validateFieldCitations` + `schoolSchema.superRefine`
**Apply to:** Tag citations and `validateTagEvidence`

```typescript
const sourceById = new Map(sources.map((source) => [source.id, source]));
const source = sourceById.get(citation.sourceId);
```

Never embed full `Source` objects on citations; never invent `tagSources[]`.

### Zod `superRefine` + `context.addIssue`
**Source:** `school/index.ts` lines 58–98; `researchMetadata/index.ts` lines 21–49; `fieldEvidence/index.ts` lines 26–34
**Apply to:** Tag evidence gate + `qualitativeLastReviewed` conditional requirement

```typescript
context.addIssue({
  code: "custom",
  path: ["tags", index],
  message: "...",
});
```

### Factual allowlist (shared predicate)
**Source:** New on `sourceTypes`; consumers: `validateFieldCitations` + never-sole-basis non-community set in `validateTagEvidence`
**Apply to:** Field verification and TAG-03 non-community corroboration (same five types)

### Optional additive schema fields
**Source:** Existing school evolution; researchMetadata conditional dates
**Apply to:** `tags?`, `qualitativeLastReviewed?` — omit on all 10 real schools; `validate:data` stays green

### PT-BR format helpers before UI
**Source:** `formatSourceType`, `getCoverageTierLabel`
**Apply to:** `formatTagConfidence`, `formatTagId`, extended `formatSourceType` — lock strings in Jest before Phase 15 UI

### Fixture invalid via spread
**Source:** `school/fixtures.ts` invalid* exports
**Apply to:** Tagged valid/invalid synthetics; never edit real Lichtenberg content

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| — | — | — | All Phase 13 files have close analogs in evidence/schools Zod units |

**Note:** Independence-log nesting on citations is new product rules, but the Zod object + citation-by-id patterns already exist — planner should compose `fieldCitation` + `researchMetadata` date patterns rather than invent a new subsystem.

---

## Metadata

**Analog search scope:** `src/features/evidence/**`, `src/features/schools/school*`, `src/features/schools/schoolClassification`, `src/features/schools/researchMetadata`, `src/features/schools/collectCitedSources`, `src/features/schools/getCoverageTierLabel`, `src/features/schools/validateSchools`, `docs/RESEARCH.md`, `docs/DATA_MODEL.md`
**Files scanned:** ~25 primary + related tests/fixtures
**Strong analogs used:** 5 (`sourceTypes`, `fieldEvidence`, `validateFieldCitations`, `formatSourceType`, `school` + `schoolClassification` / `researchMetadata`)
**Pattern extraction date:** 2026-07-29
