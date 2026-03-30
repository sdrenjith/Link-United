import type { ProductCategory } from "../types/api";

const paths: Record<ProductCategory, string> = {
  "general-products": "/products/general",
  "agro-commodities": "/products/agro-commodities",
  "vehicles-machinery": "/products/vehicles-machinery",
  "woods-wood-products": "/products/woods-wood-products",
  "kids-clothing": "/products/kids-clothing",
};

export function productCategoryPath(category: ProductCategory): string {
  return paths[category] ?? "/products";
}
