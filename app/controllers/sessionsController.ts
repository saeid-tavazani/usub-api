import { decode } from "../services/tokenService";
import { verifyPass } from "../services/passwordHash";
import { Request, Response, NextFunction } from "express";
import errorLogger from "../services/errorLogger";
import users from "../models/userModels";
import { sign } from "../services/tokenService";
import { errorNot, errorRequest } from "../services/responseStatusCodes";
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
          res.send(sign(response.dataValues));
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
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};

export { verifyToken, newSession };
