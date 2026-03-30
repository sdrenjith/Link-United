import type { ProductCategory } from "../types/api";

export const categoryMeta: {
  key: ProductCategory;
  label: string;
  tagline: string;
  icon: string;
}[] = [
  {
    key: "agro-commodities",
    label: "Agro products",
    tagline: "Spices, grains, oils, and agricultural raw materials",
    icon: "🌾",
  },
  {
    key: "kids-clothing" as ProductCategory,
    label: "Kids wear",
    tagline: "Quality children's apparel for international retail markets",
    icon: "👶",
  },
  {
    key: "general-products",
    label: "General commodities",
    tagline: "Consumer electronics, appliances, and industrial essentials",
    icon: "📦",
  },
  {
    key: "woods-wood-products",
    label: "Wood & wood furniture",
    tagline: "Premium timber sourced from certified global producers",
    icon: "🪵",
  },
  {
    key: "vehicles-machinery",
    label: "Vehicle & machinery",
    tagline: "Heavy equipment, vehicles, and industrial machinery",
    icon: "⚙️",
  },
];

export const siteNav = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Our Brands", path: "/our-brands" },
  { label: "Media", path: "/media" },
  { label: "Contact", path: "/contact" },
];
