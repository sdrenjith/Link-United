const { z } = require("zod");

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("A valid email is required."),
    password: z.string().min(6, "Password must be at least 6 characters."),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z.string().min(1, "Current password is required."),
      newPassword: z.string().min(8, "New password must be at least 8 characters."),
    })
    .strict(),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

module.exports = { loginSchema, changePasswordSchema };
