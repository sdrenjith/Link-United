import { Link } from "react-router-dom";

function ProductCategories() {
  return (
    <section className="categories">
      <div className="categories-container">
        <h2>Our Product Categories</h2>

        <div className="category-grid">
          <Link to="/products/general" className="category-card">
            <img src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0" />
            <h3>General Products</h3>
          </Link>

          <Link to="/products/agro" className="category-card">
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef" />
            <h3>Agro Commodities</h3>
          </Link>

          <Link to="/products/vehicles" className="category-card">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70" />
            <h3>Vehicles & Machinery</h3>
          </Link>

          <Link to="/products/wood" className="category-card">
            <img src="https://images.unsplash.com/photo-1582582429416-0f1b0d7b70f4" />
            <h3>Woods & Wood Products</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;
