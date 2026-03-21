const express = require("express");
const { getDashboardStats } = require("../controllers/dashboard.controller");
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/stats", authMiddleware, requireRole(["admin"]), getDashboardStats);

module.exports = router;
