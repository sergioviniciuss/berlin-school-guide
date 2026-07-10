import { verifiedEvidence } from "@/features/evidence/fieldEvidence/fixtures";
import { schoolLocationSchema } from ".";

describe("schoolLocationSchema", () => {
  it("models district as Bezirk and neighbourhood as Ortsteil", () => {
    expect(
      schoolLocationSchema.parse({
        district: { value: "Mitte", evidence: verifiedEvidence },
        neighbourhood: { value: "Moabit", evidence: verifiedEvidence },
        address: {
          value: "Example Str. 1, 10557 Berlin",
          evidence: verifiedEvidence,
        },
      }),
    ).toEqual({
      district: { value: "Mitte", evidence: verifiedEvidence },
      neighbourhood: { value: "Moabit", evidence: verifiedEvidence },
      address: {
        value: "Example Str. 1, 10557 Berlin",
        evidence: verifiedEvidence,
      },
    });
  });
});
