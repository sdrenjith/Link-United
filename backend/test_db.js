const pool = require("./config/db");
pool.query("SELECT * FROM product_sliders").then(res => {
  console.log(JSON.stringify(res.rows, null, 2));
  process.exit(0);
}).catch(console.error);
