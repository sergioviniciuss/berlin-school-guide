import { verifiedEvidence } from "@/features/evidence/fieldEvidence/fixtures";

import { inferredFrom } from ".";

describe("inferredFrom", () => {
  const note =
    "Valor inferido a partir do modelo Ganztag; contraturno não foi confirmado de forma independente.";

  it('returns status "not_confirmed" (not "verified")', () => {
    const result = inferredFrom({
      sourceField: "ganztag",
      sourceEvidence: verifiedEvidence,
      note,
    });

    expect(result.status).toBe("not_confirmed");
    expect(result.status).not.toBe("verified");
  });

  it("preserves citations from sourceEvidence", () => {
    const result = inferredFrom({
      sourceField: "ganztag",
      sourceEvidence: verifiedEvidence,
      note,
    });

    expect(result.citations).toEqual(verifiedEvidence.citations);
  });

  it("includes provided note verbatim", () => {
    const result = inferredFrom({
      sourceField: "offers",
      sourceEvidence: verifiedEvidence,
      note,
    });

    expect(result.note).toBe(note);
  });

  it("throws on empty note", () => {
    expect(() =>
      inferredFrom({
        sourceField: "ganztag",
        sourceEvidence: verifiedEvidence,
        note: "",
      }),
    ).toThrow("inferredFrom requires a non-empty note.");
  });
});
