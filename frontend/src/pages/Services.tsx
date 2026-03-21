import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import SectionLabel from "../components/ui/SectionLabel";
import ScrollReveal from "../components/ui/ScrollReveal";

const services = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Import & Export Execution",
    body: "Link United has been established to work progressively in merchant export services. We offer a secure platform to facilitate the supply of quality products across the United Kingdom, the USA, and other European countries — working closely with producers, farmers, wholesalers, importers, and other stakeholders.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Business Consulting (UK & USA)",
    body: "We are a highly successful international business consultancy that has transformed many small companies into globally recognised brands across 50+ countries. If you're a small or medium-sized manufacturer keen to develop export markets without heavy initial costs, we act as your International Marketing Partners.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "International Trade Strategy",
    body: "From go-to-market strategy to emerging market entry and business model development — our trade advisory services provide the intelligence and operational support needed to scale across borders.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Business Expansion",
    body: "We help businesses develop new export markets globally — handling market research, partnership development, regulatory alignment, and distribution channel establishment.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Trade Risk Governance",
    body: "Commercial and operational oversight to minimise delays, disruptions, and compliance exposure across every trade corridor — protecting your margins and reputation.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Supply Chain Optimisation",
    body: "Strategic sourcing, logistics coordination, and quality control processes designed to ensure consistent product delivery and supply continuity across international markets.",
  },
];

const processSteps = [
  { number: "01", title: "Source", description: "Identify and vet suppliers globally" },
  { number: "02", title: "Quality Check", description: "Rigorous quality assurance protocols" },
  { number: "03", title: "Logistics", description: "End-to-end shipping coordination" },
  { number: "04", title: "Delivery", description: "Timely, compliant final-mile delivery" },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Our Services"
        description="Integrated trade solutions — from sourcing and compliance to market expansion and business consulting."
      />

      {/* Accordion Services */}
      <section className="relative z-10 bg-[#080808] py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-b border-zinc-800/40"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="group flex w-full items-center gap-5 py-7 text-left transition-colors"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-200 transition group-hover:bg-gold-400/20">
                    {service.icon}
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold text-white md:text-xl">
                    {service.title}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-2xl text-gold-200/50"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pl-[68px] text-sm leading-relaxed text-[#888888]">
                        {service.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Flow */}
      <section className="relative z-10 bg-[#080808] py-24">
        <Container>
          <SectionLabel
            eyebrow="Our Process"
            title="How We Deliver Results"
            centered
          />

          <div className="relative mx-auto max-w-4xl">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 md:block">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full w-full origin-left bg-gradient-to-r from-gold-400/30 via-gold-200/40 to-gold-400/30"
              />
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.2}>
                  <div className="relative text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.2, type: "spring" }}
                      className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/30 bg-dark-600"
                    >
                      <span className="gold-text text-lg font-bold">{step.number}</span>
                    </motion.div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#888888]">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
