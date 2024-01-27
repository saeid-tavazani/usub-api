import { Request, Response, NextFunction } from "express";
import errorLogger from "../services/errorLogger";
import category from "../models/categoryModels";
import {
  errorNot,
  errorRequest,
  successAdd,
} from "../services/responseStatusCodes";
const newContact = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, type, userId } = req.body;
    category
      .create({
        title: name,
        type: type,
        userId: userId,
      })
      .then((response) => {
        if (response) {
          res.send(successAdd);
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


const newList = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, userId } = req.body;
      category
        .create({
          title: name,
         
          userId: userId,
        })
        .then((response) => {
          if (response) {
            res.send(successAdd);
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
  

export { newContact };
