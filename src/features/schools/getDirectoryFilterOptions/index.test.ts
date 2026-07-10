import { getDirectoryFilterOptions } from ".";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

describe("getDirectoryFilterOptions", () => {
  it("derives unique sorted filter options from directory items", () => {
    expect(getDirectoryFilterOptions(getSchoolDirectoryItems())).toMatchObject({
      districts: expect.arrayContaining(["Mitte", "Pankow", "Neukölln"]),
      neighbourhoods: expect.arrayContaining([
        "Moabit",
        "Prenzlauer Berg",
        "Britz",
      ]),
      languages: expect.arrayContaining(["German", "English"]),
      educationalFocus: expect.arrayContaining(["Languages", "Music"]),
    });
  });
});
