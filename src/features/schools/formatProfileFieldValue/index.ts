import type { FieldValue } from "@/features/evidence/fieldEvidence";
import {
  formatBoolean,
  formatClassification,
  formatFieldStatus,
  formatInspectionAvailability,
  formatStringList,
} from "@/features/schools/formatSchoolField";
import type {
  InspectionAvailability,
  SchoolClassification,
} from "@/features/schools/schoolClassification";

export function formatProfileFieldValue(
  fieldPath: string,
  field: FieldValue<unknown>,
): string {
  const { value, evidence } = field;
  const { status } = evidence;

  if (status === "not_applicable") {
    return "Não se aplica";
  }

  if (status === "missing" || status === "unverified" || status === "outdated") {
    return formatFieldStatus(status);
  }

  if (status === "not_confirmed" || status === "conflicting") {
    return formatValueForPath(fieldPath, value, status);
  }

  return formatValueForPath(fieldPath, value, status);
}

function formatValueForPath(
  fieldPath: string,
  value: unknown,
  status: FieldValue<unknown>["evidence"]["status"],
): string {
  switch (fieldPath) {
    case "classification":
      return formatClassification(value as SchoolClassification | null);
    case "welcomeClasses":
      return formatBoolean(value as boolean | null, status);
    case "inspectionAvailability":
      return formatInspectionAvailability(
        value as InspectionAvailability | null,
        status,
      );
    case "gradesServed":
    case "languages":
    case "bilingualPrograms":
    case "internationalPrograms":
    case "pedagogyFocus":
    case "facilities":
      return formatStringList(value as string[] | null, status);
    default:
      if (typeof value === "string" && value.length > 0) {
        return value;
      }

      if (value === null || value === undefined) {
        return formatFieldStatus(status);
      }

      return String(value);
  }
}
