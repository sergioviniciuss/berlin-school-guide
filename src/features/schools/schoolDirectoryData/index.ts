import { calculateEvidenceCoverage } from "@/features/evidence/calculateEvidenceCoverage";
import type { School } from "@/features/schools/school";
import { schoolSchema } from "@/features/schools/school";
import { getCoverageTierLabel } from "@/features/schools/getCoverageTierLabel";
import { realLichtenbergPrimarySchools } from "@/content/schools/real/lichtenbergPrimarySchools";
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";

export function getRealSchools() {
  return realLichtenbergPrimarySchools.map((school) =>
    schoolSchema.parse(school),
  );
}

export function getSchoolDirectoryItems(): SchoolDirectoryItem[] {
  return getRealSchools().map(toSchoolDirectoryItem);
}

export function toSchoolDirectoryItem(school: School): SchoolDirectoryItem {
  // Dev-only: empty name indicates a data integrity issue in real school records.
  return {
    id: school.id,
    slug: school.slug,
    name: school.name.value ?? "",
    schoolNumber: school.schoolNumber.value,
    schoolNumberStatus: school.schoolNumber.evidence.status,
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
    coverageLevel: school.research.coverageLevel,
    researchStatus: school.research.status,
    coverageTierLabel: getCoverageTierLabel(school.research.coverageLevel),
  };
}
