import sessionRouter from "./sessions";
import user from "./user";
import { Express } from "express";
module.exports = (app: Express) => {
  app.use("/app/usub/api/v1/session", sessionRouter);
  app.use("/app/usub/api/v1/users", user);
};
