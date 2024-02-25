import { Request, Response, NextFunction } from "express";
import errorLogger from "../services/errorLogger";
import category from "../models/categoryModels";
import transaction from "../models/transactionModels";

import {
  errorNot,
  errorRequest,
  successAdd,
  success,
} from "../services/responseStatusCodes";
import { sequelize, QueryTypes } from "../models";

category.hasMany(transaction, { foreignKey: "type", as: "categoryEvnt" });
transaction.belongsTo(category, { foreignKey: "type", as: "transactionEvnt" });

const newCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
  myValue: string
) => {
  try {
    const { name, type, userId } = req.body;
    category
      .create({
        title: name,
        type: type || null,
        userId: userId,
        category: myValue,
      })
      .then((response) => {
        if (response) {
          getCategoryValue(userId, myValue, res, successAdd);
        } else {
          res.send(errorNot);
        }
      })
      .catch((error) => {
        res.send(errorRequest);
        errorLogger.error(error);
      });
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};
const newTransaction = (
  req: Request,
  res: Response,
  next: NextFunction,
  myValue: string
) => {
  try {
    const { amount, date, id, type, title, description } = req.body;
    transaction
      .create({
        title: title,
        amount: amount,
        date: date,
        description: description || null,
        model: type,
        type: id,
      })
      .then((response) => {
        if (response) {
          getTransactionValue(id, myValue, res, successAdd);
        } else {
          res.send(errorNot);
        }
      })
      .catch((error) => {
        res.send(errorRequest);
        errorLogger.error(error);
      });
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};
const getTransaction = (
  req: Request,
  res: Response,
  next: NextFunction,
  myValue: string
) => {
  try {
    const { id } = req.params;
    getTransactionValue(Number(id), myValue, res);
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};

const getUserTransaction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    sequelize
      .query(
        "SELECT transactions.* FROM `categories` INNER JOIN `transactions` ON categories.id = transactions.type WHERE categories.userId=:search_user",
        {
          replacements: { search_user: id },
          type: QueryTypes.SELECT,
        }
      )
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        res.send(errorRequest);
        errorLogger.error(error);
      });

    // getTransactionValue(Number(id), myValue, res);
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};

const deletTransaction = (
  req: Request,
  res: Response,
  next: NextFunction,
  myValue: string
) => {
  try {
    const { listId, id } = req.body;
    transaction
      .destroy({
        where: {
          id: id,
        },
      })
      .then((response) => {
        if (response) {
          getTransactionValue(listId, myValue, res, success);
        } else {
          res.send(errorNot);
        }
      })
      .catch((error) => {
        res.send(errorRequest);
        errorLogger.error(error);
      });
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};
const deletCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
  myValue: string
) => {
  try {
    const { userId, id } = req.body;
    category
      .destroy({
        where: {
          id: id,
        },
      })
      .then((response) => {
        if (response) {
          getCategoryValue(userId, myValue, res);
        } else {
          res.send(errorNot);
        }
      })
      .catch((error) => {
        res.send(errorRequest);
        errorLogger.error(error);
      });
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};
const getCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
  myValue: string
) => {
  try {
    const { userId } = req.params;
    console.log("====================================");
    console.log(userId);
    console.log("====================================");
    getCategoryValue(Number(userId), myValue, res);
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};
const updateCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
  myValue: string
) => {
  try {
    const { name, type, userId, id } = req.body;
    category
      .update(
        {
          title: name,
          type: type || null,
          userId: userId,
        },
        {
          where: {
            id: id,
          },
        }
      )
      .then((response) => {
        if (response) {
          getCategoryValue(userId, myValue, res, successAdd);
        } else {
          res.send(errorNot);
        }
      })
      .catch((error) => {
        res.send(errorRequest);
        errorLogger.error(error);
      });
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};
const updateTransaction = (
  req: Request,
  res: Response,
  next: NextFunction,
  myValue: string
) => {
  try {
    const { amount, date, id, type, title, description, transactionId } =
      req.body;
    transaction
      .update(
        {
          amount: amount,
          date: date,
          model: type,
          title: title,
          description: description || null,
        },
        {
          where: { id: transactionId },
        }
      )
      .then((response) => {
        if (response) {
          getTransactionValue(id, myValue, res, successAdd);
        } else {
          res.send(errorNot);
        }
      })
      .catch((error) => {
        res.send(errorRequest);
        errorLogger.error(error);
      });
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};

const getTransactionValue = (
  id: number,
  type: string,
  res: Response,
  ms = success
) => {
  // Ensure that associations use the same alias

  category
    .findAll({
      where: {
        "$category.id$": id,
        "$category.category$": type,
      },
      include: [
        {
          model: transaction,
          as: "categoryEvnt", // Use the same alias as defined in the association
          required: false,
        },
      ],
    })
    .then((response) => {
      if (response) {
        res.send({
          ...ms,
          data: {
            response,
          },
        });
      } else {
        res.send(errorNot);
      }
    })
    .catch((error) => {
      res.send(errorRequest);
      errorLogger.error(error);
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    });
};

const getCategoryValue = (
  id: number,
  type: string,
  res: Response,
  ms = success
) => {
  category
    .findAll({
      where: {
        category: type,
        userId: id,
      },
    })
    .then((response) => {
      if (response) {
        res.send({
          ...ms,
          data: {
            response,
          },
        });
      } else {
        res.send(errorNot);
      }
    })
    .catch((error) => {
      res.send(errorRequest);
      errorLogger.error(error);
    });
};

export {
  newCategory,
  getTransaction,
  deletTransaction,
  deletCategory,
  getCategory,
  updateCategory,
  updateTransaction,
  newTransaction,
  getUserTransaction,
};
