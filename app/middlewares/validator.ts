import {
  validationResult,
  ValidationChain,
  body,
  param,
} from "express-validator";
import { Request, Response, NextFunction } from "express";

const validations = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.array().length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: errors.array(),
      status: "error",
      message: "Not valid!",
      success: false,
    });
  };
};

const dateValidator = (location = "body", valid = "date") => {
  return location == "body"
    ? body(valid).trim().isDate()
    : param(valid).trim().isDate();
};

const idValidator = (location = "body", valid = "id") => {
  return location == "body"
    ? body(valid).trim().toInt().isInt()
    : param(valid).trim().toInt().isInt();
};
const passValidator = (location = "body", valid = "password") => {
  return location == "body"
    ? body(valid).trim().isLength({ min: 8, max: 16 })
    : param(valid).trim().isLength({ min: 8, max: 16 });
};
const emailValidator = (location = "body", valid = "email") => {
  return location == "body"
    ? body(valid).trim().isEmail().isLength({ max: 80 })
    : param(valid).trim().isEmail().isLength({ max: 80 });
};
const customMadeValidator = (valid: string, location = "body") => {
  return location == "body" ? body(valid).trim() : param(valid).trim();
};
const phoneNumberValidator = (
  compulsion: Boolean,
  location = "body",
  valid = "phone"
) => {
  if (location == "body") {
    return body(valid)
      .trim()
      .custom((value) => {
        if (
          compulsion == false &&
          (value == "" || value == undefined || value == null)
        ) {
          return true;
        }
        if (!isIranianPhoneNumber(value)) {
          throw new Error("Invalid Iranian phone number");
        }
        return true;
      });
  }
  return param(valid)
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
const isIranianPhoneNumber = (value: string) => {
  return /^09\d{9}$/.test(value);
};

export {
  validations,
  passValidator,
  phoneNumberValidator,
  emailValidator,
  idValidator,
  customMadeValidator,
  dateValidator,
};
