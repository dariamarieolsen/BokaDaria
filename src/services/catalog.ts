import type { Service, Hairdresser } from "../types";
import beerImage from '../assets/beer.png';
import massageImage from '../assets/facial-massage.png';
import scissors from '../assets/scissors_2.png';

const services: Service[] = [{ id: "1", name: "Hair cut", durationMins: 30, imageUrl: scissors }, { id: "2", name: "Hair cut + 1 beer", durationMins: 30, imageUrl: beerImage }, { id: "3", name: "Hair cut + 1 beer + neck massage", durationMins: 45, imageUrl: massageImage }];

const hairdressers: Hairdresser[] = [{ id: "hd_daria", name: "Daria" }];

export function listServices() {
  return services;
}
export function listHairdressers() {
  return hairdressers;
}
