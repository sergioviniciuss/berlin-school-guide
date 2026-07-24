import Link from "next/link";

import type { BerlinCalloutProps } from "./types";

export function BerlinCallout(props: BerlinCalloutProps) {
  if (props.variant === "inline") {
    return (
      <span className="mt-1 block border-l-2 border-l-primary pl-2 text-xs leading-snug text-blue-800">
        <span className="font-semibold">Berlim:</span>{" "}
        <span className="font-normal">{props.note}</span>
      </span>
    );
  }

  return (
    <aside
      aria-labelledby="berlin-em-destaque-heading"
      className="rounded-lg border border-neutral-200 border-l-4 border-l-primary bg-blue-50/40 p-5"
    >
      <p
        id="berlin-em-destaque-heading"
        className="text-sm font-semibold uppercase tracking-wide text-blue-800"
      >
        Berlin em destaque
      </p>
      <div className="mt-2 text-base leading-7 text-neutral-700">
        {props.children}
      </div>
      <Link
        href="/guides/berlin-school-system"
        className="mt-3 inline-block min-h-11 font-medium text-blue-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Ver guia completo do sistema em Berlim
      </Link>
    </aside>
  );
}
