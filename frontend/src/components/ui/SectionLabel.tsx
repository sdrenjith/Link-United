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
  // Split title into words for animation
  const words = title.split(" ");

  const container: any = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
      },
    },
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.3 }
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(5px)",
      transition: { duration: 0.3 }
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      className={cn("mb-16 max-w-4xl", centered && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <motion.p 
          variants={child}
          className="gold-text mb-4 text-xs font-bold uppercase tracking-[0.3em]"
        >
          {eyebrow}
        </motion.p>
      )}
      
      <motion.h2 
        className={cn(
          "font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3rem] leading-[1.1] font-light tracking-tight text-white flex flex-wrap gap-x-2 lg:gap-x-3",
          centered ? "justify-center" : "justify-start"
        )}
      >
        {words.map((word, index) => (
          <motion.span variants={child} key={index} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.h2>
      
      {description && (
        <motion.p 
          variants={child}
          className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed text-[#888888]"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
