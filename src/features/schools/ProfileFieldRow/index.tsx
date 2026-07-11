import type { FieldValue } from "@/features/evidence/fieldEvidence";
import type { School } from "@/features/schools/school";
import { formatProfileFieldValue } from "@/features/schools/formatProfileFieldValue";
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
