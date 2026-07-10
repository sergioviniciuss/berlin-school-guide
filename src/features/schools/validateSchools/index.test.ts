import { validateRealSchools, validateSchoolFixtures } from ".";

describe("validateSchoolFixtures", () => {
  it("validates static school JSON fixtures", () => {
    expect(validateSchoolFixtures()).toEqual({
      checked: 2,
      failures: [],
    });
  });

  it("validates static real school records", () => {
    expect(validateRealSchools()).toEqual({
      checked: 10,
      failures: [],
    });
  });
});
