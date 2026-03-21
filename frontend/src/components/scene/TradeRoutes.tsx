import { useEffect, useRef } from "react";

/* Trade route definitions: SVG coords on a 1200x600 viewBox */
const routes = [
  { from: [490, 115], to: [620, 170], label: "UK → Middle East" },
  { from: [620, 170], to: [730, 230], label: "Middle East → India" },
  { from: [730, 230], to: [860, 150], label: "India → East Asia" },
  { from: [490, 115], to: [260, 260], label: "UK → South America" },
  { from: [260, 260], to: [220, 190], label: "S.America → N.America" },
  { from: [860, 150], to: [900, 370], label: "E.Asia → Australia" },
  { from: [490, 115], to: [560, 280], label: "UK → Africa" },
] as const;

/* Hub nodes: major trade cities */
const nodes = [
  { cx: 490, cy: 115, label: "London" },
  { cx: 220, cy: 190, label: "Houston" },
  { cx: 620, cy: 170, label: "Dubai" },
  { cx: 730, cy: 230, label: "Mumbai" },
  { cx: 860, cy: 150, label: "Shanghai" },
  { cx: 560, cy: 280, label: "Lagos" },
  { cx: 260, cy: 260, label: "São Paulo" },
  { cx: 900, cy: 370, label: "Sydney" },
];

export default function TradeRoutes() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll<SVGPathElement>(".trade-path");
    if (!paths) return;

    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.animation = `tradeRouteDraw 2s ${i * 0.3 + 1}s ease forwards`;
    });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 600"
        style={{
          width: "80%",
          maxWidth: "1050px",
          opacity: 0.5,
          transform: "translateX(5%)",
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tradeGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8C97A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C9973A" stopOpacity="1" />
            <stop offset="100%" stopColor="#E8C97A" stopOpacity="0.8" />
          </linearGradient>
          <filter id="routeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Trade route lines */}
        {routes.map((route, i) => {
          const [x1, y1] = route.from;
          const [x2, y2] = route.to;
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 - 20;
          return (
            <path
              key={i}
              className="trade-path"
              d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
              stroke="url(#tradeGold)"
              strokeWidth="1.2"
              strokeLinecap="round"
              filter="url(#routeGlow)"
              opacity="0.6"
            />
          );
        })}

        {/* Hub nodes */}
        {nodes.map((node, i) => (
          <g key={node.label}>
            {/* Pulse ring */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="8"
              fill="none"
              stroke="#C9973A"
              strokeWidth="0.5"
              opacity="0.4"
              className="trade-node-pulse"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            {/* Core dot */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="#E8C97A"
              filter="url(#nodeGlow)"
              className="trade-node-core"
              style={{ animationDelay: `${i * 0.3 + 1}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
