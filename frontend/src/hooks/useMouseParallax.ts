import { useEffect, useRef } from "react";

export function useMouseParallax(strength = 0.02) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * strength;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * strength;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength]);

  return mouse;
}
