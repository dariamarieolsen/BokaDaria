import type { Appointment } from "../types";
import { canCancel } from "../utils/policy";
import { isReserved, reserveSlot, freeSlot } from "./timeslots";

const appts: Appointment[] = [];

export function listAppointments(userId: string) {
  const now = Date.now();
  const upcoming = appts.filter((a) => a.userId === userId && new Date(a.start).getTime() >= now);
  const previous = appts.filter((a) => a.userId === userId && new Date(a.start).getTime() < now);
  return { upcoming, previous };
}

export function createAppointment(a: Appointment) {
  if (isReserved(a.start) || new Date(a.start).getTime() < Date.now()) {
    throw new Error("Slot unavailable");
  }
  reserveSlot(a.start);
  appts.push(a);
  return a;
}

export function deleteAppointment(id: string) {
  const idx = appts.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  const a = appts[idx];
  if (!canCancel(new Date(a.start))) {
    throw new Error("Cannot cancel within 24 hours");
  }
  appts.splice(idx, 1);
  freeSlot(a.start);
  return true;
}
