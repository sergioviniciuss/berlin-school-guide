export type TimelineStage = {
  id: string;
  name: string;
  grades: string;
  ageRange: string;
  summary: string;
  anchorHref?: string;
  berlinNote?: string;
};

export type SecondaryDecisionBlock = {
  label: string;
  primaryBranches: TimelineStage[];
  germanyWideContext?: {
    triggerLabel: string;
    tracks: TimelineStage[];
  };
};

export type EducationTimelineProps = {
  trunk?: TimelineStage[];
  secondaryDecision?: SecondaryDecisionBlock;
  outcomes?: TimelineStage[];
  grundschuleContextNote?: string;
  outcomesIntro?: string;
};
