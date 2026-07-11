# Phase 1 Pattern Map

**Mapped:** 2026-07-11

## Pattern: Field evidence builder (`field` + `evidence`)

**Analog:** `src/content/schools/real/lichtenbergPrimarySchools/index.ts`

```typescript
function field<Value>(
  value: Value | null,
  evidenceValue: FieldEvidence,
): FieldValue<Value> {
  return { value, evidence: evidenceValue };
}

function evidence(sourceId: string): FieldEvidence {
  return {
    status: "verified",
    citations: [{ sourceId }],
    lastChecked: checkedAt,
  };
}
```

**Use for:** All school field assignments after audit corrections.

---

## Pattern: Coverage calculation unit test

**Analog:** `src/features/evidence/calculateEvidenceCoverage/index.test.ts`

```typescript
expect(calculateEvidenceCoverage(validDirectoryOnlySchool)).toEqual({
  version: "v1",
  verified: 10,
  total: 23,
  percentage: 43,
});
```

**Use for:** v2 tests with level-aware denominators and updated expected percentages.

---

## Pattern: Directory item mapping

**Analog:** `src/features/schools/schoolDirectoryData/index.ts` → `toSchoolDirectoryItem`

Maps `School` → flat `SchoolDirectoryItem` with `*Status` suffix fields for UI/filtering.

**Extend with:** `coverageLevel`, `researchStatus`, `coverageTierLabel`.

---

## Pattern: SchoolCard Fact display

**Analog:** `src/features/schools/SchoolCard/index.tsx`

```tsx
<Fact
  label="Ganztag"
  value={school.ganztag ?? formatFieldStatus(school.ganztagStatus)}
  status={school.ganztagStatus}
/>
```

**Use for:** Conditional rendering — skip `Fact` when status is `missing` and value is null.

---

## Pattern: Colocated feature directory

**Analog:** `src/features/evidence/calculateEvidenceCoverage/`

```
calculateEvidenceCoverage/
├── index.ts
├── index.test.ts
└── types.ts
```

**Use for:** New `inferredFrom/` helper under lichtenberg builder path.

---

## PATTERN MAPPING COMPLETE
