const UserDB = require("../../models/userModel");
const Encoder = require("../../utils/encoder");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const editProfile = async (req, res, next) => {
  const userId = req.userId;
  const { name, username, email, password } = req.body;

  try {
    const user = await UserDB.findById(userId);
    if (!user) throw resError(404, "User not found!");

    // Password Encryption
    const encodedPassword = Encoder.encode(password);
    await UserDB.findByIdAndUpdate(user._id, {
      name,
      username,
      email,
      password: encodedPassword,
    });

    const updatedUser = await UserDB.findById(user._id).select("-password");

    resJson(res, 200, "Success edit profile.", updatedUser);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = editProfile;
