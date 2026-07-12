import { DEMO_CONVERGENCE, DEMO_TRUNK } from "./constants";
import { EducationTimelineDesktop } from "./EducationTimelineDesktop";
import { EducationTimelineMobile } from "./EducationTimelineMobile";
import type { EducationTimelineProps } from "./types";

export function EducationTimeline({
  trunk = DEMO_TRUNK,
  convergence = DEMO_CONVERGENCE,
}: EducationTimelineProps = {}) {
  return (
    <>
      <div className="hidden lg:block">
        <EducationTimelineDesktop trunk={trunk} convergence={convergence} />
      </div>
      <div className="lg:hidden">
        <EducationTimelineMobile trunk={trunk} convergence={convergence} />
      </div>
    </>
  );
}
