import { Express } from "express";
import user from "./user";
import session from "./sessions";
import transaction from "./transaction";
module.exports = (app: Express) => {
  app.use("/app/usub/api/v1/users", user);
  app.use("/app/usub/api/v1/session", session);
  app.use("/app/usub/api/v1/service", transaction);
};
