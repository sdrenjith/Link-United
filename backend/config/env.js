const dotenv = require("dotenv");

dotenv.config();

const parseCorsOrigin = (raw) => {
  if (typeof raw !== "string" || !raw.trim()) {
    return "http://localhost:5173";
  }
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.length === 0) return "http://localhost:5173";
  if (list.length === 1) return list[0];
  return list;
};

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5002),
  corsOrigin: parseCorsOrigin(process.env.CORS_ORIGIN),
  jwtSecret: process.env.JWT_SECRET || "change-this-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
};

module.exports = env;
