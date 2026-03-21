const { z } = require("zod");

const categories = [
  "general-products",
  "agro-commodities",
  "vehicles-machinery",
  "woods-wood-products",
];

const productPayload = z.object({
  name: z.string().min(2).max(150),
  category: z
    .string()
    .refine((value) => categories.includes(value), "Invalid product category."),
  shortDescription: z.string().min(10).max(200),
  description: z.string().min(20).max(2000),
  price: z.number().min(0),
  unit: z.string().min(1).max(20),
  imageUrl: z.string().url(),
  isFeatured: z.boolean().optional().default(false),
});

const createProductSchema = z.object({
  body: productPayload,
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

const updateProductSchema = z.object({
  body: productPayload.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided.",
  }),
  query: z.object({}).optional(),
  params: z.object({ id: z.coerce.number().int().positive() }),
});

module.exports = { createProductSchema, updateProductSchema, categories };
