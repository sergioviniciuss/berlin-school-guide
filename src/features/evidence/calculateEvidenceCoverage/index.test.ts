import { calculateEvidenceCoverage } from ".";
import {
  field,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validNotApplicableInspectionSchool,
} from "@/features/schools/school/fixtures";

describe("calculateEvidenceCoverage", () => {
  it("calculates v2 coverage for a directory-only school", () => {
    expect(calculateEvidenceCoverage(validDirectoryOnlySchool)).toEqual({
      version: "v2",
      verified: 9,
      total: 11,
      percentage: 82,
    });
  });

  it("calculates complete coverage for a detailed synthetic school", () => {
    expect(calculateEvidenceCoverage(validDetailedPublicSchool)).toEqual({
      version: "v2",
      verified: 23,
      total: 23,
      percentage: 100,
    });
  });

  it("excludes not-applicable fields from numerator and denominator", () => {
    expect(
      calculateEvidenceCoverage(validNotApplicableInspectionSchool),
    ).toEqual({
      version: "v2",
      verified: 22,
      total: 22,
      percentage: 100,
    });
  });

  it("does not count not_confirmed fields in the verified numerator", () => {
    const schoolWithInferredField = {
      ...validDirectoryOnlySchool,
      ganztag: field("Open all-day model", {
        status: "not_confirmed",
        citations: [{ sourceId: "official-directory" }],
        note: "Valor inferido a partir de outro campo; não confirmado independentemente.",
        lastChecked: "2026-07-10",
      }),
    };

    const coverage = calculateEvidenceCoverage(schoolWithInferredField);

    expect(coverage.verified).toBe(9);
    expect(coverage.total).toBe(11);
  });

  it("uses a smaller denominator for directory schools than detailed schools", () => {
    const directoryCoverage = calculateEvidenceCoverage(validDirectoryOnlySchool);
    const detailedCoverage = calculateEvidenceCoverage(validDetailedPublicSchool);

    expect(directoryCoverage.total).toBe(11);
    expect(detailedCoverage.total).toBe(23);
    expect(directoryCoverage.total).toBeLessThan(detailedCoverage.total);
  });
});
