import { render, screen } from "@testing-library/react";

import { SiteFooter } from ".";

describe("SiteFooter", () => {
  it("renders copyright with current year", () => {
    render(<SiteFooter />);

    expect(
      screen.getByText(/© \d{4} Berlin School Guide/),
    ).toBeInTheDocument();
  });

  it("links Metodologia to /methodology", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Metodologia" })).toHaveAttribute(
      "href",
      "/methodology",
    );
  });

  it("does not render trust disclaimer or methodology prose", () => {
    render(<SiteFooter />);

    expect(screen.queryByText(/transparência/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/disclaimer/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/como funciona nossa pesquisa/i),
    ).not.toBeInTheDocument();
  });
});
