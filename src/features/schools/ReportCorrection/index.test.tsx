import { render, screen } from "@testing-library/react";

import { ReportCorrection } from ".";
import { validTaggedSchool } from "@/features/schools/school/fixtures";

let params = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useSearchParams: () => params,
}));

describe("ReportCorrection", () => {
  beforeEach(() => {
    params = new URLSearchParams();
  });

  it("prefills school name and shows locked scope copy for a valid slug", () => {
    params = new URLSearchParams(`school=${validTaggedSchool.slug}`);

    render(<ReportCorrection />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Sugerir correção" }),
    ).toBeVisible();
    expect(
      screen.getByText(`Escola: ${validTaggedSchool.name.value}`),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Inclua problemas em dados factuais, características (tags) e no texto de Perfil da escola.",
      ),
    ).toBeVisible();

    const mailto = screen.getByRole("link", { name: "Enviar por e-mail" });
    expect(mailto).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:/),
    );
    const href = decodeURIComponent(mailto.getAttribute("href") ?? "");
    expect(href).toContain(validTaggedSchool.slug);
    expect(href).toContain(validTaggedSchool.name.value as string);
  });

  it("shows missing-school copy for an unknown slug", () => {
    params = new URLSearchParams("school=escola-inexistente");

    render(<ReportCorrection />);

    expect(
      screen.getByText(
        "Não encontramos essa escola no link. Descreva o nome da escola no e-mail.",
      ),
    ).toBeVisible();
  });
});
