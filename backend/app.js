const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Link united api initiated");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
module.exports = app;
