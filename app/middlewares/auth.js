const TokenService = require("../services/TokenService");

exports.auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send({
      status: "error",
      code: 401,
      message: "you are not authorized!",
    });
  }
  const token = TokenService.verify(req.headers.authorization);
  if (!token) {
    return res.status(401).send({
      status: "error",
      code: 401,
      message: "you token is not valid!",
      success: false,
    });
  }
  next();
};
