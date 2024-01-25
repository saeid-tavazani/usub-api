import express from "express";
import auth from "../middlewares/auth";
import {
  validations,
  emailValidator,
  passValidator,
  phoneNumberValidator,
  customMadeValidator,
} from "../middlewares/validator";
import { newUser } from "../controllers/userController";

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

export default router;
