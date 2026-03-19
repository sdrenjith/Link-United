import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import GeneralProducts from "./pages/products/GeneralProducts";
import AgroCommodities from "./pages/products/AgroCommodities";
import VehiclesMachinery from "./pages/products/VehiclesMachinery";
import WoodProducts from "./pages/products/WoodProducts";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />}>
          <Route path="general" element={<GeneralProducts />} />
          <Route path="agro" element={<AgroCommodities />} />
          <Route path="vehicles" element={<VehiclesMachinery />} />
          <Route path="wood" element={<WoodProducts />} />
        </Route>
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
