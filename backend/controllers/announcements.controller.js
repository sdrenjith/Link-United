const pool = require("../config/db");
const asyncHandler = require("../utils/async-handler");

const getAnnouncements = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM announcements ORDER BY order_index ASC, created_at DESC";
  const result = await pool.query(query);
  
  const items = result.rows.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    isActive: row.is_active,
    orderIndex: row.order_index,
    createdAt: row.created_at
  }));

  return res.status(200).json({ items });
});

const addAnnouncement = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, isActive, orderIndex } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: "title is required." });
  }

  const result = await pool.query(
    "INSERT INTO announcements (title, description, image_url, is_active, order_index) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, description || "", imageUrl || "", isActive !== undefined ? isActive : true, orderIndex || 0]
  );

  const row = result.rows[0];
  return res.status(201).json({
    message: "Announcement added.",
    item: {
      id: row.id,
      title: row.title,
      description: row.description,
      imageUrl: row.image_url,
      isActive: row.is_active,
      orderIndex: row.order_index,
      createdAt: row.created_at
    }
  });
});

const updateAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, isActive, orderIndex } = req.body;
  
  // Minimal dynamic update logic
  const result = await pool.query(
    `UPDATE announcements 
     SET title = COALESCE($1, title), 
         description = COALESCE($2, description), 
         image_url = COALESCE($3, image_url), 
         is_active = COALESCE($4, is_active),
         order_index = COALESCE($5, order_index)
     WHERE id = $6 RETURNING *`,
    [title, description, imageUrl, isActive, orderIndex, id]
  );

  if (!result.rows.length) {
    return res.status(404).json({ message: "Announcement not found." });
  }

  const row = result.rows[0];
  return res.status(200).json({
    message: "Announcement updated.",
    item: {
      id: row.id,
      title: row.title,
      description: row.description,
      imageUrl: row.image_url,
      isActive: row.is_active,
      orderIndex: row.order_index,
      createdAt: row.created_at
    }
  });
});

const removeAnnouncement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM announcements WHERE id = $1 RETURNING *", [id]);
  
  if (!result.rows.length) {
    return res.status(404).json({ message: "Announcement not found." });
  }

  return res.status(200).json({ message: "Announcement removed." });
});

module.exports = {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement
};
