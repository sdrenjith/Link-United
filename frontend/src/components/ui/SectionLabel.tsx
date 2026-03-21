import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface SectionLabelProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionLabel({
  eyebrow,
  title,
  description,
  centered,
  className,
}: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("mb-16 max-w-3xl", centered && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <p className="gold-text mb-4 text-xs font-bold uppercase tracking-[0.3em]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-sans text-3xl font-semibold tracking-tight leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-[#888888]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
