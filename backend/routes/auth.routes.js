const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");

const { login } = require("../controllers/auth.controller");

router.post("/login", login);

router.get("/me", authMiddleware, async (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;