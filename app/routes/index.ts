import sessionRouter from "./sessions";
import user from "./user";
import transaction from "./transaction";
import { Express } from "express";
module.exports = (app: Express) => {
  app.use("/app/usub/api/v1/session", sessionRouter);
  app.use("/app/usub/api/v1/users", user);
  app.use("/app/usub/api/v1/service", transaction);
};
