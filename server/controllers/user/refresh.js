const UserDB = require("../../models/user");
const resJson = require("../../utils/resJson");
const Token = require("../../utils/token");
const resError = require("../../utils/resError");

const refresh = async (req, res, next) => {
  const decodedId = req.decodedId;

  try {
    const accessToken = Token.makeAccessToken({
      id: decodedId.toString(),
    });

    const user = await UserDB.findById(decodedId);
    if (!user) throw resError(404, "User not found!");

    await UserDB.findByIdAndUpdate(user._id, { accessToken });
    const updatedUser = await UserDB.findById(user._id).select("-password");

    resJson(res, 200, "Success refresh.", updatedUser);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = refresh;
