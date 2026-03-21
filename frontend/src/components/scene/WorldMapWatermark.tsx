export default function WorldMapWatermark() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 1200 600"
        style={{
          width: "75%",
          maxWidth: "1000px",
          opacity: 0.035,
          transform: "translateX(8%)",
        }}
        fill="#C9973A"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* North America */}
        <path d="M150 120 L180 100 L220 95 L260 105 L290 120 L310 140 L320 170 L310 200 L290 230 L260 250 L240 260 L220 270 L200 280 L180 275 L160 260 L140 240 L130 220 L125 200 L130 180 L140 150 Z" />
        {/* Central America */}
        <path d="M240 260 L250 275 L255 290 L260 310 L265 325 L258 330 L250 320 L245 305 L240 290 L238 275 Z" />
        {/* South America */}
        <path d="M265 325 L280 340 L300 360 L310 390 L315 420 L310 450 L300 470 L285 485 L270 490 L260 480 L255 460 L250 440 L248 420 L250 400 L255 380 L258 360 L260 340 Z" />
        {/* Europe */}
        <path d="M520 100 L540 95 L570 100 L590 110 L600 125 L605 140 L600 155 L590 165 L575 170 L560 175 L545 172 L530 165 L520 155 L515 140 L510 125 L515 110 Z" />
        {/* UK & Ireland */}
        <path d="M490 105 L500 100 L510 105 L512 115 L508 125 L500 128 L492 122 L488 112 Z" />
        {/* Africa */}
        <path d="M530 190 L560 185 L590 190 L610 205 L625 225 L635 250 L640 280 L638 310 L630 340 L620 365 L605 385 L590 400 L575 408 L560 405 L545 395 L535 380 L528 360 L525 340 L520 310 L518 280 L520 250 L522 225 L525 205 Z" />
        {/* Middle East */}
        <path d="M620 155 L645 150 L670 155 L685 170 L690 185 L685 200 L670 210 L650 215 L635 210 L625 200 L620 185 L618 170 Z" />
        {/* India */}
        <path d="M700 185 L720 180 L740 190 L750 210 L755 235 L750 260 L745 280 L735 295 L720 300 L710 290 L705 270 L700 250 L698 230 L700 210 Z" />
        {/* East Asia */}
        <path d="M800 100 L830 95 L860 100 L885 115 L900 135 L905 160 L900 185 L890 200 L870 210 L850 215 L830 210 L815 200 L805 185 L798 165 L795 145 L798 120 Z" />
        {/* Southeast Asia */}
        <path d="M810 230 L835 225 L855 235 L865 250 L860 268 L845 278 L825 280 L810 275 L805 260 L808 245 Z" />
        {/* Australia */}
        <path d="M850 350 L890 340 L930 345 L960 360 L975 380 L970 400 L955 415 L930 425 L900 428 L875 420 L858 405 L850 390 L848 370 Z" />
        {/* Japan */}
        <path d="M920 120 L930 110 L940 115 L942 130 L935 145 L925 148 L918 140 L916 130 Z" />
      </svg>
    </div>
  );
}
