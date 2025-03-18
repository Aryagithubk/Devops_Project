// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Set default status code and message if not provided
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || "An unexpected error occurred";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    // Additional details for development environments
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
