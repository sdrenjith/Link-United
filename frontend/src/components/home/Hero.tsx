import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Global Import & Export Solutions</h1>

        <p>
          Link United International connects global suppliers and markets
          through reliable sourcing, trusted partnerships, and professional
          international trade services.
        </p>

        <div className="hero-buttons">
          <Link to="/products" className="hero-btn">
            Explore Products
          </Link>

          <Link to="/contact" className="hero-btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
