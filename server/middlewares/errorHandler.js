const errorHandler = (err, req, res, next) => {
  // console.error(err.stack)
  res.status(err.status || 500).json({
    con: false,
    msg: err.message,
  });
};

module.exports = errorHandler;
