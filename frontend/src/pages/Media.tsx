import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import { mediaService } from "../services/media.service";
import type { MediaPost } from "../types/api";
import heroBg from "../assets/images/exporting02.jpg";

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

          <div className="grid gap-y-20 gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group relative flex flex-col cursor-pointer"
              >
                {/* Clean, sharply defined image container without neon glowing shadows */}
                <div className="overflow-hidden mb-8 aspect-[4/3] w-full bg-[#080808] border border-white/5">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                </div>
                
                {/* Premium typography block */}
                <div className="flex flex-col flex-1 pl-2 border-l border-gold-400/0 group-hover:border-gold-400/100 transition-colors duration-500">
                  <p className="text-gold-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  
                  <h3 className="text-2xl font-light text-white mb-5 leading-[1.3] tracking-tight group-hover:text-gold-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-zinc-400 font-body text-sm leading-[1.8] mb-8 line-clamp-3">
                    {post.summary}
                  </p>
                  
                  {/* Elegant interacting link element */}
                  <div className="mt-auto">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-4 group-hover:gap-6 transition-all duration-300">
                      Read Article <div className="h-[1px] w-8 bg-gold-400" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
        </Container>
      </section>
    </div>
  );
}
