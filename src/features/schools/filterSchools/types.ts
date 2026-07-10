import type { EvidenceCoverage } from "@/features/evidence/calculateEvidenceCoverage/types";
import type { FieldStatus } from "@/features/evidence/fieldEvidence";
import type {
  InspectionAvailability,
  SchoolClassification,
} from "@/features/schools/schoolClassification";

export type BinaryFilterValue = "yes" | "no" | "missing_or_unconfirmed";
export type StatusFilterValue = "verified" | "missing_or_unconfirmed";
export type CoverageFilterValue = "0-49" | "50-79" | "80-100";

export type DirectoryFilterState = {
  query: string;
  districts: string[];
  neighbourhoods: string[];
  classifications: SchoolClassification[];
  ganztag: StatusFilterValue[];
  bilingual: BinaryFilterValue[];
  welcomeClasses: BinaryFilterValue[];
  languages: string[];
  educationalFocus: string[];
  afterSchoolCare: StatusFilterValue[];
  inspectionAvailability: InspectionAvailability[];
  evidenceCoverage: CoverageFilterValue[];
};

export type SchoolDirectoryItem = {
  id: string;
  slug: string;
  name: string;
  classification: SchoolClassification | null;
  classificationStatus: FieldStatus;
  district: string | null;
  districtStatus: FieldStatus;
  neighbourhood: string | null;
  neighbourhoodStatus: FieldStatus;
  ganztag: string | null;
  ganztagStatus: FieldStatus;
  bilingualPrograms: string[] | null;
  bilingualStatus: FieldStatus;
  welcomeClasses: boolean | null;
  welcomeClassesStatus: FieldStatus;
  languages: string[] | null;
  languagesStatus: FieldStatus;
  educationalFocus: string[] | null;
  educationalFocusStatus: FieldStatus;
  afterSchoolCare: string | null;
  afterSchoolCareStatus: FieldStatus;
  inspectionAvailability: InspectionAvailability | null;
  inspectionAvailabilityStatus: FieldStatus;
  evidenceCoverage: EvidenceCoverage;
};
