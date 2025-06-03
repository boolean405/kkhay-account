const notFoundHandler = (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  res.status(404).json({
    status: false,
    message: `Url not found - ${fullUrl}`,
  });
};

module.exports = notFoundHandler;
