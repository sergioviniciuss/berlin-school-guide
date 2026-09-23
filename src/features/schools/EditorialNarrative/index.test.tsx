import { render, screen } from "@testing-library/react";

import { EditorialNarrative } from ".";

describe("EditorialNarrative", () => {
  it('renders H2 "Perfil da escola" and body text when provided', () => {
    render(<EditorialNarrative text="Parágrafo sintético de teste." />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Perfil da escola" }),
    ).toBeVisible();
    expect(screen.getByText("Parágrafo sintético de teste.")).toBeVisible();
  });

  it("returns null when text is undefined", () => {
    render(<EditorialNarrative />);

    expect(
      screen.queryByRole("heading", { name: "Perfil da escola" }),
    ).toBeNull();
  });

  it("returns null when text is empty", () => {
    render(<EditorialNarrative text="" />);

    expect(
      screen.queryByRole("heading", { name: "Perfil da escola" }),
    ).toBeNull();
  });
});
