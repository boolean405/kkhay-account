const UserDB = require("../../models/user");
const Encoder = require("../../utils/encoder");
const resJson = require("../../utils/resJson");
const Token = require("../../utils/token");
const resError = require("../../utils/resError");

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existUser = await UserDB.findOne({ email });
    if (!existUser) throw resError(404, "User not found!");

    const correctPassword = Encoder.compare(password, existUser.password);
    if (!correctPassword) throw resError(401, "Incorrect password!");

    const refreshToken = Token.makeRefreshToken({
      id: existUser._id.toString(),
    });
    const accessToken = Token.makeAccessToken({
      id: existUser._id.toString(),
    });

    await UserDB.findByIdAndUpdate(existUser._id, {
      refreshToken,
      accessToken,
    });

    const user = await UserDB.findById(existUser._id).select("-password");

    const isLocalhost =
      req.hostname === "localhost" || req.hostname === "127.0.0.1";

    res.cookie("refreshToken", refreshToken, { 
      httpOnly: true,
      sameSite: "None",
      secure: !isLocalhost,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    resJson(res, 200, "Success signin.", user);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = signin;
