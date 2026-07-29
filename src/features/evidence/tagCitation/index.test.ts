import { tagCitationSchema } from ".";

const fullIndependenceLog = {
  venue: "Elternforum Lichtenberg",
  identifier: "https://example.com/thread/123",
  dateAccessed: "2026-07-29",
  independenceRationale: "Distinct parent group from other cited venue.",
  echoCheckNote: "No verbatim echo of school website claims.",
};

describe("tagCitationSchema", () => {
  it("accepts a citation with only sourceId", () => {
    expect(tagCitationSchema.parse({ sourceId: "x" })).toEqual({
      sourceId: "x",
    });
  });

  it("accepts optional quote and note without independenceLog", () => {
    expect(
      tagCitationSchema.parse({
        sourceId: "src-1",
        quote: "Cited excerpt",
        note: "Author note",
      }),
    ).toEqual({
      sourceId: "src-1",
      quote: "Cited excerpt",
      note: "Author note",
    });
  });

  it("accepts a citation with a nested independenceLog", () => {
    expect(
      tagCitationSchema.parse({
        sourceId: "community-1",
        independenceLog: fullIndependenceLog,
      }),
    ).toEqual({
      sourceId: "community-1",
      independenceLog: fullIndependenceLog,
    });
  });

  it("rejects empty sourceId", () => {
    expect(tagCitationSchema.safeParse({ sourceId: "" }).success).toBe(false);
  });

  it("rejects invalid nested independenceLog", () => {
    expect(
      tagCitationSchema.safeParse({
        sourceId: "community-1",
        independenceLog: {
          ...fullIndependenceLog,
          dateAccessed: "2026-07-29T12:00:00Z",
        },
      }).success,
    ).toBe(false);
  });
});
