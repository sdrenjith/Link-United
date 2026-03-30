import { motion } from "framer-motion";
import { useRef } from "react";
import Container from "../components/ui/Container";
import heroBg from "../assets/images/exporting01.jpg";

const services = [
  {
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Import & Export Execution",
    body: "Link United has been established to work progressively in merchant export services. We offer a secure platform to facilitate the supply of quality products across the United Kingdom, the USA, and other European countries — working closely with producers, farmers, wholesalers, importers, and other stakeholders.",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Business Consulting (UK & USA)",
    body: "We are a highly successful international business consultancy that has transformed many small companies into globally recognised brands across 50+ countries. If you're a small or medium-sized manufacturer keen to develop export markets without heavy initial costs, we act as your International Marketing Partners.",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "International Trade Strategy",
    body: "From go-to-market strategy to emerging market entry and business model development — our trade advisory services provide the intelligence and operational support needed to scale across borders.",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Business Expansion",
    body: "We help businesses develop new export markets globally — handling market research, partnership development, regulatory alignment, and distribution channel establishment.",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Trade Risk Governance",
    body: "Commercial and operational oversight to minimise delays, disruptions, and compliance exposure across every trade corridor — protecting your margins and reputation.",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden" ref={containerRef}>
      
      {/* 1. Cinematic Corporate Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* High-quality background image with elegant corporate vignette */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Link United Services Operations" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80 pointer-events-none" />
        </div>
        
        {/* Crisp, authoritative Typography */}
        <div className="relative z-10 text-center px-6 mt-24 md:mt-32 max-w-5xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 1 }}
            className="text-gold-400 font-sans tracking-[0.3em] text-xs md:text-sm uppercase mb-8 font-bold"
          >
            What We Do
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-8"
          >
            Integrated <span className="text-white font-medium">Trade Solutions</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.2, duration: 1 }}
            className="text-zinc-400 text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed"
          >
            From global sourcing and supply chain compliance to market expansion and strategic business consulting.
          </motion.p>
        </div>

        {/* Minimal Corporate Scroll Line */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: "8rem" }} 
          transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
        >
          <div className="w-[1px] h-full bg-gradient-to-b from-gold-400 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Vast, Clean Services Grid (Replacing the basic accordion) */}
      <section className="relative py-24 lg:py-40 z-10 bg-[#080808] border-t border-white/5">
        <Container>
          <div className="text-center mb-20 lg:mb-32">
            <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight">Our Expertise</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-24 lg:gap-y-24">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Elegant subtle bounding box on hover */}
                <div className="absolute -inset-8 rounded-2xl bg-white/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex flex-col h-full relative z-10">
                  <div className="text-gold-400 mb-8 group-hover:scale-110 group-hover:text-white transition-all duration-500 origin-left">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-light text-white mb-5 tracking-tight">
                    {service.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-gold-400 mb-6 group-hover:w-24 transition-all duration-500" />
                  <p className="text-sm border-l border-zinc-900 border-opacity-50 lg:text-base leading-[1.8] text-zinc-400 font-body pl-5">
                    {service.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Refined Process Flow (Tightened spacing and upgraded typography) */}
      <section className="relative py-24 lg:py-32 z-10 bg-[#030303] border-t border-white/5">
        <Container>
          <div className="text-center mb-20 lg:mb-24">
            <p className="text-gold-400 font-sans tracking-[0.3em] text-xs font-bold uppercase mb-4">Our Process</p>
            <h2 className="text-4xl lg:text-5xl font-light text-white">How We Deliver Results</h2>
          </div>

          <div className="relative mx-auto max-w-5xl mt-24">
            {/* Minimalist Corporate Connecting line */}
            <div className="absolute left-0 right-0 top-1/2 hidden h-[1px] -translate-y-1/2 md:block">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full w-full origin-left bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
              />
            </div>

            <div className="grid gap-12 md:grid-cols-4 relative z-10">
              {processSteps.map((step, i) => (
                <motion.div 
                  key={step.number} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative text-center group"
                >
                  {/* Clean, massive border-circle node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.2, type: "spring" }}
                    className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#050505] group-hover:border-gold-400/50 transition-colors duration-500"
                  >
                    <span className="text-gold-400 text-xl font-bold font-sans tracking-[0.1em]">{step.number}</span>
                  </motion.div>
                  
                  {/* Sharp, elegant typography inherited from the homepage update */}
                  <h3 className="text-xl lg:text-2xl font-light text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm font-body leading-[1.7] text-zinc-500 px-4">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      
    </div>
  );
}
