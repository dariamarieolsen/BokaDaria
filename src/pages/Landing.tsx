import { useEffect } from "react";
import { setDocumentTitle, setMetaDescription } from "../utils/seo";
import { listServices } from "../services/catalog";
import ServiceCard from "../components/ServiceCard";
import { Link, redirect, useNavigate } from "react-router-dom";
import { store } from "../data/store";
import Map from "../components/Map";
import HeroImage from "../assets/scissors_grey.jpg";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    setDocumentTitle("BokaDaria — Salon & Services");
    setMetaDescription(
      "BokaDaria: Hair dresser services by Daria. Book hair cut, see payment methods, and learn about the salon."
    );
  }, []);

  return (
    <div className="container" aria-labelledby="landing-title">
      <div style={{ backgroundImage: `url(${HeroImage})` }} className="hero-container">
        <div>
          <h1 id="landing-title" className="landing-title">
            BokaDaria
          </h1>
          {!store.user && (
            <button className="btn regular" onClick={() => navigate("/login")}>
              Book appointment
            </button>
          )}
        </div>
      </div>

      <section aria-labelledby="salon-info" className="about">
        <h2 id="salon-info">About the Salon</h2>
        <div>
          <p>
            Welcome to my little hobby-salon in the heart of Västra Hamnen, where the scissors are sharp, the vibes are
            cozy, and my boyfriend is the bravest client in Malmö.
          </p>
          <p>
            What started as “Hmm… let me try something…” quickly turned into a passion for creating clean and fresh
            trims. I love the mix of precision and creativity that comes with cutting hair, and I treat every session as
            a chance to learn, laugh, and make someone feel great.
          </p>
          <p>
            My salon may be small, but it’s filled with good music, good energy, and sometime with a beer on the house.
            So welcome to my world—where home turns into a salon, hair becomes an experiment, and love is measured in
            millimeters.
          </p>
        </div>
      </section>

      <section aria-labelledby="services">
        <h2 id="services" style={{ textAlign: 'start' }}>Services</h2>
        <div className="service-container">
          {listServices().map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </section>

      <section aria-labelledby="hairdresser" className="card">
        <h2 id="hairdresser">Your Hairdresser</h2>
        <p>Daria — experienced and attentive. You’re in great hands.</p>
      </section>

      <section aria-labelledby="payments" className="card payments">
        <h2 id="payments" style={{ textAlign: 'end' }}>Payment Methods</h2>
        <div className="payment-options">
          <div className="payment-card">
            <div className="payment-icon">💆‍♀️</div>
            <h3>Massage</h3>
            <p>Trade a relaxing massage for your haircut</p>
          </div>
          <div className="payment-card">
            <div className="payment-icon">📱</div>
            <h3>Swish</h3>
            <p>Quick and easy mobile payment</p>
          </div>
          <div className="payment-card">
            <div className="payment-icon">🎁</div>
            <h3>Random Gift</h3>
            <p>Surprise me with something creative!</p>
          </div>
        </div>
        {store.user && (
          <p style={{ marginTop: "8px" }}>
            <Link to="/booking" className="btn ghost">
              Go to booking
            </Link>
          </p>
        )}
      </section>

      <section aria-labelledby="location" className="card">
        <h3 id="location">Some inspiration where you can buy some delicious cheese cakes, and you know what I´m talking about!</h3>
        <Map />
      </section>
    </div>
  );
}
