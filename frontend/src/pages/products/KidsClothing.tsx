import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";
import ScrollReveal from "../../components/ui/ScrollReveal";
import GoldButton from "../../components/ui/GoldButton";
import { productsService } from "../../services/products.service";
import type { Product } from "../../types/api";

const features = [
  "Certified Fabric Standards",
  "Consistent International Sizing",
  "Seasonal Collections",
  "Private Label Manufacturing",
  "Wholesale & Retail Distribution",
  "EU/UK/US Compliance",
];

export default function KidsClothing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await productsService.list("kids-clothing");
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Product Category"
        title="Kids Clothing"
        description="Quality children's apparel for international retail markets."
      />

      <section className="relative z-10 bg-[#080808] py-20">
        <Container>
          <ScrollReveal>
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-[#888888]">
              Quality children's apparel sourced from certified manufacturers for international
              retail distribution. Our kids clothing division serves wholesalers and retailers
              across the UK, USA, and Europe with consistent sizing, fabric quality, and
              compliance standards.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
              {features.map((item) => (
                <span key={item} className="glass rounded-full px-5 py-2.5 text-xs font-medium text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="glass group overflow-hidden rounded-2xl transition-all duration-300 hover:border-gold-400/30"
                >
                  <div className="overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} loading="lazy" className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <p className="mt-2 text-sm text-[#888888]">{product.shortDescription}</p>
                    <p className="gold-text mt-3 text-sm font-bold">USD {product.price.toFixed(2)} / {product.unit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link to="/contact">
              <GoldButton>Enquire About Kids Clothing</GoldButton>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
