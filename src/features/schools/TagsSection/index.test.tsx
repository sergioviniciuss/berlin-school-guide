import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { formatSourceType } from "@/features/evidence/formatSourceType";
import { formatTagConfidence } from "@/features/evidence/formatTagConfidence";
import {
  communitySourceA,
  schoolWebsiteSource,
} from "@/features/evidence/source/fixtures";
import { validTaggedSchool } from "@/features/schools/school/fixtures";
import {
  formatTagCategory,
  formatTagId,
  type SchoolTag,
} from "@/features/schools/tagTaxonomy";

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

  it("groups tags into non-empty category H3s only", () => {
    const tags: SchoolTag[] = [
      {
        id: "stem-focus",
        confidence: "confirmed_official",
        citations: [{ sourceId: schoolWebsiteSource.id }],
      },
      {
        id: "inclusion-support",
        confidence: "partial",
        citations: [{ sourceId: communitySourceA.id }],
      },
    ];

    render(
      <TagsSection
        tags={tags}
        sources={[schoolWebsiteSource, communitySourceA]}
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: formatTagCategory("academic_focus"),
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: formatTagCategory("student_support"),
      }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: formatTagCategory("learning_model"),
      }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: formatTagCategory("school_environment"),
      }),
    ).toBeNull();
  });
});
