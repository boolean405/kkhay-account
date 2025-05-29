const baseOrigins = ["http://localhost:4000", "http://127.0.0.1:4000"];

// Parse additional origins from .env
const extraOrigins = process.env.EXTRA_ALLOWED_ORIGINS
  ? process.env.EXTRA_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

// Merge and remove duplicates
const allowedOrigins = [...new Set([...baseOrigins, ...extraOrigins])];

module.exports = allowedOrigins;
