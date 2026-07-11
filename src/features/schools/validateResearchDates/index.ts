import type { School } from "@/features/schools/school";
import { collectFieldEvidence } from "@/features/schools/school";

function compareDates(left: string, right: string): number {
  return left.localeCompare(right);
}

export function validateResearchDates(school: School): string[] {
  const failures: string[] = [];
  const { lastResearched, lastSourceChecked } = school.research;

  if (!lastResearched || !lastSourceChecked) {
    failures.push(
      `${school.id}: Real schools must include lastResearched and lastSourceChecked.`,
    );
    return failures;
  }

  const citedSourceIds = new Set(
    collectFieldEvidence(school).flatMap(({ evidence }) =>
      evidence.citations.map((citation) => citation.sourceId),
    ),
  );
  const citedSources = school.sources.filter((source) =>
    citedSourceIds.has(source.id),
  );

  if (citedSources.length === 0) {
    failures.push(
      `${school.id}: Cannot verify research date coherence without cited sources.`,
    );
    return failures;
  }

  const minDateAccessed = citedSources.reduce(
    (min, source) =>
      compareDates(source.dateAccessed, min) < 0 ? source.dateAccessed : min,
    citedSources[0]!.dateAccessed,
  );
  const maxDateAccessed = citedSources.reduce(
    (max, source) =>
      compareDates(source.dateAccessed, max) > 0 ? source.dateAccessed : max,
    citedSources[0]!.dateAccessed,
  );

  if (compareDates(lastSourceChecked, minDateAccessed) < 0) {
    failures.push(
      `${school.id}: lastSourceChecked (${lastSourceChecked}) must be >= oldest cited source dateAccessed (${minDateAccessed}).`,
    );
  }

  if (compareDates(lastSourceChecked, maxDateAccessed) < 0) {
    failures.push(
      `${school.id}: lastSourceChecked (${lastSourceChecked}) must be >= most recent cited source dateAccessed (${maxDateAccessed}).`,
    );
  }

  return failures;
}
