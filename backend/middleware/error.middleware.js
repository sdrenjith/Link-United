const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === "production";

  if (statusCode >= 500) {
    console.error("Unhandled server error:", err);
  }

  res.status(statusCode).json({
    message: err.message || "Unexpected server error.",
    ...(isProd ? {} : { stack: err.stack }),
  });
};

const notFoundMiddleware = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

module.exports = { errorMiddleware, notFoundMiddleware };
