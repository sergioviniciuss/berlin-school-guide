import {
  buildComparePageHref,
  COMPARE_PAGE_PARAM,
  COMPARE_PARAM,
  parseCompareSlugs,
} from ".";

describe("parseCompareSlugs", () => {
  it("returns an empty array for null input", () => {
    expect(parseCompareSlugs(null)).toEqual([]);
  });

  it("deduplicates slugs and caps at 4", () => {
    expect(parseCompareSlugs("a,b,a,c,d,e")).toEqual(["a", "b", "c", "d"]);
  });

  it("trims whitespace from slug segments", () => {
    expect(parseCompareSlugs(" slug-one , slug-two ")).toEqual([
      "slug-one",
      "slug-two",
    ]);
  });

  it("ignores empty segments", () => {
    expect(parseCompareSlugs("a,,b, ,c")).toEqual(["a", "b", "c"]);
  });
});

describe("buildComparePageHref", () => {
  it("returns /compare when fewer than 2 slugs are selected", () => {
    expect(buildComparePageHref([])).toBe("/compare");
    expect(buildComparePageHref(["a"])).toBe("/compare");
  });

  it("returns /compare?schools= when 2 or more slugs are selected", () => {
    expect(buildComparePageHref(["a", "b"])).toBe("/compare?schools=a,b");
    expect(buildComparePageHref(["a", "b", "c"])).toBe(
      "/compare?schools=a,b,c",
    );
  });
});

describe("compare param constants", () => {
  it("exports English query param names", () => {
    expect(COMPARE_PARAM).toBe("compare");
    expect(COMPARE_PAGE_PARAM).toBe("schools");
  });
});
