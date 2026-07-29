import type { SchoolTag, TagConfidence } from "@/features/schools/tagTaxonomy";
import type { Source } from "@/features/evidence/source";
import {
  acceptableFactualSourceTypes,
  type SourceType,
} from "@/features/evidence/sourceTypes";

const OFFICIAL_CLASS_TYPES = new Set<SourceType>([
  "official_government",
  "official_inspection",
  "school_website",
]);

const FACTUAL_ALLOWLIST = new Set<string>(acceptableFactualSourceTypes);

function isFactualAllowlisted(type: SourceType): boolean {
  return FACTUAL_ALLOWLIST.has(type);
}

function deriveExpectedConfidence(
  tagId: SchoolTag["id"],
  resolvedTypesBySourceId: Map<string, SourceType>,
): TagConfidence {
  const distinctIds = [...resolvedTypesBySourceId.keys()];
  const multiSourceQualifying = distinctIds.filter((id) => {
    const type = resolvedTypesBySourceId.get(id)!;
    if (isFactualAllowlisted(type)) return true;
    return (
      tagId === "active-school-community" && type === "triangulated_community"
    );
  });

  if (multiSourceQualifying.length >= 2) {
    return "confirmed_multi_source";
  }

  const hasOfficialClass = [...resolvedTypesBySourceId.values()].some((type) =>
    OFFICIAL_CLASS_TYPES.has(type),
  );
  if (hasOfficialClass) {
    return "confirmed_official";
  }

  return "partial";
}

export function validateTagEvidence(
  tag: SchoolTag,
  sources: Source[],
): { ok: true } | { ok: false; messages: string[] } {
  const messages: string[] = [];
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  const resolved: { sourceId: string; source: Source }[] = [];
  for (const citation of tag.citations) {
    const source = sourceById.get(citation.sourceId);
    if (!source) {
      messages.push(`Unknown sourceId: ${citation.sourceId}`);
      continue;
    }
    resolved.push({ sourceId: citation.sourceId, source });
  }

  const communityCitations = tag.citations.filter((citation) => {
    const source = sourceById.get(citation.sourceId);
    return source?.type === "triangulated_community";
  });

  for (const citation of communityCitations) {
    if (!citation.independenceLog) {
      messages.push(
        `Missing independenceLog for triangulated_community citation ${citation.sourceId}`,
      );
    }
  }

  const communityVenues = communityCitations
    .map((citation) => citation.independenceLog?.venue)
    .filter((venue): venue is string => Boolean(venue));
  if (communityVenues.length >= 2) {
    const uniqueVenues = new Set(communityVenues);
    if (uniqueVenues.size < communityVenues.length) {
      messages.push(
        "Community independenceLog venues must be distinct across citations",
      );
    }
  }

  if (tag.id === "active-school-community") {
    const communitySourceIds = new Set(
      resolved
        .filter(({ source }) => source.type === "triangulated_community")
        .map(({ sourceId }) => sourceId),
    );
    const nonCommunityCount = resolved.filter(({ source }) =>
      isFactualAllowlisted(source.type),
    ).length;

    if (communitySourceIds.size < 2) {
      messages.push(
        "active-school-community requires ≥2 distinct triangulated_community sourceIds",
      );
    }
    if (nonCommunityCount < 1) {
      messages.push(
        "active-school-community requires ≥1 non-community allowlisted citation (never sole basis)",
      );
    }
  } else {
    for (const { source, sourceId } of resolved) {
      if (
        source.type === "triangulated_community" ||
        source.type === "anecdotal_reserved"
      ) {
        messages.push(
          `Tag ${tag.id} cannot cite ${source.type} source ${sourceId}`,
        );
      }
    }
  }

  // Confidence consistency only when all sourceIds resolved (unknown ids already messaged)
  if (resolved.length === tag.citations.length) {
    const typesBySourceId = new Map(
      resolved.map(({ sourceId, source }) => [sourceId, source.type]),
    );
    const expected = deriveExpectedConfidence(tag.id, typesBySourceId);
    if (tag.confidence !== expected) {
      messages.push(
        `Declared confidence ${tag.confidence} does not match derived ${expected}`,
      );
    }
  }

  if (messages.length > 0) {
    return { ok: false, messages };
  }
  return { ok: true };
}
