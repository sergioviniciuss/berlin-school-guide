import type { SecondaryDecisionBlock, TimelineStage } from "./types";

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
  grades: "1ª à 6ª série",
  ageRange: "Idade aproximada: 6–12 anos",
  summary:
    "Em Berlim, a Grundschule dura seis anos antes da escolha do percurso secundário. Matrícula e área de captura dependem do Bezirk onde a família mora. (Conteúdo completo chega na Fase 10.)",
  anchorHref: "#o-caminho-da-kita-a-universidade",
};

const GYMNASIUM: TimelineStage = {
  id: "gymnasium",
  name: "Gymnasium",
  grades: "7ª à 12ª/13ª série",
  ageRange: "Idade aprox. 12–18/19 anos",
  summary:
    "Caminho acadêmico que costuma levar ao Abitur, a qualificação de acesso à universidade. Não é a única via para o ensino superior. (Conteúdo completo chega na Fase 10.)",
};

const ISS: TimelineStage = {
  id: "iss",
  name: "Integrierte Sekundarschule (ISS)",
  grades: "7ª à 10ª série",
  ageRange: "Idade aprox. 12–16 anos",
  summary:
    "Modelo comum em Berlim que integra diferentes percursos no ensino secundário, com possibilidade de seguir para qualificações profissionais ou acadêmicas. (Conteúdo completo chega na Fase 10.)",
};

const GEMEINSCHAFTSSCHULE: TimelineStage = {
  id: "gemeinschaftsschule",
  name: "Gemeinschaftsschule",
  grades: "1ª à 10ª ou 13ª série",
  ageRange: "Idade aprox. 6–18/19 anos",
  summary:
    "Escola comunitária berlinense que reúne primária e secundária no mesmo campus, com transição mais gradual entre etapas. (Conteúdo completo chega na Fase 10.)",
};

const REALSCHULE: TimelineStage = {
  id: "realschule",
  name: "Realschule",
  grades: "5ª à 10ª série",
  ageRange: "Idade aprox. 10–16 anos",
  summary:
    "Modelo comum fora de Berlim; pode levar ao Fachabitur ou à Ausbildung. (Conteúdo completo chega na Fase 10.)",
};

const HAUPTSCHULE: TimelineStage = {
  id: "hauptschule",
  name: "Hauptschule",
  grades: "5ª à 9ª/10ª série",
  ageRange: "Idade aprox. 10–15/16 anos",
  summary:
    "Modelo comum fora de Berlim, voltado à formação profissional prática e à Ausbildung. (Conteúdo completo chega na Fase 10.)",
};

const AUSBILDUNG: TimelineStage = {
  id: "ausbildung",
  name: "Ausbildung",
  grades: "Formação dual (escola + empresa)",
  ageRange: "Idade aprox. 16+ anos",
  summary:
    "Formação profissional dual que combina aulas e trabalho remunerado em uma empresa, com rotas possíveis até o Duales Studium. (Conteúdo completo chega na Fase 10.)",
};

const ENSINO_SUPERIOR: TimelineStage = {
  id: "ensino-superior",
  name: "Universidade / Hochschule",
  grades: "Graduação, Duales Studium ou pós-Abitur",
  ageRange: "Idade aprox. 18+ anos",
  summary:
    "Depois do Abitur, Fachabitur ou de qualificações equivalentes, famílias avaliam universidade, Duales Studium ou formação avançada. (Conteúdo completo chega na Fase 10.)",
  anchorHref: "#o-caminho-da-kita-a-universidade",
};

export const DEMO_TRUNK: TimelineStage[] = [KITA, GRUNDSCHULE];

export const DEMO_GRUNDSCHULE_CONTEXT_NOTE =
  "Em Berlim, a Grundschule vai até a 6ª série. Na maioria dos outros estados alemães, termina na 4ª série.";

export const DEMO_SECONDARY_DECISION: SecondaryDecisionBlock = {
  label: "Depois da Grundschule",
  primaryBranches: [GYMNASIUM, ISS, GEMEINSCHAFTSSCHULE],
  germanyWideContext: {
    triggerLabel: "Como funciona em outros estados alemães",
    tracks: [REALSCHULE, HAUPTSCHULE],
  },
};

export const DEMO_OUTCOMES_INTRO =
  "Qualificações e transições diferentes podem levar à formação profissional ou ao ensino superior — não existe um único caminho linear para todos.";

export const DEMO_OUTCOMES: TimelineStage[] = [AUSBILDUNG, ENSINO_SUPERIOR];
