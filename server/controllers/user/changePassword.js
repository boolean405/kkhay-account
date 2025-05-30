const UserDB = require("../../models/user");
const Encoder = require("../../utils/encoder");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const changePassword = async (req, res, next) => {
  const userId = req.userId;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await UserDB.findById(userId);
    if (!user) throw resError(404, "User not found!");

    if (!Encoder.compare(oldPassword, user.password))
      throw resError(401, "Incorrect old password!");

    // Password Encryption
    const newHashedPassword = Encoder.encode(newPassword);
    await UserDB.findByIdAndUpdate(user._id, {
      password: newHashedPassword,
    });

    const updatedUser = await UserDB.findById(user._id).select("-password");

    resJson(res, 200, "Success changed password.", updatedUser);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = changePassword;
