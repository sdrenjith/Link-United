import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./ui/Container";
import NavProductSearch from "./NavProductSearch";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products", hasMega: true },
  { label: "Our Brands", path: "/our-brands" },
  { label: "Media", path: "/media" },
];

const productCategories = [
  {
    name: "Agro products",
    path: "/products/agro-commodities",
    desc: "Spices, grains, oils & agricultural raw materials",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
  },
  {
    name: "Kids wear",
    path: "/products/kids-clothing",
    desc: "Quality children's apparel for international retail",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: "General commodities",
    path: "/products/general",
    desc: "Consumer electronics, appliances & industrial essentials",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    name: "Wood & wood furniture",
    path: "/products/woods-wood-products",
    desc: "Premium timber from certified global producers",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Vehicle & machinery",
    path: "/products/vehicles-machinery",
    desc: "Heavy equipment, vehicles & industrial machinery",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
];

/**
 * After this scroll distance, show solid menubar (dark bg + standard link colours).
 * Full-viewport / cinematic heroes: ~88% of viewport. Compact PageHero pages: ~40% (min 220px).
 */
const CINEMATIC_HERO_PATHS = new Set([
  "/",
  "/services",
  "/about",
  "/media",
  "/contact",
]);

function solidHeaderScrollThreshold(pathname: string): number {
  const vh = Math.max(window.innerHeight, 320);
  if (CINEMATIC_HERO_PATHS.has(pathname)) {
    return Math.min(vh * 0.88, 980);
  }
  return Math.min(Math.max(vh * 0.4, 220), 480);
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [megaTop, setMegaTop] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /** Transparent over hero at top; solid bar after scrolling past hero (all public pages). */
  useLayoutEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setHeaderSolid(y > solidHeaderScrollThreshold(pathname));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  /** Mega menu is fixed below the header — keep its top edge synced while scrolling. */
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const sync = () => setMegaTop(el.getBoundingClientRect().bottom);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      ro.disconnect();
    };
  }, [megaOpen]);

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
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 320);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 z-[100] w-full transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ${
          headerSolid
            ? "border-b border-gold-400/10 bg-[#080808]/90 shadow-lg shadow-black/40 backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent shadow-none backdrop-blur-none"
        }`}
        style={
          headerSolid
            ? undefined
            : {
                backgroundColor: "rgba(0,0,0,0)",
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
              }
        }
      >
      {/* Full-width row: symmetric inset from viewport edges (not max-w-7xl), so gutter left of logo = gutter right of Contact Us */}
      <div className="w-full bg-transparent px-3 sm:px-4 md:px-5 lg:px-5 xl:px-6 2xl:px-8">
        <nav className="flex w-full items-center justify-between gap-2 bg-transparent py-2 sm:py-2.5 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-x-2 lg:py-2.5 xl:gap-x-4">
          <NavLink
            to="/"
            className="flex min-w-0 shrink-0 items-center lg:col-start-1 lg:justify-self-start"
          >
            <img
              src="/logo.png"
              alt="Link United International"
              className="h-20 w-auto max-w-full object-contain object-left sm:h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40"
              style={{ filter: "drop-shadow(0 0 12px rgba(201,151,58,0.5))" }}
            />
          </NavLink>

          {/* Start nav right after logo; keep right padding so it doesn't run under search/contact. */}
          <div className="relative z-[1] hidden min-w-0 max-w-full justify-self-stretch lg:col-start-2 lg:flex lg:min-w-0 lg:items-center lg:justify-start lg:overflow-hidden lg:pl-0 lg:pr-2 xl:pr-3">
            <ul className="flex min-w-0 max-w-full flex-nowrap items-center justify-start gap-x-0.5 overflow-x-auto overscroll-x-contain whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navLinks.map((item) => (
                <li
                  key={item.path}
                  onMouseEnter={item.hasMega ? handleMegaEnter : undefined}
                  onMouseLeave={item.hasMega ? handleMegaLeave : undefined}
                  className="relative shrink-0"
                >
                  <NavLink
                    className={({ isActive }) => {
                      const overHero = !headerSolid;
                      const heroNav = overHero
                        ? isActive
                          ? ""
                          : "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.45)] hover:text-[#C9973A]"
                        : "";
                      const solidNav = !overHero
                        ? isActive
                          ? "text-gold-400"
                          : "text-zinc-400 hover:text-[#C9973A]"
                        : "";
                      return `group relative inline-flex flex-col items-center px-1.5 py-2 font-body text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-300 lg:px-2 lg:text-[14px] xl:px-2.5 xl:text-[15px] 2xl:text-base ${heroNav || solidNav}`;
                    }}
                    to={item.path}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={
                            isActive
                              ? "gold-text font-semibold [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.7))]"
                              : "transition-colors duration-300 group-hover:text-[#C9973A]"
                          }
                        >
                          {item.label}
                        </span>
                        <span
                          className={`pointer-events-none absolute -bottom-[1px] left-1.5 right-1.5 h-[3px] rounded-full bg-gradient-to-r from-[#E8C97A] via-[#C9973A] to-[#9A6F1E] shadow-[0_0_8px_rgba(201,151,58,0.4)] transition-all duration-300 origin-left lg:left-2 lg:right-2 xl:left-2.5 xl:right-2.5 ${
                            isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-[2] hidden min-w-0 shrink-0 items-center justify-end gap-2 lg:col-start-3 lg:flex lg:justify-self-end lg:gap-2 xl:gap-3">
            <NavProductSearch variant="desktop" opaqueHeader={headerSolid} />
            <Link
              to="/contact"
              className={`group relative inline-flex h-10 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg border px-5 font-body text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 xl:px-6 ${
                headerSolid
                  ? "border-gold-400/40 hover:border-gold-400/70 hover:shadow-[0_0_20px_rgba(201,151,58,0.15)]"
                  : "border-white/40 hover:border-white/70 hover:bg-black/25 hover:shadow-[0_0_24px_rgba(0,0,0,0.35)]"
              }`}
            >
              <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />
              <span
                className={`relative gold-text ${
                  headerSolid ? "" : "[filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.9))_drop-shadow(0_0_10px_rgba(0,0,0,0.5))]"
                }`}
              >
                Contact Us
              </span>
            </Link>
          </div>

          <button
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition lg:hidden ${
              headerSolid
                ? "border-zinc-700/50 text-zinc-300 hover:border-gold-400/40 hover:text-gold-400"
                : "border-white/35 text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.9))] hover:border-white/60 hover:text-white"
            }`}
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
      </div>
      </header>

      {/* Mega menu: fixed sibling (not inside <header>) so its dark panel never paints behind the nav row */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            style={{ top: megaTop }}
            className="fixed left-0 right-0 z-[99] max-h-[min(85vh,calc(100dvh-4rem))] overflow-y-auto border-b border-t border-gold-400/10 bg-[#080808]/96 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(201,151,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,58,0.5) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <Container className="relative py-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                <div className="lg:w-[280px] lg:shrink-0 lg:pr-8 border-b border-zinc-800/50 pb-6 lg:border-b-0 lg:border-r lg:pb-0">
                  <p className="font-sans mb-3 text-[11px] font-bold uppercase tracking-[0.3em] gold-text">
                    Product Categories
                  </p>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-sm">
                    Explore our ultra-premium selection of goods, globally sourced for excellence and reliability.
                  </p>
                  <Link
                    to="/products"
                    onClick={() => setMegaOpen(false)}
                    className="font-sans mt-5 inline-flex items-center text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-gold-400"
                  >
                    View All &rarr;
                  </Link>
                </div>

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
                          <p className="font-sans text-[13px] font-semibold text-white transition-colors group-hover:text-gold-400">
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

      {/* Mobile Full-Screen Menu moved outside the header container to fix CSS backdrop-blur stacking context clipping bugs when scrolled */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-[120] flex flex-col bg-[#050505] lg:hidden overflow-hidden"
          >
            {/* Minimal Grid Background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(201,151,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,58,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Top Glow Ambient */}
            <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[300px] w-[300px] rounded-full bg-gold-400 opacity-[0.04] blur-[80px]" />

            {/* Integrated Header Bar */}
            <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/[0.04] bg-[#050505]/90 px-4 py-4 backdrop-blur-md sm:px-5 sm:py-5">
              <img
                src="/logo.png"
                alt="Link United International"
                className="h-20 w-auto min-w-0 sm:h-24 md:h-28"
                style={{ filter: "drop-shadow(0 0 10px rgba(201,151,58,0.3))" }}
              />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-zinc-300 transition hover:scale-95 active:bg-white/10"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative z-10 border-b border-white/[0.04] px-4 pb-4 pt-2">
              <NavProductSearch variant="mobile" onNavigate={() => setMenuOpen(false)} />
            </div>

            {/* Menu Links scrollable area */}
            <div className="relative z-10 flex flex-1 flex-col px-8 pt-4 pb-12 overflow-y-auto space-y-1">
              {[...navLinks, { label: "Contact Us", path: "/contact" }].map(
                (item, i) => {
                  if (item.hasMega) {
                    return (
                      <div key={item.path} className="border-b border-white/[0.03]">
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className="group flex w-full items-center justify-between py-5 transition-all duration-300 text-zinc-500 hover:text-white"
                        >
                          <span className="font-sans text-2xl sm:text-3xl font-light tracking-tight transition-colors">
                            {item.label}
                          </span>
                          <svg 
                            className={`w-5 h-5 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180 text-gold-400' : ''}`} 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Submenu Accordion */}
                        <AnimatePresence>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-5 pb-8 pl-2">
                                {productCategories.map((cat) => (
                                  <NavLink
                                    key={cat.path}
                                    to={cat.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="group flex items-start gap-4 text-zinc-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                                  >
                                    {({ isActive }) => (
                                      <>
                                        <span
                                          className={`mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                                            isActive
                                              ? "text-gold-400"
                                              : "text-gold-500/40 group-hover:text-gold-400"
                                          }`}
                                        >
                                          {cat.icon}
                                        </span>
                                        <div>
                                          <span
                                            className={`block font-sans text-[15px] font-medium tracking-wide ${
                                              isActive ? "gold-text" : ""
                                            }`}
                                          >
                                            {cat.name}
                                          </span>
                                          <span className="block font-sans mt-1 text-[11px] leading-[1.3] text-zinc-500">
                                            {cat.desc}
                                          </span>
                                        </div>
                                      </>
                                    )}
                                  </NavLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between border-b border-white/[0.03] py-5 transition-all duration-300 ${
                            isActive ? "border-white/[0.08]" : "text-zinc-500 hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`font-sans text-2xl sm:text-3xl font-light tracking-tight transition-colors ${
                                isActive ? "gold-text" : ""
                              }`}
                            >
                              {item.label}
                            </span>
                            <svg
                              className="w-5 h-5 transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  )
                }
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
