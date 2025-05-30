const UserDB = require("../../models/user");
const PictureDB = require("../../models/picture");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");
const Encoder = require("../../utils/encoder");

const deleteAccount = async (req, res, next) => {
  const userId = req.userId;
  const password = req.body.password;

  try {
    const user = await UserDB.findById(userId);
    if (!user) throw resError(404, "User not found!");

    if (!Encoder.compare(password, user.password))
      throw resError(401, "Incorrect password to delete account!");

    await UserDB.findByIdAndDelete(user._id);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    await PictureDB.findByIdAndDelete(user.picture);

    resJson(res, 200, "Success deleted account.");
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = deleteAccount;
