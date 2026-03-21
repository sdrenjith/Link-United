import { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkle: boolean;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const stars: Star[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.5,
        baseOpacity: Math.random() * 0.6 + 0.3,
        twinkle: Math.random() < 0.2,
        twinkleSpeed: Math.random() * 3 + 3,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;

    const animate = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        let opacity = star.baseOpacity;
        if (star.twinkle) {
          opacity =
            star.baseOpacity *
            (0.4 + 0.6 * Math.abs(Math.sin(t / star.twinkleSpeed + star.twinkleOffset)));
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animIdRef.current = requestAnimationFrame(animate);
    };

    animIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
