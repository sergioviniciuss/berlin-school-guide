import { render, screen } from "@testing-library/react";

import { ComparisonLimitations } from ".";

describe("ComparisonLimitations", () => {
  it("renders always-visible limitations copy about ranking and coverage", () => {
    render(<ComparisonLimitations />);

    expect(
      screen.getByText(/não classifica escolas por qualidade/i),
    ).toBeVisible();
    expect(
      screen.getByText(/cobertura mede completude da pesquisa/i),
    ).toBeVisible();
    expect(
      screen.getByText(/campos ausentes indicam perguntas para fazer na visita/i),
    ).toBeVisible();
  });

  it("links to methodology page", () => {
    render(<ComparisonLimitations />);

    expect(
      screen.getByRole("link", { name: /metodologia/i }),
    ).toHaveAttribute("href", "/methodology");
  });

  it("is not collapsible", () => {
    render(<ComparisonLimitations />);

    expect(
      screen.queryByRole("button", { name: /limitações/i }),
    ).not.toBeInTheDocument();
  });
});
