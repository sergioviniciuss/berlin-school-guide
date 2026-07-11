import { schoolSchema } from "@/features/schools/school";
import { validDirectoryOnlySchool } from "@/features/schools/school/fixtures";

import { getRealSchools, getSchoolDirectoryItems } from ".";

describe("schoolDirectoryData", () => {
  it("parses real schools through the validated school schema", () => {
    expect(getRealSchools()).toHaveLength(10);
  });

  it("parses synthetic fixtures directly for shape regression", () => {
    expect(schoolSchema.parse(validDirectoryOnlySchool).id).toBe(
      "synthetic-directory-school",
    );
  });

  it("transforms schools into directory items with evidence coverage", () => {
    const items = getSchoolDirectoryItems();

    expect(items).toHaveLength(10);
    expect(items[0]).toMatchObject({
      id: "11g06",
      schoolNumber: "11G06",
      evidenceCoverage: {
        version: "v2",
      },
      coverageLevel: expect.stringMatching(/^(directory|detailed)$/),
      researchStatus: expect.any(String),
      coverageTierLabel: expect.stringMatching(
        /^(Pesquisa básica|Pesquisa detalhada)$/,
      ),
    });
  });
});
