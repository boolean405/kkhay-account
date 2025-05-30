const UserDB = require("../../models/user");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const getUserDetails = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await UserDB.findById(userId).select("-password");
    if (!user) throw resError(404, "User not found!");

    resJson(res, 200, "Success get user details.", user);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = getUserDetails;
