const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 1 * 1 * 1000, 
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
