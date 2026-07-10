import type {
  FieldEvidence,
  FieldValue,
} from "@/features/evidence/fieldEvidence";
import type { Source } from "@/features/evidence/source";
import type { School } from "@/features/schools/school";

const checkedAt = "2026-07-10";

type SourceInput = Omit<Source, "dateAccessed">;

function source(input: SourceInput): Source {
  return {
    ...input,
    dateAccessed: checkedAt,
  };
}

function officialPortraitSource(
  id: string,
  name: string,
  schoolNumber: string,
) {
  return source({
    id: `${id}-official-portrait`,
    title: `${name} official Berlin school portrait`,
    url: `https://www.bildung.berlin.de/Schulverzeichnis/Schulportrait.aspx?IDSchulzweig=${id}`,
    type: "official_government",
    reliability: "primary",
    publisher: "Senatsverwaltung für Bildung, Jugend und Familie Berlin",
    notes: `Official Berlin school directory portrait for ${schoolNumber}.`,
  });
}

function schoolWebsiteSource(id: string, name: string, url: string) {
  return source({
    id,
    title: `${name} official school website`,
    url,
    type: "school_website",
    reliability: "secondary",
    publisher: name,
  });
}

function evidence(sourceId: string): FieldEvidence {
  return {
    status: "verified",
    citations: [{ sourceId }],
    lastChecked: checkedAt,
  };
}

function missing(note: string): FieldEvidence {
  return {
    status: "missing",
    citations: [],
    note,
    lastChecked: checkedAt,
  };
}

function notApplicable(note: string): FieldEvidence {
  return {
    status: "not_applicable",
    citations: [],
    note,
    lastChecked: checkedAt,
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
  website: string;
  languages: string[];
  ganztag?: string;
  offers?: string[];
  sources?: Source[];
  researchStatus?: School["research"]["status"];
  coverageLevel?: School["research"]["coverageLevel"];
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
};

function primarySchool(input: BaseSchoolInput): School {
  const portrait = officialPortraitSource(
    input.portraitId,
    input.name,
    input.schoolNumber,
  );
  const directoryEvidence = evidence(portrait.id);
  const sources = [portrait, ...(input.sources ?? [])];
  const missingResearch = missing(
    "Information was not found during the real-data spike.",
  );

  return {
    id: input.schoolNumber.toLowerCase(),
    slug: input.slug,
    name: field(input.name, directoryEvidence),
    schoolNumber: field(input.schoolNumber, directoryEvidence),
    website: field(input.website, directoryEvidence),
    classification: field("public", directoryEvidence),
    level: field("primary", directoryEvidence),
    location: {
      district: field("Lichtenberg", directoryEvidence),
      neighbourhood: field(input.neighbourhood, directoryEvidence),
      address: field(
        `${input.address}, ${input.postCodeAndCity}`,
        directoryEvidence,
      ),
    },
    gradesServed: field(["1", "2", "3", "4", "5", "6"], directoryEvidence),
    ganztag: input.ganztag
      ? field(input.ganztag, directoryEvidence)
      : field(null, missingResearch),
    afterSchoolCare:
      input.afterSchoolCare ??
      (input.ganztag
        ? field(input.ganztag, directoryEvidence)
        : field(null, missingResearch)),
    languages: field(input.languages, directoryEvidence),
    bilingualPrograms:
      input.bilingualPrograms ??
      field(
        [],
        notApplicable(
          "No bilingual program was identified in the checked official sources.",
        ),
      ),
    internationalPrograms:
      input.internationalPrograms ??
      field(
        [],
        notApplicable(
          "No international program was identified in the checked official sources.",
        ),
      ),
    welcomeClasses: input.welcomeClasses ?? field(null, missingResearch),
    schoolProfile:
      input.schoolProfile ??
      (input.offers?.length
        ? field(input.offers.join("; "), directoryEvidence)
        : field(null, missingResearch)),
    pedagogyFocus:
      input.pedagogyFocus ??
      (input.offers?.length
        ? field(input.offers, directoryEvidence)
        : field(null, missingResearch)),
    inclusionSupport: input.inclusionSupport ?? field(null, missingResearch),
    transitionAfterGrade6: field(null, missingResearch),
    familyCommunication:
      input.familyCommunication ?? field(null, missingResearch),
    inspectionAvailability:
      input.inspectionAvailability ??
      field("not_confirmed", {
        ...directoryEvidence,
        note: "The official portrait was checked, but a specific inspection report was not confirmed for this spike.",
      }),
    inspectionData: input.inspectionData ?? field(null, missingResearch),
    facilities: input.facilities ?? field(null, missingResearch),
    sources,
    research: {
      status: input.researchStatus ?? "directory_only",
      coverageLevel: input.coverageLevel ?? "directory",
      lastResearched: checkedAt,
      lastSourceChecked: checkedAt,
    },
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
);
const richardWagnerMusic = schoolWebsiteSource(
  "richard-wagner-music",
  "Richard-Wagner-Schule",
  "https://www.richard-wagner-grundschule.de/unsere-schule/musikbetonung/",
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
    researchStatus: "in_research",
    coverageLevel: "detailed",
    bilingualPrograms: field(
      ["Deutsch-Türkisch"],
      evidence("29355-official-portrait"),
    ),
    welcomeClasses: field(true, evidence("29355-official-portrait")),
    schoolProfile: field(
      "Profil Informationstechnik; Schulstation; sonderpädagogische Kleinklassen mit Förderschwerpunkt Autismus; zweisprachige Alphabetisierung und Erziehung deutsch-türkisch.",
      evidence("29355-official-portrait"),
    ),
    pedagogyFocus: field(
      [
        "Informationstechnik",
        "Schulanfangsphase mit jahrgangsbezogenen und jahrgangsübergreifenden Lerngruppen",
        "Willkommensklassen",
      ],
      evidence("29355-official-portrait"),
    ),
    inclusionSupport: field(
      "Sonderpädagogische Kleinklassen mit Förderschwerpunkt Autismus are listed in the official portrait.",
      evidence("29355-official-portrait"),
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
    sources: [lewTolstoiWebsite, lewTolstoiGanztag],
    researchStatus: "in_research",
    coverageLevel: "detailed",
    afterSchoolCare: field(
      "Ganztag information and eFöB coordination are published on the school website.",
      evidence("lew-tolstoi-ganztag"),
    ),
    bilingualPrograms: field(
      ["Deutsch-Russisch"],
      evidence("28987-official-portrait"),
    ),
    internationalPrograms: field(
      ["Staatliche Europa-Schule Berlin Deutsch/Russisch"],
      evidence("28987-official-portrait"),
    ),
    welcomeClasses: field<boolean>(
      null,
      missing(
        "No welcome-class information was found in the checked official portrait or school pages.",
      ),
    ),
    schoolProfile: field(
      "Staatliche Europa-Schule Berlin with Deutsch/Russisch focus.",
      evidence("28987-official-portrait"),
    ),
    pedagogyFocus: field(
      ["Deutsch-Russisch", "Europaschule", "Sprachen"],
      evidence("28987-official-portrait"),
    ),
    familyCommunication: field(
      "The school website publishes contact information including school office, Hort, and eFöB coordination.",
      evidence("lew-tolstoi-website"),
    ),
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
    researchStatus: "in_research",
    coverageLevel: "detailed",
    afterSchoolCare: field(
      "The school website identifies Socius - Die Bildungspartner as the Hort contact for open all-day care.",
      evidence("richard-wagner-ganztag"),
    ),
    schoolProfile: field(
      "Musikbetonte Grundschule in Berlin Karlshorst.",
      evidence("richard-wagner-website"),
    ),
    pedagogyFocus: field(
      ["Musikbetonung", "Hochbegabtenförderung"],
      evidence("29344-official-portrait"),
    ),
    familyCommunication: field(
      "The school website publishes contact pages for the school and after-school partner.",
      evidence("richard-wagner-website"),
    ),
    inspectionAvailability: field(
      "available",
      evidence("richard-wagner-inspection"),
    ),
    inspectionData: field(
      "The school website links a short school-inspection report from 2018 and an older report from 2007.",
      evidence("richard-wagner-inspection"),
    ),
    facilities: field(
      ["Nachmittagsbetrieb / Hort contact", "music-focused school profile"],
      evidence("richard-wagner-ganztag"),
    ),
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
  }),
] satisfies School[];
