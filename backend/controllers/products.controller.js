const pool = require("../config/db");
const asyncHandler = require("../utils/async-handler");

const mapProduct = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  subCategory: row.sub_category,
  shortDescription: row.short_description,
  description: row.description,
  price: Number(row.price),
  unit: row.unit,
  imageUrl: row.image_url,
  isFeatured: row.is_featured,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const getProducts = asyncHandler(async (req, res) => {
  const { category, subCategory } = req.query;
  const params = [];
  let query = "SELECT * FROM products WHERE 1=1";

  if (category) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }

  if (subCategory) {
    params.push(subCategory);
    query += ` AND sub_category = $${params.length}`;
  }

  query += " ORDER BY created_at DESC";
  const response = await pool.query(query, params);
  res.status(200).json({ items: response.rows.map(mapProduct) });
});

const escapeILike = (raw) =>
  String(raw)
    .replace(/\\/g, "\\\\")
    .replace(/%/g, "\\%")
    .replace(/_/g, "\\_");

const mapSearchHit = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  subCategory: row.sub_category,
  shortDescription: row.short_description,
  imageUrl: row.image_url,
});

const searchProducts = asyncHandler(async (req, res) => {
  const raw = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (raw.length === 0) {
    return res.status(200).json({ items: [] });
  }

  const pattern = `%${escapeILike(raw)}%`;
  const query = `
    SELECT id, name, category, sub_category, short_description, image_url
    FROM products
    WHERE
      name ILIKE $1 ESCAPE '\\'
      OR category ILIKE $1 ESCAPE '\\'
      OR COALESCE(sub_category, '') ILIKE $1 ESCAPE '\\'
      OR COALESCE(short_description, '') ILIKE $1 ESCAPE '\\'
      OR COALESCE(description, '') ILIKE $1 ESCAPE '\\'
    ORDER BY name ASC
    LIMIT 18
  `;
  const response = await pool.query(query, [pattern]);
  return res.status(200).json({ items: response.rows.map(mapSearchHit) });
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

  if (!response.rows.length) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.status(200).json({ item: mapProduct(response.rows[0]) });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, subCategory, shortDescription, description, price, unit, imageUrl, isFeatured } =
    req.validated.body;

  const query = `
    INSERT INTO products
      (name, category, sub_category, short_description, description, price, unit, image_url, is_featured)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const result = await pool.query(query, [
    name,
    category,
    subCategory,
    shortDescription,
    description,
    price,
    unit,
    imageUrl,
    isFeatured,
  ]);

  return res.status(201).json({
    message: "Product created successfully.",
    item: mapProduct(result.rows[0]),
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.validated.params;
  const payload = req.validated.body;

  const fields = [];
  const values = [];
  const keyMap = {
    name: "name",
    category: "category",
    subCategory: "sub_category",
    shortDescription: "short_description",
    description: "description",
    price: "price",
    unit: "unit",
    imageUrl: "image_url",
    isFeatured: "is_featured",
  };

  Object.entries(payload).forEach(([key, value]) => {
    values.push(value);
    fields.push(`${keyMap[key]} = $${values.length}`);
  });

  values.push(id);
  const query = `
    UPDATE products
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE id = $${values.length}
    RETURNING *
  `;
  const response = await pool.query(query, values);

  if (!response.rows.length) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.status(200).json({
    message: "Product updated successfully.",
    item: mapProduct(response.rows[0]),
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

  if (!response.rows.length) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.status(200).json({
    message: "Product deleted successfully.",
    item: mapProduct(response.rows[0]),
  });
});

module.exports = {
  getProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};