import { independenceLogSchema } from ".";

const validLog = {
  venue: "Elternforum Lichtenberg",
  identifier: "https://example.com/thread/123",
  dateAccessed: "2026-07-29",
  independenceRationale: "Distinct parent group from other cited venue.",
  echoCheckNote: "No verbatim echo of school website claims.",
};

describe("independenceLogSchema", () => {
  it("accepts a complete independence log with YYYY-MM-DD dateAccessed", () => {
    expect(independenceLogSchema.parse(validLog)).toEqual(validLog);
  });

  it("rejects dateAccessed with an ISO datetime time component", () => {
    expect(
      independenceLogSchema.safeParse({
        ...validLog,
        dateAccessed: "2026-07-29T12:00:00Z",
      }).success,
    ).toBe(false);
  });

  it("rejects empty required string fields", () => {
    expect(
      independenceLogSchema.safeParse({
        ...validLog,
        venue: "",
      }).success,
    ).toBe(false);
    expect(
      independenceLogSchema.safeParse({
        ...validLog,
        identifier: "",
      }).success,
    ).toBe(false);
    expect(
      independenceLogSchema.safeParse({
        ...validLog,
        independenceRationale: "",
      }).success,
    ).toBe(false);
    expect(
      independenceLogSchema.safeParse({
        ...validLog,
        echoCheckNote: "",
      }).success,
    ).toBe(false);
  });
});
