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
const newContact = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, type, userId } = req.body;
    category
      .create({
        title: name,
        type: type || null,
        userId: userId,
      })
      .then((response) => {
        if (response) {
          getCategory(userId, "contact", res, successAdd);
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

const newList = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, userId } = req.body;
    category
      .create({
        title: name,
        category: "tag",
        userId: userId,
      })
      .then((response) => {
        if (response) {
          getCategory(userId, "tag", res, successAdd);
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

const newTransactionList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, date, id, type, title, description } = req.body;
    transaction
      .create({
        amount: amount,
        date: date,
        type: id,
        model: type,
        title: title,
        description: description || null,
      })
      .then((response) => {
        if (response) {
          getTransaction(id, "tag", res, successAdd);
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

const newTransactionContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, date, id, type, title, description } = req.body;
    transaction
      .create({
        amount: amount,
        date: date,
        type: id,
        model: type,
        title: title,
        description: description || null,
      })
      .then((response) => {
        if (response) {
          getTransaction(id, "contact", res, successAdd);
          // res.send(successAdd);
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

const getTransactionContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    category.hasMany(transaction, { foreignKey: "type", as: "evnt" });
    transaction.belongsTo(category, { foreignKey: "type", as: "evnt" });
    const { id } = req.body;
    getTransaction(id, "contact", res);
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};

const getTransactionList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    category.hasMany(transaction, { foreignKey: "type", as: "evnt" });
    transaction.belongsTo(category, { foreignKey: "type", as: "evnt" });
    const { id } = req.body;
    getTransaction(id, "tag", res);
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};

const deletTransactionList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    category.hasMany(transaction, { foreignKey: "type", as: "evnt" });
    transaction.belongsTo(category, { foreignKey: "type", as: "evnt" });
    const { listId, id } = req.body;
    transaction
      .destroy({
        where: {
          id: id,
        },
      })
      .then((response) => {
        if (response) {
          getTransaction(listId, "tag", res, success);
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

const deletTransactionContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    category.hasMany(transaction, { foreignKey: "type", as: "evnt" });
    transaction.belongsTo(category, { foreignKey: "type", as: "evnt" });
    const { contactId, id } = req.body;
    transaction
      .destroy({
        where: {
          id: id,
        },
      })
      .then((response) => {
        if (response) {
          getTransaction(contactId, "contact", res, success);
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

const deletCategoryValue = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    category.hasMany(transaction, { foreignKey: "type", as: "evnt" });
    transaction.belongsTo(category, { foreignKey: "type", as: "evnt" });
    const { userId, id, type } = req.body;
    category
      .destroy({
        where: {
          id: id,
        },
      })
      .then((response) => {
        if (response) {
          getCategory(userId, type, res);
          // getTransaction(contactId, "contact", res, success);
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
const getCategoryValue = (req: Request, res: Response, next: NextFunction) => {
  try {
    category.hasMany(transaction, { foreignKey: "type", as: "evnt" });
    transaction.belongsTo(category, { foreignKey: "type", as: "evnt" });
    const { userId, type } = req.body;
    getCategory(userId, type, res);
  } catch (error) {
    errorLogger.error(error);
    next(error);
  }
};

const updateCategoryContact = (
  req: Request,
  res: Response,
  next: NextFunction
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
          getCategory(userId, "contact", res, successAdd);
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

const updateCategoryList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, userId, id } = req.body;
    category
      .update(
        {
          title: name,
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
          getCategory(userId, "tag", res, successAdd);
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

const updateTransactionList = (
  req: Request,
  res: Response,
  next: NextFunction
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
          getTransaction(id, "tag", res, successAdd);
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

const updateTransactionContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, date, id, type, title, description } = req.body;
    transaction
      .create({
        amount: amount,
        date: date,
        type: id,
        model: type,
        title: title,
        description: description || null,
      })
      .then((response) => {
        if (response) {
          getTransaction(id, "contact", res, successAdd);
          // res.send(successAdd);
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
  id: number,
  type: string,
  res: Response,
  ms = success
) => {
  category
    .findAll({
      where: {
        // "$category.userId$": id,
        "$category.id$": id,
        "$category.category$": type,
      },
      include: [
        {
          model: transaction,
          as: "evnt",
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
    });
};

const getCategory = (id: number, type: string, res: Response, ms = success) => {
  category
    .findAll({
      where: {
        "$category.category$": type,
        "$category.userId$": id,
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
  newContact,
  newList,
  newTransactionContact,
  newTransactionList,
  getTransactionContact,
  getTransactionList,
  deletTransactionContact,
  deletTransactionList,
  deletCategoryValue,
  getCategoryValue,
  updateCategoryContact,
  updateCategoryList,
};
