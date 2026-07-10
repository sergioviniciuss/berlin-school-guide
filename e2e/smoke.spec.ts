import { expect, test } from "@playwright/test";

test("renders the static home page and MDX guide", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Berlin School Guide" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Abrir página MDX" }).click();
  await expect(page).toHaveURL(/\/guides\/m2-smoke$/);
  await expect(
    page.getByRole("heading", { name: "Página MDX de validação" }),
  ).toBeVisible();
});

test("searches and filters the static school directory", async ({ page }) => {
  await page.goto("/schools");
  await expect(page.getByRole("heading", { name: "Escolas" })).toBeVisible();
  await expect(page.getByText("10 de 10 escolas encontradas")).toBeVisible();

  await page.getByLabel("Buscar escola pelo nome").fill("Lew-Tolstoi");
  await expect(page.getByText("1 de 10 escolas encontradas")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Lew-Tolstoi-Schule" }),
  ).toBeVisible();

  await page.goto("/schools");
  await page.getByRole("checkbox", { name: "Karlshorst" }).click();
  await expect(page.getByText("4 de 10 escolas encontradas")).toBeVisible();

  await page
    .getByRole("button", { name: "Remover filtro Bairro: Karlshorst" })
    .click();
  await expect(page.getByText("10 de 10 escolas encontradas")).toBeVisible();

  await page.getByRole("group", { name: "Bilíngue" }).getByLabel("Sim").click();
  await expect(
    page.getByRole("button", { name: "Remover filtro Bilíngue: Sim" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.getByText("10 de 10 escolas encontradas")).toBeVisible();

  await page.getByLabel("Buscar escola pelo nome").fill("sem resultado");
  await expect(page.getByText("0 de 10 escolas encontradas")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Nenhuma escola encontrada" }),
  ).toBeVisible();
});
