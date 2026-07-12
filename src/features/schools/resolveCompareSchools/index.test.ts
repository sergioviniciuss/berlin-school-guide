import { resolveCompareSchools } from ".";

describe("resolveCompareSchools", () => {
  it("returns valid schools and skipped slugs without throwing", () => {
    const result = resolveCompareSchools(["lew-tolstoi-schule", "fake"]);

    expect(result.schools).toHaveLength(1);
    expect(result.schools[0]?.slug).toBe("lew-tolstoi-schule");
    expect(result.skippedSlugs).toEqual(["fake"]);
  });

  it("preserves slug order from the input list", () => {
    const result = resolveCompareSchools([
      "adam-ries-schule",
      "unknown-slug",
      "lew-tolstoi-schule",
    ]);

    expect(result.schools.map((school) => school.slug)).toEqual([
      "adam-ries-schule",
      "lew-tolstoi-schule",
    ]);
    expect(result.skippedSlugs).toEqual(["unknown-slug"]);
  });

  it("returns empty arrays when no slugs are provided", () => {
    expect(resolveCompareSchools([])).toEqual({
      schools: [],
      skippedSlugs: [],
    });
  });

  it("skips all slugs when none are valid", () => {
    const result = resolveCompareSchools(["fake-one", "fake-two"]);

    expect(result.schools).toEqual([]);
    expect(result.skippedSlugs).toEqual(["fake-one", "fake-two"]);
  });
});
