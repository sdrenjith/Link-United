import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface GlassCardProps extends PropsWithChildren {
  className?: string;
  hoverLift?: boolean;
  delay?: number;
}

function GlassCard({
  children,
  className = "",
  hoverLift = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={
        hoverLift
          ? {
              y: -6,
              transition: { duration: 0.3 },
            }
          : undefined
      }
      className={`glass-strong gold-border-glow rounded-2xl p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
