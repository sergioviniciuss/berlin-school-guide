import type { ReactNode } from "react";

type ProfileSectionProps = {
  heading: string;
  children: ReactNode;
};

export function ProfileSection({ heading, children }: ProfileSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-950">{heading}</h2>
      <dl className="divide-y divide-neutral-100">{children}</dl>
    </section>
  );
}
