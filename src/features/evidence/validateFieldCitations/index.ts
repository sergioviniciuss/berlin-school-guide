import type { FieldEvidence } from "@/features/evidence/fieldEvidence";
import type { Source } from "@/features/evidence/source";
import { isAcceptableReliabilityLevel } from "@/features/evidence/sourceTypes";

export function validateFieldCitations(
  evidence: FieldEvidence,
  sources: Source[],
) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  const citationSources = evidence.citations.map((citation) =>
    sourceById.get(citation.sourceId),
  );
  const hasUnknownSource = citationSources.some((source) => !source);
  const hasAcceptableSource = citationSources.some(
    (source) => source && isAcceptableReliabilityLevel(source.reliability),
  );

  return {
    hasUnknownSource,
    hasAcceptableSource,
  };
}
