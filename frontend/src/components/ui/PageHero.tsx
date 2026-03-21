import { motion } from "framer-motion";
import Container from "./Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="noise-bg relative z-10 overflow-hidden bg-[#080808] pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,151,58,0.06),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,151,58,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,58,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <Container className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gold-text mb-4 text-xs font-bold uppercase tracking-[0.3em]"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl font-bold text-white md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-[#888888]"
          >
            {description}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
