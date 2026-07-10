import { Suspense } from "react";

import { SchoolDirectory } from "@/features/schools/SchoolDirectory";
import { getSchoolDirectoryItems } from "@/features/schools/schoolDirectoryData";

export const metadata = {
  title: "Escolas",
  description:
    "Diretório estático de escolas sintéticas para validar busca e filtros.",
};

export default function SchoolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense fallback={<p>Carregando escolas...</p>}>
        <SchoolDirectory schools={getSchoolDirectoryItems()} />
      </Suspense>
    </main>
  );
}
