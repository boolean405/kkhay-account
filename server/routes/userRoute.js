const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validateBody } = require("../utils/validator");
const { UserSchema } = require("../utils/schema");

router.route("/").post(validateBody(UserSchema.signup), userController.signup);

module.exports = router;
