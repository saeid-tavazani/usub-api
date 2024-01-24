import { Request, Response, NextFunction, Express } from "express";

module.exports = (app: Express) => {
  app.use((error: any, req: Request, res: Response, nex: NextFunction) => {
    const status = error.status || 500;
    res.send({
      code: "Exception",
      status,
      message: error.message,
    });
  });
};
