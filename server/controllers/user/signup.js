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
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // e.g. "482391"
    const hashedPassword = Encoder.encode(password);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Create new verification
    await VerificationDB.create({
      name,
      username,
      email,
      password: hashedPassword,
      code,
      expiresAt,
    });

    // Load the HTML file
    let htmlFile = fs.readFileSync(
      path.join(__dirname, "../../assets/html/verifySignup.html"),
      "utf8"
    );

    htmlFile = htmlFile.replace("{verificationCode}", code);
    htmlFile = htmlFile.replace(
      "{logoImage}",
      `${process.env.SERVER_URL}/image/logo`
    );

    // Send Email
    await sendEmail(email, "[K Khay Account] Verify Your Account", htmlFile);

    resJson(res, 200, "Verification code email sent.");
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = signup;
