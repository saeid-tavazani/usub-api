import { Op } from "sequelize";
import { generateHashPss } from "../services/passwordHash";
import { Request, Response, NextFunction } from "express";
import errorLogger from "../services/errorLogger";
import users from "../models/userModels";
import {
  errorNot,
  errorRequest,
  successNot,
  successAdd,
  success,
  notEdited,
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
            message: "کاربری با این شماره تلفن یا ایمیل وجود دارد",
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
                res.send(successAdd);
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

const editUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, phone, id } = req.body;
    users
      .findOne({
        where: {
          [Op.or]: [{ email: email }, { phone: phone || "" }],
          id: { [Op.ne]: id },
        },
      })
      .then((response) => {
        if (response) {
          res.send({
            success: false,
            code: 400,
            message: "کاربری با این شماره تلفن یا ایمیل وجود دارد",
          });
        } else {
          users
            .update(
              { phone: phone, email: email, fullName: name },
              {
                where: {
                  id: id,
                },
              }
            )
            .then((response) => {
              if (response) {
                res.send(success);
              } else {
                res.send(notEdited);
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

export { newUser, editUser };
