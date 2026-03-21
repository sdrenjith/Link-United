import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#080808]" style={{ isolation: "isolate" }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
