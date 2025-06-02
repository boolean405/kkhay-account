const mongoose = require("mongoose");
const { Schema } = mongoose;

const PictureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url:{
      type: String,
      required: true,
      default: `${process.env.SERVER_URL}/api/user}`
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contentType: {
      type: String,
    },
    data: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("picture", PictureSchema);
