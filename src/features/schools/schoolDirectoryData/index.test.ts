import { getSchoolDirectoryItems, getSyntheticSchools } from ".";

describe("schoolDirectoryData", () => {
  it("parses synthetic schools through the validated school schema", () => {
    expect(getSyntheticSchools()).toHaveLength(7);
  });

  it("transforms schools into directory items with evidence coverage", () => {
    const items = getSchoolDirectoryItems();

    expect(items).toHaveLength(7);
    expect(items[0]).toMatchObject({
      id: "synthetic-directory-school",
      evidenceCoverage: {
        version: "v1",
      },
    });
  });
});
