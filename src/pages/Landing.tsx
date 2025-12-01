import { useEffect } from "react";
import { setDocumentTitle, setMetaDescription } from "../utils/seo";
import { listServices } from "../services/catalog";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
import { store } from "../data/store";
import Map from "../components/Map";
import HeroImage from '../assets/scissors-hero.jpg';

export default function Landing() {
  useEffect(() => {
    setDocumentTitle("BokaDaria — Salon & Services");
    setMetaDescription("BokaDaria: Hair dresser services by Daria. Book hair cut, see payment methods, and learn about the salon.");
  }, []);

  return (
    <div className="container" aria-labelledby="landing-title">
      <div style={{ backgroundImage: `url(${HeroImage})` }} className="hero-container">
        <div>
          <h1 id="landing-title">BokaDaria</h1>
          {!store.user && (
            <p>
              <Link to="/login" className="btn">
                Book appointment
              </Link>
            </p>
          )}
        </div>
      </div>

      <section aria-labelledby="salon-info" className="about">
        <h2 id="salon-info">About the Salon</h2>
        <div>
          <p>Welcome to my little hobby-salon in the heart of Västra Hamnen, where the scissors are sharp, the vibes are cozy, and my boyfriend is the bravest client in Malmö.</p>
          <p>What started as “Hmm… let me try something…” quickly turned into a passion for creating clean and fresh trims. I love the mix of precision and creativity that comes with cutting hair, and I treat every session as a chance to learn, laugh, and make someone feel great.</p>
          <p>  My salon may be small, but it’s filled with good music, good energy, and sometime with a beer on the house.

            So welcome to my world—where home turns into a salon, hair becomes an experiment, and love is measured in millimeters.</p>
        </div>
      </section >

      <section aria-labelledby="services">
        <h2 id="services">Services</h2>
        <div className="service-container">
          {listServices().map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </section >

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
    </div >
  );
}
