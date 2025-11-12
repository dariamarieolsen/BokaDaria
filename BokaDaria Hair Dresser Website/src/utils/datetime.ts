export function generateThirtyMinuteSlots(date: Date, startHour = 9, endHour = 17): Date[] {
  const slots: Date[] = [];
  const base = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, 0, 0, 0);
  while (base.getHours() < endHour) {
    slots.push(new Date(base));
    base.setMinutes(base.getMinutes() + 30);
  }
  return slots;
}

export function formatSlot(d: Date): string {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function timezoneLabel(): string {
  const dtf = new Intl.DateTimeFormat(undefined, { timeZoneName: "short" });
  const parts = dtf.formatToParts(new Date());
  const tz = parts.find((p) => p.type === "timeZoneName")?.value || "";
  return tz;
}

export function isPast(slot: Date): boolean {
  return slot.getTime() < Date.now();
}
