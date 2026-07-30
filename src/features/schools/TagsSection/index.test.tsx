import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { formatSourceType } from "@/features/evidence/formatSourceType";
import { formatTagConfidence } from "@/features/evidence/formatTagConfidence";
import { validTaggedSchool } from "@/features/schools/school/fixtures";
import { formatTagId } from "@/features/schools/tagTaxonomy";

import { TagsSection } from ".";

describe("TagsSection", () => {
  it('renders H2 "Características da escola" with tag label and confidence', () => {
    render(
      <TagsSection
        tags={validTaggedSchool.tags}
        sources={validTaggedSchool.sources}
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Características da escola",
      }),
    ).toBeVisible();
    expect(screen.getByText(formatTagId("stem-focus"))).toBeVisible();
    expect(
      screen.getByText(formatTagConfidence("confirmed_official")),
    ).toBeVisible();
  });

  it("keeps community source-type labels hidden while collapsed", () => {
    render(
      <TagsSection
        tags={validTaggedSchool.tags}
        sources={validTaggedSchool.sources}
      />,
    );

    expect(screen.queryByText("Fontes comunitárias trianguladas")).toBeNull();
    expect(screen.queryByText("Comunidade")).toBeNull();
  });

  it('expands evidence on "Ver evidência" and reveals source-type label', async () => {
    const user = userEvent.setup();

    render(
      <TagsSection
        tags={validTaggedSchool.tags}
        sources={validTaggedSchool.sources}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Ver evidência" });
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(formatSourceType("school_website") as string),
    ).toBeVisible();
  });

  it("returns null when tags are empty", () => {
    render(<TagsSection tags={[]} sources={[]} />);

    expect(
      screen.queryByRole("heading", { name: "Características da escola" }),
    ).toBeNull();
  });
});
