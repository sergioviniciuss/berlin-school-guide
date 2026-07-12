---
phase: 03-homepage-navigation-core-journey
reviewed: 2026-07-11T18:45:00Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - src/features/navigation/SiteHeader/index.tsx
  - src/features/navigation/SiteHeader/constants.ts
  - src/features/navigation/SiteHeader/types.ts
  - src/features/navigation/SiteFooter/index.tsx
  - src/components/ui/Sheet/index.tsx
  - src/features/home/HomeJourneyCards/index.tsx
  - src/app/layout.tsx
  - src/app/page.tsx
  - e2e/smoke.spec.ts
findings:
  critical: 0
  warning: 2
  info: 3
  total: 5
status: issues_found
---

# Phase 3: Code Review Report

**Reviewed:** 2026-07-11T18:45:00Z
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Phase 03 delivers global site chrome (`SiteHeader`, `SiteFooter`), a shadcn `Sheet` primitive for mobile navigation, homepage journey cards, root layout wiring, and updated e2e smoke coverage for the home → `/schools` path. Implementation aligns with the UI-SPEC copy contract, exact-pathname active-link rules, and static-first architecture. No security issues or crash-level bugs were found.

Two accessibility warnings warrant attention before merge: the mobile hamburger button omits `aria-expanded` / `aria-controls` (a pattern already used elsewhere in the codebase), and the Sheet close button references Tailwind tokens that are not defined in the project theme. Remaining items are low-severity maintainability and test-coverage notes.

## Warnings

### WR-01: Hamburger button missing expanded state for screen readers

**File:** `src/features/navigation/SiteHeader/index.tsx:65-72`
**Issue:** The mobile menu uses a controlled `Sheet` with a plain `Button` instead of `SheetTrigger`. The button has a Portuguese open label but no `aria-expanded` or `aria-controls`, so assistive technology cannot reflect whether the drawer is open or which element it controls. `SchoolDirectory` already sets both attributes on its mobile filter toggle.
**Fix:**
```tsx
const sheetContentId = "site-header-mobile-nav";

<Button
  type="button"
  variant="outline"
  aria-label="Abrir menu de navegação"
  aria-expanded={open}
  aria-controls={sheetContentId}
  onClick={() => setOpen(true)}
  className="md:hidden size-11"
>
  <Menu className="size-5" />
</Button>
<SheetContent id={sheetContentId} side="right" className="w-[280px] max-w-[85vw]">
```

### WR-02: Sheet close button uses undefined theme tokens

**File:** `src/components/ui/Sheet/index.tsx:72`
**Issue:** The close control applies `focus:ring-ring`, `ring-offset-background`, and `data-[state=open]:bg-secondary`, but `tailwind.config.ts` and `globals.css` define only `background`, `foreground`, `primary`, and `border`. The `ring` and `secondary` color tokens are missing, so the close button may not show a visible focus ring — conflicting with the UI-SPEC requirement that all interactive elements have visible focus.
**Fix:** Either extend the theme with shadcn-compatible `--ring` / `secondary` tokens, or replace the close-button classes with tokens that exist in this project:
```tsx
className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

## Info

### IN-01: Duplicate root metadata on homepage

**File:** `src/app/page.tsx:4-8`
**Issue:** Homepage exports the same `title` and `description` already defined in `src/app/layout.tsx:9-13`. Next.js merges them today, but two sources of truth increase drift risk if copy changes in one file only.
**Fix:** Remove the redundant `metadata` export from `page.tsx` and rely on root layout defaults, or override only when the homepage needs distinct values.

### IN-02: Exported `NavItemHref` type is unused

**File:** `src/features/navigation/SiteHeader/types.ts:4`
**Issue:** `NavItemHref` is exported but not referenced anywhere in the codebase. Harmless at runtime, but adds unused surface area.
**Fix:** Remove the export until a consumer exists, or use it to type future nav-extension helpers.

### IN-03: E2E header-nav test is desktop-only

**File:** `e2e/smoke.spec.ts:18-28`
**Issue:** The header navigation smoke test clicks the desktop `Navegação principal` landmark. Playwright runs `Desktop Chrome` only; the mobile hamburger → Sheet path is covered by unit tests but not e2e. This is acceptable for Phase 3 but leaves the mobile journey unverified in CI.
**Fix:** Add a mobile-viewport project (e.g. `iPhone 13`) with a test that opens the hamburger and navigates via the Sheet links.

---

_Reviewed: 2026-07-11T18:45:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
