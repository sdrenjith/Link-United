const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate.middleware");
const { authMiddleware } = require("../middleware/auth.middleware");
const { login, me } = require("../controllers/auth.controller");
const { loginSchema } = require("../validators/auth.validator");

router.post("/login", validate(loginSchema), login);
router.get("/me", authMiddleware, me);

module.exports = router;