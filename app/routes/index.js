const sessionRouter = require("./sessions");
const users = require("./users");

module.exports = (app) => {
  app.use("/app/usub/api/v1/session", sessionRouter);
  app.use("/app/usub/api/v1/users", users);
};
