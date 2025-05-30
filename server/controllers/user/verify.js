// controllers/user/verifyEmail.js
const UserDB = require("../../models/user");
const VerificationDB = require("../../models/verification");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const verify = async (req, res, next) => {
  const { token, email } = req.query;

  try {
    const record = await VerificationDB.findOne({ email, token });

    if (!record) throw resError(400, "Invalid or expired verification link!");
    if (record.expiresAt < new Date())
      throw resError(401, "Verification process expired!");

    const user = await UserDB.create({
      name: record.name,
      username: record.username,
      email: record.email,
      password: record.password,
    });

    await VerificationDB.findByIdAndDelete(record._id);

    resJson(res, 201, "Email verified and success account signup.", user);
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
