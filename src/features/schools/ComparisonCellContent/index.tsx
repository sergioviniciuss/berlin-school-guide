import { ComparisonEvidenceNote } from "@/features/schools/ComparisonEvidenceNote";
import { getComparisonCellDisplay } from "@/features/schools/comparisonCellDisplay";
import { StatusBadge } from "@/features/schools/StatusBadge";
import type { School } from "@/features/schools/school";

type ComparisonCellContentProps = {
  school: School;
  fieldPath: string;
};

export function ComparisonCellContent({
  school,
  fieldPath,
}: ComparisonCellContentProps) {
  const { valueText, status, evidenceNote } = getComparisonCellDisplay(
    school,
    fieldPath,
  );

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-neutral-900">{valueText}</span>
        <StatusBadge status={status} />
      </div>
      {evidenceNote ? <ComparisonEvidenceNote note={evidenceNote} /> : null}
    </div>
  );
}
