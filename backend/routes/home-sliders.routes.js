const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const { getHomeSliders, addHomeSlider, removeHomeSlider } = require("../controllers/home-sliders.controller");

router.get("/", getHomeSliders);
router.post("/", authMiddleware, requireRole(["admin"]), addHomeSlider);
router.delete("/:id", authMiddleware, requireRole(["admin"]), removeHomeSlider);

module.exports = router;
