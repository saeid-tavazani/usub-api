import jwt, { Secret, JwtPayload } from "jsonwebtoken";

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

const decode = (token: string): string | jwt.JwtPayload | null => {
  const appSecret = getAppSecret();
  if (appSecret) {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } else {
    throw new Error("APP_SECRET is undefined");
  }
};

export { decode, sign, verify };
