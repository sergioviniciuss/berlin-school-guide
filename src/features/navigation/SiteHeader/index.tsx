"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { cn } from "@/components/ui/utils";

import { NAV_ITEMS } from "./constants";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/schools") {
    return pathname === "/schools" || pathname.startsWith("/schools/");
  }
  return pathname === href;
}

function getDesktopLinkClassName(pathname: string, href: string) {
  return cn(
    "text-sm font-medium text-neutral-700 hover:text-neutral-950",
    isActive(pathname, href) &&
      "border-b-2 border-b-primary font-semibold text-primary",
  );
}

function getMobileLinkClassName(pathname: string, href: string) {
  return cn(
    "block py-3 px-4 text-base text-neutral-700 hover:text-neutral-950",
    isActive(pathname, href) &&
      "border-l-4 border-l-primary bg-neutral-50 font-semibold text-primary",
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6">
      <Link href="/" className="text-base font-semibold text-neutral-950">
        Berlin School Guide
      </Link>

      <nav
        aria-label="Navegação principal"
        className="hidden items-center md:flex md:gap-8"
      >
        {NAV_ITEMS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={getDesktopLinkClassName(pathname, href)}
          >
            {label}
          </Link>
        ))}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        {!open ? (
          <Button
            type="button"
            variant="outline"
            aria-label="Abrir menu de navegação"
            aria-expanded={false}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
            className="md:hidden size-11"
          >
            <Menu className="size-5" />
          </Button>
        ) : null}
        <SheetContent
          side="right"
          id="mobile-nav"
          className="w-[280px] max-w-[85vw]"
        >
          <SheetHeader>
            <SheetTitle>Navegação</SheetTitle>
          </SheetHeader>
          <nav aria-label="Navegação principal">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={getMobileLinkClassName(pathname, href)}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
