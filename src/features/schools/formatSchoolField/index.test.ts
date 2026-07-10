import {
  formatBoolean,
  formatClassification,
  formatFieldStatus,
  formatInspectionAvailability,
  formatStringList,
} from ".";

describe("formatSchoolField", () => {
  it("formats every field status in Brazilian Portuguese", () => {
    expect(formatFieldStatus("missing")).toBe("Informação não encontrada");
    expect(formatFieldStatus("unverified")).toBe("Informação não verificada");
    expect(formatFieldStatus("outdated")).toBe("Precisa de nova verificação");
    expect(formatFieldStatus("conflicting")).toBe("Informação conflitante");
    expect(formatFieldStatus("not_applicable")).toBe("Não se aplica");
  });

  it("formats classification, booleans, inspection, and lists", () => {
    expect(formatClassification("public")).toBe("Pública");
    expect(formatClassification("private")).toBe("Privada");
    expect(formatBoolean(true, "verified")).toBe("Sim");
    expect(formatInspectionAvailability("available", "verified")).toBe(
      "Disponível",
    );
    expect(formatStringList(["German", "English"], "verified")).toBe(
      "German, English",
    );
  });
});
