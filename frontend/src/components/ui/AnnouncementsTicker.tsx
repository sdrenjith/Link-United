import { cn } from "../../utils/cn";
import { useState } from "react";

interface AnnouncementsTickerProps {
  items: any[];
  className?: string;
}

export default function AnnouncementsTicker({ items, className }: AnnouncementsTickerProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!items || items.length === 0) return null;

  // Duplicate items for seamless infinite scrolling loop
  const scrollItems = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative z-10 border-y border-gold-400/10 bg-[#080808] py-4 group",
        className
      )}
    >
      <div
        className="flex w-max animate-announcements-ticker"
        style={{ animationPlayState: isHovered ? "paused" : "running" }}
      >
        {scrollItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex items-center gap-8 px-8 border-r border-white/5 relative group/item cursor-pointer h-full"
          >
            {item.imageUrl && (
              <div className="shrink-0 transition-transform duration-300 group-hover/item:scale-125">
                <img
                  src={item.imageUrl}
                  alt="Logo"
                  className="h-6 w-auto object-contain filter drop-shadow-md"
                />
              </div>
            )}

            <div className="flex flex-col justify-center min-w-[120px] relative">
              <span className="gold-text font-accent text-sm font-medium uppercase tracking-[0.2em] opacity-70 transition-opacity md:text-base group-hover/item:opacity-100">
                {item.title}
              </span>

              {item.description && (
                <div className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 z-[99999] opacity-0 invisible translate-y-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-y-0 transition-all duration-300 ease-out pointer-events-none">
                  <div className="relative w-[320px] rounded-2xl border border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col gap-2">
                    <h4 className="font-sans text-[15px] font-semibold text-white tracking-wide">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[13px] leading-[1.6] text-zinc-400">
                      {item.description}
                    </p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a]/95 border-r border-b border-white/5 rotate-45" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
