const bodyParser = require("body-parser");
const cors = require("cors");
module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
};
