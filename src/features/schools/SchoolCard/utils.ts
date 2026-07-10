import type { FieldStatus } from "@/features/evidence/fieldEvidence";

export function getStatusTone(status: FieldStatus) {
  return status === "verified" ? "text-neutral-900" : "text-neutral-600";
}
