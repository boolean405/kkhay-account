const express = require("express");
const router = express.Router();

const UserSchema = require("../utils/schema");
const signup = require("../controllers/user/signup");
const signin = require("../controllers/user/signin");
const refresh = require("../controllers/user/refresh");
const signout = require("../controllers/user/signout");
const getUserDetails = require("../controllers/user/getUserDetails");
const deleteAccount = require("../controllers/user/deleteAccount");
const uploadPicture = require("../controllers/user/uploadPicture");
const profilePicture = require("../controllers/user/profilePicture");
const changePassword = require("../controllers/user/changePassword");
const changeName = require("../controllers/user/changeName");
const verify = require("../controllers/user/verify");
const changeUsername = require("../controllers/user/changeUsername");
const getPicture = require("../controllers/user/getPicture");

const {
  validateBody,
  validateToken,
  validateCookie,
  validateParam,
} = require("../utils/validator");

router.post("/signup", validateBody(UserSchema.signup), signup);
router.post("/signin", validateBody(UserSchema.signin), signin);
router.post("/signout", validateCookie(), signout);
router.get("/refresh", validateCookie(), refresh);
router.get("/", validateToken(), getUserDetails);
router.post("/verify", validateBody(UserSchema.verify), verify);
router.delete(
  "/deleteaccount",
  validateToken(),
  validateBody(UserSchema.deleteAccount),
  deleteAccount
);

router.get(
  "/picture/:userId",
  validateParam(UserSchema.params.userId, "userId"),
  getPicture
);

router
  .route("/picture")
  .all(validateToken())
  .get(profilePicture)
  .post(uploadPicture);

router.patch(
  "/changename",
  validateToken(),
  validateBody(UserSchema.changeName),
  changeName
);

router.patch(
  "/changeusername",
  validateToken(),
  validateBody(UserSchema.changeUsername),
  changeUsername
);

router.patch(
  "/changepassword",
  validateToken(),
  validateBody(UserSchema.changePassword),
  changePassword
);

module.exports = router;
