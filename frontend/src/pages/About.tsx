import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Container from "../components/ui/Container";
import AnimatedCounter from "../components/ui/AnimatedCounter";

// Beautiful inline icons matching the elegant stroke paths
const GlobeAltIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const BuildingOffice2Icon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

const CubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

import heroBg from "../assets/images/hero-bg-ship.jpg";
import narrativeBg from "../assets/images/ship-home02.jpg";

const milestones = [
  {
    year: "Foundation",
    title: "Established with a Vision",
    body: "Founded with truth and fairness at the heart of the firm's purpose — serving clients in a rapidly changing industrial landscape. We set out to redefine supply chain reliability on a global scale.",
  },
  {
    year: "Expansion",
    title: "Global Office Network",
    body: "Expanded operations from London to Houston, Texas — building direct trade routes across 50+ countries. This bridged two major continental markets, establishing our infrastructure.",
  },
  {
    year: "Today",
    title: "Industry-Leading Enterprise",
    body: "Thousands of clients, dozens of strategic mergers, and a respected voice in international commerce, climate impact, and global business technology.",
  },
];

const stats = [
  { label: "Countries Served", value: 50, suffix: "+", icon: <GlobeAltIcon className="w-8 h-8 text-gold-400 mb-6" /> },
  { label: "Global Offices", value: 2, suffix: "", icon: <BuildingOffice2Icon className="w-8 h-8 text-gold-400 mb-6" /> },
  { label: "Product", value: 7000, suffix: "+", icon: <CubeIcon className="w-8 h-8 text-gold-400 mb-6" /> },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden" ref={containerRef}>
      
      {/* 1. Cinematic Corporate Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* High-quality background image with elegant vignette overly for corporate feel */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Link United International Background" 
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
            About The Firm
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-8"
          >
            A Heritage of <span className="text-white font-medium">Global Trade</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.2, duration: 1 }}
            className="text-zinc-400 text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed"
          >
            Delivering sustained outcomes while completely redefining the international import and export industry through unyielding trust and quality.
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

      {/* 2. Structured Narrative Section (Split layout, solid borders, clean elegance) */}
      <section className="relative py-24 lg:py-32 z-10 border-t border-white/5 bg-[#080808]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left side: Premium structured text, not floating or blurry */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Our Purpose & Vision</h2>
                <div className="w-12 h-[2px] bg-gold-400" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 1 }}
                className="space-y-8 text-zinc-400 font-body text-base lg:text-lg leading-[1.85]"
              >
                <p>
                  Constantly innovating and transforming — always with trust and quality at our core — our story is one that delivers sustained outcomes while redefining the international import and export industry.
                </p>
                <p>
                  We are celebrating our history and how it has shaped the organisation we are today. For years, we have been committed to working with clients to answer their most important questions: from building trust, to addressing their climate impact, to proving the progress they are making.
                </p>
                <p>
                  Our purpose — to build trust in these industries and solve important problems — reflects why we do what we do. Our strategy defines what we do. But how we deliver our purpose and strategy is what differentiates us.
                </p>
              </motion.div>
            </div>

            {/* Right side: High-end photography instead of a sci-fi glass globe */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative h-[400px] sm:h-[500px] lg:h-[700px] w-full"
            >
              {/* Elegant frame container defining a mature company */}
              <div className="absolute inset-4 lg:inset-8 border border-white/20 z-20 pointer-events-none" />
              <img 
                src={narrativeBg} 
                alt="Link United Operations" 
                className="w-full h-full object-cover object-center grayscale-[0.2] contrast-125 brightness-90"
              />
              {/* Subtle overlay to ground the image in the dark theme */}
              <div className="absolute inset-0 bg-[#050505]/20 mix-blend-multiply pointer-events-none" />
            </motion.div>
            
          </div>
        </Container>
      </section>

      {/* 3. Refined, Minimalist Statistics Grid without the student-project glassmorphism */}
      <section className="relative py-24 z-10 bg-[#030303] border-y border-white/5">
        <Container>
          <div className="grid md:grid-cols-3 gap-y-16 md:gap-y-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="flex flex-col items-center justify-center text-center px-8"
              >
                {stat.icon}
                <div className="flex items-baseline text-6xl lg:text-[5.5rem] font-sans font-light text-white mb-6 tracking-tighter">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] lg:text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Elegant Timeline with heavily tightened gaps as requested */}
      <section className="relative py-24 lg:py-32 z-10 bg-[#050505]">
        <Container>
          
          <div className="text-center mb-20 lg:mb-24">
            <p className="text-gold-400 font-sans tracking-[0.3em] text-xs font-bold uppercase mb-4">Milestones</p>
            <h2 className="text-4xl lg:text-5xl font-light text-white">A Journey of Growth</h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            {/* The structural spine line (static) */}
            <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[1px] bg-white/5 md:-translate-x-1/2 rounded-full" />
            
            {/* The glowing activated scroll-line */}
            <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[1px] md:-translate-x-1/2 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-transparent via-gold-400 to-transparent w-[1px] shadow-[0_0_20px_rgba(201,151,58,1)]"
                style={{
                  height: "30%",
                  y: useTransform(pathLength, [0, 1], ["-100%", "300%"])
                }}
              />
            </div>

            {/* Tightened the gaps heavily from space-y-16/32 to space-y-8/12 for a condensed, professional look */}
            <div className="space-y-8 lg:space-y-12">
              {milestones.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-100px" }} 
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Glowing static anchor dot */}
                    <div className="absolute left-[20.5px] md:left-1/2 w-2 h-2 bg-gold-400 rounded-full md:-translate-x-1/2 mt-7 md:mt-0 z-10 box-content border-[3px] border-[#050505]" />
                    
                    {/* Content Box with clean positioning and NO excessive glassmorphism */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16 text-left md:text-right'}`}>
                      <div className="py-6 px-0 md:py-8">
                        <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                          {item.year}
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-light text-white mb-4 leading-tight tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-zinc-400 text-sm sm:text-base leading-[1.8] font-body">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
      
    </div>
  );
}
