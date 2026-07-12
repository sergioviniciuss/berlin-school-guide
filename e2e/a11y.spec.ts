import { test } from "@playwright/test";

import { expectNoAccessibilityViolations } from "./a11y-utils";

const CORE_A11Y_ROUTES = [
  "/",
  "/schools",
  "/schools/lew-tolstoi-schule",
  "/compare?schools=lew-tolstoi-schule,adam-ries-schule",
  "/guides",
  "/guides/berlin-school-system",
  "/methodology",
];

test.describe("accessibility", () => {
  for (const route of CORE_A11Y_ROUTES) {
    test(`has no axe violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expectNoAccessibilityViolations(page);
    });
  }
});
