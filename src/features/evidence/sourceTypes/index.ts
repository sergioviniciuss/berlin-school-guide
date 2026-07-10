import { z } from "zod";

export const sourceTypeSchema = z.enum([
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
  "anecdotal_reserved",
]);

export const reliabilityLevelSchema = z.enum([
  "primary",
  "secondary",
  "anecdotal",
  "unknown",
]);

export const acceptableReliabilityLevels = ["primary", "secondary"] as const;

export type SourceType = z.infer<typeof sourceTypeSchema>;
export type ReliabilityLevel = z.infer<typeof reliabilityLevelSchema>;
export type AcceptableReliabilityLevel =
  (typeof acceptableReliabilityLevels)[number];

export function isAcceptableReliabilityLevel(
  reliability: ReliabilityLevel,
): reliability is AcceptableReliabilityLevel {
  return acceptableReliabilityLevels.includes(
    reliability as AcceptableReliabilityLevel,
  );
}
