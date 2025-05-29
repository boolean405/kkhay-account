const express = require("express");
const router = express.Router();

const UserSchema = require("../utils/schema");
const signup = require("../controllers/user/signup");
const signin = require("../controllers/user/signin");
const refresh = require("../controllers/user/refresh");
const signout = require("../controllers/user/signout");
const profile = require("../controllers/user/profile");
const editProfile = require("../controllers/user/editProfile");
const deleteAccount = require("../controllers/user/deleteAccount");
const uploadPicture = require("../controllers/user/uploadPicture");

const {
  validateBody,
  validateToken,
  validateCookie,
} = require("../utils/validator");

router.post("/signup", validateBody(UserSchema.signup), signup);
router.post("/signin", validateBody(UserSchema.signin), signin);
router.get("/refresh", validateCookie(), refresh);
router.post("/signout", validateCookie(), signout);
router
  .route("/profile")
  .get(validateToken(), profile)
  .patch(validateToken(), validateBody(UserSchema.editProfile), editProfile)
  .delete(validateToken(), deleteAccount)
  .put(validateToken(), uploadPicture);

module.exports = router;
