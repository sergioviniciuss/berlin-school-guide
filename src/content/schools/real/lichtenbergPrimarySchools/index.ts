import type {
  FieldEvidence,
  FieldValue,
} from "@/features/evidence/fieldEvidence";
import type { Source } from "@/features/evidence/source";
import type { School } from "@/features/schools/school";

import { inferredFrom } from "./inferredFrom";

const spikeFullReviewDate = "2026-07-10";
const phaseFourAuditDate = "2026-07-11";

type SourceInput = Omit<Source, "dateAccessed"> & { dateAccessed: string };

function source(input: SourceInput): Source {
  return input;
}

function maxDateAccessed(sources: Source[]): string {
  return sources.reduce(
    (max, current) =>
      current.dateAccessed.localeCompare(max) > 0 ? current.dateAccessed : max,
    sources[0]!.dateAccessed,
  );
}

function officialPortraitSource(
  id: string,
  name: string,
  schoolNumber: string,
  dateAccessed = spikeFullReviewDate,
) {
  return source({
    id: `${id}-official-portrait`,
    title: `${name} official Berlin school portrait`,
    url: `https://www.bildung.berlin.de/Schulverzeichnis/Schulportrait.aspx?IDSchulzweig=${id}`,
    type: "official_government",
    reliability: "primary",
    publisher: "Senatsverwaltung für Bildung, Jugend und Familie Berlin",
    dateAccessed,
    notes: `Official Berlin school directory portrait for ${schoolNumber}.`,
  });
}

function schoolWebsiteSource(
  id: string,
  name: string,
  url: string,
  dateAccessed = spikeFullReviewDate,
) {
  return source({
    id,
    title: `${name} official school website`,
    url,
    type: "school_website",
    reliability: "secondary",
    publisher: name,
    dateAccessed,
  });
}

function evidence(sourceId: string, lastChecked: string): FieldEvidence {
  return {
    status: "verified",
    citations: [{ sourceId }],
    lastChecked,
  };
}

function missing(note: string, lastChecked = spikeFullReviewDate): FieldEvidence {
  return {
    status: "missing",
    citations: [],
    note,
    lastChecked,
  };
}

function citedMissing(
  sourceIds: string[],
  note: string,
  lastChecked: string,
): FieldEvidence {
  return {
    status: "missing",
    citations: sourceIds.map((sourceId) => ({ sourceId })),
    note,
    lastChecked,
  };
}

function notApplicable(note: string, lastChecked = spikeFullReviewDate): FieldEvidence {
  return {
    status: "not_applicable",
    citations: [],
    note,
    lastChecked,
  };
}

function field<Value>(
  value: Value | null,
  evidenceValue: FieldEvidence,
): FieldValue<Value> {
  return {
    value,
    evidence: evidenceValue,
  };
}

type BaseSchoolInput = {
  portraitId: string;
  slug: string;
  name: string;
  schoolNumber: string;
  address: string;
  postCodeAndCity: string;
  neighbourhood: string;
  website: string | null;
  district?: string;
  classification?: "public" | "private";
  level?: "primary" | "mixed_with_primary";
  primarySectionDescription?: string;
  gradesServed?: string[];
  portraitDateAccessed?: string;
  languages: string[];
  ganztag?: string;
  offers?: string[];
  sources?: Source[];
  researchStatus?: School["research"]["status"];
  coverageLevel?: School["research"]["coverageLevel"];
  lastResearched?: string;
  lastSourceChecked?: string;
  afterSchoolCare?: FieldValue<string>;
  bilingualPrograms?: FieldValue<string[]>;
  internationalPrograms?: FieldValue<string[]>;
  welcomeClasses?: FieldValue<boolean>;
  schoolProfile?: FieldValue<string>;
  pedagogyFocus?: FieldValue<string[]>;
  inclusionSupport?: FieldValue<string>;
  familyCommunication?: FieldValue<string>;
  inspectionAvailability?: FieldValue<
    School["inspectionAvailability"]["value"]
  >;
  inspectionData?: FieldValue<string>;
  facilities?: FieldValue<string[]>;
  tags?: School["tags"];
  perfilDaEscola?: string;
  qualitativeLastReviewed?: string;
  qualitativeResearchNotes?: string;
};

function primarySchool(input: BaseSchoolInput): School {
  const portrait = input.portraitDateAccessed
    ? officialPortraitSource(
        input.portraitId,
        input.name,
        input.schoolNumber,
        input.portraitDateAccessed,
      )
    : officialPortraitSource(
        input.portraitId,
        input.name,
        input.schoolNumber,
      );
  const directoryEvidence = evidence(portrait.id, portrait.dateAccessed);
  const sources = [portrait, ...(input.sources ?? [])];
  const missingResearch = missing(
    "Information was not found during the real-data spike.",
  );
  const researchStatus = input.researchStatus ?? "directory_only";
  const coverageLevel = input.coverageLevel ?? "directory";
  const afterSchoolCareInferredNote =
    "Valor inferido a partir do modelo Ganztag; contraturno não foi confirmado de forma independente.";
  const offersInferredNote =
    "Perfil inferido a partir das ofertas listadas no retrato oficial; não confirmado de forma independente.";

  return {
    id: input.schoolNumber.toLowerCase(),
    slug: input.slug,
    name: field(input.name, directoryEvidence),
    schoolNumber: field(input.schoolNumber, directoryEvidence),
    website:
      input.website === null
        ? field(null, {
            status: "missing",
            citations: [{ sourceId: portrait.id }],
            note: "O retrato oficial não informa o site da escola.",
            lastChecked: portrait.dateAccessed,
          })
        : field(input.website, directoryEvidence),
    classification: field(input.classification ?? "public", directoryEvidence),
    level: field(input.level ?? "primary", directoryEvidence),
    ...(input.primarySectionDescription !== undefined
      ? {
          primarySectionDescription: field(
            input.primarySectionDescription,
            directoryEvidence,
          ),
        }
      : {}),
    location: {
      district: field(input.district ?? "Lichtenberg", directoryEvidence),
      neighbourhood: field(input.neighbourhood, directoryEvidence),
      address: field(
        `${input.address}, ${input.postCodeAndCity}`,
        directoryEvidence,
      ),
    },
    gradesServed: field(
      input.gradesServed ?? ["1", "2", "3", "4", "5", "6"],
      directoryEvidence,
    ),
    ganztag: input.ganztag
      ? field(input.ganztag, directoryEvidence)
      : field(null, missingResearch),
    afterSchoolCare:
      input.afterSchoolCare ??
      (input.ganztag
        ? field(
            input.ganztag,
            inferredFrom({
              sourceField: "ganztag",
              sourceEvidence: directoryEvidence,
              note: afterSchoolCareInferredNote,
            }),
          )
        : field(null, missingResearch)),
    languages: field(input.languages, directoryEvidence),
    bilingualPrograms:
      input.bilingualPrograms ?? field(null, missingResearch),
    internationalPrograms:
      input.internationalPrograms ?? field(null, missingResearch),
    welcomeClasses: input.welcomeClasses ?? field(null, missingResearch),
    schoolProfile:
      input.schoolProfile ??
      (input.offers?.length
        ? field(
            input.offers.join("; "),
            inferredFrom({
              sourceField: "offers",
              sourceEvidence: directoryEvidence,
              note: offersInferredNote,
            }),
          )
        : field(null, missingResearch)),
    pedagogyFocus:
      input.pedagogyFocus ??
      (input.offers?.length
        ? field(
            input.offers,
            inferredFrom({
              sourceField: "offers",
              sourceEvidence: directoryEvidence,
              note: offersInferredNote,
            }),
          )
        : field(null, missingResearch)),
    inclusionSupport: input.inclusionSupport ?? field(null, missingResearch),
    transitionAfterGrade6: field(null, missingResearch),
    familyCommunication:
      input.familyCommunication ?? field(null, missingResearch),
    inspectionAvailability:
      input.inspectionAvailability ??
      (researchStatus === "directory_only" || coverageLevel === "directory"
        ? field(
            null,
            missing(
              "Inspeção oficial não pesquisada para escola com perfil básico.",
            ),
          )
        : field("not_confirmed", {
            ...directoryEvidence,
            note: "The official portrait was checked, but a specific inspection report was not confirmed for this spike.",
          })),
    inspectionData: input.inspectionData ?? field(null, missingResearch),
    facilities: input.facilities ?? field(null, missingResearch),
    sources,
    research: {
      status: researchStatus,
      coverageLevel,
      lastResearched: input.lastResearched ?? spikeFullReviewDate,
      lastSourceChecked: input.lastSourceChecked ?? maxDateAccessed(sources),
    },
    ...(input.tags !== undefined ? { tags: input.tags } : {}),
    ...(input.perfilDaEscola !== undefined
      ? { perfilDaEscola: input.perfilDaEscola }
      : {}),
    ...(input.qualitativeLastReviewed !== undefined
      ? { qualitativeLastReviewed: input.qualitativeLastReviewed }
      : {}),
    ...(input.qualitativeResearchNotes !== undefined
      ? { qualitativeResearchNotes: input.qualitativeResearchNotes }
      : {}),
  };
}

const adamRiesWebsite = schoolWebsiteSource(
  "adam-ries-website",
  "Adam-Ries-Schule",
  "https://www.adamries.schule/wp/",
);
const adamRiesWelcomeClasses = schoolWebsiteSource(
  "adam-ries-welcome-classes",
  "Adam-Ries-Schule",
  "https://www.adamries.schule/wp/kleinklassen/",
);
const lewTolstoiWebsite = schoolWebsiteSource(
  "lew-tolstoi-website",
  "Lew-Tolstoi-Schule",
  "https://www.lew-tolstoi-schule.de/",
);
const lewTolstoiGanztag = schoolWebsiteSource(
  "lew-tolstoi-ganztag",
  "Lew-Tolstoi-Schule",
  "https://www.lew-tolstoi-schule.de/ganztag/",
  "2026-07-11",
);
const lewTolstoiSesb = schoolWebsiteSource(
  "lew-tolstoi-sesb",
  "Lew-Tolstoi-Schule",
  "https://lew-tolstoi-schule.de/gallery/",
  "2026-07-29",
);
const richardWagnerWebsite = schoolWebsiteSource(
  "richard-wagner-website",
  "Richard-Wagner-Schule",
  "https://www.richard-wagner-grundschule.de/",
);
const richardWagnerGanztag = schoolWebsiteSource(
  "richard-wagner-ganztag",
  "Richard-Wagner-Schule",
  "https://www.richard-wagner-grundschule.de/offener-ganztag/",
);
const richardWagnerInspection = schoolWebsiteSource(
  "richard-wagner-inspection",
  "Richard-Wagner-Schule",
  "https://www.richard-wagner-grundschule.de/unsere-schule/schulinspektion/",
  "2026-07-11",
);
const richardWagnerMusic = schoolWebsiteSource(
  "richard-wagner-music",
  "Richard-Wagner-Schule",
  "https://www.richard-wagner-grundschule.de/unsere-schule/musikbetonung/",
);
const neuenTorWebsite = schoolWebsiteSource(
  "grundschule-am-neuen-tor-website",
  "Grundschule Neues Tor",
  "https://www.neues-tor.de/",
  "2026-09-23",
);
const neuenTorContact = schoolWebsiteSource(
  "grundschule-am-neuen-tor-contact",
  "Grundschule Neues Tor",
  "https://www.neues-tor.de/kontakt/index.php?dynamisch=1",
  "2026-09-23",
);
const robinsonWebsite = schoolWebsiteSource(
  "robinson-schule-website",
  "Robinson-Schule",
  "https://www.robinsonschule-berlin.de/",
  "2026-09-23",
);
const robinsonGanztag = schoolWebsiteSource(
  "robinson-schule-ganztag",
  "Robinson-Schule",
  "https://www.robinsonschule-berlin.de/ganztag/",
  "2026-09-23",
);
const robinsonProfile = schoolWebsiteSource(
  "robinson-schule-profile",
  "Robinson-Schule",
  "https://www.robinsonschule-berlin.de/schule/",
  "2026-09-23",
);

export const realLichtenbergPrimarySchools = [
  primarySchool({
    portraitId: "29355",
    slug: "adam-ries-schule",
    name: "Adam-Ries-Schule",
    schoolNumber: "11G06",
    address: "Alt-Friedrichsfelde 66",
    postCodeAndCity: "10315 Berlin",
    neighbourhood: "Friedrichsfelde",
    website: "https://www.adamries.schule",
    languages: ["Englisch", "Französisch"],
    ganztag: "Offene Ganztagbetreuung (OGB)",
    offers: [
      "Lerngruppen für Neuzugänge ohne Deutschkenntnisse",
      "Profil Informationstechnik",
      "Schulstation",
      "Sonderpädagogische Kleinklassen mit Förderschwerpunkt Autismus",
      "zweisprachige Alphabetisierung und Erziehung deutsch-türkisch",
    ],
    sources: [adamRiesWebsite, adamRiesWelcomeClasses],
    researchStatus: "profile_ready",
    coverageLevel: "detailed",
    lastResearched: phaseFourAuditDate,
    lastSourceChecked: phaseFourAuditDate,
    bilingualPrograms: field(
      ["Deutsch-Türkisch"],
      evidence("29355-official-portrait", spikeFullReviewDate),
    ),
    welcomeClasses: field(
      true,
      evidence("29355-official-portrait", spikeFullReviewDate),
    ),
    schoolProfile: field(
      "Profil Informationstechnik; Schulstation; sonderpädagogische Kleinklassen mit Förderschwerpunkt Autismus; zweisprachige Alphabetisierung und Erziehung deutsch-türkisch.",
      evidence("29355-official-portrait", spikeFullReviewDate),
    ),
    pedagogyFocus: field(
      [
        "Informationstechnik",
        "Schulanfangsphase mit jahrgangsbezogenen und jahrgangsübergreifenden Lerngruppen",
        "Willkommensklassen",
      ],
      evidence("29355-official-portrait", spikeFullReviewDate),
    ),
    inclusionSupport: field(
      "Sonderpädagogische Kleinklassen mit Förderschwerpunkt Autismus are listed in the official portrait.",
      evidence("29355-official-portrait", spikeFullReviewDate),
    ),
    inspectionAvailability: field<
      School["inspectionAvailability"]["value"]
    >(
      null,
      missing(
        "Inspeção oficial não pesquisada para esta escola durante a auditoria de perfil detalhado.",
        phaseFourAuditDate,
      ),
    ),
    inspectionData: field<string>(
      null,
      missing(
        "Dados de inspeção não encontrados durante a auditoria de perfil detalhado.",
        phaseFourAuditDate,
      ),
    ),
  }),
  primarySchool({
    portraitId: "29201",
    slug: "bernhard-grzimek-schule",
    name: "Bernhard-Grzimek-Schule",
    schoolNumber: "11G11",
    address: "Sewanstr. 184",
    postCodeAndCity: "10319 Berlin",
    neighbourhood: "Friedrichsfelde",
    website: "https://11g11.de/startseite.html",
    languages: ["Englisch"],
    ganztag: "Offene Ganztagbetreuung (OGB)",
    offers: [
      "mathematisch-naturwissenschaftliches Profil",
      "Regionale Begabtengruppen am Nachmittag",
      "Umwelterziehung",
    ],
    researchStatus: "directory_only",
    coverageLevel: "directory",
    perfilDaEscola:
      "A Bernhard-Grzimek-Schule fica em Friedrichsfelde, Lichtenberg. O cadastro oficial da escola informa inglês, Offene Ganztagbetreuung (OGB), um perfil matemático-natural (mathematisch-naturwissenschaftliches Profil), grupos regionais de talentos à tarde e educação ambiental. Esse perfil MINT aparece só na lista de ofertas do cadastro oficial. Até o momento, não houve confirmação independente desse perfil MINT, da inspeção ou dos detalhes de implementação além dessa fonte.",
    qualitativeLastReviewed: "2026-07-29",
  }),
  primarySchool({
    portraitId: "28986",
    slug: "buergermeister-ziethen-schule",
    name: "Bürgermeister-Ziethen-Schule",
    schoolNumber: "11G09",
    address: "Massower Str. 39",
    postCodeAndCity: "10315 Berlin",
    neighbourhood: "Friedrichsfelde",
    website: "https://www.buezie.de",
    languages: ["Englisch"],
    ganztag: "Offene Ganztagbetreuung (OGB)",
    offers: ["Umwelterziehung"],
    researchStatus: "directory_only",
    coverageLevel: "directory",
  }),
  primarySchool({
    portraitId: "29200",
    slug: "friedrichsfelder-schule",
    name: "Friedrichsfelder Schule",
    schoolNumber: "11G23",
    address: "Lincolnstr. 67",
    postCodeAndCity: "10315 Berlin",
    neighbourhood: "Friedrichsfelde",
    website: "https://friedrichsfelder-schule.de",
    languages: ["Englisch"],
    ganztag: "Offene Ganztagbetreuung (OGB)",
    offers: [
      "Schulanfangsphase mit jahrgangsbezogenen Lerngruppen",
      "Schulanfangsphase mit jahrgangsübergreifenden Lerngruppen",
    ],
    researchStatus: "directory_only",
    coverageLevel: "directory",
    perfilDaEscola:
      "A Friedrichsfelder Schule fica em Friedrichsfelde, Lichtenberg. Segundo o diretório oficial de Berlim, constam inglês, Offene Ganztagbetreuung (OGB) e a organização da Schulanfangsphase em grupos por ano e em grupos mistos. Fora dessas anotações do diretório, até o momento, não houve confirmação independente de perfil especializado, bilinguismo ou inspeção.",
    qualitativeLastReviewed: "2026-07-29",
  }),
  primarySchool({
    portraitId: "29773",
    slug: "grundschule-am-traenkegraben",
    name: "Grundschule am Tränkegraben",
    schoolNumber: "11G35",
    address: "Sewanstr. 41",
    postCodeAndCity: "10319 Berlin",
    neighbourhood: "Friedrichsfelde",
    website: "https://www.gs-traenkegraben.de",
    languages: ["Englisch", "Französisch"],
    researchStatus: "directory_only",
    coverageLevel: "directory",
  }),
  primarySchool({
    portraitId: "29699",
    slug: "schmetterlings-grundschule",
    name: "Schmetterlings-Grundschule",
    schoolNumber: "11G31",
    address: "Dolgenseestr. 60",
    postCodeAndCity: "10319 Berlin",
    neighbourhood: "Friedrichsfelde",
    website: "https://www.schmetterlings-grundschule.de",
    languages: ["Englisch"],
    ganztag: "Offene Ganztagbetreuung (OGB)",
    researchStatus: "directory_only",
    coverageLevel: "directory",
  }),
  primarySchool({
    portraitId: "29352",
    slug: "karlshorster-schule",
    name: "Karlshorster Schule",
    schoolNumber: "11G13",
    address: "Lisztstr. 6",
    postCodeAndCity: "10318 Berlin",
    neighbourhood: "Karlshorst",
    website: "https://www.karlshorster-schule.de",
    languages: ["Englisch"],
    ganztag: "Offene Ganztagbetreuung (OGB)",
    offers: ["gesundheitsbetontes Profil"],
    researchStatus: "directory_only",
    coverageLevel: "directory",
  }),
  primarySchool({
    portraitId: "28987",
    slug: "lew-tolstoi-schule",
    name: "Lew-Tolstoi-Schule",
    schoolNumber: "11G12",
    address: "Römerweg 120",
    postCodeAndCity: "10318 Berlin",
    neighbourhood: "Karlshorst",
    website: "https://www.lew-tolstoi-schule.de",
    languages: ["Englisch", "Deutsch", "Russisch"],
    ganztag: "Gebundener Ganztagbetrieb (GGB)",
    offers: ["Staatliche Europa-Schule Berlin Deutsch/Russisch"],
    sources: [lewTolstoiWebsite, lewTolstoiGanztag, lewTolstoiSesb],
    researchStatus: "profile_ready",
    coverageLevel: "detailed",
    lastResearched: phaseFourAuditDate,
    lastSourceChecked: lewTolstoiSesb.dateAccessed,
    afterSchoolCare: field(
      "Ganztag information and eFöB coordination are published on the school website.",
      evidence("lew-tolstoi-ganztag", lewTolstoiGanztag.dateAccessed),
    ),
    bilingualPrograms: field(
      ["Deutsch-Russisch"],
      evidence("28987-official-portrait", spikeFullReviewDate),
    ),
    internationalPrograms: field(
      ["Staatliche Europa-Schule Berlin Deutsch/Russisch"],
      evidence("28987-official-portrait", spikeFullReviewDate),
    ),
    welcomeClasses: field<boolean>(
      null,
      missing(
        "No welcome-class information was found in the checked official portrait or school pages.",
      ),
    ),
    schoolProfile: field(
      "Staatliche Europa-Schule Berlin with Deutsch/Russisch focus.",
      evidence("28987-official-portrait", spikeFullReviewDate),
    ),
    pedagogyFocus: field(
      ["Deutsch-Russisch", "Europaschule", "Sprachen"],
      evidence("28987-official-portrait", spikeFullReviewDate),
    ),
    familyCommunication: field(
      "The school website publishes contact information including school office, Hort, and eFöB coordination.",
      evidence("lew-tolstoi-website", lewTolstoiWebsite.dateAccessed),
    ),
    inspectionAvailability: field<
      School["inspectionAvailability"]["value"]
    >(
      null,
      missing(
        "Inspeção oficial não pesquisada para esta escola durante a auditoria de perfil detalhado.",
        phaseFourAuditDate,
      ),
    ),
    inspectionData: field<string>(
      null,
      missing(
        "Dados de inspeção não encontrados durante a auditoria de perfil detalhado.",
        phaseFourAuditDate,
      ),
    ),
    tags: [
      {
        id: "bilingual-program",
        confidence: "confirmed_multi_source",
        citations: [
          { sourceId: "lew-tolstoi-sesb" },
          { sourceId: "28987-official-portrait" },
        ],
      },
    ],
    perfilDaEscola:
      "A Lew-Tolstoi-Schule, em Karlshorst, é uma Staatliche Europa-Schule Berlin (SESB) com eixo Deutsch/Russisch: as informações oficiais disponíveis e o site descrevem ensino bilíngue contínuo desde o 1º ano em grupos integrados. O site também explica o modelo SESB e critérios de ingresso por competência linguística. Há Gebundener Ganztagbetrieb (GGB) com informações de Hort/eFöB no site. Até o momento, não houve confirmação independente sobre inspeção oficial neste perfil. Não foi possível confirmar, com evidências suficientes, características sobre a participação da comunidade escolar além das informações oficiais disponíveis.",
    qualitativeLastReviewed: "2026-07-29",
    qualitativeResearchNotes:
      "active-school-community withheld 2026-07-29: Eltern/Förderverein corroboration found, but live research did not yield ≥2 independent community venues meeting Community Source Independence. See docs/research/PHASE14_COMMUNITY_TRIANGULATION.md.",
  }),
  primarySchool({
    portraitId: "29344",
    slug: "richard-wagner-schule",
    name: "Richard-Wagner-Schule",
    schoolNumber: "11G14",
    address: "Ehrenfelsstr. 36",
    postCodeAndCity: "10318 Berlin",
    neighbourhood: "Karlshorst",
    website: "https://www.richard-wagner-grundschule.de",
    languages: ["Englisch"],
    ganztag: "Offene Ganztagbetreuung (OGB)",
    offers: ["Hochbegabtenförderung", "musikbetontes Profil"],
    sources: [
      richardWagnerWebsite,
      richardWagnerGanztag,
      richardWagnerInspection,
      richardWagnerMusic,
    ],
    researchStatus: "profile_ready",
    coverageLevel: "detailed",
    lastResearched: phaseFourAuditDate,
    lastSourceChecked: richardWagnerInspection.dateAccessed,
    afterSchoolCare: field(
      "The school website identifies Socius - Die Bildungspartner as the Hort contact for open all-day care.",
      evidence("richard-wagner-ganztag", richardWagnerGanztag.dateAccessed),
    ),
    schoolProfile: field(
      "Musikbetonte Grundschule in Berlin Karlshorst.",
      evidence("richard-wagner-website", richardWagnerWebsite.dateAccessed),
    ),
    pedagogyFocus: field(
      ["Musikbetonung", "Hochbegabtenförderung"],
      evidence("29344-official-portrait", spikeFullReviewDate),
    ),
    familyCommunication: field(
      "The school website publishes contact pages for the school and after-school partner.",
      evidence("richard-wagner-website", richardWagnerWebsite.dateAccessed),
    ),
    inspectionAvailability: field(
      "available",
      evidence("richard-wagner-inspection", richardWagnerInspection.dateAccessed),
    ),
    inspectionData: field(
      "The school website links a short school-inspection report from 2018 and an older report from 2007.",
      evidence("richard-wagner-inspection", richardWagnerInspection.dateAccessed),
    ),
    facilities: field(
      ["Nachmittagsbetrieb / Hort contact", "music-focused school profile"],
      evidence("richard-wagner-ganztag", richardWagnerGanztag.dateAccessed),
    ),
    tags: [
      {
        id: "arts-music-focus",
        confidence: "confirmed_multi_source",
        citations: [
          { sourceId: "richard-wagner-music" },
          { sourceId: "29344-official-portrait" },
        ],
      },
    ],
    perfilDaEscola:
      "A Richard-Wagner-Schule, em Karlshorst, apresenta-se como Grundschule com ênfase musical: o site dedica uma página à Musikbetonung e o cadastro oficial da escola informa musikbetontes Profil. Também consta Hochbegabtenförderung nas informações oficiais disponíveis — sem classificação adicional de modelo pedagógico especial, pois o campo factual não basta sozinho. Há Offene Ganztagbetreuung (OGB) com parceiro Socius no Hort; o site liga relatórios de inspeção (2018 e 2007). Inglês aparece como língua no diretório.",
    qualitativeLastReviewed: "2026-07-29",
  }),
  primarySchool({
    portraitId: "29799",
    slug: "seepark-grundschule",
    name: "Seepark-Grundschule",
    schoolNumber: "11G37",
    address: "Blockdammweg 60",
    postCodeAndCity: "10318 Berlin",
    neighbourhood: "Karlshorst",
    website: "https://37-grundschule-lichtenberg.de",
    languages: ["Englisch", "Französisch"],
    researchStatus: "directory_only",
    coverageLevel: "directory",
    perfilDaEscola:
      "A Seepark-Grundschule fica em Karlshorst, Lichtenberg. As informações oficiais disponíveis indicam inglês e francês como línguas; o modelo de Ganztag e ofertas específicas não aparecem nesse registro. Até o momento, não houve confirmação independente de contraturno, perfil pedagógico ou inspeção além do cadastro do Senado.",
    qualitativeLastReviewed: "2026-07-29",
  }),
  primarySchool({
    portraitId: "30279",
    slug: "grundschule-am-neuen-tor",
    name: "Grundschule Neues Tor",
    schoolNumber: "01G05",
    address: "Hannoversche Str. 20",
    postCodeAndCity: "10115 Berlin",
    neighbourhood: "Mitte",
    district: "Mitte",
    website: "https://www.neues-tor.de",
    classification: "public",
    level: "primary",
    languages: ["Englisch"],
    ganztag: "Gebundener Ganztagbetrieb (GGB)",
    portraitDateAccessed: "2026-09-23",
    sources: [neuenTorWebsite, neuenTorContact],
    researchStatus: "profile_ready",
    coverageLevel: "detailed",
    lastResearched: "2026-09-23",
    lastSourceChecked: "2026-09-23",
    afterSchoolCare: field(
      "The school website contact page lists Atelier (Hort) from 16:00 with tjfbg as the after-school partner.",
      evidence("grundschule-am-neuen-tor-contact", "2026-09-23"),
    ),
    bilingualPrograms: field(
      ["Deutsch-Portugiesisch"],
      evidence("30279-official-portrait", "2026-09-23"),
    ),
    internationalPrograms: field(
      ["Staatliche Europa-Schule Berlin Deutsch/Portugiesisch"],
      evidence("30279-official-portrait", "2026-09-23"),
    ),
    schoolProfile: field(
      "Staatliche Europa-Schule Berlin Deutsch/Portugiesisch with a parallel Regelschule track; the school website describes gebundener Ganztag for the SESB branch and offener Ganztag for the Regelzug.",
      evidence("grundschule-am-neuen-tor-website", "2026-09-23"),
    ),
    pedagogyFocus: field(
      [
        "Staatliche Europa-Schule Berlin Deutsch/Portugiesisch",
        "bilingualer Unterricht",
      ],
      evidence("30279-official-portrait", "2026-09-23"),
    ),
    familyCommunication: field(
      "The school website publishes secretariat office hours and tjfbg Hort contact numbers.",
      evidence("grundschule-am-neuen-tor-contact", "2026-09-23"),
    ),
    inspectionAvailability: field(
      "available",
      evidence("30279-official-portrait", "2026-09-23"),
    ),
    inspectionData: field(
      "The official Berlin school portrait lists Schulinspektion reports published on 01.07.2015 and 01.05.2018.",
      evidence("30279-official-portrait", "2026-09-23"),
    ),
    tags: [
      {
        id: "bilingual-program",
        confidence: "confirmed_multi_source",
        citations: [
          { sourceId: "grundschule-am-neuen-tor-website" },
          { sourceId: "30279-official-portrait" },
        ],
      },
    ],
    perfilDaEscola:
      "A Grundschule Neues Tor fica em Mitte, perto da Charité. O cadastro oficial e o site descrevem uma Staatliche Europa-Schule Berlin (SESB) Deutsch/Portugiesisch em dois turnos, ao lado de um Regelschulzug no mesmo prédio. O inglês aparece como primeira língua estrangeira no retrato oficial. O modelo de Ganztag no cadastro é Gebundener Ganztagbetrieb (GGB); o site detalha Ganztag vinculado no ramo SESB e aberto no Regelschulzug, com Atelier (Hort) a partir das 16h em parceria com a tjfbg. O retrato oficial lista relatórios de inspeção publicados em 2015 e 2018.",
    qualitativeLastReviewed: "2026-09-23",
  }),
  primarySchool({
    portraitId: "30451",
    slug: "robinson-schule",
    name: "Robinson-Schule",
    schoolNumber: "11G08",
    address: "Wönnichstr. 7",
    postCodeAndCity: "10317 Berlin",
    neighbourhood: "Rummelsburg",
    website: "https://www.robinsonschule-berlin.de",
    classification: "public",
    level: "primary",
    languages: ["Englisch"],
    ganztag: "Gebundener Ganztagbetrieb (GGB)",
    gradesServed: ["1", "2", "3", "4", "5", "6"],
    portraitDateAccessed: "2026-09-23",
    sources: [robinsonWebsite, robinsonGanztag, robinsonProfile],
    researchStatus: "profile_ready",
    coverageLevel: "detailed",
    lastResearched: "2026-09-23",
    lastSourceChecked: "2026-09-23",
    afterSchoolCare: field(
      "The school website describes eFöB in bound all-day care, with optional early care from 06:00 and late care until 18:00 plus holiday Hort.",
      evidence("robinson-schule-ganztag", "2026-09-23"),
    ),
    schoolProfile: field(
      "The school website describes participation in the Berlin FlexGanztag trial as a bound all-day Grundschule near Bahnhof Lichtenberg.",
      evidence("robinson-schule-profile", "2026-09-23"),
    ),
    pedagogyFocus: field(
      ["gesundheitsbetontes Profil", "medienbetontes Profil"],
      evidence("30451-official-portrait", "2026-09-23"),
    ),
    familyCommunication: field(
      "The school website publishes phone and email contacts on the homepage and describes the iServ parent platform on the Schule page.",
      evidence("robinson-schule-website", "2026-09-23"),
    ),
    facilities: field(
      [
        "Bibliothek",
        "zwei Computerräume",
        "Medienecken in einigen Unterrichtsräumen",
        "Laptop-Klasse",
      ],
      evidence("30451-official-portrait", "2026-09-23"),
    ),
    inspectionAvailability: field(
      "available",
      evidence("30451-official-portrait", "2026-09-23"),
    ),
    inspectionData: field(
      "The official Berlin school portrait lists Schulinspektion reports published on 01.11.2012 and 01.12.2018.",
      evidence("30451-official-portrait", "2026-09-23"),
    ),
    perfilDaEscola:
      "A Robinson-Schule fica em Rummelsburg, Lichtenberg, perto da estação Lichtenberg. O cadastro oficial informa inglês, Gebundener Ganztagbetrieb (GGB), perfil de saúde (gesundheitsbetontes Profil) e perfil de mídia (medienbetontes Profil). O site descreve a participação no Schulversuch FlexGanztag, com aulas até 14h30, FlexModule até 16h e eFöB/Hort com opções de 6h às 18h. As turmas vão do 1º ao 6º ano. O retrato oficial lista relatórios de inspeção de 2012 e 2018.",
    qualitativeLastReviewed: "2026-09-23",
  }),
] satisfies School[];
