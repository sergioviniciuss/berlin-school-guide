import { formatProfileFieldValue } from ".";
import { field, verifiedWebsiteEvidence } from "@/features/schools/school/fixtures";

describe("formatProfileFieldValue", () => {
  it("returns status label for missing fields instead of raw value", () => {
    const missingField = field("Open all-day model", {
      status: "missing",
      citations: [],
    });

    expect(formatProfileFieldValue("ganztag", missingField)).toBe(
      "Informação não encontrada",
    );
  });

  it("returns status label for unverified and outdated fields", () => {
    const unverifiedField = field("Open all-day model", {
      status: "unverified",
      citations: [],
    });
    const outdatedField = field("Open all-day model", {
      status: "outdated",
      citations: [],
    });

    expect(formatProfileFieldValue("ganztag", unverifiedField)).toBe(
      "Informação não verificada",
    );
    expect(formatProfileFieldValue("ganztag", outdatedField)).toBe(
      "Precisa de nova verificação",
    );
  });

  it("returns verified ganztag string value", () => {
    const ganztagField = field("Open all-day model", verifiedWebsiteEvidence);

    expect(formatProfileFieldValue("ganztag", ganztagField)).toBe(
      "Open all-day model",
    );
  });

  it("formats inspectionAvailability as availability-only labels", () => {
    const availableField = field("available", verifiedWebsiteEvidence);
    const unavailableField = field("unavailable", verifiedWebsiteEvidence);
    const notConfirmedField = field("not_confirmed", verifiedWebsiteEvidence);

    expect(
      formatProfileFieldValue("inspectionAvailability", availableField),
    ).toBe("Disponível");
    expect(
      formatProfileFieldValue("inspectionAvailability", unavailableField),
    ).toBe("Indisponível");
    expect(
      formatProfileFieldValue("inspectionAvailability", notConfirmedField),
    ).toBe("Não confirmada");
  });

  it("formats not_confirmed bilingualPrograms using list formatter path", () => {
    const bilingualProgramsField = field(["English", "French"], {
      status: "not_confirmed",
      citations: [{ sourceId: "school-website" }],
      note: "Programs inferred from school website.",
    });

    expect(
      formatProfileFieldValue("bilingualPrograms", bilingualProgramsField),
    ).toBe("Informação inferida, não confirmada");
  });

  it('returns "Não se aplica" for not_applicable status', () => {
    const notApplicableField = field(null, {
      status: "not_applicable",
      citations: [],
    });

    expect(formatProfileFieldValue("inspectionData", notApplicableField)).toBe(
      "Não se aplica",
    );
  });
});
