export type ProductCategory =
  | "general-products"
  | "agro-commodities"
  | "vehicles-machinery"
  | "woods-wood-products"
  | "kids-clothing";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  subCategory?: string;
  shortDescription: string;
  description: string;
  price: number;
  unit: string;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface DashboardStats {
  products: number;
  mediaPosts: number;
  enquiries: number;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}
