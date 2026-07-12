import type { ReactNode } from "react";

export type BerlinCalloutProps =
  | { variant: "inline"; note: string }
  | { variant: "summary"; children: ReactNode };
