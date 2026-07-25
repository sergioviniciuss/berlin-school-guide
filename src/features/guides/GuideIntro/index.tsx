import type { ReactNode } from "react";

type GuideIntroProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
};

export function GuideIntro({ eyebrow, title, description }: GuideIntroProps) {
  return (
    <section className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-lg leading-8 text-neutral-700">{description}</p>
    </section>
  );
}
