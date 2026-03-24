import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import GeometricLines from "../ui/GeometricLines";
import GoldButton from "../ui/GoldButton";

// Sourced internal images
import shipHome01 from "../../assets/images/ship-home01.jpg";
import exporting01 from "../../assets/images/exporting01.jpg";
import exporting02 from "../../assets/images/exporting02.jpg";
import spices01 from "../../assets/images/spices01.jpg";

const tabs = [
  {
    id: "transport",
    label: "Transport",
    icon: (
      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "Global Transportation Services",
    body: "Ensure your cargo reaches its destination efficiently. From ocean and air freight to comprehensive inland transport, we provide flexible, reliable routing designed around your timeline and budget.",
    features: ["Ocean Freight (FCL & LCL)", "Air Freight Solutions", "Inland Road & Rail", "End-to-End Tracking"],
    image: shipHome01
  },
  {
    id: "store",
    label: "Store",
    icon: (
      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Warehousing & Storage",
    body: "Strategically located warehousing facilities across key global markets to securely store, manage, and distribute your goods with maximum efficiency.",
    features: ["Bonded Warehousing", "Inventory Management", "Pick & Pack Services", "Cross-Docking"],
    image: exporting01
  },
  {
    id: "management",
    label: "Logistics Management",
    icon: (
      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Supply Chain Solutions",
    body: "Comprehensive 4PL and supply chain management. We optimize your entire logistics operations, providing data-driven insights and end-to-end visibility.",
    features: ["Supply Chain Design", "4PL Services", "Data & Analytics", "Order Management"],
    image: exporting02
  },
  {
    id: "solutions",
    label: "Solutions",
    icon: (
      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    title: "Industry-Specific Solutions",
    body: "Tailored logistics approaches for specialized industries. Whether you're moving perishables, heavy machinery, or retail goods, we have the expertise to execute.",
    features: ["Agro & Perishables", "Automotive & Machinery", "Retail & FMCG", "Wood & Renewables"],
    image: spices01
  }
];

export default function ServicesPreview() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="relative z-10 overflow-hidden py-16 md:py-24">
      <GeometricLines variant="left" opacity={0.5} />

      <Container>
        <SectionLabel
          eyebrow="What We Do"
          title="Logistics services and solutions"
          description="Regardless of your industry, your commodity, or your key markets, Link United offers global and local logistics solutions that enable small and large businesses to grow."
          centered
        />

        {/* Tab Navigation Menu */}
        <div className="relative mt-12 lg:mt-16 w-full">
          {/* Desktop persistent full-width underline overlaying the individuals */}
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-px bg-zinc-800/80 -z-10" />

          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            
            {/* 2x2 Grid on Mobile, Flex Row on Desktop */}
            <div className="grid grid-cols-2 lg:flex lg:justify-between items-end gap-x-4 gap-y-10 lg:gap-y-0 lg:gap-x-0 w-full">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex-1 flex flex-col items-center pb-4 pt-2 group border-b border-zinc-800/80 lg:border-b-0"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {/* Inner content wrapper controls the width of the active gold indicator */}
                    <div className={`relative flex flex-col items-center justify-end h-full transition-colors duration-300 w-full sm:max-w-[160px] ${
                      isActive ? "text-gold-400" : "text-zinc-500 group-hover:text-white"
                    }`}>
                      <div className={`mb-3 transition-transform duration-300 ${!isActive && "group-hover:-translate-y-1"}`}>
                        {tab.icon}
                      </div>

                      <span className="text-center text-[10px] sm:text-[11px] lg:text-[12px] xl:text-[13px] font-sans font-bold uppercase tracking-[0.15em] leading-[1.4] mt-1 flex items-center justify-center min-h-[32px]">
                        {tab.label}
                      </span>
                      
                      {/* Active Indicator positioned perfectly over the border */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-gold-400 mx-auto w-full lg:w-[120%]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative mt-16 min-h-[500px] lg:min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center xl:mx-10"
            >
              {/* Left Content */}
              <div className="order-2 lg:order-1 space-y-6">
                <h3 className="text-3xl lg:text-4xl font-light tracking-tight text-white leading-tight">
                  {currentTab.title}
                </h3>
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed lg:max-w-lg">
                  {currentTab.body}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-4">
                  {currentTab.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[15px] text-zinc-300">
                      <span className="flex-shrink-0 w-[5px] h-[5px] rounded-full bg-gold-400/80" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-6">
                  <Link to="/services">
                    <GoldButton variant="ghost">Learn More About {currentTab.label}</GoldButton>
                  </Link>
                </div>
              </div>

              {/* Right Image Container */}
              <div className="order-1 lg:order-2 h-[280px] sm:h-[350px] lg:h-[420px] relative rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                <img 
                  src={currentTab.image} 
                  alt={currentTab.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-600/80 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gold-400 mix-blend-overlay opacity-[0.03]" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </Container>
    </section>
  );
}
