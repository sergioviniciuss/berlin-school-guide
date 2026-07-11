export const evidenceCoverageVersion = "v2" as const;

export const importantSchoolFieldPathsDetailedV2 = [
  "name",
  "schoolNumber",
  "website",
  "classification",
  "level",
  "location.district",
  "location.neighbourhood",
  "location.address",
  "gradesServed",
  "ganztag",
  "afterSchoolCare",
  "languages",
  "bilingualPrograms",
  "internationalPrograms",
  "welcomeClasses",
  "schoolProfile",
  "pedagogyFocus",
  "inclusionSupport",
  "transitionAfterGrade6",
  "familyCommunication",
  "inspectionAvailability",
  "inspectionData",
  "facilities",
] as const;

/** @deprecated Use importantSchoolFieldPathsDetailedV2 */
export const importantSchoolFieldPathsV1 = importantSchoolFieldPathsDetailedV2;

export const importantSchoolFieldPathsDirectoryV2 = [
  "name",
  "schoolNumber",
  "website",
  "classification",
  "level",
  "location.district",
  "location.neighbourhood",
  "location.address",
  "gradesServed",
  "ganztag",
  "languages",
] as const;

export type ImportantSchoolFieldPathDetailedV2 =
  (typeof importantSchoolFieldPathsDetailedV2)[number];

export type ImportantSchoolFieldPathDirectoryV2 =
  (typeof importantSchoolFieldPathsDirectoryV2)[number];

/** @deprecated Use ImportantSchoolFieldPathDetailedV2 */
export type ImportantSchoolFieldPathV1 = ImportantSchoolFieldPathDetailedV2;

export function getImportantFieldPathsForCoverage(
  coverageLevel: "directory" | "detailed",
): readonly ImportantSchoolFieldPathDetailedV2[] {
  return coverageLevel === "directory"
    ? importantSchoolFieldPathsDirectoryV2
    : importantSchoolFieldPathsDetailedV2;
}
