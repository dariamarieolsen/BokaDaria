import type { Appointment } from "../types";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export function AppointmentList({ items, onCancel, title, readOnly = false }: { items: Appointment[]; onCancel?: (id: string) => void; title: string; readOnly?: boolean }) {
  return (
    <section className="card booked_slots" aria-labelledby={`${title}-heading`}>
      <h2 id={`${title}-heading`}>{title}</h2>
      <ul className="list">
        {items.map((a) => (
          <li key={a.id} className="list-item">
            {!readOnly && onCancel && (
              <button className="btn ghost" onClick={() => onCancel(a.id)} style={{ padding: 0 }}>
                <DeleteOutlineIcon aria-label="Cancel appointment" />
              </button>
            )}
            <span>
              {new Date(a.start).toLocaleString()} — {new Date(a.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            {a.paymentMethod && (
              <span style={{ display: "block", fontSize: "0.75rem", opacity: 0.8 }}>Payment: {a.paymentMethod === "swish" ? "Swish" : a.paymentMethod === "cash" ? "Cash" : "Card"}</span>
            )}
          </li>
        ))}
        {items.length === 0 && <li>No items</li>}
      </ul>
    </section>
  );
}

export default AppointmentList;
