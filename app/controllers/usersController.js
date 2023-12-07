const {
  updateUserPassword,
  selectUserId,
  updateUserInfo,
  selectAllUser,
  deleteUser,
  changeStatus,
  addUser,
  newUser,
} = require("../models/userModels");
const { verifyPass, generateHashPss } = require("../services/PasswordHash");
const {
  successNot,
  errorNot,
  notEdited,
  success,
  errorRequest,
} = require("../services/ResponseStatusCodes");

exports.updateUserPass = (req, res, next) => {
  try {
    const { currentPassword, password, id } = req.body;
    selectUserId([id])
      .then((user) => {
        if (verifyPass(currentPassword, user.password)) {
          updateUserPassword([generateHashPss(password), id]).then((rows) => {
            if (rows.changedRows) {
              res.send(successNot);
            } else {
              res.send(errorNot);
            }
          });
        } else {
          res.send({
            status: "error",
            code: 401,
            message: "password not valid",
            success: false,
          });
        }
      })
      .catch((error) => {
        res.send(notEdited);
      });
  } catch (error) {
    next(error);
  }
};

exports.updateUserInfo = (req, res, next) => {
  try {
    const { phone, family, name, email, id } = req.body;
    updateUserInfo([name, family, email, phone, Number(id)])
      .then((rows) => {
        if (rows.affectedRows) {
          res.send({ success: true, code: 200, message: "success" });
        } else {
          res.send(notEdited);
        }
      })
      .catch((err) => {
        res.send(errorRequest);
      });
  } catch (error) {
    next(error);
  }
};

exports.users = (req, res, next) => {
  try {
    selectAllUser()
      .then((users) => {
        res.send({ data: users, ...success });
      })
      .catch((err) => {
        return res.send(errorRequest);
      });
  } catch (error) {
    next(error);
  }
};

exports.deleteUsers = (req, res, next) => {
  try {
    const id = req.body.id;
    deleteUser([id])
      .then((rows) => {
        if (rows.affectedRows) {
          selectAllUser().then((users) => {
            res.send({
              data: users,
              ...success,
            });
          });
        } else {
          res.send(notEdited);
        }
      })
      .catch((err) => {
        return res.send(errorRequest);
      });
  } catch (error) {
    next(error);
  }
};

exports.editStatus = (req, res, next) => {
  try {
    const { id, status } = req.body;
    changeStatus([status, id])
      .then((rows) => {
        if (rows.affectedRows) {
          selectAllUser().then((users) => {
            users.map((user) => {
              delete user.password;
            });
            res.send({
              data: users,
              ...success,
            });
          });
        } else {
          res.send(notEdited);
        }
      })
      .catch((err) => {
        return res.send(errorRequest);
      });
  } catch (error) {
    next(error);
  }
};

exports.addUsertypeA = (req, res, next) => {
  try {
    const { name, family, email, password, phone } = req.body;
    addUser([name, family, email, generateHashPss(password), "author", phone])
      .then((rows) => {
        selectAllUser().then((users) => {
          res.send({ data: users, ...success });
        });
      })
      .catch((err) => {
        return res.send(errorRequest);
      });
  } catch (error) {
    next(error);
  }
};

exports.addUsertypeB = (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    newUser([name, email, generateHashPss(password), phone])
      .then((rows) => {
        res.send(successNot);
      })
      .catch((err) => {
        return res.send(errorRequest);
      });
  } catch (error) {
    next(error);
  }
};
