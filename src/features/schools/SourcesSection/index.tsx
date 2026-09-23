import { ExternalLink } from "lucide-react";

import { formatSourceType } from "@/features/evidence/formatSourceType";
import type { GroupedCitedSources } from "@/features/schools/collectCitedSources";

type SourcesSectionProps = {
  groupedSources: GroupedCitedSources[];
};

export function SourcesSection({ groupedSources }: SourcesSectionProps) {
  const visibleGroups = groupedSources
    .map((group) => ({
      ...group,
      label: formatSourceType(group.type),
    }))
    .filter((group) => group.label !== null);

  const hasEntries = visibleGroups.some((group) => group.entries.length > 0);

  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-950">Fontes</h2>
      <p className="mt-2 text-base text-neutral-700">
        Todas as fontes citadas nesta página, agrupadas por tipo.
      </p>

      {!hasEntries ? (
        <p className="mt-4 text-base text-neutral-700">
          Nenhuma fonte citada nesta página.
        </p>
      ) : (
        <div className="mt-6 space-y-8">
          {visibleGroups.map((group) =>
            group.entries.length > 0 ? (
              <div key={group.type}>
                <h3 className="text-sm font-semibold text-neutral-700 mb-3 first:mt-0 mt-6">
                  {group.label}
                </h3>
                <div className="space-y-4">
                  {group.entries.map((entry) => (
                    <article
                      key={entry.source.id}
                      id={`source-${entry.source.id}`}
                      className="rounded-lg border border-neutral-200 bg-white p-4 space-y-2"
                    >
                      <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-800">
                        {group.label}
                      </span>
                      <p className="text-base font-semibold text-neutral-950">
                        {entry.source.title}
                      </p>
                      <p className="text-sm text-neutral-700">
                        <span className="font-semibold">Publicador:</span>{" "}
                        {entry.source.publisher}
                      </p>
                      <p className="text-sm text-neutral-700">
                        <span className="font-semibold">Consultado em:</span>{" "}
                        {entry.source.dateAccessed}
                      </p>
                      {entry.source.datePublished ? (
                        <p className="text-sm text-neutral-700">
                          <span className="font-semibold">Publicado em:</span>{" "}
                          {entry.source.datePublished}
                        </p>
                      ) : null}
                      {entry.citedBy.length > 0 ? (
                        <p className="text-sm text-neutral-600">
                          <span className="font-semibold">Citado em:</span>{" "}
                          {entry.citedBy.join(", ")}
                        </p>
                      ) : null}
                      <a
                        href={entry.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline"
                      >
                        {entry.source.url}
                        <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                      {entry.citations.map((citation, index) => (
                        <div key={index} className="space-y-1">
                          {citation.quote ? (
                            <p className="text-sm text-neutral-600">
                              <span className="font-semibold">Trecho citado:</span>{" "}
                              {citation.quote}
                            </p>
                          ) : null}
                          {citation.note ? (
                            <p className="text-sm text-neutral-600">
                              <span className="font-semibold">Nota:</span>{" "}
                              {citation.note}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </article>
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}
    </section>
  );
}
