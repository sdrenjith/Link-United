import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type Variant = "filled" | "ghost" | "link";

interface GoldButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  variant?: Variant;
  fullWidth?: boolean;
}

const base =
  "relative inline-flex items-center justify-center gap-2 font-body font-semibold uppercase tracking-[0.12em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden";

const variants: Record<Variant, string> = {
  filled:
    "rounded-lg px-7 py-3.5 text-sm bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 text-dark-600 hover:shadow-[0_0_40px_rgba(201,151,58,0.4)] hover:brightness-110",
  ghost:
    "rounded-lg px-7 py-3.5 text-sm border border-gold-400/40 hover:bg-gold-400/10 hover:border-gold-400/70 hover:shadow-[0_0_25px_rgba(201,151,58,0.15)]",
  link: "text-sm underline-offset-4 hover:underline hover:opacity-90",
};

export default function GoldButton({
  children,
  variant = "filled",
  fullWidth,
  className,
  ...rest
}: GoldButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], fullWidth && "w-full", className)}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {variant === "filled" && (
        <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      )}
      {variant === "ghost" && (
        <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />
      )}
      <span
        className={cn(
          "relative z-10",
          (variant === "ghost" || variant === "link") && "gold-text",
        )}
      >
        {children}
      </span>
    </motion.button>
  );
}
