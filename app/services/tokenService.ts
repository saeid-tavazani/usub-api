import jwt, { Secret } from "jsonwebtoken";

const getAppSecret = (): Secret | undefined => {
  // Get your secret from process.env or some other configuration
  return process.env.APP_SECRET;
};

const sign = (data: object) => {
  const appSecret = getAppSecret();
  if (appSecret) {
    return jwt.sign(data, appSecret, { expiresIn: "48h" });
  } else {
    throw new Error("APP_SECRET is undefined");
  }
};

const verify = (token: string): boolean => {
  const appSecret = getAppSecret();
  if (appSecret) {
    try {
      jwt.verify(token, appSecret);
      return true;
    } catch (error) {
      return false;
    }
  } else {
    throw new Error("APP_SECRET is undefined");
  }
};

const decode = (token: string) => {
  const appSecret = getAppSecret();
  if (appSecret) {
    const aa = jwt.decode(token); // Provide empty options object
    return aa;
  } else {
    throw new Error("APP_SECRET is undefined");
  }
};

export { decode, sign, verify };
