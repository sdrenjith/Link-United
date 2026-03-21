import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

const directionMap = {
  up: { y: 40, x: 0 },
  left: { y: 0, x: -40 },
  right: { y: 0, x: 40 },
};

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  const offset = directionMap[direction];
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
