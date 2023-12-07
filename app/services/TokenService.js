const jwt = require("jsonwebtoken");

exports.sing = (data) => {
  return jwt.sign(data, process.env.APP_SECRET, { expiresIn: "48h" });
};

exports.verify = (token) => {
  try {
    return jwt.verify(token, process.env.APP_SECRET);
  } catch (error) {
    return false;
  }
};

exports.decode = (token) => {
  return jwt.decode(token, process.env.APP_SECRET);
};
