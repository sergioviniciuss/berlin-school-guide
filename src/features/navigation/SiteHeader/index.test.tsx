import { fireEvent, render, screen, within } from "@testing-library/react";

import { SiteHeader } from ".";

let pathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

describe("SiteHeader", () => {
  beforeEach(() => {
    pathname = "/";
  });

  it('links the logo "Berlin School Guide" to home', () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "Berlin School Guide" }),
    ).toHaveAttribute("href", "/");
  });

  it("renders desktop nav links with correct hrefs", () => {
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", {
      name: "Navegação principal",
    });

    expect(within(nav).getByRole("link", { name: "Início" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(within(nav).getByRole("link", { name: "Escolas" })).toHaveAttribute(
      "href",
      "/schools",
    );
    expect(
      within(nav).getByRole("link", { name: "Metodologia" }),
    ).toHaveAttribute("href", "/methodology");
  });

  it("highlights Escolas when pathname is /schools", () => {
    pathname = "/schools";

    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", {
      name: "Navegação principal",
    });
    const escolasLink = within(nav).getByRole("link", { name: "Escolas" });

    expect(escolasLink).toHaveClass("text-primary");
    expect(escolasLink).toHaveClass("font-semibold");
  });

  it("highlights only Início when pathname is /", () => {
    pathname = "/";

    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", {
      name: "Navegação principal",
    });
    const inicioLink = within(nav).getByRole("link", { name: "Início" });
    const escolasLink = within(nav).getByRole("link", { name: "Escolas" });
    const metodologiaLink = within(nav).getByRole("link", {
      name: "Metodologia",
    });

    expect(inicioLink).toHaveClass("text-primary");
    expect(escolasLink).not.toHaveClass("text-primary");
    expect(metodologiaLink).not.toHaveClass("text-primary");
  });

  it("shows hamburger with Portuguese aria-label", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("button", { name: "Abrir menu de navegação" }),
    ).toBeInTheDocument();
  });

  it("opens mobile sheet with navigation links when hamburger is clicked", () => {
    render(<SiteHeader />);

    fireEvent.click(
      screen.getByRole("button", { name: "Abrir menu de navegação" }),
    );

    expect(screen.getByRole("heading", { name: "Navegação" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Início" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Escolas" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Metodologia" })).toBeVisible();
  });
});
