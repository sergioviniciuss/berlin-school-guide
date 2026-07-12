---
status: resolved
phase: 08-release-readiness
source: [08-VERIFICATION.md]
started: 2026-07-12T09:30:00Z
updated: 2026-07-12T09:30:00Z
---

## Current Test

all tests passed — approved 2026-07-12

## Tests

### 1. Keyboard navigation core journey
expected: Tab through header links (Início, Escolas, Guias, Comparar, Metodologia) → Enter to Escolas → tab to first filter → reach a school card link. Focus ring visible throughout.
result: pass

### 2. Mobile viewport usability
expected: At 390×844, browse /schools and /guides — no horizontal page overflow; mobile nav sheet opens and closes with keyboard/focus intact.
result: pass
notes: |
  Initial failure: Tailwind v4 did not load tailwind.config.ts (missing @config in globals.css).
  Fixed via @config "../../tailwind.config.ts". User confirmed fix 2026-07-12.

### 3. Open Graph preview spot-check
expected: Share debugger or browser devtools shows og:title, og:description, og:image, and twitter:card on / and /schools/lew-tolstoi-schule with pt_BR locale.
result: pass

## Summary

total: 3
passed: 3
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

- Tailwind v4 @config missing (mobile nav sheet CSS): fixed in src/app/globals.css during UAT
