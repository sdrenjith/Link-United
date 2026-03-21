const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5002),
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "change-this-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
};

module.exports = env;
