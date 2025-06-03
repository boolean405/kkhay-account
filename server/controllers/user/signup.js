const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const UserDB = require("../../models/user");
const Encoder = require("../../utils/encoder");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");
const VerificationDB = require("../../models/verification");
const sendEmail = require("../../utils/sendEmail");

const signup = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    // Check if user already exist or not
    if (await UserDB.findOne({ email }))
      throw resError(409, "Email already exists!");
    if (await UserDB.findOne({ username }))
      throw resError(409, "Username already exists!");

    // Delete old verification
    if (await VerificationDB.findOne({ email }))
      await VerificationDB.deleteOne({ email });

    // Generate new token
    const token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = Encoder.encode(password);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Create new verification
    await VerificationDB.create({
      name,
      username,
      email,
      password: hashedPassword,
      token,
      expiresAt,
    });

    const verificationLink = `${process.env.SERVER_URL}/api/user/signupverify?token=${token}&email=${email}`;

    // Load the HTML file
    let htmlFile = fs.readFileSync(
      path.join(__dirname, "verifySignup.html"),
      "utf8"
    );
    htmlFile = htmlFile.replace("${verificationLink}", verificationLink);

    // Send Email
    await sendEmail(email, "[K Khay Account] Verify your email", htmlFile);

    resJson(res, 200, "Verification email sent.");
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = signup;
