import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/features/navigation/SiteFooter";
import { SiteHeader } from "@/features/navigation/SiteHeader";

import "./globals.css";

export const metadata: Metadata = {
  title: "Berlin School Guide",
  description:
    "Guia de escolas primárias em Berlim para famílias brasileiras — com transparência sobre fontes e evidências.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
