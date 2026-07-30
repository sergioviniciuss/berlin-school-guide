"use client";

import { useSearchParams } from "next/navigation";

import { getSchoolBySlug } from "@/features/schools/getSchoolBySlug";

import {
  CORRECTION_EMAIL,
  REPORT_COPY,
  SCHOOL_QUERY_PARAM,
} from "./constants";

function buildMailtoHref(schoolName: string | undefined, slug: string | null) {
  if (schoolName && slug) {
    const subject = encodeURIComponent(
      `Sugestão de correção: ${schoolName} (${slug})`,
    );
    const body = encodeURIComponent(
      `Escola: ${schoolName}\nSlug: ${slug}\n\nDescreva o problema (dados factuais, características/tags ou Perfil da escola):\n`,
    );
    return `mailto:${CORRECTION_EMAIL}?subject=${subject}&body=${body}`;
  }

  const subject = encodeURIComponent("Sugestão de correção");
  const body = encodeURIComponent(
    "Escola: (informe o nome da escola)\n\nDescreva o problema (dados factuais, características/tags ou Perfil da escola):\n",
  );
  return `mailto:${CORRECTION_EMAIL}?subject=${subject}&body=${body}`;
}

export function ReportCorrection() {
  const slug = useSearchParams().get(SCHOOL_QUERY_PARAM);
  const school = slug ? getSchoolBySlug(slug) : undefined;
  const schoolName = school?.name.value;
  const mailtoHref = buildMailtoHref(
    typeof schoolName === "string" ? schoolName : undefined,
    school ? slug : null,
  );

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold text-neutral-950">
          {REPORT_COPY.h1}
        </h1>
        <p className="text-base text-neutral-700">{REPORT_COPY.scope}</p>
      </header>

      {school && typeof schoolName === "string" ? (
        <p className="text-base text-neutral-900">Escola: {schoolName}</p>
      ) : (
        <p className="text-base text-neutral-800" role="status">
          {REPORT_COPY.missingSchool}
        </p>
      )}

      <div className="space-y-2">
        <a
          href={mailtoHref}
          className="inline-flex min-h-11 items-center text-base font-medium text-blue-700 underline hover:opacity-90"
        >
          {REPORT_COPY.primaryAction}
        </a>
        <p className="text-sm text-neutral-600">
          {REPORT_COPY.mailtoBlocked}{" "}
          <span className="font-medium text-neutral-800">
            {CORRECTION_EMAIL}
          </span>
        </p>
      </div>
    </div>
  );
}
