import { render, screen } from "@testing-library/react";

import { HomeJourneyCards } from ".";

describe("HomeJourneyCards", () => {
  it("renders journey headings for schools, guides, and methodology", () => {
    render(<HomeJourneyCards />);

    expect(
      screen.getByRole("heading", { name: "Explorar escolas" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Entender o sistema escolar" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Entender nossa metodologia" }),
    ).toBeVisible();
  });

  it('links "Ver escolas em Lichtenberg" to /schools', () => {
    render(<HomeJourneyCards />);

    expect(
      screen.getByRole("link", { name: "Ver escolas em Lichtenberg" }),
    ).toHaveAttribute("href", "/schools");
  });

  it('links "Ver guias para famílias" to /guides', () => {
    render(<HomeJourneyCards />);

    expect(
      screen.getByRole("link", { name: "Ver guias para famílias" }),
    ).toHaveAttribute("href", "/guides");
  });

  it('links "Como funciona nossa pesquisa" to /methodology', () => {
    render(<HomeJourneyCards />);

    expect(
      screen.getByRole("link", { name: "Como funciona nossa pesquisa" }),
    ).toHaveAttribute("href", "/methodology");
  });

  it("applies left accent class to the primary card article", () => {
    const { container } = render(<HomeJourneyCards />);

    const primaryCard = screen
      .getByRole("heading", { name: "Explorar escolas" })
      .closest("article");

    expect(primaryCard).toHaveClass("border-l-primary");
    expect(container.querySelectorAll("article")).toHaveLength(3);
  });
});
