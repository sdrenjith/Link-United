import { useId } from "react";

interface Props {
  variant?: "left" | "right" | "cross" | "map-accent";
  className?: string;
  opacity?: number;
}

export default function GeometricLines({ variant = "right", className = "", opacity = 0.5 }: Props) {
  const id = useId();
  
  const baseClasses = `pointer-events-none absolute inset-0 overflow-hidden z-[0] ${className}`;

  const goldGradient = (
    <linearGradient id={`gold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#f5e6b8" />
      <stop offset="50%" stopColor="#C9973A" />
      <stop offset="100%" stopColor="#7d5907" />
    </linearGradient>
  );

  const glowFilter = (
    <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  );
  
  const renderGeometry = () => {
    switch(variant) {
      case "right":
        return (
          <svg className="absolute right-0 top-0 h-[1000px] w-[1000px] origin-top-right transform opacity-[var(--line-opacity)]" viewBox="0 0 1000 1000" fill="none">
            <defs>
              {goldGradient}
              {glowFilter}
            </defs>
            <g filter={`url(#glow-${id})`}>
              {/* Parallel diagonals */}
              <line x1="200" y1="1000" x2="1000" y2="200" stroke={`url(#gold-${id})`} strokeWidth="1.5" />
              <line x1="400" y1="1000" x2="1000" y2="400" stroke={`url(#gold-${id})`} strokeWidth="0.5" />
              {/* Intersecting diagonal */}
              <line x1="600" y1="0" x2="1000" y2="400" stroke={`url(#gold-${id})`} strokeWidth="1" />
            </g>
          </svg>
        );
      case "left":
        return (
          <svg className="absolute left-0 top-0 h-[1000px] w-[1000px] origin-top-left transform opacity-[var(--line-opacity)]" viewBox="0 0 1000 1000" fill="none">
            <defs>
              {goldGradient}
              {glowFilter}
            </defs>
            <g filter={`url(#glow-${id})`}>
              {/* Parallel diagonals */}
              <line x1="800" y1="1000" x2="0" y2="200" stroke={`url(#gold-${id})`} strokeWidth="1.5" />
              <line x1="600" y1="1000" x2="0" y2="400" stroke={`url(#gold-${id})`} strokeWidth="0.5" />
              {/* Intersecting diagonal */}
              <line x1="400" y1="0" x2="0" y2="400" stroke={`url(#gold-${id})`} strokeWidth="1" />
            </g>
          </svg>
        );
      case "cross":
        return (
          <svg className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 transform opacity-[var(--line-opacity)]" viewBox="0 0 1200 1200" fill="none">
             <defs>
              {goldGradient}
              {glowFilter}
            </defs>
            <g filter={`url(#glow-${id})`}>
              <line x1="200" y1="0" x2="1200" y2="1000" stroke={`url(#gold-${id})`} strokeWidth="1" />
              <line x1="0" y1="200" x2="1000" y2="1200" stroke={`url(#gold-${id})`} strokeWidth="0.5" />
              <line x1="1000" y1="0" x2="0" y2="1000" stroke={`url(#gold-${id})`} strokeWidth="1.5" />
            </g>
          </svg>
        );
      case "map-accent":
        return (
          <svg className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 transform opacity-[var(--line-opacity)]" viewBox="0 0 1200 1200" fill="none">
             <defs>
              {goldGradient}
              {glowFilter}
            </defs>
            <g filter={`url(#glow-${id})`}>
              <line x1="0" y1="600" x2="600" y2="0" stroke={`url(#gold-${id})`} strokeWidth="1.25" />
              <line x1="1200" y1="600" x2="600" y2="0" stroke={`url(#gold-${id})`} strokeWidth="1.25" />
              <line x1="300" y1="300" x2="900" y2="900" stroke={`url(#gold-${id})`} strokeWidth="0.5" />
            </g>
          </svg>
        );
    }
  }

  return (
    <div className={baseClasses} style={{ "--line-opacity": opacity } as React.CSSProperties}>
      {renderGeometry()}
    </div>
  );
}
