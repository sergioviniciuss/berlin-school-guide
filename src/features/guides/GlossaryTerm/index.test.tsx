import { render, screen } from "@testing-library/react";

import { GlossaryTerm } from ".";

describe("GlossaryTerm", () => {
  it("renders the term and definition as visible text", () => {
    render(<GlossaryTerm term="Ganztag">Definição de teste.</GlossaryTerm>);

    expect(screen.getByText("Ganztag")).toBeVisible();
    expect(screen.getByText("Definição de teste.")).toBeVisible();
  });

  it("renders a dl containing exactly one dt and one dd", () => {
    const { container } = render(
      <GlossaryTerm term="Ganztag">Definição de teste.</GlossaryTerm>,
    );

    expect(container.querySelector("dl > dt")).not.toBeNull();
    expect(container.querySelector("dl > dd")).not.toBeNull();
  });

  it("renders multiple instances without shared state or id collisions", () => {
    render(
      <>
        <GlossaryTerm term="Ganztag">Definição de teste um.</GlossaryTerm>
        <GlossaryTerm term="Hort">Definição de teste dois.</GlossaryTerm>
      </>,
    );

    expect(screen.getByText("Ganztag")).toBeVisible();
    expect(screen.getByText("Hort")).toBeVisible();
  });
});
