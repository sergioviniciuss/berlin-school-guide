import {
  inspectionAvailabilitySchema,
  schoolClassificationSchema,
  schoolLevelSchema,
} from ".";

describe("schoolClassification", () => {
  it("keeps public/private as classification values", () => {
    expect(schoolClassificationSchema.parse("public")).toBe("public");
    expect(schoolClassificationSchema.parse("private")).toBe("private");
  });

  it("represents primary and mixed-level schools with primary sections", () => {
    expect(schoolLevelSchema.parse("primary")).toBe("primary");
    expect(schoolLevelSchema.parse("mixed_with_primary")).toBe(
      "mixed_with_primary",
    );
  });

  it("models inspection availability without implying quality", () => {
    expect(inspectionAvailabilitySchema.parse("available")).toBe("available");
    expect(inspectionAvailabilitySchema.parse("unavailable")).toBe(
      "unavailable",
    );
    expect(inspectionAvailabilitySchema.parse("not_confirmed")).toBe(
      "not_confirmed",
    );
  });
});
