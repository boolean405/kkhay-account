const UserDB = require("../../models/user");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const changeUsername = async (req, res, next) => {
  const userId = req.userId;
  const username = req.body.username;

  try {
    const user = await UserDB.findById(userId);
    if (!user) throw resError(404, "User not found!");

    if (await UserDB.findOne({ username }))
      throw resError(409, "Username already exist!");

    await UserDB.findByIdAndUpdate(user._id, {
      username,
    });

    const updatedUser = await UserDB.findById(user._id).select("-password");

    resJson(res, 200, "Success changed username.", updatedUser);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = changeUsername;
