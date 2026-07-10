import { render, screen } from "@testing-library/react";

import { GuideIntro } from ".";

describe("GuideIntro", () => {
  it("renders the guide introduction content", () => {
    render(
      <GuideIntro
        eyebrow="Teste"
        title="Guia de validação"
        description="Componente mínimo para validar React Testing Library."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Guia de validação" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Componente mínimo para validar React Testing Library."),
    ).toBeVisible();
  });
});
