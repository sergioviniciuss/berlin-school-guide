"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { BerlinCallout } from "@/features/guides/BerlinCallout";
import type { TimelineStage } from "./types";

type TimelineNodeProps = Pick<
  TimelineStage,
  "name" | "grades" | "ageRange" | "summary" | "anchorHref" | "berlinNote"
>;

export function TimelineNode({
  name,
  grades,
  ageRange,
  summary,
  anchorHref,
  berlinNote,
}: TimelineNodeProps) {
  return (
    <Collapsible.Root className="rounded-lg border border-neutral-200 bg-white p-3 lg:p-4">
      <Collapsible.Trigger className="flex min-h-11 w-full items-start justify-between gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <span>
          <span className="block text-xl font-semibold text-neutral-950">
            {name}
          </span>
          <span className="block text-xs font-semibold text-neutral-600">
            {grades}
          </span>
          <span className="block text-xs font-normal text-neutral-500">
            {ageRange}
          </span>
          {berlinNote ? (
            <BerlinCallout variant="inline" note={berlinNote} />
          ) : null}
        </span>
        <ChevronDown
          className="guide-print-hide size-4 shrink-0 text-neutral-500 transition-transform data-[state=open]:rotate-180"
          aria-hidden
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="guide-print-expand mt-2 border-t border-neutral-100 pt-2 text-base leading-6 text-neutral-700">
        <p>{summary}</p>
        {anchorHref ? (
          <a
            href={anchorHref}
            className="mt-1 inline-block min-h-11 font-medium text-blue-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Ver seção completa
          </a>
        ) : null}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
