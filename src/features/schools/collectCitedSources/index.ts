import type { School } from "@/features/schools/school";
import { importantSchoolFieldPathsDetailedV2 } from "@/features/schools/school/constants";
import { getSchoolFieldByPath } from "@/features/schools/getSchoolFieldByPath";
import { profileFieldLabels } from "@/features/schools/SchoolProfile/constants";
import { formatTagId } from "@/features/schools/tagTaxonomy";
import type { SourceType } from "@/features/evidence/sourceTypes";
import type { CitedSourceEntry, GroupedCitedSources } from "./types";

const SOURCE_TYPE_ORDER: SourceType[] = [
  "official_government",
  "official_inspection",
  "school_website",
  "public_dataset",
  "journalism",
  "triangulated_community",
];

export function collectCitedSources(school: School): GroupedCitedSources[] {
  const sourceById = new Map(school.sources.map((source) => [source.id, source]));
  const citationsBySourceId = new Map<
    string,
    Array<{ quote?: string; note?: string }>
  >();
  const citedByBySourceId = new Map<string, Set<string>>();

  function addCitation(
    sourceId: string,
    citation: { quote?: string; note?: string },
    label: string,
  ) {
    if (!sourceById.has(sourceId)) {
      return;
    }

    const existing = citationsBySourceId.get(sourceId) ?? [];
    existing.push(citation);
    citationsBySourceId.set(sourceId, existing);

    const citedBy = citedByBySourceId.get(sourceId) ?? new Set<string>();
    citedBy.add(label);
    citedByBySourceId.set(sourceId, citedBy);
  }

  for (const path of importantSchoolFieldPathsDetailedV2) {
    const fieldValue = getSchoolFieldByPath(school, path);
    if (!fieldValue) {
      continue;
    }

    for (const citation of fieldValue.evidence.citations) {
      addCitation(
        citation.sourceId,
        { quote: citation.quote, note: citation.note },
        profileFieldLabels[path],
      );
    }
  }

  for (const tag of school.tags ?? []) {
    for (const citation of tag.citations) {
      addCitation(
        citation.sourceId,
        { quote: citation.quote, note: citation.note },
        formatTagId(tag.id),
      );
    }
  }

  const cited: CitedSourceEntry[] = [...citationsBySourceId.entries()].map(
    ([sourceId, citations]) => ({
      source: sourceById.get(sourceId)!,
      citations,
      citedBy: [...(citedByBySourceId.get(sourceId) ?? [])].sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
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
