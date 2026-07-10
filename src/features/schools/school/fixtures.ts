import type {
  FieldEvidence,
  FieldValue,
} from "@/features/evidence/fieldEvidence";
import {
  anecdotalSource,
  officialDirectorySource,
  schoolWebsiteSource,
} from "@/features/evidence/source/fixtures";
import type { School } from ".";

export const verifiedDirectoryEvidence: FieldEvidence = {
  status: "verified",
  citations: [{ sourceId: officialDirectorySource.id }],
  lastChecked: "2026-07-10",
};

export const verifiedWebsiteEvidence: FieldEvidence = {
  status: "verified",
  citations: [{ sourceId: schoolWebsiteSource.id }],
  lastChecked: "2026-07-10",
};

export const missingEvidence: FieldEvidence = {
  status: "missing",
  citations: [],
  note: "Synthetic fixture does not include this information.",
};

export const notApplicableEvidence: FieldEvidence = {
  status: "not_applicable",
  citations: [],
  note: "Synthetic fixture marks this field as not applicable.",
};

export function field<Value>(
  value: Value | null,
  evidence: FieldEvidence,
): FieldValue<Value> {
  return {
    value,
    evidence,
  };
}

export const validDirectoryOnlySchool: School = {
  id: "synthetic-directory-school",
  slug: "synthetic-directory-school",
  name: field("Synthetic Directory School", verifiedDirectoryEvidence),
  website: field(
    "https://example.test/synthetic-directory-school",
    verifiedDirectoryEvidence,
  ),
  classification: field("public", verifiedDirectoryEvidence),
  level: field("primary", verifiedDirectoryEvidence),
  location: {
    district: field("Mitte", verifiedDirectoryEvidence),
    neighbourhood: field("Moabit", verifiedDirectoryEvidence),
    address: field("Example Str. 1, 10557 Berlin", verifiedDirectoryEvidence),
  },
  gradesServed: field(
    ["1", "2", "3", "4", "5", "6"],
    verifiedDirectoryEvidence,
  ),
  ganztag: field(null, missingEvidence),
  afterSchoolCare: field(null, missingEvidence),
  languages: field(null, missingEvidence),
  bilingualPrograms: field(null, missingEvidence),
  internationalPrograms: field(null, missingEvidence),
  welcomeClasses: field(null, missingEvidence),
  schoolProfile: field(null, missingEvidence),
  pedagogyFocus: field(null, missingEvidence),
  inclusionSupport: field(null, missingEvidence),
  transitionAfterGrade6: field(null, missingEvidence),
  familyCommunication: field(null, missingEvidence),
  inspectionAvailability: field("not_confirmed", verifiedDirectoryEvidence),
  inspectionData: field(null, missingEvidence),
  facilities: field(null, missingEvidence),
  sources: [officialDirectorySource],
  research: {
    status: "directory_only",
    coverageLevel: "directory",
  },
};

export const validDetailedPublicSchool: School = {
  id: "synthetic-detailed-public-school",
  slug: "synthetic-detailed-public-school",
  name: field("Synthetic Detailed Public School", verifiedDirectoryEvidence),
  website: field(
    "https://example.test/synthetic-detailed-public-school",
    verifiedDirectoryEvidence,
  ),
  classification: field("public", verifiedDirectoryEvidence),
  level: field("primary", verifiedDirectoryEvidence),
  location: {
    district: field("Pankow", verifiedDirectoryEvidence),
    neighbourhood: field("Prenzlauer Berg", verifiedDirectoryEvidence),
    address: field("Example Allee 2, 10405 Berlin", verifiedDirectoryEvidence),
  },
  gradesServed: field(
    ["1", "2", "3", "4", "5", "6"],
    verifiedDirectoryEvidence,
  ),
  ganztag: field("Open all-day model", verifiedWebsiteEvidence),
  afterSchoolCare: field(
    "eFöB information is published by the school",
    verifiedWebsiteEvidence,
  ),
  languages: field(["German", "English"], verifiedWebsiteEvidence),
  bilingualPrograms: field(["English"], verifiedWebsiteEvidence),
  internationalPrograms: field(
    ["Synthetic international support"],
    verifiedWebsiteEvidence,
  ),
  welcomeClasses: field(true, verifiedWebsiteEvidence),
  schoolProfile: field(
    "Synthetic music and language profile",
    verifiedWebsiteEvidence,
  ),
  pedagogyFocus: field(["Music", "Languages"], verifiedWebsiteEvidence),
  inclusionSupport: field(
    "Synthetic inclusion support description",
    verifiedWebsiteEvidence,
  ),
  transitionAfterGrade6: field(
    "Synthetic transition guidance after grade 6",
    verifiedWebsiteEvidence,
  ),
  familyCommunication: field(
    "Synthetic parent communication description",
    verifiedWebsiteEvidence,
  ),
  inspectionAvailability: field("available", verifiedDirectoryEvidence),
  inspectionData: field(
    "Synthetic inspection source available",
    verifiedDirectoryEvidence,
  ),
  facilities: field(["Gym", "Library"], verifiedWebsiteEvidence),
  sources: [officialDirectorySource, schoolWebsiteSource],
  research: {
    status: "profile_ready",
    coverageLevel: "detailed",
    lastResearched: "2026-07-10",
    lastSourceChecked: "2026-07-10",
  },
};

export const validPrivateBilingualSchool: School = {
  ...validDetailedPublicSchool,
  id: "synthetic-private-bilingual-school",
  slug: "synthetic-private-bilingual-school",
  name: field("Synthetic Private Bilingual School", verifiedWebsiteEvidence),
  classification: field("private", verifiedWebsiteEvidence),
  bilingualPrograms: field(["Portuguese", "German"], verifiedWebsiteEvidence),
  internationalPrograms: field(
    ["International primary curriculum"],
    verifiedWebsiteEvidence,
  ),
};

export const validMixedLevelPrimarySchool: School = {
  ...validDetailedPublicSchool,
  id: "synthetic-mixed-level-school",
  slug: "synthetic-mixed-level-school",
  name: field("Synthetic Mixed-Level School", verifiedWebsiteEvidence),
  level: field("mixed_with_primary", verifiedWebsiteEvidence),
  primarySectionDescription: field(
    "Synthetic record represents only the primary-school section.",
    verifiedWebsiteEvidence,
  ),
};

export const validNotApplicableInspectionSchool: School = {
  ...validDetailedPublicSchool,
  id: "synthetic-not-applicable-inspection-school",
  slug: "synthetic-not-applicable-inspection-school",
  inspectionAvailability: field("unavailable", verifiedDirectoryEvidence),
  inspectionData: field(null, notApplicableEvidence),
};

export const invalidVerifiedWithoutCitation = {
  ...validDirectoryOnlySchool,
  name: field("Invalid School", {
    status: "verified",
    citations: [],
  }),
};

export const invalidUnknownSourceCitation = {
  ...validDirectoryOnlySchool,
  name: field("Invalid School", {
    status: "verified",
    citations: [{ sourceId: "unknown-source" }],
  }),
};

export const invalidAnecdotalVerifiedSource = {
  ...validDirectoryOnlySchool,
  sources: [anecdotalSource],
  name: field("Invalid School", {
    status: "verified",
    citations: [{ sourceId: anecdotalSource.id }],
  }),
};

export const invalidMixedLevelWithoutPrimaryDescription = {
  ...validDetailedPublicSchool,
  level: field("mixed_with_primary", verifiedWebsiteEvidence),
};
