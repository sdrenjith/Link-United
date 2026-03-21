import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface RevealTextProps {
  text: string;
  className?: string;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function RevealText({
  text,
  className,
  stagger = 0.15,
  as: Tag = "h2",
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.6,
            delay: i * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
