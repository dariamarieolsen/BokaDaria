# Quickstart: Salon Booking SPA

## Prerequisites

- Node.js (per project requirements)
- Yarn or npm

## Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Architecture Overview

- Single Page Application (React + TypeScript + Vite)
- Routing with React Router (define in `src/router.tsx` and mount in `App.tsx`)
- Theming: Use MUI `ThemeProvider` with tokens from `src/theme/dark.ts` and `tokens.ts`
- Styling: Regular CSS in `src/styles/*.css` plus MUI component styling props
- Data: Dummy in-memory collections (no backend)

## Pages

- Landing: Salon info, services, hairdresser, payment methods
- Login: Mock authentication (existing user only)
- Booking: List available slots, create/cancel appointments

## Components (shared)

- `Header.tsx` / `Footer.tsx`
- `ServiceCard.tsx` (renders single service)
- `AppointmentList.tsx` (upcoming & previous)
- `TimeSlotPicker.tsx` (select and book available slot)

## Dummy Data Strategy

Initialize arrays in a data module (e.g., `src/data/store.ts`) for:

- Hairdresser (Daria)
- Service (Hair cut, 30 min)
- Time slots (generated for business hours)
- User (one static user object)
- Appointments (mutable in-memory list)

## Booking Flow

1. User logs in → state set (in-memory)
2. User views available time slots (filter out past/booked)
3. User selects slot → create appointment (updates appointments & slot status)
4. User can cancel if ≥24h before start → slot status returns to available

## Accessibility Checklist (Manual)

- Keyboard navigation across all interactive elements
- Visible focus rings (CSS outline or MUI focus styles)
- Alt text for non-decorative images
- Semantic landmarks: `<header>`, `<main>`, `<footer>`
- Color contrast meets AA (use theme tokens)

## SEO Basics

- Set `document.title` per route
- Add `<meta name="description" ...>` and canonical link in `index.html`
- Ensure landing textual content is not hidden behind JS-only interactions

## Security Basics

- No secrets or tokens hard-coded
- Validate/sanitize any user-entered text before inserting into DOM
- Avoid query parameters for any future auth tokens

## Performance Notes

- Lazy load non-critical components (optional without new deps)
- Keep bundle small by limiting MUI imports to specific components

## Timezone & Slots

- Display times in salon local timezone (label in UI)
- 30-minute slot increments; service duration 30 minutes

## Cancellation Policy

- Cancellation allowed only if ≥24h before start
- On deletion, slot freed and re-available immediately

## Next Steps

- Implement components and pages per structure
- Manual test using acceptance scenarios in spec
