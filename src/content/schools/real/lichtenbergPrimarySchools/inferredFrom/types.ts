import type { FieldEvidence } from "@/features/evidence/fieldEvidence";

export type InferredFromInput = {
  sourceField: "ganztag" | "offers" | "schoolProfile";
  sourceEvidence: FieldEvidence;
  note: string;
};
