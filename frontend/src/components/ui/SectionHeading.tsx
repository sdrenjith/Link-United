import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-16 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="gold-text mb-3 text-xs font-bold uppercase tracking-[0.3em]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-zinc-400">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

export default SectionHeading;
