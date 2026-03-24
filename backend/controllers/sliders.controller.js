const pool = require("../config/db");
const asyncHandler = require("../utils/async-handler");

const getSliders = asyncHandler(async (req, res) => {
  const { categoryNumber } = req.query;
  const params = [];
  let query = "SELECT * FROM product_sliders";

  if (categoryNumber) {
    params.push(categoryNumber);
    query += " WHERE category_number = $1";
  }

  query += " ORDER BY order_index ASC, created_at DESC";
  
  const result = await pool.query(query, params);
  
  const items = result.rows.map(row => ({
    id: row.id,
    categoryNumber: row.category_number,
    imageUrl: row.image_url,
    orderIndex: row.order_index,
    createdAt: row.created_at
  }));

  return res.status(200).json({ items });
});

const addSliderImage = asyncHandler(async (req, res) => {
  const { categoryNumber, imageUrl, orderIndex } = req.body;
  
  if (!categoryNumber || !imageUrl) {
    return res.status(400).json({ message: "categoryNumber and imageUrl are required." });
  }

  const result = await pool.query(
    "INSERT INTO product_sliders (category_number, image_url, order_index) VALUES ($1, $2, $3) RETURNING *",
    [categoryNumber, imageUrl, orderIndex || 0]
  );

  const row = result.rows[0];
  return res.status(201).json({
    message: "Slider image added.",
    item: {
      id: row.id,
      categoryNumber: row.category_number,
      imageUrl: row.image_url,
      orderIndex: row.order_index,
      createdAt: row.created_at
    }
  });
});

const removeSliderImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM product_sliders WHERE id = $1 RETURNING *", [id]);
  
  if (!result.rows.length) {
    return res.status(404).json({ message: "Slider image not found." });
  }

  return res.status(200).json({ message: "Slider image removed." });
});

const reorderSliders = asyncHandler(async (req, res) => {
  // Expected payload: { items: [{ id: 1, orderIndex: 0 }, { id: 2, orderIndex: 1 }] }
  const { items } = req.body;
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid payload format." });
  }

  // Update in a transaction
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const item of items) {
      await client.query("UPDATE product_sliders SET order_index = $1 WHERE id = $2", [item.orderIndex, item.id]);
    }
    await client.query("COMMIT");
    return res.status(200).json({ message: "Reordered successfully." });
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
});

module.exports = {
  getSliders,
  addSliderImage,
  removeSliderImage,
  reorderSliders
};
