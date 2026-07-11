import type { FieldStatus } from "@/features/evidence/fieldEvidence";
import { formatProfileFieldValue } from "@/features/schools/formatProfileFieldValue";
import { getSchoolFieldByPath } from "@/features/schools/getSchoolFieldByPath";
import type { School } from "@/features/schools/school";

export type ComparisonCellDisplay = {
  valueText: string;
  status: FieldStatus;
  evidenceNote?: string;
};

export function getComparisonCellDisplay(
  school: School,
  fieldPath: string,
): ComparisonCellDisplay {
  const field = getSchoolFieldByPath(school, fieldPath);

  if (!field) {
    return { valueText: "—", status: "missing" };
  }

  const { evidence } = field;

  return {
    valueText: formatProfileFieldValue(fieldPath, field),
    status: evidence.status,
    evidenceNote: shouldShowComparisonEvidenceNote(evidence.status)
      ? evidence.note
      : undefined,
  };
}

export function shouldShowComparisonEvidenceNote(status: FieldStatus): boolean {
  return status === "not_confirmed" || status === "conflicting";
}
