const fs = require("fs");
const path = require("path");

const UserDB = require("../../models/user");
const VerificationDB = require("../../models/verification");
const resError = require("../../utils/resError");

const signupVerify = async (req, res, next) => {
  const { token, email } = req.query;

  try {
    const record = await VerificationDB.findOne({ email, token });

    if (!record) throw resError(400, "Invalid or expired verification link!");
    if (record.expiresAt < new Date())
      throw resError(401, "Verification process expired!");

    await UserDB.create({
      name: record.name,
      username: record.username,
      email: record.email,
      password: record.password,
    });

    await VerificationDB.findByIdAndDelete(record._id);

    // Load the HTML file
    let htmlFile = fs.readFileSync(
      path.join(__dirname, "signupVerified.html"),
      "utf8"
    );

    res.send(htmlFile);
  } catch (error) {
    next(error);
  }
};

module.exports = signupVerify;
