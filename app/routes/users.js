const express = require("express");
const router = express.Router();
const { newUser, editUser } = require("../controllers/usersControllers");
const validator = require("../middlewares/validator");
const { auth } = require("../middlewares/auth");

const {
  emailValidator,
  passValidator,
  phoneNumberValidator,
  customMadeValidator,
  idValidator,
} = require("../services/ValidatorService");

router.post(
  "/new",
  [
    validator([
      emailValidator().notEmpty(),
      customMadeValidator("name").notEmpty(),
      passValidator().notEmpty(),
      phoneNumberValidator(false),
    ]),
  ],
  newUser
);

router.put(
  "/edit",
  [
    auth,
    validator([
      idValidator().notEmpty(),
      emailValidator().notEmpty(),
      customMadeValidator("name").notEmpty(),
      phoneNumberValidator(false),
    ]),
  ],
  editUser
);

module.exports = router;
