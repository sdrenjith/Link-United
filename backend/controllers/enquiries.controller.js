const pool = require("../config/db");
const asyncHandler = require("../utils/async-handler");

const mapEnquiry = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  company: row.company,
  message: row.message,
  status: row.status,
  createdAt: row.created_at,
});

const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, company, message } = req.validated.body;
  const result = await pool.query(
    `
      INSERT INTO enquiries (name, email, phone, company, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [name, email, phone, company, message],
  );

  return res.status(201).json({
    message: "Enquiry submitted successfully.",
    item: mapEnquiry(result.rows[0]),
  });
});

const getEnquiries = asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 200",
  );
  return res.status(200).json({ items: result.rows.map(mapEnquiry) });
});

module.exports = { createEnquiry, getEnquiries };
