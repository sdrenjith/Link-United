import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-dark-400 hover:shadow-[0_0_30px_rgba(201,162,39,0.3)] hover:brightness-110",
  secondary:
    "border border-gold-400/40 gold-text hover:bg-gold-400/10 hover:border-gold-400/70 hover:shadow-[0_0_20px_rgba(201,162,39,0.12)]",
  ghost: "text-zinc-300 hover:text-white hover:bg-white/5",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

function Button({
  children,
  variant = "primary",
  fullWidth,
  className,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className || ""}`}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}

export default Button;
