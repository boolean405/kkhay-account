const notFoundHandler = (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  res.status(404).json({
    con: false,
    msg: `Url not found - ${fullUrl}`,
  });
};

module.exports = notFoundHandler;
