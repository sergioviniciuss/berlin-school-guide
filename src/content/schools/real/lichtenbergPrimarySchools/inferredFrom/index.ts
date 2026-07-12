import type { FieldEvidence } from "@/features/evidence/fieldEvidence";

import type { InferredFromInput } from "./types";

export type { InferredFromInput } from "./types";

export function inferredFrom(input: InferredFromInput): FieldEvidence {
  if (!input.note.trim()) {
    throw new Error("inferredFrom requires a non-empty note.");
  }

  return {
    status: "not_confirmed",
    citations: input.sourceEvidence.citations,
    note: input.note,
    lastChecked: input.sourceEvidence.lastChecked,
  };
}
