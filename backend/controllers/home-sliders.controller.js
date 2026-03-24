const pool = require("../config/db");
const asyncHandler = require("../utils/async-handler");

const getHomeSliders = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM home_sliders ORDER BY order_index ASC, created_at DESC";
  const result = await pool.query(query);
  
  const items = result.rows.map(row => ({
    id: row.id,
    imageUrl: row.image_url,
    orderIndex: row.order_index,
    createdAt: row.created_at
  }));

  return res.status(200).json({ items });
});

const addHomeSlider = asyncHandler(async (req, res) => {
  const { imageUrl, orderIndex } = req.body;
  
  if (!imageUrl) {
    return res.status(400).json({ message: "imageUrl is required." });
  }

  const result = await pool.query(
    "INSERT INTO home_sliders (image_url, order_index) VALUES ($1, $2) RETURNING *",
    [imageUrl, orderIndex || 0]
  );

  const row = result.rows[0];
  return res.status(201).json({
    message: "Home slider image added.",
    item: {
      id: row.id,
      imageUrl: row.image_url,
      orderIndex: row.order_index,
      createdAt: row.created_at
    }
  });
});

const removeHomeSlider = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM home_sliders WHERE id = $1 RETURNING *", [id]);
  
  if (!result.rows.length) {
    return res.status(404).json({ message: "Home slider image not found." });
  }

  return res.status(200).json({ message: "Home slider image removed." });
});

module.exports = {
  getHomeSliders,
  addHomeSlider,
  removeHomeSlider
};
