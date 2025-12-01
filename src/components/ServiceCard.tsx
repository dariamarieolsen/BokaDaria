import type { Service } from "../types";
import '../styles/serviceCard.scss';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="service-card-container">
      <div className="service-card" aria-label={service.name} style={{ backgroundImage: `url(${service.imageUrl})` }}>
        <div className="service-card-content">
          <h3 className="service-card-title">{service.name}</h3>
          <p className="service-card-copy">Duration: {service.durationMins} minutes</p>
          <button className="btn" onClick={() => console.log(`Book ${service.name}`)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
