const env = require("./config/env");
const app = require("./app");
const pool = require("./config/db");

const startServer = async () => {
  try {
    await pool.query("SELECT 1");
    app.listen(env.port, () => {
      console.log(`API listening on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();

