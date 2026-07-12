"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { TimelineNode } from "./TimelineNode";
import type { TimelineStage } from "./types";

type EducationTimelineMobileProps = {
  trunk: TimelineStage[];
  convergence: TimelineStage;
};

export function EducationTimelineMobile({
  trunk,
  convergence,
}: EducationTimelineMobileProps) {
  const branchingStage = trunk.find(
    (stage) => (stage.branches?.length ?? 0) > 0,
  );
  const branches = branchingStage?.branches ?? [];

  return (
    <div
      role="region"
      aria-label="Linha do tempo: da Educação Infantil ao Ensino Superior"
    >
      <ol className="ml-1 space-y-3 border-l-2 border-neutral-200 pl-5">
        {trunk.map((stage) => (
          <li key={stage.id}>
            <TimelineNode {...stage} />
          </li>
        ))}

        {branches.length > 0 ? (
          <li>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Escolha do percurso após a Grundschule
            </p>
            <Collapsible.Root className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <Collapsible.Trigger className="flex min-h-11 w-full items-center justify-between gap-2 text-left text-sm font-semibold text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Ver as vias do ensino secundário
                <ChevronDown
                  className="guide-print-hide size-4 text-neutral-500 transition-transform data-[state=open]:rotate-180"
                  aria-hidden
                />
              </Collapsible.Trigger>
              <Collapsible.Content className="guide-print-expand mt-3">
                <ul className="space-y-3">
                  {branches.map((branch) => (
                    <li key={branch.id}>
                      <TimelineNode {...branch} />
                    </li>
                  ))}
                </ul>
              </Collapsible.Content>
            </Collapsible.Root>
          </li>
        ) : null}

        <li>
          <TimelineNode {...convergence} />
        </li>
      </ol>
    </div>
  );
}
