import type { ReactNode } from "react";

import { slugifyHeading } from "@/features/guides/mdxUtils";

type GlossaryTermProps = {
  term: string;
  children: ReactNode;
};

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  return (
    <dl
      id={slugifyHeading(term)}
      className="scroll-mt-20 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
    >
      <dt className="text-xl font-semibold text-neutral-950">{term}</dt>
      <dd className="mt-1 text-base leading-7 text-neutral-700">{children}</dd>
    </dl>
  );
}
