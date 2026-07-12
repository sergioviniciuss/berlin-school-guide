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

  it("links to system guide and first-steps checklist", () => {
    render(<GuidesHub />);

    expect(
      screen.getByRole("link", { name: "Ler guia do sistema escolar" }),
    ).toHaveAttribute("href", "/guides/berlin-school-system");
    expect(
      screen.getByRole("link", { name: "Abrir checklist" }),
    ).toHaveAttribute("href", "/guides/first-steps");
  });
});
