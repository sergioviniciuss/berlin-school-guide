import { researchMetadataSchema } from ".";

describe("researchMetadataSchema", () => {
  it("accepts directory-only metadata without detailed dates", () => {
    expect(
      researchMetadataSchema.parse({
        status: "directory_only",
        coverageLevel: "directory",
      }),
    ).toEqual({
      status: "directory_only",
      coverageLevel: "directory",
    });
  });

  it("requires dates for detailed records", () => {
    expect(() =>
      researchMetadataSchema.parse({
        status: "profile_ready",
        coverageLevel: "detailed",
      }),
    ).toThrow();
  });
});
