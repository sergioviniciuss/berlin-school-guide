import {
  isAcceptableReliabilityLevel,
  reliabilityLevelSchema,
  sourceTypeSchema,
} from ".";

describe("sourceTypes", () => {
  it("accepts the canonical V1 source types", () => {
    expect(sourceTypeSchema.parse("official_government")).toBe(
      "official_government",
    );
    expect(sourceTypeSchema.parse("official_inspection")).toBe(
      "official_inspection",
    );
    expect(sourceTypeSchema.parse("school_website")).toBe("school_website");
    expect(sourceTypeSchema.parse("public_dataset")).toBe("public_dataset");
    expect(sourceTypeSchema.parse("anecdotal_reserved")).toBe(
      "anecdotal_reserved",
    );
  });

  it("marks only primary and secondary reliability as acceptable for V1 verification", () => {
    expect(
      isAcceptableReliabilityLevel(reliabilityLevelSchema.parse("primary")),
    ).toBe(true);
    expect(
      isAcceptableReliabilityLevel(reliabilityLevelSchema.parse("secondary")),
    ).toBe(true);
    expect(
      isAcceptableReliabilityLevel(reliabilityLevelSchema.parse("anecdotal")),
    ).toBe(false);
    expect(
      isAcceptableReliabilityLevel(reliabilityLevelSchema.parse("unknown")),
    ).toBe(false);
  });
});
