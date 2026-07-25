import { render, screen } from "@testing-library/react";

import { GuidesHub } from ".";

describe("GuidesHub", () => {
  it("renders category headings and live guide cards only", () => {
    render(<GuidesHub />);

    expect(
      screen.getByRole("heading", { name: "Entenda o sistema", level: 2 }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Checklists práticas",
        level: 2,
      }),
    ).toBeVisible();
    expect(screen.queryByText(/Em breve/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Guias avançados/i)).not.toBeInTheDocument();
  });

  it("links to the flagship onboarding guide, Berlin guide, and first-steps checklist", () => {
    render(<GuidesHub />);

    expect(
      screen.getByRole("link", { name: "Ler guia do sistema educacional" }),
    ).toHaveAttribute("href", "/guides/german-education-system");
    expect(
      screen.getByRole("link", { name: "Ler guia do sistema escolar" }),
    ).toHaveAttribute("href", "/guides/berlin-school-system");
    expect(
      screen.getByRole("link", { name: "Abrir checklist" }),
    ).toHaveAttribute("href", "/guides/first-steps");
  });

  it("stacks the onboarding flagship card above the retitled Berlin card", () => {
    render(<GuidesHub />);

    expect(
      screen.getByRole("heading", {
        name: "Sistema educacional na Alemanha",
        level: 3,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Como funciona o sistema escolar público de Berlim",
        level: 3,
      }),
    ).toBeVisible();

    const flagshipCard = screen
      .getByRole("heading", { name: "Sistema educacional na Alemanha" })
      .closest("article");
    const berlinCard = screen
      .getByRole("heading", {
        name: "Como funciona o sistema escolar público de Berlim",
      })
      .closest("article");

    expect(flagshipCard).toHaveClass("border-l-primary");
    expect(berlinCard).not.toHaveClass("border-l-primary");
  });

  it("uses D-06 role copy for the first-steps checklist card", () => {
    render(<GuidesHub />);

    expect(
      screen.getByText(/Quando estiver pronto para agir/),
    ).toBeVisible();
  });
});
