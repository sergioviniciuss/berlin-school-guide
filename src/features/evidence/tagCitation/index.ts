import { z } from "zod";

import { independenceLogSchema } from "@/features/evidence/independenceLog";

export const tagCitationSchema = z.object({
  sourceId: z.string().min(1),
  quote: z.string().optional(),
  note: z.string().optional(),
  independenceLog: independenceLogSchema.optional(),
});

export type TagCitation = z.infer<typeof tagCitationSchema>;
