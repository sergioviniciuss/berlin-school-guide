import { TimelineNode } from "./TimelineNode";
import type { TimelineStage } from "./types";

type EducationTimelineDesktopProps = {
  trunk: TimelineStage[];
  convergence: TimelineStage;
};

export function EducationTimelineDesktop({
  trunk,
  convergence,
}: EducationTimelineDesktopProps) {
  const branchingStage = trunk.find(
    (stage) => (stage.branches?.length ?? 0) > 0,
  );
  const branches = branchingStage?.branches ?? [];

  return (
    <div
      role="region"
      aria-label="Linha do tempo: da Educação Infantil ao Ensino Superior"
      className="space-y-4"
    >
      <ol className="flex items-stretch gap-4">
        {trunk.map((stage, index) => (
          <li key={stage.id} className="flex flex-1 items-stretch gap-4">
            <div className="min-w-[144px] flex-1">
              <TimelineNode {...stage} />
            </div>
            {index < trunk.length - 1 ? (
              <span
                aria-hidden
                className="mt-8 h-0 w-6 flex-none self-start border-t-2 border-neutral-300"
              />
            ) : null}
          </li>
        ))}
        <li className="flex flex-1 items-stretch gap-4">
          <span
            aria-hidden
            className="mt-8 h-0 w-6 flex-none self-start border-t-2 border-neutral-300"
          />
          <div className="min-w-[144px] flex-1">
            <TimelineNode {...convergence} />
          </div>
        </li>
      </ol>

      {branches.length > 0 ? (
        <div className="space-y-2 border-t-2 border-neutral-300 pt-4">
          <ul className="flex flex-wrap justify-center gap-3">
            {branches.map((branch) => (
              <li
                key={branch.id}
                className="min-w-[104px] max-w-[144px] border-l border-neutral-300 pl-2 pt-0"
              >
                <TimelineNode {...branch} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
