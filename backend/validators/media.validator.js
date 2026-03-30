const { z } = require("zod");

// imageUrl is often a site-relative path from upload (e.g. /images/media/...) — not a full URL
const imageUrlSchema = z
  .string()
  .min(1)
  .refine((s) => s.startsWith("/") || /^https?:\/\//i.test(s), {
    message: "imageUrl must be a path starting with / or a full http(s) URL",
  });

const mediaPayload = z.object({
  title: z.string().min(5).max(180),
  summary: z.string().max(300).optional(),
  content: z.string().max(5000).optional(),
  imageUrl: imageUrlSchema,
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
