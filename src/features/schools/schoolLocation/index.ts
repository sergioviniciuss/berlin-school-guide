import { z } from "zod";

import { createFieldValueSchema } from "@/features/evidence/fieldEvidence";

export const schoolLocationSchema = z.object({
  district: createFieldValueSchema(z.string().min(1)),
  neighbourhood: createFieldValueSchema(z.string().min(1)),
  address: createFieldValueSchema(z.string().min(1)),
});

export type SchoolLocation = z.infer<typeof schoolLocationSchema>;
