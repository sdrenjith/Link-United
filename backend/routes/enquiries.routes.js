const express = require("express");
const { createEnquiry, getEnquiries } = require("../controllers/enquiries.controller");
const { authMiddleware, requireRole } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createEnquirySchema } = require("../validators/enquiry.validator");

const router = express.Router();

router.post("/", validate(createEnquirySchema), createEnquiry);
router.get("/", authMiddleware, requireRole(["admin"]), getEnquiries);

module.exports = router;
