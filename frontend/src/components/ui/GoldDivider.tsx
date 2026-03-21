import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface GoldDividerProps {
  className?: string;
}

export default function GoldDivider({ className }: GoldDividerProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("mx-auto h-px w-full max-w-xs origin-left bg-gradient-to-r from-transparent via-gold-400/40 to-transparent", className)}
    />
  );
}
