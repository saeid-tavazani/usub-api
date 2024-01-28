import express from "express";
import auth from "../middlewares/auth";
import {
  validations,
  customMadeValidator,
  idValidator,
  dateValidator,
} from "../middlewares/validator";
import {
  newContact,
  newList,
  newTransactionContact,
  newTransactionList,
  getTransactionContact,
} from "../controllers/transactionController";

const router = express.Router();

router.post(
  "/contact",
  [
    auth,
    validations([
      idValidator("body", "userId").notEmpty(),
      customMadeValidator("name").notEmpty(),
      customMadeValidator("type").optional(),
    ]),
  ],
  newContact
);

router.post(
  "/list",
  [
    auth,
    validations([
      idValidator("body", "userId").notEmpty(),
      customMadeValidator("name").notEmpty(),
    ]),
  ],
  newList
);

router.post(
  "/list/transaction",
  [
    auth,
    validations([
      idValidator().notEmpty(),
      customMadeValidator("amount").notEmpty(),
      customMadeValidator("type").notEmpty(),
      customMadeValidator("title").notEmpty(),
      dateValidator(true).notEmpty(),
      customMadeValidator("description").notEmpty(),
    ]),
  ],
  newTransactionList
);

router.post(
  "/contact/transaction",
  [
    auth,
    validations([
      idValidator().notEmpty(),
      customMadeValidator("amount").notEmpty(),
      customMadeValidator("type").notEmpty(),
      dateValidator(true).notEmpty(),
      customMadeValidator("title").notEmpty(),
      customMadeValidator("description").notEmpty(),
    ]),
  ],
  newTransactionContact
);

router.get(
  "/contact/transaction",
  [auth, validations([idValidator().notEmpty()])],
  getTransactionContact
);

export default router;
