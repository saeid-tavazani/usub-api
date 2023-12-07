const express = require("express");
const auth = require("../middlewares/auth");
const validator = require("../middlewares/validator");
const {
  updateUserPass,
  updateUserInfo,
  editStatus,
  deleteUsers,
  users,
  addUsertypeA,
  addUsertypeB,
} = require("../controllers/usersController");
const {
  passValidator,
  phoneNumberValidator,
  customMadeValidator,
  idValidator,
  emailValidator,
} = require("../services/ValidatorService");

const router = express.Router();

router.get("/", [auth], users);
router.put(
  "/delete",
  [auth, validator([idValidator().notEmpty()])],
  deleteUsers
);
router.put(
  "/",
  [
    auth,
    validator([
      idValidator().notEmpty(),
      customMadeValidator("status").notEmpty(),
    ]),
  ],
  editStatus
);
router.put(
  "/update/info",
  [
    auth,
    validator([
      emailValidator().notEmpty(),
      phoneNumberValidator().notEmpty(),
      idValidator().notEmpty(),
      customMadeValidator("family").optional(),
      customMadeValidator("name").notEmpty(),
    ]),
  ],
  updateUserInfo
);

router.put(
  "/update/pass",
  [
    auth,
    validator([
      passValidator().notEmpty(),
      customMadeValidator("currentPassword").notEmpty(),
      idValidator().notEmpty(),
    ]),
  ],
  updateUserPass
);
router.post(
  "/add",
  [
    auth,
    validator([
      emailValidator().notEmpty(),
      phoneNumberValidator().notEmpty(),
      customMadeValidator("family").optional(),
      customMadeValidator("name").notEmpty(),
    ]),
  ],
  addUsertypeA
);

module.exports = router;
