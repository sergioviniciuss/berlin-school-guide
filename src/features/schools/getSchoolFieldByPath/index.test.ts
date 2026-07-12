import { getSchoolFieldByPath } from ".";
import { validDirectoryOnlySchool } from "@/features/schools/school/fixtures";

describe("getSchoolFieldByPath", () => {
  it("returns a nested field value with evidence for location.district", () => {
    const field = getSchoolFieldByPath(
      validDirectoryOnlySchool,
      "location.district",
    );

    expect(field).toBeDefined();
    expect(field?.value).toBe("Mitte");
    expect(field?.evidence.status).toBe("verified");
  });

  it("returns a top-level field value for name", () => {
    const field = getSchoolFieldByPath(validDirectoryOnlySchool, "name");

    expect(field).toBeDefined();
    expect(field?.value).toBe("Synthetic Directory School");
    expect(field?.evidence).toBeDefined();
  });

  it("returns undefined for a nonexistent path", () => {
    expect(
      getSchoolFieldByPath(validDirectoryOnlySchool, "nonexistent.path"),
    ).toBeUndefined();
  });
});
