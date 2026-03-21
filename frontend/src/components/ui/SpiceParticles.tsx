import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Floating spice particles (cardamom, black pepper, star anise, cinnamon, cloves)
 * rendered as subtle golden SVG shapes scattered across the page background.
 * Each particle drifts slowly with unique timing to add organic texture.
 */

interface Particle {
  id: number;
  x: number; // % from left
  y: number; // % from top
  size: number; // px
  rotation: number;
  duration: number; // drift cycle
  delay: number;
  type: "pepper" | "cardamom" | "star" | "clove" | "cinnamon";
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  const types: Particle["type"][] = ["pepper", "cardamom", "star", "clove", "cinnamon"];
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -20,
      type: types[Math.floor(Math.random() * types.length)],
      opacity: 0.04 + Math.random() * 0.06,
    });
  }
  return particles;
}

function SpiceShape({ type }: { type: Particle["type"] }) {
  switch (type) {
    case "pepper":
      // Small round pepper seed
      return <circle cx="5" cy="5" r="4" fill="currentColor" />;
    case "cardamom":
      // Oval pod shape
      return (
        <>
          <ellipse cx="6" cy="5" rx="5" ry="3.5" fill="currentColor" />
          <line x1="1" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
          <line x1="6" y1="1.5" x2="6" y2="8.5" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
        </>
      );
    case "star":
      // Star anise — 6-pointed star
      return (
        <polygon
          points="6,0 7.5,4 12,4.5 8.5,7.5 9.5,12 6,9.5 2.5,12 3.5,7.5 0,4.5 4.5,4"
          fill="currentColor"
        />
      );
    case "clove":
      // Clove bud shape
      return (
        <>
          <ellipse cx="5" cy="3.5" rx="3" ry="3.5" fill="currentColor" />
          <rect x="4" y="6" width="2" height="4" rx="0.5" fill="currentColor" />
        </>
      );
    case "cinnamon":
      // Curled stick / scroll
      return (
        <path
          d="M2,8 Q2,2 6,2 Q10,2 10,5 Q10,7 8,7 Q6,7 6,5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      );
  }
}

export default function SpiceParticles({ count = 35 }: { count?: number }) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-gold-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -20, 5, -15, 0],
            x: [0, 8, -5, 10, 0],
            rotate: [p.rotation, p.rotation + 40, p.rotation - 20, p.rotation + 60, p.rotation],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 12 12"
            fill="none"
          >
            <SpiceShape type={p.type} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
