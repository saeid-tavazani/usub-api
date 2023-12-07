const TokenService = require("../services/TokenService");
const { verifyPass } = require("../services/PasswordHash");
const { selectUser } = require("../models/userModels");
const { gravatar } = require("../services/Gravatar");
exports.newSession = (req, res, next) => {
  try {
    const { email, password } = req.body;
    selectUser([email])
      .then((user) => {
        if (user && verifyPass(password, user.password)) {
          delete user.password;
          const picture = gravatar(user.email);
          res.send({
            data: { ...user, ...picture },
            success: true,
            code: 200,
            message: "success",
            token: TokenService.sing(user),
          });
        } else {
          res.send({
            success: false,
            message: "Email or password is incorrect !?",
            code: 401,
          });
        }
      })
      .catch((err) => {
        res.send({ code: 501, success: false });
      });
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const data = TokenService.decode(req.headers.authorization);
    selectUser(data.email).then((user) => {
      if (user.status == "active") {
        delete user.password;
        const picture = gravatar(data.email);
        res.send({
          data: { ...user, ...picture },
          success: true,
          code: 200,
          message: "success",
        });
      } else {
        return res.status(401).send({
          status: "error",
          code: 401,
          message: "Inactive user",
          success: false,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
