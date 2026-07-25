import { render, screen } from "@testing-library/react";

import { HomeJourneyCards } from ".";

describe("HomeJourneyCards", () => {
  it("renders exactly two journey headings: Comece por aqui and Explorar escolas", () => {
    render(<HomeJourneyCards />);

    expect(
      screen.getByRole("heading", { name: "Comece por aqui" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Explorar escolas" }),
    ).toBeVisible();
  });

  it('links "Começar pelo guia do sistema" to /guides/german-education-system', () => {
    render(<HomeJourneyCards />);

    expect(
      screen.getByRole("link", { name: "Começar pelo guia do sistema" }),
    ).toHaveAttribute("href", "/guides/german-education-system");
  });

  it('links "Ver escolas em Lichtenberg" to /schools', () => {
    render(<HomeJourneyCards />);

    expect(
      screen.getByRole("link", { name: "Ver escolas em Lichtenberg" }),
    ).toHaveAttribute("href", "/schools");
  });

  it("applies primary accent chrome only to the Comece por aqui card", () => {
    const { container } = render(<HomeJourneyCards />);

    const primaryCard = screen
      .getByRole("heading", { name: "Comece por aqui" })
      .closest("article");
    const secondaryCard = screen
      .getByRole("heading", { name: "Explorar escolas" })
      .closest("article");

    expect(primaryCard).toHaveClass("border-l-primary");
    expect(secondaryCard).not.toHaveClass("border-l-primary");
    expect(container.querySelectorAll("article")).toHaveLength(2);
  });

  it("no longer exposes the guides hub or methodology journey CTAs", () => {
    render(<HomeJourneyCards />);

    expect(
      screen.queryByRole("link", { name: "Ver guias para famílias" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Como funciona nossa pesquisa" }),
    ).not.toBeInTheDocument();
  });
});
