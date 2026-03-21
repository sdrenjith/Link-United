import { useState } from "react";
import { motion } from "framer-motion";

const SHIP_IMAGE =
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80";

/* Navigation lights positioned relative to the ship */
const navLights = [
  { color: "#ff3333", left: "8%",  bottom: "45%", size: 5, delay: 0 },   // port (red)
  { color: "#33ff55", left: "92%", bottom: "45%", size: 5, delay: 0.5 },  // starboard (green)
  { color: "#ffeebb", left: "50%", bottom: "85%", size: 4, delay: 1 },    // mast top
  { color: "#ffd866", left: "48%", bottom: "78%", size: 3, delay: 1.5 },  // mast second
  { color: "#ffffff", left: "30%", bottom: "60%", size: 3, delay: 0.8 },  // deck light
];

export default function CargoShip() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      initial={{ x: "80%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        bottom: "-5%",
        right: "-5%",
        zIndex: 2,
        width: "60%",
        maxWidth: "850px",
        pointerEvents: "none",
      }}
      className="ship-position"
    >
      {/* Drift wrapper */}
      <div className="ship-wrapper">
        {/* Rock wrapper */}
        <div className="ship-inner" style={{ position: "relative" }}>
          {/* Ship image */}
          <img
            src={SHIP_IMAGE}
            alt="Cargo ship on dark ocean"
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter:
                "brightness(0.55) contrast(1.15) saturate(0.85) drop-shadow(0 0 60px rgba(201,151,58,0.12)) drop-shadow(0 20px 80px rgba(0,0,0,0.9))",
              borderRadius: "4px",
              maskImage: "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 70%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 70%, transparent 95%)",
            }}
          />

          {/* Navigation lights */}
          {imgLoaded &&
            navLights.map((light, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 + light.delay, duration: 0.5 }}
                className="nav-light"
                style={{
                  position: "absolute",
                  left: light.left,
                  bottom: light.bottom,
                  width: light.size,
                  height: light.size,
                  borderRadius: "50%",
                  backgroundColor: light.color,
                  boxShadow: `0 0 ${light.size * 2}px ${light.size}px ${light.color}`,
                }}
              />
            ))}

          {/* Wake lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.2 }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {/* Left wake */}
            <div
              className="wake-line"
              style={{
                position: "absolute",
                bottom: "5%",
                left: "-15%",
                width: "35%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(201,151,58,0.08) 100%)",
                transform: "rotate(3deg)",
                transformOrigin: "right center",
              }}
            />
            {/* Right wake */}
            <div
              className="wake-line"
              style={{
                position: "absolute",
                bottom: "8%",
                left: "-18%",
                width: "30%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 40%, rgba(201,151,58,0.06) 100%)",
                transform: "rotate(5deg)",
                transformOrigin: "right center",
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
