import {
  MAX_COMPARE_SCHOOLS,
  readStoredCompareSlugs,
  toggleCompareSlug,
  writeStoredCompareSlugs,
} from ".";

describe("toggleCompareSlug", () => {
  it("adds a slug when not selected and under max", () => {
    expect(toggleCompareSlug(["a"], "b")).toEqual(["a", "b"]);
  });

  it("removes a slug when already selected", () => {
    expect(toggleCompareSlug(["a", "b"], "a")).toEqual(["b"]);
  });

  it("does not add beyond max compare schools", () => {
    expect(toggleCompareSlug(["a", "b", "c"], "d")).toEqual(["a", "b", "c"]);
  });

  it("exports max compare schools as 3", () => {
    expect(MAX_COMPARE_SCHOOLS).toBe(3);
  });
});

describe("sessionStorage mirror", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("round-trips ordered slug lists", () => {
    writeStoredCompareSlugs(["lew-tolstoi-schule", "adam-ries-schule"]);
    expect(readStoredCompareSlugs()).toEqual([
      "lew-tolstoi-schule",
      "adam-ries-schule",
    ]);
  });

  it("clears storage when selection is empty", () => {
    writeStoredCompareSlugs(["a"]);
    writeStoredCompareSlugs([]);
    expect(readStoredCompareSlugs()).toEqual([]);
  });
});
