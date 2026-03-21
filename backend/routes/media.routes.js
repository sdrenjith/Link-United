const express = require("express");
const {
  getMediaPosts,
  createMediaPost,
  updateMediaPost,
  deleteMediaPost,
} = require("../controllers/media.controller");
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createMediaSchema, updateMediaSchema } = require("../validators/media.validator");

const router = express.Router();

router.get("/", getMediaPosts);
router.post("/", authMiddleware, requireRole(["admin"]), validate(createMediaSchema), createMediaPost);
router.put("/:id", authMiddleware, requireRole(["admin"]), validate(updateMediaSchema), updateMediaPost);
router.delete("/:id", authMiddleware, requireRole(["admin"]), deleteMediaPost);

module.exports = router;
