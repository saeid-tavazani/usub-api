import { Express ,Request, Response, NextFunction, } from 'express';
import cors from "cors"
import bodyParser from "body-parser"
module.exports = (app:Express) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
};