export const evidenceCoverageVersion = "v1" as const;

export const importantSchoolFieldPathsV1 = [
  "name",
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

export type ImportantSchoolFieldPathV1 =
  (typeof importantSchoolFieldPathsV1)[number];
