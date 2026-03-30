const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  getProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { createProductSchema, updateProductSchema } = require("../validators/product.validator");

router.get("/search", searchProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, requireRole(["admin"]), validate(createProductSchema), createProduct);
router.put("/:id", authMiddleware, requireRole(["admin"]), validate(updateProductSchema), updateProduct);
router.delete("/:id", authMiddleware, requireRole(["admin"]), deleteProduct);

module.exports = router;