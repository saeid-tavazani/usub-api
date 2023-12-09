const { selectuser, newUser } = require("../models/userModels");
const { errorRequest, successNot } = require("../services/ResponseStatusCodes");
const { generateHashPss } = require("../services/PasswordHash");
exports.newUser = (req, res, next) => {
  try {
    const { email, password, phone, name, family } = req.body;
    selectuser([email, phone])
      .then((user) => {
        if (user) {
          res.send((errorRequest.message = "user already exists"));
        } else {
          newUser([name, family, email, generateHashPss(password), phone]).then(
            (row) => {
              if (row.affectedRows) {
                res.send(successNot);
              }
            }
          );
        }
      })
      .catch((error) => {
        res.send(errorRequest);
      });
  } catch (console) {
    next(error);
  }
};
