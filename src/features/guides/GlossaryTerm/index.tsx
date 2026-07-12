import type { ReactNode } from "react";

type GlossaryTermProps = {
  term: string;
  children: ReactNode;
};

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  return (
    <dl className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <dt className="text-xl font-semibold text-neutral-950">{term}</dt>
      <dd className="mt-1 text-base leading-7 text-neutral-700">
        {children}
      </dd>
    </dl>
  );
}
