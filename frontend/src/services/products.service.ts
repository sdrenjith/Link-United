import api from "./http";
import type { Product, ProductCategory } from "../types/api";

export type ProductPayload = Omit<Product, "id" | "createdAt" | "updatedAt">;

export const productsService = {
  list: async (category?: ProductCategory) => {
    const { data } = await api.get<{ items: Product[] }>("/products", {
      params: category ? { category } : undefined,
    });
    return data.items;
  },
  create: async (payload: ProductPayload) => {
    const { data } = await api.post<{ item: Product }>("/products", payload);
    return data.item;
  },
  update: async (id: number, payload: Partial<ProductPayload>) => {
    const { data } = await api.put<{ item: Product }>(`/products/${id}`, payload);
    return data.item;
  },
  remove: async (id: number) => {
    await api.delete(`/products/${id}`);
  },
};
