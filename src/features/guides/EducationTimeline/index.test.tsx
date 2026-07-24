import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EducationTimeline } from ".";
import {
  GERMANY_WIDE_TRACK_NAMES,
  GERMANY_WIDE_TRIGGER,
  grundschuleContextNoteFixture,
  grundschuleFixture,
  outcomesFixture,
  outcomesIntroFixture,
  PRIMARY_BERLIN_BRANCH_NAMES,
  secondaryDecisionFixture,
  stageWithoutBranches,
  trunkFixture,
} from "./fixtures";

const REGION_LABEL = "Linha do tempo: da Educação Infantil ao Ensino Superior";

describe("EducationTimeline", () => {
  it("renders the timeline region with default demo data", () => {
    render(<EducationTimeline />);

    expect(
      screen.getByRole("region", { name: REGION_LABEL }),
    ).toBeInTheDocument();
  });

  it("shows the common beginning, Berlin secondary heading, and Grundschule context note", () => {
    render(
      <EducationTimeline
        trunk={trunkFixture}
        secondaryDecision={secondaryDecisionFixture}
        outcomes={outcomesFixture}
        grundschuleContextNote={grundschuleContextNoteFixture}
        outcomesIntro={outcomesIntroFixture}
      />,
    );

    expect(screen.getByText("Idade aproximada: 6–10 anos")).toBeInTheDocument();
    expect(screen.getByText("1ª à 4ª série")).toBeInTheDocument();
    expect(screen.getByText(grundschuleContextNoteFixture)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Depois da Grundschule", level: 3 }),
    ).toBeInTheDocument();

    const grundschuleTrigger = screen.getByRole("button", {
      name: /Grundschule/,
    });
    expect(grundschuleTrigger).not.toHaveTextContent(/Em Berlim/);

    PRIMARY_BERLIN_BRANCH_NAMES.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("keeps Germany-wide tracks inside the collapsed contextual section until opened", async () => {
    const user = userEvent.setup();
    render(
      <EducationTimeline
        trunk={trunkFixture}
        secondaryDecision={secondaryDecisionFixture}
        outcomes={outcomesFixture}
      />,
    );

    const region = screen.getByRole("region", { name: REGION_LABEL });
    const trigger = within(region).getByRole("button", {
      name: GERMANY_WIDE_TRIGGER,
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    GERMANY_WIDE_TRACK_NAMES.forEach((name) => {
      expect(within(region).queryByText(name)).not.toBeInTheDocument();
    });

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    GERMANY_WIDE_TRACK_NAMES.forEach((name) => {
      expect(within(region).getByText(name)).toBeInTheDocument();
    });
  });

  it("renders outcomes intro and both outcome panels without connector semantics", () => {
    render(
      <EducationTimeline
        outcomesIntro={outcomesIntroFixture}
      />,
    );

    expect(screen.getByText(outcomesIntroFixture)).toBeInTheDocument();
    expect(screen.getByText("Ausbildung")).toBeInTheDocument();
    expect(screen.getByText("Universidade / Hochschule")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Possíveis destinos", level: 3 }),
    ).toBeInTheDocument();
  });

  it("reveals a node's summary only after its trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <EducationTimeline
        trunk={trunkFixture}
        secondaryDecision={secondaryDecisionFixture}
        outcomes={outcomesFixture}
      />,
    );

    expect(
      screen.queryByText(stageWithoutBranches.summary),
    ).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", {
      name: new RegExp(stageWithoutBranches.name),
    });
    await user.click(trigger);

    expect(screen.getByText(stageWithoutBranches.summary)).toBeInTheDocument();
  });

  it("renders Gemeinschaftsschule as a single unbroken title token", () => {
    render(<EducationTimeline />);

    const trigger = screen.getByRole("button", {
      name: /Gemeinschaftsschule/,
    });
    expect(trigger.textContent).toContain("Gemeinschaftsschule");
    expect(trigger.textContent).not.toMatch(/Gemeinschaft\s+schule/i);
  });

  it("frames DEMO Grundschule Germany-first with Berlin duration as typographic line", () => {
    render(<EducationTimeline />);

    const trigger = screen.getByRole("button", {
      name: /Grundschule/,
    });
    expect(trigger).toHaveTextContent("1ª à 4ª série");
    expect(trigger).toHaveTextContent("Idade aproximada: 6–10 anos");
    expect(trigger).toHaveTextContent("Berlim: 6 anos (até a 6ª série)");
    expect(trigger).not.toHaveTextContent(/Em Berlim/);
  });

  it("expands only the clicked secondary card without revealing other summaries", async () => {
    const user = userEvent.setup();
    render(
      <EducationTimeline
        trunk={trunkFixture}
        secondaryDecision={secondaryDecisionFixture}
        outcomes={outcomesFixture}
      />,
    );

    const gymnasium = secondaryDecisionFixture.primaryBranches[0];
    const iss = secondaryDecisionFixture.primaryBranches[1];
    const gemeinschaftsschule = secondaryDecisionFixture.primaryBranches[2];

    expect(gymnasium).toBeDefined();
    expect(iss).toBeDefined();
    expect(gemeinschaftsschule).toBeDefined();

    const gymnasiumTrigger = screen.getByRole("button", {
      name: new RegExp(gymnasium!.name),
    });
    const issTrigger = screen.getByRole("button", {
      name: /Integrierte Sekundarschule \(ISS\)/,
    });
    const gemeinschaftsschuleTrigger = screen.getByRole("button", {
      name: new RegExp(gemeinschaftsschule!.name),
    });

    await user.click(gymnasiumTrigger);

    expect(gymnasiumTrigger).toHaveAttribute("aria-expanded", "true");
    expect(issTrigger).toHaveAttribute("aria-expanded", "false");
    expect(gemeinschaftsschuleTrigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(gymnasium!.summary)).toBeInTheDocument();
    expect(screen.queryByText(iss!.summary)).not.toBeInTheDocument();
    expect(
      screen.queryByText(gemeinschaftsschule!.summary),
    ).not.toBeInTheDocument();
  });
});
