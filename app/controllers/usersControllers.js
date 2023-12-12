const {
  selectuser,
  newUser,
  selectUserId,
  selectUserActive,updateUser
} = require("../models/userModels");
const { errorRequest, successNot,notEdited } = require("../services/ResponseStatusCodes");
const { generateHashPss } = require("../services/PasswordHash");
const logger = require("../services/errorLogger");
const { gravatar } = require("../services/Gravatar");
const TokenService = require("../services/TokenService");
const { log } = require("winston");



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
    const { email, phone, name, id } = req.body;
    selectUserId([id])
      .then((user) => {
        const tokenData = TokenService.decode(req.headers.authorization);
        if (user && user.email === tokenData.email) {
          updateUser([name, email, phone, Number(id)]).then((row) => {
            if(row){
              selectUserActive([email]).then(user => {
                if(user){

                  delete user.password;
                  const picture = gravatar(user.email);
                  res.send({
                    data: { ...user, ...picture },
                    success: true,
                    code: 200,
                    message: "success",
                  });
                }
              });
            }
          });
        } else {
          res.send(notEdited);
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
