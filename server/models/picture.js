const mongoose = require("mongoose");
const { Schema } = mongoose;

const pictureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
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

module.exports = mongoose.model("picture", pictureSchema);
