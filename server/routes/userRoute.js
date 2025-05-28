const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/userController");
const { validateBody } = require("../utils/validator");
const { UserSchema } = require("../utils/schema");

router.post("/signup", validateBody(UserSchema.signup), signup);
router.post("/signin", validateBody(UserSchema.signin), signin);

module.exports = router;
