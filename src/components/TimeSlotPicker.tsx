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
            //so button is not treated as submit button in a form
            type="button"
            disabled={s.booked || past}
            className={`slot card btn ${s.booked || past ? "booked" : "available"}`}
            aria-pressed={isSelected}
            onClick={(e) => {
              // Prevent bubbling to any parent click handlers that might clear selection
              e.stopPropagation();
              onSelect(s.time);
            }}
          >
            {formatSlot(d)}
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlotPicker;
