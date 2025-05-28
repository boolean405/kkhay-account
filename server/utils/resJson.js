const resJson = (res, status, msg, result) => {
  res.status(status).json({
    con: true,
    msg,
    result,
  });
};

module.exports = resJson;
