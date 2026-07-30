import {
  formatTagCategory,
  formatTagId,
  getTagCategory,
  schoolTagSchema,
  TAG_CATEGORY_ORDER,
  tagConfidenceSchema,
  tagTaxonomyIdSchema,
} from ".";

const taxonomyIds = [
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
] as const;

describe("tagTaxonomyIdSchema", () => {
  it("accepts all 10 closed taxonomy IDs", () => {
    for (const id of taxonomyIds) {
      expect(tagTaxonomyIdSchema.parse(id)).toBe(id);
    }
  });

  it('rejects unknown ID "best-school"', () => {
    expect(tagTaxonomyIdSchema.safeParse("best-school").success).toBe(false);
  });
});

describe("tagConfidenceSchema", () => {
  it("accepts confirmed_multi_source, confirmed_official, and partial", () => {
    expect(tagConfidenceSchema.parse("confirmed_multi_source")).toBe(
      "confirmed_multi_source",
    );
    expect(tagConfidenceSchema.parse("confirmed_official")).toBe(
      "confirmed_official",
    );
    expect(tagConfidenceSchema.parse("partial")).toBe("partial");
  });

  it("rejects high, medium, and low quality-rating vocabulary", () => {
    expect(tagConfidenceSchema.safeParse("high").success).toBe(false);
    expect(tagConfidenceSchema.safeParse("medium").success).toBe(false);
    expect(tagConfidenceSchema.safeParse("low").success).toBe(false);
  });
});

describe("schoolTagSchema", () => {
  it("requires id, confidence, and at least one citation", () => {
    expect(
      schoolTagSchema.parse({
        id: "stem-focus",
        confidence: "confirmed_official",
        citations: [{ sourceId: "src-1" }],
      }),
    ).toEqual({
      id: "stem-focus",
      confidence: "confirmed_official",
      citations: [{ sourceId: "src-1" }],
    });
  });

  it("rejects empty citations", () => {
    expect(
      schoolTagSchema.safeParse({
        id: "stem-focus",
        confidence: "partial",
        citations: [],
      }).success,
    ).toBe(false);
  });
});

describe("formatTagId", () => {
  it("returns non-empty PT-BR labels for every taxonomy id", () => {
    for (const id of taxonomyIds) {
      const label = formatTagId(id);
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it('maps active-school-community to "Comunidade escolar ativa"', () => {
    expect(formatTagId("active-school-community")).toBe(
      "Comunidade escolar ativa",
    );
  });
});

describe("tag categories", () => {
  it("maps all 10 taxonomy ids to the four locked categories", () => {
    expect(getTagCategory("stem-focus")).toBe("academic_focus");
    expect(getTagCategory("languages-focus")).toBe("academic_focus");
    expect(getTagCategory("arts-music-focus")).toBe("academic_focus");
    expect(getTagCategory("bilingual-program")).toBe("learning_model");
    expect(getTagCategory("special-pedagogical-model")).toBe("learning_model");
    expect(getTagCategory("all-day-model")).toBe("learning_model");
    expect(getTagCategory("inclusion-support")).toBe("student_support");
    expect(getTagCategory("transition-support")).toBe("student_support");
    expect(getTagCategory("structured-learning-environment")).toBe(
      "school_environment",
    );
    expect(getTagCategory("active-school-community")).toBe("school_environment");
  });

  it("formats category labels in PT-BR", () => {
    expect(formatTagCategory("academic_focus")).toBe("Foco acadêmico");
    expect(formatTagCategory("learning_model")).toBe("Modelo de aprendizagem");
    expect(formatTagCategory("student_support")).toBe("Apoio ao aluno");
    expect(formatTagCategory("school_environment")).toBe("Ambiente escolar");
  });

  it("orders categories academic → learning → support → environment", () => {
    expect(TAG_CATEGORY_ORDER).toEqual([
      "academic_focus",
      "learning_model",
      "student_support",
      "school_environment",
    ]);
  });
});
