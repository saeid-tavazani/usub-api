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
} from "../controllers/transactionController";

const router = express.Router();

router.post(
  "/contact",
  [
    auth,
    validations([
      idValidator("body","userId").notEmpty(),
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
      idValidator("body","userId").notEmpty(),
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
      dateValidator().notEmpty(),
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
      dateValidator().notEmpty(),
    ]),
  ],
  newTransactionContact
);


export default router;
