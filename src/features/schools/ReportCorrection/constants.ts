export const SCHOOL_QUERY_PARAM = "school";

export const CORRECTION_EMAIL =
  process.env.NEXT_PUBLIC_CORRECTION_EMAIL ?? "contato@berlinschoolguide.de";

export const REPORT_COPY = {
  h1: "Sugerir correção",
  scope:
    "Inclua problemas em dados factuais, características (tags) e no texto de Perfil da escola.",
  missingSchool:
    "Não encontramos essa escola no link. Descreva o nome da escola no e-mail.",
  mailtoBlocked:
    "Não foi possível abrir o e-mail. Copie o endereço de contato da página e envie a sugestão manualmente.",
  primaryAction: "Enviar por e-mail",
} as const;
