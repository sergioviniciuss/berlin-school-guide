export type TimelineStage = {
  id: string;
  name: string;
  grades: string;
  ageRange: string;
  summary: string;
  anchorHref?: string;
  berlinNote?: string;
  branches?: TimelineStage[];
};

export type EducationTimelineProps = {
  trunk?: TimelineStage[];
  convergence?: TimelineStage;
};
