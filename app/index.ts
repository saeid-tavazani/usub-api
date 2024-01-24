import express from "express";
const app = express();

require("./middlewares")(app);
// require("./routes")(app);
// require("./middlewares/exception")(app);
require("./middlewares/404")(app);

const startServer = (port: number): void => {
  app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  });
};

export default startServer;
