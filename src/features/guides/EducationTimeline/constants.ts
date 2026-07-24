import type { SecondaryDecisionBlock, TimelineStage } from "./types";

const KITA: TimelineStage = {
  id: "kita",
  name: "Kita",
  grades: "Educação infantil",
  ageRange: "Idade aprox. 0–6 anos",
  summary:
    "A Kita é o primeiro contato de muitas famílias com o sistema alemão de educação, com foco em cuidado e desenvolvimento infantil. A frequência não é obrigatória, mas costuma facilitar a transição para a Grundschule. Organização e custos variam por município e Bezirk.",
  anchorHref: "#antes-da-escola",
};

const GRUNDSCHULE: TimelineStage = {
  id: "grundschule",
  name: "Grundschule",
  grades: "1ª à 4ª série",
  ageRange: "Idade aproximada: 6–10 anos",
  summary:
    "A Grundschule é a escola primária obrigatória e a base comum de todas as crianças. Na maioria dos estados alemães ela vai até a 4ª série; em Berlim dura seis anos. Nela se formam as primeiras recomendações sobre o caminho secundário.",
  berlinNote: "dura 6 anos, até a 6ª série",
  anchorHref: "#ensino-primario",
};

const GYMNASIUM: TimelineStage = {
  id: "gymnasium",
  name: "Gymnasium",
  grades: "7ª à 12ª/13ª série",
  ageRange: "Idade aprox. 12–18/19 anos",
  summary:
    "Percurso acadêmico que costuma preparar para o Abitur, a qualificação clássica de acesso à universidade. Em Berlim é uma das opções após a Grundschule, com o mesmo peso visual das demais vias. Não é o único caminho para o ensino superior.",
  anchorHref: "#os-caminhos-possiveis",
};

const ISS: TimelineStage = {
  id: "iss",
  name: "Integrierte Sekundarschule (ISS)",
  grades: "7ª à 10ª série",
  ageRange: "Idade aprox. 12–16 anos",
  summary:
    "Modelo comum em Berlim que reúne diferentes percursos no ensino secundário. A família pode mirar qualificações profissionais, o MSA ou rotas até o Abitur/Fachabitur, conforme o perfil da escola. É uma alternativa de peso equivalente ao Gymnasium.",
  anchorHref: "#os-caminhos-possiveis",
};

const GEMEINSCHAFTSSCHULE: TimelineStage = {
  id: "gemeinschaftsschule",
  name: "Gemeinschaftsschule",
  grades: "1ª à 10ª ou 13ª série",
  ageRange: "Idade aprox. 6–18/19 anos",
  summary:
    "Escola comunitária berlinense que pode reunir etapas primária e secundária no mesmo campus. A transição entre anos costuma ser mais gradual, com percursos acadêmicos e profissionais possíveis. É outra via principal no mapa berlinense pós-Grundschule.",
  anchorHref: "#os-caminhos-possiveis",
};

const REALSCHULE: TimelineStage = {
  id: "realschule",
  name: "Realschule",
  grades: "5ª à 10ª série",
  ageRange: "Idade aprox. 10–16 anos",
  summary:
    "Modelo ainda comum em muitos estados alemães fora de Berlim. Costuma preparar para o ensino médio intermediário e pode abrir caminho para Fachabitur ou Ausbildung. Ajuda a entender como o sistema nacional difere do mapa berlinense.",
};

const HAUPTSCHULE: TimelineStage = {
  id: "hauptschule",
  name: "Hauptschule",
  grades: "5ª à 9ª/10ª série",
  ageRange: "Idade aprox. 10–15/16 anos",
  summary:
    "Tipo de escola ainda presente em vários estados alemães, com ênfase prática e proximidade da formação profissional. Pode conduzir à Ausbildung e a qualificações escolares intermediárias. Em Berlim o papel correspondente costuma aparecer dentro de outros modelos.",
};

const AUSBILDUNG: TimelineStage = {
  id: "ausbildung",
  name: "Ausbildung",
  grades: "Formação dual (escola + empresa)",
  ageRange: "Idade aprox. 16+ anos",
  summary:
    "Formação profissional dual que combina aulas na Berufsschule ou OSZ com trabalho remunerado em uma empresa. É uma rota consolidada no mercado alemão e não depende do Gymnasium. Em alguns casos abre portas para Duales Studium ou continuidade acadêmica.",
  anchorHref: "#formacao-profissional",
};

const ENSINO_SUPERIOR: TimelineStage = {
  id: "ensino-superior",
  name: "Universidade / Hochschule",
  grades: "Graduação, Duales Studium ou pós-Abitur",
  ageRange: "Idade aprox. 18+ anos",
  summary:
    "Depois do Abitur, Fachabitur ou qualificações equivalentes, famílias avaliam Universität, Hochschule ou Duales Studium. O ponto de chegada importa menos do que o caminho que a família construiu até aqui. Várias rotas secundárias e profissionais podem chegar a este estágio.",
  anchorHref: "#ensino-superior",
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
