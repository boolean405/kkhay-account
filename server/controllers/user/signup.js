const UserDB = require("../../models/user");
const Encoder = require("../../utils/encoder");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const signup = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    const existEmail = await UserDB.findOne({ email });
    if (existEmail) throw resError(409, "Email already exists!");

    const existUsername = await UserDB.findOne({ username });
    if (existUsername) throw resError(409, "Username already exists!");

    const encodedPassword = Encoder.encode(password);
    const newUser = await UserDB.create({
      name,
      username,
      email,
      password: encodedPassword,
    });

    const user = await UserDB.findById(newUser._id).select("-password");
    resJson(res, 201, "Success signup.", user);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = signup;
