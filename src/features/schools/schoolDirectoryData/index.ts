import { calculateEvidenceCoverage } from "@/features/evidence/calculateEvidenceCoverage";
import type { School } from "@/features/schools/school";
import { schoolSchema } from "@/features/schools/school";
import {
  validConflictingDataSchool,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validMissingDataSchool,
  validMixedLevelPrimarySchool,
  validNotApplicableInspectionSchool,
  validPrivateBilingualSchool,
} from "@/features/schools/school/fixtures";
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";

const syntheticSchoolFixtures = [
  validDirectoryOnlySchool,
  validDetailedPublicSchool,
  validPrivateBilingualSchool,
  validMixedLevelPrimarySchool,
  validMissingDataSchool,
  validConflictingDataSchool,
  validNotApplicableInspectionSchool,
] satisfies School[];

export function getSyntheticSchools() {
  return syntheticSchoolFixtures.map((school) => schoolSchema.parse(school));
}

export function getSchoolDirectoryItems(): SchoolDirectoryItem[] {
  return getSyntheticSchools().map(toSchoolDirectoryItem);
}

export function toSchoolDirectoryItem(school: School): SchoolDirectoryItem {
  return {
    id: school.id,
    slug: school.slug,
    name: school.name.value ?? "Escola sintética sem nome",
    classification: school.classification.value,
    classificationStatus: school.classification.evidence.status,
    district: school.location.district.value,
    districtStatus: school.location.district.evidence.status,
    neighbourhood: school.location.neighbourhood.value,
    neighbourhoodStatus: school.location.neighbourhood.evidence.status,
    ganztag: school.ganztag.value,
    ganztagStatus: school.ganztag.evidence.status,
    bilingualPrograms: school.bilingualPrograms.value,
    bilingualStatus: school.bilingualPrograms.evidence.status,
    welcomeClasses: school.welcomeClasses.value,
    welcomeClassesStatus: school.welcomeClasses.evidence.status,
    languages: school.languages.value,
    languagesStatus: school.languages.evidence.status,
    educationalFocus: school.pedagogyFocus.value,
    educationalFocusStatus: school.pedagogyFocus.evidence.status,
    afterSchoolCare: school.afterSchoolCare.value,
    afterSchoolCareStatus: school.afterSchoolCare.evidence.status,
    inspectionAvailability: school.inspectionAvailability.value,
    inspectionAvailabilityStatus: school.inspectionAvailability.evidence.status,
    evidenceCoverage: calculateEvidenceCoverage(school),
  };
}
