import { validateSchoolFixtures } from ".";

describe("validateSchoolFixtures", () => {
  it("validates static school JSON fixtures", () => {
    expect(validateSchoolFixtures()).toEqual({
      checked: 2,
      failures: [],
    });
  });
});
