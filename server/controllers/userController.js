const UserDB = require("../models/userModel");
const Encoder = require("../utils/encoder");
const resJson = require("../utils/resJson");
const Token = require("../utils/token");

const signup = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const existEmail = await UserDB.findOne({ email });
  if (existEmail) {
    console.log("here");

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
    resJson(res, 200, "Success signin", user);
  } catch (error) {
    return next(new Error(error));
  }
};

module.exports = { signup, signin };
