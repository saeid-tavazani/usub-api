const express = require("express");
const router = express.Router();
const {
  newUser,
  editUser,
  addpeople,
  addList,
  list,
  people,
} = require("../controllers/usersControllers");
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

router.post(
  "/contact",
  [
    auth,
    idValidator().notEmpty(),
    customMadeValidator("name").notEmpty(),
    customMadeValidator("type").notEmpty(),
  ],
  addpeople
);

router.get("/contact", [auth, idValidator().notEmpty()], people);

router.post(
  "/list",
  [auth, idValidator().notEmpty(), customMadeValidator("name").notEmpty()],
  addList
);

router.get("/list", [auth, idValidator().notEmpty()], list);

module.exports = router;
