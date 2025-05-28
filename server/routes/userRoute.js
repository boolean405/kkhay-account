const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  profile,
  refresh,
  signout,
  edit
} = require("../controllers/userController");
const {
  validateBody,
  validateToken,
  validateCookie,
} = require("../utils/validator");
const UserSchema = require("../utils/schema");

router.post("/signup", validateBody(UserSchema.signup), signup);
router.post("/signin", validateBody(UserSchema.signin), signin);
router.get("/profile", validateToken(), profile);
router.get("/refresh", validateCookie(), refresh);
router.post("/signout", validateCookie(), signout);
router.patch(
  "/profile/edit",
  validateToken(),
  validateBody(UserSchema.edit),
  edit
);

module.exports = router;
