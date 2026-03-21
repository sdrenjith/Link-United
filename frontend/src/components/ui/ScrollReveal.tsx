import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

interface ScrollRevealProps extends PropsWithChildren {
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
}

const directionMap = {
  up: { y: 50, x: 0 },
  down: { y: -50, x: 0 },
  left: { y: 0, x: -50 },
  right: { y: 0, x: 50 },
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: ScrollRevealProps) {
  const offset = directionMap[direction];
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95, ...offset }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom extremely smooth cubic-bezier
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
