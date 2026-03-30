import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import { mediaService } from "../services/media.service";
import type { MediaPost } from "../types/api";
import heroBg from "../assets/images/exporting02.jpg";

const NARROW_MQ = "(max-width: 1023px)";

function useTapFlipMode() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(NARROW_MQ);
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return narrow;
}

function MediaGalleryCard({ post, index }: { post: MediaPost; index: number }) {
  const tapMode = useTapFlipMode();
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = useCallback(() => {
    if (tapMode) setFlipped((f) => !f);
  }, [tapMode]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!tapMode) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className={`group relative h-[min(520px,85vw)] w-full max-w-md mx-auto outline-none [perspective:1400px] touch-manipulation md:max-w-none
        ${tapMode ? "cursor-pointer" : "lg:cursor-default"}`}
      tabIndex={0}
      role="button"
      aria-pressed={tapMode ? flipped : undefined}
      aria-label={
        tapMode
          ? flipped
            ? `${post.title}. Tap anywhere to return to the cover.`
            : `${post.title}. Tap anywhere to read the full description.`
          : `${post.title}. Hover to read full description.`
      }
      onClick={tapMode ? toggleFlip : undefined}
      onKeyDown={onKeyDown}
    >
      <div
        style={
          tapMode
            ? { transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }
            : undefined
        }
        className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] [transform-style:preserve-3d]
          ${tapMode ? "" : "group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"}`}
      >
        {/* —— Front: full-bleed image + title only (summary & body on flip) —— */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/12 bg-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.55)] [backface-visibility:hidden]">
          <img
            src={post.imageUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/10"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:p-6 sm:gap-2.5">
            <h3 className="font-body text-xl font-semibold leading-snug tracking-tight text-white line-clamp-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-2xl">
              {post.title}
            </h3>
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400/90 lg:hidden">
              Tap for details
            </p>
            <p className="hidden font-body text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400/90 lg:block">
              Hover for details
            </p>
          </div>
        </div>

        {/* —— Back: blurred image + readable content —— */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/12 bg-zinc-950 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img
            src={post.imageUrl}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
          />
          <div className="absolute inset-0 bg-zinc-950/88 backdrop-blur-md" />
          <div className="relative flex h-full min-h-0 flex-col p-6 sm:p-7">
            <h3 className="shrink-0 font-body text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
              {post.title}
            </h3>
            {post.summary?.trim() ? (
              <p className="mt-3 shrink-0 font-body text-sm leading-relaxed text-zinc-400 sm:mt-4 sm:text-[15px] sm:leading-relaxed">
                {post.summary}
              </p>
            ) : null}
            <div className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-white/[0.08] pt-5 font-body text-base leading-[1.85] text-zinc-100 sm:mt-6 sm:pt-6 sm:text-lg sm:leading-[1.9] [scrollbar-color:rgba(201,151,58,0.35)_transparent] [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]">
              <p className="whitespace-pre-wrap break-words">
                {post.content?.trim() ? post.content : "No additional description for this item."}
              </p>
            </div>
            {tapMode ? (
              <p className="mt-3 shrink-0 text-center font-body text-[10px] uppercase tracking-wider text-zinc-500 sm:text-xs">
                Tap anywhere to flip back
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Media() {
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const items = await mediaService.list();
        setPosts(items);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden">
      
      {/* 1. Cinematic Corporate Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex flex-col items-center justify-center border-b border-white/5">
        {/* High-quality background image with elegant corporate vignette */}
        <div className="absolute inset-0 z-0 bg-[#020202]">
          <img 
            src={heroBg} 
            alt="Link United Global Hub" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]/90 pointer-events-none" />
        </div>
        
        {/* Crisp, authoritative Typography */}
        <div className="relative z-10 text-center px-6 mt-24 md:mt-32 max-w-5xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 1 }}
            className="text-gold-400 font-sans tracking-[0.3em] text-xs md:text-sm uppercase mb-8 font-bold"
          >
            Media Centre
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-8"
          >
            Company <span className="text-white font-medium">Updates</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.2, duration: 1 }}
            className="text-zinc-400 text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed"
          >
            Stay informed with the latest global news, strategic announcements, and market insights from Link United International.
          </motion.p>
        </div>
      </section>

      {/* 2. Premium Content Grid */}
      <section className="relative z-10 bg-[#050505] py-24 lg:py-32">
        <Container>
          
          {loading && (
            <div className="py-32 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-zinc-800 border-t-gold-400 mb-6" />
              <p className="text-zinc-500 font-sans tracking-widest uppercase text-sm">Retrieving global data...</p>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-32 text-center border border-white/5 bg-[#080808] rounded-none lg:rounded-2xl"
            >
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center border border-white/10 rounded-full bg-white/[0.02]">
                <svg className="h-8 w-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-white mb-4">No Publications Available</h3>
              <p className="text-lg text-zinc-500 max-w-xl mx-auto font-body">
                News and strategic announcements will appear here once authorized for public release through the intelligence network.
              </p>
            </motion.div>
          )}

          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {posts.map((post, i) => (
              <MediaGalleryCard key={post.id} post={post} index={i} />
            ))}
          </div>
          
        </Container>
      </section>
    </div>
  );
}
