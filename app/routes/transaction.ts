import express, { Request, Response, NextFunction } from "express";
import auth from "../middlewares/auth";
import {
  validations,
  customMadeValidator,
  idValidator,
  dateValidator,
} from "../middlewares/validator";
import {
  newCategory,
  newTransaction,
  deletTransaction,
  deletCategory,
  getTransaction,
  getCategory,
  updateCategory,
  getUserTransaction,
  updateTransaction,
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
  (req: Request, res: Response, next: NextFunction) => {
    newCategory(req, res, next, "contact");
  }
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
  (req: Request, res: Response, next: NextFunction) => {
    newCategory(req, res, next, "tag");
  }
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
      // idValidator("body", "userId").notEmpty(),
    ]),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    newTransaction(req, res, next, "tag");
  }
);
router.post(
  "/contact/transaction",
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
  (req: Request, res: Response, next: NextFunction) => {
    newTransaction(req, res, next, "contact");
  }
);

router.get(
  "/contact/:userId",
  [auth, validations([idValidator("param", "userId").notEmpty()])],
  (req: Request, res: Response, next: NextFunction) => {
    getCategory(req, res, next, "contact");
  }
);
router.get(
  "/list/:userId",
  [auth, validations([idValidator("param", "userId").notEmpty()])],
  (req: Request, res: Response, next: NextFunction) => {
    getCategory(req, res, next, "tag");
  }
);
router.get(
  "/contact/transaction/:id",
  [auth, validations([idValidator("param").notEmpty()])],
  (req: Request, res: Response, next: NextFunction) => {
    getTransaction(req, res, next, "contact");
  }
);
router.get(
  "/list/transaction/:id",
  [auth, validations([idValidator("param").notEmpty()])],
  (req: Request, res: Response, next: NextFunction) => {
    getTransaction(req, res, next, "tag");
  }
);

router.get(
  "/user/transaction/:id",
  [auth, validations([idValidator("param").notEmpty()])],
  (req: Request, res: Response, next: NextFunction) => {
    getUserTransaction(req, res, next);
  }
);

router.put(
  "/list",
  [
    auth,
    validations([
      idValidator().notEmpty(),
      idValidator("body", "userId").notEmpty(),
      customMadeValidator("name").notEmpty(),
    ]),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    updateCategory(req, res, next, "tag");
  }
);
router.put(
  "/contact",
  [
    auth,
    validations([
      idValidator().notEmpty(),
      idValidator("body", "userId").notEmpty(),
      customMadeValidator("name").notEmpty(),
      customMadeValidator("type").notEmpty(),
    ]),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    updateCategory(req, res, next, "contact");
  }
);
router.put(
  "/list/transaction",
  [
    validations([
      idValidator().notEmpty(),
      customMadeValidator("amount").notEmpty(),
      customMadeValidator("type").notEmpty(),
      customMadeValidator("title").notEmpty(),
      dateValidator(true).notEmpty(),
      customMadeValidator("description").notEmpty(),
    ]),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    updateTransaction(req, res, next, "tag");
  }
);
router.put(
  "/contact/transaction",
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
  (req: Request, res: Response, next: NextFunction) => {
    updateTransaction(req, res, next, "contact");
  }
);

router.delete(
  "/list/transaction",
  [auth, validations([idValidator().notEmpty()])],
  (req: Request, res: Response, next: NextFunction) => {
    deletTransaction(req, res, next, "tag");
  }
);
router.delete(
  "/contact/transaction",
  [auth, validations([idValidator().notEmpty()])],
  (req: Request, res: Response, next: NextFunction) => {
    deletTransaction(req, res, next, "contact");
  }
);
router.delete(
  "/contact",
  [
    auth,
    validations([idValidator().notEmpty(), idValidator("body", "userId")]),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    deletCategory(req, res, next, "contact");
  }
);
router.delete(
  "/list",
  [
    auth,
    validations([idValidator().notEmpty(), idValidator("body", "userId")]),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    deletCategory(req, res, next, "tag");
  }
);

export default router;
