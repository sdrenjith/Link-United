import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";

import videoSrc from "../../assets/videos/home-video01.mp4";

const items = [
  {
    number: "01",
    title: "Quality Assured",
    body: "Every product meets international safety and quality standards. Rigorous supplier vetting and quality control at every stage.",
  },
  {
    number: "02",
    title: "Global Network",
    body: "Direct partnerships with producers, manufacturers, and distributors across 4 continents and 50+ countries.",
  },
  {
    number: "03",
    title: "Full Supply Chain",
    body: "From sourcing to delivery, fully managed. Strategic procurement, logistics coordination, and customs compliance.",
  },
  {
    number: "04",
    title: "Long-Term Trust",
    body: "Built on transparency, reliability, and measurable outcomes. Every partnership reflects our commitment to integrity.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  
  const isLockedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const lockedScrollYRef = useRef<number | null>(null);
  
  const cooldownRef = useRef(false);
  const unlockCooldownRef = useRef(false);
  const touchStartY = useRef(0);

  // Sync state to refs for synchronous wheel handling
  useEffect(() => {
    isLockedRef.current = isLocked;
    if (!isLocked) {
      lockedScrollYRef.current = null;
    }
  }, [isLocked]);
  
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !cardRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const vh = window.innerHeight;

      // ---- NOT LOCKED: check if card is fully visible before locking ----
      if (!isLockedRef.current) {
        if (unlockCooldownRef.current) return;

        // Card is fully visible when its top >= 0 and bottom <= viewport height
        // Allow some tolerance (30px)
        const cardFullyVisible =
          cardRect.top >= -30 && cardRect.bottom <= vh + 30;

        if (!cardFullyVisible) return; // let normal scroll continue until card is visible

        // Card is fully visible → lock!
        if (scrollingDown) {
          e.preventDefault();
          setActiveIndex(0);
          setDirection(1);
          setIsLocked(true);
          isLockedRef.current = true;
          // Snap so card sits comfortably below the navbar
          const navbarOffset = 50; // space above card to clear menubar
          const cardCenter = window.scrollY + cardRect.top + cardRect.height / 2;
          const snapTo = cardCenter - vh / 2 - navbarOffset;
          lockedScrollYRef.current = snapTo;
          window.scrollTo({ top: snapTo, behavior: "smooth" });
          return;
        }

        if (scrollingUp) {
          e.preventDefault();
          setActiveIndex(items.length - 1);
          setDirection(-1);
          setIsLocked(true);
          isLockedRef.current = true;
          const navbarOffset = 50;
          const cardCenter = window.scrollY + cardRect.top + cardRect.height / 2;
          const snapTo = cardCenter - vh / 2 - navbarOffset;
          lockedScrollYRef.current = snapTo;
          window.scrollTo({ top: snapTo, behavior: "smooth" });
          return;
        }

        return;
      }

      // ---- LOCKED: intercept all scrolling ----
      e.preventDefault();
      
      // Enforce scroll position rigidly so trackpad/momentum scroll doesn't jiggle the page.
      if (lockedScrollYRef.current !== null) {
        window.scrollTo({ top: lockedScrollYRef.current });
      }

      if (cooldownRef.current) return;

      if (scrollingDown && activeIndexRef.current < items.length - 1) {
        cooldownRef.current = true;
        setDirection(1);
        setActiveIndex((prev) => prev + 1);
        setTimeout(() => { cooldownRef.current = false; }, 800);
      } else if (scrollingUp && activeIndexRef.current > 0) {
        cooldownRef.current = true;
        setDirection(-1);
        setActiveIndex((prev) => prev - 1);
        setTimeout(() => { cooldownRef.current = false; }, 800);
      } else if (scrollingDown && activeIndexRef.current === items.length - 1) {
        setIsLocked(false);
        isLockedRef.current = false;
        unlockCooldownRef.current = true;
        setTimeout(() => { unlockCooldownRef.current = false; }, 1500);
      } else if (scrollingUp && activeIndexRef.current === 0) {
        setIsLocked(false);
        isLockedRef.current = false;
        unlockCooldownRef.current = true;
        setTimeout(() => { unlockCooldownRef.current = false; }, 1500);
      }
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < 30) return; // ignore tiny drags
      // Simulate wheel with synthetic deltaY
      handleWheel({ deltaY, preventDefault: () => e.preventDefault() } as unknown as WheelEvent);
      touchStartY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#040404]"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-full min-h-screen flex flex-col justify-center py-20 md:py-28 lg:py-32">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,151,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,58,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container className="w-full relative z-10">
          <SectionLabel
            eyebrow="Why Choose Us"
            title="Enterprise-Grade Trade Confidence"
            className="mb-12 lg:mb-20"
          />

          {/* Unified Dual-Card Container */}
          <div
            ref={cardRef}
            className="relative mx-auto flex w-full flex-col lg:flex-row bg-[#0a0a0a] rounded-2xl md:rounded-[32px] lg:rounded-[40px] border border-white/5 overflow-hidden shadow-2xl lg:h-[520px] xl:h-[560px] ring-1 ring-white/5"
          >
            {/* Top on mobile / Left on desktop: Content Slider */}
            <div className="relative flex w-full lg:w-[45%] flex-col justify-center p-6 sm:p-8 lg:p-14 xl:p-16 bg-gradient-to-br from-[#0f0f0f] to-[#040404] min-h-[320px] sm:min-h-[350px] lg:min-h-0">
              {/* Progress indicators */}
              <div className="absolute top-6 sm:top-8 lg:top-12 left-6 sm:left-8 lg:left-14 xl:left-16 flex items-center gap-2">
                {items.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeIndex ? "w-8 bg-gold-400" : "w-3 bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {/* Animated Content */}
              <div className="relative w-full flex-1 flex flex-col mt-8 sm:mt-10 lg:mt-12 overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        y: dir > 0 ? 50 : -50,
                        opacity: 0,
                      }),
                      center: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.5 },
                      },
                      exit: (dir: number) => ({
                        y: dir > 0 ? -50 : 50,
                        opacity: 0,
                        transition: { duration: 0.35 },
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                      <span className="gold-text font-sans text-sm font-bold mt-1 sm:mt-2 tracking-[0.1em]">
                        {items[activeIndex].number}
                      </span>
                      <div>
                        <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-white lg:text-5xl xl:text-6xl mb-3 sm:mb-4 lg:mb-6">
                          {items[activeIndex].title}
                        </h3>
                        <p className="font-sans text-sm sm:text-base lg:text-lg leading-relaxed text-zinc-400 max-w-sm">
                          {items[activeIndex].body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom on mobile / Right on desktop: Static Video */}
            <div className="relative w-full lg:w-[55%] flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5 bg-black h-[220px] sm:h-[260px] lg:h-auto">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-90 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent opacity-80 lg:hidden" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
