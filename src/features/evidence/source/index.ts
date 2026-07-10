import { z } from "zod";

import {
  reliabilityLevelSchema,
  sourceTypeSchema,
} from "@/features/evidence/sourceTypes";

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  type: sourceTypeSchema,
  reliability: reliabilityLevelSchema,
  publisher: z.string().min(1),
  dateAccessed: z.string().date(),
  datePublished: z.string().date().optional(),
  notes: z.string().optional(),
});

export type Source = z.infer<typeof sourceSchema>;
