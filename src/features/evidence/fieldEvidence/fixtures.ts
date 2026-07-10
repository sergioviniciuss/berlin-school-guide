import type { FieldEvidence, FieldValue } from ".";

export const verifiedEvidence: FieldEvidence = {
  status: "verified",
  citations: [{ sourceId: "berlin-directory" }],
  lastChecked: "2026-07-10",
};

export const missingEvidence: FieldEvidence = {
  status: "missing",
  citations: [],
  note: "Synthetic fixture did not find this information.",
};

export const notApplicableEvidence: FieldEvidence = {
  status: "not_applicable",
  citations: [],
  note: "Synthetic fixture marks this field as not applicable.",
};

export const verifiedStringField: FieldValue<string> = {
  value: "Synthetic value",
  evidence: verifiedEvidence,
};
