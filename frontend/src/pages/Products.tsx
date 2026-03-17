import { Link, Outlet } from "react-router-dom";

function Products() {
  return (
    <section className="products-page">
      <div className="products-container">
        <h1>Our Products</h1>

        <div className="products-grid">
          <Link to="/products/general" className="product-card">
            <h3>General Products</h3>
          </Link>

          <Link to="/products/agro" className="product-card">
            <h3>Agro Commodities</h3>
          </Link>

          <Link to="/products/vehicles" className="product-card">
            <h3>Vehicles & Machinery</h3>
          </Link>

          <Link to="/products/wood" className="product-card">
            <h3>Woods & Wood Products</h3>
          </Link>
        </div>

        <Outlet />
      </div>
    </section>
  );
}

export default Products;
