import type { ProductCategory } from "../types/api";

export const categoryMeta: {
  key: ProductCategory;
  label: string;
  tagline: string;
  icon: string;
}[] = [
  {
    key: "general-products",
    label: "General Products",
    tagline: "Consumer electronics, appliances, and industrial essentials",
    icon: "📦",
  },
  {
    key: "agro-commodities",
    label: "Agro Commodities",
    tagline: "Spices, grains, oils, and agricultural raw materials",
    icon: "🌾",
  },
  {
    key: "vehicles-machinery",
    label: "Vehicles & Machinery",
    tagline: "Heavy equipment, vehicles, and industrial machinery",
    icon: "⚙️",
  },
  {
    key: "woods-wood-products",
    label: "Woods & Wood Products",
    tagline: "Premium timber sourced from certified global producers",
    icon: "🪵",
  },
  {
    key: "kids-clothing" as ProductCategory,
    label: "Kids Clothing",
    tagline: "Quality children's apparel for international retail markets",
    icon: "👶",
  },
];

export const siteNav = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Media", path: "/media" },
  { label: "Contact", path: "/contact" },
];
