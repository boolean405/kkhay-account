const mongoose = require("mongoose");
const { Schema } = mongoose;

const VerificationSchema = new Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    code: { type: String, require: true },
    expiresAt: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("verification", VerificationSchema);
