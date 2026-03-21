const pool = require("../config/db");
const asyncHandler = require("../utils/async-handler");

const getDashboardStats = asyncHandler(async (req, res) => {
  const [productStats, mediaStats, enquiryStats] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS count FROM products"),
    pool.query("SELECT COUNT(*)::int AS count FROM media_posts"),
    pool.query("SELECT COUNT(*)::int AS count FROM enquiries"),
  ]);

  return res.status(200).json({
    stats: {
      products: productStats.rows[0].count,
      mediaPosts: mediaStats.rows[0].count,
      enquiries: enquiryStats.rows[0].count,
    },
  });
});

module.exports = { getDashboardStats };
