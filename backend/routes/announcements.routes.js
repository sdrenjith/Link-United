const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const { getAnnouncements, addAnnouncement, updateAnnouncement, removeAnnouncement } = require("../controllers/announcements.controller");

router.get("/", getAnnouncements);
router.post("/", authMiddleware, requireRole(["admin"]), addAnnouncement);
router.put("/:id", authMiddleware, requireRole(["admin"]), updateAnnouncement);
router.delete("/:id", authMiddleware, requireRole(["admin"]), removeAnnouncement);

module.exports = router;
