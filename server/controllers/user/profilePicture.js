const UserDB = require("../../models/user");
const PictureDB = require("../../models/picture");
const resError = require("../../utils/resError");

const profilePicture = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await UserDB.findById(userId);
    if (!user) throw resError(404, "User not found!");

    const picture = await PictureDB.findById(user.picture);
    if (!picture) throw resError(404, "Picture not found in user!");

    res.set("Content-Type", picture.contentType);
    res.send(picture.data);
  } catch (error) {
    error.status = error.status;
    next(error);
  }
};

module.exports = profilePicture;
