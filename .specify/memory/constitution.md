# BokaDaria Constitution

## Core Principles

### Static-only delivery (NON-NEGOTIABLE)

- The application MUST build to static assets using the project build tool (Vite) and run on a
  static host without any server-side runtime (no servers, databases, or server-rendering in prod).
- The build output in `dist/` is the deployable artifact and the single source of truth.
- Client-side calls to public HTTP APIs MAY be used, but MUST NOT require secrets; the app MUST
  render a basic usable shell with no network access.
  Rationale: Keeps hosting simple, portable, and low-cost while reducing operational risk.

### Build, lint, and type-safety baseline

- `npm ci && npm run lint && npm run build` MUST pass with zero errors.
- TypeScript MUST compile with no type errors (use the repo tsconfigs).
- Only `import.meta.env.VITE_*` environment variables MAY be referenced in client code.
  Rationale: Ensures a clean, reproducible build and avoids leaking secrets to the client.

### Accessibility (WCAG 2.2 AA) and basic SEO

- Conformance target: WCAG 2.2 level AA baseline for UI within scope of change.
- Pages MUST include a unique `<title>` and a meta description.
- Non-decorative images MUST have meaningful `alt` text; decorative images MUST use empty alt.
- Interactive elements MUST be keyboard accessible (2.1.1, 2.1.2) and show a visible focus state (2.4.7/2.4.11).
- Color contrast for text and interactive elements MUST meet AA (1.4.3/1.4.11).
- Controls MUST have an accessible name via an associated <label>, `aria-label`, or `aria-labelledby`.
  Prefer visible labels; use ARIA only when no native/visible label fits. The accessible name SHOULD
  match visible text for voice control compatibility (2.5.3 Name, Role, Value).
- Where multiple page regions of the same type exist (e.g., multiple navs), provide distinct labels
  using semantic landmarks or `aria-label`/`aria-labelledby` to disambiguate.
- No keyboard traps (2.1.2); focus order MUST be logical (2.4.3).
  Rationale: Meeting WCAG 2.2 AA ensures inclusive, legally safer experiences and improves SEO.

  ### Frontend Security

- Client-side code MUST follow secure-by-default practices: no inline sensitive
  secrets in source, Content Security Policy (CSP) headers configured, input
  sanitization for DOM interactions, and correct use of secure cookies and
  same-site attributes for auth flows.
- Third-party scripts MUST be vetted and loaded with integrity checks or isolated via subresource integrity when feasible.
- Rationale: prevent XSS, data leakage and supply-chain attacks.

Tests / verification: automated lint/security scans, dependency vulnerability
checks, and a security checklist item in each release checklist.

### Versioning and release artifacts

- The application and this constitution follow Semantic Versioning (MAJOR.MINOR.PATCH).
- A release MUST be represented by a git tag matching the version and built artifacts from that tag.
- Any backward-incompatible changes to public URLs or behavior MUST bump the MAJOR version.
  Rationale: Predictable releases and change communication.

### Simplicity and minimal dependencies

- Prefer the simplest viable solution; avoid adding libraries unless they clearly reduce cost or risk.
- No global state libraries or routing complexity unless the feature set requires it.
- Keep bundle size reasonable; prefer code-splitting for large optional areas.
  Rationale: Smaller surface area reduces maintenance and cognitive load.

## Additional Constraints

- Tech stack: React + TypeScript + Vite.
- Runtime: Client-only; no server frameworks, databases, or SSR in production.
- Hosting: Any static hosting provider (e.g., GitHub Pages, Netlify, Vercel static export, S3+CDN).
- Node: Use an active LTS for local builds and CI.

## Development Workflow and Quality Gates

- Every PR MUST pass: install, lint, type-check, and production build.
- The static build MUST produce `dist/index.html` and assets that load locally via a simple static
  server (no dynamic server logic required).
- Accessibility baseline MUST be met for new/changed UI:
  - Unique title and meta description present.
  - Images have appropriate alt text (or empty alt when decorative).
  - Controls expose accessible names via label or ARIA (`aria-label`/`aria-labelledby`); repeated
    regions are disambiguated via labels where needed.
  - Keyboard operability confirmed; no keyboard traps; logical focus order.
  - Visible focus indicators; color contrast meets AA.
- Only `import.meta.env.VITE_*` variables MAY be used; no secrets in client code.
- At least one code review approval is REQUIRED before merge.

## Governance

- This constitution supersedes other practice docs where conflicts exist for this project type.
- Amendments require a pull request that:
  - Describes the change and its impact,
  - Updates version per SemVer (see Versioning and release artifacts), and
  - Updates dependent templates/guides as needed.
- Compliance: Reviewers MUST verify Constitution Check items in `plan-template.md` for new features.
- Versioning policy: MAJOR for incompatible governance changes; MINOR for added guidance; PATCH for
  clarifications.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-11-11
