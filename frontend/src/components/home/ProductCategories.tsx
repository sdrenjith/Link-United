import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../ui/Container";

// Sourced optimal, high-quality images from the existing assets
import exporting01 from "../../assets/images/exporting01.jpg";
import spices03 from "../../assets/images/spices03.jpg";
import shipHome01 from "../../assets/images/ship-home01.jpg";
import exporting02 from "../../assets/images/exporting02.jpg";
import spices01 from "../../assets/images/spices01.jpg";

const categories = [
  {
    name: "Vehicles & Machinery",
    tagline: "Heavy equipment, vehicles & industrial machinery for global markets",
    path: "/products/vehicles-machinery",
    image: exporting01,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Agro Commodities",
    tagline: "Spices, grains, oils & agricultural raw materials",
    path: "/products/agro-commodities",
    image: spices03,
    span: "",
  },
  {
    name: "Kids Clothing",
    tagline: "Quality children's apparel for international retail",
    path: "/products/kids-clothing",
    image: exporting02,
    span: "",
  },
  {
    name: "Woods & Wood Products",
    tagline: "Premium timber from certified producers",
    path: "/products/woods-wood-products",
    image: spices01,
    span: "",
  },
  {
    name: "General Products",
    tagline: "Consumer electronics, appliances & essentials",
    path: "/products/general",
    image: shipHome01,
    span: "",
  },
];

export default function ProductCategories() {
  return (
    <section className="relative z-10 overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,151,58,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,58,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative">
        <div className="mb-12 text-left">
          <p className="gold-text mb-3 text-xs font-bold uppercase tracking-[0.3em]">
            Our Portfolio
          </p>
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-5xl">
            Our Product Portfolio
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4 md:grid-rows-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.path}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cat.span}
            >
              <Link
                to={cat.path}
                className="group relative block h-full overflow-hidden rounded-[24px] border border-zinc-800/60 bg-dark-600 transition-all duration-500 hover:border-gold-400/40 hover:shadow-[0_0_30px_rgba(201,151,58,0.15)]"
              >
                {/* Background Image Wrapper */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Dark overlays to maintain high legibility */}
                  <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-600/90 via-dark-600/20 to-transparent opacity-80" />
                </div>

                <div className="relative flex h-full min-h-[220px] flex-col justify-end p-8 md:min-h-[260px]">
                  <h3 className="font-sans text-xl font-medium tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-1 md:text-2xl">
                    {cat.name}
                  </h3>
                  <p className="font-sans mt-2 text-sm text-zinc-400 transition-transform duration-500 group-hover:-translate-y-1">
                    {cat.tagline}
                  </p>
                  <span className="mt-4 block translate-y-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold-200 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
