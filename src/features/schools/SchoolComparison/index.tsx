"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ComparisonLimitations } from "@/features/schools/ComparisonLimitations";
import { ComparisonMobile } from "@/features/schools/ComparisonMobile";
import { ComparisonTable } from "@/features/schools/ComparisonTable";
import { writeStoredCompareSlugs } from "@/features/schools/compareSelection";
import {
  COMPARE_PAGE_PARAM,
  COMPARE_PARAM,
  parseCompareSlugs,
} from "@/features/schools/parseCompareSlugs";
import { resolveCompareSchools } from "@/features/schools/resolveCompareSchools";

export function SchoolComparison() {
  const searchParams = useSearchParams();
  const slugs = parseCompareSlugs(searchParams.get(COMPARE_PAGE_PARAM));
  const { schools, skippedSlugs } = resolveCompareSchools(slugs);
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  useEffect(() => {
    writeStoredCompareSlugs(slugs);
  }, [slugs]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold text-neutral-950">Comparar</h1>
        <p className="mt-2 text-base text-neutral-700">
          Critérios lado a lado para preparar perguntas — sem ranking de
          qualidade.
        </p>
      </header>

      {skippedSlugs.length > 0 ? (
        <p
          role="status"
          className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800"
        >
          Não encontramos: {skippedSlugs.join(", ")}. Essas escolas foram
          ignoradas.
        </p>
      ) : null}

      {schools.length < 2 ? (
        <CompareEmptyState />
      ) : (
        <>
          <ComparisonLimitations />
          <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/schools?${COMPARE_PARAM}=${slugs.join(",")}`}
              className="min-h-11 inline-flex items-center text-sm font-medium text-blue-700 underline hover:opacity-90"
            >
              Editar seleção
            </Link>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-neutral-900">
              <input
                type="checkbox"
                checked={showDifferencesOnly}
                onChange={(event) =>
                  setShowDifferencesOnly(event.target.checked)
                }
                className="size-4 rounded border-neutral-300"
              />
              Mostrar apenas diferenças
            </label>
          </div>
          <div className="hidden lg:block">
            <ComparisonTable
              schools={schools}
              selectedSlugs={slugs}
              showDifferencesOnly={showDifferencesOnly}
            />
          </div>
          <div className="lg:hidden">
            <ComparisonMobile
              schools={schools}
              selectedSlugs={slugs}
              showDifferencesOnly={showDifferencesOnly}
            />
          </div>
        </>
      )}
    </div>
  );
}

function CompareEmptyState() {
  return (
    <section
      aria-labelledby="compare-empty-heading"
      className="rounded-lg border border-neutral-200 bg-white p-8 text-center"
    >
      <h2
        id="compare-empty-heading"
        className="text-xl font-semibold text-neutral-950"
      >
        Selecione pelo menos duas escolas
      </h2>
      <p className="mt-2 text-sm text-neutral-700">
        Use o diretório para selecionar de 2 a 3 escolas e voltar aqui para
        comparar critérios com transparência.
      </p>
      <Button asChild className="mt-6 min-h-11">
        <Link href="/schools">Ir para o diretório de escolas</Link>
      </Button>
    </section>
  );
}
