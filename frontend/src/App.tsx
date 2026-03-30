import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import GeneralProducts from "./pages/products/GeneralProducts";
import AgroCommodities from "./pages/products/AgroCommodities";
import VehiclesMachinery from "./pages/products/VehiclesMachinery";
import WoodProducts from "./pages/products/WoodProducts";
import KidsClothing from "./pages/products/KidsClothing";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import OurBrands from "./pages/OurBrands";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import ProductsManager from "./pages/admin/ProductsManager";
import MediaManager from "./pages/admin/MediaManager";
import SlidersManager from "./pages/admin/SlidersManager";
import HomeSlidersManager from "./pages/admin/HomeSlidersManager";
import AnnouncementsManager from "./pages/admin/AnnouncementsManager";
import EnquiriesPage from "./pages/admin/EnquiriesPage";
import ChangePassword from "./pages/admin/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Admin Auth Routes */}
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/login" element={<Navigate to="/admin" replace />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="media" element={<MediaManager />} />
        <Route path="sliders" element={<SlidersManager />} />
        <Route path="home-sliders" element={<HomeSlidersManager />} />
        <Route path="announcements" element={<AnnouncementsManager />} />
        <Route path="enquiries" element={<EnquiriesPage />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/general" element={<GeneralProducts />} />
        <Route path="/products/agro-commodities" element={<AgroCommodities />} />
        <Route path="/products/vehicles-machinery" element={<VehiclesMachinery />} />
        <Route path="/products/woods-wood-products" element={<WoodProducts />} />
        <Route path="/products/kids-clothing" element={<KidsClothing />} />
        <Route path="/our-brands" element={<OurBrands />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
