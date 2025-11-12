export type Service = { id: string; name: string; durationMins: number };
export type Hairdresser = { id: string; name: string };
export type PaymentMethod = "card" | "swish" | "cash";
export type Appointment = {
  id: string;
  userId: string;
  serviceId: string;
  hairdresserId: string;
  start: string;
  end: string;
  note?: string;
  customerName?: string;
  customerPhone?: string;
  paymentMethod?: PaymentMethod;
};
export type Slot = { time: string; booked: boolean };
