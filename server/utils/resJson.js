const resJson = (res, status, msg, result) => {
  res.status(status).json({
    status: true,
    message,
    result,
  });
};

module.exports = resJson;
