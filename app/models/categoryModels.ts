import { sequelize, DataTypes } from "./index";
import user from "./userModels";

const category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    category: {
      type: DataTypes.ENUM("contact", "tag"),
      defaultValue: "contact",
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: user, // 'fathers' refers to table name
        key: "id", // 'id' refers to column name in fathers table
      },
    },
  },
  {
    paranoid: true,
  }
);

export default category;
