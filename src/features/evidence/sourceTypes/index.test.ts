import {
  isAcceptableFactualEvidence,
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
    expect(sourceTypeSchema.parse("journalism")).toBe("journalism");
    expect(sourceTypeSchema.parse("triangulated_community")).toBe(
      "triangulated_community",
    );
    expect(sourceTypeSchema.parse("anecdotal_reserved")).toBe(
      "anecdotal_reserved",
    );
  });

  it("rejects triangulated_community as a reliability level", () => {
    expect(
      reliabilityLevelSchema.safeParse("triangulated_community").success,
    ).toBe(false);
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

  it("accepts journalism with secondary reliability as factual evidence", () => {
    expect(
      isAcceptableFactualEvidence({
        type: "journalism",
        reliability: "secondary",
      }),
    ).toBe(true);
  });

  it("rejects triangulated_community even with secondary reliability", () => {
    expect(
      isAcceptableFactualEvidence({
        type: "triangulated_community",
        reliability: "secondary",
      }),
    ).toBe(false);
  });

  it("rejects anecdotal_reserved even with primary reliability", () => {
    expect(
      isAcceptableFactualEvidence({
        type: "anecdotal_reserved",
        reliability: "primary",
      }),
    ).toBe(false);
  });

  it("accepts official_government with primary reliability as factual evidence", () => {
    expect(
      isAcceptableFactualEvidence({
        type: "official_government",
        reliability: "primary",
      }),
    ).toBe(true);
  });
});
