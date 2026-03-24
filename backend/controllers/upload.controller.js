const asyncHandler = require("../utils/async-handler");

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided." });
  }

  // The file is saved in frontend/public/images/subDir/filename
  // We need to return the accessible public URL path
  const type = req.query.type || "others"; // 'products', 'media', 'sliders', etc.
  const imageUrl = `/images/${type}/${req.file.filename}`;

  return res.status(200).json({
    message: "Image uploaded successfully",
    url: imageUrl,
  });
});

module.exports = {
  uploadImage,
};
