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

  it("renders a linked description with an accessible sibling-guide link", () => {
    render(
      <GuideIntro
        eyebrow="Test"
        title="Título"
        description={
          <>
            Texto com{" "}
            <a href="/guides/berlin-school-system">
              Como funciona o sistema escolar público de Berlim
            </a>
            .
          </>
        }
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "Como funciona o sistema escolar público de Berlim",
      }),
    ).toHaveAttribute("href", "/guides/berlin-school-system");
  });
});
