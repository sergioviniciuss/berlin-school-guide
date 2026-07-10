import M2SmokeGuide from "@/content/guides/m2-smoke.mdx";

export const metadata = {
  title: "Página MDX de validação",
};

export default function M2SmokeGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <M2SmokeGuide />
    </main>
  );
}
