import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import { mediaService } from "../services/media.service";
import type { MediaPost } from "../types/api";

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
    <>
      <PageHero
        eyebrow="Media Centre"
        title="Company Updates"
        description="Stay informed with the latest news, announcements, and insights from Link United International."
      />

      <section className="relative z-10 bg-[#080808] py-24">
        <Container>
          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="glass rounded-2xl px-8 py-20 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/10">
                <svg className="h-7 w-7 text-gold-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-lg text-[#888888]">
                No media updates published yet. News and announcements will
                appear here once added through the admin dashboard.
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass group overflow-hidden rounded-2xl transition-all duration-300 hover:border-gold-400/30 hover:shadow-[0_0_20px_rgba(201,151,58,0.08)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="gold-text text-[11px] font-bold uppercase tracking-[0.2em]">
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#888888]">
                    {post.summary}
                  </p>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-gold-200 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Read More &rarr;
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
