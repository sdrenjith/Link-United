import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import SectionLabel from "../components/ui/SectionLabel";
import ScrollReveal from "../components/ui/ScrollReveal";
import GoldButton from "../components/ui/GoldButton";
import { categoryMeta } from "../constants/site";
import { productsService } from "../services/products.service";
import type { Product, ProductCategory } from "../types/api";

const categoryDetails = [
  {
    number: "01",
    name: "General Products",
    path: "/products/general",
    description:
      "The global appliances and consumer electronics market continues to expand. We export a comprehensive range of modern products — from mechanical and industrial components to consumer lifestyle goods.",
    features: [
      "Mechanical Products & Components",
      "Gym & Fitness Equipment",
      "Cooking Appliances & Food Processors",
      "Garment Care & Grooming",
      "Temperature Control & HVAC",
      "Circuit Protection & Industrial Cables",
    ],
  },
  {
    number: "02",
    name: "Agro Commodities",
    path: "/products/agro-commodities",
    description:
      "As a leading trader of agro-commodities with a firm foothold in global markets, we execute trade in raw, semi-processed, and ready-to-use agricultural products across the USA, UK, Europe, and Africa.",
    features: [
      "Cashews, Rice & Spices",
      "Vanilla, Cocoa & Almonds",
      "Sesame Seeds & Peanuts",
      "Virgin Coconut Oil & Coconuts",
      "Turmeric, Ginger & Garlic",
      "Charcoal & Cassava",
    ],
  },
  {
    number: "03",
    name: "Vehicles & Machinery",
    path: "/products/vehicles-machinery",
    description:
      "We facilitate the international trade of heavy equipment, vehicles, and industrial machinery — connecting manufacturers with buyers across emerging and established markets worldwide.",
    features: [
      "Construction Equipment",
      "Agricultural Machinery",
      "Commercial Vehicles",
      "Industrial Engines",
      "Material Handling Equipment",
      "Spare Parts & Accessories",
    ],
  },
  {
    number: "04",
    name: "Woods & Wood Products",
    path: "/products/woods-wood-products",
    description:
      "We specialise in sourcing the finest quality timber from Canada, Africa, Europe, and the USA — serving the housing, construction, furniture, handicrafts, pulp & paper, and hospitality industries.",
    features: [
      "Construction & Structural Timber",
      "Furniture-Grade Hardwoods",
      "Plywood & Engineered Wood",
      "Decking & Flooring",
      "Paper & Pulp Grade Wood",
      "Certified Sustainable Sources",
    ],
  },
  {
    number: "05",
    name: "Kids Clothing",
    path: "/products/kids-clothing",
    description:
      "Quality children's apparel sourced from certified manufacturers for international retail distribution. Our kids clothing division serves wholesalers and retailers across the UK, USA, and Europe.",
    features: [
      "Certified Fabric Standards",
      "Consistent International Sizing",
      "Seasonal Collections",
      "Private Label Manufacturing",
      "Wholesale & Retail Distribution",
      "Compliance with EU/UK/US Standards",
    ],
  },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const category = searchParams.get("category") as ProductCategory | null;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await productsService.list(category ?? undefined);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    void loadProducts();
  }, [category]);

  const selectedLabel = useMemo(
    () =>
      categoryMeta.find((c) => c.key === category)?.label ?? "Our Product Range",
    [category],
  );

  return (
    <>
      <PageHero
        eyebrow="Product Portfolio"
        title={selectedLabel}
        description="Diversified portfolio across high-demand sectors — structured for international trade scalability."
      />

      <section className="relative z-10 bg-[#080808] py-20">
        <Container>
          {/* Category filters */}
          <div className="mb-12 flex flex-wrap items-center gap-2">
            <button
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                !category
                  ? "bg-gradient-to-r from-gold-200 to-gold-500 text-dark-600 shadow-[0_0_20px_rgba(201,151,58,0.2)]"
                  : "border border-zinc-700/60 text-zinc-400 hover:border-gold-400/40 hover:text-gold-200"
              }`}
              onClick={() => setSearchParams({})}
            >
              All
            </button>
            {categoryMeta.map((item) => (
              <button
                key={item.key}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  category === item.key
                    ? "bg-gradient-to-r from-gold-200 to-gold-500 text-dark-600 shadow-[0_0_20px_rgba(201,151,58,0.2)]"
                    : "border border-zinc-700/60 text-zinc-400 hover:border-gold-400/40 hover:text-gold-200"
                }`}
                onClick={() => setSearchParams({ category: item.key })}
              >
                {item.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="glass rounded-2xl px-8 py-16 text-center">
              <p className="text-lg text-[#888888]">
                No products available for this category yet. Products will appear
                here once added through the admin dashboard.
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#888888]">
                    {product.shortDescription}
                  </p>
                  <p className="gold-text mt-3 text-sm font-bold">
                    USD {product.price.toFixed(2)} / {product.unit}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Category detail sections */}
      <section className="relative z-10 bg-[#080808] py-20">
        <Container>
          <SectionLabel
            eyebrow="Detailed Overview"
            title="Explore Our Product Divisions"
            centered
          />

          <div className="space-y-24">
            {categoryDetails.map((cat, i) => (
              <ScrollReveal
                key={cat.number}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 ${
                    i % 2 !== 0 ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div className={i % 2 !== 0 ? "lg:[direction:ltr]" : ""}>
                    <span className="font-display text-6xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(201,151,58,0.2)]">
                      {cat.number}
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                      {cat.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#888888]">
                      {cat.description}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {cat.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-3 text-sm text-zinc-300"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Link to={cat.path}>
                        <GoldButton variant="ghost">
                          Enquire Now &rarr;
                        </GoldButton>
                      </Link>
                    </div>
                  </div>

                  <div className={`glass rounded-2xl p-1 ${i % 2 !== 0 ? "lg:[direction:ltr]" : ""}`}>
                    <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/5 to-transparent">
                      <span className="font-display text-4xl font-bold text-gold-400/20">
                        {cat.name}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
