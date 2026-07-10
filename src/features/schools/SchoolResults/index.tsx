import { SchoolCard } from "@/features/schools/SchoolCard";
import type { SchoolDirectoryItem } from "@/features/schools/filterSchools/types";

type SchoolResultsProps = {
  schools: SchoolDirectoryItem[];
};

export function SchoolResults({ schools }: SchoolResultsProps) {
  if (schools.length === 0) {
    return (
      <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-neutral-950">
          Nenhuma escola encontrada
        </h2>
        <p className="mt-2 text-neutral-700">
          Ajuste a busca ou remova alguns filtros para ver mais resultados.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4" aria-label="Resultados de escolas">
      {schools.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </section>
  );
}
