export default function HorizonGlow() {
  return (
    <>
      {/* Main horizon glow */}
      <div
        className="horizon-glow"
        style={{
          position: "absolute",
          bottom: "25%",
          left: 0,
          right: 0,
          height: "40%",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(201,151,58,0.06) 0%, rgba(201,151,58,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Crepuscular rays — very subtle */}
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
          opacity: 0.04,
        }}
      >
        {["-18deg", "0deg", "15deg"].map((angle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: "2px",
              height: "100%",
              background: `linear-gradient(to top, rgba(201,151,58,0.5), transparent)`,
              transform: `translateX(-50%) rotate(${angle})`,
              transformOrigin: "bottom center",
            }}
          />
        ))}
      </div>
    </>
  );
}
