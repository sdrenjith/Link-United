import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "../ui/Container";
import AnimatedCounter from "../ui/AnimatedCounter";
import TiltCard from "../ui/TiltCard";
import GeometricLines from "../ui/GeometricLines";

/* ── Cargo Ship Scene — placed under the title ────────────── */
function CargoShipScene({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[450px] sm:h-[550px] md:h-[650px] lg:h-[800px] w-full overflow-hidden pointer-events-none opacity-60 z-0">
      {/* Back Wave */}
      <motion.svg
        viewBox="0 0 1200 120"
        className="absolute bottom-[25%] lg:bottom-[30%] w-[250%] h-10 opacity-30"
        preserveAspectRatio="none"
        animate={{ x: [0, -600] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <path d="M0,60 Q75,35 150,60 T300,60 T450,60 T600,60 T750,60 T900,60 T1050,60 T1200,60" fill="none" stroke="rgba(201,151,58,0.3)" strokeWidth="1" />
      </motion.svg>
      
      {/* Mid Wave */}
      <motion.svg
        viewBox="0 0 1200 120"
        className="absolute bottom-[10%] lg:bottom-[15%] w-[250%] h-12 opacity-25"
        preserveAspectRatio="none"
        animate={{ x: [-200, -800] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <path d="M0,60 Q75,40 150,60 T300,60 T450,60 T600,60 T750,60 T900,60 T1050,60 T1200,60" fill="none" stroke="rgba(201,151,58,0.25)" strokeWidth="1" />
      </motion.svg>

      {/* Doubled cargo ship with branding */}
      <motion.div
        className="absolute bottom-[14%] lg:bottom-[18%] w-[48rem] sm:w-[56rem] md:w-[64rem] lg:w-[76rem]"
        initial={{ left: "-40%", y: 0, rotate: 0 }}
        animate={isInView ? {
          left: ["-40%", "100%"],
          y: [0, -6, 3, -5, 0],
          rotate: [0, -0.4, 0.4, -0.2, 0],
        } : {}}
        transition={{
          left: { duration: 15, ease: "linear" },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg width="440" height="180" viewBox="0 0 440 180" fill="none" className="w-full h-auto">
          {/* Hull */}
          <path d="M24,116 L56,156 L384,156 L416,116 Z" fill="rgba(201,151,58,0.18)" stroke="rgba(201,151,58,0.45)" strokeWidth="0.8" />
          <line x1="40" y1="136" x2="400" y2="136" stroke="rgba(201,151,58,0.1)" strokeWidth="0.4" strokeDasharray="6 6" />
          {/* Ship name on hull */}
          <text
            x="214"
            y="140"
            textAnchor="middle"
            fill="rgba(201,151,58,0.75)"
            fontSize="15"
            fontWeight="800"
            fontFamily="'Fredoka', 'Quicksand', 'Varela Round', system-ui, sans-serif"
            letterSpacing="-1"
          >
            <tspan>Link</tspan><tspan fill="rgba(201,151,58,0.95)">United</tspan>
          </text>
          <text
            x="214"
            y="148"
            textAnchor="middle"
            fill="rgba(201,151,58,0.5)"
            fontSize="4"
            fontWeight="700"
            fontFamily="sans-serif"
            letterSpacing="4"
          >
            INTERNATIONAL
          </text>
          {/* Deck */}
          <rect x="72" y="94" width="276" height="22" rx="2" fill="rgba(201,151,58,0.1)" stroke="rgba(201,151,58,0.3)" strokeWidth="0.5" />
          {/* Containers row 1 */}
          <rect x="84" y="60" width="44" height="34" rx="2" fill="rgba(201,151,58,0.18)" stroke="rgba(201,151,58,0.4)" strokeWidth="0.5" />
          <rect x="134" y="60" width="44" height="34" rx="2" fill="rgba(201,151,58,0.1)" stroke="rgba(201,151,58,0.3)" strokeWidth="0.5" />
          <rect x="184" y="60" width="44" height="34" rx="2" fill="rgba(201,151,58,0.15)" stroke="rgba(201,151,58,0.35)" strokeWidth="0.5" />
          <rect x="234" y="60" width="44" height="34" rx="2" fill="rgba(201,151,58,0.12)" stroke="rgba(201,151,58,0.3)" strokeWidth="0.5" />
          {/* Containers row 2 (C3 and C4) */}
          <motion.rect
            x="70" y="30" width="44" height="30" rx="2" fill="rgba(201,151,58,0.08)" stroke="rgba(201,151,58,0.25)" strokeWidth="0.5"
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={isInView ? { x: [0, 0, -20, -40, -40], y: [0, 0, 30, 80, 80], opacity: [1, 1, 1, 0, 0], scale: [1, 1, 0.7, 0.5, 0.5], rotate: [0, 0, -20, -50, -50] } : {}}
            transition={{ duration: 15, times: [0, 1.5/15, 1.9/15, 2.3/15, 1], ease: "linear" }}
          />
          <motion.rect
            x="110" y="30" width="44" height="30" rx="2" fill="rgba(201,151,58,0.12)" stroke="rgba(201,151,58,0.28)" strokeWidth="0.5"
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={isInView ? { x: [0, 0, -20, -40, -40], y: [0, 0, 30, 80, 80], opacity: [1, 1, 1, 0, 0], scale: [1, 1, 0.7, 0.5, 0.5], rotate: [0, 0, -20, -50, -50] } : {}}
            transition={{ duration: 15, times: [0, 3.5/15, 3.9/15, 4.3/15, 1], ease: "linear" }}
          />
          <rect x="154" y="30" width="44" height="30" rx="2" fill="rgba(201,151,58,0.06)" stroke="rgba(201,151,58,0.2)" strokeWidth="0.5" />
          <rect x="198" y="30" width="44" height="30" rx="2" fill="rgba(201,151,58,0.06)" stroke="rgba(201,151,58,0.2)" strokeWidth="0.5" />
          {/* Containers row 3 (top) (C1 and C2) */}
          <motion.rect
            x="70" y="8" width="40" height="22" rx="2" fill="rgba(201,151,58,0.05)" stroke="rgba(201,151,58,0.18)" strokeWidth="0.4"
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={isInView ? { x: [0, 0, -30, -50, -50], y: [0, 0, 30, 80, 80], opacity: [1, 1, 1, 0, 0], scale: [1, 1, 0.7, 0.5, 0.5], rotate: [0, 0, -30, -60, -60] } : {}}
            transition={{ duration: 15, times: [0, 0.5/15, 0.9/15, 1.3/15, 1], ease: "linear" }}
          />
          <motion.rect
            x="110" y="8" width="40" height="22" rx="2" fill="rgba(201,151,58,0.08)" stroke="rgba(201,151,58,0.22)" strokeWidth="0.4"
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={isInView ? { x: [0, 0, -30, -50, -50], y: [0, 0, 30, 80, 80], opacity: [1, 1, 1, 0, 0], scale: [1, 1, 0.7, 0.5, 0.5], rotate: [0, 0, -30, -60, -60] } : {}}
            transition={{ duration: 15, times: [0, 2.5/15, 2.9/15, 3.3/15, 1], ease: "linear" }}
          />
          <rect x="150" y="8" width="40" height="22" rx="2" fill="rgba(201,151,58,0.05)" stroke="rgba(201,151,58,0.18)" strokeWidth="0.4" />
          <rect x="190" y="8" width="40" height="22" rx="2" fill="rgba(201,151,58,0.08)" stroke="rgba(201,151,58,0.22)" strokeWidth="0.4" />
          {/* Bridge / Superstructure */}
          <rect x="310" y="36" width="36" height="58" rx="2" fill="rgba(201,151,58,0.12)" stroke="rgba(201,151,58,0.35)" strokeWidth="0.5" />
          <rect x="316" y="42" width="24" height="12" rx="1" fill="rgba(201,151,58,0.22)" />
          <rect x="318" y="58" width="20" height="6" rx="0.5" fill="rgba(201,151,58,0.1)" stroke="rgba(201,151,58,0.2)" strokeWidth="0.3" />
          {/* Mast + antenna */}
          <line x1="328" y1="36" x2="328" y2="12" stroke="rgba(201,151,58,0.35)" strokeWidth="0.6" />
          <circle cx="328" cy="12" r="2" fill="rgba(201,151,58,0.5)" />
          {/* Radar dish */}
          <line x1="325" y1="20" x2="331" y2="18" stroke="rgba(201,151,58,0.3)" strokeWidth="0.5" />
          {/* Smoke */}
          <motion.circle
            cx="324" cy="24" r="4"
            fill="rgba(201,151,58,0.05)"
            animate={{ cy: [24, 6], opacity: [0.08, 0], r: [4, 12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx="320" cy="28" r="3"
            fill="rgba(201,151,58,0.04)"
            animate={{ cy: [28, 10], opacity: [0.06, 0], r: [3, 9] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
          />
          {/* Wake trails */}
          <motion.path
            d="M24,136 Q0,140 -60,144"
            stroke="rgba(201,151,58,0.1)"
            strokeWidth="1"
            fill="none"
            animate={{ opacity: [0.1, 0.03, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.path
            d="M24,146 Q-10,150 -70,155"
            stroke="rgba(201,151,58,0.06)"
            strokeWidth="0.6"
            fill="none"
            animate={{ opacity: [0.06, 0.015, 0.06] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Front Wave (Renders OVER the ship hull) */}
      <motion.svg
        viewBox="0 0 1200 120"
        className="absolute -bottom-[5%] lg:bottom-[0%] w-[250%] h-12 opacity-30 z-10"
        preserveAspectRatio="none"
        animate={{ x: [-100, -700] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <path d="M0,60 Q75,45 150,60 T300,60 T450,60 T600,60 T750,60 T900,60 T1050,60 T1200,60" fill="none" stroke="rgba(201,151,58,0.35)" strokeWidth="1" />
      </motion.svg>

      {/* Soft fade */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#080808] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#080808] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#080808] to-transparent" />
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────── */
export default function CompanyIntro() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden py-12 md:py-16 lg:py-20">
      <GeometricLines variant="right" opacity={0.6} />

      {/* Scan-line background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,151,58,0.3) 2px, rgba(201,151,58,0.3) 3px)",
        }}
      />

      {/* Background Ship Scene */}
      <CargoShipScene isInView={isInView} />

      <Container className="relative z-10">
        <div className="grid items-start gap-8 lg:gap-12 lg:grid-cols-12">
          {/* Left: Vertical label */}
          <motion.div
            className="hidden lg:col-span-1 lg:flex lg:justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 7.3, duration: 1, ease: "easeOut" }}
          >
            <div className="sticky top-32">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-gold-400/80 [writing-mode:vertical-rl] rotate-180 h-48">
                Who We Are
              </p>
            </div>
          </motion.div>

          {/* Center: Main Content shifted leftwards */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Mobile label */}
            <motion.p
              className="gold-text font-sans mb-4 text-xs font-bold uppercase tracking-[0.3em] lg:hidden"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 7.3, duration: 1 }}
            >
              Who We Are
            </motion.p>

            {/* Animated heading (waits for ship front at ~7.5s) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 7.5, duration: 1, ease: "easeOut" }}
            >
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3rem] leading-[1.1] font-light tracking-tight text-white">
                A Global Bridge Between Manufacturers & Markets
              </h2>
            </motion.div>

            {/* Body text (delayed to 7.8s) */}
            <motion.div
              className="mt-8 space-y-6 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 7.8, duration: 1, ease: "easeOut" }}
            >
              <p className="font-body text-base leading-[1.85] text-[#999999]">
                Constantly innovating and transforming — always with trust and
                quality at our core — Link United International&reg; has evolved
                from a focused trading enterprise into a respected voice in
                international commerce. With head offices in London, United Kingdom
                and regional operations in Houston, Texas, we serve clients across
                more than 50 countries.
              </p>
              <p className="font-body text-base leading-[1.85] text-[#999999]">
                Truth and fairness remain at the heart of our purpose. As
                globalisation demands new approaches, we continue to invest in
                technology, talent, and trade infrastructure — shaping not just our
                industry, but the communities we serve. Our focus on quality and
                long-term partnerships has remained unwavering.
              </p>
              <p className="font-body text-base leading-[1.85] text-[#999999]">
                Our dedicated network spans across the globe, ensuring reliable, fast, and high-quality trade solutions. We empower local markets to reach international stages with unmatched efficiency and transparency.
              </p>
            </motion.div>
          </div>

          {/* Right: Vertically stacked stats */}
          <div className="lg:col-span-4 xl:col-span-3 mt-12 lg:mt-0 grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-1 lg:gap-2">
            {[
                {
                  label: "UK & USA Offices",
                  value: 2,
                  suffix: "",
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" />
                    </svg>
                  ),
                },
                {
                  label: "Product Categories",
                  value: 5,
                  suffix: "+",
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  ),
                },
                {
                  label: "Continents Served",
                  value: 4,
                  suffix: "",
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  ),
                },
                {
                  label: "Quality Assured",
                  value: 100,
                  suffix: "%",
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
              ].map((stat, idx) => {
                const cardShowTimes = [1.3, 3.3, 2.3, 4.3]; // Drops at 0.5, 1.5, 2.5, 3.5 hit the water ~0.8s later
                const showTime = cardShowTimes[idx];

                // Properly spaced geometry shaping the DOM vertical stack into a 2x2 square during entry
                const scatterX = ["-48vw", "-22vw", "-48vw", "-22vw"];
                const scatterY = [
                  "-5vh",                        // Row 1 (Top Left)
                  "calc(-5vh - 148px)",          // Row 1 (Top Right)
                  "calc(-5vh + 210px - 296px)",  // Row 2 (Bottom Left) sits 210px vertically below Row 1
                  "calc(-5vh + 210px - 444px)"   // Row 2 (Bottom Right) sits 210px vertically below Row 1
                ];

                return (
                 <motion.div
                   key={stat.label}
                   className="h-[140px] relative z-20"
                   initial={{ x: scatterX[idx], y: scatterY[idx], scale: 1.15, opacity: 0 }}
                   animate={isInView ? { 
                     x: [scatterX[idx], scatterX[idx], 0], 
                     y: [scatterY[idx], scatterY[idx], 0],
                     scale: [1.15, 1.15, 1],
                     opacity: 1
                   } : {}}
                   transition={{ 
                     x: { duration: 7.5, times: [0, 6.5/7.5, 1], ease: "easeInOut" },
                     y: { duration: 7.5, times: [0, 6.5/7.5, 1], ease: "easeInOut" },
                     scale: { duration: 7.5, times: [0, 6.5/7.5, 1], ease: "easeInOut" },
                     opacity: { delay: showTime, duration: 0.3, ease: "easeOut" }
                   }}
                 >
                  <TiltCard className="group h-[140px]" intensity={5}>
                    {/* The actual Card visually fills the 140px bounds, ensuring it scales fully alongside the TiltCard border limits! */}
                    <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-[12px] p-4 lg:py-[18px] text-center flex flex-col items-center justify-center overflow-hidden h-[140px] shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-gold-400/20 transition-all duration-300">
                      {/* Synchronized Blast Effect - No longer needed inside inner components because opacity pops outer container! */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-xl">
                        <motion.div 
                          className="w-24 h-24 bg-gold-400/60 rounded-full blur-[30px] mix-blend-screen"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isInView ? { scale: [0, 3], opacity: [0.9, 0] } : {}}
                          transition={{ delay: showTime, duration: 1.0, ease: "easeOut" }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-b from-gold-400/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-1/2 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent transition-all duration-700" />
                      
                      <div className="relative flex items-center justify-center gap-3">
                        <span className="text-gold-400/80 transition-all duration-500 group-hover:text-gold-400 group-hover:scale-110">
                          {stat.icon}
                        </span>
                        <p className="gold-text font-sans text-2xl font-bold md:text-3xl">
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        </p>
                      </div>
                      
                      <p className="relative font-sans mt-1.5 text-[10.5px] uppercase tracking-[0.18em] text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                        {stat.label}
                      </p>
                    </div>
                  </TiltCard>
                 </motion.div>
                );
              })}
          </div>
        </div>
      </Container>
    </section>
  );
}
