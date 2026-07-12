import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/features/navigation/SiteFooter";
import { SiteHeader } from "@/features/navigation/SiteHeader";
import { siteMetadataDefaults } from "@/features/siteMetadata";

import "./globals.css";

export const metadata: Metadata = siteMetadataDefaults;

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
