type EditorialNarrativeProps = {
  text?: string;
};

export function EditorialNarrative({ text }: EditorialNarrativeProps) {
  if (!text) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-950">Perfil da escola</h2>
      <p className="mt-4 text-base text-neutral-900">{text}</p>
    </section>
  );
}
