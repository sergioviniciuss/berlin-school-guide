import { render, screen } from "@testing-library/react";

import HomePage from "./page";

describe("HomePage", () => {
  it('renders h1 "Escolas primárias em Berlim para famílias brasileiras"', () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Escolas primárias em Berlim para famílias brasileiras",
      }),
    ).toBeVisible();
  });

  it('shows eyebrow "Berlin School Guide" distinct from the h1 title', () => {
    render(<HomePage />);

    expect(screen.getByText("Berlin School Guide")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Escolas primárias em Berlim para famílias brasileiras",
      }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { level: 1, name: "Berlin School Guide" }),
    ).not.toBeInTheDocument();
  });

  it('renders scope note with "Cobertura inicial" and "Lichtenberg"', () => {
    render(<HomePage />);

    expect(screen.getByText("Cobertura inicial")).toBeVisible();
    expect(screen.getByText("Lichtenberg")).toBeVisible();
  });

  it("renders journey card CTAs via HomeJourneyCards", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("link", { name: "Começar pelo guia do sistema" }),
    ).toHaveAttribute("href", "/guides/german-education-system");
    expect(
      screen.getByRole("link", { name: "Ver escolas em Lichtenberg" }),
    ).toHaveAttribute("href", "/schools");
  });
});
