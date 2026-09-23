# Phase 14: Pilot Profile Content - Pattern Map

**Mapped:** 2026-07-29
**Files analyzed:** 8
**Analogs found:** 8 / 8

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/features/schools/school/index.ts` | model | transform | `src/features/schools/school/index.ts` (Phase 13 tags + date gate) | exact |
| `src/features/schools/school/fixtures.ts` | test | transform | `src/features/schools/school/fixtures.ts` (`validTaggedSchool` / `invalidTaggedWithoutReviewDate`) | exact |
| `src/features/schools/school/index.test.ts` | test | request-response | `src/features/schools/school/index.test.ts` (tag/date cases) | exact |
| `src/content/schools/real/lichtenbergPrimarySchools/index.ts` | config | file-I/O | `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (`primarySchool` + pilot entries) | exact |
| `docs/research/PHASE14_COMMUNITY_TRIANGULATION.md` | config | file-I/O | `docs/research/PILOT_SELECTION.md` | role-match |
| `docs/research/PILOT_SELECTION.md` | config | file-I/O | `docs/research/PILOT_SELECTION.md` (Community-Evidence Candidate) | exact |
| `docs/DATA_MODEL.md` | config | file-I/O | `docs/DATA_MODEL.md` (Tag Taxonomy + Qualitative Review Tracking) | exact |
| Community tag authoring (inside Lichtenberg content, if publish) | model | transform | `src/features/evidence/validateTagEvidence/fixtures.ts` (`validCommunityTag`) + `src/features/evidence/source/fixtures.ts` (`communitySourceA/B`) | exact |

Unchanged but must stay green (no new pattern work): `src/features/evidence/validateTagEvidence/index.ts`, `src/features/schools/validateSchools/index.ts`, `src/features/schools/tagTaxonomy/index.ts`. Soft copy align only if needed: `src/content/guides/methodology.mdx` (no close qualitative-field analog; skip unless executor finds drift).

## Pattern Assignments

### `src/features/schools/school/index.ts` (model, transform)

**Analog:** `src/features/schools/school/index.ts` — extend existing optional qualitative fields and `superRefine`.

**Imports pattern** (lines 1–17):
```typescript
import { z } from "zod";

import {
  createFieldValueSchema,
  type FieldEvidence,
} from "@/features/evidence/fieldEvidence";
import { sourceSchema } from "@/features/evidence/source";
import { validateFieldCitations } from "@/features/evidence/validateFieldCitations";
import { validateTagEvidence } from "@/features/evidence/validateTagEvidence";
import { researchMetadataSchema } from "@/features/schools/researchMetadata";
import {
  inspectionAvailabilitySchema,
  schoolClassificationSchema,
  schoolLevelSchema,
} from "@/features/schools/schoolClassification";
import { schoolLocationSchema } from "@/features/schools/schoolLocation";
import { schoolTagSchema } from "@/features/schools/tagTaxonomy";
```

**Core additive-fields pattern** (lines 56–59 — extend beside these):
```typescript
    sources: z.array(sourceSchema).min(1),
    research: researchMetadataSchema,
    tags: z.array(schoolTagSchema).optional(),
    qualitativeLastReviewed: z.string().date().optional(),
```

Add (D-02 / D-17):
```typescript
    perfilDaEscola: z.string().trim().min(1).optional(),
    qualitativeResearchNotes: z.string().trim().min(1).optional(),
```

**Do not touch** `schoolProfile: createFieldValueSchema(z.string().min(1))` (line 46) — factual German/offer field; `perfilDaEscola` is a separate plain PT-BR string.

**Cross-field refine pattern** (lines 132–148 — replace tags-only date gate):
```typescript
    for (const [index, tag] of (school.tags ?? []).entries()) {
      const result = validateTagEvidence(tag, school.sources);
      if (!result.ok) {
        for (const message of result.messages) {
          context.addIssue({ code: "custom", path: ["tags", index], message });
        }
      }
    }

    if ((school.tags?.length ?? 0) > 0 && !school.qualitativeLastReviewed) {
      context.addIssue({
        code: "custom",
        path: ["qualitativeLastReviewed"],
        message:
          "Schools with tags must include qualitativeLastReviewed (YYYY-MM-DD).",
      });
    }
```

Replace the date-only block with D-03/D-04:
```typescript
    const hasTags = (school.tags?.length ?? 0) > 0;
    const hasPerfil = Boolean(school.perfilDaEscola);

    if (hasTags && !school.perfilDaEscola) {
      context.addIssue({
        code: "custom",
        path: ["perfilDaEscola"],
        message: "Schools with tags must include perfilDaEscola.",
      });
    }

    if ((hasTags || hasPerfil) && !school.qualitativeLastReviewed) {
      context.addIssue({
        code: "custom",
        path: ["qualitativeLastReviewed"],
        message:
          "Schools with tags or perfilDaEscola must include qualitativeLastReviewed (YYYY-MM-DD).",
      });
    }
```

Keep empty `tags: []` as “no tags” (`length > 0` gate). Notes alone should not require date (RESEARCH A4).

---

### `src/features/schools/school/fixtures.ts` (test, transform)

**Analog:** same file — `validTaggedSchool` / `invalidTaggedWithoutReviewDate` / `invalidCommunityOnlyTag`.

**Imports pattern** (lines 1–14):
```typescript
import type {
  FieldEvidence,
  FieldValue,
} from "@/features/evidence/fieldEvidence";
import {
  anecdotalSource,
  communitySourceA,
  communitySourceB,
  journalismSource,
  officialDirectorySource,
  schoolWebsiteSource,
} from "@/features/evidence/source/fixtures";
import { communityOnlyTag } from "@/features/evidence/validateTagEvidence/fixtures";
import type { School } from ".";
```

**Core fixture spread pattern** (lines 265–298):
```typescript
export const validTaggedSchool = {
  ...validDirectoryOnlySchool,
  sources: [
    officialDirectorySource,
    schoolWebsiteSource,
    journalismSource,
    communitySourceA,
    communitySourceB,
  ],
  tags: [
    {
      id: "stem-focus" as const,
      confidence: "confirmed_official" as const,
      citations: [{ sourceId: schoolWebsiteSource.id }],
    },
  ],
  qualitativeLastReviewed: "2026-07-29",
};

export const invalidTaggedWithoutReviewDate = {
  ...validDirectoryOnlySchool,
  sources: [
    officialDirectorySource,
    schoolWebsiteSource,
    journalismSource,
  ],
  tags: [
    {
      id: "stem-focus" as const,
      confidence: "confirmed_official" as const,
      citations: [{ sourceId: schoolWebsiteSource.id }],
    },
  ],
};
```

**Add fixtures for Wave 0** (mirror spread style):
- `validPerfilOnlySchool` — `perfilDaEscola` + `qualitativeLastReviewed`, no tags
- Update `validTaggedSchool` — add `perfilDaEscola` (tags now require perfil)
- `invalidTaggedWithoutPerfil` — tags + date, missing perfil
- `invalidPerfilWithoutReviewDate` — perfil only, no date
- Optional: `validWithResearchNotes` — perfil + date + `qualitativeResearchNotes`

---

### `src/features/schools/school/index.test.ts` (test, request-response)

**Analog:** same file — colocated Jest `describe("schoolSchema")`.

**Imports + case pattern** (lines 1–74):
```typescript
import { schoolSchema } from ".";
import {
  invalidAnecdotalVerifiedSource,
  invalidCommunityOnlyTag,
  invalidMixedLevelWithoutPrimaryDescription,
  invalidTaggedWithoutReviewDate,
  invalidUnknownSourceCitation,
  invalidVerifiedWithoutCitation,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validMixedLevelPrimarySchool,
  validPrivateBilingualSchool,
  validTaggedSchool,
} from "./fixtures";

describe("schoolSchema", () => {
  it("accepts a school with empty tags and no qualitativeLastReviewed", () => {
    expect(
      schoolSchema.parse({
        ...validDirectoryOnlySchool,
        tags: [],
      }),
    ).toMatchObject({
      ...validDirectoryOnlySchool,
      tags: [],
    });
  });

  it("accepts a valid tagged school with qualitativeLastReviewed YYYY-MM-DD", () => {
    expect(schoolSchema.parse(validTaggedSchool)).toEqual(validTaggedSchool);
  });

  it("rejects tagged schools missing qualitativeLastReviewed", () => {
    expect(() =>
      schoolSchema.parse(invalidTaggedWithoutReviewDate),
    ).toThrow();
  });
});
```

**Add cases** (same `parse` / `toThrow` style):
- accepts perfil-only + date
- accepts tags + perfil + date
- rejects tags without perfil
- rejects perfil without date
- accepts omit both (non-pilot)
- optionally: notes without date still OK when no tags/perfil

---

### `src/content/schools/real/lichtenbergPrimarySchools/index.ts` (config, file-I/O)

**Analog:** same file — `BaseSchoolInput`, `primarySchool()`, per-school `primarySchool({ ... })` calls.

**Factory input type pattern** (lines 98–128):
```typescript
type BaseSchoolInput = {
  portraitId: string;
  slug: string;
  name: string;
  schoolNumber: string;
  address: string;
  postCodeAndCity: string;
  neighbourhood: string;
  website: string;
  languages: string[];
  ganztag?: string;
  offers?: string[];
  sources?: Source[];
  researchStatus?: School["research"]["status"];
  coverageLevel?: School["research"]["coverageLevel"];
  lastResearched?: string;
  lastSourceChecked?: string;
  afterSchoolCare?: FieldValue<string>;
  bilingualPrograms?: FieldValue<string[]>;
  // ... other optional FieldValue overrides ...
};
```

**Discretion (RESEARCH Pattern 4):** either extend `BaseSchoolInput` + return with optional `tags`, `perfilDaEscola`, `qualitativeLastReviewed`, `qualitativeResearchNotes`, **or** post-spread on finished objects. Prefer one approach for all five pilots.

If extending factory, pass-through at end of `return { ... }` (after `research`, lines 230–236):
```typescript
    sources,
    research: {
      status: researchStatus,
      coverageLevel,
      lastResearched: input.lastResearched ?? spikeFullReviewDate,
      lastSourceChecked: input.lastSourceChecked ?? maxDateAccessed(sources),
    },
    // optional qualitative fields from input when present
```

**Pilot authoring shape** (mirror Lew-Tolstoi / Wagner entry style, lines 441–504):
```typescript
  primarySchool({
    portraitId: "28987",
    slug: "lew-tolstoi-schule",
    name: "Lew-Tolstoi-Schule",
    // ... existing factual fields unchanged ...
    sources: [lewTolstoiWebsite, lewTolstoiGanztag /* + community sources only if publishing */],
    // NEW qualitative only on pilots:
    // tags?: [...],
    // perfilDaEscola: "…",
    // qualitativeLastReviewed: "YYYY-MM-DD",
    // qualitativeResearchNotes?: "…" // withhold path
  }),
```

**Pilot slugs to touch only:** `richard-wagner-schule`, `lew-tolstoi-schule`, `bernhard-grzimek-schule`, `friedrichsfelder-schule`, `seepark-grundschule`.  
**Non-pilots untouched:** `adam-ries-schule`, `buergermeister-ziethen-schule`, `grundschule-am-traenkegraben`, `schmetterlings-grundschule`, `karlshorster-schule`.

**Source helpers already in file** (lines 27–60): reuse `source()`, `schoolWebsiteSource()`, `officialPortraitSource()` for any new community sources — do not invent a parallel source builder.

---

### Community tag publish path (inside Lichtenberg content, conditional)

**Analog:** `src/features/evidence/validateTagEvidence/fixtures.ts` + `src/features/evidence/source/fixtures.ts`.

**Community source shape** (`source/fixtures.ts` lines 45–63):
```typescript
export const communitySourceA: Source = {
  id: "community-reddit",
  title: "Synthetic Reddit parent discussion",
  url: "https://example.test/reddit-thread",
  type: "triangulated_community",
  reliability: "anecdotal",
  publisher: "Synthetic Reddit venue",
  dateAccessed: "2026-07-10",
};
```

**Valid community tag checklist** (`validateTagEvidence/fixtures.ts` lines 13–54):
```typescript
export const independenceLogA: IndependenceLog = {
  venue: "Reddit r/berlin",
  identifier: "https://example.test/reddit-thread",
  dateAccessed: "2026-07-10",
  independenceRationale:
    "Distinct venue and authors from Facebook group discussion",
  echoCheckNote: "No copy-paste overlap with Facebook source",
};

export const validCommunityTag: SchoolTag = {
  id: "active-school-community",
  confidence: "confirmed_multi_source",
  citations: [
    {
      sourceId: communitySourceA.id,
      independenceLog: independenceLogA,
    },
    {
      sourceId: communitySourceB.id,
      independenceLog: independenceLogB,
    },
    { sourceId: officialDirectorySource.id },
  ],
};
```

Real authoring must use live URLs, distinct venues in independence logs, ≥2 community cites + ≥1 allowlisted non-community cite, and confidence matching `deriveExpectedConfidence`. On withhold: omit tag; set `qualitativeResearchNotes` + docs log instead.

---

### `docs/research/PHASE14_COMMUNITY_TRIANGULATION.md` (config, file-I/O)

**Analog:** `docs/research/PILOT_SELECTION.md` — purpose, policy authority, provisional candidate, fail-closed framing.

**Doc structure pattern** (PILOT_SELECTION lines 1–39):
```markdown
# Pilot Selection

Selected: 2026-07-26

## Purpose
...
**Policy authority:** ... linked canonical docs ...

## Community-Evidence Candidate
Lew-Tolstoi-Schule is the provisional candidate...
If no qualifying independent venue is found, the `active-school-community` tag fails closed...
```

**New log should include:** research date; venues checked; independence/echo notes; publish vs withhold decision; pointer to school-record notes field; link back to PILOT_SELECTION + RESEARCH.md Community Source Independence.

---

### `docs/research/PILOT_SELECTION.md` (config, file-I/O)

**Analog:** itself — add a short pointer under Community-Evidence Candidate to the Phase 14 log after research completes. Do not rewrite selection rationale.

---

### `docs/DATA_MODEL.md` (config, file-I/O)

**Analog:** same file — Tag Taxonomy + Qualitative Review Tracking (lines 156–177).

**Existing qualitative semantics** (lines 173–177):
```markdown
## Qualitative Review Tracking

Qualitative content (tags and the "Perfil da escola" narrative) is tracked with its own field, `qualitativeLastReviewed`, separate from the factual `research.lastResearched` and `research.lastSourceChecked` fields. ...
This section documents the field's intended semantics; Phase 13 implements it on the school schema. `qualitativeLastReviewed` should record an ISO `YYYY-MM-DD` date...
```

**Extend docs to document:**
- `perfilDaEscola` — optional plain PT-BR string (not MDX); distinct from factual `schoolProfile`
- `qualitativeResearchNotes` — optional research/withhold metadata
- Cross-field rules: tags ⇒ perfil; (tags | perfil) ⇒ `qualitativeLastReviewed`
- Update “Phase 13 implements” wording to note Phase 14 field + gate extension

## Shared Patterns

### Additive optional qualitative fields
**Source:** `src/features/schools/school/index.ts` lines 58–59 (Phase 13 tags pattern)  
**Apply to:** `perfilDaEscola`, `qualitativeResearchNotes`  
```typescript
tags: z.array(schoolTagSchema).optional(),
qualitativeLastReviewed: z.string().date().optional(),
// mirror: z.string().trim().min(1).optional() for perfil + notes
```

### Zod `superRefine` + `context.addIssue`
**Source:** `src/features/schools/school/index.ts` lines 62–148  
**Apply to:** tags→perfil and (tags|perfil)→date gates  
```typescript
context.addIssue({
  code: "custom",
  path: ["qualitativeLastReviewed"],
  message: "…",
});
```

### Colocated fixtures + Jest
**Source:** `src/features/schools/school/fixtures.ts` + `index.test.ts`  
**Apply to:** all new cross-field schema cases  
- Spread from `validDirectoryOnlySchool`
- `schoolSchema.parse` / `expect(() => …).toThrow()`
- Keep `as const` on tag ids/confidence

### Static real-school authoring via `primarySchool()`
**Source:** `lichtenbergPrimarySchools/index.ts` lines 98–237, 441+  
**Apply to:** five pilots only; preserve factual fields; gate with `pnpm validate:data`

### Community triangulation (publish or withhold)
**Source:** `validateTagEvidence/fixtures.ts` `validCommunityTag` + PILOT_SELECTION fail-closed framing  
**Apply to:** Lew-Tolstoi only for PILOT-03; CONTEXT D-14 (1A) — documented attempt + outcome is success

### Docs policy pointer style
**Source:** `docs/research/PILOT_SELECTION.md` + `docs/research/SCHOOL_RESEARCH_WORKFLOW.md`  
**Apply to:** Phase 14 research log — state purpose, policy authority links, do not redefine taxonomy

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| — | — | — | All planned files have in-repo analogs. Soft-only `methodology.mdx` align has no perfil-field precedent; treat as optional copy check, not schema work. |

## Metadata

**Analog search scope:** `src/features/schools/school/`, `src/features/evidence/validateTagEvidence/`, `src/features/evidence/source/`, `src/content/schools/real/lichtenbergPrimarySchools/`, `docs/research/`, `docs/DATA_MODEL.md`, `src/features/schools/tagTaxonomy/`  
**Files scanned:** ~15 primary artifacts (schema, fixtures, tests, content factory, source fixtures, research docs, data model)  
**Pattern extraction date:** 2026-07-29
