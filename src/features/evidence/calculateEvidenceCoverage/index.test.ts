import { calculateEvidenceCoverage } from ".";
import {
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validNotApplicableInspectionSchool,
} from "@/features/schools/school/fixtures";

describe("calculateEvidenceCoverage", () => {
  it("calculates V1 coverage for a directory-only school", () => {
    expect(calculateEvidenceCoverage(validDirectoryOnlySchool)).toEqual({
      version: "v1",
      verified: 10,
      total: 23,
      percentage: 43,
    });
  });

  it("calculates complete coverage for a detailed synthetic school", () => {
    expect(calculateEvidenceCoverage(validDetailedPublicSchool)).toEqual({
      version: "v1",
      verified: 23,
      total: 23,
      percentage: 100,
    });
  });

  it("excludes not-applicable fields from numerator and denominator", () => {
    expect(
      calculateEvidenceCoverage(validNotApplicableInspectionSchool),
    ).toEqual({
      version: "v1",
      verified: 22,
      total: 22,
      percentage: 100,
    });
  });
});
