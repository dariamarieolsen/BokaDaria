# Data Model: Salon Booking SPA

Date: 2025-11-11

## Entities

### User

- id: string
- email: string
- name: string

Constraints:

- Authentication-only (existing accounts), no self-registration

### Hairdresser

- id: string (constant: "daria")
- name: string ("Daria")

### Service

- id: string (constant: "hair-cut")
- name: string ("Hair cut")
- durationMinutes: 30 (must be multiple of 30)
- price: number (optional display-only)

### TimeSlot

- id: string
- start: ISO datetime (salon local timezone)
- end: ISO datetime
- hairdresserId: string ("daria")
- serviceId: string ("hair-cut")
- status: enum("available","held","booked")

Constraints:

- Slot length = 30 minutes
- Non-overlapping for same hairdresser

### Appointment

- id: string
- userId: string
- hairdresserId: string ("daria")
- serviceId: string ("hair-cut")
- start: ISO datetime (salon local timezone)
- end: ISO datetime
- status: enum("upcoming","cancelled","completed")
- createdAt: ISO datetime
- cancelledAt: ISO datetime | null

Constraints:

- Booking allowed only for future slots
- No double-book for same slot
- Cancellation allowed only if >= 24h before start
- Deleting/cancelling frees occupied slot immediately (available within 5s)

## Relationships

- Hairdresser 1..\* TimeSlots
- Service defines duration that maps to slot count for appointment
- User 1..\* Appointments

## State Transitions

- Appointment: upcoming → cancelled (on delete within allowed window)
- Appointment: upcoming → completed (after end time passes or manual mark)
- TimeSlot: available ↔ held → booked; booked → available (on delete/cancel) within 5s

## Derived Rules

- End time = start + service.durationMinutes
- Past slots are not available for booking
