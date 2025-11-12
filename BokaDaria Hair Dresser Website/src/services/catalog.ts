import type { Service, Hairdresser } from "../types";

const services: Service[] = [{ id: "svc_haircut", name: "Hair cut", durationMins: 30 }];

const hairdressers: Hairdresser[] = [{ id: "hd_daria", name: "Daria" }];

export function listServices() {
  return services;
}
export function listHairdressers() {
  return hairdressers;
}
