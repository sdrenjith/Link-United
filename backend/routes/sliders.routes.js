const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const { getSliders, addSliderImage, removeSliderImage, reorderSliders } = require("../controllers/sliders.controller");

router.get("/", getSliders);
router.post("/", authMiddleware, requireRole(["admin"]), addSliderImage);
router.put("/reorder", authMiddleware, requireRole(["admin"]), reorderSliders);
router.delete("/:id", authMiddleware, requireRole(["admin"]), removeSliderImage);

module.exports = router;
