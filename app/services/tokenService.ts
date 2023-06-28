import jwt from "jsonwebtoken";

const appSecret: string = "1b8f3a6e9d0c7b2f6e1d3f7c8b3a9d4b2c6e1d3f";
const sign = (data: object) => {
  if (appSecret) {
    return jwt.sign(data, appSecret, { expiresIn: "200h" });
  } else {
    throw new Error("APP_SECRET is undefined");
  }
};

const verify = (token: string): boolean => {
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
  if (appSecret) {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } else {
    throw new Error("APP_SECRET is undefined");
  }
};

export { decode, sign, verify };
