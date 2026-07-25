import { render, screen } from "@testing-library/react";

import GuidesPage from "./page";

describe("GuidesPage", () => {
  it("renders the guides hub heading and live guide links", () => {
    render(<GuidesPage />);

    expect(screen.getByRole("heading", { name: "Guias", level: 1 })).toBeVisible();
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
});
