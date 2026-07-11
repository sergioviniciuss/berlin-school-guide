import type { FieldStatus } from "@/features/evidence/fieldEvidence";
import { formatFieldStatus } from "@/features/schools/formatSchoolField";

const statusBadgeClasses: Record<FieldStatus, string> = {
  verified: "bg-neutral-100 text-neutral-800",
  missing: "bg-neutral-100 text-neutral-600",
  unverified: "bg-neutral-100 text-neutral-600",
  outdated: "bg-neutral-100 text-neutral-600",
  not_confirmed: "bg-amber-50 text-amber-900",
  conflicting: "bg-red-50 text-red-800",
  not_applicable: "bg-neutral-50 text-neutral-500",
};

type StatusBadgeProps = {
  status: FieldStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-sm font-semibold ${statusBadgeClasses[status]}`}
    >
      {formatFieldStatus(status)}
    </span>
  );
}
