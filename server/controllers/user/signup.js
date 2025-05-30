const crypto = require("crypto");

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
    const hashedPassword = Encoder.hash(password);
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

    const verificationLink = `${process.env.SERVER_URL}/api/user/verify?token=${token}&email=${email}`;

    await sendEmail(
      email,
      "[KKhay Account] Verify your email",
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: #4a90e2;
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      .body {
        padding: 30px 20px;
        text-align: center;
        color: #333;
      }
      .button {
         display: inline-block;
         margin: 20px 0;
         padding: 15px 25px;
         font-size: 16px;
         background-color: #4a90e2;
         color: white !important;
         text-decoration: none !important;
         border-radius: 5px;
         font-weight: bold;
      }
      .footer {
        font-size: 12px;
        color: #aaa;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>
      <div class="body">
        <p>Thanks for signing up with <strong>KKhay Account</strong>!</p>
        <p>Please confirm your email address by clicking the button below:</p>
        <a href="${verificationLink}" class="button" target="_blank"
          >Verify Email</a
        >
        <p>
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
      <div class="footer">
        Copyright &copy; ${new Date().getFullYear()} KKhay Account. All rights reserved.
      </div>
    </div>
  </body>
</html>
`
    );

    resJson(res, 202, "Verification email sent.");
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

const verifyEmailTemplate = () => {
  return;
};

module.exports = signup;
