var passwordHash = require("password-hash");

const verifyPass = (value: string, pass: string): boolean => {
  if (!passwordHash.isHashed(value)) {
    return passwordHash.verify(value, pass);
  }
  return false;
};

const generateHashPss = (value: string): string => {
  return passwordHash.generate(value);
};

export { generateHashPss, verifyPass };
