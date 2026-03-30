const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate.middleware");
const { authMiddleware } = require("../middleware/auth.middleware");
const { login, me, changePassword } = require("../controllers/auth.controller");
const { loginSchema, changePasswordSchema } = require("../validators/auth.validator");

router.post("/login", validate(loginSchema), login);
router.get("/me", authMiddleware, me);
router.post("/change-password", authMiddleware, validate(changePasswordSchema), changePassword);

module.exports = router;