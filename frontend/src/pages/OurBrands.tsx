import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import heroBg from "../assets/images/exporting01.jpg";

export default function OurBrands() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] font-sans text-white">
      <section className="relative flex h-[75vh] min-h-[560px] flex-col items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0 bg-[#020202]">
          <img
            src={heroBg}
            alt="Our Brands"
            className="h-full w-full object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/45 via-transparent to-[#050505]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-transparent to-[#050505]/85" />
        </div>

        <div className="relative z-10 mx-auto mt-24 max-w-5xl px-6 text-center md:mt-32">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-gold-400 md:text-sm"
          >
            Global Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: "easeOut" }}
            className="text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Our <span className="font-medium text-white">Brands</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            Explore the brand partners and product lines represented by Link United International.
            Detailed brand listings will be published here.
          </motion.p>
        </div>
      </section>

      <section className="relative border-t border-white/5 bg-[#080808] py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl border border-white/10 bg-[#0b0b0b] px-6 py-12 text-center md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400/90">Coming Soon</p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
              We are curating this section with verified brand information. Please check back shortly.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
