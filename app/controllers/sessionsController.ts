import { verifyPass } from "../services/passwordHash";
import { Request, Response, NextFunction } from "express";
import errorLogger from "../services/errorLogger";
import users from "../models/userModels";
import { sign, decode } from "../services/tokenService";
import {
  errorNot,
  errorRequest,
  successNot,
} from "../services/responseStatusCodes";
const newSession = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    users
      .findOne({
        where: {
          email: email,
        },
      })
      .then((response) => {
        if (response && verifyPass(password, response.dataValues.password)) {
          res.send({ token: sign(response.dataValues) });
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
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const data = decode(authorization as string);
    if (typeof data !== "string" && data !== null) {
      users
        .findAll({
          where: {
            email: data.email,
            password: data.password,
          },
        })
        .then((response) => {
          if (response) {
            res.send(successNot);
          } else {
            res.send(errorNot);
          }
        })
        .catch((error) => {
          errorLogger.error(error);
          res.send(errorRequest);
        });
    }
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};

export { verifyToken, newSession };
