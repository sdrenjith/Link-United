import { cn } from "../../utils/cn";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export default function Marquee({ items, className }: MarqueeProps) {
  const text = items.join(" ⚓ ") + " ⚓ ";
  return (
    <div
      className={cn(
        "relative z-10 overflow-hidden border-y border-gold-400/10 bg-[#080808] py-5",
        className
      )}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="font-accent text-sm font-medium uppercase tracking-[0.2em] text-gold-400/60 md:text-base">
          {text}
        </span>
        <span className="font-accent text-sm font-medium uppercase tracking-[0.2em] text-gold-400/60 md:text-base">
          {text}
        </span>
      </div>
    </div>
  );
}
