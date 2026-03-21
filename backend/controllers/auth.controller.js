const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const env = require("../config/env");
const asyncHandler = require("../utils/async-handler");

const isPasswordValid = async (plainPassword, storedPassword) => {
  // Backward compatibility for any legacy plain-text records.
  if (plainPassword === storedPassword) {
    return true;
  }
  return bcrypt.compare(plainPassword, storedPassword);
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;

  const query = "SELECT * FROM users WHERE email = $1 LIMIT 1";
  const result = await pool.query(query, [email.toLowerCase()]);
  const user = result.rows[0];
  const fullName = user?.full_name || user?.name || "Administrator";
  const role = user?.role || "admin";

  if (!user || !(await isPasswordValid(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email, role, fullName },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );

  return res.status(200).json({
    message: "Login successful.",
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName,
      role,
    },
  });
});

const me = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1 LIMIT 1", [req.user.sub]);
  const user = result.rows[0];

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name || user.name || "Administrator",
      role: user.role || "admin",
    },
  });
});

module.exports = { login, me };
