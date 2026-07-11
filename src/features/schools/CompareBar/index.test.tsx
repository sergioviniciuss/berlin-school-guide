import { render, screen } from "@testing-library/react";

import { CompareBar } from ".";
import { buildComparePageHref } from "@/features/schools/parseCompareSlugs";

describe("CompareBar", () => {
  it("renders nothing when no schools are selected", () => {
    const { container } = render(<CompareBar selectedSlugs={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows singular count copy for one selected school", () => {
    render(<CompareBar selectedSlugs={["school-a"]} />);

    expect(screen.getByText("1 escola selecionada")).toBeVisible();
  });

  it("shows plural count copy for multiple selected schools", () => {
    render(<CompareBar selectedSlugs={["school-a", "school-b"]} />);

    expect(screen.getByText("2 escolas selecionadas")).toBeVisible();
  });

  it("disables compare CTA when fewer than two schools are selected", () => {
    render(<CompareBar selectedSlugs={["school-a"]} />);

    expect(
      screen.getByRole("button", { name: "Comparar escolas" }),
    ).toBeDisabled();
    expect(
      screen.queryByRole("link", { name: "Comparar escolas" }),
    ).not.toBeInTheDocument();
  });

  it("links to compare page when two to four schools are selected", () => {
    const slugs = ["school-a", "school-b"];

    render(<CompareBar selectedSlugs={slugs} />);

    expect(
      screen.getByRole("link", { name: "Comparar escolas" }),
    ).toHaveAttribute("href", buildComparePageHref(slugs));
  });

  it("uses fixed bottom positioning with z-20", () => {
    render(<CompareBar selectedSlugs={["school-a"]} />);

    const bar = screen.getByRole("region", { name: "Comparação de escolas" });
    expect(bar).toHaveClass("fixed", "bottom-0", "inset-x-0", "z-20");
  });

  it("uses min-h-11 tap targets on controls", () => {
    render(<CompareBar selectedSlugs={["school-a", "school-b"]} />);

    expect(screen.getByRole("link", { name: "Comparar escolas" })).toHaveClass(
      "min-h-11",
    );
  });
});
