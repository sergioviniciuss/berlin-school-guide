import { getAllSchoolSlugs, getSchoolBySlug } from ".";

describe("getSchoolBySlug", () => {
  it('returns a school with matching slug for "lew-tolstoi-schule"', () => {
    const school = getSchoolBySlug("lew-tolstoi-schule");

    expect(school).toBeDefined();
    expect(school?.slug).toBe("lew-tolstoi-schule");
  });

  it('returns undefined for "unknown-slug"', () => {
    expect(getSchoolBySlug("unknown-slug")).toBeUndefined();
  });

  it("returns all 10 real school slugs", () => {
    expect(getAllSchoolSlugs()).toHaveLength(10);
  });
});
