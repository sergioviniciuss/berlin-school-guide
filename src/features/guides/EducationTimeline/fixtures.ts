import type { TimelineStage } from "./types";

export const stageWithoutBranches: TimelineStage = {
  id: "kita",
  name: "Kita",
  grades: "Educação infantil",
  ageRange: "Idade aprox. 0–6 anos",
  summary: "Resumo sintético de teste para a Kita.",
};

export const stageWithBerlinNoteAndBranches: TimelineStage = {
  id: "grundschule",
  name: "Grundschule",
  grades: "1ª à 4ª série",
  ageRange: "Idade aprox. 6–10 anos",
  summary: "Resumo sintético de teste para a Grundschule.",
  anchorHref: "#o-caminho-da-kita-a-universidade",
  berlinNote: "dura 6 anos, até a 6ª série",
  branches: [
    {
      id: "gymnasium",
      name: "Gymnasium",
      grades: "5ª à 12ª/13ª série",
      ageRange: "Idade aprox. 10–18/19 anos",
      summary: "Resumo sintético de teste para o Gymnasium.",
    },
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
    {
      id: "gesamtschule",
      name: "Gesamtschule",
      grades: "5ª à 12ª/13ª série",
      ageRange: "Idade aprox. 10–18/19 anos",
      summary: "Resumo sintético de teste para a Gesamtschule.",
    },
    {
      id: "ausbildung-direto",
      name: "Ausbildung",
      grades: "Formação dual (escola + empresa)",
      ageRange: "Idade aprox. 16+ anos",
      summary: "Resumo sintético de teste para a Ausbildung.",
    },
  ],
};

export const convergenceStageFixture: TimelineStage = {
  id: "ensino-superior",
  name: "Uni / Ausbildung avançada",
  grades: "Graduação, Duales Studium ou formação avançada",
  ageRange: "Idade aprox. 18+ anos",
  summary: "Resumo sintético de teste para o estágio de convergência.",
};

export const trunkFixture: TimelineStage[] = [
  stageWithoutBranches,
  stageWithBerlinNoteAndBranches,
];
