import { expect, test } from "@playwright/test";

test("renders the static home page and MDX guide", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Berlin School Guide" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Abrir página MDX" }).click();
  await expect(
    page.getByRole("heading", { name: "Página MDX de validação" }),
  ).toBeVisible();
});
