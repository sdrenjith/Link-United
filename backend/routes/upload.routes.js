const express = require("express");
const router = express.Router();
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { uploadImage } = require("../controllers/upload.controller");

// A unified endpoint for uploading image assets
// Clients can send a file under the "image" field. The middleware's req.baseUrl will be "/api/v1/upload"
// Wait, my middleware logic checks `req.baseUrl`. Let's pass a custom header or query param instead.
// I will adjust the middleware to check `req.query.type`.

router.post("/", authMiddleware, requireRole(["admin"]), upload.single("image"), uploadImage);

module.exports = router;
