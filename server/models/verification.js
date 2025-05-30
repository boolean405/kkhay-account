// models/verificationToken.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const VerificationSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Verification", VerificationSchema);
