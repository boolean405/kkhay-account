const UserDB = require("../../models/user");
const resJson = require("../../utils/resJson");

const signout = async (req, res, next) => {
  const decodedId = req.decodedId;

  try {
    const user = await UserDB.findById(decodedId);
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return resJson(res, 204);
    }
    await UserDB.findByIdAndUpdate(user._id, {
      refreshToken: "",
      accessToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    resJson(res, 200, "Success signout.");
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = signout;
