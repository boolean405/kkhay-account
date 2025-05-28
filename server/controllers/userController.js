const UserDB = require("../models/userModel");
const Encoder = require("../utils/encoder");
const resJson = require("../utils/resJson");

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
    const err = new Error("Username already exist!");
    err.status = 409;
    return next(err);
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
    resJson(res, 201, "Success signup", user);
  } catch (err) {
    return next(new Error(err));
  }
};

module.exports = { signup };
