import { useEffect } from "react";
import { setDocumentTitle, setMetaDescription } from "../utils/seo";
import { listServices } from "../services/catalog";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
import { store } from "../data/store";
import Map from "../components/Map";

export default function Landing() {
  useEffect(() => {
    setDocumentTitle("BokaDaria — Salon & Services");
    setMetaDescription("BokaDaria: Hair dresser services by Daria. Book hair cut, see payment methods, and learn about the salon.");
  }, []);

  return (
    <div className="container" aria-labelledby="landing-title">
      <h1 id="landing-title">Welcome to BokaDaria</h1>
      {!store.user && (
        <p>
          <Link to="/login" className="btn primary" style={{ display: "inline-block" }}>
            Book appointment
          </Link>
        </p>
      )}

      <section aria-labelledby="salon-info" className="card">
        <h2 id="salon-info">About the Salon</h2>
        <p>Cozy salon offering quality hair services with personal attention. Located centrally, open Mon–Fri.</p>
      </section>

      <section aria-labelledby="services" className="card">
        <h2 id="services">Services</h2>
        <div className="grid">
          {listServices().map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </section>

      <section aria-labelledby="hairdresser" className="card">
        <h2 id="hairdresser">Your Hairdresser</h2>
        <p>Daria — experienced and attentive. You’re in great hands.</p>
      </section>

      <section aria-labelledby="payments" className="card">
        <h2 id="payments">Payment Methods</h2>
        <ul>
          <li>Massage</li>
          <li>Swish</li>
          <li>Random gift</li>
        </ul>
        {store.user && (
          <p style={{ marginTop: "8px" }}>
            <Link to="/booking" className="btn ghost">
              Go to booking
            </Link>
          </p>
        )}
      </section>

      <section aria-labelledby="location" className="card">
        <h2 id="location">Salons Location and map over places where you can by me gifts for the cut 😉</h2>
        <Map />
      </section>
    </div>
  );
}
