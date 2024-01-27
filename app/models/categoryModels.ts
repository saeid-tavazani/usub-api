import { sequelize, DataTypes } from "./index";

const transaction = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  model: {
    type: DataTypes.ENUM("contact", "tag"),
    defaultValue: "contact",
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users", // 'fathers' refers to table name
      key: "id", // 'id' refers to column name in fathers table
    },
  },
});

export default transaction;
