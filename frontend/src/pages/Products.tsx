import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import SectionLabel from "../components/ui/SectionLabel";
import ScrollReveal from "../components/ui/ScrollReveal";
import GoldButton from "../components/ui/GoldButton";
import { categoryMeta } from "../constants/site";
import { productsService } from "../services/products.service";
import api from "../services/http";
import type { Product, ProductCategory } from "../types/api";

const categoryDetails = [
  {
    number: "01",
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
    number: "02",
    name: "Vehicles & Machinery",
    path: "/products/vehicles-machinery",
    description:
      "Powering progress and driving innovation across emerging and established economies. Acting as a strategic bridge between world-class manufacturers and high-growth industries, we supply the heavy-duty machinery and commercial vehicle fleets required to scale operations efficiently.",
    features: [
      "Earthmoving & Construction Equipment",
      "Agricultural & Farming Machinery",
      "Heavy-Duty Commercial Trucks & Trailers",
      "Material Handling & Logistics Vehicles",
      "Mining, Drilling & Resource Extraction Tech",
      "Industrial Processing & Manufacturing Lines",
    ],
  },
  {
    number: "03",
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
    number: "04",
    name: "Kids Clothing",
    path: "/products/kids-clothing",
    description:
      "Operating from the United Kingdom, we specialize in the global import and export of premium children's apparel. We seamlessly connect trusted manufacturers with international retailers, delivering stylish, comfortable, and rigorously tested kidswear through a highly transparent supply chain.",
    features: [
      "Premium Infant, Toddler & Youth Apparel",
      "Everyday Essentials & Seasonal Collections",
      "Strict EU/UK/US Safety Compliance Standards",
      "Global Sourcing & Dedicated Quality Control",
      "Strategic Retail & Wholesale Distribution",
      "End-to-End Supply Chain Management",
    ],
  },
  {
    number: "05",
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
];

const CategoryImageSlider = ({ images, title }: { images: string[]; title: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-full min-h-[350px] items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/5 to-transparent">
        <span className="font-display text-4xl font-bold text-gold-400/20">{title}</span>
      </div>
    );
  }

  // Handle case where images length shrinks dynamically
  const safeIndex = index % images.length;

  return (
    <div className="relative h-full min-h-[350px] w-full overflow-hidden rounded-xl bg-dark-600 group">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[safeIndex]}
          src={images[safeIndex]}
          alt={`${title} Preview ${safeIndex + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none" />
      
      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === safeIndex ? "w-6 bg-gold-400" : "w-1.5 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [dynamicSliders, setDynamicSliders] = useState<any[]>([]);
  const category = searchParams.get("category") as ProductCategory | null;
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  const kidsSubCategories = ["Babys", "Kids", "Teens"];

  // Derive subcategories based on selected category
  const availableSubCategories = useMemo(() => {
    if (category === "kids-clothing") return kidsSubCategories;
    if (category !== "agro-commodities") return [];
    const subs = products.filter(p => p.subCategory).map(p => p.subCategory as string);
    return Array.from(new Set(subs)).sort();
  }, [products, category]);

  // Derive the filtered products based on the active sub-category selection
  const displayedProducts = useMemo(() => {
    if (!activeSubCategory) return products;
    return products.filter(p => p.subCategory === activeSubCategory);
  }, [products, activeSubCategory]);

  useEffect(() => {
    setActiveSubCategory(null); // Reset sub-category specifically when primary category changes
    const loadProductsAndSliders = async () => {
      setLoading(true);
      try {
        // Fetch product list
        const data = await productsService.list(category ?? undefined);
        setProducts(data);

        // Fetch dynamic slider configurations
        try {
          const { data } = await api.get("/sliders");
          setDynamicSliders(data.items || []);
        } catch (e) {
          console.error("Failed to load dynamic sliders", e);
        }

      } finally {
        setLoading(false);
      }
    };
    void loadProductsAndSliders();
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

          {/* Conditional Sub-Category Dynamic Menu Strip */}
          {(category === "agro-commodities" || category === "kids-clothing") && availableSubCategories.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 flex flex-wrap items-center gap-3 rounded-2xl bg-zinc-900/50 p-4 border border-zinc-800/50"
            >
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mr-2 hidden md:block">Filter By:</span>
              <button
                className={`rounded border px-4 py-1.5 text-xs transition-all duration-300 ${
                  activeSubCategory === null
                    ? "border-gold-400/50 bg-gold-400/10 text-gold-300"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
                onClick={() => setActiveSubCategory(null)}
              >
                {category === "kids-clothing" ? "All Kids Clothing" : "All Agro Products"}
              </button>
              {availableSubCategories.map((sub) => (
                <button
                  key={sub}
                  className={`rounded border px-4 py-1.5 text-xs transition-all duration-300 ${
                    activeSubCategory === sub
                      ? "border-gold-400/50 bg-gold-400/10 text-gold-300"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                  onClick={() => setActiveSubCategory(sub)}
                >
                  {sub}
                </button>
              ))}
            </motion.div>
          )}

          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
            </div>
          )}

          {!loading && displayedProducts.length === 0 && (
            <div className="glass rounded-2xl px-8 py-16 text-center">
              <p className="text-lg text-[#888888]">
                No products available for this selection. Products will appear
                here once added through the admin dashboard.
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="glass group overflow-hidden rounded-2xl transition-all duration-300 hover:border-gold-400/30 flex flex-col"
                >
                <div className="overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#888888] flex-1">
                    {product.shortDescription}
                  </p>
                  <p className="gold-text mt-4 text-sm font-bold">
                    USD {product.price.toFixed(2)} / {product.unit}
                  </p>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Category detail sections */}
      <section className="relative z-10 bg-[#080808] py-20 pb-40">
        <Container>
          <SectionLabel
            eyebrow="Detailed Overview"
            title="Explore Our Product Divisions"
            centered
          />

          <div className="space-y-28 mt-20">
            {categoryDetails.map((cat, i) => {
              // Extract dynamic images for this category
              const categoryDynamicSliders = dynamicSliders.filter(s => s.categoryNumber === cat.number);
              const activeImages = categoryDynamicSliders.map(s => s.imageUrl);

              return (
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
                      <span className="font-display text-8xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(201,151,58,0.2)] leading-none block mb-4">
                        {cat.number}
                      </span>
                      <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                        {cat.name}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-400 max-w-md">
                        {cat.description}
                      </p>
                      <ul className="mt-8 space-y-3">
                        {cat.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-center gap-3 text-sm text-zinc-300 font-medium"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/80 shadow-[0_0_8px_rgba(201,151,58,0.6)]" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10">
                        <Link to={cat.path}>
                          <GoldButton variant="ghost" className="px-8 py-3">
                            Enquire Now &rarr;
                          </GoldButton>
                        </Link>
                      </div>
                    </div>

                    <div className={`glass rounded-2xl p-1.5 h-full min-h-[400px] shadow-[0_0_40px_rgba(0,0,0,0.6)] ${i % 2 !== 0 ? "lg:[direction:ltr]" : ""}`}>
                      <CategoryImageSlider images={activeImages} title={cat.name} />
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
