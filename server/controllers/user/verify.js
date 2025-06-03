const fs = require("fs");
const path = require("path");

const UserDB = require("../../models/user");
const VerificationDB = require("../../models/verification");
const resJson = require("../../utils/resJson");

const verify = async (req, res, next) => {
  const { email, code } = req.body;

  try {
    if (!(await VerificationDB.findOne({ email }))) {
      throw resError(400, "Invalid email!");
    }

    const record = await VerificationDB.findOne({ code });
    if (!record) {
      throw resError(400, "Invalid verification code!");
    }

    if (record.expiresAt < new Date()) {
      throw resError(410, "Expired verification code!");
    }

    const newUser = await UserDB.create({
      name: record.name,
      username: record.username,
      email: record.email,
      password: record.password,
    });

    const refreshToken = Token.makeRefreshToken({
      id: newUser._id.toString(),
    });
    const accessToken = Token.makeAccessToken({
      id: newUser._id.toString(),
    });

    await UserDB.findByIdAndUpdate(newUser._id, {
      refreshToken,
      accessToken,
    });

    const isLocalhost =
      req.hostname === "localhost" || req.hostname === "127.0.0.1";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: !isLocalhost,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    await VerificationDB.findByIdAndDelete(record._id);
    const user = await UserDB.findById(newUser._id).select("-password");

    resJson(res, 200, "Success signup.", user);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = verify;
