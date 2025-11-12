import { listSlots } from "../services/timeslots";
import { formatSlot, isPast } from "../utils/datetime";

export interface TimeSlotPickerProps {
  date: Date;
  selected?: string;
  onSelect(slotIso: string): void;
}

export function TimeSlotPicker({ date, selected, onSelect }: TimeSlotPickerProps) {
  const slots = listSlots(date);
  return (
    <div className="slots grid" aria-label="Available time slots">
      {slots.map((s) => {
        const d = new Date(s.time);
        const past = isPast(d);
        const isSelected = selected === s.time;
        return (
          <button
            key={s.time}
            disabled={s.booked || past}
            className={`slot card ${s.booked ? "booked" : "available"} ${isSelected ? "selected" : ""}`}
            aria-pressed={isSelected}
            onClick={() => onSelect(s.time)}
          >
            {formatSlot(d)}
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlotPicker;
