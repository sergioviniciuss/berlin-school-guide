import { expect, test } from "@playwright/test";

test("navigates from homepage to school directory via journey CTA", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Escolas primárias em Berlim para famílias brasileiras",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Ver escolas em Lichtenberg" }).click();
  await expect(page).toHaveURL(/\/schools$/);
  await expect(page.getByRole("heading", { name: "Escolas" })).toBeVisible();
});

test("navigates from homepage to school directory via header nav", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Escolas" })
    .click();
  await expect(page).toHaveURL(/\/schools$/);
  await expect(page.getByRole("heading", { name: "Escolas" })).toBeVisible();
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

test("navigates from directory card to school profile", async ({ page }) => {
  await page.goto("/schools");
  await page
    .getByRole("link", { name: "Ver perfil de Lew-Tolstoi-Schule" })
    .click();
  await expect(page).toHaveURL(/\/schools\/lew-tolstoi-schule$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Lew-Tolstoi-Schule" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fontes" })).toBeVisible();
  await expect(page.getByText("Verificado").first()).toBeVisible();
});
