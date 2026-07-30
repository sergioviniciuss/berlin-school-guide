"use client";

import { ExternalLink } from "lucide-react";
import { useId, useState } from "react";

import type { Source } from "@/features/evidence/source";
import { formatSourceType } from "@/features/evidence/formatSourceType";
import { formatTagConfidence } from "@/features/evidence/formatTagConfidence";
import {
  formatTagId,
  type SchoolTag,
} from "@/features/schools/tagTaxonomy";

import { groupTagsByCategory } from "./utils";

type TagsSectionProps = {
  tags: SchoolTag[];
  sources: Source[];
};

export function TagsSection({ tags, sources }: TagsSectionProps) {
  if (!tags.length) {
    return null;
  }

  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const groups = groupTagsByCategory(tags);

  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-950">
        Características da escola
      </h2>
      <div className="mt-6 space-y-8">
        {groups.map((group) => (
          <div key={group.categoryId}>
            <h3 className="text-sm font-semibold text-neutral-700">
              {group.label}
            </h3>
            <ul className="mt-4 space-y-6">
              {group.tags.map((tag) => (
                <li key={tag.id}>
                  <TagRow tag={tag} sourceById={sourceById} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

type TagRowProps = {
  tag: SchoolTag;
  sourceById: Map<string, Source>;
};

function TagRow({ tag, sourceById }: TagRowProps) {
  const [expanded, setExpanded] = useState(false);
  const evidenceId = useId();

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-base text-neutral-900">{formatTagId(tag.id)}</span>
        <span className="bg-neutral-100 text-neutral-800 rounded-full px-2 py-1 text-sm font-semibold">
          {formatTagConfidence(tag.confidence)}
        </span>
      </div>
      <div className="mt-2">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={evidenceId}
          onClick={() => setExpanded((current) => !current)}
          className="min-h-11 text-sm text-blue-700 hover:underline"
        >
          {expanded ? "Ocultar evidência" : "Ver evidência"}
        </button>
        {expanded ? (
          <div id={evidenceId} className="mt-2 space-y-2">
            {tag.citations.map((citation) => {
              const source = sourceById.get(citation.sourceId);
              if (!source) {
                return null;
              }

              const sourceTypeLabel = formatSourceType(source.type);

              return (
                <div
                  key={citation.sourceId}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
                >
                  {sourceTypeLabel ? (
                    <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-800">
                      {sourceTypeLabel}
                    </span>
                  ) : null}
                  <a
                    href={`#source-${citation.sourceId}`}
                    className="text-blue-700 hover:underline"
                  >
                    Ver fonte
                  </a>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-700 hover:underline"
                  >
                    Abrir original
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
