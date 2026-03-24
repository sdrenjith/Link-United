const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Resolve the absolute path to the frontend's public directory
const FRONTEND_PUBLIC_DIR = path.resolve(__dirname, "../../frontend/public");

// Dynamic Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine subdirectory based on the 'type' query parameter
    // E.g., /api/v1/upload?type=products -> saves to /images/products
    const validTypes = ["products", "media", "sliders", "general", "home-sliders", "announcements"];
    const requestedType = req.query.type;
    const subDir = validTypes.includes(requestedType) ? requestedType : "others";

    const uploadPath = path.join(FRONTEND_PUBLIC_DIR, "images", subDir);

    // Ensure the directories exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a clean filename: timestamp-originalName
    // Strip spaces and special characters from original name for safety
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "-").toLowerCase();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${cleanName}`);
  },
});

// File filter to restrict uploads to images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file limit
  },
  fileFilter,
});

module.exports = upload;
