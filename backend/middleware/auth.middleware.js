const jwt = require("jsonwebtoken");
const env = require("../config/env");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing." });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const requireRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Insufficient permissions." });
  }
  return next();
};

module.exports = { authMiddleware, requireRole };