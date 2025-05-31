const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 30 * 1 * 1000, 
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
