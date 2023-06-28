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
      message: "معتبر نیست!",
      success: false,
    });
  };
};

const dateValidator = (
  compulsion: boolean,
  location = "body",
  valid = "date"
) => {
  if (location === "body") {
    return body(valid)
      .trim()
      .custom((value) => {
        if (
          compulsion === false &&
          (value === "" || value === undefined || value === null)
        ) {
          return true;
        }
        if (!isValidDateFormat(value)) {
          throw new Error("قالب تاریخ نامعتبر است. از YYYY-MM-DD استفاده کنید");
        }
        return true;
      });
  }
  return param(valid)
    .trim()
    .custom((value) => {
      if (compulsion === false && value === "") {
        return true;
      }
      if (!isValidDateFormat(value)) {
        throw new Error("قالب تاریخ نامعتبر است. از YYYY-MM-DD استفاده کنید");
      }
      return true;
    });
};

const idValidator = (location = "body", valid = "id") => {
  return location == "body"
    ? body(valid).toInt()
    : param(valid).toInt()
};
const passValidator = (location = "body", valid = "password") => {
  return location == "body"
    ? body(valid)
        .trim()
        .isLength({ min: 8, max: 16 })
        .withMessage("پسورد حداقل 8 کاراکتر و حداکثر 16 کاراکتر باشد")
    : param(valid)
        .trim()
        .isLength({ min: 8, max: 16 })
        .withMessage("پسورد حداقل 8 کاراکتر و حداکثر 16 کاراکتر باشد");
};
const emailValidator = (location = "body", valid = "email") => {
  return location == "body"
    ? body(valid)
        .trim()
        .isEmail()
        .isLength({ max: 80 })
        .withMessage("ایمیل معتبر نیست")
    : param(valid)
        .trim()
        .isEmail()
        .isLength({ max: 80 })
        .withMessage("ایمیل معتبر نیست");
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
          throw new Error("شماره تلفن باید با ۰۹ شروع شود و ۱۱ کاراکتر باشد");
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
        throw new Error("شماره تلفن باید با ۰۹ شروع شود و ۱۱ کاراکتر باشد");
      }
      return true;
    });
};

const isIranianPhoneNumber = (value: string) => {
  return /^09\d{9}$/.test(value);
};
// Custom function to check the validity of the date format
function isValidDateFormat(dateString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
export {
  validations,
  passValidator,
  phoneNumberValidator,
  emailValidator,
  idValidator,
  customMadeValidator,
  dateValidator,
};
