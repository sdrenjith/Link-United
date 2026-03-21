export default function OceanSurface() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "35%",
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Ocean gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, #051020 40%, #040e1c 70%, #030c18 100%)",
        }}
      />

      {/* Wave layer 1 */}
      <svg
        className="ocean-wave ocean-wave-1"
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "-10px",
          left: 0,
          width: "200%",
          height: "40px",
        }}
      >
        <path
          d="M0 40 C360 10 720 70 1080 40 C1440 10 1800 70 2160 40 C2520 10 2880 70 2880 40 V80 H0 Z"
          fill="#051020"
          fillOpacity="0.6"
        />
      </svg>

      {/* Wave layer 2 */}
      <svg
        className="ocean-wave ocean-wave-2"
        viewBox="0 0 2880 60"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "5px",
          left: 0,
          width: "200%",
          height: "30px",
        }}
      >
        <path
          d="M0 30 C480 5 960 55 1440 30 C1920 5 2400 55 2880 30 V60 H0 Z"
          fill="#040e1c"
          fillOpacity="0.5"
        />
      </svg>

      {/* Wave layer 3 */}
      <svg
        className="ocean-wave ocean-wave-3"
        viewBox="0 0 2880 50"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "18px",
          left: 0,
          width: "200%",
          height: "25px",
        }}
      >
        <path
          d="M0 25 C360 5 720 45 1080 25 C1440 5 1800 45 2160 25 C2520 5 2880 45 2880 25 V50 H0 Z"
          fill="#030c18"
          fillOpacity="0.4"
        />
      </svg>

      {/* Gold shimmer lines */}
      {[0.04, 0.03, 0.05, 0.025].map((opacity, i) => (
        <div
          key={i}
          className={`shimmer-line shimmer-line-${i + 1}`}
          style={{
            position: "absolute",
            top: `${30 + i * 15}%`,
            left: "-10%",
            width: "120%",
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, rgba(201,151,58,${opacity}) 30%, rgba(201,151,58,${opacity * 1.5}) 50%, rgba(201,151,58,${opacity}) 70%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
}
