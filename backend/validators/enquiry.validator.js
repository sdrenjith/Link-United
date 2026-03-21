const { z } = require("zod");

const createEnquirySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().min(6).max(30),
    company: z.string().min(2).max(120),
    message: z.string().min(20).max(2000),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

module.exports = { createEnquirySchema };
