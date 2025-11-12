---
description: "Task list for Salon Booking SPA"
---

# Tasks: Salon Booking SPA

**Input**: Design documents from `/specs/001-salon-booking-spa/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL and not requested. We will use a manual test plan per spec and constitution.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- [P] = can run in parallel (different files, no dependencies)
- [Story] = US1, US2, US3, etc. Only on user story phases
- Include exact file paths in descriptions

## Phase 1: Setup (Project Initialization)

- [ ] T001 Create pages directory at BokaDaria Hair Dresser Website/src/pages/
- [ ] T002 Create router file at BokaDaria Hair Dresser Website/src/router.tsx
- [ ] T003 Wire React Router routes in BokaDaria Hair Dresser Website/src/App.tsx
- [ ] T004 Wrap app with MUI ThemeProvider using src/theme/dark.ts in BokaDaria Hair Dresser Website/src/main.tsx
- [ ] T005 [P] Create base layout stylesheet at BokaDaria Hair Dresser Website/src/styles/layout.css
- [ ] T006 [P] Create components stylesheet at BokaDaria Hair Dresser Website/src/styles/components.css
- [ ] T007 [P] Add SEO util for setting document titles at BokaDaria Hair Dresser Website/src/utils/seo.ts
- [ ] T008 [P] Create data store module for in-memory data at BokaDaria Hair Dresser Website/src/data/store.ts
- [ ] T009 [P] Create shared types index at BokaDaria Hair Dresser Website/src/types/index.ts
- [ ] T010 [P] Create date/time utils (timezone label, slot helpers) at BokaDaria Hair Dresser Website/src/utils/datetime.ts

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T011 Implement 30-minute slot generator in BokaDaria Hair Dresser Website/src/utils/datetime.ts
- [ ] T012 Implement cancellation policy helper (≥24h) in BokaDaria Hair Dresser Website/src/utils/policy.ts
- [ ] T013 Implement in-memory appointments service in BokaDaria Hair Dresser Website/src/services/appointments.ts
- [ ] T014 Implement in-memory catalog providers (hairdresser, service) in BokaDaria Hair Dresser Website/src/services/catalog.ts
- [ ] T015 Implement in-memory timeslots provider in BokaDaria Hair Dresser Website/src/services/timeslots.ts
- [ ] T016 [P] Create shared Header component at BokaDaria Hair Dresser Website/src/components/Header.tsx
- [ ] T017 [P] Create shared Footer component at BokaDaria Hair Dresser Website/src/components/Footer.tsx
- [ ] T018 [P] Add skip-to-content link and focus styles in BokaDaria Hair Dresser Website/src/styles/layout.css
- [ ] T019 Add canonical link and meta description in BokaDaria Hair Dresser Website/index.html
- [ ] T020 Register routes '/', '/login', '/booking' in BokaDaria Hair Dresser Website/src/router.tsx

---

## Phase 3: User Story 1 - Landing (Priority: P1) 🎯 MVP

Goal: Landing page shows salon info, services, hairdresser info (Daria), and payment methods (Massage, Swish, Random gift)

Independent Test: Load '/' unauthenticated; verify four sections present; keyboard-only navigation works; title set; header/footer visible

- [ ] T021 [US1] Create Landing page at BokaDaria Hair Dresser Website/src/pages/Landing.tsx
- [ ] T022 [P] [US1] Implement ServiceCard at BokaDaria Hair Dresser Website/src/components/ServiceCard.tsx
- [ ] T023 [P] [US1] Render services list (Hair cut) in Landing.tsx using ServiceCard
- [ ] T024 [US1] Add salon info and hairdresser (Daria) sections in Landing.tsx
- [ ] T025 [US1] Add payment methods section (Massage, Swish, Random gift) in Landing.tsx
- [ ] T026 [US1] Set document title and meta for landing via src/utils/seo.ts in Landing.tsx
- [ ] T027 [US1] Ensure semantic landmarks and keyboard focus order in Landing.tsx
- [ ] T028 [US1] Add responsive layout CSS for landing in BokaDaria Hair Dresser Website/src/styles/components.css

---

## Phase 4: User Story 2 - Login (Priority: P1)

Goal: User can log in (mock) and on success is redirected to booking; error shown for invalid credentials

Independent Test: Attempt valid/invalid login; on success redirect to '/booking'; header/footer visible

- [ ] T029 [US2] Create Login page at BokaDaria Hair Dresser Website/src/pages/Login.tsx
- [ ] T030 [P] [US2] Add mock auth logic (set user in store) in BokaDaria Hair Dresser Website/src/data/store.ts
- [ ] T031 [US2] Wire login route and redirect to '/booking' in BokaDaria Hair Dresser Website/src/router.tsx
- [ ] T032 [US2] Add form labels, aria-live errors, and keyboard submit in Login.tsx
- [ ] T033 [US2] Set document title for login via src/utils/seo.ts in Login.tsx
- [ ] T034 [US2] Add responsive form styles in BokaDaria Hair Dresser Website/src/styles/components.css

---

## Phase 5: User Story 3 - Book appointment (Priority: P1)

Goal: Authenticated user selects service/hairdresser, date, and 30-minute slot; booking confirms and appears in upcoming; timezone labeled

Independent Test: Sign in → select date/time → confirm booking; appointment appears in upcoming; double-booking prevented

- [ ] T035 [US3] Create Booking page at BokaDaria Hair Dresser Website/src/pages/Booking.tsx
- [ ] T036 [P] [US3] Create TimeSlotPicker at BokaDaria Hair Dresser Website/src/components/TimeSlotPicker.tsx
- [ ] T037 [P] [US3] Render service and hairdresser pickers (preselected defaults) in Booking.tsx
- [ ] T038 [US3] Add HTML date input and fetch slots via services/timeslots in Booking.tsx
- [ ] T039 [US3] Implement booking action calling services/appointments.create in Booking.tsx
- [ ] T040 [US3] Prevent booking past or already-reserved slots in services layer
- [ ] T041 [US3] Show confirmation UI and update upcoming list after booking in Booking.tsx
- [ ] T042 [US3] Display timezone label (salon local) in Booking.tsx
- [ ] T043 [US3] Set document title for booking via src/utils/seo.ts in Booking.tsx
- [ ] T044 [US3] Add responsive grid for slot list in BokaDaria Hair Dresser Website/src/styles/components.css

---

## Phase 6: User Story 4 - Manage appointments (Priority: P2)

Goal: View upcoming/previous appointments; delete upcoming appointment; enforce 24h rule; released slot becomes available

Independent Test: Create two bookings → cancel one (≥24h) → confirm removed from upcoming; previous remains visible

- [ ] T045 [US4] Create AppointmentList at BokaDaria Hair Dresser Website/src/components/AppointmentList.tsx
- [ ] T046 [P] [US4] Render upcoming appointments with cancel buttons in Booking.tsx using AppointmentList
- [ ] T047 [P] [US4] Render previous appointments as read-only in Booking.tsx using AppointmentList
- [ ] T048 [US4] Enforce 24-hour cancellation window in services/appointments.delete
- [ ] T049 [US4] Free slots immediately on delete and refresh availability in services/timeslots
- [ ] T050 [US4] Announce cancellation result via aria-live region in Booking.tsx
- [ ] T051 [US4] Keep header/footer and navigation consistent on appointment management views
- [ ] T052 [US4] Add responsive styling for lists in BokaDaria Hair Dresser Website/src/styles/components.css

---

## Phase 7: User Story 5 - Layout & Responsiveness (Priority: P2)

Goal: Consistent header/footer on all pages; app responsive on mobile/tablet/desktop; skip link; visible focus

Independent Test: Navigate across pages at mobile/tablet/desktop widths; header/footer remain; no horizontal scroll; keyboard-only navigation works

- [ ] T053 [US5] Ensure Header and Footer used in App shell in BokaDaria Hair Dresser Website/src/App.tsx
- [ ] T054 [P] [US5] Add active nav link states and aria-current in Header.tsx
- [ ] T055 [P] [US5] Add mobile navigation layout (stack/menus) in Header.tsx + layout.css
- [ ] T056 [US5] Ensure main landmarks and skip-to-content link in App.tsx
- [ ] T057 [US5] Add visible focus outlines per theme in layout.css
- [ ] T058 [US5] Verify images/icons have alt/aria-labels where applicable across pages
- [ ] T059 [US5] Tune spacing/typography tokens from src/theme in pages and components
- [ ] T060 [US5] Verify responsive breakpoints in components.css (no horizontal scrolling)

---

## Phase N: Polish & Cross-Cutting

- [ ] T061 Add canonical <link> and unique meta descriptions for routes in BokaDaria Hair Dresser Website/index.html
- [ ] T062 Add simple focus trap on modal-like confirmations (if used) in Booking.tsx
- [ ] T063 Verify sanitation on any user-entered text fields in Login.tsx and Booking.tsx
- [ ] T064 Lazy-load non-critical page chunks (optional) in router.tsx
- [ ] T065 Reduce MUI imports to component-level to minimize bundle in pages/components files
- [ ] T066 Validate keyboard-only journey across all routes (manual checklist)
- [ ] T067 Final pass: document titles per route via src/utils/seo.ts
- [ ] T068 Final pass: README quickstart updates in specs/001-salon-booking-spa/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies
- Foundational (Phase 2): Depends on Setup completion — BLOCKS all user stories
- User Stories (Phase 3+): Depend on Foundational; proceed in priority order (P1 → P2)
- Polish: After user stories

### User Story Dependencies

- User Story 1 (P1): Can start after Phase 2
- User Story 2 (P1): Can start after Phase 2 (independent of US1)
- User Story 3 (P1): Can start after Phase 2; relies on services from foundational tasks
- User Story 4 (P2): Depends on US3 completion (needs booking creation to manage)
- User Story 5 (P2): Depends on US1-3 (ensures layout applied across pages)

### Within Each User Story

- Models/services (if needed) before UI wiring
- UI components before page integration
- Page integration before navigation/SEO finishing touches

### Parallel Opportunities

- Setup: T005–T010 in parallel
- Foundational: T016–T018 in parallel; T013–T015 in parallel once utils created
- US1: T022–T025 in parallel
- US2: T030 in parallel with T031 once store exists
- US3: T036–T038 in parallel; T042–T044 in parallel
- US4: T046–T047 in parallel
- US5: T054–T055 in parallel

---

## Parallel Example: User Story 3

```
Task: "Create TimeSlotPicker at src/components/TimeSlotPicker.tsx"
Task: "Render service and hairdresser pickers in src/pages/Booking.tsx"
Task: "Add responsive grid for slot list in src/styles/components.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: Landing page
4. Validate: Keyboard-only, SEO title/meta, responsive sections

### Incremental Delivery

1. Add US2: Login → Validate redirect and error handling
2. Add US3: Booking → Validate booking creation and slot prevention
3. Add US4: Manage → Validate cancellation policy and slot release
4. Add US5: Layout & responsiveness → Validate across breakpoints

### Parallel Team Strategy

- Developer A: US1 → US3
- Developer B: US2 → US4
- Developer C: US5 + Polish
