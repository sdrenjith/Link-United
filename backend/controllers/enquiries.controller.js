const pool = require("../config/db");
const asyncHandler = require("../utils/async-handler");
const { sendEnquiryEmail } = require("../services/email.service");

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

  const enquiry = result.rows[0];

  // Send emails (async - don't wait for it)
  sendEnquiryEmail({
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    company: enquiry.company,
    message: enquiry.message,
  });

  return res.status(201).json({
    message: "Enquiry submitted successfully.",
    item: mapEnquiry(enquiry),
  });
});

const getEnquiries = asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 200",
  );
  return res.status(200).json({ items: result.rows.map(mapEnquiry) });
});

module.exports = { createEnquiry, getEnquiries };
