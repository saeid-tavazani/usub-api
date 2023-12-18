const {
  selectuser,
  newUser,
  selectUserId,
  selectUserEmail,
  updateUser,
  addpeople,
  people,
  addList,
  list,
  addTransaction,
  deleteTransaction,
  deletepeople,
} = require("../models/userModels");
const {
  errorRequest,
  successNot,
  notEdited,
  success,
} = require("../services/ResponseStatusCodes");
const { generateHashPss } = require("../services/PasswordHash");
const logger = require("../services/errorLogger");
const { gravatar } = require("../services/Gravatar");
const TokenService = require("../services/TokenService");

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
              } else {
                res.send(errorRequest);
              }
            }
          );
        }
      })
      .catch((error) => {
        logger.error(error);
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
          updateUser([name, email, phone, id]).then((row) => {
            if (row) {
              selectUserEmail([email]).then((user) => {
                if (user) {
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

exports.addpeople = (req, res, next) => {
  try {
    const { id, name, type } = req.body;
    addpeople([id, name, type])
      .then((row) => {
        if (row.affectedRows) {
          people([id]).then((row) => {
            res.send({
              ...success,
              data: row,
            });
          });
        } else {
          res.send(errorRequest);
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};

exports.people = (req, res, next) => {
  try {
    const { id } = req.body;
    people([id])
      .then((row) => {
        res.send({
          ...success,
          data: row,
        });
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};

exports.addList = (req, res, next) => {
  try {
    const { id, name, type } = req.body;
    addList([id, name, type])
      .then((row) => {
        if (row.affectedRows) {
          list([id]).then((row) => {
            res.send({
              ...success,
              data: row,
            });
          });
        } else {
          res.send(errorRequest);
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};

exports.list = (req, res, next) => {
  try {
    const { id } = req.body;
    list([id])
      .then((row) => {
        res.send({
          ...success,
          data: row,
        });
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};

exports.addTransactionP = (req, res, next) => {
  try {
    const { userId, id, title, amount, date, type } = req.body;
    addTransaction([id, title, amount, date, type])
      .then((row) => {
        if (row.affectedRows) {
          people([userId]).then((row) => {
            res.send({
              ...success,
              data: row,
            });
          });
        } else {
          res.send(errorRequest);
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};
exports.addTransactionL = (req, res, next) => {
  try {
    const { userId, id, title, amount, date, type } = req.body;
    addTransaction([id, title, amount, date, type])
      .then((row) => {
        if (row.affectedRows) {
          list([userId]).then((row) => {
            res.send({
              ...success,
              data: row,
            });
          });
        } else {
          res.send(errorRequest);
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};

exports.deleteTransactionL = (req, res, next) => {
  try {
    const { id, userId } = req.body;
    deleteTransaction([id])
      .then((row) => {
        if (row.affectedRows) {
          list([userId]).then((row) => {
            res.send({
              ...success,
              data: row,
            });
          });
        } else {
          res.send(errorRequest);
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};

exports.deleteTransactionP = (req, res, next) => {
  try {
    const { userId, id } = req.body;
    deleteTransaction([id])
      .then((row) => {
        if (row.affectedRows) {
          people([userId]).then((row) => {
            res.send({
              ...success,
              data: row,
            });
          });
        } else {
          res.send(errorRequest);
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};

exports.deletePeople = (req, res, next) => {
  try {
    const { id, userId } = req.body;
    deletepeople([id])
      .then((row) => {
        console.log('====================================');
        console.log(row);
        console.log('====================================');
        if (row.affectedRows) {
          logger.error(row);

          people([userId]).then((row) => {
            res.send({
              ...success,
              data: row,
            });
          });
        } else {
          res.send(errorRequest);
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send(errorRequest);
      });
  } catch (console) {
    logger.error(error);
    next(error);
  }
};
