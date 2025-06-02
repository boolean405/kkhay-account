const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false, 
   handler: (req, res, next) => {
    res.status(429).json({
      con: false,
      msg: "Too many requests, please try again later!",
    });
  },
});


module.exports = rateLimiter;
