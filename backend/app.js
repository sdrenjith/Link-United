const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("./config/env");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.route");
const mediaRoutes = require("./routes/media.routes");
const enquiriesRoutes = require("./routes/enquiries.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const uploadRoutes = require("./routes/upload.routes");
const slidersRoutes = require("./routes/sliders.routes");
const homeSlidersRoutes = require('./routes/home-sliders.routes');
const announcementsRoutes = require('./routes/announcements.routes');
const { notFoundMiddleware, errorMiddleware } = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "link-united-api",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/enquiries", enquiriesRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/sliders", slidersRoutes);
app.use("/api/v1/home-sliders", homeSlidersRoutes);
app.use("/api/v1/announcements", announcementsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
