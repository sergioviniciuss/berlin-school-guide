import type { NAV_ITEMS } from "./constants";

export type NavItem = (typeof NAV_ITEMS)[number];
export type NavItemHref = NavItem["href"];
