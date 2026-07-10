import { z } from "zod";

export const fieldStatusSchema = z.enum([
  "verified",
  "missing",
  "unverified",
  "outdated",
  "conflicting",
  "not_applicable",
]);

export const fieldCitationSchema = z.object({
  sourceId: z.string().min(1),
  quote: z.string().optional(),
  note: z.string().optional(),
});

export const fieldEvidenceSchema = z
  .object({
    status: fieldStatusSchema,
    citations: z.array(fieldCitationSchema).default([]),
    note: z.string().optional(),
    lastChecked: z.string().date().optional(),
  })
  .superRefine((evidence, context) => {
    if (evidence.status === "conflicting" && !evidence.note) {
      context.addIssue({
        code: "custom",
        path: ["note"],
        message: "Conflicting fields must explain the material conflict.",
      });
    }
  });

export function createFieldValueSchema<ValueSchema extends z.ZodType>(
  valueSchema: ValueSchema,
) {
  return z.object({
    value: valueSchema.nullable(),
    evidence: fieldEvidenceSchema,
  });
}

export type FieldStatus = z.infer<typeof fieldStatusSchema>;
export type FieldCitation = z.infer<typeof fieldCitationSchema>;
export type FieldEvidence = z.infer<typeof fieldEvidenceSchema>;
export type FieldValue<Value> = {
  value: Value | null;
  evidence: FieldEvidence;
};
