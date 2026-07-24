import type { SecondaryDecisionBlock, TimelineStage } from "./types";

export const stageWithoutBranches: TimelineStage = {
  id: "kita",
  name: "Kita",
  grades: "Educação infantil",
  ageRange: "Idade aprox. 0–6 anos",
  summary: "Resumo sintético de teste para a Kita.",
};

export const grundschuleFixture: TimelineStage = {
  id: "grundschule",
  name: "Grundschule",
  grades: "1ª à 6ª série",
  ageRange: "Idade aproximada: 6–12 anos",
  summary: "Resumo sintético de teste para a Grundschule.",
  anchorHref: "#ensino-primario",
};

export const secondaryDecisionFixture: SecondaryDecisionBlock = {
  label: "Depois da Grundschule",
  primaryBranches: [
    {
      id: "gymnasium",
      name: "Gymnasium",
      grades: "7ª à 12ª/13ª série",
      ageRange: "Idade aprox. 12–18/19 anos",
      summary: "Resumo sintético de teste para o Gymnasium.",
    },
    {
      id: "iss",
      name: "Integrierte Sekundarschule (ISS)",
      grades: "7ª à 10ª série",
      ageRange: "Idade aprox. 12–16 anos",
      summary: "Resumo sintético de teste para a ISS.",
    },
    {
      id: "gemeinschaftsschule",
      name: "Gemeinschaftsschule",
      grades: "1ª à 10ª ou 13ª série",
      ageRange: "Idade aprox. 6–18/19 anos",
      summary: "Resumo sintético de teste para a Gemeinschaftsschule.",
    },
  ],
  germanyWideContext: {
    triggerLabel: "Como funciona em outros estados alemães",
    tracks: [
      {
        id: "realschule",
        name: "Realschule",
        grades: "5ª à 10ª série",
        ageRange: "Idade aprox. 10–16 anos",
        summary: "Resumo sintético de teste para a Realschule.",
      },
      {
        id: "hauptschule",
        name: "Hauptschule",
        grades: "5ª à 9ª/10ª série",
        ageRange: "Idade aprox. 10–15/16 anos",
        summary: "Resumo sintético de teste para a Hauptschule.",
      },
    ],
  },
};

export const outcomesFixture: TimelineStage[] = [
  {
    id: "ausbildung",
    name: "Ausbildung",
    grades: "Formação dual (escola + empresa)",
    ageRange: "Idade aprox. 16+ anos",
    summary: "Resumo sintético de teste para a Ausbildung.",
  },
  {
    id: "ensino-superior",
    name: "Universidade / Hochschule",
    grades: "Graduação, Duales Studium ou pós-Abitur",
    ageRange: "Idade aprox. 18+ anos",
    summary: "Resumo sintético de teste para o estágio de convergência.",
  },
];

export const trunkFixture: TimelineStage[] = [
  stageWithoutBranches,
  grundschuleFixture,
];

export const grundschuleContextNoteFixture =
  "Em Berlim, a Grundschule vai até a 6ª série. Na maioria dos outros estados alemães, termina na 4ª série.";

export const outcomesIntroFixture =
  "Qualificações e transições diferentes podem levar à formação profissional ou ao ensino superior — não existe um único caminho linear para todos.";

/** @deprecated use outcomesFixture */
export const convergenceStageFixture = outcomesFixture[1];

/** @deprecated use grundschuleFixture */
export const stageWithBerlinNoteAndBranches = grundschuleFixture;

export const PRIMARY_BERLIN_BRANCH_NAMES = [
  "Gymnasium",
  "Integrierte Sekundarschule (ISS)",
  "Gemeinschaftsschule",
];

export const GERMANY_WIDE_TRACK_NAMES = ["Realschule", "Hauptschule"];

export const GERMANY_WIDE_TRIGGER = "Como funciona em outros estados alemães";
