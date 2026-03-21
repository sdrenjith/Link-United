import Hero from "../components/home/Hero";
import Marquee from "../components/ui/Marquee";
import CompanyIntro from "../components/home/CompanyIntro";
import ServicesPreview from "../components/home/ServicesPreview";
import ProductCategories from "../components/home/ProductCategories";
import GlobalTrade from "../components/home/GlobalTrade";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CTASection from "../components/home/CTASection";
import ScrollToTop from "../components/ui/ScrollToTop";
import SpiceParticles from "../components/ui/SpiceParticles";

const marqueeItems = [
  "Global Shipping",
  "Container Logistics",
  "Import & Export",
  "UK Operations",
  "USA Operations",
  "Agro Commodities",
  "Vehicles & Machinery",
  "Kids Clothing",
  "Wood Products",
  "Trusted Worldwide",
  "Quality Assured",
];

export default function Home() {
  return (
    <div className="bg-[#080808]">
      <SpiceParticles count={40} />
      <div className="relative z-[60]">
        <Hero />
      </div>

      <div className="relative z-[50] rounded-b-[40px] md:rounded-b-[64px] bg-[#080808] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <Marquee items={marqueeItems} />
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
