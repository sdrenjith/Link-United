import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav>
        <div className="logo">
          <NavLink to="/">NavLink United</NavLink>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/services">Services</NavLink>
          </li>

          <li className="dropdown">
            <NavLink to="/products">Products</NavLink>

            <ul className="dropdown-menu">
              <li>
                <NavLink to="/products/general">General Products</NavLink>
              </li>
              <li>
                <NavLink to="/products/agro">Agro Commodities</NavLink>
              </li>
              <li>
                <NavLink to="/products/vehicles">Vehicles & Machinery</NavLink>
              </li>
              <li>
                <NavLink to="/products/wood">Wood Products</NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink to="/media">Media</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
