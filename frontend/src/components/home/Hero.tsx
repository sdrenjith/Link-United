import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import GoldButton from "../ui/GoldButton";

import bgShip from "../../assets/images/ship-home01.jpg";
import bgSpices from "../../assets/images/spices03.jpg";
import bgExport from "../../assets/images/exporting01.jpg";
import bgInnovate from "../../assets/images/ship-home02.jpg";

const slides = [
  {
    id: 1,
    image: bgShip,
    eyebrow: "LINK UNITED INTERNATIONAL",
    title: "Connecting Global Trade with Trust",
    highlight: "Trade with Trust",
    subtitle: "Global reach and trusted partnerships across 50+ countries worldwide.",
  },
  {
    id: 2,
    image: bgSpices,
    eyebrow: "QUALITY SOURCING",
    title: "Premium agro products",
    highlight: "Agro products",
    subtitle: "Sourcing the highest quality spices, grains, and agricultural materials for international markets.",
  },
  {
    id: 3,
    image: bgExport,
    eyebrow: "GLOBAL INFRASTRUCTURE",
    title: "Unmatched Logistics Network",
    highlight: "Logistics Network",
    subtitle: "Strategic procurement and seamless cross-border movements ensuring reliable delivery.",
  },
  {
    id: 4,
    image: bgInnovate,
    eyebrow: "SUSTAINABLE FUTURE",
    title: "Innovating Global Commerce",
    highlight: "Innovating",
    subtitle: "Driving sustainable trade practices and empowering local markets globally.",
  },
];

/* ── Scroll indicator ────────────────────────────────────── */

function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setVisible(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
      className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-center"
    >
      <div className="mx-auto mb-2 h-10 w-6 rounded-full border border-gold-400/30 p-1">
        <motion.div
          className="h-2 w-full rounded-full bg-gold-400/60"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="font-body text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        Scroll to discover
      </p>
    </motion.div>
  );
}

/* ── Hero component ────────────────────────────────────── */

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [dbSliders, setDbSliders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch dynamic sliders from admin panel
    import("../../services/http").then((api) => {
      api.default.get("/home-sliders")
        .then((res) => {
          if (res.data.items && res.data.items.length > 0) {
            setDbSliders(res.data.items);
          }
        })
        .catch((err) => console.error("Failed to load hero sliders", err));
    });
  }, []);

  // Determine which images to show. If the admin uploaded 0 images, fallback to the hardcoded ones.
  const activeImages = dbSliders.length > 0 ? dbSliders.map(s => s.imageUrl) : slides.map(s => s.image);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeImages.length]);

  // Merge the dynamic image with the static text by modulo mapping
  const currentImage = activeImages[current];
  const slideText = slides[current % slides.length];

  // Helper to split title and wrap highlight
  const renderTitle = (title: string, highlight: string) => {
    if (!title.includes(highlight)) return title;
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="gold-text">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#080808]">
      {/* Background Image Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentImage}
            alt={slideText.title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay — very light at top so a transparent menubar shows the photo, not a black band */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/35 to-black/65" />

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute inset-x-0 top-0 h-[min(22vh,160px)] bg-gradient-to-b from-[#080808]/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#080808] to-transparent" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,151,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,58,0.5) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center pt-12 md:pt-14">
        <Container>
          <div className="mx-auto max-w-6xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center"
              >
                <p className="font-sans mb-6 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(201,151,58,0.8)" }}>
                  {slideText.eyebrow}
                </p>

                <h1 className="font-sans max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl px-4 text-balance" style={{ letterSpacing: "-0.01em" }}>
                  {renderTitle(slideText.title, slideText.highlight)}
                </h1>

                <p className="font-sans block mx-auto mt-6 max-w-3xl text-base md:text-xl text-zinc-300 font-normal">
                  {slideText.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/services">
                <GoldButton variant="filled">Explore Our Services</GoldButton>
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {activeImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === current ? "w-8 bg-gold-400" : "w-2 bg-gold-400/30 hover:bg-gold-400/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <ScrollIndicator />
    </section>
  );
}
