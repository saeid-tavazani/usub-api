const { body } = require("express-validator");

exports.emailValidator = () => {
  return body("email").trim().isEmail().isLength({ max: 99 });
};

exports.passValidator = () => {
  return body("password").trim().isLength({ min: 8, max: 16 });
};

exports.customMadeValidator = (type) => {
  return body(type).trim();
};
exports.idValidator = () => {
  return body("id").trim().toInt().isInt();
};
exports.phoneNumberValidator = (compulsion) => {
  return body("phone")
    .trim()
    .custom((value) => {
      if (compulsion == false && value == "") {
        return true;
      }
      if (!isIranianPhoneNumber(value)) {
        throw new Error("Invalid Iranian phone number");
      }
      return true;
    });
};

const isIranianPhoneNumber = (value) => {
  return /^09\d{9}$/.test(value);
};

exports.jsonValidator = (value) => {
  return body(value).trim().isJSON();
};
