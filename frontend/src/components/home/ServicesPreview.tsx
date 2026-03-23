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
import spices03 from "../../assets/images/spices03.jpg";
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
    id: "clear",
    label: "Clear & Protect",
    icon: (
      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Customs & Compliance",
    body: "Navigate complex global trade regulations with ease. We handle customs clearance, cargo insurance, and regulatory compliance to keep your supply chain moving without delays.",
    features: ["Customs Brokerage", "Cargo Insurance", "Trade Compliance", "Risk Management"],
    image: spices03
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
        <div className="relative mt-12 lg:mt-16 border-b border-zinc-800/80 w-full">
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-6">
            <div className="flex justify-between items-end w-full">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex-1 flex flex-col items-center pb-4 pt-2 group"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {/* Inner content wrapper controls the width of the active gold indicator */}
                    <div className={`relative flex flex-col items-center transition-colors duration-300 ${
                      isActive ? "text-gold-400" : "text-zinc-500 group-hover:text-white"
                    }`}>
                      <div className={`mb-2 transition-transform duration-300 ${!isActive && "group-hover:-translate-y-1"}`}>
                        {tab.icon}
                      </div>

                      {/* Text allowed to wrap to two lines on smaller screens */}
                      <span className="text-center text-[10px] sm:text-[13px] md:text-sm font-sans font-medium tracking-wide leading-[1.3] max-w-[75px] sm:max-w-[120px]">
                        {tab.label}
                      </span>
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          // Positioned exactly over the bottom border of the parent container
                          className="absolute -bottom-[1.05rem] left-[-0.25rem] right-[-0.25rem] h-[2px] bg-gold-400"
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
