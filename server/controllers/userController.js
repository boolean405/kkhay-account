const UserDB = require("../models/userModel");
const Encoder = require("../utils/encoder");
const resJson = require("../utils/resJson");
const Token = require("../utils/token");

const signup = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const existEmail = await UserDB.findOne({ email });
  if (existEmail) {
    const error = new Error("Email already exist!");
    error.status = 409;
    return next(new Error("Email already exist!"));
  }

  const existUsername = await UserDB.findOne({ username });
  if (existUsername) {
    const error = new Error("Username already exist!");
    error.status = 409;
    return next(error);
  }

  // Password Encryption
  const encodedPassword = Encoder.encode(password);
  try {
    const newUser = await UserDB.create({
      name: name,
      username: username,
      email: email,
      password: encodedPassword,
    });

    const user = await UserDB.findById(newUser._id).select("-password");
    resJson(res, 201, "Success signup.", user);
  } catch (err) {
    return next(new Error(err));
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await UserDB.findOne({ email });
  if (!existUser) {
    const error = new Error("User not found!");
    error.status = 404;
    return next(error);
  }

  const correctPassword = Encoder.compare(password, existUser.password);
  if (!correctPassword) {
    const error = new Error("Incorrect password!");
    error.status = 401;
    return next(error);
  }

  const refreshToken = Token.makeRefreshToken({
    id: existUser._id.toString(),
  });
  const accessToken = Token.makeAccessToken({
    id: existUser._id.toString(),
  });

  try {
    await UserDB.findByIdAndUpdate(existUser._id, {
      refreshToken,
      accessToken,
    });

    const user = await UserDB.findById(existUser._id).select(
      "-password -refreshToken"
    );
    const isLocalhost =
      req.hostname === "localhost" || req.hostname === "127.0.0.1";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: !isLocalhost,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    resJson(res, 200, "Success signin", user);
  } catch (error) {
    return next(new Error(error));
  }
};

const profile = async (req, res, next) => {
  const userId = req.userId;
  const user = await UserDB.findById(userId).select("-password -refreshToken");
  resJson(res, 200, "Success get profile", user);
};

const refresh = async (req, res, next) => {
  const decodedId = req.decodedId;

  const accessToken = Token.makeAccessToken({
    id: decodedId.toString(),
  });

  try {
    await UserDB.findByIdAndUpdate(decodedId, {
      accessToken,
    });

    const user = await UserDB.findById(decodedId).select(
      "-password -refreshToken"
    );
    resJson(res, 200, "Success refresh", user);
  } catch (error) {
    return next(new Error(error));
  }
};

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
      return next(resJson(res, 204));
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
    resJson(res, 200, "Success signout");
  } catch (error) {
    return next(new Error(error));
  }
};

const edit = async (req, res, next) => {
  const userId = req.userId;
  const { name, username, email, password } = req.body;
  try {
    await UserDB.findByIdAndUpdate(userId, {
      name,
      username,
      email,
      password,
    });
    const user = await UserDB.findById(userId).select(
      "-password -refreshToken"
    );
    resJson(res, 200, "Success edit profile", user);
  } catch (error) {
    return next(new Error(error));
  }
};

module.exports = { signup, signin, profile, refresh, signout, edit };
