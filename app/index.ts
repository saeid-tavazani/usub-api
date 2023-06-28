import express from "express";
import { sequelize } from "./models/index";
const app = express();

require("./middlewares")(app);
require("./routes")(app);
require("./middlewares/exception")(app);
require("./middlewares/404")(app);

sequelize
  .sync()
  .then((res) => {
    console.log("success sequelize");
  })
  .catch((error) => {
    console.log(error);
  });

const startServer = (port: number): void => {
  app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  });
};

export default startServer;
