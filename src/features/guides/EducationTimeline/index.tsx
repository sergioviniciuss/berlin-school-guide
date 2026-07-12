import {
  DEMO_GRUNDSCHULE_CONTEXT_NOTE,
  DEMO_OUTCOMES,
  DEMO_OUTCOMES_INTRO,
  DEMO_SECONDARY_DECISION,
  DEMO_TRUNK,
} from "./constants";
import { EducationTimelineView } from "./EducationTimelineView";
import type { EducationTimelineProps } from "./types";

export function EducationTimeline({
  trunk = DEMO_TRUNK,
  secondaryDecision = DEMO_SECONDARY_DECISION,
  outcomes = DEMO_OUTCOMES,
  grundschuleContextNote = DEMO_GRUNDSCHULE_CONTEXT_NOTE,
  outcomesIntro = DEMO_OUTCOMES_INTRO,
}: EducationTimelineProps = {}) {
  return (
    <EducationTimelineView
      trunk={trunk}
      secondaryDecision={secondaryDecision}
      outcomes={outcomes}
      grundschuleContextNote={grundschuleContextNote}
      outcomesIntro={outcomesIntro}
    />
  );
}
