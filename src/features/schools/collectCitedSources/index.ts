import type { School } from "@/features/schools/school";
import { importantSchoolFieldPathsDetailedV2 } from "@/features/schools/school/constants";
import { getSchoolFieldByPath } from "@/features/schools/getSchoolFieldByPath";
import type { SourceType } from "@/features/evidence/sourceTypes";
import type { CitedSourceEntry, GroupedCitedSources } from "./types";

const SOURCE_TYPE_ORDER: SourceType[] = [
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
];

export function collectCitedSources(school: School): GroupedCitedSources[] {
  const sourceById = new Map(school.sources.map((source) => [source.id, source]));
  const citationsBySourceId = new Map<
    string,
    Array<{ quote?: string; note?: string }>
  >();

  for (const path of importantSchoolFieldPathsDetailedV2) {
    const fieldValue = getSchoolFieldByPath(school, path);
    if (!fieldValue) {
      continue;
    }

    for (const citation of fieldValue.evidence.citations) {
      if (!sourceById.has(citation.sourceId)) {
        continue;
      }

      const existing = citationsBySourceId.get(citation.sourceId) ?? [];
      existing.push({ quote: citation.quote, note: citation.note });
      citationsBySourceId.set(citation.sourceId, existing);
    }
  }

  const cited: CitedSourceEntry[] = [...citationsBySourceId.entries()].map(
    ([sourceId, citations]) => ({
      source: sourceById.get(sourceId)!,
      citations,
    }),
  );

  return SOURCE_TYPE_ORDER.map((type) => ({
    type,
    entries: cited
      .filter((entry) => entry.source.type === type)
      .sort((a, b) =>
        a.source.title.localeCompare(b.source.title, "pt-BR"),
      ),
  })).filter((group) => group.entries.length > 0);
}

export type { CitedSourceEntry, GroupedCitedSources } from "./types";
