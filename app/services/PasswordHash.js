var passwordHash = require("password-hash");

exports.verifyPass = (value, pass) => {
  if (!passwordHash.isHashed(value)) {
    return passwordHash.verify(value, pass);
  }
  return false;
};

exports.generateHashPss = (value) => {
  return passwordHash.generate(value);
};
