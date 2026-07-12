import type { MDXComponents } from "mdx/types";

import { BerlinCallout } from "@/features/guides/BerlinCallout";
import { EducationTimeline } from "@/features/guides/EducationTimeline";
import { GlossaryTerm } from "@/features/guides/GlossaryTerm";
import {
  getTextContent,
  slugifyHeading,
} from "@/features/guides/mdxUtils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold">{children}</h1>
    ),
    h2: ({ children }) => {
      const text = getTextContent(children);
      const id = slugifyHeading(text);

      return (
        <h2
          id={id}
          className="mt-10 scroll-mt-20 text-2xl font-semibold text-neutral-950 first:mt-0"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="mt-6 text-lg font-semibold text-neutral-950">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 leading-7 text-neutral-700">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-neutral-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-neutral-700">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");

      return (
        <a
          href={href}
          className="font-medium text-blue-700 underline hover:opacity-90"
          {...(isExternal
            ? { rel: "noopener noreferrer", target: "_blank" }
            : {})}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-950">{children}</strong>
    ),
    EducationTimeline,
    BerlinCallout,
    GlossaryTerm,
    ...components,
  };
}
