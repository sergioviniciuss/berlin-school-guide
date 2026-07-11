import type { FieldValue } from "@/features/evidence/fieldEvidence";
import type { School } from "@/features/schools/school";
import type {
  InspectionAvailability,
  SchoolClassification,
} from "@/features/schools/schoolClassification";
import {
  formatBoolean,
  formatClassification,
  formatFieldStatus,
  formatInspectionAvailability,
  formatStringList,
} from "@/features/schools/formatSchoolField";
import { StatusBadge } from "@/features/schools/StatusBadge";
import { ExternalLink } from "lucide-react";

type ProfileFieldRowProps = {
  label: string;
  fieldPath: string;
  field: FieldValue<unknown>;
  school: School;
};

export function ProfileFieldRow({
  label,
  fieldPath,
  field,
  school,
}: ProfileFieldRowProps) {
  const { evidence } = field;
  const valueText = formatProfileFieldValue(fieldPath, field);
  const sourceById = new Map(school.sources.map((source) => [source.id, source]));

  return (
    <div className="border-b border-neutral-100 py-4 last:border-0">
      <dt className="text-sm font-semibold text-neutral-950">{label}</dt>
      <dd className="mt-1 space-y-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-base text-neutral-900">{valueText}</span>
          <StatusBadge status={evidence.status} />
        </div>
        {shouldShowEvidenceNote(evidence.status) && evidence.note ? (
          <p className="text-sm text-neutral-600">{evidence.note}</p>
        ) : null}
        {evidence.status === "verified" && evidence.citations.length > 0 ? (
          <div className="text-sm flex flex-wrap gap-x-4 gap-y-1">
            {evidence.citations.map((citation) => {
              const source = sourceById.get(citation.sourceId);
              if (!source) {
                return null;
              }

              return (
                <span key={citation.sourceId} className="inline-flex gap-x-4">
                  <a
                    href={`#source-${citation.sourceId}`}
                    className="text-blue-700 hover:underline"
                  >
                    Ver fonte
                  </a>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-700 hover:underline"
                  >
                    Abrir original
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </span>
              );
            })}
          </div>
        ) : null}
      </dd>
    </div>
  );
}

function shouldShowEvidenceNote(status: FieldValue<unknown>["evidence"]["status"]) {
  return status === "not_confirmed" || status === "conflicting";
}

function formatProfileFieldValue(
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
