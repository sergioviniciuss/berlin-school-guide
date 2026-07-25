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

test("has no horizontal overflow on a laptop viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/guides/german-education-system");

  await expect(
    page.getByRole("region", {
      name: "Linha do tempo: da Educação Infantil ao Ensino Superior",
    }).first(),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("shows Próximos passos with the three closing exits before Glossário", async ({
  page,
}) => {
  await page.goto("/guides/german-education-system");

  await expect(
    page.getByRole("heading", { name: "Próximos passos", level: 2 }),
  ).toBeVisible();

  // The MDX body has no <section> wrappers around headings, so the ordered
  // list immediately following the "Próximos passos" heading is the unique
  // way to scope these link assertions to that closing section.
  const proximosPassosList = page.locator(
    'h2:has-text("Próximos passos") ~ ol',
  );

  await expect(
    proximosPassosList.getByRole("link", {
      name: "Como funciona o sistema escolar público de Berlim",
    }),
  ).toHaveAttribute("href", "/guides/berlin-school-system");
  await expect(
    proximosPassosList.getByRole("link", { name: "Ver escolas" }),
  ).toHaveAttribute("href", "/schools");
  await expect(
    proximosPassosList.getByRole("link", { name: "Primeiros passos" }),
  ).toHaveAttribute("href", "/guides/first-steps");

  const proximosPassosLinks = await proximosPassosList
    .getByRole("link")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(proximosPassosLinks).toHaveLength(3);
  expect(
    proximosPassosLinks.some((href) => href?.includes("/compare")),
  ).toBe(false);
});
