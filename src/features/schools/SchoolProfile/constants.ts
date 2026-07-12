import type { ImportantSchoolFieldPathDetailedV2 } from "@/features/schools/school/constants";

export type ProfileSectionKey =
  | "identification"
  | "pedagogy"
  | "family"
  | "inspection";

export type ProfileSectionConfig = {
  key: ProfileSectionKey;
  heading: string;
  fields: ImportantSchoolFieldPathDetailedV2[];
};

export const PROFILE_SECTIONS: ProfileSectionConfig[] = [
  {
    key: "identification",
    heading: "Identificação",
    fields: [
      "name",
      "schoolNumber",
      "website",
      "classification",
      "level",
      "location.district",
      "location.neighbourhood",
      "location.address",
      "gradesServed",
    ],
  },
  {
    key: "pedagogy",
    heading: "Oferta pedagógica",
    fields: [
      "ganztag",
      "afterSchoolCare",
      "languages",
      "bilingualPrograms",
      "internationalPrograms",
      "welcomeClasses",
      "schoolProfile",
      "pedagogyFocus",
      "inclusionSupport",
    ],
  },
  {
    key: "family",
    heading: "Apoio à família",
    fields: ["familyCommunication", "transitionAfterGrade6"],
  },
  {
    key: "inspection",
    heading: "Inspeção",
    fields: ["inspectionAvailability", "inspectionData", "facilities"],
  },
];

export const profileFieldLabels: Record<
  ImportantSchoolFieldPathDetailedV2,
  string
> = {
  name: "Nome da escola",
  schoolNumber: "Número oficial",
  website: "Site da escola",
  classification: "Tipo de escola",
  level: "Nível escolar",
  "location.district": "Distrito",
  "location.neighbourhood": "Bairro",
  "location.address": "Endereço",
  gradesServed: "Anos atendidos",
  ganztag: "Ganztag",
  afterSchoolCare: "Cuidado no contraturno (Hort/eFöB)",
  languages: "Idiomas",
  bilingualPrograms: "Programas bilíngues",
  internationalPrograms: "Programas internacionais",
  welcomeClasses: "Willkommensklasse",
  schoolProfile: "Perfil da escola",
  pedagogyFocus: "Foco pedagógico",
  inclusionSupport: "Apoio à inclusão",
  transitionAfterGrade6: "Transição após o 6º ano",
  familyCommunication: "Comunicação com famílias",
  inspectionAvailability: "Disponibilidade de inspeção oficial",
  inspectionData: "Dados de inspeção",
  facilities: "Instalações",
};
