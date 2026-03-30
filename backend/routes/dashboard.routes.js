const express = require("express");
const validate = require("../middleware/validate.middleware");
const { getDashboardStats } = require("../controllers/dashboard.controller");
const { changePassword } = require("../controllers/auth.controller");
const { changePasswordSchema } = require("../validators/auth.validator");
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/stats", authMiddleware, requireRole(["admin"]), getDashboardStats);
router.post(
  "/change-password",
  authMiddleware,
  requireRole(["admin"]),
  validate(changePasswordSchema),
  changePassword,
);

module.exports = router;
