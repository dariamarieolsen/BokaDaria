# Implementation Plan: Salon Booking SPA

**Branch**: `[001-salon-booking-spa]` | **Date**: 2025-11-11 | **Spec**: specs/001-salon-booking-spa/spec.md
**Input**: Feature specification from `/specs/001-salon-booking-spa/spec.md`

## Summary

Single-page application for a hairdresser booking system with Landing, Login, and Booking views. Users can log in, book, view previous/upcoming appointments, and delete upcoming appointments. Reuse components, use the existing theme under `src/theme`, and keep a modern, responsive UI.

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: React 19, MUI (Material UI), React Router (no other libraries), Vite build tool
**Storage**: None (dummy data in-memory; no database)
**Testing**: Manual test plan only (per constraints: no additional libraries)
**Target Platform**: Web (desktop/mobile) via Vite dev server and static build
**Project Type**: single/web (SPA)
**Performance Goals**: Page usable content within ~2s on typical mobile (per spec SC-002)
**Constraints**:

- Must use theme provided under `src/theme` (tokens/dark)
- No additional libraries beyond React, MUI, React Router
- Reuse components across the app; responsive/mobile-first
  **Scale/Scope**: Single hairdresser (Daria), single service (Hair cut), payment options: Massage, Swish, Random gift (display only)

## Constitution Check

Gates determined based on constitution:

- Accessibility (WCAG 2.1 AA): semantic structure, keyboard nav, alt text, visible focus; run axe-like checks manually and keyboard pass per release
- SEO: per-page title and meta description; landing page content indexable; canonical link in index.html
- Frontend Security: sanitize DOM-affecting inputs; no secrets in source; avoid tokens in URLs; basic CSP guidance in deployment notes
- Quality & Review Gates: PR review; manual test plan covering happy path and failure cases; CI lint/build must pass

Status: No violations expected; manual test plan selected instead of automated tests (allowed by constitution).

## Project Structure

### Documentation (this feature)

```
specs/001-salon-booking-spa/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── openapi.yaml     # Phase 1 output
└── tasks.md             # Phase 2 output (to be generated later)
```

### Source Code (repository paths)

```
BokaDaria Hair Dresser Website/
└── src/
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── ServiceCard.tsx
    │   ├── AppointmentList.tsx
    │   └── TimeSlotPicker.tsx
    ├── pages/
    │   ├── Landing.tsx
    │   ├── Login.tsx
    │   └── Booking.tsx
    ├── styles/
    │   ├── layout.css
    │   └── components.css
    ├── theme/
    │   ├── tokens.ts
    │   └── dark.ts
    ├── App.tsx
    ├── main.tsx
    └── router.tsx
```

**Structure Decision**: Single SPA in existing Vite React TS project; add `pages/` and shared `components/`, reuse `styles/` and `theme/`.

## Complexity Tracking

No constitution violations. No added projects. All constraints align with a simple SPA using in-memory data.

---

## Phase 0: Outline & Research

Unknowns and research tasks (based on Technical Context):

- TypeScript version pinning → Research recommended TS baseline with Vite + React.
- Accessibility verification approach without extra libraries → Document manual checklist and devtools usage.
- SPA SEO without extra libraries → Document approach for titles/meta and indexable landing content.
- Basic CSP for static hosting → Document recommended header policy sample.

Deliverable: research.md consolidating decisions, rationale, and alternatives.

---

## Phase 1: Design & Contracts

Outputs:

- data-model.md: Entities (User, Hairdresser, Service, TimeSlot, Appointment) including constraints (30-minute slots, 24h cancellation, salon timezone)
- contracts/openapi.yaml: Minimal REST contracts for listing services/hairdressers/slots, creating/deleting and listing appointments
- quickstart.md: How to run the app locally with Vite, where to wire routes/components/theme
- Update agent context (pending script execution)

Re-evaluate Constitution Check post-design: ensure A11Y, SEO meta, and security notes are included in quickstart and acceptance checks.

---

## Notes

- Implementation will keep dummy data in-memory; an adapter boundary will be created so a future backend can replace the in-memory store without changing UI.
- React Router will power navigation across Landing, Login, Booking.
- Theme provider: wrap App with MUI ThemeProvider using tokens from `src/theme`.
