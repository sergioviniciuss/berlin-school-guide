import { z } from "zod";

import { createFieldValueSchema, fieldEvidenceSchema } from ".";

describe("fieldEvidenceSchema", () => {
  it("accepts verified field evidence with a citation", () => {
    expect(
      fieldEvidenceSchema.parse({
        status: "verified",
        citations: [{ sourceId: "source-1" }],
        lastChecked: "2026-07-10",
      }),
    ).toEqual({
      status: "verified",
      citations: [{ sourceId: "source-1" }],
      lastChecked: "2026-07-10",
    });
  });

  it("rejects conflicting evidence without an explanation", () => {
    expect(() =>
      fieldEvidenceSchema.parse({
        status: "conflicting",
        citations: [{ sourceId: "source-1" }, { sourceId: "source-2" }],
      }),
    ).toThrow();
  });
});

describe("createFieldValueSchema", () => {
  it("wraps nullable field values with field evidence", () => {
    const schema = createFieldValueSchema(z.string());

    expect(
      schema.parse({
        value: "Example",
        evidence: {
          status: "verified",
          citations: [{ sourceId: "source-1" }],
        },
      }),
    ).toEqual({
      value: "Example",
      evidence: {
        status: "verified",
        citations: [{ sourceId: "source-1" }],
      },
    });
  });
});
