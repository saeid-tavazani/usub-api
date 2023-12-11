const {
  selectuser,
  newUser,
  selectUserId,
  selectUserActive,
} = require("../models/userModels");
const { errorRequest, successNot } = require("../services/ResponseStatusCodes");
const { generateHashPss } = require("../services/PasswordHash");
const logger = require("../services/errorLogger");
const picture = gravatar(user.email);

exports.newUser = (req, res, next) => {
  try {
    const { email, password, phone, name } = req.body;
    selectuser([email, phone])
      .then((user) => {
        if (user) {
          res.send((errorRequest.message = "user already exists"));
        } else {
          newUser([name, email, generateHashPss(password), phone]).then(
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
    logger.error(error);
    next(error);
  }
};

exports.editUser = (req, res, next) => {
  try {
    const { email, phone, name, family, id } = req.body;
    selectUserId([id])
      .then((user) => {
        const tokenData = TokenService.decode(req.headers.authorization);
        if (user && user.email === tokenData.email) {
          updateUser([name, family, email, phone, id]).then((row) => {
            selectUserActive([email]).then((user) => {
              delete user.password;
              const picture = gravatar(user.email);
              res.send({
                data: { ...user, ...picture },
                success: true,
                code: 200,
                message: "success",
              });
            });
          });
        } else {
          res.send(notEdited);
        }
      })
      .catch((error) => {
        res.send(errorRequest);
      });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
