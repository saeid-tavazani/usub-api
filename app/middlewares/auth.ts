import { verify } from "../services/tokenService";
import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({
      status: "error",
      code: 401,
      message: "You are not authorized! Authorization header is missing.",
    });
  }

  const token = verify(authorizationHeader);

  if (!token) {
    return res.status(401).send({
      status: "error",
      code: 401,
      message: "Your token is not valid!",
      success: false,
    });
  }

  next();
};
export default auth;
