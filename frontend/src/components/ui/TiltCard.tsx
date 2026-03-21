import { useRef, type PropsWithChildren, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../utils/cn";

interface TiltCardProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  glowColor?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className,
  style,
  glowColor = "rgba(201,151,58,0.08)",
  intensity = 10,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -intensity);
    rotateY.set((x - 0.5) * intensity);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl transition-shadow duration-500",
        "hover:shadow-[0_0_40px_rgba(201,151,58,0.12)]",
        className
      )}
    >
      {/* Dynamic glow that follows the cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
