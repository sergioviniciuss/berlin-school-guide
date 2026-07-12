import { getCoverageTierLabel } from ".";

describe("getCoverageTierLabel", () => {
  it('returns "Pesquisa básica" for directory coverage level', () => {
    expect(getCoverageTierLabel("directory")).toBe("Pesquisa básica");
  });

  it('returns "Pesquisa detalhada" for detailed coverage level', () => {
    expect(getCoverageTierLabel("detailed")).toBe("Pesquisa detalhada");
  });
});
