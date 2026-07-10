import {
  getRealSchools,
  getSchoolDirectoryItems,
  getSyntheticSchools,
} from ".";

describe("schoolDirectoryData", () => {
  it("parses synthetic schools through the validated school schema", () => {
    expect(getSyntheticSchools()).toHaveLength(7);
  });

  it("parses real schools through the validated school schema", () => {
    expect(getRealSchools()).toHaveLength(10);
  });

  it("transforms schools into directory items with evidence coverage", () => {
    const items = getSchoolDirectoryItems();

    expect(items).toHaveLength(10);
    expect(items[0]).toMatchObject({
      id: "11g06",
      schoolNumber: "11G06",
      evidenceCoverage: {
        version: "v1",
      },
    });
  });
});
