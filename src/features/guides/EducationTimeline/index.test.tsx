import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EducationTimeline } from ".";
import {
  convergenceStageFixture,
  stageWithoutBranches,
  trunkFixture,
} from "./fixtures";

const REGION_LABEL = "Linha do tempo: da Educação Infantil ao Ensino Superior";
const BRANCH_NAMES = [
  "Gymnasium",
  "Realschule",
  "Hauptschule",
  "Gesamtschule",
  "Ausbildung",
];

describe("EducationTimeline", () => {
  it("renders both desktop and mobile regions with default demo data", () => {
    render(<EducationTimeline />);

    expect(
      screen.getAllByRole("region", { name: REGION_LABEL }),
    ).toHaveLength(2);
  });

  it("renders all 5 secondary/vocational tracks with custom trunk/convergence", () => {
    render(
      <EducationTimeline
        trunk={trunkFixture}
        convergence={convergenceStageFixture}
      />,
    );

    BRANCH_NAMES.forEach((name) => {
      expect(screen.getAllByText(name).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("keeps mobile 'Outras vias' collapsed until the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <EducationTimeline
        trunk={trunkFixture}
        convergence={convergenceStageFixture}
      />,
    );

    const mobileRegion = screen.getAllByRole("region", {
      name: REGION_LABEL,
    })[1];
    const trigger = within(mobileRegion).getByRole("button", {
      name: "Ver as vias do ensino secundário",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(within(mobileRegion).queryByText("Gymnasium")).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      within(mobileRegion).getAllByText("Gymnasium").length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("shows the Berlin badge on the node's always-visible card face", () => {
    render(
      <EducationTimeline
        trunk={trunkFixture}
        convergence={convergenceStageFixture}
      />,
    );

    expect(screen.getAllByText(/Em Berlim/).length).toBeGreaterThanOrEqual(1);
  });

  it("reveals a node's summary only after its trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <EducationTimeline
        trunk={trunkFixture}
        convergence={convergenceStageFixture}
      />,
    );

    expect(
      screen.queryByText(stageWithoutBranches.summary),
    ).not.toBeInTheDocument();

    const triggers = screen.getAllByRole("button", {
      name: new RegExp(stageWithoutBranches.name),
    });
    await user.click(triggers[0]);

    expect(screen.getByText(stageWithoutBranches.summary)).toBeInTheDocument();
  });
});
