import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import AnnouncementsTicker from "../components/ui/AnnouncementsTicker";
import CompanyIntro from "../components/home/CompanyIntro";
import ServicesPreview from "../components/home/ServicesPreview";
import ProductCategories from "../components/home/ProductCategories";
import GlobalTrade from "../components/home/GlobalTrade";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CTASection from "../components/home/CTASection";
import ScrollToTop from "../components/ui/ScrollToTop";
import SpiceParticles from "../components/ui/SpiceParticles";
import api from "../services/http";

const fallbackAnnouncements = [
  { id: "1", title: "Global Shipping", description: "Seamless sea and air freight across all major global trade routes.", imageUrl: "" },
  { id: "2", title: "Quality Assured", description: "100% rigorous quality control across every product category we handle.", imageUrl: "" },
  { id: "3", title: "Trusted Worldwide", description: "Partner networks established in over 50 countries operating 24/7.", imageUrl: "" },
];

export default function Home() {
  const [announcements, setAnnouncements] = useState<any[]>(fallbackAnnouncements);

  useEffect(() => {
    api.get("/announcements")
      .then((res) => {
        if (res.data.items && res.data.items.length > 0) {
          // Filter to only show active ones if needed, but the backend doesn't filter by default.
          const active = res.data.items.filter((item: any) => item.isActive !== false);
          if (active.length > 0) setAnnouncements(active);
        }
      })
      .catch((err) => console.error("Failed to load announcements", err));
  }, []);

  return (
    <div className="bg-[#080808] overflow-x-hidden w-full">
      <SpiceParticles count={40} />
      <div className="relative z-[60]">
        <Hero />
      </div>

      <div className="relative z-[70] rounded-b-[40px] md:rounded-b-[64px] bg-[#080808] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <AnnouncementsTicker items={announcements} />
        <CompanyIntro />
      </div>

      <div className="relative z-[40] -mt-16 pt-16 rounded-b-[40px] md:rounded-b-[64px] bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <ServicesPreview />
      </div>

      <div className="relative z-[30] -mt-16 pt-16 rounded-b-[40px] md:rounded-b-[64px] bg-[#080808] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <ProductCategories />
      </div>

      <div className="relative z-[20] -mt-16 pt-16 bg-[#040404]">
        <WhyChooseUs />
      </div>

      <div className="relative z-[10] -mt-16 pt-16 rounded-b-[40px] md:rounded-b-[64px] bg-[#080808] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <GlobalTrade />
      </div>

      <div className="relative z-[0] -mt-16 pt-16 bg-[#111111]">
        <CTASection />
      </div>

      <ScrollToTop />
    </div>
  );
}
