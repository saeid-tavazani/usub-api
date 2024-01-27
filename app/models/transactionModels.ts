import { sequelize, DataTypes } from "./index";

const transaction = sequelize.define("transaction", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  description: {
    type: DataTypes.STRING(11),
  },
  model: {
    type: DataTypes.ENUM("receive", "payment"),
    defaultValue: "payment",
  },
  type: {
    type: DataTypes.INTEGER,
    references: {
      model: "category", // 'fathers' refers to table name
      key: "id", // 'id' refers to column name in fathers table
    },
  },
});

export default transaction;