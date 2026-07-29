import type { SchoolTag } from "@/features/schools/tagTaxonomy";
import type { Source } from "@/features/evidence/source";

export function validateTagEvidence(
  _tag: SchoolTag,
  _sources: Source[],
): { ok: true } | { ok: false; messages: string[] } {
  return { ok: false, messages: ["not implemented"] };
}
