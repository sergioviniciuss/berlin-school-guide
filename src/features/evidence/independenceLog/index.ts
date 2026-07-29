import { z } from "zod";

export const independenceLogSchema = z.object({
  venue: z.string().min(1),
  identifier: z.string().min(1),
  dateAccessed: z.string().date(),
  independenceRationale: z.string().min(1),
  echoCheckNote: z.string().min(1),
});

export type IndependenceLog = z.infer<typeof independenceLogSchema>;
