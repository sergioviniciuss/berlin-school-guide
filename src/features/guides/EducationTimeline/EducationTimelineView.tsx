"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { TimelineNode } from "./TimelineNode";
import type { SecondaryDecisionBlock, TimelineStage } from "./types";

type EducationTimelineViewProps = {
  trunk: TimelineStage[];
  secondaryDecision: SecondaryDecisionBlock;
  outcomes: TimelineStage[];
  grundschuleContextNote: string;
  outcomesIntro: string;
};

export function EducationTimelineView({
  trunk,
  secondaryDecision,
  outcomes,
  grundschuleContextNote,
  outcomesIntro,
}: EducationTimelineViewProps) {
  const [kita, grundschule] = trunk;
  const { label, primaryBranches, germanyWideContext } = secondaryDecision;

  if (!kita || !grundschule) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Linha do tempo: da Educação Infantil ao Ensino Superior"
      className="mx-auto w-full max-w-[1120px] overflow-x-hidden"
    >
      {/* Common beginning */}
      <section aria-labelledby="education-timeline-beginning">
        <h2 id="education-timeline-beginning" className="sr-only">
          Início comum
        </h2>
        <ol className="flex list-none flex-col items-stretch gap-4 p-0 lg:flex-row lg:items-start lg:justify-center lg:gap-6">
          <li className="w-full max-w-[300px] lg:w-[280px]">
            <TimelineNode {...kita} />
          </li>
          <li
            aria-hidden
            className="hidden h-[8.75rem] shrink-0 items-center justify-center self-start text-2xl font-light text-neutral-300 lg:flex"
          >
            →
          </li>
          <li className="w-full max-w-[300px] lg:w-[280px]">
            <TimelineNode {...grundschule} />
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {grundschuleContextNote}
            </p>
          </li>
        </ol>
      </section>

      {/* Secondary decision — Berlin */}
      <section
        aria-labelledby="education-timeline-secondary"
        className="mt-10"
      >
        <h3
          id="education-timeline-secondary"
          className="text-lg font-semibold text-neutral-950"
        >
          {label}
        </h3>
        <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {primaryBranches.map((branch) => (
            <li key={branch.id} className="min-h-[8.75rem]">
              <TimelineNode {...branch} />
            </li>
          ))}
        </ul>
      </section>

      {germanyWideContext ? (
        <section
          aria-labelledby="education-timeline-other-states"
          className="mt-6"
        >
          <h3 id="education-timeline-other-states" className="sr-only">
            {germanyWideContext.triggerLabel}
          </h3>
          <Collapsible.Root className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 data-[state=open]:[&>button>.guide-print-hide]:rotate-180">
            <Collapsible.Trigger className="flex min-h-11 w-full items-center justify-between gap-3 pr-8 text-left text-sm font-semibold text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <span className="min-w-0 flex-1 break-normal hyphens-none [overflow-wrap:normal]">
                {germanyWideContext.triggerLabel}
              </span>
              <ChevronDown
                className="guide-print-hide size-4 shrink-0 text-neutral-500 transition-transform"
                aria-hidden
              />
            </Collapsible.Trigger>
            <Collapsible.Content className="guide-print-expand mt-4 grid gap-4 sm:grid-cols-2">
              {germanyWideContext.tracks.map((track) => (
                <TimelineNode key={track.id} {...track} />
              ))}
            </Collapsible.Content>
          </Collapsible.Root>
        </section>
      ) : null}

      {/* Outcomes */}
      <section
        aria-labelledby="education-timeline-outcomes"
        className="mt-10"
      >
        <h3
          id="education-timeline-outcomes"
          className="text-lg font-semibold text-neutral-950"
        >
          Possíveis destinos
        </h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-neutral-600">
          {outcomesIntro}
        </p>
        <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2 lg:items-start">
          {outcomes.map((outcome) => (
            <li key={outcome.id} className="min-h-[9.5rem]">
              <TimelineNode {...outcome} variant="outcome" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
