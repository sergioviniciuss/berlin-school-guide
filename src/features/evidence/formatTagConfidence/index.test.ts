import { formatTagConfidence } from ".";

describe("formatTagConfidence", () => {
  it('returns "Confirmado por múltiplas fontes" for confirmed_multi_source', () => {
    expect(formatTagConfidence("confirmed_multi_source")).toBe(
      "Confirmado por múltiplas fontes",
    );
  });

  it('returns "Confirmado por fonte oficial" for confirmed_official', () => {
    expect(formatTagConfidence("confirmed_official")).toBe(
      "Confirmado por fonte oficial",
    );
  });

  it('returns "Evidência parcial" for partial', () => {
    expect(formatTagConfidence("partial")).toBe("Evidência parcial");
  });
});
