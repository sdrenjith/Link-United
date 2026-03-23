import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./ui/Container";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products", hasMega: true },
  { label: "Media", path: "/media" },
];

const productCategories = [
  {
    name: "General Products",
    path: "/products/general",
    desc: "Consumer electronics, appliances & industrial essentials",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    name: "Agro Commodities",
    path: "/products/agro-commodities",
    desc: "Spices, grains, oils & agricultural raw materials",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
  },
  {
    name: "Vehicles & Machinery",
    path: "/products/vehicles-machinery",
    desc: "Heavy equipment, vehicles & industrial machinery",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Woods & Wood Products",
    path: "/products/woods-wood-products",
    desc: "Premium timber from certified global producers",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Kids Clothing",
    path: "/products/kids-clothing",
    desc: "Quality children's apparel for international retail",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-400/10 bg-dark-600/80 shadow-lg shadow-black/40 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Link United International"
              className="h-20 md:h-28 lg:h-32 w-auto"
              style={{ filter: "drop-shadow(0 0 12px rgba(201,151,58,0.5))" }}
            />
          </NavLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => (
              <li
                key={item.path}
                onMouseEnter={item.hasMega ? handleMegaEnter : undefined}
                onMouseLeave={item.hasMega ? handleMegaLeave : undefined}
                className="relative"
              >
                <NavLink
                  className={({ isActive }) =>
                    `group relative px-4 py-2 font-body text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                      isActive
                        ? "text-gold-200"
                        : "text-zinc-400 hover:text-white"
                    }`
                  }
                  to={item.path}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full bg-gradient-to-r from-gold-200 to-gold-400 transition-transform duration-300 origin-left ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-gold-400/40 px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-gold-200 transition-all duration-300 hover:border-gold-400/70 hover:shadow-[0_0_20px_rgba(201,151,58,0.15)]"
            >
              <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />
              <span className="relative">Contact Us</span>
            </Link>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700/50 text-zinc-300 transition hover:border-gold-400/30 hover:text-gold-200 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </Container>

      {/* Mega Menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            className="absolute left-0 top-full w-full border-b border-t border-gold-400/10 bg-[#080808]/95 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
          >
            {/* Subtle Grid Pattern inside the Mega Menu */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(201,151,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,58,0.5) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <Container className="relative py-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                {/* Left Intro text for the Mega Menu */}
                <div className="lg:w-[280px] lg:shrink-0 lg:pr-8 border-b border-zinc-800/50 pb-6 lg:border-b-0 lg:border-r lg:pb-0">
                  <p className="font-sans mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">
                    Product Categories
                  </p>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-sm">
                    Explore our ultra-premium selection of goods, globally sourced for excellence and reliability.
                  </p>
                  <Link
                    to="/products"
                    onClick={() => setMegaOpen(false)}
                    className="font-sans mt-5 inline-flex items-center text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-gold-200"
                  >
                    View All &rarr;
                  </Link>
                </div>

                {/* Right Categories Grid */}
                <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                  {productCategories.map((cat, i) => (
                    <motion.div
                      key={cat.path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={cat.path}
                        onClick={() => setMegaOpen(false)}
                        className="group relative flex h-full min-h-[140px] flex-col overflow-hidden rounded-2xl border border-zinc-800/40 bg-white/[0.01] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/30 hover:bg-dark-600/60 hover:shadow-[0_10px_30px_rgba(201,151,58,0.1)]"
                      >
                        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/50 text-gold-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-dark-600">
                          {cat.icon}
                        </span>
                        <div>
                          <p className="font-sans text-[13px] font-semibold text-white transition-colors group-hover:text-gold-200">
                            {cat.name}
                          </p>
                          <p className="font-sans mt-1.5 text-[11px] text-zinc-500 line-clamp-2">
                            {cat.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-dark-600/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <img
                src="/logo.png"
                alt="Link United International"
                className="h-14 w-auto"
                style={{ filter: "drop-shadow(0 0 12px rgba(201,151,58,0.4))" }}
              />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700/50 text-zinc-300"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center px-8">
              {[...navLinks, { label: "Contact", path: "/contact" }].map(
                (item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block border-b border-zinc-800/50 py-5 font-body text-2xl font-medium tracking-wide transition ${
                          isActive ? "text-gold-200" : "text-zinc-300 hover:text-white"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                )
              )}
            </div>

            <div className="px-8 pb-10">
              <p className="text-xs text-zinc-500">
                info@linkunited.co.uk
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
