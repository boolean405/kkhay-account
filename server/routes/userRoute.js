const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  profile,
  refresh,
  signout,
  edit,
  deleteAccount,
} = require("../controllers/userController");
const {
  validateBody,
  validateToken,
  validateCookie,
} = require("../utils/validator");
const UserSchema = require("../utils/schema");

router.post("/signup", validateBody(UserSchema.signup), signup);
router.post("/signin", validateBody(UserSchema.signin), signin);
router.get("/refresh", validateCookie(), refresh);
router.post("/signout", validateCookie(), signout);
router
  .route("/profile")
  .get(validateToken(), profile)
  .patch(validateToken(), validateBody(UserSchema.edit), edit)
  .delete(validateToken(), deleteAccount);

module.exports = router;
