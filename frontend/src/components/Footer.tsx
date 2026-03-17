import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>Link United International</h3>
          <p>
            A global import and export company connecting international markets
            with reliable sourcing and trusted partnerships.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/media">Media</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li>
              <Link to="/products/general">General Products</Link>
            </li>
            <li>
              <Link to="/products/agro">Agro Commodities</Link>
            </li>
            <li>
              <Link to="/products/vehicles">Vehicles & Machinery</Link>
            </li>
            <li>
              <Link to="/products/wood">Wood Products</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: info@linkunited.com</p>
          <p>Phone: +000000000</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Link United International
      </div>
    </footer>
  );
}

export default Footer;
