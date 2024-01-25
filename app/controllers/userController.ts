import { Op } from "sequelize";
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
      .findOne({
        where: {
          [Op.or]: [{ email: email }, { phone: phone || "" }],
        },
      })
      .then((response) => {
        if (response) {
          res.send({
            success: false,
            code: 400,
            message: "There is a user with this phone number or email",
          });
        } else {
          users
            .create({
              fullName: name,
              password: generateHashPss(password),
              email: email,
              phone: phone,
            })
            .then((response) => {
              if (response) {
                res.send(successNot);
              } else {
                res.send(errorNot);
              }
            });
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
