import { z } from "zod";

export const sourceTypeSchema = z.enum([
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
  "journalism",
  "triangulated_community",
  "anecdotal_reserved",
]);

export const reliabilityLevelSchema = z.enum([
  "primary",
  "secondary",
  "anecdotal",
  "unknown",
]);

export const acceptableReliabilityLevels = ["primary", "secondary"] as const;

export const acceptableFactualSourceTypes = [
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
  "journalism",
] as const;

export type SourceType = z.infer<typeof sourceTypeSchema>;
export type ReliabilityLevel = z.infer<typeof reliabilityLevelSchema>;
export type AcceptableReliabilityLevel =
  (typeof acceptableReliabilityLevels)[number];
export type AcceptableFactualSourceType =
  (typeof acceptableFactualSourceTypes)[number];

export function isAcceptableReliabilityLevel(
  reliability: ReliabilityLevel,
): reliability is AcceptableReliabilityLevel {
  return acceptableReliabilityLevels.includes(
    reliability as AcceptableReliabilityLevel,
  );
}

export function isAcceptableFactualEvidence(source: {
  type: SourceType;
  reliability: ReliabilityLevel;
}): boolean {
  return (
    isAcceptableReliabilityLevel(source.reliability) &&
    (acceptableFactualSourceTypes as readonly string[]).includes(source.type)
  );
}
