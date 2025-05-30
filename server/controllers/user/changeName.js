const UserDB = require("../../models/user");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const changeName = async (req, res, next) => {
  const userId = req.userId;
  const name = req.body.name;

  try {
    const user = await UserDB.findById(userId);
    if (!user) throw resError(404, "User not found!");

    await UserDB.findByIdAndUpdate(user._id, {
      name,
    });

    const updatedUser = await UserDB.findById(user._id).select("-password");

    resJson(res, 200, "Success changed name.", updatedUser);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = changeName;
