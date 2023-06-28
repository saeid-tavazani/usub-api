import express from "express";
import auth from "../middlewares/auth";
import {
  validations,
  emailValidator,
  passValidator,
} from "../middlewares/validator";
import { newSession, verifyToken } from "../controllers/sessionsController";

const router = express.Router();

router.post(
  "/",
  [validations([emailValidator().notEmpty(), passValidator().notEmpty()])],
  newSession
);
router.get("/verify", [auth], verifyToken);

export default router;
