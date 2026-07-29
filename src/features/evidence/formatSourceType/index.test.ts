import { formatSourceType } from ".";

describe("formatSourceType", () => {
  it('returns "Oficial" for official_government', () => {
    expect(formatSourceType("official_government")).toBe("Oficial");
  });

  it('returns "Site da escola" for school_website', () => {
    expect(formatSourceType("school_website")).toBe("Site da escola");
  });

  it('returns "Jornalismo independente" for journalism', () => {
    expect(formatSourceType("journalism")).toBe("Jornalismo independente");
  });

  it('returns "Fontes comunitárias trianguladas" for triangulated_community', () => {
    expect(formatSourceType("triangulated_community")).toBe(
      "Fontes comunitárias trianguladas",
    );
  });

  it("returns null for anecdotal_reserved", () => {
    expect(formatSourceType("anecdotal_reserved")).toBeNull();
  });
});
