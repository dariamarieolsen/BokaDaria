import type { Service } from "../types";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card card" aria-label={service.name}>
      <h3>{service.name}</h3>
      <p>Duration: {service.durationMins} minutes</p>
    </article>
  );
}
