import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import { setDocumentTitle, setMetaDescription } from "../utils/seo";
import { listServices, listHairdressers } from "../services/catalog";
import { createAppointment, listAppointments, deleteAppointment } from "../services/appointments";
import { timezoneLabel } from "../utils/datetime";
import TimeSlotPicker from "../components/TimeSlotPicker";
import AppointmentList from "../components/AppointmentList";
import type { Appointment, PaymentMethod } from "../types";
import { store } from "../data/store";
import { Button } from "@mui/material";

export default function Booking() {
  const services = listServices();
  const hairdressers = listHairdressers();
  const [serviceId, setServiceId] = useState(services[0]?.id);
  const [hairdresserId, setHairdresserId] = useState(hairdressers[0]?.id);
  const [date, setDate] = useState<string>(() => new Date().toISOString().substring(0, 10));
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [, setTick] = useState(0);

  useEffect(() => {
    setDocumentTitle("Booking — BokaDaria");
    setMetaDescription("Book an appointment at BokaDaria: pick service, hairdresser, date and time.");
  }, []);

  useEffect(() => {
    const unsub = store.subscribe(() => setTick((t) => t + 1));
    return unsub;
  }, []);

  const user = store.user;
  const bookingDate = new Date(date + "T00:00:00");
  const appts = user ? listAppointments(user.id) : { upcoming: [], previous: [] };

  function openModal() {
    setError("");
    setMessage("");
    if (!user) {
      setError("You must log in first.");
      return;
    }
    if (!selectedSlot) {
      setError("Select a slot.");
      return;
    }
    // Prefill name from user if not set
    if (!customerName && user?.name) setCustomerName(user.name);
    setShowModal(true);
  }

  function confirmBooking() {
    const safeName = customerName.trim().slice(0, 60);
    const safePhone = customerPhone.trim().slice(0, 30);
    const safeNote = note.trim().slice(0, 500);
    setError("");
    setMessage("");
    if (!user) {
      setError("You must log in first.");
      return;
    }
    if (!selectedSlot) {
      setError("Select a slot.");
      return;
    }
    const svc = services.find((s) => s.id === serviceId)!;
    const startDate = new Date(selectedSlot);
    const endDate = new Date(startDate.getTime() + svc.durationMins * 60000);
    try {
      const a: Appointment = {
        id: "appt_" + Math.random().toString(36).slice(2),
        userId: user.id,
        serviceId: serviceId!,
        hairdresserId: hairdresserId!,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        note: safeNote,
        customerName: safeName,
        customerPhone: safePhone,
        paymentMethod,
      };
      createAppointment(a);
      setMessage("Appointment booked!");
      setSelectedSlot("");
      setShowModal(false);
      setCustomerName("");
      setCustomerPhone("");
      setNote("");
      setPaymentMethod("card");
      setTick((t) => t + 1);
    } catch (e: any) {
      setError(e.message);
    }
  }

  function onCancel(id: string) {
    setError("");
    setMessage("");
    try {
      deleteAppointment(id);
      setMessage("Appointment canceled.");
      setTick((t) => t + 1);
    } catch (e: any) {
      setError(e.message);
    }
  }

  const paymentOptions: string[] = ["card", "swish", "cash"];

  return (
    <div className="container" aria-labelledby="booking-title">
      <h1 id="booking-title">Booking</h1>
      <p>Timezone: {timezoneLabel()}</p>
      <div className="card" style={{ marginBottom: "16px" }}>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            openModal();
          }}
        >
          <div>
            <label htmlFor="service">Service</label>
            <select id="service" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="hairdresser">Hairdresser</label>
            <select id="hairdresser" value={hairdresserId} onChange={(e) => setHairdresserId(e.target.value)}>
              {hairdressers.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label>Slots</label>
            <TimeSlotPicker date={bookingDate} selected={selectedSlot} onSelect={setSelectedSlot} />
          </div>
          <button type="submit" className="btn primary">
            Book selected slot
          </button>
          <div aria-live="polite" className="error" style={{ minHeight: "1.2em" }}>
            {error}
          </div>
          <div aria-live="polite" style={{ minHeight: "1.2em", color: "lime" }}>
            {message}
          </div>
        </form>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 id="book-dialog-title">Confirm booking</h2>
          <p id="book-dialog-desc">Enter your contact info and a note for the hairdresser (optional).</p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              confirmBooking();
            }}
          >
            <div>
              <label htmlFor="paymentMethod">Payment options</label>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                {paymentOptions.map((option) => (
                  <Button key={option} variant="outlined" onClick={() => setPaymentMethod(option as PaymentMethod)}>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="customerName">Full name</label>
              <input id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="customerPhone">Phone</label>
              <input id="customerPhone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="note">Note</label>
              <input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anything we should know?" />
            </div>
            <div className="actions">
              <button type="button" className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn primary">
                Confirm booking
              </button>
            </div>
          </form>
        </Modal>
      )}

      {user && (
        <div className="grid-two-columns">
          <AppointmentList title="Upcoming" items={appts.upcoming} onCancel={onCancel} />
          <AppointmentList title="Previous" items={appts.previous} readOnly />
        </div>
      )}
      {!user && <p>Please log in to view and manage appointments.</p>}
    </div>
  );
}

// Accessible modal with simple focus trap
function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Keep latest onClose without retriggering mount logic
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = ref.current;
    // Focus first focusable once on mount only
    requestAnimationFrame(() => {
      const focusables = el?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusables?.[0]?.focus();
    });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
      }
      if (e.key === "Tab") {
        const focusables = el?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="book-dialog-title" aria-describedby="book-dialog-desc" onClick={(e) => e.stopPropagation()} ref={ref}>
        {children}
      </div>
    </div>
  );
}
