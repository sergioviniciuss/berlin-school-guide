export function timelineTitleClass(name: string): string {
  const typography =
    "block font-semibold text-neutral-950 break-normal hyphens-none [overflow-wrap:normal]";

  if (name.length >= 22) {
    return `${typography} text-sm`;
  }

  if (name.length >= 16) {
    return `${typography} text-sm lg:text-base`;
  }

  return `${typography} text-base lg:text-lg`;
}
