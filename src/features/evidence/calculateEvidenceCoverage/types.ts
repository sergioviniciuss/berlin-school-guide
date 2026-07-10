import type { evidenceCoverageVersion } from "@/features/schools/school/constants";

export type EvidenceCoverage = {
  version: typeof evidenceCoverageVersion;
  verified: number;
  total: number;
  percentage: number;
};
