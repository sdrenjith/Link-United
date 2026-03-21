import { useEffect, useRef, useCallback } from "react";

interface ParallaxState {
  x: number;
  y: number;
}

/**
 * Tracks normalized mouse position (-1 to 1) across the viewport.
 * Returns a ref with { x, y } that updates on mousemove for 60fps-safe
 * inline style binding without triggering React re-renders.
 */
export function useMouseParallax() {
  const mouse = useRef<ParallaxState>({ x: 0, y: 0 });
  const target = useRef<ParallaxState>({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const lerp = () => {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.06;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.06;
      rafId.current = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafId.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  /**
   * Returns a CSS transform string for parallax offset.
   * @param strength — pixel displacement per unit mouse movement
   */
  const getTransform = useCallback(
    (strength: number) => {
      return `translate(${mouse.current.x * strength}px, ${mouse.current.y * strength}px)`;
    },
    []
  );

  return { mouse, getTransform };
}

/**
 * Tracks scroll position as a normalized 0-1 value for the hero viewport.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      progress.current = Math.min(window.scrollY / vh, 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
