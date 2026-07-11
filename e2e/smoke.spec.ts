import { expect, test, type Page } from "@playwright/test";

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
    page.getByRole("heading", { name: "Nenhuma escola com esse nome" }),
  ).toBeVisible();
});

test("restores directory view from shared URL with search and sort", async ({
  page,
}) => {
  await page.goto("/schools?q=Lew-Tolstoi&sort=coverage");
  await expect(page).toHaveURL(/sort=coverage/);
  await expect(page.getByText("1 de 10 escolas encontradas")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Lew-Tolstoi-Schule" }),
  ).toBeVisible();
  await expect(page.getByLabel("Ordenar resultados do diretório")).toHaveValue(
    "coverage",
  );
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

test.describe("compare", () => {
  async function addSchoolToCompare(page: Page, schoolName: string) {
    const article = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: schoolName }),
    });
    await article
      .getByRole("button", { name: "Adicionar à comparação" })
      .click();
  }

  test("selects schools from directory and opens comparison table", async ({
    page,
  }) => {
    await page.goto("/schools");

    await addSchoolToCompare(page, "Lew-Tolstoi-Schule");
    await addSchoolToCompare(page, "Adam-Ries-Schule");

    await page.getByRole("link", { name: "Comparar escolas" }).click();

    await expect(page).toHaveURL(/\/compare\?schools=/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Comparar" }),
    ).toBeVisible();
    await expect(page.getByText("Lew-Tolstoi-Schule").first()).toBeVisible();
    await expect(page.getByText("Adam-Ries-Schule").first()).toBeVisible();
  });

  test("restores comparison from shared compare URL", async ({ page }) => {
    await page.goto(
      "/compare?schools=lew-tolstoi-schule,adam-ries-schule",
    );

    await expect(
      page.getByRole("heading", { level: 1, name: "Comparar" }),
    ).toBeVisible();
    await expect(page.getByText("Lew-Tolstoi-Schule").first()).toBeVisible();
    await expect(page.getByText("Adam-Ries-Schule").first()).toBeVisible();
    await expect(
      page.getByText(/não classifica escolas por qualidade/i),
    ).toBeVisible();
  });

  test("handles invalid slug in compare URL without crashing", async ({
    page,
  }) => {
    await page.goto("/compare?schools=invalid-slug,also-fake");

    await expect(
      page.getByRole("heading", { level: 1, name: "Comparar" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Selecione pelo menos duas escolas",
      }),
    ).toBeVisible();
    await expect(page.getByText(/Não encontramos:/i)).toBeVisible();
  });
});
