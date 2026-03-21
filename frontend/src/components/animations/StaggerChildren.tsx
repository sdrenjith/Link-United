import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface StaggerProps extends PropsWithChildren {
  className?: string;
  stagger?: number;
}

const container = (stagger: number) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function StaggerChildren({
  children,
  className,
  stagger = 0.1,
}: StaggerProps) {
  return (
    <motion.div
      variants={container(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default StaggerChildren;
