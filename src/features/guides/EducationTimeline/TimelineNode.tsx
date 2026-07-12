"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { cn } from "@/components/ui/utils";
import { BerlinCallout } from "@/features/guides/BerlinCallout";
import { timelineTitleClass } from "./titleStyles";
import type { TimelineStage } from "./types";

type TimelineNodeProps = Pick<
  TimelineStage,
  "name" | "grades" | "ageRange" | "summary" | "anchorHref" | "berlinNote"
> & {
  className?: string;
  variant?: "default" | "outcome";
};

export function TimelineNode({
  name,
  grades,
  ageRange,
  summary,
  anchorHref,
  berlinNote,
  className,
  variant = "default",
}: TimelineNodeProps) {
  return (
    <Collapsible.Root
      className={cn(
        "flex min-h-[8.75rem] flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 data-[state=open]:[&>button>.guide-print-hide]:rotate-180",
        variant === "outcome" && "min-h-[9.5rem] bg-neutral-50/50",
        className,
      )}
    >
      <Collapsible.Trigger className="relative min-h-11 w-full pr-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <div className="min-w-0">
          <span className={timelineTitleClass(name)}>{name}</span>
          <span className="mt-1 block text-xs font-semibold text-neutral-600">
            {grades}
          </span>
          <span className="block text-xs font-normal text-neutral-500">
            {ageRange}
          </span>
          {berlinNote ? (
            <span className="mt-1 block">
              <BerlinCallout variant="inline" note={berlinNote} />
            </span>
          ) : null}
        </div>
        <ChevronDown
          className="guide-print-hide absolute right-0 top-1 size-4 shrink-0 text-neutral-500 transition-transform"
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
