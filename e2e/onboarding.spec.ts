import { expect, test } from "@playwright/test";

test("opens the German education system guide with the visual timeline", async ({
  page,
}) => {
  await page.goto("/guides/german-education-system");
  await expect(
    page.getByRole("heading", {
      name: "Como funciona o sistema educacional na Alemanha",
      level: 1,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", {
      name: "Linha do tempo: da Educação Infantil ao Ensino Superior",
    }).first(),
  ).toBeVisible();
});

test("has no horizontal overflow on a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guides/german-education-system");

  await expect(
    page.getByRole("heading", {
      name: "Como funciona o sistema educacional na Alemanha",
      level: 1,
    }),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
