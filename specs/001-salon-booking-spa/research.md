# Research: Salon Booking SPA

Date: 2025-11-11  
Feature: specs/001-salon-booking-spa/spec.md

## Decisions and Rationale

### Tech Stack and Libraries

- Decision: React + TypeScript + Vite + MUI + React Router only (no other libraries)
- Rationale: Matches project constraints; MUI + custom CSS + existing theme meet UI needs
- Alternatives: Add state mgmt or testing libs (Redux, Zustand, Vitest) — rejected due to no-new-libs constraint

### Testing Approach

- Decision: Manual test plan for this iteration
- Rationale: Constitution allows manual test plan as a gate when tests are not added; constraint forbids adding test libraries
- Alternatives: Vitest + React Testing Library — rejected due to constraints

### Accessibility (A11Y)

- Decision: Manual keyboard audit + devtools checks; semantic HTML, labels, focus states; MUI components used accessibly
- Rationale: Constitution requires WCAG 2.1 AA; feasible without new deps
- Alternatives: axe-core CI — deferred (would require adding a dependency)

### SEO for SPA

- Decision: Set document.title per route; static meta and canonical in `index.html`; ensure landing content is indexable
- Rationale: No SSR/pre-render; still adequate for small SPA and basic discovery
- Alternatives: React Helmet or prerendering — deferred (adds dependency/build complexity)

### Security

- Decision: No secrets in client; sanitize DOM-affecting input; avoid tokens in URLs; recommend CSP in deployment
- Rationale: Aligns with constitution; deploy guidance sufficient for static hosting

### Timezone

- Decision: Show and process times in salon local timezone; label timezone in UI
- Rationale: Single-location salon; simple and avoids confusion

### Slot Granularity

- Decision: 30-minute slots; services in 30-minute increments; bookings consume integer slots
- Rationale: Common salon cadence; simple to reason about
- Alternatives: 15-minute or variable-by-service — rejected for simplicity

### Cancellation Window

- Decision: Cancel >= 24 hours before appointment start
- Rationale: Common policy; balances flexibility and schedule stability

### Slot Release After Deletion

- Decision: Free slots immediately after deletion; rebookable within 5 seconds without manual refresh
- Rationale: UX expectation per spec; keeps availability accurate

## Open Questions (Resolved)

- TypeScript version: Use project default from tsconfig (Vite template)

## Alternatives Considered

- Testing libs: Vitest/RTL (deferred due to constraints)
- SEO: Helmet/prerender (deferred)
- Slots: 15-minute or variable (deferred)
