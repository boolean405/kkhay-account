const UserDB = require("../../models/userModel");
const PictureDB = require("../../models/pictureModel");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const deleteAccount = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await UserDB.findById(userId);
    if (!user) throw resError(404, "User not found!");

    await UserDB.findByIdAndDelete(user._id);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    await PictureDB.findByIdAndDelete(user.picture);

    resJson(res, 200, "Success delete account.");
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = deleteAccount;
