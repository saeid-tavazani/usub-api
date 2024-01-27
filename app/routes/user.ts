import express from "express";
import auth from "../middlewares/auth";
import {
  validations,
  emailValidator,
  passValidator,
  phoneNumberValidator,
  customMadeValidator,
  idValidator,
} from "../middlewares/validator";
import { newUser, editUser } from "../controllers/userController";

const router = express.Router();

router.post(
  "/new",
  [
    validations([
      emailValidator().notEmpty(),
      passValidator().notEmpty(),
      customMadeValidator("name").notEmpty(),
      phoneNumberValidator(false).optional(),
    ]),
  ],
  newUser
);

router.put(
  "/edit",
  [
    auth,
    validations([
      idValidator().notEmpty(),
      emailValidator().notEmpty(),
      customMadeValidator("name").notEmpty(),
      phoneNumberValidator(false).optional(),
    ]),
  ],
  editUser
);

export default router;
