import { sequelize, DataTypes } from "./index";
import category from "./categoryModels";

const transaction = sequelize.define("transaction", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  description: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.ENUM("receive", "payment"),
    defaultValue: "payment",
  },
  type: {
    type: DataTypes.INTEGER,
    references: {
      model: category,
      key: "id",
    },
  },
});
export default transaction;
