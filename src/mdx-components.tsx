import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold">{children}</h1>
    ),
    p: ({ children }) => (
      <p className="mt-4 leading-7 text-neutral-700">{children}</p>
    ),
    ...components,
  };
}
