import { generateThirtyMinuteSlots } from "../utils/datetime";
import type { Slot } from "../types";

const reserved = new Set<string>(); // ISO strings of reserved start times

export function listSlots(date: Date): Slot[] {
  const slots = generateThirtyMinuteSlots(date);
  return slots.map((d) => ({ time: d.toISOString(), booked: reserved.has(d.toISOString()) }));
}

export function reserveSlot(iso: string) {
  reserved.add(iso);
}
export function freeSlot(iso: string) {
  reserved.delete(iso);
}
export function isReserved(iso: string) {
  return reserved.has(iso);
}
