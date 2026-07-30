import type { Source } from "@/features/evidence/source";
import type { SourceType } from "@/features/evidence/sourceTypes";

export type CitedSourceEntry = {
  source: Source;
  citations: Array<{ quote?: string; note?: string }>;
  citedBy: string[];
};

export type GroupedCitedSources = {
  type: SourceType;
  entries: CitedSourceEntry[];
};
