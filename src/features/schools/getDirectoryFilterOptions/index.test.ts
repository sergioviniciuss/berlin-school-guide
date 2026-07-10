import { getDirectoryFilterOptions } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

describe("getDirectoryFilterOptions", () => {
  it("derives unique sorted filter options from directory items", () => {
    expect(getDirectoryFilterOptions(getSchoolDirectoryItems())).toEqual(
      expect.objectContaining({
        districts: ["Lichtenberg"],
        neighbourhoods: expect.arrayContaining([
          "Friedrichsfelde",
          "Karlshorst",
        ]),
        languages: expect.arrayContaining(["Deutsch", "Englisch", "Russisch"]),
        educationalFocus: expect.arrayContaining([
          "Musikbetonung",
          "Deutsch-Russisch",
        ]),
      }),
    );
  });
});
