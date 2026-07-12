import type { TimelineStage } from "./types";

const KITA: TimelineStage = {
  id: "kita",
  name: "Kita",
  grades: "Educação infantil",
  ageRange: "Idade aprox. 0–6 anos",
  summary:
    "A Kita é o primeiro contato com o sistema alemão de educação, com foco em cuidado e desenvolvimento infantil. Vagas e custos variam por Bezirk. (Conteúdo completo chega na Fase 10.)",
  anchorHref: "#o-caminho-da-kita-a-universidade",
};

const GRUNDSCHULE: TimelineStage = {
  id: "grundschule",
  name: "Grundschule",
  grades: "1ª à 4ª série",
  ageRange: "Idade aprox. 6–10 anos",
  summary:
    "A Grundschule é a escola primária comum a toda a Alemanha, antes da divisão em diferentes tipos de escola secundária. (Conteúdo completo chega na Fase 10.)",
  anchorHref: "#o-caminho-da-kita-a-universidade",
  berlinNote: "dura 6 anos, até a 6ª série",
  branches: [
    {
      id: "gymnasium",
      name: "Gymnasium",
      grades: "5ª à 12ª/13ª série",
      ageRange: "Idade aprox. 10–18/19 anos",
      summary:
        "Caminho acadêmico que costuma levar ao Abitur, a qualificação de acesso à universidade. Não é a única via para o ensino superior. (Conteúdo completo chega na Fase 10.)",
    },
    {
      id: "realschule",
      name: "Realschule",
      grades: "5ª à 10ª série",
      ageRange: "Idade aprox. 10–16 anos",
      summary:
        "Caminho de formação geral que pode levar ao Fachabitur ou à Ausbildung, com opções de seguir para o ensino superior depois. (Conteúdo completo chega na Fase 10.)",
    },
    {
      id: "hauptschule",
      name: "Hauptschule",
      grades: "5ª à 9ª/10ª série",
      ageRange: "Idade aprox. 10–15/16 anos",
      summary:
        "Caminho voltado à formação profissional prática, com portas abertas para a Ausbildung e, por rotas específicas, para qualificações posteriores. (Conteúdo completo chega na Fase 10.)",
    },
    {
      id: "gesamtschule",
      name: "Gesamtschule",
      grades: "5ª à 12ª/13ª série",
      ageRange: "Idade aprox. 10–18/19 anos",
      summary:
        "Escola integrada que reúne diferentes percursos sob o mesmo teto, com a decisão de trilha tomada de forma mais gradual. (Conteúdo completo chega na Fase 10.)",
    },
    {
      id: "ausbildung-direto",
      name: "Ausbildung",
      grades: "Formação dual (escola + empresa)",
      ageRange: "Idade aprox. 16+ anos",
      summary:
        "Formação profissional dual que combina aulas e trabalho remunerado em uma empresa, com rotas possíveis até o Duales Studium. (Conteúdo completo chega na Fase 10.)",
    },
  ],
};

const ENSINO_SUPERIOR: TimelineStage = {
  id: "ensino-superior",
  name: "Uni / Ausbildung avançada",
  grades: "Graduação, Duales Studium ou formação avançada",
  ageRange: "Idade aprox. 18+ anos",
  summary:
    "Depois do Abitur, Fachabitur ou da Ausbildung, os caminhos convergem para universidade, Duales Studium ou formação profissional avançada. (Conteúdo completo chega na Fase 10.)",
  anchorHref: "#o-caminho-da-kita-a-universidade",
};

export const DEMO_TRUNK: TimelineStage[] = [KITA, GRUNDSCHULE];
export const DEMO_CONVERGENCE: TimelineStage = ENSINO_SUPERIOR;
