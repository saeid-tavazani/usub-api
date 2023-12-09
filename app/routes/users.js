const express = require("express");
const router = express.Router();
const { newUser } = require("../controllers/usersControllers");
const validator = require("../middlewares/validator");
const {
  emailValidator,
  passValidator,
  phoneNumberValidator,
  customMadeValidator,
} = require("../services/ValidatorService");

router.post(
  "/new",
  [
    validator([
      emailValidator().notEmpty(),
      customMadeValidator("name").notEmpty(),
      customMadeValidator("family").optional(),
      passValidator().notEmpty(),
      phoneNumberValidator(false),
    ]),
  ],
  newUser
);

module.exports = router;
