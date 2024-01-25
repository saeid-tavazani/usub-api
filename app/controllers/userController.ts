import { verifyPass, generateHashPss } from "../services/passwordHash";
import { Request, Response, NextFunction } from "express";
import errorLogger from "../services/errorLogger";
import users from "../models/userModels";
import {
  errorNot,
  errorRequest,
  successNot,
} from "../services/responseStatusCodes";
const newUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, phone } = req.body;
    users
      .create({
        fullName: name,
        password: generateHashPss(password),
        email: email,
        phone: phone,
      })
      .then((response) => {
        if (response) {
          res.send("ok");
        } else {
          res.send(errorNot);
        }
      })
      .catch((error) => {
        res.send(errorRequest);
        errorLogger.error(error);
      });
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};
export { newUser };
