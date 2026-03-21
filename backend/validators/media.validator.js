const { z } = require("zod");

const mediaPayload = z.object({
  title: z.string().min(5).max(180),
  summary: z.string().min(20).max(300),
  content: z.string().min(30).max(5000),
  imageUrl: z.string().url(),
  publishedAt: z.string().datetime().optional(),
});

const createMediaSchema = z.object({
  body: mediaPayload,
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

const updateMediaSchema = z.object({
  body: mediaPayload.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided.",
  }),
  query: z.object({}).optional(),
  params: z.object({ id: z.coerce.number().int().positive() }),
});

module.exports = { createMediaSchema, updateMediaSchema };
