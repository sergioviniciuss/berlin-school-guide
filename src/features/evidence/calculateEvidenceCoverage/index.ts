import type { FieldValue } from "@/features/evidence/fieldEvidence";
import type { School } from "@/features/schools/school";
import {
  evidenceCoverageVersion,
  getImportantFieldPathsForCoverage,
} from "@/features/schools/school/constants";
import type { EvidenceCoverage } from "./types";

export function calculateEvidenceCoverage(school: School): EvidenceCoverage {
  const fieldPaths = getImportantFieldPathsForCoverage(
    school.research.coverageLevel,
  );

  const countableFields = fieldPaths
    .map((path) => getFieldValue(school, path))
    .filter((field): field is FieldValue<unknown> => Boolean(field))
    .filter((field) => field.evidence.status !== "not_applicable");

  const verified = countableFields.filter(
    (field) => field.evidence.status === "verified",
  ).length;
  const total = countableFields.length;

  return {
    version: evidenceCoverageVersion,
    verified,
    total,
    percentage: total === 0 ? 0 : Math.round((verified / total) * 100),
  };
}

function getFieldValue(
  school: School,
  path: string,
): FieldValue<unknown> | undefined {
  const value = path.split(".").reduce<unknown>((current, segment) => {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, school);

  if (isFieldValue(value)) {
    return value;
  }

  return undefined;
}

function isFieldValue(input: unknown): input is FieldValue<unknown> {
  return (
    typeof input === "object" &&
    input !== null &&
    "value" in input &&
    "evidence" in input
  );
}
