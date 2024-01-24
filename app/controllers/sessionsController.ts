import { decode } from "../services/tokenService";
import { verifyPass } from "../services/passwordHash";
import { Express, Request, Response, NextFunction } from "express";

// import { selectUserEmail } from"../models/userModels";
const newSession = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    // const tt =sing({})
  } catch (error) {
    // logger.error(error);
    next(error);
  }
};
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const data = decode(authorization as string);
  } catch (error) {
    // logger.error(error);
    next(error);
  }
};

export { verifyToken, newSession };
