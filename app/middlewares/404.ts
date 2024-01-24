import { Express, Request, Response, NextFunction } from 'express';
module.exports = (app:Express) => {
    app.use((req:Request, res:Response, nex:NextFunction) => {
      res.status(404).send({
        code: "Not Found",
        status: 404,
        message: "requested resource could not be found!",
      });
    });
  };