const express = require("express");
const router = express.Router();
const { getProducts, createProducts, updateProducts,  deleteProducts} = require("../controllers/products.controller");

router.get("/", getProducts);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

module.exports = router;