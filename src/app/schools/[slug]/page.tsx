import { notFound } from "next/navigation";

import { getSchoolBySlug } from "@/features/schools/getSchoolBySlug";
import { SchoolProfile } from "@/features/schools/SchoolProfile";
import { getRealSchools } from "@/features/schools/schoolDirectoryData";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRealSchools().map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) return { title: "Escola não encontrada" };
  const district = school.location.district.value ?? "Berlim";
  return {
    title: `${school.name.value} — Berlin School Guide`,
    description: `Perfil de ${school.name.value} em ${district} com status de evidência em cada informação — o que confirmamos, o que falta e de onde veio.`,
  };
}

export default async function SchoolProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-12">
      <SchoolProfile school={school} />
    </main>
  );
}
