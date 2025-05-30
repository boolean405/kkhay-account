const fs = require("fs");
const path = require("path");

const UserDB = require("../../models/user");
const VerificationDB = require("../../models/verification");

const signupVerify = async (req, res, next) => {
  const { token, email } = req.query;

  try {
    const record = await VerificationDB.findOne({ email, token });

    if (!record || record.expiresAt < new Date()) {
      const failSignup = fs.readFileSync(
        path.join(__dirname, "failSignup.html"),
        "utf8"
      );
      return res.send(failSignup);
    }

    await UserDB.create({
      name: record.name,
      username: record.username,
      email: record.email,
      password: record.password,
    });

    await VerificationDB.findByIdAndDelete(record._id);

    // Load the HTML file
    const successSignup = fs.readFileSync(
      path.join(__dirname, "successSignup.html"),
      "utf8"
    );

    res.send(successSignup);
  } catch (error) {
    next(error);
  }
};

module.exports = signupVerify;
