import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import GoldButton from "../ui/GoldButton";
import TiltCard from "../ui/TiltCard";

const services = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Import Solutions",
    body: "Structured procurement, supplier due diligence, and regulatory alignment for seamless cross-border imports into the UK and USA.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Export Solutions",
    body: "End-to-end merchant export services facilitating quality product supply across the UK, USA, Europe, Africa, and beyond.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Global Logistics",
    body: "Strategic sourcing, logistics coordination, and quality control processes ensuring consistent delivery and supply continuity worldwide.",
  },
];

import GeometricLines from "../ui/GeometricLines";

export default function ServicesPreview() {
  return (
    <section className="relative z-10 overflow-hidden py-16 md:py-24">
      <GeometricLines variant="left" opacity={0.5} />

      <Container>
        <SectionLabel
          eyebrow="What We Do"
          title="Integrated Trade Services Built for Scale"
          centered
        />

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TiltCard className="glass h-full" intensity={8}>
                <div className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gold-400/10 text-gold-200 transition-all duration-300 group-hover:bg-gold-400/20 group-hover:shadow-[0_0_24px_rgba(201,151,58,0.2)]">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="font-body mt-3 text-sm leading-relaxed text-[#888888]">
                    {service.body}
                  </p>
                  <div className="mt-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Link
                      to="/services"
                      className="text-sm font-semibold text-gold-200 transition hover:text-gold-100"
                    >
                      Learn More &rarr;
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/services">
            <GoldButton variant="ghost">View All Services</GoldButton>
          </Link>
        </div>
      </Container>
    </section>
  );
}
