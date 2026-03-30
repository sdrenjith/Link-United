import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import ScrollReveal from "../ui/ScrollReveal";
import TiltCard from "../ui/TiltCard";

import GeometricLines from "../ui/GeometricLines";

export default function GlobalTrade() {
  return (
    <section className="relative z-10 overflow-hidden py-16 md:py-24">
      <GeometricLines variant="map-accent" opacity={0.3} />

      <Container className="relative">
        <SectionLabel
          eyebrow="Global Presence"
          title="Offices Across Two Continents"
          centered
        />

        <div className="mx-auto max-w-4xl">
          <div className="relative grid gap-8 md:grid-cols-2">
            {/* London Card */}
            <ScrollReveal direction="left">
              <TiltCard className="glass h-full rounded-2xl" intensity={6}>
                <div className="p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/10">
                    <svg className="h-5 w-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    London, UNITED KINGDOM
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold-400/75">
                    LiNK UNITED INTERNATIONAL LIMITED
                  </p>
                  <p className="font-body mt-3 text-sm leading-relaxed text-[#999999]">
                    66, Paul Street
                    <br />
                    London, UNITED KINGDOM
                    <br />
                    EC2A 4NE
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Connecting line */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <motion.svg
                width="100"
                height="4"
                viewBox="0 0 100 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <motion.line
                  x1="0"
                  y1="2"
                  x2="100"
                  y2="2"
                  stroke="url(#goldGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E8C97A" />
                    <stop offset="100%" stopColor="#9A6F1E" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </div>

            {/* Houston Card */}
            <ScrollReveal direction="right">
              <TiltCard className="glass h-full rounded-2xl" intensity={6}>
                <div className="p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/10">
                    <svg className="h-5 w-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    Houston, USA
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold-400/75">
                    LiNK UNITED INTERNATIONAL INC.
                  </p>
                  <p className="font-body mt-3 text-sm leading-relaxed text-[#999999]">
                    700, Louisiana Street, Suite 3950
                    <br />
                    Houston, Texas, USA
                    <br />
                    77002
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>

          <motion.p
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-body mt-12 text-center text-base tracking-wide text-zinc-500"
          >
            Connecting Global Markets Across{"  "}
            <span className="text-gold-400/75">Europe</span> •{" "}
            <span className="text-gold-400/75">Asia</span> •{" "}
            <span className="text-gold-400/75">Middle East</span> •{" "}
            <span className="text-gold-400/75">Americas</span>
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
