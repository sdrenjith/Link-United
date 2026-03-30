const pool = require("../config/db");
const asyncHandler = require("../utils/async-handler");

const mapMedia = (row) => ({
  id: row.id,
  title: row.title,
  summary: row.summary,
  content: row.content,
  imageUrl: row.image_url,
  publishedAt: row.published_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const getMediaPosts = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM media_posts ORDER BY published_at DESC, created_at DESC");
  return res.status(200).json({ items: result.rows.map(mapMedia) });
});

const createMediaPost = asyncHandler(async (req, res) => {
  const { title, summary, content, imageUrl, publishedAt } = req.validated.body;
  const result = await pool.query(
    `
      INSERT INTO media_posts (title, summary, content, image_url, published_at)
      VALUES ($1, $2, $3, $4, COALESCE($5::timestamptz, NOW()))
      RETURNING *
    `,
    [title, summary ?? "", content ?? "", imageUrl, publishedAt || null],
  );

  return res.status(201).json({
    message: "Media post created successfully.",
    item: mapMedia(result.rows[0]),
  });
});

const updateMediaPost = asyncHandler(async (req, res) => {
  const { id } = req.validated.params;
  const payload = req.validated.body;
  const keyMap = {
    title: "title",
    summary: "summary",
    content: "content",
    imageUrl: "image_url",
    publishedAt: "published_at",
  };

  const fields = [];
  const values = [];
  Object.entries(payload).forEach(([key, value]) => {
    values.push(value);
    fields.push(`${keyMap[key]} = $${values.length}`);
  });

  values.push(id);
  const query = `
    UPDATE media_posts
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE id = $${values.length}
    RETURNING *
  `;
  const result = await pool.query(query, values);

  if (!result.rows.length) {
    return res.status(404).json({ message: "Media post not found." });
  }

  return res.status(200).json({
    message: "Media post updated successfully.",
    item: mapMedia(result.rows[0]),
  });
});

const deleteMediaPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM media_posts WHERE id = $1 RETURNING *", [id]);

  if (!result.rows.length) {
    return res.status(404).json({ message: "Media post not found." });
  }

  return res.status(200).json({
    message: "Media post deleted successfully.",
    item: mapMedia(result.rows[0]),
  });
});

module.exports = { getMediaPosts, createMediaPost, updateMediaPost, deleteMediaPost };
