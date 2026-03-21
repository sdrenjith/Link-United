const { Pool } = require("pg");

const toStringEnv = (value, fallback = "") =>
  typeof value === "string" ? value : fallback;
const dbPassword = toStringEnv(process.env.DB_PASSWORD).trim();

if (!dbPassword) {
  throw new Error(
    "DB_PASSWORD is missing. Create backend/.env and set DB_PASSWORD to your PostgreSQL user password.",
  );
}

const pool = new Pool({
  host: toStringEnv(process.env.DB_HOST, "localhost"),
  port: Number(process.env.DB_PORT || 5432),
  user: toStringEnv(process.env.DB_USER, "postgres"),
  password: dbPassword,
  database: toStringEnv(process.env.DB_NAME, "link_united"),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

module.exports = pool;