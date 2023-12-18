const express = require("express");
const router = express.Router();
const {
  newUser,
  editUser,
  addpeople,
  addList,
  list,
  people,
  addTransactionL,
  addTransactionP,
  deleteTransactionL,
  deleteTransactionP,
  deletePeople,
} = require("../controllers/usersControllers");
const validator = require("../middlewares/validator");
const { auth } = require("../middlewares/auth");

const {
  emailValidator,
  passValidator,
  phoneNumberValidator,
  customMadeValidator,
  idValidator,
  date,
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

router.post(
  "/transaction/p",
  [
    auth,
    idValidator().notEmpty(),
    customMadeValidator("userId").notEmpty(),
    customMadeValidator("title").notEmpty(),
    customMadeValidator("amount").notEmpty(),
    date().notEmpty(),
    customMadeValidator("type")
      .custom((value) => {
        if (value == "receive" || value == "payment") {
          return true;
        } else {
          throw new Error("Only values 'payment' and 'receive' are allowed");
        }
      })
      .notEmpty(),
  ],
  addTransactionP
);

router.post(
  "/transaction/l",
  [
    auth,
    idValidator().notEmpty(),
    customMadeValidator("userId").notEmpty(),
    customMadeValidator("title").notEmpty(),
    customMadeValidator("amount").notEmpty(),
    date().notEmpty(),
    customMadeValidator("type")
      .custom((value) => {
        if (value == "receive" || value == "payment") {
          return true;
        } else {
          throw new Error("Only values 'payment' and 'receive' are allowed");
        }
      })
      .notEmpty(),
  ],
  addTransactionL
);

router.delete(
  "/transaction/p",
  [auth, idValidator().notEmpty(), customMadeValidator("userId").notEmpty()],
  deleteTransactionP
);

router.delete(
  "/transaction/l",
  [auth, idValidator().notEmpty(), customMadeValidator("userId").notEmpty()],
  deleteTransactionL
);

router.put("/contact", [auth, idValidator().notEmpty()], deletePeople);
module.exports = router;
