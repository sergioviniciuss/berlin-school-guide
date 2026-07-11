import type { FieldStatus } from "@/features/evidence/fieldEvidence";

export function getStatusTone(status: FieldStatus) {
  return status === "verified" ? "text-neutral-900" : "text-neutral-600";
}

export function shouldRenderFact(value: unknown, status: FieldStatus) {
  if (status === "missing" && value === null) {
    return false;
  }

  if (status === "not_confirmed" && value !== null) {
    return true;
  }

  return value !== null && status !== "missing";
}
