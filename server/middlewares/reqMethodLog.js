const reqMethodLog = (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log([req.method, fullUrl]);
  next();
};

module.exports = reqMethodLog;
