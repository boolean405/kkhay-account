const sharp = require("sharp");

const UserDB = require("../../models/user");
const PictureDB = require("../../models/picture");
const resJson = require("../../utils/resJson");
const resError = require("../../utils/resError");

const uploadPicture = async (req, res, next) => {
  const userId = req.userId;
  const picture = req.files.picture;

  try {
    const user = await UserDB.findById(userId);
    if (!user) throw resError(404, "User not found!");
    if (!picture) throw resError(400, "Picture is required!");

    const picName = "picture_" + Date.now() + ".jpg";
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const extension = picture.name.substring(picture.name.lastIndexOf("."));

    if (!allowedExtensions.includes(extension))
      throw resError(400, "Only .jpg and .png files are allowed!");

    const compressedBuffer = await sharp(picture.data)
      .resize({ width: 1024, withoutEnlargement: true })
      .jpeg({ quality: 80 }) // or .png({ quality: 80 }) if keeping PNG
      .toBuffer();

    if (user.picture) await PictureDB.findByIdAndDelete(user.picture);

    const newPicture = await PictureDB.create({
      name: picName,
      user: user._id,
      contentType: "image/jpeg",
      data: compressedBuffer,
    });

    await UserDB.findByIdAndUpdate(user._id, {
      pictureUrl: `${process.env.SERVER_URL}/api/user`,
      picture: newPicture._id,
    });
    const updatedUser = await UserDB.findById(user._id).select("-password");

    resJson(res, 200, "Success upload picture", updatedUser);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = uploadPicture;
