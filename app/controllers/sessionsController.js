const TokenService = require("../services/TokenService");
const { verifyPass } = require("../services/PasswordHash");
const { selectUserActive } = require("../models/userModels");
const { gravatar } = require("../services/Gravatar");
exports.newSession = (req, res, next) => {
  try {
    const { email, password } = req.body;
    selectUserActive([email])
      .then((user) => {
        if (user && verifyPass(password, user.password)) {
          const userPassword = user.password;
          const userEmail = user.email;
          const userRole = user.role;
          delete user.password;
          const picture = gravatar(user.email);
          res.send({
            data: { ...user, ...picture },
            success: true,
            code: 200,
            message: "success",
            token: TokenService.sing({
              password: userPassword,
              email: userEmail,
              role: userRole,
            }),
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
    selectUserActive([data.email]).then((user) => {
      if (data.password === user.password) {
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
